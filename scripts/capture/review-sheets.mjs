// Fetch every sheet of every full review (mousabatarseh.com/<x>-review/ and the sheets it links to in the same
// folder), so the reviews can be rebuilt as pages of this site. GitHub Actions; read-only. Files (PDFs, CSVs)
// are not followed.
// Output: capture/content/reviews/sheets/<x>/index.json  [{ url, file, title, h1 }] in reading order
//         capture/content/reviews/sheets/<x>/<n>.html     the rendered main content of sheet n
//         capture/content/reviews/sheets/<x>/<n>.webp     its first screen at 1440 × 900
//         capture/content/assets/*                        images the sheets use (assets.json updated)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { launchArgs, settle, writeJSON, readJSON, sleep } from './lib.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(root, 'capture/content');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const assetsFile = path.join(OUT, 'assets/assets.json');
const assets = readJSON(assetsFile, {});
const log = [];
const note = (m) => { console.log(m); log.push(m); };

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
    fs.writeFileSync(path.join(OUT, 'assets', file), buf);
    let meta = {};
    if (ext !== 'svg') meta = await sharp(buf).metadata().then((m) => ({ w: m.width, h: m.height })).catch(() => ({}));
    assets[url] = { file, bytes: buf.length, type, ...meta };
    return file;
  } catch (e) { assets[url] = { error: String(e).slice(0, 120) }; return null; }
}

const reviews = fs.readdirSync(path.join(OUT, 'reviews/pages')).filter((f) => /-review\.json$/.test(f)).map((f) => f.replace(/\.json$/, ''));
const browser = await chromium.launch(launchArgs());
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA });

for (const r of reviews) {
  const base = `https://mousabatarseh.com/${r}/`;
  const norm = (u) => { try { const x = new URL(u, base); x.hash = ''; x.search = ''; return x.href.replace(/\/index\.html$/, '/'); } catch { return null; } };
  const queue = [base];
  const seen = new Set();
  const index = [];
  const dir = path.join(OUT, 'reviews/sheets', r);
  fs.mkdirSync(dir, { recursive: true });
  while (queue.length && index.length < 14) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const page = await ctx.newPage();
    try {
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      const status = res?.status();
      if (!res || status >= 400) { note(`${url} → ${status}`); await page.close(); continue; }
      await settle(page, 1400);
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); } scrollTo(0, 0); }).catch(() => {});
      await sleep(700);
      const n = String(index.length + 1).padStart(2, '0');
      const data = await page.evaluate(() => {
        const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
        const main = document.querySelector('main') || document.body;
        // Resolve relative URLs so the saved HTML stands on its own.
        main.querySelectorAll('[src]').forEach((e) => e.setAttribute('src', abs(e.getAttribute('src'))));
        main.querySelectorAll('img').forEach((e) => { if (e.currentSrc) e.setAttribute('src', e.currentSrc); e.removeAttribute('srcset'); });
        main.querySelectorAll('a[href]').forEach((e) => e.setAttribute('href', abs(e.getAttribute('href'))));
        // Mark what the reader can't see (collapsed panels are kept: they hold content).
        main.querySelectorAll('*').forEach((e) => { const cs = getComputedStyle(e); if (cs.display === 'none' && !e.closest('details')) e.setAttribute('data-hidden', ''); });
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText.trim() || '',
          description: document.querySelector('meta[name=description]')?.content || '',
          html: main.innerHTML,
          links: [...document.querySelectorAll('a[href]')].map((a) => abs(a.getAttribute('href'))),
          images: [...main.querySelectorAll('img')].map((i) => i.getAttribute('src')),
          height: document.documentElement.scrollHeight,
        };
      });
      fs.writeFileSync(path.join(dir, `${n}.html`), data.html);
      await sharp(await page.screenshot({ type: 'png' })).webp({ quality: 80 }).toFile(path.join(dir, `${n}.webp`));
      for (const src of data.images) await grab(src);
      index.push({ n, url, status, title: data.title, h1: data.h1, description: data.description, height: data.height });
      note(`${r} sheet ${n} ${url} → ${status}, ${data.html.length} chars, ${data.images.length} images`);
      for (const l of data.links) {
        const u = norm(l);
        if (!u || !u.startsWith(base) || /\/files\//.test(u) || /\.(pdf|csv|xlsx?|zip|json|png|jpe?g|webp|svg)$/i.test(u)) continue;
        if (!seen.has(u) && !queue.includes(u)) queue.push(u);
      }
    } catch (e) { note(`${url} failed: ${String(e).slice(0, 160)}`); }
    await page.close();
  }
  writeJSON(path.join(dir, 'index.json'), index);
}
writeJSON(assetsFile, assets);
writeJSON(path.join(OUT, 'reviews/sheets/log.json'), { at: new Date().toISOString(), log });
await browser.close();
