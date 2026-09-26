// Interaction test: every navigation control, the mobile menu, the archive filters, every case-study link,
// the contact actions, the recording controls, the skip link and the 404. Chromium, desktop + touch phone.
// Usage: node scripts/interactions.mjs [--base=http://localhost:4321]   → prints PASS/FAIL, exits 1 on any FAIL
import { chromium, firefox, webkit } from 'playwright';

const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || `--${k}=${d}`).split('=').slice(1).join('=');
const BASE = arg('base', 'http://localhost:4321');
const ENGINE = arg('browser', 'chromium'); // chromium (local build) | firefox | webkit (installed by Playwright on Actions)
const browser = ENGINE === 'chromium'
  ? await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
  : await { firefox, webkit }[ENGINE].launch();
console.log(`${ENGINE} ${browser.version()} — ${BASE}`);
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`); };
const path = (p) => new URL(p.url()).pathname + new URL(p.url()).hash;
// Smooth scrolling (Lenis, fine pointers) keeps moving the page after a jump; click only once it has stopped.
const settle = async (p) => { let last = -1; for (let i = 0; i < 40; i++) { const y = await p.evaluate(() => scrollY); if (y === last) return; last = y; await p.waitForTimeout(120); } };

async function ctx(opts) {
  // Firefox has no mobile emulation; it still gets the phone viewport and touch.
  const c = await browser.newContext(ENGINE === 'firefox' ? { ...opts, isMobile: undefined } : opts);
  if (ENGINE === 'chromium') await c.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE });
  return c;
}

// ── Desktop
{
  const c = await ctx({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });

  // Skip link: first Tab stop, lands focus on <main>.
  await p.keyboard.press('Tab');
  const skip = await p.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); return { text: a.textContent.trim(), visible: r.top >= 0 && r.bottom <= innerHeight && r.width > 0 }; });
  check('Skip link is the first Tab stop and becomes visible', skip.text === 'Skip to content' && skip.visible, JSON.stringify(skip));
  await p.keyboard.press('Enter');
  check('Skip link moves focus to <main>', (await p.evaluate(() => document.activeElement.id)) === 'main');

  // Nav links.
  const navLinks = await p.$$eval('.nav a[href]', (as) => as.map((a) => ({ text: a.textContent.trim().replace(/\s+/g, ' '), href: a.getAttribute('href'), rel: a.getAttribute('rel') })));
  check('Nav has links', navLinks.length >= 5, navLinks.map((l) => `${l.text}→${l.href}`).join(', '));
  for (const l of navLinks) {
    if (/^https?:/.test(l.href)) { check(`Nav "${l.text}" is an external link with rel=noopener`, /noopener/.test(l.rel || ''), l.href); continue; }
    if (l.href.startsWith('#')) {
      await p.goto(BASE + '/', { waitUntil: 'networkidle' });
      await p.click(`.nav a[href="${l.href}"]`);
      // Smooth scroll over a long page: poll until the target is on screen (a slow runner may need more than a
      // second), and report how long it took, so a scroll that lands short still fails.
      const t0 = Date.now();
      let inView = false;
      while (!inView && Date.now() - t0 < 5000) {
        await p.waitForTimeout(150);
        inView = await p.evaluate((id) => { const t = document.querySelector(id); const r = t.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }, l.href);
      }
      const where = await p.evaluate((id) => ({ y: Math.round(scrollY), target: Math.round(document.querySelector(id).getBoundingClientRect().top + scrollY) }), l.href);
      check(`Nav "${l.text}" scrolls to ${l.href}`, inView, `${inView ? `on screen after ${Date.now() - t0} ms` : 'not on screen after 5 s'} (scrollY ${where.y}, target at ${where.target})`);
      continue;
    }
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await Promise.all([p.waitForURL((u) => new URL(u).pathname === l.href, { timeout: 8000 }).catch(() => {}), p.click(`.nav a[href="${l.href}"]`)]);
    check(`Nav "${l.text}" opens ${l.href}`, new URL(p.url()).pathname === l.href, path(p));
  }

  // Home: featured cards and tool rack links.
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const feats = await p.$$eval('.site__cta', (as) => as.map((a) => a.getAttribute('href')));
  check('Six featured case-study links on the home page', feats.length === 6, feats.join(' '));
  if (feats[0]) {
    const card = p.locator('.site').first();
    await card.scrollIntoViewIfNeeded();
    await settle(p);
    const box = await card.locator('.site__desk').boundingBox();
    await Promise.all([p.waitForURL((u) => new URL(u).pathname === feats[0], { timeout: 8000 }).catch(() => {}), p.mouse.click(box.x + box.width / 2, box.y + box.height / 3)]);
    check('Clicking a featured card image opens its case study (stretched link)', new URL(p.url()).pathname === feats[0], path(p));
  }

  // Filters (archive, blog, reviews): the visible rows match each chip's count; aria-pressed and the status follow.
  for (const where of ['/blog/', '/reviews/', '/work/']) {
    await p.goto(BASE + where, { waitUntil: 'networkidle' });
    const chips = await p.$$eval('[data-filter] button', (bs) => bs.map((b) => ({ v: b.dataset.filterValue, n: Number(b.querySelector('span:last-child')?.textContent || 0) })));
    for (const ch of chips) {
      await p.click(`[data-filter] button[data-filter-value="${ch.v}"]`);
      await p.waitForTimeout(700);
      const st = await p.evaluate((v) => ({ visible: [...document.querySelectorAll('[data-row]')].filter((r) => r.offsetParent !== null && getComputedStyle(r).display !== 'none').length, pressed: document.querySelector(`[data-filter] button[data-filter-value="${v}"]`).getAttribute('aria-pressed'), status: document.querySelector('[data-filter-status]')?.textContent || '' }), ch.v);
      check(`${where} filter "${ch.v}" shows ${ch.n} rows`, st.visible === ch.n && st.pressed === 'true' && (ch.v === 'all' || new RegExp(`^${ch.n} `).test(st.status)), `visible ${st.visible}, aria-pressed ${st.pressed}, status "${st.status}"`);
    }
    await p.click('[data-filter] button[data-filter-value="all"]');
    await p.waitForTimeout(500);
  }

  // Every archive and plate link: internal ones must load, external ones must open in a way that keeps the site.
  const links = await p.$$eval('main a[href]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  const internal = links.filter((h) => h.startsWith('/'));
  let bad = [];
  for (const h of internal) { const r = await p.request.get(BASE + h); if (r.status() !== 200) bad.push(`${h} ${r.status()}`); }
  check(`All ${internal.length} internal links on /work/ return 200`, bad.length === 0, bad.join(', '));
  const extNoRel = await p.$$eval('main a[href^="http"]', (as) => as.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href));
  check('External links on /work/ carry rel=noopener', extNoRel.length === 0, extNoRel.slice(0, 5).join(' '));

  // Loupe: hovering a row with a preview shows it.
  const row = p.locator('[data-row][data-preview]').first();
  await row.scrollIntoViewIfNeeded();
  await row.hover();
  await p.waitForTimeout(600);
  const loupe = await p.evaluate(() => { const l = document.querySelector('[data-loupe]'); if (!l) return null; const cs = getComputedStyle(l); return { opacity: cs.opacity, visibility: cs.visibility, clip: cs.clipPath }; });
  check('Archive loupe opens on row hover', !!loupe && loupe.visibility !== 'hidden' && Number(loupe.opacity) > 0.5, JSON.stringify(loupe));

  // Case studies: each loads, has one h1, and its "next" link leads to another case.
  const cases = internal.filter((h) => /^\/work\/[^/]+\/$/.test(h));
  for (const h of cases) {
    await p.goto(BASE + h, { waitUntil: 'load' }); // 'load', so leaving the page never cuts off an image mid-download
    const info = await p.evaluate(() => ({ h1: document.querySelectorAll('h1').length, next: document.querySelector('.next__link')?.getAttribute('href'), live: [...document.querySelectorAll('a[href^="http"]')].length }));
    check(`Case ${h}: one h1, next → ${info.next}`, info.h1 === 1 && !!info.next && info.next !== h);
  }

  // Blog and reviews: every card opens a page on this site with one h1 and its article; sheet anchors resolve.
  for (const [where, sel, body] of [['/blog/', '.card__title a', '.post__body'], ['/reviews/', '.rc__title a', '.sheet']]) {
    await p.goto(BASE + where, { waitUntil: 'networkidle' });
    const hrefs = await p.$$eval(sel, (as) => as.map((a) => a.getAttribute('href')));
    const off = hrefs.filter((h) => !h.startsWith(where));
    check(`${where}: every card links inside this site (${hrefs.length})`, hrefs.length > 0 && off.length === 0, off.slice(0, 3).join(' '));
    const probs = [];
    // Each page in its own tab: 38 loads in a few seconds in one tab would trip Firefox's per-tab History rate
    // limit (ScrollTrigger toggles history.scrollRestoration while it measures) — not something a visitor does.
    for (const h of hrefs) {
      const t = await c.newPage();
      t.on('pageerror', (e) => errors.push(e.message));
      t.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      const r = await t.goto(BASE + h, { waitUntil: 'domcontentloaded' });
      const info = await t.evaluate((b) => ({ h1: document.querySelectorAll('h1').length, body: !!document.querySelector(b), anchors: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((x) => x.length > 1 && !document.getElementById(x.slice(1))) }), body);
      if (r.status() !== 200 || info.h1 !== 1 || !info.body || info.anchors.length) probs.push(`${h} ${r.status()} h1=${info.h1} body=${info.body} anchors=${info.anchors.join(',')}`);
      await t.close();
    }
    check(`${where}: all ${hrefs.length} pages load with one h1, their text, and working in-page anchors`, probs.length === 0, probs.slice(0, 3).join(' | '));
  }

  // Recording control: play and pause.
  await p.goto(BASE + '/work/asas-studio/', { waitUntil: 'networkidle' });
  const tog = p.locator('[data-video-toggle]').first();
  await tog.scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);
  await settle(p);
  const h264 = await p.evaluate(() => document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"'));
  const vstate = () => p.evaluate(() => { const v = document.querySelector('[data-video] video'); return v ? `paused=${v.paused} t=${v.currentTime.toFixed(1)} ready=${v.readyState}` : 'none'; });
  const before = await tog.getAttribute('aria-pressed');
  const vBefore = await vstate();
  await tog.click();
  await p.waitForTimeout(1200);
  const after = await tog.getAttribute('aria-pressed');
  const vAfter = await vstate();
  const src = await p.evaluate(() => document.querySelector('[data-video] video')?.currentSrc || document.querySelector('[data-video] video')?.src || '');
  if (h264) check('Recording toggle flips play/pause state', before !== after, `${before} → ${after} (video ${vBefore} → ${vAfter})`);
  else check('Recording toggle loads the recording (this Chromium build has no H.264, so playback itself is checked in WebKit on Actions)', /\.mp4$/.test(src) && after === 'false', `src ${src.split('/').slice(-2).join('/')}, aria-pressed stays ${after}`);

  // Contact: mailto, tel, and copy to clipboard.
  await p.goto(BASE + '/about/', { waitUntil: 'networkidle' });
  const mail = await p.$$eval('a[href^="mailto:"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  const tel = await p.$$eval('a[href^="tel:"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  check('mailto link is the real address', mail.length === 1 && mail[0] === 'mailto:hireme@mousabatarseh.com', mail.join(' '));
  check('tel link present', tel.length >= 1, tel.join(' '));
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.locator('[data-copy]').scrollIntoViewIfNeeded();
  await p.click('[data-copy]');
  await p.waitForTimeout(600);
  const status = await p.textContent('[data-copy-status]');
  if (ENGINE === 'chromium') {
    const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => ''));
    check('Copy email puts the address on the clipboard and says so', clip === 'hireme@mousabatarseh.com' && /Copied/.test(status || ''), `"${clip}" / "${status?.trim()}"`);
  } else {
    // Clipboard reads need permissions these engines don't grant headless; the button must still answer honestly.
    check('Copy email answers (copied, or tells you to select the address)', /Copied|Select the address/.test(status || ''), `"${status?.trim()}"`);
  }

  check('No page errors or console errors during the desktop run', errors.length === 0, errors.slice(0, 3).join(' | '));

  // 404 (last: the browser logs the 404 response itself as a console error).
  const r404 = await p.goto(BASE + '/no-such-page/', { waitUntil: 'domcontentloaded' });
  const t404 = await p.title();
  check('Unknown URL serves the designed 404 with status 404', r404.status() === 404 && /Page not found/.test(t404), `${r404.status()} "${t404}"`);
  await c.close();
}

// ── Touch phone: the menu.
{
  const c = await ctx({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const t = p.locator('[data-menu-toggle]');
  check('Menu toggle is visible on a phone', await t.isVisible());
  await t.tap();
  await p.waitForTimeout(700);
  const open = await p.evaluate(() => ({ expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'), hidden: document.querySelector('[data-menu]').hidden, focusIn: document.querySelector('[data-menu]').contains(document.activeElement) }));
  check('Menu opens (aria-expanded, visible, focus moves inside)', open.expanded === 'true' && !open.hidden && open.focusIn, JSON.stringify(open));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(700);
  const closed = await p.evaluate(() => ({ expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'), focusOnToggle: document.activeElement === document.querySelector('[data-menu-toggle]') }));
  check('Escape closes the menu and returns focus to the toggle', closed.expanded === 'false' && closed.focusOnToggle, JSON.stringify(closed));
  await t.tap();
  await p.waitForTimeout(700);
  await Promise.all([p.waitForURL((u) => new URL(u).pathname === '/work/', { timeout: 8000 }).catch(() => {}), p.locator('[data-menu] a[href="/work/"]').tap()]);
  check('Menu link "Work" navigates on tap', new URL(p.url()).pathname === '/work/', path(p));
  const menuClosed = await p.evaluate(() => document.querySelector('[data-menu]').hidden);
  check('Menu is closed on the new page', menuClosed);
  await c.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
