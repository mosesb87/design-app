import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const url of process.argv.slice(2)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [], failed = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('requestfailed', r => failed.push(r.url()));
  page.on('response', r => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { const H = document.body.scrollHeight; for (let y = 0; y < H; y += 600) { window.scrollTo({top: y, behavior: 'instant'}); await new Promise(r => setTimeout(r, 30)); } });
  await page.waitForTimeout(600);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth), cw = await page.evaluate(() => document.documentElement.clientWidth);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter(e => !e.classList.contains('in')).length);
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith('https://mousabatarseh.com')));
  console.log(JSON.stringify({ url, errors, failed, overflow: sw > cw, hiddenRv: hidden, links: [...new Set(links)] }));
  await page.close();
}
await browser.close();
