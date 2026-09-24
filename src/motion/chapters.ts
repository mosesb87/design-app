import { gsap, ScrollTrigger } from './runtime';
import { setOnEnter, type SetLines } from './type';
import { drawFore, animateFore } from './fore';
import { layoutBox, ortho, sizeSvg, svgEl, lineRects, type Box } from '../lib/geom';

const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => ctx.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel));

/** Chapters IV–IX: flowing pages with scroll-linked figures. Shared by desktop and the pocket edition. */
export function buildChapters(opts: { desktop: boolean; stageTrailX?: number | null }) {
  const cleanups: Array<() => void> = [];
  const sets: SetLines[] = [];

  // Headings in flowing chapters are set once, as they arrive.
  $$('.chapter [data-set-lines]').forEach((h) => sets.push(setOnEnter(h)));
  cleanups.push(() => sets.forEach((s) => s.revert()));

  trail(opts, cleanups);
  sage();
  memory(cleanups);
  binding();
  field();
  afterword(cleanups);

  return () => cleanups.forEach((fn) => { try { fn(); } catch { /* already reverted */ } });
}

/* IV — the trail: the line the answer left behind keeps going, and every step inks as you read it. */
function trail(opts: { desktop: boolean; stageTrailX?: number | null }, cleanups: Array<() => void>) {
  const section = $('#trail');
  const list = $('[data-trail]');
  if (!section || !list) return;
  const steps = $$('[data-step]', list);

  // A connector from the top of the chapter down to the trail, continuing Chapter III's stet line.
  if (opts.desktop) {
    const lb = layoutBox(list, section);
    const link = document.createElement('div');
    link.setAttribute('aria-hidden', 'true');
    Object.assign(link.style, {
      position: 'absolute',
      left: `${lb.x - 24 - 1}px`,
      top: '0px',
      width: '2px',
      height: `${lb.y}px`,
      background: 'var(--ink)',
      transformOrigin: '50% 0',
    });
    section.appendChild(link);
    cleanups.push(() => link.remove());
    gsap.fromTo(link, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: `top+=${lb.y} 60%`, scrub: 0.6 } });
  }
  // The trail itself is a CSS pseudo-element; scrub it through a custom property.
  list.style.setProperty('--trail', '0');
  const style = document.createElement('style');
  style.textContent = 'html.motion .trail::before { transform: scaleY(var(--trail, 1)); }';
  document.head.appendChild(style);
  cleanups.push(() => { style.remove(); list.style.removeProperty('--trail'); });
  gsap.to(list, { '--trail': 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: 0.6 } });
  steps.forEach((s) => {
    gsap.fromTo(s, { opacity: 0.28 }, { opacity: 1, duration: 0.6, ease: 'settle', scrollTrigger: { trigger: s, start: 'top 64%', toggleActions: 'play none none reverse' } });
  });
  gsap.fromTo($$('[data-access]', list), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'settle', scrollTrigger: { trigger: steps[steps.length - 1], start: 'top 64%', toggleActions: 'play none none reverse' } });
}

/* V — Sage: three questions arrive; the switch steps in hard clicks, then routes. No agent is implied. */
function sage() {
  const fig = $('[data-router]');
  if (!fig) return;
  const slips = $$('[data-slip]', fig);
  const caret = $('[data-switch-caret]', fig);
  const stamp = $('[data-stamp]', fig);
  const rows = $$('.masthead__row', fig);
  gsap.set(slips, { autoAlpha: 0, x: -24 });
  gsap.set(stamp, { autoAlpha: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: fig, start: 'top 72%', end: 'bottom 55%', scrub: 0.5 } });
  const stops = [-34, 0, 34];
  slips.forEach((slip, i) => {
    const b = i * 10;
    tl.to(slip, { autoAlpha: 1, x: 0, duration: 3, ease: 'power2.out' }, b);
    // quantized decision: the caret clicks through positions, it never glides
    tl.to(caret, { y: stops[(i + 2) % 3], duration: 1.2, ease: 'steps(1)' }, b + 3);
    tl.to(caret, { y: stops[(i + 1) % 3], duration: 1.2, ease: 'steps(1)' }, b + 4.2);
    tl.to(caret, { y: stops[i % 3], duration: 1.2, ease: 'steps(1)' }, b + 5.4);
    tl.fromTo(stamp, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out', immediateRender: false }, b + 6.6);
    tl.to(slip, { x: 14, opacity: 0.42, duration: 2.4, ease: 'power2.in' }, b + 7);
    if (i < slips.length - 1) tl.to(stamp, { autoAlpha: 0, duration: 0.8 }, b + 9);
  });
  tl.fromTo(rows, { opacity: 0.55 }, { opacity: 1, duration: 3, stagger: 1, immediateRender: false }, 2);
}

/* VI — memory: the record deposits year by year. */
function memory(cleanups: Array<() => void>) {
  const fig = $('[data-fore]');
  const f = drawFore();
  if (!fig || !f) return;
  animateFore(f, fig);
  cleanups.push(() => $('[data-fore-svg]')?.replaceChildren());
}

/* VII — the binding: the record is bound in trust. Almost nothing moves here, by design. */
function binding() {
  const section = $('[data-binding]');
  if (!section) return;
  const head = $$('.chapter__head .kicker, .chapter__head .lede, .folio-mark', section);
  gsap.fromTo(section, { backgroundColor: '#F2EFEA' }, { backgroundColor: '#1C1C1E', ease: 'none', scrollTrigger: { trigger: section, start: 'top 96%', end: 'top 58%', scrub: 0.4 } });
  gsap.fromTo(head, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'settle', scrollTrigger: { trigger: section, start: 'top 55%', toggleActions: 'play none none reverse' } });
  const controls = $$('.control', section);
  const style = document.createElement('style');
  style.textContent = 'html.motion .control::after { transform: scaleX(var(--lead, 1)); }';
  document.head.appendChild(style);
  gsap.fromTo(controls, { '--lead': 0, opacity: 0.2 }, {
    '--lead': 1, opacity: 1, duration: 0.7, ease: 'draw', stagger: 0.07,
    scrollTrigger: { trigger: $('[data-controls]', section), start: 'top 70%', toggleActions: 'play none none reverse' },
  });
  gsap.fromTo($('.epigraph', section), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'settle', scrollTrigger: { trigger: $('.epigraph', section), start: 'top 78%', toggleActions: 'play none none reverse' } });
}

/* VIII — reserved offprints slide in like tipped-in pages; working papers are set. */
function field() {
  gsap.fromTo($$('[data-offprint]'), { autoAlpha: 0, x: 36 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.14, ease: 'settle', scrollTrigger: { trigger: '.offprints', start: 'top 76%', toggleActions: 'play none none reverse' } });
  gsap.fromTo($$('[data-paper]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'settle', scrollTrigger: { trigger: '.papers', start: 'top 80%', toggleActions: 'play none none reverse' } });
}

/* IX — a proofreader's correction, "together" set in ink, and the last leader becomes the underline of the call to action. */
function afterword(cleanups: Array<() => void>) {
  const dele = $('[data-dele] .dele__stroke path');
  const line = $('[data-afterword]');
  if (dele && line) {
    gsap.fromTo(dele, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none', scrollTrigger: { trigger: line, start: 'top 72%', end: 'top 42%', scrub: 0.5 } });
  }
  const word = $('[data-together]');
  if (word) {
    gsap.timeline({ scrollTrigger: { trigger: word, start: 'top 78%', end: 'top 40%', scrub: 0.5 } })
      .fromTo(word, { color: '#5A2D82' }, { color: '#5A2D82', duration: 1 })
      .to(word, { color: '#1C1C1E', duration: 1 });
  }
  const booking = $('.booking');
  const svg = $<SVGSVGElement>('[data-final-leader]');
  const cta = $('[data-final-cta]');
  if (!booking || !svg || !cta || !word) return;
  const draw = () => {
    svg.replaceChildren();
    sizeSvg(svg, booking.offsetWidth, booking.offsetHeight);
    const cb = layoutBox(cta, booking);
    const bookingTop = layoutBox(booking, document.body).y;
    const wordRects = lineRects(word, booking);
    const wr: Box = wordRects[wordRects.length - 1] ?? { x: 0, y: -60, w: 40, h: 40 };
    // From beneath "together." down the page, into the button's baseline, and along it.
    const startX = wr.x + wr.w * 0.5;
    const startY = wr.y + wr.h + 6;
    const d = ortho([[startX, startY], [startX, startY + 14], [-26, startY + 14], [-26, cb.y + cb.h + 6], [cb.x + cb.w, cb.y + cb.h + 6]]);
    const p = svgEl('path', { d });
    svg.appendChild(p);
    void bookingTop;
    return p;
  };
  const path = draw();
  gsap.fromTo(path, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none', scrollTrigger: { trigger: booking, start: 'top 88%', end: () => `top+=${layoutBox(cta, booking).y} 62%`, scrub: 0.6 } });
  cleanups.push(() => svg.replaceChildren());
}

/* ─────────────── Pocket edition: the record and the answer, without a pin ─────────────── */
export function buildPocketRecord() {
  const cleanups: Array<() => void> = [];
  const docs = $$('.desk .doc:not(.doc--leaving)').filter((d) => getComputedStyle(d).display !== 'none');
  gsap.fromTo(docs, { autoAlpha: 0, y: 24, rotation: (i) => (i % 2 ? 2.5 : -2.5) }, {
    autoAlpha: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.07, ease: 'settle',
    scrollTrigger: { trigger: '.desk', start: 'top 80%', toggleActions: 'play none none reverse' },
  });
  gsap.fromTo('.vellum', { y: 60 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '.vellum', start: 'top bottom', end: 'top 60%', scrub: 0.4 } });
  gsap.fromTo($$('.verb'), { opacity: 0.3 }, { opacity: 1, stagger: 0.25, duration: 0.6, ease: 'settle', scrollTrigger: { trigger: '.verbs', start: 'top 70%', toggleActions: 'play none none reverse' } });

  // The answer: clauses are set one by one as the paragraph passes through the reading line.
  const clauses = $$('[data-clause]');
  const galley = $('[data-galley]');
  if (galley && clauses.length) {
    gsap.set(clauses, { opacity: 0.14 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: galley, start: 'top 72%', end: 'bottom 45%', scrub: 0.5 } });
    clauses.forEach((c, i) => tl.to(c, { opacity: 1, duration: 1, ease: 'none' }, i));
  }
  const sources = $$('[data-source]');
  gsap.fromTo(sources, { autoAlpha: 0, x: 14 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'settle', scrollTrigger: { trigger: '.margin--sources', start: 'top 80%', toggleActions: 'play none none reverse' } });
  ScrollTrigger.refresh();
  return () => cleanups.forEach((fn) => fn());
}
