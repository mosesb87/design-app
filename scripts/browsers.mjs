// Cross-browser smoke test (Firefox + WebKit) — runs on GitHub Actions against a local build.
// For each browser × viewport × page: console errors, page errors, failed requests, horizontal overflow, whether
// the chapter grounds and reveals complete after a full scroll, and three screenshots (top, middle, end).
// Usage: BASE=http://localhost:4321 node scripts/browsers.mjs   → qa-browsers/report.json + qa-browsers/shots/
import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = path.resolve('qa-browsers');
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const PAGES = ['/', '/work/', '/about/', '/work/asas-studio/', '/work/united-textile/', '/work/deals-os/', '/404.html'];
const RUNS = [
  { browser: 'firefox', engine: firefox, vp: 'desk', viewport: { width: 1440, height: 900 } },
  { browser: 'firefox', engine: firefox, vp: 'mob', viewport: { width: 390, height: 844 }, hasTouch: true },
  { browser: 'webkit', engine: webkit, vp: 'desk', viewport: { width: 1440, height: 900 } },
  { browser: 'webkit', engine: webkit, vp: 'mob', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { browser: 'webkit', engine: webkit, vp: 'mob-reduced', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
];

// DRY_RUN=1 runs the same checks in the local Chromium (to test this script where Firefox/WebKit aren't installed).
const dry = process.env.DRY_RUN === '1';
const launch = (engine) => (dry ? chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }) : engine.launch());

const report = { base: BASE, ranAt: new Date().toISOString(), versions: {}, results: [] };
for (const run of RUNS) {
  const browser = await launch(run.engine);
  report.versions[run.browser] = browser.version();
  const { engine, browser: name, vp, ...opts } = run;
  for (const p of PAGES) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: run.reducedMotion || 'no-preference' });
    const page = await ctx.newPage();
    const logs = [];
    const failed = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
    page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`.slice(0, 300)));
    // Recordings are fetched in ranges and dropped when they leave view — an aborted .mp4 is by design, not an error.
    page.on('requestfailed', (r) => { const err = r.failure()?.errorText || ''; if (/\.mp4(\?|$)/.test(r.url()) && /abort/i.test(err)) return; failed.push(`${r.url()} ${err}`.slice(0, 200)); });
    page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE) && !r.url().endsWith('/404.html')) failed.push(`${r.status()} ${r.url()}`); });
    const t0 = Date.now();
    let status = null;
    try {
      const res = await page.goto(BASE + p, { waitUntil: 'load', timeout: 45000 });
      status = res?.status() ?? null;
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      const slug = `${name}-${vp}-${p.replace(/[^a-z0-9]+/gi, '_')}`;
      await page.screenshot({ path: path.join(OUT, 'shots', `${slug}-0-top.jpg`), type: 'jpeg', quality: 60 });
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = Math.round(opts.viewport.height * 0.6);
      let overflow = 0;
      for (let y = 0; y <= total; y += step) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(120);
        overflow = Math.max(overflow, await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
        if (Math.abs(y - total / 2) < step / 2) await page.screenshot({ path: path.join(OUT, 'shots', `${slug}-1-mid.jpg`), type: 'jpeg', quality: 60 });
      }
      await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(OUT, 'shots', `${slug}-2-end.jpg`), type: 'jpeg', quality: 60 });
      // Anything still hidden by a reveal after scrolling the whole page is a bug.
      const hidden = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p')].filter((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return r.height > 0 && (cs.visibility === 'hidden' || +cs.opacity < 0.05) && !e.closest('[aria-hidden="true"], .visually-hidden, [data-step], .thesis__step, .thesis__verdict, .thesis__title-b'); }).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}: ${e.textContent.trim().slice(0, 40)}`).slice(0, 8));
      const vt = await page.evaluate(() => 'onpagereveal' in window);
      report.results.push({ browser: name, vp, page: p, status, ms: Date.now() - t0, overflow, hidden, logs: [...new Set(logs)].slice(0, 10), failed: [...new Set(failed)].slice(0, 10), viewTransitions: vt });
      console.log(`${name.padEnd(8)} ${vp.padEnd(12)} ${p.padEnd(26)} ${status} overflow=${overflow} hidden=${hidden.length} logs=${logs.length} failed=${failed.length}`);
    } catch (e) {
      report.results.push({ browser: name, vp, page: p, status, error: String(e).slice(0, 300), logs, failed });
      console.log(`${name} ${vp} ${p} ERROR ${e}`);
    }
    await ctx.close();
  }
  await browser.close();
}
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
