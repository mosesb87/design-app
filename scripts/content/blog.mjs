// Turn the fetched blog (capture/content/blog/) into this site's own posts: clean HTML, local images,
// internal links. Output: src/data/blog.json + public/media/blog/*. Run: node scripts/content/blog.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SRC = path.join(root, 'capture/content');
const OUT_MEDIA = path.join(root, 'public/media/blog');
const read = (p, d) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return d; } };
const api = read(path.join(SRC, 'blog/wp-posts.json'), []);
const index = read(path.join(SRC, 'blog/blog-index.json'), { links: [] });
const assets = read(path.join(SRC, 'assets/assets.json'), {});
fs.mkdirSync(OUT_MEDIA, { recursive: true });

const decode = (s = '') => parse(`<i>${s}</i>`).text.replace(/\s+/g, ' ').trim();
const slugOf = (u) => { try { return new URL(u).pathname.replace(/^\/|\/$/g, ''); } catch { return ''; } };
const MONTHS = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };

// The blog index is the canonical list (order, categories, dates, excerpts, covers) — read from its cards.
const indexHtml = fs.existsSync(path.join(SRC, 'blog/blog-index.html')) ? fs.readFileSync(path.join(SRC, 'blog/blog-index.html'), 'utf8') : '';
const listed = parse(indexHtml).querySelectorAll('a.blog-item[href]').map((a) => ({
  slug: slugOf(a.getAttribute('href')),
  url: a.getAttribute('href'),
  cats: decode(a.querySelector('.project-item-line-1 span')?.innerHTML || '').split('·').map((c) => c.trim()).filter(Boolean),
  date: a.querySelector('time')?.getAttribute('datetime') || '',
  title: decode(a.querySelector('.blog-title')?.innerHTML || ''),
  excerpt: decode(a.querySelector('.blog-excerpt')?.innerHTML || ''),
  cover: a.querySelector('img')?.getAttribute('src') || '',
})).filter((l) => l.slug);
const bySlug = new Map(api.map((p) => [p.slug, p]));
const isReal = (p) => p?.content && !/class="projects-hero"/.test(p.content);
const slugs = new Set([...listed.map((l) => l.slug), ...api.map((p) => p.slug)]);
const fullSlugs = new Set(api.filter(isReal).map((p) => p.slug));

const titleCase = (c) => c.toLowerCase().replace(/(^|[\s&/-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\bSeo\b/g, 'SEO').replace(/\bWordpress\b/g, 'WordPress').replace(/\bWoocommerce\b/g, 'WooCommerce').replace(/\bE-Commerce\b/g, 'E-commerce');

async function localImage(url, alt = '') {
  const a = assets[url];
  if (!a?.file) return null;
  const src = path.join(SRC, 'assets', a.file);
  if (!fs.existsSync(src)) return null;
  const base = a.file.replace(/\.[a-z]+$/, '');
  const out = { src: `/media/blog/${base}-1600.webp`, small: `/media/blog/${base}-800.webp`, alt };
  const img = sharp(src);
  const meta = await img.metadata();
  const w1 = Math.min(1600, meta.width || 1600);
  await sharp(src).resize({ width: w1, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT_MEDIA, `${base}-1600.webp`));
  await sharp(src).resize({ width: Math.min(800, w1), withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT_MEDIA, `${base}-800.webp`));
  out.w = w1;
  out.h = Math.round(((meta.height || 900) / (meta.width || 1600)) * w1);
  return out;
}

const KEEP = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'figure', 'figcaption', 'img', 'a', 'strong', 'b', 'em', 'i', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'br', 'sup', 'sub']);
const internal = (href) => {
  try {
    const u = new URL(href, 'https://mousabatarseh.com/');
    if (!/^(work\.)?mousabatarseh\.com$/.test(u.hostname)) return null;
    const s = u.pathname.replace(/^\/|\/$/g, '');
    if (fullSlugs.has(s)) return `/blog/${s}/`;
    if (slugs.has(s)) return '/blog/';
    if (s === 'blog') return '/blog/';
    const r = s.match(/^reviews\/reviews\/([^/]+)/);
    if (r) return `/reviews/${r[1]}/`;
    if (s === 'reviews' || s.startsWith('reviews/')) return '/reviews/';
    if (s === '' ) return '/';
    return null;
  } catch { return null; }
};

async function clean(html) {
  const doc = parse(`<div id="x">${html || ''}</div>`, { comment: false });
  const images = [];
  const walk = async (node) => {
    for (const c of [...node.childNodes]) {
      if (c.nodeType !== 1) continue;
      const tag = c.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'iframe', 'form', 'svg', 'button'].includes(tag)) { c.remove(); continue; }
      await walk(c);
      if (!KEEP.has(tag)) { c.replaceWith(...c.childNodes); continue; }
      const attrs = c.attributes;
      if (tag === 'a') {
        const href = attrs.href || '';
        const to = internal(href);
        for (const k of Object.keys(attrs)) c.removeAttribute(k);
        if (to) c.setAttribute('href', to);
        else if (/^(https?:|mailto:|tel:)/.test(href)) { c.setAttribute('href', href); if (/^https?:/.test(href)) c.setAttribute('rel', 'noopener'); }
        else c.replaceWith(...c.childNodes);
      } else if (tag === 'img') {
        const src = attrs.src || attrs['data-src'] || '';
        const alt = attrs.alt || '';
        const local = await localImage(src, alt);
        if (!local) { c.remove(); continue; }
        images.push(local);
        for (const k of Object.keys(attrs)) c.removeAttribute(k);
        c.setAttribute('src', local.src);
        c.setAttribute('srcset', `${local.small} 800w, ${local.src} ${local.w}w`);
        c.setAttribute('sizes', '(min-width: 900px) 720px, 92vw');
        c.setAttribute('alt', alt);
        c.setAttribute('width', String(local.w));
        c.setAttribute('height', String(local.h));
        c.setAttribute('loading', 'lazy');
        c.setAttribute('decoding', 'async');
      } else {
        for (const k of Object.keys(attrs)) c.removeAttribute(k);
      }
    }
  };
  await walk(doc.querySelector('#x'));
  // Drop empty paragraphs left behind by the builder markup.
  doc.querySelectorAll('p').forEach((p) => { if (!p.text.trim() && !p.querySelector('img')) p.remove(); });
  // Code blocks and tables can scroll sideways on phones, so keyboard users must be able to reach them.
  doc.querySelectorAll('pre').forEach((pre) => pre.setAttribute('tabindex', '0'));
  doc.querySelectorAll('table').forEach((t) => t.replaceWith(parse(`<div class="table-scroll" tabindex="0">${t.toString()}</div>`)));
  const out = doc.querySelector('#x').innerHTML.replace(/\n{2,}/g, '\n').trim();
  return { html: out, images, text: doc.querySelector('#x').text };
}

const posts = [];
for (const slug of slugs) {
  const l = listed.find((x) => x.slug === slug);
  const p = bySlug.get(slug);
  // A post "fetched from its page" that is really the blog index (the link falls back to it) is not content.
  if (!isReal(p)) continue;
  const { html, images, text } = await clean(p.content);
  const words = text.split(/\s+/).filter(Boolean).length;
  const image = p.featured ? await localImage(p.featured, decode(p.featuredAlt || '')) : images[0] || null;
  const cats = (l?.cats?.length ? l.cats : (p.categories || []).map(decode)).map(titleCase);
  posts.push({
    slug,
    title: decode(p.title) || l?.title,
    date: l?.date || (p.date || '').slice(0, 10),
    modified: (p.modified || '').slice(0, 10) || null,
    categories: cats,
    excerpt: l?.excerpt || decode(p.excerpt).replace(/\s*\[…\]\s*$|\s*Read more.*$/i, '').slice(0, 260),
    minutes: Math.max(1, Math.round(words / 230)),
    words,
    image,
    source: p.link || l?.url,
    html,
  });
}
posts.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(path.join(root, 'src/data/blog.json'), JSON.stringify(posts, null, 1));

// Posts the index lists whose full text isn't published anywhere (their links open the blog index): kept as
// summaries — title, date, topics, excerpt and cover exactly as the index shows them. Nothing is written for them.
const summaries = [];
for (const l of listed.filter((x) => !posts.find((p) => p.slug === x.slug))) {
  summaries.push({ slug: l.slug, title: l.title, date: l.date, categories: l.cats.map(titleCase), excerpt: l.excerpt, image: l.cover ? await localImage(l.cover, '') : null });
}
summaries.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(path.join(root, 'src/data/blog-summaries.json'), JSON.stringify(summaries, null, 1));
console.log(`${posts.length} full posts, ${summaries.length} summary-only (${listed.length} listed on the blog index)`);
