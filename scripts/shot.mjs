// Dev helper: screenshot a page at scroll positions (fractions of scrollable height or 'vh' steps).
// Usage: node scripts/shot.mjs <url> <out-prefix> [--w=1440] [--h=900] [--at=0,0.1,0.2] [--reduced] [--mobile] [--wait=1500]
import { chromium } from 'playwright';
const [, , url, prefix = '/tmp/claude-0/shots/page', ...flags] = process.argv;
const opt = (k, d) => (flags.find((f) => f.startsWith(`--${k}=`)) || '').split('=')[1] || d;
const w = +opt('w', 1440), h = +opt('h', 900);
const mobile = flags.includes('--mobile');
const reduced = flags.includes('--reduced');
const at = opt('at', '0').split(',').map(Number);
const wait = +opt('wait', 1600);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? 'reduce' : 'no-preference' });
const page = await ctx.newPage();
const logs = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(wait);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (const a of at) {
  const y = a <= 1 ? Math.round(total * a) : Math.round(a);
  await page.evaluate((yy) => { const l = window.__lenis; if (l) l.scrollTo(yy, { immediate: true, force: true }); else window.scrollTo(0, yy); }, y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${prefix}-${String(a).replace('.', '_')}.jpg`, quality: 70, type: 'jpeg' });
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log(JSON.stringify({ total, overflow, logs: logs.slice(0, 20) }, null, 1));
await browser.close();
