import { gsap, ScrollTrigger, initScroll, destroyScroll, getLenis, scrollToY } from './motion/runtime';
import { initChrome, reflectMotion, setMotionToggleHandler, setNavigator, setStageOwnsRecord, announce } from './ui/chrome';
import { drawConvergence, heroIntro } from './motion/hero';
import { buildRecord } from './motion/record';
import { buildChapters, buildPocketRecord } from './motion/chapters';
import { drawStatic } from './motion/static';
import { debounce } from './lib/geom';

const html = document.documentElement;
const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
let mm: gsap.MatchMedia | null = null;
let userOff = readPref();

function readPref() {
  try { return localStorage.getItem('sai-motion') === 'off'; } catch { return false; }
}
function writePref(off: boolean) {
  try { localStorage.setItem('sai-motion', off ? 'off' : 'on'); } catch { /* storage unavailable: session-only */ }
}
const motionAllowed = () => !userOff && !reduceMQ.matches;

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

function teardown() {
  mm?.revert();
  mm = null;
  destroyScroll();
  html.classList.remove('motion', 'stage-mode');
  setStageOwnsRecord(false);
  setNavigator(null);
}

function build() {
  teardown();
  reflectMotion(motionAllowed());
  if (!motionAllowed()) {
    html.classList.remove('motion-pending');
    drawStatic();
    return;
  }
  html.classList.add('motion');
  initScroll();

  mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899.98px)' }, (ctx) => {
    const desktop = Boolean(ctx.conditions?.desktop);
    if (desktop) {
      html.classList.add('stage-mode');
      setStageOwnsRecord(true);
    }
    const conv = drawConvergence(desktop ? 'spread' : 'rail');
    const intro = conv ? heroIntro(conv) : null;

    let killRecord: (() => void) | null = null;
    let killPocket: (() => void) | null = null;
    if (desktop) {
      const rec = buildRecord(conv);
      if (rec) {
        killRecord = rec.kill;
        setNavigator((id) => {
          const y = rec.navTo(id);
          if (y == null) return false;
          scrollToY(y, () => focusHeading(id));
          return true;
        });
        // Keyboard focus inside the stage brings its phase on screen.
        const onFocus = (e: FocusEvent) => {
          const el = e.target as HTMLElement;
          const section = el.closest<HTMLElement>('[data-record] [data-chapter]');
          if (!section) return;
          const y = rec.navTo(section.id);
          if (y != null && Math.abs(window.scrollY - y) > innerHeight * 0.4) scrollToY(y);
        };
        document.addEventListener('focusin', onFocus);
        const prevKill = killRecord;
        killRecord = () => { document.removeEventListener('focusin', onFocus); prevKill(); };
      }
    } else {
      killPocket = buildPocketRecord();
    }
    const killChapters = buildChapters({ desktop });

    // The reader is in charge: the first scroll finishes the entrance instead of fighting it.
    const lenis = getLenis();
    const skipIntro = () => { if (window.scrollY > 4 && intro && intro.progress() < 1) intro.progress(1); };
    lenis?.on('scroll', skipIntro);
    window.addEventListener('scroll', skipIntro, { passive: true });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (location.hash) {
        const id = location.hash.slice(1);
        if (document.getElementById(id)) setTimeout(() => jumpTo(id), 120);
      }
    });

    return () => {
      window.removeEventListener('scroll', skipIntro);
      intro?.kill();
      killChapters();
      killPocket?.();
      killRecord?.();
      html.classList.remove('stage-mode');
      setStageOwnsRecord(false);
      setNavigator(null);
      document.querySelectorAll('[data-converge]').forEach((s) => s.replaceChildren());
    };
  });
}

function focusHeading(id: string) {
  const t = document.getElementById(id);
  const h = t?.querySelector<HTMLElement>('h1, h2, h3') ?? t;
  if (!h) return;
  if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
  h.focus({ preventScroll: true });
}

function jumpTo(id: string) {
  const link = document.createElement('a');
  link.href = `#${id}`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function setMotion(on: boolean) {
  userOff = !on;
  writePref(userOff);
  const y = window.scrollY;
  build();
  // Keep the reader roughly where they were: re-anchor by chapter rather than pixels.
  const current = document.querySelector('.fore-edge a[aria-current="true"]')?.getAttribute('href')?.slice(1);
  if (current && current !== 'title') jumpTo(current);
  else window.scrollTo(0, Math.min(y, 0));
  announce(on ? 'Motion on.' : 'Motion off. The record reads the same.');
}

async function boot() {
  initChrome();
  setMotionToggleHandler(setMotion);
  reflectMotion(motionAllowed());
  await fontsReady();
  build();

  reduceMQ.addEventListener('change', () => build());
  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  window.addEventListener('resize', debounce(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const big = Math.abs(w - lastW) > 40 || (html.classList.contains('stage-mode') && Math.abs(h - lastH) > 120);
    lastW = w;
    lastH = h;
    if (!big) return;
    if (!motionAllowed()) { drawStatic(); return; }
    const section = document.querySelector('.fore-edge a[aria-current="true"]')?.getAttribute('href')?.slice(1);
    build();
    if (section && section !== 'title') setTimeout(() => jumpTo(section), 200);
  }, 260));
}

boot();
