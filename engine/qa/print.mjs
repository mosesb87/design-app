import { chromium } from 'playwright';
const [,, file, out] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage();
await page.goto('file://' + file, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.pdf({ path: out, format: 'Letter', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' }, preferCSSPageSize: true });
await browser.close();
console.log('pdf', out);
