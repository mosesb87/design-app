import fs from 'node:fs'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright'; import sharp from 'sharp';
const root = '/home/claude/design-app';
const font = (f) => pathToFileURL(path.join(root, 'src/fonts', f)).href;
const logo = fs.readFileSync(path.join(root, 'src/assets/mousa-logo.svg'), 'utf8');
const out = process.argv[2];
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Hubot;src:url(${font('hubot-sans-display.woff2')});font-weight:500 900;font-stretch:75% 110%}
@font-face{font-family:Mona;src:url(${font('mona-sans-text.woff2')});font-weight:380 700}
*{box-sizing:border-box;margin:0}
body{width:1584px;height:396px;background:#f3f4f6;color:#0e1116;font-family:Mona;position:relative;overflow:hidden}
.glow{position:absolute;left:38%;right:-10%;top:30%;height:90%;background:linear-gradient(90deg,#1c33a8,#2b4de0,#8ea2ff);filter:blur(110px);opacity:.2;border-radius:50%}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(14,17,22,.1) 1px,transparent 1.3px);background-size:26px 26px}
.k{position:absolute;left:404px;top:50px;display:flex;align-items:center;gap:10px;padding:9px 16px;border-radius:999px;background:#fff;font:700 17px/1.2 Mona;box-shadow:0 0 0 1px rgba(14,17,22,.06)}
.k i{width:10px;height:10px;border-radius:50%;background:#2b4de0;flex:none;box-shadow:0 0 0 3px rgba(43,77,224,.2)}
.t{position:absolute;left:402px;top:100px;font-family:Hubot;font-weight:900;font-stretch:75%;text-transform:uppercase;font-size:70px;line-height:.9;width:1060px;letter-spacing:-.005em}
.t em{font-style:normal;color:#2b4de0}
.s{position:absolute;left:404px;bottom:46px;font:550 19px/1.35 Mona;color:#4a505c;max-width:760px}
.s b{color:#0e1116;font-weight:700}
.logo{position:absolute;right:64px;bottom:52px;display:flex;align-items:center;gap:14px;font:900 26px/1 Hubot;font-stretch:75%;text-transform:uppercase;letter-spacing:.01em}
.logo svg{width:52px;height:52px;display:block}
.site{position:absolute;right:64px;top:56px;font:700 17px/1 Mona;color:#4a505c;letter-spacing:.02em}
</style></head><body><div class="dots"></div><div class="glow"></div>
<p class="k"><i></i>E-Commerce Specialist · Digital Site Merchandiser · Metro Detroit &amp; remote</p>
<p class="site">mousabatarseh.com</p>
<h1 class="t">I find what’s costing a store sales — and ship the <em>fix.</em></h1>
<p class="s"><b>Seven years</b> of Shopify, WooCommerce and WordPress storefronts · <b>14,000-SKU</b> catalogs by bulk CSV · <b>25</b> independent store reviews, each with a working fix.</p>
<p class="logo">${logo}Mousa Batarseh</p>
</body></html>`;
const tmp = out + '.html'; fs.writeFileSync(tmp, html);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(tmp).href); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(150);
await sharp(await page.screenshot({ type: 'png' })).jpeg({ quality: 90, mozjpeg: true }).toFile(out);
await browser.close(); fs.rmSync(tmp); console.log('ok', out);
