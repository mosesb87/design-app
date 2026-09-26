// Dev helper: axe-core (WCAG 2.2 AA) on one page at phone size. Usage: node scripts/axe-page.mjs /reviews/diamedical/ [base]
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const c = await b.newContext({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true });
const p = await c.newPage();
await p.goto((process.argv[3] || 'http://127.0.0.1:4321') + process.argv[2], { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
for (const v of r.violations) console.log(v.id, v.help, v.nodes.map((n) => n.target.join(' ') + ' :: ' + n.html.slice(0, 160) + ' :: ' + (n.failureSummary || '').slice(0, 200)).join('\n  '));
console.log('violations', r.violations.length);
await b.close();
