// Pictures for the index cards whose sites refuse automated screenshots (mawtinidabke.com, stmaryberkley.org,
// /Larkspur/, interviewdemo) and the two private DiaMedical builds: Mousa's own thumbnails, as published on his
// builds index (mousabatarseh.com/reviews/builds/). For each build the largest published size wins. Saved as
// capture/raw/<media>/desktop-hero.webp for scripts/process-media.mjs; the log is capture/reports/thumbs.json.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const BASE = 'https://mousabatarseh.com/reviews/img/builds/';
const builds = [
  { media: 'mawtini-dabke', name: 'mawtini' },
  { media: 'st-mary-berkley', name: 'st-mary' },
  { media: 'larkspur-mobility', name: 'larkspur' },
  { media: 'american-hot-wheel', name: 'american-hot-wheel' },
  { media: 'diamedical-pathfinder', name: 'diamedical-pathfinder' },
  { media: 'diamedical-decision-brief', name: 'diamedical-decision-brief' },
  { media: 'jaus-project', name: 'jaus-project' },
  { media: 'bulletproof-review', name: 'bulletproof-review' },
];
const sizes = ['', '-2000', '-1600', '-1440', '-1200', '-1000', '-800', '-500'];
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
const log = {};
for (const b of builds) {
  let best = null;
  for (const s of sizes) {
    const url = `${BASE}${b.name}${s}.webp`;
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA, referer: 'https://mousabatarseh.com/reviews/builds/' } });
      if (!r.ok || !(r.headers.get('content-type') || '').includes('image')) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (!best || buf.length > best.buf.length) best = { url, buf };
    } catch (e) { /* try the next size */ }
  }
  if (!best) { log[b.media] = { ok: false }; console.log('none', b.media); continue; }
  const dir = path.join(root, 'capture/raw', b.media);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'desktop-hero.webp'), best.buf);
  log[b.media] = { ok: true, source: best.url, bytes: best.buf.length, fetched: new Date().toISOString() };
  console.log('saved', b.media, best.url, best.buf.length);
}
fs.mkdirSync(path.join(root, 'capture/reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'capture/reports/thumbs.json'), JSON.stringify(log, null, 2) + '\n');
