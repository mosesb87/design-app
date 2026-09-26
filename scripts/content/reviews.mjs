// Turn the fetched reviews (capture/content/reviews/) into this site's own review pages.
// Structured parts (headline number, findings, site, dates) come from each review's summary page, which every
// review shares; the long form comes from the full review's sheets, cleaned to plain, safe HTML. Nothing is
// rewritten: every sentence is the review's own. Resume and cover-letter files are not linked.
// Output: src/data/reviews.json + public/media/reviews/*. Run: node scripts/content/reviews.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SRC = path.join(root, 'capture/content');
const R = path.join(SRC, 'reviews');
const OUT_MEDIA = path.join(root, 'public/media/reviews');
const read = (p, d) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return d; } };
const assets = read(path.join(SRC, 'assets/assets.json'), {});
fs.mkdirSync(OUT_MEDIA, { recursive: true });

const squash = (s = '') => s.replace(/\s+/g, ' ').trim();
const text = (n) => squash(n ? parse(`<i>${n.innerHTML}</i>`).text : '');
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Sept: 8, Oct: 9, Nov: 10, Dec: 11 };
const isoDate = (s = '') => { const m = s.match(/([A-Z][a-z]{2,3})\.? (\d{1,2}), (\d{4})/); return m ? new Date(Date.UTC(+m[3], MONTHS[m[1]], +m[2])).toISOString().slice(0, 10) : ''; };

// ── Images → local WebP (two widths)
async function local(url, { alt = '', max = 1600, crop } = {}) {
  const a = assets[url];
  const file = a?.file ? path.join(SRC, 'assets', a.file) : fs.existsSync(url) ? url : null;
  if (!file || !fs.existsSync(file) || /\.svg$/.test(file)) return null;
  const base = crypto.createHash('sha1').update(`${url}|${max}|${crop || ''}`).digest('hex').slice(0, 16);
  let img = sharp(file);
  const meta = await img.metadata();
  if (crop) { const h = Math.min(meta.height, Math.round(meta.width * crop)); img = img.extract({ left: 0, top: 0, width: meta.width, height: h }); }
  const buf = await img.toBuffer();
  const m2 = await sharp(buf).metadata();
  const w1 = Math.min(max, m2.width);
  const small = Math.min(Math.round(max / 2), w1);
  await sharp(buf).resize({ width: w1, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT_MEDIA, `${base}-l.webp`));
  await sharp(buf).resize({ width: small, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(OUT_MEDIA, `${base}-s.webp`));
  return { src: `/media/reviews/${base}-l.webp`, small: `/media/reviews/${base}-s.webp`, w: w1, h: Math.round((m2.height / m2.width) * w1), sw: small, alt };
}

// ── The reviews index: one card per review (the index repeats featured ones)
const index = read(path.join(R, 'index.json'), { cards: [] });
const cards = new Map();
for (const c of index.cards) {
  const slug = new URL(c.href).pathname.match(/\/reviews\/reviews\/([^/]+)/)?.[1];
  if (!slug || cards.has(slug)) continue;
  const lines = c.text.split('\n').map((x) => x.trim()).filter(Boolean);
  const [site, focus, date, value] = lines;
  let i = 4;
  const of = lines[i]?.startsWith('/') ? lines[i++].slice(1) : '';
  const label = lines[i++] || '';
  const title = lines[i++] || '';
  const blurb = lines[i++] || '';
  cards.set(slug, { slug, site, focus, date: isoDate(date), value, of, label, title, blurb });
}

// ── Long-form cleaner for the full review's sheets
const DROP = new Set(['script', 'style', 'noscript', 'svg', 'canvas', 'iframe', 'form', 'button', 'input', 'select', 'textarea', 'template', 'video', 'audio', 'nav', 'dialog', 'label', 'object', 'embed', 'map']);
const INLINE = new Set(['a', 'b', 'strong', 'em', 'i', 'span', 'code', 'q', 'small', 'mark', 'br', 'sup', 'sub', 'abbr', 'time', 'kbd', 's', 'del', 'ins', 'u', 'cite', 'var', 'samp', 'data', 'wbr', 'img']);
const KEEP_BLOCK = new Set(['h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'li', 'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'dl', 'dt', 'dd', 'hr', 'pre']);
const KEEP_INLINE = new Set(['a', 'strong', 'em', 'code', 'q', 'br', 'sup', 'sub', 'img', 'span', 's', 'del', 'mark']);
const HEAD = { h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5', h5: 'h5', h6: 'h5' };

function cls(el) { return (el.getAttribute?.('class') || '').toLowerCase(); }
function isInlineNode(n) { return n.nodeType === 3 || (n.nodeType === 1 && INLINE.has(n.tagName.toLowerCase())); }

async function cleanSheet(html, ctx) {
  const doc = parse(`<div id="x">${html}</div>`, { comment: false });
  const x = doc.querySelector('#x');
  // Remove chrome and hidden things; keep the footer's disclaimer.
  for (const f of x.querySelectorAll('footer')) {
    const d = f.querySelector('.disc, [class*=disc]');
    if (d && !ctx.disclaimer) ctx.disclaimer = text(d);
    f.remove();
  }
  // Tab panels hold real content: show each one, titled with its tab's label, before the tabs are dropped.
  for (const panel of x.querySelectorAll('[role=tabpanel]')) {
    const id = panel.getAttribute('aria-labelledby');
    const tab = id ? x.querySelector(`[id="${id}"]`) : x.querySelector(`[aria-controls="${panel.getAttribute('id')}"]`);
    const label = tab ? squash(tab.text).replace(/^(\d{2})(?=\D)/, '$1 · ') : '';
    for (const a of ['hidden', 'data-hidden', 'aria-hidden']) panel.removeAttribute(a);
    panel.querySelectorAll('[data-hidden]').forEach((e) => { if (!e.closest('[role=tablist]')) e.removeAttribute('data-hidden'); });
    if (label) panel.insertAdjacentHTML('afterbegin', `<h3>${label.replace(/</g, '&lt;')}</h3>`);
  }
  x.querySelectorAll('[data-hidden], [aria-hidden="true"], [hidden], .topbar, .ruler, .next, .skip, [class*=toast], [role=tablist]').forEach((e) => e.remove());
  // The sheet's own h1 becomes the section title.
  const h1 = x.querySelector('h1');
  const title = h1 ? squash(h1.structuredText.replace(/\n/g, ' ')) : '';
  if (h1) h1.remove();
  const kick = x.querySelector('.kick, .eyebrow');
  const kicker = kick ? text(kick) : '';
  if (kick && kick === x.querySelector('.kick, .eyebrow')) kick.remove();

  // Small labels (eyebrows, categories) keep their role as labels.
  x.querySelectorAll('.eyebrow, .kick, .cat, .tags, .kicker, .label').forEach((e) => {
    const t = text(e);
    if (t && t.length < 90 && !e.querySelector('h1, h2, h3, h4, p, ul, ol, table')) e.replaceWith(...parse(`<p class="rv-kick">${t.replace(/</g, '&lt;')}</p>`).childNodes);
  });

  const walk = async (node) => {
    for (const c of [...node.childNodes]) {
      if (c.nodeType === 8) { c.remove(); continue; }
      if (c.nodeType !== 1) continue;
      const tag = c.tagName.toLowerCase();
      if (DROP.has(tag)) { c.remove(); continue; }
      const k = cls(c);
      await walk(c);
      if (tag === 'a') {
        const href = c.getAttribute('href') || '';
        if (/\/files\//.test(href) || /\.(pdf|docx?|csv)$/i.test(href)) { c.remove(); continue; }
        const to = ctx.link(href);
        for (const a of Object.keys(c.attributes)) c.removeAttribute(a);
        if (to === null) { c.replaceWith(...c.childNodes); continue; }
        c.setAttribute('href', to);
        if (/^https?:/.test(to)) c.setAttribute('rel', 'noopener');
        continue;
      }
      if (tag === 'img') {
        const src = c.getAttribute('src') || '';
        const alt = squash(c.getAttribute('alt') || '');
        const img = await local(src, { alt, max: 1400 });
        if (!img || img.w < 60) { c.remove(); continue; }
        for (const a of Object.keys(c.attributes)) c.removeAttribute(a);
        c.setAttribute('src', img.src);
        c.setAttribute('srcset', `${img.small} ${img.sw}w, ${img.src} ${img.w}w`);
        c.setAttribute('sizes', '(min-width: 900px) 760px, 92vw');
        c.setAttribute('alt', alt);
        c.setAttribute('width', String(img.w));
        c.setAttribute('height', String(img.h));
        c.setAttribute('loading', 'lazy');
        c.setAttribute('decoding', 'async');
        continue;
      }
      if (HEAD[tag]) {
        const h = parse(`<${HEAD[tag]}>${squash(c.innerHTML)}</${HEAD[tag]}>`).firstChild;
        c.replaceWith(h);
        continue;
      }
      if (tag === 'span' && /\bsev\b/.test(k)) {
        const level = /crit/.test(k) ? 'crit' : /warn/.test(k) ? 'warn' : 'good';
        for (const a of Object.keys(c.attributes)) c.removeAttribute(a);
        c.setAttribute('class', `rv-sev rv-sev--${level}`);
        continue;
      }
      if (KEEP_BLOCK.has(tag)) {
        for (const a of Object.keys(c.attributes)) {
          if ((tag === 'td' || tag === 'th') && ['colspan', 'rowspan'].includes(a)) continue;
          if (a === 'class' && /^rv-/.test(c.getAttribute('class'))) continue;
          c.removeAttribute(a);
        }
        if (tag === 'table') c.replaceWith(...parse(`<div class="table-scroll" tabindex="0">${c.toString()}</div>`).childNodes);
        continue;
      }
      if (KEEP_INLINE.has(tag) || tag === 'b' || tag === 'i') {
        if (tag === 'b') { const s = parse(`<strong>${c.innerHTML}</strong>`).firstChild; c.replaceWith(s); continue; }
        if (tag === 'i') { const s = parse(`<em>${c.innerHTML}</em>`).firstChild; c.replaceWith(s); continue; }
        if (tag === 'span') { c.replaceWith(...c.childNodes); continue; }
        for (const a of Object.keys(c.attributes)) c.removeAttribute(a);
        continue;
      }
      if (INLINE.has(tag)) { c.replaceWith(...c.childNodes); continue; }
      // Any other container: its loose inline runs become paragraphs; notes become a quote card.
      const isNote = /\b(callout|notice|note|aside)\b/.test(k) || tag === 'aside';
      const isKick = /\b(kick|eyebrow|cat|tag)\b/.test(k);
      const out = [];
      let run = [];
      const flush = () => {
        // A label glued to its value ("<b>Scope</b>vanguardworld.com") gets its space back.
        const html = run.map((n, j) => {
          const str = n.toString();
          const prev = run[j - 1];
          if (prev && prev.nodeType === 1 && n.nodeType === 3 && /^\w/.test(n.text) && /^(strong|b|em)$/i.test(prev.tagName)) return ' ' + str;
          if (prev && prev.nodeType === 3 && n.nodeType === 1 && /\w$/.test(prev.text) && /^(strong|b)$/i.test(n.tagName)) return ' ' + str;
          return str;
        }).join('');
        if (squash(parse(`<i>${html}</i>`).text)) out.push(isKick ? `<p class="rv-kick">${html.trim()}</p>` : `<p>${html.trim()}</p>`);
        run = [];
      };
      for (const n of c.childNodes) {
        if (isInlineNode(n)) run.push(n);
        else { flush(); out.push(n.toString()); }
      }
      flush();
      const joined = out.join('\n');
      c.replaceWith(...parse(isNote && joined.trim() ? `<blockquote>${joined}</blockquote>` : joined).childNodes);
    }
  };
  await walk(x);
  // Paragraph pairs "13" + "findings, each with…" read as one stat line.
  for (const p of x.querySelectorAll('p')) {
    const t = squash(p.text);
    const next = p.nextElementSibling;
    if (next?.tagName === 'P' && t.length <= 14 && /\d/.test(t) && squash(next.text).length > t.length) {
      p.replaceWith(...parse(`<p class="rv-stat"><strong>${p.innerHTML.trim()}</strong> <span>${next.innerHTML.trim()}</span></p>`).childNodes);
      next.remove();
    }
  }
  // Evidence lines ("captured · /url" + the quoted capture) read as a source line and a quote.
  for (const p of x.querySelectorAll('p')) {
    const q = p.childNodes.find((n) => n.nodeType === 1 && n.tagName === 'Q');
    if (!q) continue;
    const before = p.childNodes.slice(0, p.childNodes.indexOf(q)).map((n) => n.toString()).join('').trim();
    const after = p.childNodes.slice(p.childNodes.indexOf(q) + 1).map((n) => n.toString()).join('').trim();
    if (!before || before.length > 240) continue;
    p.replaceWith(...parse(`<p class="rv-src">${before}</p><blockquote><p>${q.innerHTML.trim()}</p></blockquote>${after ? `<p>${after}</p>` : ''}`).childNodes);
  }
  x.querySelectorAll('p, li, dd, h2, h3, h4, h5').forEach((e) => { const t = squash(e.text); if ((!t || /^[—–\-·•|/]+$/.test(t)) && !e.querySelector('img')) e.remove(); });
  x.querySelectorAll('ul, ol, dl').forEach((e) => { if (!e.querySelector('li, dt, dd')) e.remove(); });
  const out = x.innerHTML.replace(/\n\s*\n+/g, '\n').trim();
  const words = squash(x.text).split(' ').filter(Boolean).length;
  return { title, kicker, html: out, words };
}

// ── Build every review
const slugs = [...cards.keys()];
const reviews = [];
for (const slug of slugs) {
  const card = cards.get(slug);
  const f = path.join(R, `${slug}.html`);
  if (!fs.existsSync(f)) { console.warn(`no summary page: ${slug}`); continue; }
  const d = parse(fs.readFileSync(f, 'utf8'));
  const h1 = d.querySelector('h1');
  const headline = h1 ? squash(h1.querySelectorAll('span.w').map((w) => w.text).join(' ') || h1.text) : '';
  const pills = d.querySelectorAll('.tags a.pill').map(text);
  const meta = Object.fromEntries(d.querySelectorAll('dl.meta > div').map((div) => [text(div.querySelector('dt')).toLowerCase(), text(div.querySelector('dd'))]));
  const findings = d.querySelectorAll('.finds .find').map((a) => ({ n: text(a.querySelector('.n')), title: text(a.querySelector('h3')), text: text(a.querySelector('p')) }));
  const contents = d.querySelectorAll('.scts .sct').map((s) => squash(s.childNodes.filter((n) => n.nodeType === 3).map((n) => n.text).join(' ')));
  const fullUrl = d.querySelector('.ctas a.btn.dark')?.getAttribute('href') || '';
  const full = (fullUrl.match(/mousabatarseh\.com\/([a-z0-9-]+-review)\//) || [])[1] || `${slug}-review`;
  const heroSrc = d.querySelector('.dr img')?.getAttribute('src') || '';
  const abs = (u) => { try { return new URL(u, `https://mousabatarseh.com/reviews/reviews/${slug}/`).href; } catch { return u; } };
  const [brand, kind] = card.title.split(' · ');
  // The headline number, as the summary page prints it once its counter has run: prefix, value, suffix or "/ of".
  const st = d.querySelector('.dstat .st');
  let stat = { value: card.value, of: card.of, label: card.label };
  if (st) {
    const pre = text(st.querySelector('.pre'));
    const b = st.querySelector('b.count, b');
    const to = b?.getAttribute('data-to');
    const dec = Number(b?.getAttribute('data-dec') || 0);
    const val = to ? Number(to).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : text(b);
    const suf = text(st.querySelector('small'));
    stat = { value: `${pre}${val}${suf && !suf.startsWith('/') ? suf : ''}`, of: suf.startsWith('/') ? suf.slice(1) : '', label: text(d.querySelector('.dstat > p')) || card.label };
  }
  const ctx = { disclaimer: '', link: null };

  // Sheets: the fetched set if present, else the first sheet from the companion page.
  const sheetDir = path.join(R, 'sheets', full);
  let sheetIndex = read(path.join(sheetDir, 'index.json'), null);
  let sheetFiles;
  if (sheetIndex?.length) sheetFiles = sheetIndex.map((s) => ({ ...s, file: path.join(sheetDir, `${s.n}.html`), shot: path.join(sheetDir, `${s.n}.webp`) }));
  else {
    const page = path.join(R, 'pages', `${full}.html`);
    if (fs.existsSync(page)) {
      const pd = parse(fs.readFileSync(page, 'utf8'));
      const main = pd.querySelector('main') || pd.querySelector('body');
      const tmp = path.join(root, 'node_modules/.cache/reviews');
      fs.mkdirSync(tmp, { recursive: true });
      fs.writeFileSync(path.join(tmp, `${full}.html`), main ? main.innerHTML : '');
      sheetFiles = [{ n: '01', url: `https://mousabatarseh.com/${full}/`, file: path.join(tmp, `${full}.html`), shot: path.join(R, 'pages', `${full}.webp`) }];
    } else sheetFiles = [];
  }
  const sheetUrl = (u) => { try { const x = new URL(u); x.hash = ''; x.search = ''; return x.href.replace(/\/index\.html$/, '/'); } catch { return ''; } };
  const anchors = new Map(sheetFiles.map((s) => [sheetUrl(s.url), `#sheet-${s.n}`]));
  ctx.link = (href) => {
    try {
      const u = new URL(href, `https://mousabatarseh.com/${full}/`);
      if (/^(mailto|tel):/.test(u.protocol)) return href;
      if (u.hostname === 'mousabatarseh.com' || u.hostname === 'www.mousabatarseh.com') {
        const k = sheetUrl(u.href);
        if (anchors.has(k)) return anchors.get(k);
        if (u.pathname.startsWith(`/${full}/`) && u.hash) return u.hash;
        const rv = u.pathname.match(/^\/reviews\/reviews\/([^/]+)/);
        if (rv) return `/reviews/${rv[1]}/`;
        const cr = u.pathname.match(/^\/([a-z0-9]+)-review\/?$/);
        if (cr) { const s = [...cards.keys()].find((k2) => k2 === cr[1] || `${k2}-review` === `${cr[1]}-review`); return s ? `/reviews/${s}/` : null; }
        if (u.pathname === '/' || u.pathname === '/reviews/' || u.pathname.startsWith('/reviews/')) return u.pathname === '/' ? '/' : '/reviews/';
        return null;
      }
      if (/linkedin\.com\/in\/mousabatarseh/.test(u.href)) return null;
      return /^https?:$/.test(u.protocol) ? u.href : null;
    } catch { return null; }
  };
  const sheets = [];
  for (const s of sheetFiles) {
    if (!fs.existsSync(s.file)) continue;
    const c = await cleanSheet(fs.readFileSync(s.file, 'utf8'), ctx);
    if (!c.html && !c.title) continue;
    const shot = fs.existsSync(s.shot) ? await local(s.shot, { alt: `${brand} review — ${c.title || 'sheet ' + s.n}, first screen`, max: 1440 }) : null;
    sheets.push({ n: s.n, title: c.title, kicker: c.kicker, html: c.html, words: c.words, shot });
  }
  const hero = heroSrc ? await local(abs(heroSrc), { alt: `${brand} review — the full review's first screen`, max: 700 }) : null;
  const thumbUrl = `https://mousabatarseh.com/reviews/img/thumbs/${slug}.webp`;
  const thumb = (await local(thumbUrl, { alt: '', max: 720 })) || hero;
  const words = sheets.reduce((n, s) => n + s.words, 0);
  reviews.push({
    slug,
    brand,
    kind: kind || '',
    title: card.title,
    site: meta.site || card.site,
    focus: pills.length ? pills : [card.focus],
    date: isoDate(meta.observed || '') || card.date,
    sources: meta.sources || '',
    stat,
    headline,
    lede: text(d.querySelector('.lede')),
    blurb: card.blurb,
    findings,
    contents,
    hero,
    thumb,
    disclaimer: ctx.disclaimer,
    minutes: Math.max(1, Math.round(words / 230)),
    sheets,
    source: `https://mousabatarseh.com/${full}/`,
  });
  console.log(`${slug}: ${sheets.length} sheet(s), ${words} words, ${findings.length} findings`);
}
reviews.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
fs.writeFileSync(path.join(root, 'src/data/reviews.json'), JSON.stringify(reviews, null, 1));
console.log(`${reviews.length} reviews written`);
