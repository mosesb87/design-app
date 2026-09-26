// Checks every external URL the portfolio links to (and live-domain paths the deploy could shadow).
// Usage: node scripts/capture/linkcheck.mjs [links.json] [out.json]
import path from 'node:path';
import { readJSON, writeJSON } from './lib.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const list = readJSON(process.argv[2] || path.join(root, 'capture/links.json'), []);
const out = process.argv[3] || path.join(root, 'capture/reports/links.json');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';

async function check(url) {
  const chain = [];
  let current = url;
  const t0 = Date.now();
  try {
    for (let i = 0; i < 8; i++) {
      const res = await fetch(current, { method: 'GET', redirect: 'manual', headers: { 'user-agent': UA, accept: 'text/html,*/*' }, signal: AbortSignal.timeout(20000) });
      chain.push({ url: current, status: res.status });
      const loc = res.headers.get('location');
      if (res.status >= 300 && res.status < 400 && loc) { current = new URL(loc, current).href; continue; }
      let title = null;
      if ((res.headers.get('content-type') || '').includes('text/html')) {
        const html = (await res.text()).slice(0, 200000);
        title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim() || null;
      }
      return { url, ok: res.status < 400, status: res.status, finalUrl: current, redirects: chain.length - 1, title, ms: Date.now() - t0 };
    }
    return { url, ok: false, error: 'too many redirects', chain };
  } catch (e) {
    return { url, ok: false, error: String(e.cause?.code || e.message || e), chain, ms: Date.now() - t0 };
  }
}

const results = [];
const queue = [...new Set(list.map((l) => (typeof l === 'string' ? l : l.url)))];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) { const u = queue.shift(); results.push(await check(u)); }
});
await Promise.all(workers);
results.sort((a, b) => a.url.localeCompare(b.url));
writeJSON(out, { checkedAt: new Date().toISOString(), total: results.length, failing: results.filter((r) => !r.ok).length, results });
console.log(`${results.length} checked, ${results.filter((r) => !r.ok).length} failing`);
for (const r of results.filter((r) => !r.ok)) console.log(`  ✗ ${r.url} → ${r.status || r.error}`);
