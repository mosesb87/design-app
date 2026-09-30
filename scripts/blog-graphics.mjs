// Redraws the blog's graphics in this site's style, with the same content:
// - article covers and in-article figures from src/data/blog-graphics.json (a faithful transcription of each
//   original image: headline, highlighted words, sub-line, the diagram's labels and values, tagline);
// - summary covers from each summary's own title and categories.
// Output: public/media/blog/drawn/<name>-1600.webp and -800.webp, and src/data/blog-drawn.json (old src → new).
// Usage: node scripts/blog-graphics.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'public/media/blog/drawn');
fs.mkdirSync(outDir, { recursive: true });
const read = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')); } catch { return d; } };
const specs = read('src/data/blog-graphics.json', []);
const summaries = read('src/data/blog-summaries.json', []);
const font = (f) => pathToFileURL(path.join(root, 'src/fonts', f)).href;
const logo = fs.readFileSync(path.join(root, 'src/assets/mousa-logo.svg'), 'utf8');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const base = (dark) => `
@font-face{font-family:Hubot;src:url(${font('hubot-sans-display.woff2')});font-weight:500 900;font-stretch:75% 110%}
@font-face{font-family:Mona;src:url(${font('mona-sans-text.woff2')});font-weight:380 700}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1600px;height:840px;overflow:hidden;font-family:Mona;background:${dark ? '#0d1015' : '#f3f4f6'};color:${dark ? '#f2f3f5' : '#0e1116'};position:relative}
.wash{position:absolute;border-radius:50%}
.w1{width:900px;height:900px;left:-300px;top:-380px;background:radial-gradient(closest-side,rgba(43,77,224,${dark ? 0.42 : 0.16}),transparent)}
.w2{width:820px;height:820px;right:-260px;bottom:-420px;background:radial-gradient(closest-side,rgba(142,162,255,${dark ? 0.3 : 0.14}),transparent)}
.kick{position:absolute;left:72px;top:64px;display:inline-flex;align-items:center;gap:12px;padding:12px 20px 12px 14px;border-radius:10px;background:${dark ? 'rgba(255,255,255,.1)' : '#fff'};font:700 20px/1 Mona;letter-spacing:.04em;text-transform:uppercase}
.kick i{width:12px;height:12px;border-radius:50%;background:#a8b7ff;box-shadow:0 0 0 4px rgba(43,77,224,.22)}
.brand{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:12px;font:900 24px/1 Hubot;font-stretch:75%;text-transform:uppercase;letter-spacing:.01em}
.brand svg{width:30px;height:30px}
.brand span{font:500 18px/1 Mona;text-transform:none;letter-spacing:0;color:${dark ? '#aab1bd' : '#4a505c'};margin-left:6px}
`;

// ── Diagram covers ─────────────────────────────────────────────────────────────────────────────
const hl = (dark) => (dark ? '#c9d2ff' : '#2b4de0');
const sectionBody = (p, dark) => {
  const items = p.items || [];
  const row = (inner, on, cls = '') => `<div class="row${on ? ' on' : ''}${cls}">${inner}</div>`;
  const grouped = (render) => {
    let last = p.label, out = '';
    for (const it of items) {
      if (it.group && it.group !== last) { out += `<p class="sublabel">${esc(it.group)}</p>`; last = it.group; }
      out += render(it);
    }
    return out;
  };
  switch (p.type) {
    case 'bars':
      return items.map((it) => `<div class="bar${it.hl ? ' on' : ''}"><div class="bar__t"><span>${esc(it.label)}</span><b>${esc(it.value ?? '')}</b></div><div class="bar__track"><i style="width:${Math.round(Math.max(0.03, Math.min(1, it.level ?? 0.5)) * 100)}%"></i></div>${it.note ? `<em>${esc(it.note)}</em>` : ''}</div>`).join('');
    case 'tiles':
      return `<div class="tiles">${items.map((it) => `<div class="tile${it.hl ? ' on' : ''}"><b>${esc(it.value ?? '')}</b><span>${esc(it.label ?? '')}</span>${it.note ? `<em>${esc(it.note)}</em>` : ''}</div>`).join('')}</div>`;
    case 'checklist':
      return grouped((it) => row(`<i class="dot${it.hl ? ' full' : ''}"></i><span class="lab">${esc(it.label)}</span>${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : it.value ? `<b>${esc(it.value)}</b>` : ''}`, it.hl));
    case 'tree':
      return items.map((it) => row(`<span class="lab" style="padding-left:${(it.depth || 0) * 28}px">${(it.depth || 0) > 0 ? '<i class="elbow"></i>' : ''}${esc(it.label)}</span>${it.value ? `<b>${esc(it.value)}</b>` : ''}${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ''}`, it.hl)).join('');
    case 'chips': {
      // Segments with captions (e.g. a SKU): tiles in a row, a caption under each, group labels above.
      if (items.some((it) => it.note)) {
        const groups = [];
        for (const it of items) { const g = it.group || ''; if (!groups.length || groups[groups.length - 1].g !== g) groups.push({ g, items: [] }); groups[groups.length - 1].items.push(it); }
        return `<div class="segs">${groups.map((g, gi) => `<div class="seggroup${gi === 0 ? ' first' : ''}">${g.g ? `<p class="seglabel">${esc(g.g)}</p>` : ''}<div class="segrow">${g.items.map((it) => `<div class="seg${it.hl ? ' on' : ''}"><b>${esc(it.label)}</b><span>${esc(it.note || '')}</span></div>`).join('')}</div></div>`).join('')}</div>`;
      }
      return `<div class="chips">${items.map((it) => `<span class="chip${it.hl ? ' on' : ''}">${esc(it.label)}</span>`).join('<i class="arrow">→</i>')}</div>`;
    }
    case 'table':
      return `<div class="table"><div class="trow thead"><span></span>${(p.columns || []).map((c) => `<span>${esc(c)}</span>`).join('')}</div>${items.map((it) => `<div class="trow${it.hl ? ' on' : ''}"><span class="q">${esc(it.label)}</span>${(it.cells || []).map((c) => `<b>${esc(c)}</b>`).join('')}</div>`).join('')}</div>`;
    default:
      if (items.some((it) => it.lines || it.pro)) {
        return items.map((it) => `<div class="opt${it.hl ? ' on' : ''}"><b>${esc(it.label)}</b>${(it.lines || [it.pro && `+ ${it.pro}`, it.con && `– ${it.con}`].filter(Boolean)).map((l) => `<span>${esc(l)}</span>`).join('')}</div>`).join('');
      }
      return items.map((it) => row(`<span class="lab">${esc(it.label)}${it.note ? `<em>${esc(it.note)}</em>` : ''}</span>${it.value ? `<b>${esc(it.value)}</b>` : ''}${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ''}`, it.hl)).join('');
  }
};
const panel = (s, dark) => {
  const parts = [s.panel_top, s.panel, s.panel2].filter(Boolean);
  if (!parts.length) return '';
  const rows = parts.reduce((n, p) => n + (p.items || []).length + (p.type === 'tiles' ? 1 : 0), 0);
  const dense = rows > 7 ? (rows > 9 ? ' dense dense2' : ' dense') : '';
  const card = dark ? '#161a21' : '#fff';
  const line = dark ? 'rgba(255,255,255,.08)' : '#eceef2';
  const soft = dark ? '#1d2230' : '#f3f4f6';
  const mute = dark ? '#aab1bd' : '#4a505c';
  const acc = dark ? '#8ea2ff' : '#2b4de0';
  const sec = (p, i) => `<div class="sec">${p.label && !(p.type === 'chips' && (p.items || []).some((it) => it.note)) ? `<p class="plabel">${esc(p.label)}</p>` : ''}<div class="pbody">${sectionBody(p, dark)}</div></div>`;
  return `<div class="panel${dense}">${parts.map(sec).join('')}</div>
  <style>
    .panel{position:absolute;right:64px;top:64px;bottom:150px;width:720px;padding:28px 32px;border-radius:14px;background:${card};box-shadow:${dark ? '0 0 0 1px rgba(255,255,255,.08)' : '0 1px 2px rgba(14,17,22,.05),0 30px 60px -30px rgba(14,17,22,.3)'};display:flex;flex-direction:column;justify-content:center;gap:22px}
    .sec{display:flex;flex-direction:column;gap:12px}
    .plabel,.sublabel,.seglabel{font:750 15px/1.2 Mona;letter-spacing:.08em;text-transform:uppercase;color:${mute}}
    .sublabel{margin-top:6px}
    .pbody{display:flex;flex-direction:column;gap:10px}
    .bar__t{display:flex;justify-content:space-between;gap:16px;font:600 20px/1.2 Mona}
    .bar__t b{font:900 26px/1 Hubot;font-stretch:80%}
    .bar__track{height:12px;border-radius:6px;background:${line};margin-top:8px;overflow:hidden}
    .bar__track i{display:block;height:100%;border-radius:6px;background:${acc}}
    .bar.on .bar__track i{background:#a8b7ff}
    .bar.on .bar__t b{color:${dark ? '#c9d2ff' : '#1c33a8'}}
    .bar em,.row em,.tile em{display:block;font:500 15px/1.3 Mona;font-style:normal;color:${mute};margin-top:4px}
    .tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    .tile{padding:18px 22px;border-radius:10px;background:${soft};display:flex;flex-direction:column;gap:6px}
    .tile b{font:900 50px/.9 Hubot;font-stretch:78%}
    .tile span{font:650 15px/1.25 Mona;text-transform:uppercase;letter-spacing:.04em;color:${mute}}
    .tile.on{background:#a8b7ff;color:#0e1116}
    .tile.on span,.tile.on em{color:#0e1116}
    .row{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:8px;background:${soft};font:600 19px/1.25 Mona}
    .row.on{background:${dark ? 'rgba(142,162,255,.2)' : '#eef1fc'};box-shadow:inset 0 0 0 2px #a8b7ff}
    .row .lab{flex:1;min-width:0}
    .row b{font:900 24px/1 Hubot;font-stretch:80%;white-space:nowrap}
    .tag{padding:6px 12px;border-radius:10px;background:${dark ? '#2b4de0' : '#e8ecfd'};color:${dark ? '#fff' : '#1c33a8'};font:750 13px/1 Mona;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
    .row.on .tag{background:#a8b7ff;color:#0e1116}
    .dot{width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 2px ${acc};flex:none}
    .dot.full{background:#a8b7ff;box-shadow:none}
    .elbow{display:inline-block;width:14px;height:10px;margin-right:10px;border-radius:0 0 0 6px;box-shadow:inset 2px -2px 0 ${acc};vertical-align:4px}
    .chips{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
    .chip{padding:12px 18px;border-radius:10px;background:${soft};font:700 19px/1 Mona}
    .chip.on{background:#a8b7ff;color:#0e1116}
    .arrow{font-style:normal;color:${mute};font-size:20px}
    .segs{display:flex;align-items:flex-end;gap:12px}
    .seggroup{display:flex;flex-direction:column;gap:8px}
    .seggroup.first{padding:10px;border-radius:16px;box-shadow:inset 0 0 0 2px ${dark ? 'rgba(142,162,255,.5)' : 'rgba(43,77,224,.35)'}}
    .segrow{display:flex;gap:8px}
    .seg{min-width:92px;padding:14px 16px;border-radius:8px;background:${soft};display:flex;flex-direction:column;gap:6px;align-items:center}
    .seg b{font:900 30px/1 Hubot;font-stretch:80%}
    .seg span{font:650 13px/1 Mona;letter-spacing:.06em;color:${mute}}
    .seg.on{background:#a8b7ff;color:#0e1116}
    .seg.on span{color:#0e1116}
    .table{display:flex;flex-direction:column;gap:8px}
    .trow{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:center;gap:12px;padding:12px 16px;border-radius:8px;background:${soft};font:600 19px/1.25 Mona}
    .trow b{font:900 24px/1 Hubot;font-stretch:80%;color:${dark ? '#c9d2ff' : '#1c33a8'}}
    .thead{background:none;padding-block:0 4px;font:750 15px/1 Mona;letter-spacing:.08em;color:${mute}}
    .opt{display:flex;flex-direction:column;gap:4px;padding:14px 18px;border-radius:16px;background:${soft};font:600 17px/1.3 Mona;color:${mute}}
    .opt b{font:900 26px/1 Hubot;font-stretch:80%;text-transform:uppercase;color:${dark ? '#f2f3f5' : '#0e1116'}}
    .opt.on{background:${dark ? 'rgba(142,162,255,.2)' : '#eef1fc'};box-shadow:inset 0 0 0 2px #a8b7ff}
    .opt.on b{color:${dark ? '#c9d2ff' : '#1c33a8'}}
    .dense .pbody{gap:7px}
    .dense .row{padding:8px 14px;font-size:17px}
    .dense2 .row{padding:5px 12px;font-size:16px}
    .dense2 .pbody{gap:5px}
    .dense2 .tag{padding:4px 10px;font-size:12px}
  </style>`;
};

const coverHtml = (s, dark) => `<!doctype html><html><head><meta charset="utf-8"><style>${base(dark)}
.hl{color:${hl(dark)}}
.lead{position:absolute;left:72px;top:150px;width:690px;display:flex;flex-direction:column;gap:26px}
h1{font:900 ${(s.headline || []).map((h) => h.text).join('').length > 38 ? 76 : 88}px/.9 Hubot;font-stretch:75%;text-transform:uppercase;letter-spacing:-.005em}
.sub{width:600px;font:500 26px/1.36 Mona;color:${dark ? '#aab1bd' : '#4a505c'}}
.tag-line{position:absolute;right:64px;bottom:96px;width:700px;font:800 17px/1.3 Mona;letter-spacing:.06em;text-transform:uppercase;color:${dark ? '#c9d2ff' : '#1c33a8'}}
.foot{position:absolute;right:64px;bottom:60px;width:700px;font:500 16px/1.3 Mona;color:${dark ? '#aab1bd' : '#4a505c'}}
</style></head><body><i class="wash w1"></i><i class="wash w2"></i>
<p class="kick"><i></i>${esc([s.series, s.category].filter(Boolean).join(' · '))}</p>
<div class="lead"><h1>${(s.headline || []).map((h) => (h.hl ? `<span class="hl">${esc(h.text)}</span>` : esc(h.text))).join('')}</h1>
${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ''}</div>
${panel(s, dark)}
${s.tagline ? `<p class="tag-line">${esc(s.tagline)}</p>` : ''}
${s.footnote ? `<p class="foot">${esc(s.footnote)}</p>` : ''}
<p class="brand">${logo}Mousa Batarseh<span>mousabatarseh.com</span></p>
</body></html>`;

// ── Summary covers ─────────────────────────────────────────────────────────────────────────────
const ICONS = {
  tag: '<path d="M50 68 H124 L154 100 L124 132 H50 Q42 132 42 124 V76 Q42 68 50 68 Z"/><circle class="a f" cx="134" cy="100" r="6"/>',
  cell: '<rect x="36" y="52" width="128" height="96" rx="10"/><path class="m" d="M36 76 H164 M36 100 H164 M36 124 H164 M78 76 V148 M122 76 V148"/><rect class="a t" x="78" y="100" width="44" height="24"/>',
  lens: '<circle cx="90" cy="88" r="38"/><path class="b" d="M118 116 L150 148"/><path class="a" d="M70 78 Q74 64 88 60"/>',
  blocks: '<rect x="44" y="44" width="50" height="50" rx="9"/><rect class="a t" x="106" y="44" width="50" height="50" rx="9"/><rect x="44" y="106" width="50" height="50" rx="9"/><rect x="106" y="106" width="50" height="50" rx="9"/>',
  check: '<circle cx="100" cy="100" r="54"/><path class="a b" d="M78 101 L94 117 L124 85"/>',
  spark: '<path class="m" d="M44 150 H156 M44 150 V50"/><path class="a b" d="M52 132 L80 108 L102 118 L128 82 L150 64"/><circle class="a f" cx="150" cy="64" r="6"/>',
  pin: '<path d="M100 162 C84 136 56 116 56 86 A44 44 0 0 1 144 86 C144 116 116 136 100 162 Z"/><circle class="a" cx="100" cy="86" r="15"/>',
  bolt: '<rect x="34" y="50" width="132" height="100" rx="12"/><path class="a b" d="M60 98 L78 112 L60 126"/><path d="M88 128 H116"/>',
  percent: '<circle cx="100" cy="100" r="56"/><circle cx="80" cy="80" r="11"/><circle cx="120" cy="120" r="11"/><path class="a b" d="M126 74 L74 126"/>',
};
const iconFor = (s) => {
  const t = `${s.title} ${s.categories.join(' ')}`.toLowerCase();
  if (/price|promo|sale|discount/.test(t)) return ['percent', 'tag'];
  if (/seo|search|console|404|redirect/.test(t)) return ['lens', 'spark'];
  if (/sku|variant|csv|spreadsheet|inventory|import|catalog/.test(t)) return ['cell', 'check'];
  if (/photo|image|studio/.test(t)) return ['blocks', 'spark'];
  if (/restaurant|local|detroit|event|business/.test(t)) return ['pin', 'check'];
  if (/plugin|backup|faster|slow|webmaster|form/.test(t)) return ['bolt', 'check'];
  if (/shopify|b2b|wholesale|collection|product/.test(t)) return ['tag', 'cell'];
  return ['blocks', 'check'];
};
const tileSvg = (name, tile, stroke, acc) => `<svg viewBox="0 0 200 200"><g fill="none" stroke="${stroke}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" style="--acc:${acc}">${ICONS[name]}</g></svg>`;
const summaryHtml = (s, i) => {
  const dark = i % 3 === 1;
  const [a, b] = iconFor(s);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base(dark)}
h1{position:absolute;left:72px;top:150px;width:760px;font:900 92px/.9 Hubot;font-stretch:75%;text-transform:uppercase;letter-spacing:-.005em}
.t{position:absolute;display:grid;place-items:center;border-radius:24%}
.t svg{width:100%;height:100%}
.t .a{stroke:var(--acc)} .t .f{fill:var(--acc);stroke:none} .t .t{fill:color-mix(in srgb,var(--acc) 18%,transparent)} .t .m{stroke-opacity:.35} .t .b{stroke-width:5}
.big{right:150px;top:150px;width:420px;height:420px;background:${i % 2 ? '#a8b7ff' : '#2b4de0'};box-shadow:0 40px 80px -40px ${i % 2 ? 'rgba(194,65,12,.7)' : 'rgba(28,51,168,.7)'};transform:rotate(${i % 2 ? -6 : 5}deg)}
.small{right:90px;top:500px;width:190px;height:190px;background:${dark ? '#161a21' : '#fff'};box-shadow:${dark ? '0 0 0 1px rgba(255,255,255,.1)' : '0 0 0 1px rgba(14,17,22,.07),0 24px 48px -24px rgba(14,17,22,.35)'};transform:rotate(${i % 2 ? 8 : -7}deg)}
.dot1{position:absolute;right:560px;top:120px;width:26px;height:26px;border-radius:50%;background:${i % 2 ? '#2b4de0' : '#a8b7ff'}}
.dot2{position:absolute;right:120px;top:100px;width:14px;height:14px;border-radius:50%;background:${dark ? '#f2f3f5' : '#0e1116'}}
</style></head><body><i class="wash w1"></i><i class="wash w2"></i>
<p class="kick"><i></i>${esc(s.categories.join(' · '))}</p>
<h1>${esc(s.title)}</h1>
<span class="t big">${tileSvg(a, '', i % 2 ? '#0e1116' : '#ffffff', i % 2 ? '#ffffff' : '#c9d2ff')}</span>
<span class="t small">${tileSvg(b, '', dark ? '#f2f3f5' : '#0e1116', i % 2 ? '#2b4de0' : '#a8b7ff')}</span>
<i class="dot1"></i><i class="dot2"></i>
<p class="brand">${logo}Mousa Batarseh<span>mousabatarseh.com</span></p>
</body></html>`;
};

// ── Render ─────────────────────────────────────────────────────────────────────────────────────
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1600, height: 840 }, deviceScaleFactor: 1 });
const map = { covers: {}, figures: {}, summaries: {} };
const render = async (html, name) => {
  const tmp = path.join(outDir, `.${name}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);
  const png = await page.screenshot({ type: 'png' });
  fs.rmSync(tmp);
  await sharp(png).webp({ quality: 88 }).toFile(path.join(outDir, `${name}-1600.webp`));
  await sharp(png).resize(800).webp({ quality: 86 }).toFile(path.join(outDir, `${name}-800.webp`));
  return { src: `/media/blog/drawn/${name}-1600.webp`, small: `/media/blog/drawn/${name}-800.webp`, w: 1600, h: 840 };
};
let n = 0;
for (const s of specs) {
  const dark = n++ % 3 === 1;
  const name = s.kind === 'figure' ? `${s.slug}-figure-${path.basename(s.src).split('-')[0]}` : `${s.slug}-cover`;
  const out = await render(coverHtml(s, dark), name);
  if (s.kind === 'figure') map.figures[s.src] = out; else map.covers[s.slug] = out;
  console.log('✓', name);
}
for (const [i, s] of summaries.entries()) {
  map.summaries[s.slug] = await render(summaryHtml(s, i), `${s.slug}-summary`);
  console.log('✓', s.slug);
}
await browser.close();
fs.writeFileSync(path.join(root, 'src/data/blog-drawn.json'), JSON.stringify(map, null, 2) + '\n');
console.log(`covers ${Object.keys(map.covers).length}, figures ${Object.keys(map.figures).length}, summaries ${Object.keys(map.summaries).length}`);
