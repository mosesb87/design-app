import { gsap, scrollToTarget } from '../motion/runtime';

const TITLES: Record<string, string> = {
  title: 'The Annotated Record',
  scattered: 'I · Written in the margins',
  layer: 'II · A layer above the record',
  answer: 'III · The margins, set in the main text',
  trail: 'IV · The trail comes with it',
  sage: 'V · Ask once',
  memory: 'VI · The organization that never forgets',
  binding: 'VII · Bound in trust',
  field: 'VIII · Reports & working papers',
  book: 'IX · Afterword',
};
export const CHAPTER_ORDER = Object.keys(TITLES);

type Navigator = (id: string, focus: boolean) => boolean; // returns true if handled

const root = document.documentElement;
let current = '';
let stageOwnsRecord = false;
let navigateOverride: Navigator | null = null;
let motionOn = true;
let onMotionToggle: (on: boolean) => void = () => {};
let onProvenance: (apply: () => void) => void = (apply) => apply();

const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => ctx.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel));

/* ─────────────── Chapter state ─────────────── */
export function setChapter(id: string) {
  if (!id || id === current || !(id in TITLES)) return;
  const prev = current;
  current = id;
  const idx = CHAPTER_ORDER.indexOf(id);

  const titleEl = $('[data-running-title]');
  if (titleEl) {
    if (motionOn && prev) {
      const dir = CHAPTER_ORDER.indexOf(prev) < idx ? 1 : -1;
      gsap.timeline()
        .to(titleEl, { yPercent: -110 * dir, duration: 0.22, ease: 'power2.in' })
        .add(() => { titleEl.textContent = TITLES[id]; })
        .fromTo(titleEl, { yPercent: 110 * dir }, { yPercent: 0, duration: 0.45, ease: 'settle' });
    } else {
      titleEl.textContent = TITLES[id];
    }
  }
  const folio = $('[data-folio-out]');
  const section = document.getElementById(id);
  if (folio && section?.dataset.folio) folio.textContent = section.dataset.folio;

  $$('.fore-edge a').forEach((a) => {
    const i = CHAPTER_ORDER.indexOf(a.dataset.edge || '');
    a.classList.toggle('is-read', i > 0 && i < idx);
    if (a.dataset.edge === id) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  $$('.toc a').forEach((a) => {
    if (a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  root.classList.toggle('on-dark', id === 'memory' || id === 'binding');
}

export function setStageOwnsRecord(v: boolean) {
  stageOwnsRecord = v;
}
export function setNavigator(fn: Navigator | null) {
  navigateOverride = fn;
}

function observeChapters() {
  const sections = $$('[data-chapter]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (stageOwnsRecord && el.closest('[data-record]')) continue;
        setChapter(el.dataset.chapter || '');
      }
    },
    { rootMargin: '-48% 0px -48% 0px' },
  );
  sections.forEach((s) => io.observe(s));
  // When the stage releases, the record sections are all behind us; re-evaluate on scroll end.
  let raf = 0;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const mid = innerHeight / 2;
      for (const s of sections) {
        if (stageOwnsRecord && s.closest('[data-record]')) continue;
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { setChapter(s.dataset.chapter || ''); break; }
      }
      reflectDarkUnderBars();
    });
  }, { passive: true });
  window.addEventListener('resize', reflectDarkUnderBars, { passive: true });
  reflectDarkUnderBars();
}

/* The running head and foot turn dark exactly while a dark chapter passes underneath each of them. */
function reflectDarkUnderBars() {
  const head = $('.running-head');
  const foot = $('.running-foot');
  const dark = $$('.chapter--dark');
  const under = (y: number) => dark.some((d) => { const r = d.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
  if (head) root.classList.toggle('head-on-dark', under(head.getBoundingClientRect().bottom - 1));
  if (foot) root.classList.toggle('foot-on-dark', under(foot.getBoundingClientRect().top + 1));
  // The fore-edge ticks sit mid-screen: each one takes the tone of the page directly behind it.
  $$('.fore-edge a').forEach((a) => {
    const r = a.getBoundingClientRect();
    a.classList.toggle('is-on-dark', r.height > 0 && under(r.top + r.height / 2));
  });
}

/* ─────────────── In-page navigation ─────────────── */
export function navigate(id: string, focus = true) {
  const target = document.getElementById(id);
  if (!target) return;
  closeContents(false);
  if (navigateOverride && navigateOverride(id, focus)) return;
  const heading = target.matches('h1,h2,h3') ? target : target.querySelector<HTMLElement>('h1, h2, h3') || target;
  scrollToTarget(target, { offset: -8, focus: focus ? heading : null });
}

function interceptAnchors() {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    history.replaceState(null, '', `#${id}`);
    navigate(id);
  });
}

/* ─────────────── Contents slip ─────────────── */
let lastTrigger: HTMLElement | null = null;
function openContents(trigger: HTMLElement) {
  const dlg = $('#contents');
  if (!dlg) return;
  lastTrigger = trigger;
  dlg.hidden = false;
  setInert(true);
  $$('[data-contents-open]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
  const slip = $('.contents__slip', dlg)!;
  if (motionOn) {
    gsap.fromTo(slip, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'settle' });
    gsap.fromTo($$('.toc__lead', dlg), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'draw', stagger: 0.03, delay: 0.12 });
  }
  (($('.toc a[aria-current="true"]', dlg) as HTMLElement) || $('.toc a', dlg))?.focus();
  document.addEventListener('keydown', trapKeys);
}
function closeContents(restore = true) {
  const dlg = $('#contents');
  if (!dlg || dlg.hidden) return;
  dlg.hidden = true;
  setInert(false);
  $$('[data-contents-open]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  document.removeEventListener('keydown', trapKeys);
  if (restore) lastTrigger?.focus();
}
/** While the Contents slip is open, everything behind it is inert. */
function setInert(on: boolean) {
  ['main', '.running-foot', '.fore-edge', '.colophon', '.skip'].forEach((sel) => {
    const el = $(sel);
    if (el) el.inert = on;
  });
  $$('.running-head .wordmark, .running-head .head-cta, .running-head .head-btn--motion').forEach((el) => (el.inert = on));
}
function trapKeys(e: KeyboardEvent) {
  const dlg = $('#contents');
  if (!dlg) return;
  if (e.key === 'Escape') { e.preventDefault(); closeContents(); return; }
  if (e.key !== 'Tab') return;
  const f = $$<HTMLElement>('a[href], button:not([disabled])', dlg).filter((el) => el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ─────────────── Toggles ─────────────── */
export function contentsOpen() {
  const dlg = $('#contents');
  return Boolean(dlg && !dlg.hidden);
}
export function reflectMotion(on: boolean) {
  motionOn = on;
  $$('[data-motion-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
  $$('[data-motion-state]').forEach((s) => (s.textContent = on ? 'On' : 'Off'));
}
export function setMotionToggleHandler(fn: (on: boolean) => void) {
  onMotionToggle = fn;
}
/** The handler receives the change itself, so it can note the reader's place first and measure again after. */
export function setProvenanceHandler(fn: (apply: () => void) => void) {
  onProvenance = fn;
}
function toggleProvenance(force?: boolean) {
  const on = force ?? !root.classList.contains('provenance');
  onProvenance(() => {
    root.classList.toggle('provenance', on);
    $$('[data-provenance-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
    $$('[data-provenance-state]').forEach((s) => (s.textContent = on ? 'On' : 'Off'));
  });
  announce(on ? 'Provenance view on. Every passage is labeled with its source.' : 'Provenance view off.');
}

export function announce(msg: string) {
  const live = $('[data-live]');
  if (!live) return;
  live.textContent = '';
  window.setTimeout(() => (live.textContent = msg), 30);
}

/* ─────────────── Presenter mode (?present) for review sessions ─────────────── */
function presenter() {
  if (!new URLSearchParams(location.search).has('present')) return;
  root.classList.add('present');
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement;
    if (t.closest('input, textarea, [contenteditable]')) return;
    if (/^[0-9]$/.test(e.key)) {
      const id = CHAPTER_ORDER[Number(e.key)];
      if (id) { e.preventDefault(); navigate(id, false); }
    } else if (e.key === 'm' || e.key === 'M') {
      onMotionToggle(!motionOn);
    } else if (e.key === 'p' || e.key === 'P') {
      toggleProvenance();
    } else if (e.key === 'c' || e.key === 'C') {
      const b = $('[data-contents-open]');
      if (b) openContents(b);
    }
  });
}

/* ─────────────── Concept form: validates, never pretends to send ─────────────── */
function conceptForm() {
  const form = $<HTMLFormElement>('[data-form]');
  if (!form) return;
  const note = $('[data-form-note]', form)!;
  const fields: Array<[HTMLInputElement, HTMLElement, (v: string) => boolean]> = [
    [$<HTMLInputElement>('#f-name', form)!, $('#f-name-err', form)!, (v) => v.trim().length > 1],
    [$<HTMLInputElement>('#f-email', form)!, $('#f-email-err', form)!, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
  ];
  fields.forEach(([input, err]) => {
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') { input.removeAttribute('aria-invalid'); err.hidden = true; }
    });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad: HTMLInputElement | null = null;
    for (const [input, err, ok] of fields) {
      const bad = !ok(input.value);
      err.hidden = !bad;
      if (bad) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', err.id);
        firstBad ??= input;
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
      }
    }
    if (firstBad) { firstBad.focus(); note.hidden = true; return; }
    note.hidden = false;
    note.focus();
  });
}

export function initChrome() {
  observeChapters();
  interceptAnchors();
  $$('[data-contents-open]').forEach((b) => b.addEventListener('click', () => ($('#contents')!.hidden ? openContents(b) : closeContents())));
  $$('[data-contents-close]').forEach((b) => b.addEventListener('click', () => closeContents()));
  $('#contents')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeContents(); });
  $$('[data-motion-toggle]').forEach((b) => b.addEventListener('click', () => onMotionToggle(!motionOn)));
  $$('[data-provenance-toggle]').forEach((b) => b.addEventListener('click', () => toggleProvenance()));
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
  presenter();
  conceptForm();
  setChapter('title');
}
