// Internal link and asset crawl of a build: every href/src/srcset/poster/data-src/url() that points inside the
// site must resolve to a file. External links are listed (they are checked on GitHub Actions by linkcheck.mjs).
// Usage: node scripts/linkcrawl.mjs [dist]
import fs from 'node:fs';
import path from 'node:path';

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
  for (const m of src.matchAll(/\s(?:href|src|poster|data-src)="([^"]+)"/g)) refs.push(m[1]);
  for (const m of src.matchAll(/\ssrcset="([^"]+)"/g)) m[1].split(',').forEach((p) => refs.push(p.trim().split(/\s+/)[0]));
  for (const m of src.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) refs.push(m[2]);
  for (const ref of refs) {
    if (/^(mailto:|tel:|data:|javascript:|#)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      const u = new URL(ref);
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
