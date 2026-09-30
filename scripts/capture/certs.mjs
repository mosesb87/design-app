// Find Mousa's course certificates and degree as his own sites publish them: every image, linked file or
// background image on his about/résumé/portfolio pages whose address or description points to a certificate,
// course, diploma or degree, plus the text around "Education" and "Certifications", so the site can quote
// them exactly. Also tries the image folder the three known certificates live in, with the names the other
// courses would have. Output: capture/certs/ (certs.json + files/). Runs on GitHub Actions (the build
// container cannot reach Mousa's hosts).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { launchArgs, settle, writeJSON, UA_NOTE } from './lib.mjs';

const OUT = 'capture/certs';
const START = [
  'https://mousabatarseh.com/',
  'https://mousabatarseh.com/v2/',
  'https://mousabatarseh.com/v2/about/',
  'https://mousabatarseh.com/about/',
  'https://mousabatarseh.com/resume/',
  'https://mousabatarseh.com/v2/work/',
  'https://work.mousabatarseh.com/',
  'https://work.mousabatarseh.com/about/',
  'https://work.mousabatarseh.com/portfolio/',
];
const FOLDER = 'https://mousabatarseh.com/portfolio-home/img/';
const GUESS = [
  'think-outside-the-inbox', 'think-outside-inbox', 'google-think-outside-the-inbox', 'email-marketing',
  'shopify-complete-training', 'shopify-training', 'shopify', 'udemy-shopify',
  'wordpress-complete-training', 'wordpress-training', 'wordpress', 'udemy-wordpress',
  'web-development-fundamentals', 'nucamp', 'nucamp-web-development', 'nucamp-certificate', 'web-fundamentals',
  'degree', 'diploma', 'bachelors-degree', 'bachelor-degree', 'bs-degree', 'bs-accounting-information-systems', 'accounting-information-systems',
];
const WANT = /certif|course|nucamp|udemy|shopify|wordpress|inbox|google|coursera|wharton|degree|diploma|bachelor|universit|college|transcript|credential|badge/i;

fs.mkdirSync(`${OUT}/files`, { recursive: true });
const report = { fetched: new Date().toISOString(), note: UA_NOTE, pages: [], files: [], folder: null, guesses: [] };
const saved = new Map();

async function save(ctx, url, from, label = '') {
  if (!url || url.startsWith('data:') || saved.has(url)) return saved.get(url);
  try {
    const res = await ctx.request.get(url, { timeout: 25000 });
    if (!res.ok()) { report.files.push({ url, from, status: res.status() }); return null; }
    const type = res.headers()['content-type'] || '';
    if (!/image|pdf|octet-stream/.test(type)) { report.files.push({ url, from, status: res.status(), type, skipped: 'not an image or PDF' }); return null; }
    const body = await res.body();
    const base = path.basename(new URL(url).pathname).replace(/[^a-z0-9._-]+/gi, '-').slice(0, 90) || 'file';
    fs.writeFileSync(`${OUT}/files/${base}`, body);
    const entry = { url, from, label, status: res.status(), type, bytes: body.length, file: `files/${base}` };
    report.files.push(entry);
    saved.set(url, entry);
    return entry;
  } catch (e) {
    report.files.push({ url, from, error: String(e.message || e).slice(0, 200) });
    return null;
  }
}

const browser = await chromium.launch(launchArgs());
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const queue = [...START];
const seen = new Set();
while (queue.length && seen.size < 30) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  const page = await ctx.newPage();
  const item = { url };
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    item.status = res?.status();
    await settle(page, 1500);
    // Scroll through, so lazy images load.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
    const found = await page.evaluate((wantSrc) => {
      const want = new RegExp(wantSrc, 'i');
      const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
      const imgs = [...document.querySelectorAll('img')].map((i) => ({ src: abs(i.currentSrc || i.src), srcset: i.getAttribute('srcset'), alt: i.alt || '', near: (i.closest('figure, li, article, section, div')?.innerText || '').replace(/\s+/g, ' ').slice(0, 240) }));
      const files = [...document.querySelectorAll('a[href]')].map((a) => ({ href: abs(a.getAttribute('href')), text: (a.innerText || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 160) }));
      const bgs = [...document.querySelectorAll('*')].map((el) => { const b = getComputedStyle(el).backgroundImage; const m = b && b.match(/url\(["']?(.*?)["']?\)/); return m ? { src: abs(m[1]), cls: String(el.className).slice(0, 80) } : null; }).filter(Boolean);
      // Text around education and certifications, to quote exactly.
      const blocks = [...document.querySelectorAll('section, article, li, p, div')].map((el) => el.innerText || '').filter((t) => /education|certif|degree|diploma|bachelor|b\.s\.|university|college|courses?\b/i.test(t) && t.length < 1600).map((t) => t.replace(/\s+/g, ' ').trim());
      const text = [...new Set(blocks)].sort((a, b) => a.length - b.length).slice(0, 25);
      return {
        imgs: imgs.filter((i) => want.test(`${i.src} ${i.alt} ${i.near}`)),
        files: files.filter((f) => f.href && (/\.(png|jpe?g|webp|gif|pdf|svg)(\?|$)/i.test(f.href) && want.test(`${f.href} ${f.text}`))),
        links: files.filter((f) => f.href && /mousabatarseh\.com/.test(f.href) && /about|resume|cv\b|cert|course|education|credential/i.test(`${f.href} ${f.text}`)).map((f) => f.href.split('#')[0]),
        bgs: bgs.filter((b) => want.test(`${b.src} ${b.cls}`)),
        text,
      };
    }, WANT.source);
    item.found = { imgs: found.imgs, files: found.files, bgs: found.bgs, text: found.text };
    for (const i of found.imgs) await save(ctx, i.src, url, i.alt);
    for (const f of found.files) await save(ctx, f.href, url, f.text);
    for (const b of found.bgs) await save(ctx, b.src, url, b.cls);
    for (const l of found.links) if (!seen.has(l) && !queue.includes(l)) queue.push(l);
  } catch (e) {
    item.error = String(e.message || e).slice(0, 200);
  }
  report.pages.push(item);
  await page.close();
}

// The folder the known certificates live in: a listing if the server gives one, and the names the other
// courses would carry.
try {
  const res = await ctx.request.get(FOLDER, { timeout: 20000 });
  const body = res.ok() ? await res.text() : '';
  const hrefs = [...body.matchAll(/href="([^"]+)"/g)].map((m) => new URL(m[1], FOLDER).href);
  report.folder = { status: res.status(), listing: hrefs.length, matches: hrefs.filter((h) => WANT.test(h)) };
  for (const h of report.folder.matches) await save(ctx, h, FOLDER, 'folder listing');
} catch (e) { report.folder = { error: String(e.message || e).slice(0, 200) }; }
for (const g of GUESS) {
  for (const ext of ['.png', '.jpg', '.webp', '.pdf']) {
    const url = `${FOLDER}${g}${ext}`;
    try {
      const res = await ctx.request.head(url, { timeout: 15000 });
      if (res.ok()) { report.guesses.push({ url, status: res.status() }); await save(ctx, url, FOLDER, 'guessed name'); }
    } catch {}
  }
}

await browser.close();
writeJSON(`${OUT}/certs.json`, report);
console.log(`pages ${report.pages.length}, files saved ${[...saved.keys()].length}, guesses hit ${report.guesses.length}`);
