import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > 392 && getComputedStyle(e).position !== 'fixed' && !e.closest('.marquee')).slice(0, 12).map(e => e.tagName + '.' + String(e.className).slice(0, 40) + ' right=' + Math.round(e.getBoundingClientRect().right)).join('\n')));
await browser.close();
