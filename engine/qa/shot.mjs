import { chromium } from 'playwright';
const [,, file, out, w=1440, h=900, full='1'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
await page.goto('file://' + file, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
// scroll progressively so intersection observers fire like they do for a reader
await page.evaluate(async () => { const H = document.body.scrollHeight; for (let y = 0; y < H; y += 500) { window.scrollTo({top: y, behavior: 'instant'}); await new Promise(r => setTimeout(r, 40)); } window.scrollTo({top: 0, behavior: 'instant'}); await new Promise(r => setTimeout(r, 300)); });
await page.waitForTimeout(900);
const sw = await page.evaluate(() => document.documentElement.scrollWidth);
const ch = await page.evaluate(() => document.documentElement.clientWidth);
const hidden = await page.evaluate(() => [...document.querySelectorAll('.rv')].filter(e => !e.classList.contains('in')).map(e => e.tagName + '.' + e.className + '@' + Math.round(e.getBoundingClientRect().top + scrollY)).join(' | '));
await page.screenshot({ path: out, fullPage: full === '1' });
console.log(JSON.stringify({ errors, scrollWidth: sw, clientWidth: ch, overflow: sw > ch, hiddenRv: hidden, height: await page.evaluate(() => document.body.scrollHeight) }));
await browser.close();
