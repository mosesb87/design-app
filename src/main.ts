import { gsap, ScrollTrigger, initScroll, destroyScroll, getLenis, scrollToY } from './motion/runtime';
import { initChrome, reflectMotion, setMotionToggleHandler, setNavigator, setStageOwnsRecord, announce, navigate } from './ui/chrome';
import { drawConvergence, heroIntro } from './motion/hero';
import { buildRecord, type Built } from './motion/record';
import { buildChapters, buildPocketRecord } from './motion/chapters';
import { drawStatic } from './motion/static';

const html = document.documentElement;
const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
// The stage needs room: zoomed-in or very short windows get the pocket edition instead.
const stageMQ = window.matchMedia('(min-width: 900px) and (min-height: 600px)');

type Pref = 'on' | 'off' | null;
type Anchor = { kind: 'top' } | { kind: 'stage'; p: number } | { kind: 'section'; id: string; r: number };

let ctx: gsap.Context | null = null;
let rec: Built | null = null;
let pref: Pref = readPref();
let firstBuild = true;
let printing = false;
let builtAsStage: boolean | null = null;

function readPref(): Pref {
  try {
    const v = localStorage.getItem('sai-motion');
    return v === 'on' || v === 'off' ? v : null;
  } catch { return null; }
}
function writePref(v: Pref) {
  try { if (v) localStorage.setItem('sai-motion', v); } catch { /* storage unavailable: session-only */ }
}
// An explicit choice on the page wins; otherwise the system setting decides.
const motionAllowed = () => (pref === 'on' ? true : pref === 'off' ? false : !reduceMQ.matches);

async function fontsReady(timeout = 1800) {
  if (!('fonts' in document)) return;
  await Promise.race([
    Promise.all([
      document.fonts.load('320 100px Newsreader'),
      document.fonts.load('italic 400 20px Newsreader'),
      document.fonts.load('600 14px "Public Sans"'),
      document.fonts.load('500 12px "Plex Mono"'),
    ]).then(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, timeout)),
  ]);
}

/* ─────────────── Reading position: kept across rebuilds, without touching focus or the URL ─────────────── */
function captureAnchor(): Anchor {
  if (window.scrollY < 8) return { kind: 'top' };
  if (rec && rec.st.isActive) return { kind: 'stage', p: rec.st.progress };
  const mid = window.innerHeight / 2;
  const stage = html.classList.contains('stage-mode');
  for (const s of Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))) {
    if (stage && s.closest('[data-record]')) continue;
    const r = s.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) return { kind: 'section', id: s.id, r: (mid - r.top) / Math.max(1, r.height) };
  }
  return { kind: 'top' };
}
function jump(y: number) {
  const l = getLenis();
  if (l) {
    l.resize(); // the pinned stage may have just changed the page height
    l.scrollTo(y, { immediate: true, force: true });
  }
  else window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
}
function restoreAnchor(a: Anchor) {
  if (a.kind === 'top') return jump(0);
  if (a.kind === 'stage') {
    if (rec) return jump(rec.yAtProgress(a.p));
    const id = a.p < 0.08 ? 'title' : a.p < 0.28 ? 'scattered' : a.p < 0.46 ? 'layer' : 'answer';
    return restoreAnchor({ kind: 'section', id, r: 0 });
  }
  const el = document.getElementById(a.id);
  if (!el) return;
  if (rec && el.closest('[data-record]')) {
    const y = rec.navTo(a.id);
    if (y != null) return jump(y);
  }
  const top = el.getBoundingClientRect().top + window.scrollY;
  jump(Math.max(0, top + a.r * el.offsetHeight - window.innerHeight / 2));
}

/* ─────────────── Build / teardown ─────────────── */
function teardown() {
  ctx?.revert();
  ctx = null;
  rec = null;
  destroyScroll();
  html.classList.remove('motion', 'stage-mode');
  setStageOwnsRecord(false);
  setNavigator(null);
}

function focusHeading(id: string) {
  const t = document.getElementById(id);
  if (!t) return;
  let h: HTMLElement = t.matches('h1, h2, h3, li') ? t : t.querySelector<HTMLElement>('h1, h2, h3') ?? t;
  if (getComputedStyle(h).opacity === '0') h = t.querySelector<HTMLElement>('[data-question]') ?? t;
  if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
  h.focus({ preventScroll: true });
}

function build(anchor: Anchor | null = null) {
  teardown();
  const allowed = motionAllowed();
  reflectMotion(allowed);
  const desktop = stageMQ.matches;
  builtAsStage = allowed && desktop;
  if (!allowed) {
    html.classList.remove('motion-pending');
    drawStatic();
    if (anchor) restoreAnchor(anchor);
    firstBuild = false;
    return;
  }
  html.classList.add('motion');
  initScroll();

  ctx = gsap.context(() => {
    if (desktop) {
      html.classList.add('stage-mode');
      setStageOwnsRecord(true);
    }
    const conv = drawConvergence(desktop ? 'spread' : 'rail');
    const intro = conv ? heroIntro(conv) : null;

    let killPocket: (() => void) | null = null;
    let onFocus: ((e: FocusEvent) => void) | null = null;
    if (desktop) {
      rec = buildRecord(conv);
      const r = rec;
      if (r) {
        const keyFor = (id: string) => (/^(src|cite)-\d$/.test(id) ? 'answer-end' : id);
        setNavigator((id) => {
          const y = r.navTo(keyFor(id));
          if (y == null) return false;
          scrollToY(y, () => focusHeading(id));
          return true;
        });
        // Keyboard focus inside the stage brings its phase on screen (focus inside the answer → the finished answer).
        onFocus = (e: FocusEvent) => {
          const el = e.target as HTMLElement;
          if (!el.closest('[data-record]')) return;
          const section = el.closest<HTMLElement>('[data-chapter]');
          if (!section) return;
          const key = section.id === 'answer' && !el.matches('h2') ? 'answer-end' : section.id;
          const y = r.navTo(key);
          if (y != null && Math.abs(window.scrollY - y) > window.innerHeight * 0.35) scrollToY(y);
        };
        document.addEventListener('focusin', onFocus);
      }
    } else {
      killPocket = buildPocketRecord();
    }
    const killChapters = buildChapters({ desktop, stageTrailX: rec?.stetPageX ?? null });

    // The reader is in charge: the first scroll finishes the entrance instead of fighting it.
    const skipIntro = () => { if (window.scrollY > 4 && intro && intro.progress() < 1) intro.progress(1); };
    getLenis()?.on('scroll', skipIntro);
    window.addEventListener('scroll', skipIntro, { passive: true });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (firstBuild && location.hash && document.getElementById(location.hash.slice(1))) {
        setTimeout(() => navigate(location.hash.slice(1), false), 120);
      } else if (anchor) {
        restoreAnchor(anchor);
      }
      firstBuild = false;
    });

    return () => {
      window.removeEventListener('scroll', skipIntro);
      if (onFocus) document.removeEventListener('focusin', onFocus);
      intro?.kill();
      killChapters();
      killPocket?.();
      rec?.kill();
      html.classList.remove('stage-mode');
      setStageOwnsRecord(false);
      setNavigator(null);
      document.querySelectorAll('[data-converge]').forEach((s) => s.replaceChildren());
    };
  });
}

function setMotion(on: boolean) {
  const anchor = captureAnchor();
  pref = on ? 'on' : 'off';
  writePref(pref);
  build(anchor);
  announce(motionAllowed() ? 'Motion on.' : 'Motion off. The record reads the same.');
}

async function boot() {
  initChrome();
  setMotionToggleHandler(setMotion);
  reflectMotion(motionAllowed());
  await fontsReady();
  build();

  // If the fonts arrived after we measured, measure again (keeping the reader's place).
  if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(() => { if (!printing) build(captureAnchor()); });
  }

  reduceMQ.addEventListener('change', () => { if (pref === null) build(captureAnchor()); });

  // Resize: capture the reading position on the first event of a burst (before layout-dependent code reacts),
  // rebuild only when the composition actually changes.
  let pending: Anchor | null = null;
  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  let timer = 0;
  window.addEventListener('resize', () => {
    if (printing) return;
    if (!pending) pending = captureAnchor();
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const crossed = motionAllowed() && stageMQ.matches !== builtAsStage;
      const big = Math.abs(w - lastW) > 40 || (builtAsStage && Math.abs(h - lastH) > 120);
      lastW = w;
      lastH = h;
      const a = pending;
      pending = null;
      if (!crossed && !big) return;
      if (!motionAllowed()) { drawStatic(); return; }
      build(a);
    }, 260);
  });

  // Print the record, not a frame of the animation.
  let printAnchor: Anchor | null = null;
  window.addEventListener('beforeprint', () => {
    printing = true;
    printAnchor = captureAnchor();
    teardown();
    drawStatic();
  });
  window.addEventListener('afterprint', () => {
    printing = false;
    build(printAnchor);
  });
}

boot();
