// Renders Open Graph cards (1200×630) for every page into public/og/, plus favicon.ico and apple-touch-icon.png.
// Uses the site's own fonts and real captures. Usage: node scripts/og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'public/og');
fs.mkdirSync(out, { recursive: true });
const media = JSON.parse(fs.readFileSync(path.join(root, 'src/data/media.json'), 'utf8'));
const font = (f) => pathToFileURL(path.join(root, 'src/fonts', f)).href;

// Case studies: read titles/kickers from the TS data without a TS runtime (simple, stable fields).
const casesSrc = fs.readFileSync(path.join(root, 'src/data/cases.ts'), 'utf8');
const cases = [...casesSrc.matchAll(/slug: '([^']+)',\s*order: \d+,\s*group: '(\w+)',\s*title: '([^']+)',\s*kicker: '([^']+)',[\s\S]*?media:\s*\{\s*hero: '([^']+)'/g)].map((m) => ({ slug: m[1], group: m[2], title: m[3].replace(/\\'/g, "'"), kicker: m[4], hero: m[5] }));

const heroImg = (slug) => {
  const v = media[slug]?.views?.['desktop-hero'];
  if (!v) return null;
  const pick = v.webp.find((x) => x.w >= 1280) || v.webp[v.webp.length - 1];
  return pathToFileURL(path.join(root, 'public', pick.src)).href;
};

const cards = [
  { name: 'home', kicker: 'Webmaster · WordPress & e-commerce · Product data · SEO', title: 'Mousa Batarseh', sub: 'I build and run WordPress websites and e-commerce stores — and the checks that keep them honest.', big: true },
  { name: 'default', kicker: 'Warren, Michigan', title: 'Mousa Batarseh', sub: 'WordPress, e-commerce, product data & SEO.', big: true },
  { name: 'work', kicker: 'The archive', title: 'All the work.', sub: 'Tools, systems, case studies, websites, stores, reviews and proposals — every row links somewhere live.' },
  { name: 'about', kicker: 'About · Warren, Michigan', title: 'From fragile to boring.', sub: 'In the best way. Seven years of WordPress, e-commerce, product data and SEO.' },
  ...cases.map((c) => ({ name: `work-${c.slug}`, kicker: `${c.group === 'systems' ? 'Systems' : 'Sites & stores'} · ${c.kicker}`, title: c.title, sub: 'Case study — Mousa Batarseh', img: heroImg(c.hero) })),
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Hubot;src:url(${font('hubot-sans-display.woff2')});font-weight:500 900;font-stretch:88% 125%}
@font-face{font-family:Mona;src:url(${font('mona-sans-text.woff2')});font-weight:380 700}
@font-face{font-family:Azeret;src:url(${font('azeret-mono.woff2')});font-weight:400 600}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#efece4;color:#141414;font-family:Mona;position:relative;overflow:hidden}
.c{position:absolute;width:22px;height:22px;border-color:#7a7569;border-style:solid;border-width:0}
.tl{left:28px;top:28px;border-top-width:1.5px;border-left-width:1.5px}.tr{right:28px;top:28px;border-top-width:1.5px;border-right-width:1.5px}
.bl{left:28px;bottom:28px;border-bottom-width:1.5px;border-left-width:1.5px}.br{right:28px;bottom:28px;border-bottom-width:1.5px;border-right-width:1.5px}
.k{position:absolute;left:64px;top:62px;font:500 17px/1.3 Azeret;letter-spacing:.06em;text-transform:uppercase;max-width:${c.img ? 560 : 900}px}
.t{position:absolute;left:60px;bottom:${c.big ? 150 : 170}px;font-family:Hubot;font-weight:860;font-stretch:${c.big ? 108 : 104}%;font-size:${c.big ? 132 : c.title.length > 22 ? 70 : 88}px;line-height:.86;letter-spacing:-.045em;${c.big ? 'text-transform:uppercase;width:900px;' : `max-width:${c.img ? 560 : 1000}px;`}}
.t::before,.t::after{content:attr(data-t);position:absolute;inset:0;mix-blend-mode:multiply}
.t::before{color:#e23d28;transform:translate(-4px,-2px)}.t::after{color:#1d3fd8;transform:translate(4px,2px)}
.s{position:absolute;left:64px;bottom:66px;font:450 22px/1.35 Mona;color:#57534b;max-width:${c.img ? 540 : 820}px}
.img{position:absolute;right:64px;top:62px;width:520px;height:325px;overflow:hidden;box-shadow:0 0 0 1px #cfc9bb,-10px 10px 0 #e23d28,10px -10px 0 #1d3fd8}
.img img{width:100%;height:100%;object-fit:cover;object-position:top}
svg{position:absolute;right:64px;bottom:58px}
</style></head><body>
<i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>
<p class="k">${c.kicker}</p>
${c.img ? `<div class="img"><img src="${c.img}"></div>` : ''}
<h1 class="t" data-t="${c.title}">${c.title}</h1>
<p class="s">${c.sub}</p>
<svg width="64" height="64" viewBox="0 0 40 40"><circle cx="20" cy="20" r="12.5" fill="none" stroke="#141414" stroke-width="2.4"/><path d="M1.5 20h37" stroke="#e23d28" stroke-width="3"/><path d="M20 1.5v37" stroke="#1d3fd8" stroke-width="3"/></svg>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const c of cards) {
  const tmp = path.join(out, `.${c.name}.html`);
  fs.writeFileSync(tmp, html(c));
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(out, `${c.name}.png`) });
  fs.rmSync(tmp);
  console.log('✓', c.name);
}
await browser.close();

// Icons from the SVG mark.
const svg = fs.readFileSync(path.join(root, 'public/favicon.svg'));
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(path.join(root, 'public/apple-touch-icon.png'));
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
// Minimal ICO container with one 32×32 PNG image.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(root, 'public/favicon.ico'), Buffer.concat([header, png32]));
console.log('✓ icons');
