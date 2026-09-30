import { chromium } from 'playwright';
const [,, url='http://localhost:4321/', w='1366', h='768'] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await (await b.newContext({ viewport: { width: +w, height: +h } })).newPage();
await p.addInitScript(() => { window.__s = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__s.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: (e.sources || []).map((s) => ({ n: s.node?.nodeName + '.' + String(s.node?.className || '').slice(0, 30), prev: [Math.round(s.previousRect.x), Math.round(s.previousRect.y), Math.round(s.previousRect.width), Math.round(s.previousRect.height)], cur: [Math.round(s.currentRect.x), Math.round(s.currentRect.y), Math.round(s.currentRect.width), Math.round(s.currentRect.height)] })) }); }).observe({ type: 'layout-shift', buffered: true }); });
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => window.__s.filter((x) => x.v > 0.001)), null, 0));
await b.close();
