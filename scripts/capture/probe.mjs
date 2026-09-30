// Non-visual behavior probe for reference sites: records what a real browser can measure
// (libraries, fonts, pinned/sticky elements, scroll-driven transforms, reduced-motion response,
// mobile navigation, page weight). No screenshots are stored — reference imagery is not ours to keep.
// Usage: node scripts/capture/probe.mjs [probe-targets.json] [outDir]
import path from 'node:path';
import { chromium } from 'playwright';
import { readJSON, writeJSON, sleep, launchArgs, settle, clearGates } from './lib.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const targets = readJSON(process.argv[2] || path.join(root, 'capture/probe-targets.json'), []);
const outDir = process.argv[3] || path.join(root, 'capture/reports/probe');
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const browser = await chromium.launch(launchArgs());

async function measure(page) {
  return page.evaluate(async () => {
    const q = (s) => document.querySelectorAll(s).length;
    const scripts = [...document.scripts].map((s) => s.src).filter(Boolean);
    const html = document.documentElement;
    const libs = {
      gsap: !!window.gsap || scripts.some((s) => /gsap|greensock/i.test(s)),
      scrollTrigger: !!(window.ScrollTrigger || window.gsap?.core?.globals?.().ScrollTrigger) || q('.pin-spacer') > 0,
      lenis: !!window.lenis || !!window.Lenis || html.classList.contains('lenis') || scripts.some((s) => /lenis/i.test(s)),
      locomotive: html.classList.contains('has-scroll-smooth') || q('[data-scroll-container]') > 0,
      three: !!window.THREE || scripts.some((s) => /three(\.module)?(\.min)?\.js/i.test(s)),
      barba: !!window.barba || q('[data-barba]') > 0,
      swiper: !!window.Swiper || q('.swiper') > 0,
      webflow: !!html.getAttribute('data-wf-site'),
      framer: !!document.querySelector('meta[name=generator][content*=Framer]') || scripts.some((s) => /framer/i.test(s)),
      nextjs: !!window.__NEXT_DATA__ || scripts.some((s) => /\/_next\//.test(s)),
      nuxt: !!window.__NUXT__,
      astro: q('astro-island') > 0 || scripts.some((s) => /\/_astro\//.test(s)),
      wordpress: scripts.some((s) => /wp-content|wp-includes/.test(s)),
      elementor: q('.elementor') > 0,
      shopify: !!window.Shopify,
    };
    const all = [...document.querySelectorAll('body *')];
    let sticky = 0, fixed = 0;
    for (const el of all.slice(0, 6000)) { const p = getComputedStyle(el).position; if (p === 'sticky') sticky++; else if (p === 'fixed') fixed++; }
    const fonts = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))];
    const cs = (sel) => { const el = document.querySelector(sel); return el ? getComputedStyle(el) : null; };
    const h1 = cs('h1');
    const res = performance.getEntriesByType('resource');
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    const bytes = res.reduce((a, r) => a + (r.transferSize || 0), nav?.transferSize || 0);
    let viewTransitions = false;
    try { for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) { if (/view-transition/.test(r.cssText)) { viewTransitions = true; break; } } } catch {} } } catch {}
    return {
      title: document.title,
      description: document.querySelector('meta[name=description]')?.content || null,
      headings: [...document.querySelectorAll('h1,h2')].slice(0, 24).map((h) => h.tagName + ': ' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 90)),
      libs,
      counts: { canvas: q('canvas'), video: q('video'), autoplayVideo: q('video[autoplay]'), iframes: q('iframe'), svg: q('svg'), pinSpacers: q('.pin-spacer'), sticky, fixed, links: q('a[href]'), images: document.images.length },
      cursorHidden: getComputedStyle(document.body).cursor === 'none' || q('[class*=cursor]') > 0,
      viewTransitions,
      fonts,
      type: { body: getComputedStyle(document.body).fontFamily, h1Family: h1?.fontFamily || null, h1Size: h1?.fontSize || null, h1Weight: h1?.fontWeight || null },
      colors: { background: getComputedStyle(document.body).backgroundColor, text: getComputedStyle(document.body).color },
      scroll: { height: document.documentElement.scrollHeight, viewports: +(document.documentElement.scrollHeight / innerHeight).toFixed(1) },
      perf: { fcpMs: fcp ? Math.round(fcp.startTime) : null, domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null, requests: res.length + 1, transferKB: Math.round(bytes / 1024) },
      animationsNow: document.getAnimations ? document.getAnimations().length : null,
    };
  });
}

// Scroll through the page and count elements whose transform/opacity/clip-path changes between positions:
// evidence of scroll-driven motion (as opposed to reveal-once). Also detect pinned elements.
async function scrollMotion(page) {
  return page.evaluate(async () => {
    const els = [...document.querySelectorAll('body *')].slice(0, 4000);
    const snap = () => els.map((el) => { const s = getComputedStyle(el); return s.transform + '|' + s.opacity + '|' + s.clipPath; });
    const tops = () => els.map((el) => Math.round(el.getBoundingClientRect().top));
    const max = document.documentElement.scrollHeight - innerHeight;
    const positions = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((p) => Math.round(max * p));
    let changed = new Set();
    let pinned = new Set();
    for (const y of positions) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 450));
      const a = snap(), ta = tops();
      window.scrollTo(0, y + Math.round(innerHeight * 0.25));
      await new Promise((r) => setTimeout(r, 450));
      const b = snap(), tb = tops();
      a.forEach((v, i) => { if (v !== b[i]) changed.add(i); });
      ta.forEach((v, i) => { const r = els[i].getBoundingClientRect(); if (v === tb[i] && r.height > innerHeight * 0.4 && r.top < innerHeight && r.bottom > 0 && getComputedStyle(els[i]).position !== 'fixed') pinned.add(i); });
    }
    window.scrollTo(0, 0);
    const describe = (i) => { const el = els[i]; return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''); };
    return { scrollDrivenElements: changed.size, samples: [...changed].slice(0, 12).map(describe), pinnedCandidates: [...pinned].slice(0, 8).map(describe) };
  });
}

for (const t of targets) {
  if (only.length && !only.includes(t.slug)) continue;
  const report = { slug: t.slug, url: t.url, probedAt: new Date().toISOString() };
  console.log(`▸ ${t.slug}`);
  for (const mode of ['desktop', 'desktop-reduced', 'mobile']) {
    const mobile = mode === 'mobile';
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
      reducedMotion: mode === 'desktop-reduced' ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push(String(e.message).slice(0, 160)));
    try {
      const res = await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await settle(page, 2500);
      const gates = await clearGates(page);
      const m = await measure(page);
      const motion = mode === 'mobile' ? null : await scrollMotion(page);
      let mobileNav = null;
      if (mobile) {
        mobileNav = await page.evaluate(() => {
          const btn = [...document.querySelectorAll('button, [role=button], a')].find((b) => /menu|nav|burger|toggle/i.test((b.getAttribute('aria-label') || '') + ' ' + b.className + ' ' + b.textContent) && b.getBoundingClientRect().top < 140);
          return btn ? { label: (btn.getAttribute('aria-label') || btn.textContent || '').trim().slice(0, 40), hasAriaExpanded: btn.hasAttribute('aria-expanded') } : null;
        });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        mobileNav = { ...mobileNav, horizontalOverflowPx: overflow };
      }
      report[mode] = { status: res?.status(), finalUrl: page.url(), gates, ...m, motion, mobileNav, pageErrors: consoleErrors.slice(0, 5) };
      console.log(`  ✓ ${mode}`);
    } catch (e) {
      report[mode] = { error: String(e.message || e).split('\n')[0] };
      console.log(`  ✗ ${mode}: ${report[mode].error}`);
    } finally {
      await context.close();
    }
  }
  writeJSON(path.join(outDir, `${t.slug}.json`), report);
}
await browser.close();
