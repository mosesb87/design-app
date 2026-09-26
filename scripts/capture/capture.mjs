// Capture real stills, layout outlines and short scroll recordings of Mousa Batarseh's project sites.
// Usage: node scripts/capture/capture.mjs [targets.json] [outDir]
// Env: GROUP=sites|systems|reviews|archive  ONLY=slug,slug  SKIP_EXISTING=1  CHROME_PATH=/path/to/chrome  FFMPEG=ffmpeg
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium, devices } from 'playwright';
import sharp from 'sharp';
import { VIEWS, readJSON, writeJSON, sleep, launchArgs, settle, primeLazy, clearGates, outline } from './lib.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const targetsFile = process.argv[2] || path.join(root, 'capture/targets.json');
const outRoot = process.argv[3] || path.join(root, 'capture/raw');
const GROUP = process.env.GROUP || '';
const logFile = path.join(root, `capture/reports/capture-log${GROUP ? '-' + GROUP : ''}.json`);
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const run = readJSON(path.join(root, 'capture/run.json'), {});
const only = (process.env.ONLY || (run.only || []).join(',')).split(',').map((s) => s.trim()).filter(Boolean);
const skipExisting = process.env.SKIP_EXISTING === '1' || run.skipExisting === true;

const targets = readJSON(targetsFile, []).filter((t) => (!only.length || only.includes(t.slug)) && (!GROUP || t.group === GROUP));
const log = readJSON(logFile, {});
const browser = await chromium.launch(launchArgs());
const stamp = new Date().toISOString();

async function newPage(viewName) {
  const v = VIEWS[viewName];
  const base = v.mobile ? devices['iPhone 13'] : {};
  const context = await browser.newContext({
    ...base,
    viewport: { width: v.width, height: v.height },
    screen: { width: v.width, height: v.height },
    deviceScaleFactor: v.dsf,
    isMobile: v.mobile,
    hasTouch: v.mobile,
    locale: 'en-US',
    timezoneId: 'America/Detroit',
    colorScheme: 'light',
    reducedMotion: 'no-preference',
    ignoreHTTPSErrors: false,
  });
  const page = await context.newPage();
  return { context, page };
}

async function open(page, url) {
  let status = null;
  let finalUrl = url;
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    status = res ? res.status() : null;
    finalUrl = page.url();
  } catch (e) {
    return { ok: false, error: String(e.message || e).split('\n')[0] };
  }
  await settle(page, 1500);
  const gates = await clearGates(page);
  await settle(page, 900);
  return { ok: status !== null && status < 400, status, finalUrl, gates, title: await page.title().catch(() => '') };
}

async function saveStill(buf, file, cap, width) {
  let img = sharp(buf, { limitInputPixels: false });
  const meta = await img.metadata();
  if (cap && meta.height > cap * (meta.width / width)) {
    img = img.extract({ left: 0, top: 0, width: meta.width, height: Math.round(cap * (meta.width / width)) });
  }
  await img.webp({ quality: 86, effort: 5, smartSubsample: true }).toFile(file);
  const m = await sharp(file).metadata();
  return { w: m.width, h: m.height, bytes: fs.statSync(file).size };
}

async function record(page, spec, dir) {
  const client = await page.context().newCDPSession(page);
  const frames = [];
  client.on('Page.screencastFrame', (f) => {
    frames.push({ data: f.data, t: f.metadata.timestamp });
    client.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await client.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
  const steps = spec.steps || [
    { do: 'wait', ms: 1400 },
    { do: 'scroll', by: spec.distance || 2.6, dur: spec.dur || 6500 },
    { do: 'wait', ms: 900 },
  ];
  for (const s of steps) {
    if (s.do === 'wait') await sleep(s.ms);
    else if (s.do === 'scroll') {
      await page.evaluate(async ({ by, to, sel, dur }) => {
        const start = scrollY;
        let target = to != null ? to : start + by * innerHeight;
        if (sel) { const el = document.querySelector(sel); if (el) target = el.getBoundingClientRect().top + scrollY - innerHeight * 0.15; }
        target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - innerHeight));
        const t0 = performance.now();
        const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
        await new Promise((done) => {
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            window.scrollTo(0, start + (target - start) * ease(p));
            p < 1 ? requestAnimationFrame(tick) : done();
          };
          requestAnimationFrame(tick);
        });
      }, { by: s.by ?? 1, to: s.to ?? null, sel: s.sel ?? null, dur: s.dur ?? 3000 });
    } else if (s.do === 'hover' && s.sel) {
      await page.hover(s.sel, { timeout: 4000 }).catch(() => {});
      await sleep(s.ms ?? 900);
    } else if (s.do === 'click' && s.sel) {
      await page.click(s.sel, { timeout: 4000 }).catch(() => {});
      await sleep(s.ms ?? 1200);
    } else if (s.do === 'mouse') {
      await page.mouse.move(s.x, s.y, { steps: s.steps || 25 });
      await sleep(s.ms ?? 300);
    }
  }
  await client.send('Page.stopScreencast');
  await client.detach().catch(() => {});
  if (frames.length < 4) return { ok: false, error: `only ${frames.length} frames` };

  const tmp = fs.mkdtempSync(path.join(dir, '.frames-'));
  const lines = [];
  frames.forEach((f, i) => {
    const name = `f${String(i).padStart(5, '0')}.jpg`;
    fs.writeFileSync(path.join(tmp, name), Buffer.from(f.data, 'base64'));
    const next = frames[i + 1];
    const dur = next ? Math.max(0.001, next.t - f.t) : 0.5;
    lines.push(`file '${name}'`, `duration ${dur.toFixed(4)}`);
  });
  lines.push(`file 'f${String(frames.length - 1).padStart(5, '0')}.jpg'`);
  fs.writeFileSync(path.join(tmp, 'list.txt'), lines.join('\n'));
  const mp4 = path.join(dir, 'scroll.mp4');
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', 'list.txt', '-vf', 'scale=1280:-2:flags=lanczos,fps=30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4], { cwd: tmp });
  // Poster: the settled hero, i.e. the last frame before scrolling began.
  const holdEnd = frames[0].t + ((steps[0]?.do === 'wait' ? steps[0].ms : 0) / 1000);
  const posterFrame = [...frames].reverse().find((f) => f.t <= holdEnd) || frames[0];
  await sharp(Buffer.from(posterFrame.data, 'base64')).resize(1280).webp({ quality: 86 }).toFile(path.join(dir, 'scroll-poster.webp'));
  fs.rmSync(tmp, { recursive: true, force: true });
  const secs = frames[frames.length - 1].t - frames[0].t;
  return { ok: true, frames: frames.length, seconds: +secs.toFixed(2), bytes: fs.statSync(mp4).size };
}

for (const t of targets) {
  const dir = path.join(outRoot, t.slug);
  fs.mkdirSync(dir, { recursive: true });
  const entry = { slug: t.slug, project: t.project, url: t.url, capturedAt: stamp, views: {}, notes: [] };
  console.log(`\n▸ ${t.slug} — ${t.url}`);
  for (const view of t.views || []) {
    const v = VIEWS[view];
    const file = path.join(dir, `${view}.webp`);
    if (skipExisting && fs.existsSync(file)) { entry.views[view] = log[t.slug]?.views?.[view] || { skipped: true }; continue; }
    const { context, page } = await newPage(view);
    try {
      const o = await open(page, t.url);
      if (!o.ok) { entry.views[view] = { ok: false, ...o }; console.log(`  ✗ ${view}: ${o.error || o.status}`); continue; }
      if (t.css) await page.addStyleTag({ content: t.css }).catch(() => {});
      if (v.full) await primeLazy(page, (v.cap || 12000) + 2000);
      if (t.scrollTo && !v.full) { await page.evaluate((y) => window.scrollTo(0, y), t.scrollTo); await settle(page, 900); }
      const buf = await page.screenshot({ fullPage: !!v.full, type: 'png', animations: 'allow', caret: 'hide' });
      const saved = await saveStill(buf, file, v.cap, v.width);
      entry.views[view] = { ok: true, status: o.status, finalUrl: o.finalUrl, title: o.title, gates: o.gates, ...saved };
      entry.title = entry.title || o.title;
      if (view === 'desktop-hero' && t.outline !== false) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await sleep(300);
        writeJSON(path.join(dir, 'outline-desktop.json'), await outline(page));
      }
      console.log(`  ✓ ${view} ${saved.w}×${saved.h} ${(saved.bytes / 1024).toFixed(0)}KB${o.gates.actions.length ? ' · ' + o.gates.actions.join(', ') : ''}${o.gates.blocking.length ? ' · still blocked by ' + o.gates.blocking.join(' ') : ''}`);
    } catch (e) {
      entry.views[view] = { ok: false, error: String(e.message || e).split('\n')[0] };
      console.log(`  ✗ ${view}: ${entry.views[view].error}`);
    } finally {
      await context.close();
    }
  }
  if (t.record && !(skipExisting && fs.existsSync(path.join(dir, 'scroll.mp4')))) {
    const { context, page } = await newPage('record');
    try {
      const o = await open(page, t.url);
      if (o.ok) {
        if (t.css) await page.addStyleTag({ content: t.css }).catch(() => {});
        entry.recording = await record(page, typeof t.record === 'object' ? t.record : {}, dir);
        console.log(`  ${entry.recording.ok ? '✓' : '✗'} recording ${JSON.stringify(entry.recording)}`);
      } else entry.recording = { ok: false, ...o };
    } catch (e) {
      entry.recording = { ok: false, error: String(e.message || e).split('\n')[0] };
    } finally {
      await context.close();
    }
  }
  log[t.slug] = entry;
  writeJSON(logFile, log);
}

await browser.close();
console.log('\nDone.');
