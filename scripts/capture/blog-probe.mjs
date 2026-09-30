// Where do the blog's other posts live? The /blog/ index links twenty posts at mousabatarseh.com/<slug>/ whose
// pages answer with the blog index itself. This probe (GitHub Actions; read-only) tries the usual WordPress
// routes (feed, ?rest_route, ?name, sitemaps) and saves any full post content it finds.
// Output: capture/content/blog/probe.json (what each route answered) and, if found, capture/content/blog/wp-posts-root.json
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(root, 'capture/content/blog');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const S = 'the-backup-habit-that-saved-a-clients-store';
const routes = [
  'https://mousabatarseh.com/feed/',
  'https://mousabatarseh.com/?feed=rss2',
  'https://mousabatarseh.com/blog/feed/',
  'https://mousabatarseh.com/?rest_route=/wp/v2/posts&per_page=100',
  'https://mousabatarseh.com/index.php?rest_route=/wp/v2/posts&per_page=100',
  'https://mousabatarseh.com/wp-json/',
  'https://mousabatarseh.com/wp/wp-json/wp/v2/posts?per_page=100',
  'https://mousabatarseh.com/wordpress/wp-json/wp/v2/posts?per_page=100',
  'https://mousabatarseh.com/wp-sitemap.xml',
  'https://mousabatarseh.com/sitemap.xml',
  'https://mousabatarseh.com/sitemap_index.xml',
  'https://mousabatarseh.com/post-sitemap.xml',
  `https://mousabatarseh.com/?name=${S}`,
  `https://mousabatarseh.com/index.php/${S}/`,
  `https://mousabatarseh.com/${S}`,
  `https://mousabatarseh.com/blog/${S}/`,
  `https://work.mousabatarseh.com/${S}/`,
  'https://mousabatarseh.com/core-web-vitals-elementor-wordpress/',
  'https://work.mousabatarseh.com/feed/',
];
const results = [];
let found = [];
for (const url of routes) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
    const type = res.headers.get('content-type') || '';
    const body = await res.text();
    const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
    const r = { url, status: res.status, final: res.url, type, bytes: body.length, title: title.trim().slice(0, 120), hasBackupText: /Friday afternoon/i.test(body), head: body.slice(0, 240) };
    if (/json/.test(type)) {
      try { const j = JSON.parse(body); if (Array.isArray(j)) { r.posts = j.length; found.push(...j.map((p) => ({ slug: p.slug, link: p.link, title: p.title?.rendered, date: p.date, modified: p.modified, content: p.content?.rendered, excerpt: p.excerpt?.rendered, source: url }))); } } catch {}
    }
    if (/xml|rss/.test(type) || body.startsWith('<?xml')) {
      r.items = (body.match(/<item>/g) || []).length;
      r.locs = (body.match(/<loc>[^<]+<\/loc>/g) || []).slice(0, 80).map((x) => x.replace(/<\/?loc>/g, ''));
      for (const item of body.split('<item>').slice(1)) {
        const g = (t) => (item.match(new RegExp(`<${t}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${t}>`)) || [])[1] || '';
        const link = g('link').trim();
        const content = g('content:encoded');
        if (content) found.push({ slug: new URL(link).pathname.replace(/^\/|\/$/g, ''), link, title: g('title'), date: new Date(g('pubDate')).toISOString(), content, excerpt: g('description'), source: url });
      }
    }
    results.push(r);
    console.log(`${res.status} ${url} → ${res.url} ${type} ${body.length}b ${r.title}`);
  } catch (e) { results.push({ url, error: String(e).slice(0, 160) }); console.log(`ERR ${url} ${e}`); }
}
const bySlug = new Map();
for (const p of found) if (p.content && !bySlug.has(p.slug)) bySlug.set(p.slug, p);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'probe.json'), JSON.stringify({ at: new Date().toISOString(), results }, null, 1));
if (bySlug.size) fs.writeFileSync(path.join(OUT, 'wp-posts-root.json'), JSON.stringify([...bySlug.values()], null, 1));
console.log(`posts with content found: ${bySlug.size}`);
