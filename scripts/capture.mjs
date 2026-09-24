// QA harness: scroll-sampled screenshots across viewports, reverse-scroll pass,
// keyboard focus pass and console-error collection.
// Usage: node scripts/capture.mjs <url> <outDir> [--reduced] [--steps=24] [--only=desktop,mobile]
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const [, , url = 'http://localhost:4173/', outDir = 'qa-shots', ...flags] = process.argv;
const reduced = flags.includes('--reduced');
const steps = Number((flags.find((f) => f.startsWith('--steps=')) || '--steps=24').split('=')[1]);
const only = (flags.find((f) => f.startsWith('--only=')) || '').split('=')[1];
const keyboard = flags.includes('--keyboard');
const reverse = flags.includes('--reverse');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false },
  laptop: { width: 1280, height: 720, isMobile: false, hasTouch: false },
  tablet: { width: 834, height: 1112, isMobile: true, hasTouch: true },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

const executablePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath, args: ['--disable-gpu-sandbox'] });
const report = { url, reduced, viewports: {} };

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  if (only && !only.split(',').includes(name)) continue;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(2600); // let the intro play
  const tag = `${name}${reduced ? '-reduced' : ''}`;
  await page.screenshot({ path: path.join(outDir, `${tag}-000-intro.jpg`), quality: 70 });

  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const scrollTo = async (y) => {
    await page.evaluate((yy) => {
      const l = window.__lenis;
      if (l) l.scrollTo(yy, { immediate: true, force: true });
      else window.scrollTo(0, yy);
    }, y);
    await page.waitForTimeout(900);
  };
  const shots = [];
  for (let i = 1; i <= steps; i++) {
    const y = Math.round((total * i) / steps);
    await scrollTo(y);
    const file = `${tag}-${String(i).padStart(3, '0')}-y${y}.jpg`;
    await page.screenshot({ path: path.join(outDir, file), quality: 70 });
    shots.push(file);
  }
  if (reverse) {
    for (let i = steps - 1; i >= 0; i -= 3) {
      const y = Math.round((total * i) / steps);
      await scrollTo(y);
      await page.screenshot({ path: path.join(outDir, `${tag}-rev-${String(i).padStart(3, '0')}-y${y}.jpg`), quality: 70 });
    }
  }
  if (keyboard) {
    await scrollTo(0);
    for (let i = 1; i <= 14; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(350);
      const info = await page.evaluate(() => {
        const a = document.activeElement;
        return a ? `${a.tagName.toLowerCase()}${a.id ? '#' + a.id : ''} "${(a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 40)}"` : 'none';
      });
      shots.push(`tab${i}: ${info}`);
      if (i % 3 === 0) await page.screenshot({ path: path.join(outDir, `${tag}-tab-${String(i).padStart(2, '0')}.jpg`), quality: 70 });
    }
  }
  const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  report.viewports[name] = { total, errors, shots, overflowX };
  await context.close();
}
await browser.close();
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ viewports: Object.fromEntries(Object.entries(report.viewports).map(([k, v]) => [k, { total: v.total, errors: v.errors.length, overflowX: v.overflowX }])) }, null, 1));
