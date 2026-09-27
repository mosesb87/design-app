// Fetch Mousa's logo exactly as his live pages publish it: favicons, touch icons, header logo images and
// inline header SVGs, byte for byte. Also screenshots each header so the files can be matched to what
// visitors see. Output: capture/brand/ (brand.json + files/ + shots/). Runs on GitHub Actions.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
import { launchArgs, settle, writeJSON, UA_NOTE } from './lib.mjs';

const OUT = 'capture/brand';
const PAGES = [
  'https://mousabatarseh.com/',
  'https://mousabatarseh.com/v2/',
  'https://mousabatarseh.com/v2/work/',
  'https://mousabatarseh.com/reviews/',
  'https://mousabatarseh.com/reworked-review/',
  'https://work.mousabatarseh.com/',
];
const EXTRA = ['https://mousabatarseh.com/favicon.ico', 'https://mousabatarseh.com/reviews/assets/logo.svg'];

fs.mkdirSync(`${OUT}/files`, { recursive: true });
fs.mkdirSync(`${OUT}/shots`, { recursive: true });
const report = { fetched: new Date().toISOString(), note: UA_NOTE, pages: [], files: [] };
const saved = new Map();

async function save(ctx, url, from) {
  if (!url || url.startsWith('data:') || saved.has(url)) return saved.get(url);
  try {
    const res = await ctx.request.get(url, { timeout: 20000 });
    if (!res.ok()) { report.files.push({ url, from, status: res.status() }); return null; }
    const body = await res.body();
    const type = res.headers()['content-type'] || '';
    const ext = path.extname(new URL(url).pathname) || (type.includes('svg') ? '.svg' : type.includes('png') ? '.png' : type.includes('icon') ? '.ico' : '.bin');
    const name = `${crypto.createHash('sha1').update(url).digest('hex').slice(0, 10)}${ext}`;
    fs.writeFileSync(`${OUT}/files/${name}`, body);
    const entry = { url, from, status: res.status(), type, bytes: body.length, file: `files/${name}` };
    report.files.push(entry);
    saved.set(url, entry);
    return entry;
  } catch (e) {
    report.files.push({ url, from, error: String(e.message || e).slice(0, 200) });
    return null;
  }
}

const browser = await chromium.launch(launchArgs());
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
for (const url of PAGES) {
  const page = await ctx.newPage();
  const item = { url };
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    item.status = res?.status();
    await settle(page, 1500);
    const found = await page.evaluate(() => {
      const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
      const icons = [...document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"], meta[property="og:image"], meta[name="msapplication-TileImage"]')]
        .map((l) => ({ rel: l.getAttribute('rel') || l.getAttribute('property') || l.getAttribute('name'), href: abs(l.getAttribute('href') || l.getAttribute('content')), sizes: l.getAttribute('sizes') }));
      const header = document.querySelector('header, [class*="header" i], nav, [class*="topbar" i]') || document.body;
      const homeLinks = [...document.querySelectorAll('a[href="/"], a[href="./"], a[href="../"], a[href$="mousabatarseh.com/"], a[href$="/v2/"], a[class*="logo" i], a[class*="brand" i]')].slice(0, 6);
      const logoish = (el) => /logo|brand|mark/i.test(`${el.className?.baseVal ?? el.className} ${el.id} ${el.getAttribute('alt') || ''} ${el.getAttribute('src') || ''}`);
      const imgs = [...document.querySelectorAll('img, image')]
        .filter((i) => logoish(i) || header.contains(i) || homeLinks.some((a) => a.contains(i)))
        .slice(0, 12)
        .map((i) => ({ src: abs(i.currentSrc || i.getAttribute('src') || i.getAttribute('href')), alt: i.getAttribute('alt'), cls: String(i.className?.baseVal ?? i.className), w: i.naturalWidth, h: i.naturalHeight }));
      const svgs = [...document.querySelectorAll('svg')]
        .filter((s) => logoish(s) || homeLinks.some((a) => a.contains(s)) || (header.contains(s) && s.getBoundingClientRect().top < 140))
        .slice(0, 8)
        .map((s) => { const r = s.getBoundingClientRect(); return { html: s.outerHTML.slice(0, 20000), box: [r.x, r.y, r.width, r.height].map(Math.round) }; });
      const bgs = [...header.querySelectorAll('*')]
        .map((el) => getComputedStyle(el).backgroundImage)
        .filter((b) => b && b.startsWith('url('))
        .map((b) => abs(b.slice(4, -1).replace(/["']/g, '')));
      const brand = homeLinks.map((a) => ({ text: a.textContent.trim().slice(0, 80), html: a.innerHTML.slice(0, 4000) }));
      return { icons, imgs, svgs, bgs: [...new Set(bgs)].slice(0, 6), brand };
    });
    item.found = found;
    for (const i of found.icons) await save(ctx, i.href, url);
    for (const i of found.imgs) await save(ctx, i.src, url);
    for (const b of found.bgs) await save(ctx, b, url);
    const slug = new URL(url).host.split('.')[0] + new URL(url).pathname.replace(/\W+/g, '-');
    await page.screenshot({ path: `${OUT}/shots/${slug}header.png`, clip: { x: 0, y: 0, width: 1440, height: 160 } });
    const logoEl = await page.$('a[class*="logo" i], a[class*="brand" i], header a[href="/"], nav a[href="/"], header a[href="./"], header a[href$="/v2/"]');
    if (logoEl) await logoEl.screenshot({ path: `${OUT}/shots/${slug}logo.png` }).catch(() => {});
  } catch (e) {
    item.error = String(e.message || e).slice(0, 300);
  }
  report.pages.push(item);
  await page.close();
}
for (const u of EXTRA) await save(ctx, u, 'direct');
await browser.close();
writeJSON(`${OUT}/brand.json`, report);
console.log(JSON.stringify(report.files.map((f) => [f.url, f.status, f.bytes, f.file]), null, 1));
