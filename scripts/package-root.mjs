// Builds the upload package for the main domain — run only after Mousa approves the replacement.
// Usage: node scripts/package-root.mjs
//
// The live root today is a static site (the v1 home, no WordPress at / — probe 2026-09-26) with many sibling
// folders: /v2/, /reviews/ (the reviews site), /blog/ (a static index), the tools, the full reviews and proposals.
// This package replaces the home page, the /blog/ and /reviews/ indexes, and adds /work/, /about/, a folder per
// post and per review. It never includes a root .htaccess, robots.txt or sitemap.xml; the redirects the old post
// and review URLs need are written to deploy/redirects.htaccess for Mousa to add by hand, after approval.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'deploy', 'build');
const zipPath = path.join(root, 'deploy', 'mousabatarseh-root.zip');

// 1. Production build: no VERCEL/PREVIEW env, so pages are indexable and canonical to mousabatarseh.com.
const env = { ...process.env };
delete env.VERCEL;
delete env.PREVIEW;
fs.rmSync(out, { recursive: true, force: true });
execFileSync('npx', ['astro', 'build', '--outDir', out], { cwd: root, env, stdio: 'inherit' });
execFileSync('node', ['scripts/postbuild.mjs', out], { cwd: root, env, stdio: 'inherit' });

// 2. Checks: every page indexable, canonical on the main domain, no preview host baked in.
const pages = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') && pages.push(path.join(d, e.name))));
walk(out);
const problems = [];
for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(out, f);
  if (/<meta name="robots" content="noindex/.test(html) && !rel.endsWith('404.html')) problems.push(`${rel}: noindex in production build`);
  if (!rel.endsWith('404.html') && !/<link rel="canonical" href="https:\/\/mousabatarseh\.com\//.test(html)) problems.push(`${rel}: canonical is not on mousabatarseh.com`);
  if (/vercel\.app/.test(html)) problems.push(`${rel}: mentions a vercel.app host`);
}
if (problems.length) {
  console.error('Package refused:\n  ' + problems.join('\n  '));
  process.exit(1);
}

// 3. Leave out files that would overwrite what the live root already relies on.
for (const f of ['robots.txt', '_weights.json']) fs.rmSync(path.join(out, f), { force: true });

// 4. Cache rules scoped to the new asset folders only (never the root .htaccess).
const types = `<IfModule mod_mime.c>
  AddType image/avif .avif
  AddType image/webp .webp
  AddType font/woff2 .woff2
  AddType video/mp4 .mp4
</IfModule>
`;
const cache = (seconds, immutable) => `${types}<IfModule mod_headers.c>
  Header set Cache-Control "public, max-age=${seconds}${immutable ? ', immutable' : ''}"
</IfModule>
`;
fs.writeFileSync(path.join(out, '_assets', '.htaccess'), cache(31536000, true));
fs.writeFileSync(path.join(out, 'media', '.htaccess'), cache(2592000, false));
fs.writeFileSync(path.join(out, 'og', '.htaccess'), cache(604800, false));

// 5. Manifest: every top-level entry the upload writes, and what it does to the live root.
const effect = {
  'index.html': 'REPLACES the current home page — download the existing index.html first (step 2 of docs/deploy.md)',
  '404.html': 'new file; only used if you add the optional ErrorDocument line',
  work: 'new folder — /work/ returns 404 on the live domain today (checked 2026-09-26)',
  blog: 'REPLACES /blog/index.html and adds /blog/<post>/ folders — download the whole existing blog folder first',
  reviews: 'REPLACES /reviews/index.html and adds /reviews/<review>/ folders; the old /reviews/reviews/, /reviews/builds/, /reviews/method/, /reviews/img/ and /reviews/assets/ stay on the server — download the whole existing reviews folder first',
  about: 'new folder — /about/ returns 404 on the live domain today (checked 2026-09-26)',
  _assets: 'new folder — CSS, JavaScript and fonts',
  media: 'new folder — captures and recordings',
  og: 'new folder — social sharing images',
  'favicon.ico': 'replaces the existing favicon if there is one',
  'favicon.svg': 'new or replaces',
  'apple-touch-icon.png': 'new or replaces',
  'llms.txt': 'new or replaces — check whether the root already has one',
  'sitemap-portfolio.xml': 'new file; the existing sitemap.xml is untouched',
};
const top = fs.readdirSync(out).filter((n) => !n.startsWith('.')).sort();
const du = (p) => (fs.statSync(p).isDirectory() ? fs.readdirSync(p).reduce((a, n) => a + du(path.join(p, n)), 0) : fs.statSync(p).size);
const lines = top.map((n) => `${(n + (fs.statSync(path.join(out, n)).isDirectory() ? '/' : '')).padEnd(24)} ${(du(path.join(out, n)) / 1024 / 1024).toFixed(1).padStart(6)} MB   ${effect[n] || 'CHECK — not expected'}`);
const manifest = `mousabatarseh-root.zip — built ${new Date().toISOString()}
Unzip into the domain's document root (public_html). Top-level entries:

${lines.join('\n')}

Not included on purpose: .htaccess at the root, robots.txt, sitemap.xml.
Redirects for the old post and review URLs: deploy/redirects.htaccess (add by hand — docs/deploy.md step 4).
Add this line to the existing robots.txt:
Sitemap: https://mousabatarseh.com/sitemap-portfolio.xml
`;
fs.writeFileSync(path.join(root, 'deploy', 'MANIFEST.txt'), manifest);

// 5b. Redirects for the old post and review URLs (not applied by the package; see docs/deploy.md step 4).
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/data/blog.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(path.join(root, 'src/data/reviews.json'), 'utf8'));
const redirects = `# mousabatarseh.com — redirects for the new portfolio. Paste right after "RewriteEngine On" in the ROOT .htaccess
# (add "RewriteEngine On" first if the file doesn't have it). Generated ${new Date().toISOString().slice(0, 10)}.

# Blog: each post that has a page here (old links opened the blog index).
${posts.map((p) => `RewriteRule ^${p.slug}/?$ /blog/${p.slug}/ [R=301,L]`).join('\n')}

# Reviews: the reviews site's summary pages → the review's page here.
RewriteRule ^reviews/reviews/([a-z0-9-]+)/?(index\.html)?$ /reviews/$1/ [R=301,L]
RewriteRule ^reviews/index\.html$ /reviews/ [R=301,L]

# Optional — only if you want the full-review folders to point here too. They are the original work samples
# (some were sent with job applications), so they are left alone unless you uncomment these.
${reviews.map((r) => `# RewriteRule ^${r.source.replace('https://mousabatarseh.com/', '').replace(/\/$/, '')}/?$ /reviews/${r.slug}/ [R=301,L]`).join('\n')}
`;
fs.writeFileSync(path.join(root, 'deploy', 'redirects.htaccess'), redirects);

// 6. Zip (keeps dot-files so the scoped .htaccess files travel with their folders).
fs.rmSync(zipPath, { force: true });
execFileSync('zip', ['-qr', zipPath, '.'], { cwd: out });
console.log(manifest);
console.log(`Package: ${path.relative(root, zipPath)} (${(fs.statSync(zipPath).size / 1024 / 1024).toFixed(1)} MB), ${pages.length} pages checked.`);
