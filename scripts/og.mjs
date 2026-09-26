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

const read = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')); } catch { return d; } };
const pub = (src) => (src ? pathToFileURL(path.join(root, 'public', src)).href : null);
const posts = read('src/data/blog.json', []);
const reviews = read('src/data/reviews.json', []);
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const cards = [
  { name: 'home', kicker: 'Webmaster · WordPress & e-commerce · Product data · SEO', title: 'Mousa Batarseh', sub: 'I build and run WordPress websites and e-commerce stores — and the checks that keep them honest.', big: true },
  { name: 'default', kicker: 'Warren, Michigan', title: 'Mousa Batarseh', sub: 'WordPress, e-commerce, product data & SEO.', big: true },
  { name: 'work', kicker: 'The archive', title: 'All the work.', sub: 'Tools, systems, case studies, websites, stores, reviews and proposals — every row links somewhere live.' },
  { name: 'about', kicker: 'About · Warren, Michigan', title: 'From fragile to boring.', sub: 'In the best way. Seven years of WordPress, e-commerce, product data and SEO.' },
  { name: 'blog', kicker: `Blog · ${posts.length} articles`, title: 'Notes from running stores.', sub: 'WordPress, e-commerce operations, product data and SEO — the things that break, and what I do about them.' },
  { name: 'reviews', kicker: `Reviews · ${reviews.length} independent reviews`, title: 'Reviews, counted.', sub: 'Public pages only, every finding dated — and a working fix built alongside.' },
  ...cases.map((c) => ({ name: `work-${c.slug}`, kicker: `${c.group === 'systems' ? 'Systems' : 'Sites & stores'} · ${c.kicker}`, title: c.title, sub: 'Case study — Mousa Batarseh', img: heroImg(c.hero) })),
  ...posts.map((p) => ({ name: `blog-${p.slug}`, kicker: `Blog · ${p.categories.join(' · ')}`, title: p.title, sub: 'Mousa Batarseh', img: pub(p.image?.src) })),
  ...reviews.map((r) => ({ name: `review-${r.slug}`, kicker: `Review · ${r.title}`, title: r.headline, sub: `${r.stat.of ? `${r.stat.value} / ${r.stat.of}` : r.stat.value} ${r.stat.label}`, img: pub(r.sheets[0]?.shot?.src || r.hero?.src) })),
];

const TONES = ['#ece6ff', '#dff7f1', '#fff4c2', '#dbeafe', '#ffe3d6', '#ffe0ef'];
const html = (c, n) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Hubot;src:url(${font('hubot-sans-display.woff2')});font-weight:500 900;font-stretch:75% 110%}
@font-face{font-family:Mona;src:url(${font('mona-sans-text.woff2')});font-weight:380 700}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#fff;color:#16121f;font-family:Mona;position:relative;overflow:hidden}
.room{position:absolute;inset:20px;border-radius:44px;background:${TONES[n % TONES.length]};overflow:hidden}
.glow{position:absolute;left:-10%;right:-10%;top:45%;height:60%;background:linear-gradient(90deg,#ff5a36,#ff4fa3,#a15cff,#5b3df5,#2e6bff,#19c7b8,#c5f03a);filter:blur(90px);opacity:.28;border-radius:50%}
.k{position:absolute;left:64px;top:60px;display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:999px;background:#fff;font:700 19px/1.2 Mona;max-width:${c.img ? 560 : 900}px}
.k i{width:12px;height:12px;border-radius:50%;background:#ff5a36;flex:none}
.t{position:absolute;left:62px;bottom:${c.big ? 150 : 138}px;font-family:Hubot;font-weight:900;font-stretch:75%;text-transform:uppercase;font-size:${c.big ? 168 : c.title.length > 44 ? 58 : c.title.length > 24 ? 72 : 96}px;line-height:.86;${c.big ? 'width:1000px;' : `max-width:${c.img ? 560 : 1000}px;`}}
.s{position:absolute;left:64px;bottom:62px;font:550 22px/1.35 Mona;color:#4b4658;max-width:${c.img ? 540 : 820}px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.img{position:absolute;right:56px;top:74px;width:520px;height:325px;overflow:hidden;border-radius:24px;border:6px solid #fff;box-shadow:0 30px 60px -20px rgba(40,20,90,.35);transform:rotate(3deg)}
.img img{width:100%;height:100%;object-fit:cover;object-position:top}
.logo{position:absolute;right:64px;bottom:56px;display:flex;align-items:center;gap:12px;font:900 24px/1 Hubot;font-stretch:75%;text-transform:uppercase;letter-spacing:.01em}
.logo b{width:40px;height:40px;border-radius:50%;background:conic-gradient(from 200deg,#ff5a36,#ff4fa3,#a15cff,#5b3df5,#2e6bff,#19c7b8,#c5f03a,#ffc933,#ff5a36);display:grid;place-items:center}
.logo b::after{content:'';width:15px;height:15px;border-radius:50%;background:#fff}
</style></head><body><div class="room"><div class="glow"></div>
<p class="k"><i></i>${esc(c.kicker)}</p>
${c.img ? `<div class="img"><img src="${c.img}"></div>` : ''}
<h1 class="t">${esc(c.title)}</h1>
<p class="s">${esc(c.sub)}</p>
${c.big ? '' : '<p class="logo"><b></b>Mousa Batarseh</p>'}
</div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [n, c] of cards.entries()) {
  const tmp = path.join(out, `.${c.name}.html`);
  fs.writeFileSync(tmp, html(c, n));
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await sharp(await page.screenshot({ type: 'png' })).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, `${c.name}.jpg`));
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
