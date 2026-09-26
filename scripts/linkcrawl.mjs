// Internal link and asset crawl of a build: every href/src/srcset/poster/data-src/url() that points inside the
// site must resolve to a file. External links are listed (they are checked on GitHub Actions by linkcheck.mjs).
// Usage: node scripts/linkcrawl.mjs [dist]
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const dist = path.resolve(process.argv[2] || 'dist');
const pages = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : /\.(html|css)$/.test(e.name) && pages.push(path.join(d, e.name))));
walk(dist);
const missing = [];
const external = new Set();
let checked = 0;
const resolve = (from, ref) => {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return null;
  const abs = clean.startsWith('/') ? path.join(dist, clean) : path.join(path.dirname(from), clean);
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) return fs.existsSync(path.join(abs, 'index.html')) ? path.join(abs, 'index.html') : null;
  return fs.existsSync(abs) ? abs : null;
};
for (const file of pages) {
  const src = fs.readFileSync(file, 'utf8');
  const refs = [];
  // HTML is parsed (attributes only, so code samples in text are never mistaken for links); CSS is scanned.
  let ids = null;
  if (file.endsWith('.html')) {
    const doc = parse(src);
    ids = new Set(doc.querySelectorAll('[id]').map((e) => e.getAttribute('id')));
    for (const el of doc.querySelectorAll('[href], [src], [poster], [data-src], [srcset], [style]')) {
      for (const a of ['href', 'src', 'poster', 'data-src']) { const v = el.getAttribute(a); if (v) refs.push(v); }
      const ss = el.getAttribute('srcset');
      if (ss) ss.split(',').forEach((p) => refs.push(p.trim().split(/\s+/)[0]));
      const st = el.getAttribute('style');
      if (st) for (const m of st.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) refs.push(m[2]);
    }
    for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) for (const u of m[1].matchAll(/url\((['"]?)([^'")]+)\1\)/g)) refs.push(u[2]);
  } else for (const m of src.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) refs.push(m[2]);
  for (const ref of refs) {
    if (ref.startsWith('#')) { if (ids && ref.length > 1 && !ids.has(decodeURIComponent(ref.slice(1)))) missing.push(`${path.relative(dist, file)} → ${ref} (no such id)`); continue; }
    if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      let u;
      try { u = new URL(ref); } catch { missing.push(`${path.relative(dist, file)} → ${ref} (invalid URL)`); continue; }
      if (u.hostname === 'mousabatarseh.com' && /^\/(work|about)?\/?/.test(u.pathname) && resolve(file, u.pathname)) { checked++; continue; }
      external.add(ref);
      continue;
    }
    checked++;
    if (!resolve(file, ref)) missing.push(`${path.relative(dist, file)} → ${ref}`);
  }
}
console.log(`${pages.length} files, ${checked} internal references checked, ${missing.length} missing, ${external.size} distinct external URLs`);
if (missing.length) console.log(missing.slice(0, 40).join('\n'));
fs.mkdirSync('qa-out', { recursive: true });
fs.writeFileSync(path.join('qa-out', 'links-internal.json'), JSON.stringify({ checked, missing, external: [...external].sort() }, null, 2));
process.exit(missing.length ? 1 : 0);
