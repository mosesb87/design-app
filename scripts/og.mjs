// Renders the Open Graph card from the real title page (no separate artwork to drift out of date).
// Usage: node scripts/og.mjs http://localhost:4173/sapienceai/ public/og.png
import { chromium } from 'playwright-core';
const [, , url = 'http://localhost:4173/sapienceai/', out = 'public/og.png'] = process.argv;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const css = `
  .deck, .actions, .fore-edge, .running-head .head-actions, .running-title { display: none !important; }
  .page--title { padding-top: 96px !important; }
  .title-h__display { font-size: 80px !important; }
  .title-h__category { font-size: 21px !important; margin-top: 18px !important; }
  .fragment__text { font-size: 14px !important; }
  /* The disclosure must stay readable when the card is shown at feed size (~550px wide). */
  .running-foot { height: auto !important; padding-block: 16px !important; font-size: 24px !important; line-height: 1.2 !important; }
  .running-foot__notice a, .rf-sep, .running-foot__folio { display: none !important; }
  .wordmark__tag { font-size: 20px !important; padding: 5px 10px !important; }
  .running-head { height: 72px !important; }
`;
// Inject before the page measures anything, so the ink lines are drawn to the card's layout.
await page.addInitScript((c) => {
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = c;
    document.head.appendChild(s);
  });
}, css);
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(3600);
await page.screenshot({ path: out });
await browser.close();
console.log('wrote', out);
