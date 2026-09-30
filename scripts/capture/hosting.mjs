// Public scan of Mousa's hosting, run on GitHub Actions (the development container can't reach his hosts).
// No logins: only what anyone can see. Finds every subdomain from the public certificate logs (crt.sh, with the
// date its first certificate was issued), reads each host's robots.txt and sitemaps (with lastmod dates), asks
// each WordPress site's public REST API for its pages' published and modified dates, and fetches every build URL
// on the archive plus the builds index, recording status, Last-Modified and every date the page states about
// itself (meta tags, JSON-LD, <time>, "updated …" lines, copyright years).
// Output: capture/hosting/scan.json and capture/hosting/summary.md.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const out = path.join(root, 'capture', 'hosting');
fs.mkdirSync(out, { recursive: true });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36 (portfolio-hosting-scan; owner-approved)';
const DOMAINS = ['mousabatarseh.com', 'moseswebworks.com', 'asas.build'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, { timeout = 20000, method = 'GET', accept } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { method, redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA, accept: accept || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' } });
    const text = method === 'HEAD' ? '' : await res.text();
    return { ok: res.ok, status: res.status, url: res.url, headers: Object.fromEntries(res.headers), text };
  } catch (e) {
    return { ok: false, status: 0, url, error: String(e.message || e).slice(0, 200), headers: {}, text: '' };
  } finally {
    clearTimeout(t);
  }
}
// Run tasks with limited concurrency.
async function pool(items, n, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; results[k] = await fn(items[k], k); }
  }));
  return results;
}

const report = { scannedAt: new Date().toISOString(), note: 'Public scan only: certificate logs, robots.txt, sitemaps, public WordPress REST, page metadata and HTTP headers.', hosts: {}, urls: [], wordpress: {}, errors: [] };

// 1. Subdomains from the certificate transparency logs, with the first and latest certificate dates.
for (const d of DOMAINS) {
  const r = await get(`https://crt.sh/?q=%25.${d}&output=json`, { timeout: 60000, accept: 'application/json' });
  if (!r.ok) { report.errors.push({ step: 'crt.sh', domain: d, status: r.status, error: r.error }); continue; }
  let rows = [];
  try { rows = JSON.parse(r.text); } catch (e) { report.errors.push({ step: 'crt.sh parse', domain: d }); }
  for (const row of rows) {
    for (const name of String(row.name_value || '').split('\n')) {
      const host = name.trim().toLowerCase().replace(/^\*\./, '');
      if (!host.endsWith(d)) continue;
      const h = (report.hosts[host] ||= { host, firstCert: null, lastCert: null, certs: 0 });
      h.certs++;
      const nb = (row.not_before || '').slice(0, 10);
      if (nb && (!h.firstCert || nb < h.firstCert)) h.firstCert = nb;
      if (nb && (!h.lastCert || nb > h.lastCert)) h.lastCert = nb;
    }
  }
  await sleep(1500);
}
for (const d of DOMAINS) report.hosts[d] ||= { host: d, firstCert: null, lastCert: null, certs: 0 };

// 2. Each host: is it up, robots.txt, sitemaps (with lastmod), WordPress REST pages.
const locRe = /<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g;
const smRe = /<sitemap>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g;
async function sitemaps(host) {
  const seen = new Set();
  const urls = [];
  const queue = [`https://${host}/sitemap.xml`, `https://${host}/sitemap_index.xml`, `https://${host}/wp-sitemap.xml`];
  const robots = await get(`https://${host}/robots.txt`, { timeout: 15000 });
  if (robots.ok) for (const m of robots.text.matchAll(/^sitemap:\s*(\S+)/gim)) queue.push(m[1]);
  let fetched = 0;
  while (queue.length && fetched < 40) {
    const u = queue.shift();
    if (seen.has(u)) continue;
    seen.add(u);
    const r = await get(u, { timeout: 20000, accept: 'application/xml,text/xml,*/*' });
    fetched++;
    if (!r.ok || !/<(urlset|sitemapindex)/.test(r.text)) continue;
    for (const m of r.text.matchAll(smRe)) queue.push(m[1].trim());
    for (const m of r.text.matchAll(locRe)) urls.push({ loc: m[1].trim(), lastmod: m[2]?.trim() || null, from: u });
  }
  return { robots: robots.ok ? robots.text.slice(0, 2000) : null, sitemapsRead: [...seen], urls };
}
async function wpPages(host) {
  const all = [];
  for (const type of ['pages', 'posts']) {
    for (let page = 1; page <= 5; page++) {
      const r = await get(`https://${host}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=link,date,modified,slug,title`, { timeout: 25000, accept: 'application/json' });
      if (!r.ok) break;
      let rows;
      try { rows = JSON.parse(r.text); } catch { break; }
      if (!Array.isArray(rows) || !rows.length) break;
      for (const x of rows) all.push({ type, link: x.link, slug: x.slug, title: x.title?.rendered?.slice(0, 120), date: x.date, modified: x.modified });
      if (rows.length < 100) break;
    }
  }
  return all;
}

// 3. Every build URL: the archive's own list (src/data/work.ts), the builds index links and the sitemap pages
//    of mousabatarseh.com and its subdomains.
const workSrc = fs.readFileSync(path.join(root, 'src/data/work.ts'), 'utf8');
const M = 'https://mousabatarseh.com';
const archive = [...workSrc.matchAll(/slug: '([^']+)'[^\n]*?url: (?:'([^']+)'|`\$\{M\}([^`]+)`)/g)].map((m) => ({ slug: m[1], url: m[2] || M + m[3] }));
let buildsIndexLinks = [];
try {
  const bj = JSON.parse(fs.readFileSync(path.join(root, 'capture/content/reviews/pages/reviews--builds.json'), 'utf8'));
  buildsIndexLinks = (bj.links || []).map((l) => (typeof l === 'string' ? l : l.href || l.url)).filter((u) => /^https?:/.test(u || ''));
} catch {}

const dateOf = (html) => {
  const found = {};
  const meta = (p) => (html.match(new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${p}["'][^>]*content=["']([^"']+)`, 'i')) || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name|itemprop)=["']${p}["']`, 'i')) || [])[1];
  for (const p of ['article:published_time', 'article:modified_time', 'og:updated_time', 'date', 'last-modified', 'dcterms.modified', 'dcterms.created', 'datePublished', 'dateModified']) { const v = meta(p); if (v) found[p] = v; }
  for (const m of html.matchAll(/"(datePublished|dateModified|dateCreated|uploadDate)"\s*:\s*"([^"]+)"/g)) found[`ld:${m[1]}`] ||= m[2];
  const times = [...html.matchAll(/<time[^>]*datetime=["']([^"']+)["']/gi)].map((m) => m[1]).slice(0, 6);
  if (times.length) found.time = times;
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const said = [...text.matchAll(/((?:last\s+)?(?:updated|checked|scanned|published|built|launched|quoted|reviewed|captured|as of)[^.]{0,20}?((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2},?\s+20\d\d|20\d\d-\d\d-\d\d))/gi)].map((m) => m[1].trim()).slice(0, 6);
  if (said.length) found.said = said;
  const copy = [...text.matchAll(/(?:©|&copy;|copyright)\s*(20\d\d(?:\s*[–-]\s*20\d\d)?)/gi)].map((m) => m[1]).slice(0, 2);
  if (copy.length) found.copyright = copy;
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1];
  return { title: title?.trim().slice(0, 140) || null, dates: found };
};

// The client sites on the archive are scanned the same way (home page, sitemaps, public WordPress REST), so their
// builds can be dated too; they have no certificate-log entry here.
for (const a of archive) {
  try { const h = new URL(a.url).hostname.toLowerCase(); report.hosts[h] ||= { host: h, firstCert: null, lastCert: null, certs: 0, client: true }; } catch {}
}
const hostList = Object.keys(report.hosts).sort();
console.log(`hosts from certificate logs: ${hostList.length}`);
await pool(hostList, 4, async (host) => {
  const h = report.hosts[host];
  const home = await get(`https://${host}/`, { timeout: 20000 });
  h.status = home.status;
  h.finalUrl = home.url;
  h.lastModified = home.headers['last-modified'] || null;
  h.server = home.headers.server || null;
  h.home = home.ok ? dateOf(home.text) : null;
  h.wordpress = /wp-content|wp-json/.test(home.text);
  if (home.status) {
    const sm = await sitemaps(host);
    h.robots = sm.robots;
    h.sitemapsRead = sm.sitemapsRead;
    h.sitemapUrls = sm.urls.length;
    report.urls.push(...sm.urls.slice(0, 600).map((u) => ({ ...u, kind: 'sitemap', host })));
    if (h.wordpress) report.wordpress[host] = await wpPages(host);
  }
});

const targets = new Map();
for (const a of archive) targets.set(a.url, { url: a.url, slug: a.slug, kind: 'archive' });
for (const u of buildsIndexLinks) if (!targets.has(u)) targets.set(u, { url: u, kind: 'builds-index' });
for (const u of report.urls) if (/mousabatarseh\.com|moseswebworks\.com|asas\.build/.test(u.loc) && !targets.has(u.loc)) targets.set(u.loc, { url: u.loc, kind: 'sitemap', lastmod: u.lastmod });
const list = [...targets.values()].slice(0, 700);
console.log(`pages to check: ${list.length}`);
report.pages = await pool(list, 6, async (t) => {
  const r = await get(t.url, { timeout: 25000 });
  const info = r.ok ? dateOf(r.text) : { title: null, dates: {} };
  return { ...t, status: r.status, finalUrl: r.url !== t.url ? r.url : undefined, lastModified: r.headers['last-modified'] || null, etag: r.headers.etag || null, error: r.error, ...info };
});

fs.writeFileSync(path.join(out, 'scan.json'), JSON.stringify(report, null, 1));

// Summary for reading on GitHub.
const lines = [`# Hosting scan — ${report.scannedAt.slice(0, 10)}`, '', report.note, '', '## Hosts (certificate logs)', '', '| Host | Status | First certificate | Latest certificate | Last-Modified | WordPress | Sitemap URLs |', '|---|---|---|---|---|---|---|'];
for (const h of Object.values(report.hosts).sort((a, b) => (b.firstCert || '').localeCompare(a.firstCert || ''))) lines.push(`| ${h.host} | ${h.status ?? ''} | ${h.firstCert ?? ''} | ${h.lastCert ?? ''} | ${h.lastModified ?? ''} | ${h.wordpress ? 'yes' : ''} | ${h.sitemapUrls ?? ''} |`);
lines.push('', '## Pages', '', '| Slug / kind | URL | Status | Last-Modified | Dates the page states |', '|---|---|---|---|---|');
for (const p of report.pages) lines.push(`| ${p.slug || p.kind} | ${p.url} | ${p.status} | ${p.lastModified ?? ''} | ${JSON.stringify(p.dates || {}).slice(0, 300).replace(/\|/g, '/')} |`);
lines.push('', '## WordPress pages (public REST)', '');
for (const [host, rows] of Object.entries(report.wordpress)) {
  lines.push(`### ${host} (${rows.length})`, '', '| Type | Link | Published | Modified |', '|---|---|---|---|');
  for (const r of rows.slice(0, 200)) lines.push(`| ${r.type} | ${r.link} | ${r.date} | ${r.modified} |`);
  lines.push('');
}
fs.writeFileSync(path.join(out, 'summary.md'), lines.join('\n'));
console.log(`hosts ${hostList.length}, pages ${report.pages.length}, wordpress hosts ${Object.keys(report.wordpress).length}, errors ${report.errors.length}`);
