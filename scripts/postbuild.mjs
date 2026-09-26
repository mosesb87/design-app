// After `astro build`: measure each page's real weight (gzipped HTML + CSS + JS modules and their chunks +
// preloaded fonts — everything that loads before images) and print it in the footer. Also writes
// dist/_weights.json for the QA report. A performance claim the page makes about itself, counted not claimed.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dist = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../dist');
const gz = (buf) => zlib.gzipSync(buf, { level: 9 }).length;
const kb = (n) => `${Math.round(n / 1024)} KB`;
const cache = new Map();

function fileSize(rel) {
  const p = path.join(dist, rel.split('?')[0]);
  if (!fs.existsSync(p)) return 0;
  if (!cache.has(p)) cache.set(p, gz(fs.readFileSync(p)));
  return cache.get(p);
}

// Follow static imports inside a JS module (Astro/Vite chunks), not dynamic ones (those load on demand).
function jsGraph(rel, seen = new Set()) {
  const clean = rel.split('?')[0];
  if (seen.has(clean)) return seen;
  seen.add(clean);
  const p = path.join(dist, clean);
  if (!fs.existsSync(p)) return seen;
  const src = fs.readFileSync(p, 'utf8');
  const re = /(?:^|[;\s])import\s*(?:[\w*{}\s,]*from\s*)?["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) {
    const spec = m[1];
    if (!spec.startsWith('.') && !spec.startsWith('/')) continue;
    const next = spec.startsWith('/') ? spec : path.posix.join(path.posix.dirname(clean), spec);
    jsGraph(next, seen);
  }
  return seen;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.html') ? [path.join(dir, d.name)] : []));
}

const report = {};
for (const file of walk(dist)) {
  let html = fs.readFileSync(file, 'utf8');
  const css = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  const fonts = [...html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.woff2)"/g)].map((m) => m[1]);
  const js = new Set();
  for (const m of html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)) jsGraph(m[1], js);
  const inlineJs = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].reduce((a, m) => a + m[1].length, 0);
  const jsBytes = [...js].reduce((a, r) => a + fileSize(r), 0);
  const cssBytes = css.reduce((a, r) => a + fileSize(r), 0);
  const fontBytes = fonts.reduce((a, r) => a + fileSize(r), 0);
  // Measure the HTML with the final string in place (a few bytes' difference, but honest).
  const placeholder = /<span data-weight[^>]*>[^<]*<\/span>/;
  const estimate = (h) => gz(Buffer.from(h)) + cssBytes + jsBytes + fontBytes;
  let total = estimate(html);
  const label = (t) => `<span data-weight>This page: ${kb(t)} before images · ${kb(jsBytes)} of JavaScript (gzipped)</span>`;
  html = html.replace(placeholder, label(total));
  total = estimate(html);
  html = html.replace(placeholder, label(total));
  fs.writeFileSync(file, html);
  report['/' + path.relative(dist, file).replace(/index\.html$/, '')] = { totalKB: +(total / 1024).toFixed(1), htmlKB: +(gz(Buffer.from(html)) / 1024).toFixed(1), cssKB: +(cssBytes / 1024).toFixed(1), jsKB: +(jsBytes / 1024).toFixed(1), fontKB: +(fontBytes / 1024).toFixed(1), inlineJsChars: inlineJs, modules: [...js].length };
}
fs.writeFileSync(path.join(dist, '_weights.json'), JSON.stringify(report, null, 2));
for (const [p, r] of Object.entries(report)) console.log(`${p.padEnd(34)} ${String(r.totalKB).padStart(6)} KB  (js ${r.jsKB} · css ${r.cssKB} · fonts ${r.fontKB} · html ${r.htmlKB})`);
