// Shared helpers for capture, probe and link-check runs.
import fs from 'node:fs';
import path from 'node:path';

export const UA_NOTE = 'Portfolio capture for mousabatarseh.com (owner-run)';

export const VIEWS = {
  'desktop-hero': { width: 1440, height: 900, dsf: 2, full: false, mobile: false },
  'desktop-full': { width: 1440, height: 900, dsf: 1, full: true, cap: 9000, mobile: false },
  'mobile-hero': { width: 390, height: 844, dsf: 3, full: false, mobile: true },
  'mobile-full': { width: 390, height: 844, dsf: 2, full: true, cap: 8000, mobile: true }, // 16,000px < WebP's 16,383 limit
  'tablet-hero': { width: 834, height: 1112, dsf: 2, full: false, mobile: true },
  record: { width: 1440, height: 900, dsf: 1, full: false, mobile: false },
};

export function readJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

export function writeJSON(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function launchArgs() {
  const executablePath = process.env.CHROME_PATH || undefined;
  return { executablePath, args: ['--disable-dev-shm-usage', '--hide-scrollbars', '--force-color-profile=srgb'] };
}

// Wait for fonts, decoded images and a quiet network, then give entrance animations time to finish.
export async function settle(page, extra = 1800) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.evaluate(async () => {
    try { await document.fonts.ready; } catch {}
    const imgs = [...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight * 1.5);
    await Promise.all(imgs.map((i) => (i.complete ? (i.decode ? i.decode().catch(() => {}) : null) : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 6000); }))));
  }).catch(() => {});
  await sleep(extra);
}

// Scroll the whole page so lazy media loads, then return to the top.
export async function primeLazy(page, cap = 20000) {
  await page.evaluate(async (cap) => {
    const step = Math.max(400, Math.round(innerHeight * 0.7));
    const max = Math.min(document.documentElement.scrollHeight, cap);
    for (let y = 0; y < max; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)); }
    window.scrollTo(0, 0);
  }, cap).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await sleep(1200);
}

// Cookie banners and age gates: click an affirmative control that sits inside a dialog or fixed overlay.
// Everything clicked is logged so the asset inventory can say exactly what was dismissed.
export async function clearGates(page) {
  const actions = [];
  for (let round = 0; round < 3; round++) {
    const hit = await page.evaluate(() => {
      const res = [
        /\bi\s*(am|'m)\s*(over|at least)?\s*(18|21)\b/i, /\b(18|21)\s*\+/i, /\bover\s*(18|21)\b/i, /^yes\b/i, /^enter(\s+site)?$/i,
        /^accept(\s+all)?(\s+cookies)?$/i, /^allow\s+all/i, /^(i\s+)?agree$/i, /^got\s+it$/i, /^ok(ay)?$/i, /^continue$/i, /^close$/i, /^dismiss$/i,
      ];
      const inOverlay = (el) => {
        for (let n = el; n && n !== document.body; n = n.parentElement) {
          const cs = getComputedStyle(n);
          if (n.getAttribute('role') === 'dialog' || n.getAttribute('aria-modal') === 'true' || cs.position === 'fixed' || cs.position === 'sticky') return true;
          if (/cookie|consent|gdpr|age|verify|popup|modal|overlay|banner|notice/i.test(n.id + ' ' + n.className)) return true;
        }
        return false;
      };
      const cands = [...document.querySelectorAll('button, a, [role=button], input[type=submit], input[type=button]')];
      for (const el of cands) {
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8 || r.bottom < 0 || r.top > innerHeight) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.1) continue;
        const text = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
        if (!text || text.length > 40) continue;
        if (!res.some((re) => re.test(text))) continue;
        if (!inOverlay(el)) continue;
        el.setAttribute('data-capture-gate', '1');
        return text;
      }
      return null;
    }).catch(() => null);
    if (!hit) break;
    await page.click('[data-capture-gate="1"]', { timeout: 3000 }).catch(() => {});
    await page.evaluate(() => document.querySelector('[data-capture-gate]')?.removeAttribute('data-capture-gate')).catch(() => {});
    actions.push(`clicked "${hit}"`);
    await sleep(900);
  }
  // Report any large fixed overlay that is still covering the viewport.
  const blocking = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' || cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) < 0.2) continue;
      const r = el.getBoundingClientRect();
      if (r.width * r.height > innerWidth * innerHeight * 0.5) out.push((el.id ? '#' + el.id : el.tagName.toLowerCase()) + '.' + String(el.className).split(' ').slice(0, 2).join('.'));
    }
    return out.slice(0, 5);
  }).catch(() => []);
  return { actions, blocking };
}

// Layout outline of what is visible in the first viewport: the source of each case study's "Structure" plate.
export async function outline(page) {
  return page.evaluate(() => {
    const vw = innerWidth, vh = innerHeight;
    const kindOf = (el) => {
      const t = el.tagName.toLowerCase();
      if (['img', 'picture', 'video', 'canvas', 'svg'].includes(t)) return 'image';
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none' && bg.includes('url(') && el.getBoundingClientRect().width > 120) return 'image';
      if (/^h[1-3]$/.test(t)) return 'heading';
      if (/^h[4-6]$/.test(t)) return 'subheading';
      if (t === 'p' || t === 'li' || t === 'blockquote') return 'text';
      if (t === 'button' || (t === 'a' && /btn|button|cta/i.test(el.className))) return 'button';
      if (t === 'input' || t === 'select' || t === 'textarea') return 'input';
      if (t === 'nav') return 'nav';
      return null;
    };
    const items = [];
    for (const el of document.querySelectorAll('body *')) {
      const k = kindOf(el);
      if (!k) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 12 || r.height < 6 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || Number(cs.opacity) < 0.05) continue;
      items.push({ k, x: +(r.left / vw).toFixed(4), y: +(r.top / vh).toFixed(4), w: +(r.width / vw).toFixed(4), h: +(r.height / vh).toFixed(4) });
      if (items.length > 160) break;
    }
    const h1 = document.querySelector('h1');
    const pick = (el) => (el ? getComputedStyle(el) : null);
    const body = getComputedStyle(document.body);
    return {
      viewport: { w: vw, h: vh },
      background: body.backgroundColor,
      text: body.color,
      fonts: { body: body.fontFamily, h1: pick(h1)?.fontFamily || null },
      loadedFonts: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')))].slice(0, 12),
      items,
    };
  });
}

// Interactive controls and section headings with document coordinates — used to script interaction recordings.
export async function controls(page) {
  return page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 4 && r.height > 4 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const sel = (el) => {
      if (el.id) return '#' + CSS.escape(el.id);
      const parts = [];
      for (let n = el; n && n.nodeType === 1 && parts.length < 4; n = n.parentElement) {
        let p = n.tagName.toLowerCase();
        if (n.id) { parts.unshift('#' + CSS.escape(n.id)); break; }
        const cls = [...n.classList].filter((c) => !/^(is-|has-|active|open|js-)/.test(c)).slice(0, 2);
        if (cls.length) p += '.' + cls.map((c) => CSS.escape(c)).join('.');
        const sib = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
        if (sib.length > 1) p += `:nth-of-type(${sib.indexOf(n) + 1})`;
        parts.unshift(p);
      }
      return parts.join(' > ');
    };
    const items = [...document.querySelectorAll('button, a[href], [role=button], [role=tab], [role=switch], input, select, summary, label[for]')]
      .filter(vis).slice(0, 500).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(), text: (el.innerText || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 70),
          aria: el.getAttribute('aria-label'), role: el.getAttribute('role'), type: el.getAttribute('type'),
          href: el.tagName === 'A' ? el.getAttribute('href') : null, sel: sel(el),
          x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height),
        };
      });
    const heads = [...document.querySelectorAll('h1, h2, h3')].filter(vis).slice(0, 80).map((h) => ({ tag: h.tagName.toLowerCase(), text: h.innerText.trim().replace(/\s+/g, ' ').slice(0, 90), y: Math.round(h.getBoundingClientRect().top + scrollY), sel: sel(h) }));
    return { url: location.href, height: document.documentElement.scrollHeight, heads, items };
  });
}

