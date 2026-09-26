// QA harness. For every page × viewport: scroll-sampled screenshots (forward + reverse), horizontal overflow,
// console errors/warnings, failed requests, CLS, tap-target sizes, a keyboard focus pass and axe-core (WCAG 2.2 AA).
// Also runs reduced-motion and touch passes. Writes qa/report.json and screenshots to qa/shots/.
// Usage: node scripts/qa.mjs [--base=http://localhost:4321] [--pages=/,/work/] [--vps=desk,mob] [--no-shots] [--axe]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const args = process.argv.slice(2);
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || '').split('=').slice(1).join('=') || d;
const BASE = opt('base', 'http://localhost:4321');
const OUT = path.resolve('qa');
const shots = !args.includes('--no-shots');
const runAxe = args.includes('--axe');
// The representative set: every template, plus the longest and the most interactive instances of each.
const ALL_PAGES = ['/', '/work/', '/about/', '/work/asas-studio/', '/work/changeatlas/', '/work/deals-os/', '/work/csv-mapper/', '/work/diamedical-lab/', '/work/united-textile/', '/work/universal-wholesale/', '/work/firefly-burgers/', '/work/eat-with-samar/', '/work/great-lakes-cigar-festival/', '/work/ptee/', '/blog/', '/blog/on-page-seo-large-product-catalog/', '/blog/cleaning-product-data-csv/', '/reviews/', '/reviews/vanguard/', '/reviews/oakwood/', '/reviews/hayhouse/', '/reviews/diamedical/', '/404.html'];
// --pages=all: every page in the build.
const everyPage = () => {
  const out = [];
  const walk = (d, rel) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name), `${rel}${e.name}/`) : e.name === 'index.html' ? out.push(rel) : e.name === '404.html' && out.push(`${rel}404.html`)));
  walk(path.resolve('dist'), '/');
  return out.sort();
};
const pages = opt('pages', '') === 'all' ? everyPage() : opt('pages', '') ? opt('pages', '').split(',') : ALL_PAGES;
const VIEWPORTS = {
  smob: { width: 360, height: 740, isMobile: true, hasTouch: true, label: 'Small mobile 360×740' },
  mob: { width: 430, height: 932, isMobile: true, hasTouch: true, label: 'Large mobile 430×932' },
  tab: { width: 834, height: 1194, isMobile: true, hasTouch: true, label: 'Tablet 834×1194' },
  lap: { width: 1366, height: 768, isMobile: false, hasTouch: false, label: 'Laptop 1366×768' },
  desk: { width: 1440, height: 900, isMobile: false, hasTouch: false, label: 'Desktop 1440×900' },
  xl: { width: 1920, height: 1080, isMobile: false, hasTouch: false, label: 'Large desktop 1920×1080' },
};
const vps = opt('vps', Object.keys(VIEWPORTS).join(',')).split(',');
const modes = opt('modes', 'motion,reduced').split(',');
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const report = { base: BASE, ranAt: new Date().toISOString(), results: [] };

for (const vpKey of vps) {
  const vp = VIEWPORTS[vpKey];
  for (const mode of modes) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.isMobile, hasTouch: vp.hasTouch, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    for (const p of pages) {
      const page = await ctx.newPage();
      const logs = [];
      const failed = [];
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text().slice(0, 240)}`); });
      page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message.slice(0, 240)}`));
      page.on('requestfailed', (r) => { const u = r.url(); if (!/\.mp4$/.test(u)) failed.push(`${u} — ${r.failure()?.errorText}`); });
      page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) failed.push(`${r.status()} ${r.url()}`); });
      await page.addInitScript(() => {
        window.__cls = 0; window.__shifts = [];
        const d = (n) => n ? (n.id ? '#' + n.id : n.nodeName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : '')) : '?';
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; if (e.value > 0.005) window.__shifts.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: (e.sources || []).slice(0, 3).map((s) => d(s.node)) }); } }).observe({ type: 'layout-shift', buffered: true });
        window.__lcp = 0;
        new PerformanceObserver((l) => { const e = l.getEntries().pop(); if (e) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
      const t0 = Date.now();
      const res = await page.goto(BASE + p, { waitUntil: 'networkidle' }).catch((e) => ({ status: () => 0, err: e }));
      await page.evaluate(() => document.fonts.ready).catch(() => {});
      await page.waitForTimeout(1800);
      const tag = `${vpKey}-${mode}-${p.replace(/\W+/g, '_') || 'home'}`;
      const lcpAtLoad = await page.evaluate(() => Math.round(window.__lcp));
      const clsAtLoad = await page.evaluate(() => +window.__cls.toFixed(4));
      const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      const steps = Math.min(14, Math.max(3, Math.ceil(total / (vp.height * 1.4))));
      const overflowAt = [];
      const scrollTo = async (y) => {
        await page.evaluate((yy) => { const l = window.__lenis; if (l) l.scrollTo(yy, { immediate: true, force: true }); else window.scrollTo(0, yy); }, y);
        await page.waitForTimeout(650);
      };
      // Forward pass
      for (let i = 0; i <= steps; i++) {
        const y = Math.round((total * i) / steps);
        await scrollTo(y);
        // Compare with the device width, not innerWidth: in mobile emulation (as on a real phone) the layout
        // viewport grows to fit overflowing content, so innerWidth hides exactly the bug this is looking for.
        const ov = await page.evaluate((w) => Math.max(document.documentElement.scrollWidth, innerWidth) - w, vp.width);
        if (ov > 0) overflowAt.push({ y, px: ov });
        if (shots && (mode === 'motion' || i % 3 === 0)) await page.screenshot({ path: path.join(OUT, 'shots', `${tag}-${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 60 });
      }
      // Reverse pass (content that registered must stay registered; nothing should vanish scrolling up)
      const hiddenOnReverse = [];
      for (let i = steps; i >= 0; i -= 2) {
        await scrollTo(Math.round((total * i) / steps));
        const hid = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p')].filter((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || r.height === 0) return false; let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) o *= Number(getComputedStyle(e).opacity); return o < 0.05 && !el.closest('[aria-hidden="true"], [data-count-after], [data-rewinds]'); /* [data-rewinds]: states of a scrubbed scene, which rewinds by design */ }).map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} "${el.textContent.trim().slice(0, 30)}"`));
        if (hid.length) hiddenOnReverse.push({ step: i, invisible: hid.length, els: hid.slice(0, 4) });
      }
      // Tap targets (touch only): interactive elements smaller than 24×24 CSS px (WCAG 2.2 AA 2.5.8)
      const smallTargets = vp.hasTouch ? await page.evaluate(() => [...document.querySelectorAll('a[href], button, [role=button], input, select')].filter((el) => { const r = el.getBoundingClientRect(); if (!r.width || !r.height) return false; if (getComputedStyle(el).display === 'inline' && el.closest('p, li, dd, td, figcaption')) return false; /* inline links in running text are exempt (WCAG 2.2 2.5.8) */ return r.width < 24 || r.height < 24; }).slice(0, 12).map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`)) : [];
      // axe, twice: at the top after the full scroll (the whole page, grounds back to paper), and at the very bottom
      // limited to what is on screen there (the chapter ground is red by then; elements far above never show on it).
      await scrollTo(0);
      await page.waitForTimeout(600);
      let axe = null;
      if (runAxe && ['desk', 'mob'].includes(vpKey)) {
        const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
        const fmt = (vs) => vs.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
        // Cards waiting off to the side on the rack's horizontal track are clipped by overflow: clip, which axe-core
        // 4.13 doesn't treat as clipping; they are excluded here (the reduced-motion pass, where the rack is a vertical list in the same colours, checks them).
        await page.evaluate(() => document.querySelectorAll('main *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.left >= innerWidth || r.right <= 0)) e.setAttribute('data-axe-offside', ''); }));
        const top = await new AxeBuilder({ page }).withTags(tags).exclude('[data-axe-offside]').analyze().catch((e) => ({ error: String(e) }));
        await page.evaluate(() => document.querySelectorAll('[data-axe-offside]').forEach((e) => e.removeAttribute('data-axe-offside')));
        await scrollTo(total);
        await page.waitForTimeout(600);
        await page.evaluate(() => document.querySelectorAll('body *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && r.bottom > 0 && r.top < innerHeight) e.setAttribute('data-axe-view', ''); }));
        const bottom = await new AxeBuilder({ page }).withTags(tags).analyze().catch((e) => ({ error: String(e) }));
        await page.evaluate(() => document.querySelectorAll('[data-axe-view]').forEach((e) => e.removeAttribute('data-axe-view')));
        if (top.error || bottom.error) axe = top.error ? top : bottom;
        else axe = [...fmt(top.violations).map((v) => ({ ...v, state: 'top' })), ...fmt(bottom.violations.map((v) => ({ ...v, nodes: v.nodes.filter((n) => n.html.includes('data-axe-view')) })).filter((v) => v.nodes.length)).map((v) => ({ ...v, state: 'bottom, on screen' }))];
        await scrollTo(0);
      }
      // Keyboard pass: tab through the first 40 stops; every focused element must be visible and show an outline
      const focusIssues = [];
      if (mode === 'motion' && ['desk', 'mob'].includes(vpKey)) {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 40; i++) {
          const f = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
            const visible = r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && Number(cs.opacity) > 0.1;
            return { label: `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`, outline, visible };
          });
          if (f && (!f.outline || !f.visible)) focusIssues.push(f);
          await page.keyboard.press('Tab');
          await page.waitForTimeout(80);
        }
      }
      const metrics = await page.evaluate(() => ({ cls: +window.__cls.toFixed(4), shifts: window.__shifts.slice(0, 6), lcpAfterScroll: Math.round(window.__lcp), title: document.title, h1: document.querySelectorAll('h1').length, lang: document.documentElement.lang, desc: document.querySelector('meta[name=description]')?.content?.length || 0, canonical: document.querySelector('link[rel=canonical]')?.href || null, imgsNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length }));
      const r = { page: p, viewport: vpKey, mode, lcp: lcpAtLoad, clsAtLoad, status: res?.status?.() ?? null, loadMs: Date.now() - t0, scrollHeight: total, overflowAt, hiddenOnReverse, smallTargets, focusIssues: focusIssues.slice(0, 10), logs, failed: [...new Set(failed)].slice(0, 10), ...metrics, axe };
      report.results.push(r);
      const flags = [r.overflowAt.length && 'OVERFLOW', r.logs.length && 'CONSOLE', r.failed.length && 'FAILED-REQ', r.hiddenOnReverse.length && 'HIDDEN-REVERSE', r.smallTargets.length && 'SMALL-TARGETS', r.focusIssues.length && 'FOCUS', r.cls > 0.05 && 'CLS', axe && axe.length && `AXE(${axe.length})`].filter(Boolean);
      console.log(`${vpKey.padEnd(5)} ${mode.padEnd(8)} ${p.padEnd(36)} ${r.status} cls=${r.cls} lcp=${r.lcp} ${flags.join(' ') || 'ok'}`);
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(`\nReport: ${path.join(OUT, 'report.json')}`);
