// Turns raw captures (capture/raw/<slug>/…) into responsive web media in public/media/<slug>/ and writes
// src/data/media.json. Also builds the red/blue duotone "ghost plates" used by the registration reveal,
// tiny LQIP placeholders and art-directed detail crops (src/data/details.json).
// Usage: node scripts/process-media.mjs [--only=slug,slug] [--force]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const RAW = path.join(root, 'capture/raw');
const OUT = path.join(root, 'public/media');
const MANIFEST = path.join(root, 'src/data/media.json');
const DETAILS = path.join(root, 'src/data/details.json');
const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const force = args.includes('--force');
const FFMPEG = process.env.FFMPEG || (fs.existsSync('/home/user/.local/bin/ffmpeg') ? '/home/user/.local/bin/ffmpeg' : 'ffmpeg');

const readJSON = (p, f) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return f; } };
const logs = fs.existsSync(path.join(root, 'capture/reports'))
  ? Object.assign({}, ...fs.readdirSync(path.join(root, 'capture/reports')).filter((f) => f.startsWith('capture-log')).map((f) => readJSON(path.join(root, 'capture/reports', f), {})))
  : {};
const manifest = readJSON(MANIFEST, {});
const details = readJSON(DETAILS, []);

// Widths per view (CSS px × density covered by the source).
const PLAN = {
  'desktop-hero': { widths: [640, 960, 1280, 1920, 2560], avif: true, ghosts: true },
  'desktop-full': { widths: [720, 1440], avif: false, ghosts: false },
  'mobile-hero': { widths: [390, 780, 1170], avif: true, ghosts: false },
  'mobile-full': { widths: [390, 780], avif: false, ghosts: false },
  'tablet-hero': { widths: [834, 1668], avif: true, ghosts: false },
};

// Featured work gets the full responsive set; archive rows only need loupe/thumbnail sizes.
const FEATURED = new Set(['united-textile', 'universal-wholesale', 'firefly-burgers', 'eat-with-samar', 'great-lakes-cigar-festival', 'ptee-renewal', 'ptee-admissions', 'btee-build', 'asas', 'asas-studio-app', 'changeatlas', 'changeatlas-app', 'deals-os', 'csv-mapper', 'dealproof', 'seo-tools', 'diamedical-lab', 'diamedical-intro', 'review-carhartt-reworked', 'review-oakwood', 'review-vanguard', 'review-jbtools', 'review-hayhouse', 'review-biotrust']);
const LEAN = {
  'desktop-hero': { widths: [480, 960], avif: false, ghosts: false },
  'mobile-hero': { widths: [390], avif: false, ghosts: false },
};
const SKIP = new Set(['version-v1', 'version-v2', 'version-work']); // research-only captures

const newer = (src, dst) => force || !fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs;
const rel = (p) => '/' + path.relative(path.join(root, 'public'), p).split(path.sep).join('/');

async function duotone(input, out, dark, light) {
  // Map luminance onto a two-ink ramp: shadows → plate colour, highlights → paper.
  const { data, info } = await sharp(input).resize(640).greyscale().raw().toBuffer({ resolveWithObject: true });
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [d, l] = [hex(dark), hex(light)];
  const px = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const t = data[i] / 255;
    px[i * 3] = Math.round(d[0] + (l[0] - d[0]) * t);
    px[i * 3 + 1] = Math.round(d[1] + (l[1] - d[1]) * t);
    px[i * 3 + 2] = Math.round(d[2] + (l[2] - d[2]) * t);
  }
  await sharp(px, { raw: { width: info.width, height: info.height, channels: 3 } }).webp({ quality: 55 }).toFile(out);
}

async function processView(slug, view, src, dir) {
  const plan = FEATURED.has(slug) ? PLAN[view] : LEAN[view];
  if (!plan) return null;
  const meta = await sharp(src, { limitInputPixels: false }).metadata();
  const entry = { w: meta.width, h: meta.height, webp: [], avif: [] };
  for (const w of plan.widths.filter((w) => w <= meta.width)) {
    const base = path.join(dir, `${view}-${w}`);
    if (newer(src, base + '.webp')) await sharp(src, { limitInputPixels: false }).resize(w).webp({ quality: view.includes('full') ? 78 : 82, effort: 5 }).toFile(base + '.webp');
    entry.webp.push({ w, src: rel(base + '.webp') });
    if (plan.avif) {
      if (newer(src, base + '.avif')) await sharp(src, { limitInputPixels: false }).resize(w).avif({ quality: 58, effort: 4 }).toFile(base + '.avif');
      entry.avif.push({ w, src: rel(base + '.avif') });
    }
  }
  if (!entry.webp.length) {
    const base = path.join(dir, `${view}-${meta.width}`);
    await sharp(src, { limitInputPixels: false }).webp({ quality: 80 }).toFile(base + '.webp');
    entry.webp.push({ w: meta.width, src: rel(base + '.webp') });
  }
  const lqip = await sharp(src, { limitInputPixels: false }).resize(24).webp({ quality: 40 }).toBuffer();
  entry.lqip = `data:image/webp;base64,${lqip.toString('base64')}`;
  // Average colour → placeholder ground while loading.
  const { dominant } = await sharp(src, { limitInputPixels: false }).stats();
  entry.color = `rgb(${dominant.r} ${dominant.g} ${dominant.b})`;
  if (plan.ghosts) {
    const ga = path.join(dir, `${view}-ghost-a.webp`), gb = path.join(dir, `${view}-ghost-b.webp`);
    if (newer(src, ga)) await duotone(src, ga, '#e23d28', '#efece4');
    if (newer(src, gb)) await duotone(src, gb, '#1d3fd8', '#efece4');
    entry.ghostA = rel(ga);
    entry.ghostB = rel(gb);
  }
  return entry;
}

const slugs = fs.existsSync(RAW) ? fs.readdirSync(RAW).filter((s) => !SKIP.has(s) && fs.statSync(path.join(RAW, s)).isDirectory() && (!only.length || only.includes(s))) : [];
for (const slug of slugs) {
  const srcDir = path.join(RAW, slug);
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const log = logs[slug] || {};
  const m = { title: log.title || null, url: log.url || null, capturedAt: log.capturedAt || null, views: {} };
  for (const view of Object.keys(PLAN)) {
    const src = path.join(srcDir, `${view}.webp`);
    if (!fs.existsSync(src)) continue;
    const r = await processView(slug, view, src, dir);
    if (r) m.views[view] = r;
  }
  for (const name of ['scroll', 'interact']) {
    const mp4 = path.join(srcDir, `${name}.mp4`);
    if (!fs.existsSync(mp4)) continue;
    const out = path.join(dir, `${name}.mp4`);
    // Re-encode for the web: 1280w, no audio, fast start. Keep it small.
    if (newer(mp4, out)) execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', mp4, '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out]);
    const poster = path.join(srcDir, `${name}-poster.webp`);
    const posterOut = path.join(dir, `${name}-poster.webp`);
    if (fs.existsSync(poster) && newer(poster, posterOut)) await sharp(poster).resize(1280).webp({ quality: 80 }).toFile(posterOut);
    const pm = fs.existsSync(posterOut) ? await sharp(posterOut).metadata() : { width: 1280, height: 800 };
    const info = name === 'scroll' ? log.recording : log.interaction;
    const v = { src: rel(out), poster: fs.existsSync(posterOut) ? rel(posterOut) : null, w: pm.width, h: pm.height, seconds: info?.seconds || null, bytes: fs.statSync(out).size };
    if (name === 'scroll') m.video = v; else m.interaction = v;
  }
  const outline = path.join(srcDir, 'outline-desktop.json');
  if (fs.existsSync(outline)) m.outline = readJSON(outline, null);
  if (Object.keys(m.views).length || m.video || m.interaction) manifest[slug] = m;
  console.log(`✓ ${slug}: ${Object.keys(m.views).join(', ')}${m.video ? ' + video' : ''}${m.interaction ? ' + interaction' : ''}`);
}

// Art-directed detail crops: { slug, from: view, rect: [x, y, w, h] (source px), name, label }
for (const d of details) {
  const src = path.join(RAW, d.slug, `${d.from}.webp`);
  if (!fs.existsSync(src) || !manifest[d.slug]) continue;
  const dir = path.join(OUT, d.slug);
  const [x, y, w, h] = d.rect;
  const base = path.join(dir, `detail-${d.name}`);
  const out = { name: d.name, label: d.label, w, h, webp: [] };
  for (const tw of [480, 960, 1440].filter((tw) => tw <= w * 1.01)) {
    const f = `${base}-${tw}.webp`;
    if (newer(src, f) || force) await sharp(src, { limitInputPixels: false }).extract({ left: x, top: y, width: w, height: h }).resize(tw).webp({ quality: 84 }).toFile(f);
    out.webp.push({ w: tw, src: rel(f) });
  }
  if (!out.webp.length) {
    const f = `${base}-${w}.webp`;
    await sharp(src, { limitInputPixels: false }).extract({ left: x, top: y, width: w, height: h }).webp({ quality: 84 }).toFile(f);
    out.webp.push({ w, src: rel(f) });
  }
  manifest[d.slug].details = [...(manifest[d.slug].details || []).filter((x) => x.name !== d.name), out];
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
console.log(`\nManifest: ${Object.keys(manifest).length} entries → ${path.relative(root, MANIFEST)}`);
