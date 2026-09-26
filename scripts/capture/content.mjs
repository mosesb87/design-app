// Fetch the blog and the reviews so they can be rebuilt as pages of this site (GitHub Actions; this container
// can't reach the hosts). Nothing on the live sites is changed; this only reads public pages and the public
// WordPress REST API.
//
// Output (committed back by the workflow):
//   capture/content/blog/wp-posts.json        every post from the WordPress REST API (title, date, content HTML, terms)
//   capture/content/blog/blog-index.json      the post list as mousabatarseh.com/blog/ shows it (title, date, url, excerpt)
//   capture/content/reviews/index.json        the reviews index (title, url, date, blurb) as /reviews/ shows it
//   capture/content/reviews/<slug>.html       each review page, rendered (JS run), for local extraction
//   capture/content/reviews/<slug>.json       metadata + outline (headings, text blocks, tables, images, links)
//   capture/content/reviews/<slug>/{desktop,mobile}.webp   screenshots of the top of each review
//   capture/content/assets/<hash>.<ext>       images used by posts and reviews; assets.json maps url → file
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { launchArgs, settle, writeJSON, readJSON, sleep } from './lib.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(root, 'capture/content');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const log = { startedAt: new Date().toISOString(), steps: [] };
const note = (m) => { console.log(m); log.steps.push(m); };

// ── Assets
const assetsFile = path.join(OUT, 'assets/assets.json');
const assets = readJSON(assetsFile, {});
async function grab(url) {
  if (!/^https?:\/\//.test(url) || assets[url]) return assets[url]?.file;
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA } });
    if (!res.ok) { assets[url] = { error: res.status }; return null; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 8 * 1024 * 1024) { assets[url] = { error: 'too large', bytes: buf.length }; return null; }
    const type = res.headers.get('content-type') || '';
    const ext = (type.match(/image\/(png|jpe?g|webp|gif|svg\+xml|avif)/)?.[1] || path.extname(new URL(url).pathname).slice(1) || 'bin').replace('jpeg', 'jpg').replace('svg+xml', 'svg');
    const file = `${crypto.createHash('sha1').update(url).digest('hex').slice(0, 16)}.${ext}`;
    fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
    fs.writeFileSync(path.join(OUT, 'assets', file), buf);
    let meta = {};
    if (ext !== 'svg') meta = await sharp(buf).metadata().then((m) => ({ w: m.width, h: m.height })).catch(() => ({}));
    assets[url] = { file, bytes: buf.length, type, ...meta };
    return file;
  } catch (e) { assets[url] = { error: String(e).slice(0, 120) }; return null; }
}

// ── 1 · Blog via the WordPress REST API (every public post, full content)
async function wpPosts(base) {
  const posts = [];
  for (let page = 1; page < 20; page++) {
    const url = `${base}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`;
    const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } }).catch((e) => ({ ok: false, status: String(e) }));
    if (!res.ok) { note(`WP ${url} → ${res.status}`); break; }
    const batch = await res.json();
    if (!Array.isArray(batch) || !batch.length) break;
    posts.push(...batch);
    const total = Number(res.headers.get('x-wp-totalpages') || 1);
    note(`WP ${base} page ${page}/${total}: ${batch.length} posts`);
    if (page >= total) break;
  }
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    link: p.link,
    date: p.date,
    modified: p.modified,
    title: p.title?.rendered,
    excerpt: p.excerpt?.rendered,
    content: p.content?.rendered,
    categories: (p._embedded?.['wp:term']?.[0] || []).map((t) => t.name),
    tags: (p._embedded?.['wp:term']?.[1] || []).map((t) => t.name),
    featured: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    featuredAlt: p._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
  }));
}

// ── Page extraction (runs in the browser)
const EXTRACT = () => {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
  const main = document.querySelector('main') || document.body;
  const blocks = [];
  const walk = (el) => {
    for (const c of el.children) {
      const tag = c.tagName.toLowerCase();
      const cs = getComputedStyle(c);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (['script', 'style', 'noscript', 'svg', 'nav', 'footer', 'header', 'form', 'button'].includes(tag) && tag !== 'header') continue;
      if (/^h[1-6]$/.test(tag)) { blocks.push({ t: tag, text: c.innerText.trim() }); continue; }
      if (tag === 'p' || tag === 'blockquote' || tag === 'figcaption') { const text = c.innerText.trim(); if (text) blocks.push({ t: tag, text }); continue; }
      if (tag === 'ul' || tag === 'ol') { blocks.push({ t: tag, items: [...c.children].map((li) => li.innerText.trim()).filter(Boolean) }); continue; }
      if (tag === 'table') { blocks.push({ t: 'table', rows: [...c.rows].map((r) => [...r.cells].map((td) => td.innerText.trim())) }); continue; }
      if (tag === 'img') { blocks.push({ t: 'img', src: abs(c.currentSrc || c.src), alt: c.alt || '', w: c.naturalWidth, h: c.naturalHeight }); continue; }
      if (tag === 'figure' || tag === 'picture') { const img = c.querySelector('img'); if (img) blocks.push({ t: 'img', src: abs(img.currentSrc || img.src), alt: img.alt || '', w: img.naturalWidth, h: img.naturalHeight, caption: c.querySelector('figcaption')?.innerText.trim() || '' }); continue; }
      if (c.children.length) walk(c);
      else { const text = c.innerText?.trim(); if (text && text.length > 1) blocks.push({ t: 'text', tag, cls: c.className?.toString().slice(0, 60), text }); }
    }
  };
  walk(main);
  return {
    url: location.href,
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    published: document.querySelector('meta[property="article:published_time"]')?.content || document.querySelector('time[datetime]')?.getAttribute('datetime') || '',
    lang: document.documentElement.lang,
    blocks,
    links: [...main.querySelectorAll('a[href]')].map((a) => ({ text: a.innerText.trim().slice(0, 140), href: abs(a.getAttribute('href')) })).filter((l) => l.text),
    images: [...document.images].map((i) => ({ src: abs(i.currentSrc || i.src), alt: i.alt || '', w: i.naturalWidth, h: i.naturalHeight })).filter((i) => i.w > 40),
  };
};

async function openPage(ctx, url) {
  const page = await ctx.newPage();
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch((e) => ({ status: () => String(e) }));
  await settle(page, 1500);
  // Scroll through once so lazy content and scroll-revealed text render.
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }).catch(() => {});
  await sleep(800);
  return { page, status: typeof res?.status === 'function' ? res.status() : null };
}

const browser = await chromium.launch(launchArgs());
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA });

// Blog
fs.mkdirSync(path.join(OUT, 'blog'), { recursive: true });
let posts = [];
for (const base of ['https://work.mousabatarseh.com', 'https://mousabatarseh.com', 'https://mousabatarseh.com/blog']) {
  const got = await wpPosts(base);
  note(`${base}: ${got.length} posts from the REST API`);
  for (const p of got) if (!posts.find((x) => x.slug === p.slug)) posts.push({ ...p, source: base });
}
writeJSON(path.join(OUT, 'blog/wp-posts.json'), posts);
{
  const { page, status } = await openPage(ctx, 'https://mousabatarseh.com/blog/');
  const data = await page.evaluate(EXTRACT);
  data.status = status;
  data.cards = await page.evaluate(() => [...document.querySelectorAll('article, .post, [class*=post], [class*=card]')].map((a) => ({ title: a.querySelector('h1,h2,h3,h4')?.innerText.trim() || '', href: a.querySelector('a[href]')?.href || '', date: a.querySelector('time')?.getAttribute('datetime') || a.querySelector('time')?.innerText || '', text: a.innerText.trim().slice(0, 600) })).filter((c) => c.title));
  fs.writeFileSync(path.join(OUT, 'blog/blog-index.html'), await page.content());
  writeJSON(path.join(OUT, 'blog/blog-index.json'), data);
  note(`/blog/ → ${status}, ${data.cards.length} cards, ${data.links.length} links`);
  await page.close();
}
// Posts listed on /blog/ that no REST API returned: read them from their pages.
{
  const idx = readJSON(path.join(OUT, 'blog/blog-index.json'), { links: [] });
  const listed = [...new Set(idx.links.map((l) => l.href).filter((h) => /^https:\/\/(work\.)?mousabatarseh\.com\/[^/]+\/?$/.test(h) && !/\/(blog|reviews|v2|work|about)\/?$/.test(h)))];
  for (const href of listed) {
    const slug = new URL(href).pathname.replace(/^\/|\/$/g, '');
    if (posts.find((x) => x.slug === slug)) continue;
    try {
      const { page, status } = await openPage(ctx, href);
      const art = await page.evaluate(() => {
        const a = document.querySelector('article .entry-content, .entry-content, article, main');
        const t = document.querySelector('h1');
        return {
          title: t?.innerText.trim() || document.title,
          date: document.querySelector('meta[property="article:published_time"]')?.content || document.querySelector('time[datetime]')?.getAttribute('datetime') || '',
          modified: document.querySelector('meta[property="article:modified_time"]')?.content || '',
          content: a ? a.innerHTML : '',
          excerpt: document.querySelector('meta[name=description]')?.content || '',
          featured: document.querySelector('meta[property="og:image"]')?.content || null,
          categories: [...document.querySelectorAll('a[rel~="category"], .cat-links a')].map((x) => x.innerText.trim()),
        };
      });
      posts.push({ id: null, slug, link: href, ...art, tags: [], featuredAlt: '', source: 'page', status });
      note(`post ${slug} → ${status}, ${art.content.length} chars (from its page)`);
      await page.close();
    } catch (e) { note(`post ${slug} failed: ${String(e).slice(0, 160)}`); }
  }
  writeJSON(path.join(OUT, 'blog/wp-posts.json'), posts);
}
for (const p of posts) {
  if (p.featured) await grab(p.featured);
  for (const m of (p.content || '').matchAll(/<img[^>]+src="([^"]+)"/g)) await grab(m[1]);
}

// Reviews
fs.mkdirSync(path.join(OUT, 'reviews'), { recursive: true });
const { page: idx, status: idxStatus } = await openPage(ctx, 'https://mousabatarseh.com/reviews/reviews/index.html');
const index = await idx.evaluate(EXTRACT);
index.status = idxStatus;
index.cards = await idx.evaluate(() => [...document.querySelectorAll('a[href]')].filter((a) => /\/reviews\/reviews\/[^/]+\/(index\.html)?$/.test(new URL(a.href).pathname)).map((a) => { const card = a.closest('article, li, [class*=card], [class*=review]') || a; return { href: a.href.split('?')[0].split('#')[0], text: a.innerText.trim(), card: card.innerText.trim().slice(0, 900) }; }));
fs.writeFileSync(path.join(OUT, 'reviews/index.html'), await idx.content());
writeJSON(path.join(OUT, 'reviews/index.json'), index);
await idx.close();
const reviewUrls = [...new Set(index.cards.map((c) => c.href))];
const extraPages = ['https://mousabatarseh.com/reviews/index.html', 'https://mousabatarseh.com/reviews/builds/index.html', 'https://mousabatarseh.com/reviews/method/index.html'];
const companions = new Set();
note(`/reviews/ → ${idxStatus}, ${reviewUrls.length} review links`);

for (const url of reviewUrls) {
  const parts = new URL(url).pathname.replace(/\/index\.html$/, '').replace(/^\/|\/$/g, '').split('/');
  const slug = parts[parts.length - 1] || 'root';
  try {
    const { page, status } = await openPage(ctx, url);
    const data = await page.evaluate(EXTRACT);
    data.status = status;
    fs.writeFileSync(path.join(OUT, 'reviews', `${slug}.html`), await page.content());
    fs.mkdirSync(path.join(OUT, 'reviews', slug), { recursive: true });
    await page.evaluate(() => scrollTo(0, 0));
    await sleep(600);
    const shot = await page.screenshot({ type: 'png' });
    await sharp(shot).webp({ quality: 82 }).toFile(path.join(OUT, 'reviews', slug, 'desktop.webp'));
    for (const img of data.images.slice(0, 40)) img.file = await grab(img.src);
    for (const b of data.blocks) if (b.t === 'img') b.file = await grab(b.src);
    writeJSON(path.join(OUT, 'reviews', `${slug}.json`), data);
    await page.close();
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA });
    const mp = await m.newPage();
    await mp.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
    await settle(mp, 1500);
    await sharp(await mp.screenshot({ type: 'png' })).webp({ quality: 80 }).toFile(path.join(OUT, 'reviews', slug, 'mobile.webp'));
    await m.close();
    note(`review ${slug} → ${status}, ${data.blocks.length} blocks, ${data.images.length} images`);
    data.links.filter((l) => /^https:\/\/mousabatarseh\.com\/[a-z0-9-]+-review\/?$/.test(l.href)).forEach((l) => companions.add(l.href));
  } catch (e) { note(`review ${slug} failed: ${String(e).slice(0, 200)}`); }
}

// The reviews site's other pages, and the companion pages (fixes, long-form reviews) the reviews link to.
fs.mkdirSync(path.join(OUT, 'reviews/pages'), { recursive: true });
for (const url of [...extraPages, ...companions]) {
  const slug = new URL(url).pathname.replace(/\/index\.html$/, '').replace(/^\/|\/$/g, '').replace(/\//g, '--') || 'root';
  try {
    const { page, status } = await openPage(ctx, url);
    const data = await page.evaluate(EXTRACT);
    data.status = status;
    fs.writeFileSync(path.join(OUT, 'reviews/pages', `${slug}.html`), await page.content());
    for (const img of data.images.slice(0, 40)) img.file = await grab(img.src);
    for (const b of data.blocks) if (b.t === 'img') b.file = await grab(b.src);
    writeJSON(path.join(OUT, 'reviews/pages', `${slug}.json`), data);
    await page.evaluate(() => scrollTo(0, 0));
    await sleep(500);
    await sharp(await page.screenshot({ type: 'png' })).webp({ quality: 82 }).toFile(path.join(OUT, 'reviews/pages', `${slug}.webp`));
    note(`page ${slug} → ${status}, ${data.blocks.length} blocks`);
    await page.close();
  } catch (e) { note(`page ${slug} failed: ${String(e).slice(0, 160)}`); }
}

writeJSON(assetsFile, assets);
log.finishedAt = new Date().toISOString();
writeJSON(path.join(OUT, 'content-log.json'), log);
await browser.close();
