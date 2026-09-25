import { gsap, ScrollTrigger } from './runtime';
import { setOnEnter, type SetLines } from './type';
import { drawFore, animateFore } from './fore';
import { layoutBox, ortho, sizeSvg, svgEl, lineRects, type Box } from '../lib/geom';

const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => ctx.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel));

type Opts = { desktop: boolean; stageTrailX?: number | null };

/** Chapters IV–IX: flowing pages with scroll-linked figures. Shared by desktop and the pocket edition. */
export function buildChapters(opts: Opts) {
  const cleanups: Array<() => void> = [];
  const sets: SetLines[] = [];

  // Headings in flowing chapters are set once, as they arrive. The binding's heading waits for the charcoal.
  $$('.chapter [data-set-lines]').forEach((h) => sets.push(setOnEnter(h, h.closest('[data-binding]') ? 'top 72%' : 'top 84%')));
  cleanups.push(() => sets.forEach((s) => s.revert()));

  trail(opts, cleanups);
  sage(opts, cleanups);
  memory(cleanups);
  binding();
  field(opts);
  afterword(cleanups);

  return () => cleanups.forEach((fn) => { try { fn(); } catch { /* already reverted */ } });
}

/* IV — the trail: the line the answer left behind keeps going, and each step's node inks as you reach it. */
function trail(opts: Opts, cleanups: Array<() => void>) {
  const section = $('#trail');
  const list = $('[data-trail]');
  if (!section || !list) return;
  const steps = $$('[data-step]', list);
  const sectionLeft = section.getBoundingClientRect().left;
  const listBox = layoutBox(list, section);
  // One x for the whole trail: the stage's stet line, the connector, and the list's own rule.
  // x is the centre of the line; the 2px rules are placed by their left edge.
  const x = opts.stageTrailX != null ? opts.stageTrailX - sectionLeft : listBox.x - 23;
  list.style.setProperty('--trail-x', `${x - 1 - listBox.x}px`);
  cleanups.push(() => list.style.removeProperty('--trail-x'));

  if (opts.desktop) {
    const link = document.createElement('div');
    link.setAttribute('aria-hidden', 'true');
    Object.assign(link.style, {
      position: 'absolute',
      left: `${x - 1}px`,
      top: '0px',
      width: '2px',
      height: `${listBox.y}px`,
      background: 'var(--ink)',
      transformOrigin: '50% 0',
    });
    section.appendChild(link);
    cleanups.push(() => link.remove());
    gsap.fromTo(link, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: `top+=${listBox.y} 60%`, scrub: 0.6 } });
  }
  gsap.fromTo(list, { '--trail': 0 }, { '--trail': 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: 0.6 } });
  steps.forEach((s) => {
    gsap.fromTo(s, { '--node': 0 }, { '--node': 1, duration: 0.4, ease: 'settle', scrollTrigger: { trigger: s, start: 'top 64%', toggleActions: 'play none none reverse' } });
  });
  gsap.fromTo($$('[data-access]', list), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'settle', scrollTrigger: { trigger: steps[steps.length - 1], start: 'top 80%', toggleActions: 'play none none reverse' } });
}

/* V — Sage: three questions arrive; the switch steps in hard clicks and routes each one to the agents. No agent is implied. */
function sage(opts: Opts, cleanups: Array<() => void>) {
  const fig = $('[data-router]');
  if (!fig) return;
  const slips = $$('[data-slip]', fig);
  const caret = $('[data-switch-caret]', fig);
  const stamp = $('[data-stamp]', fig);
  const sw = $('[data-switch]', fig);
  const masthead = $('.masthead', fig);
  const rows = $$('.masthead__row', fig);

  // Ink: slip → switch, switch → a bracket that holds the whole masthead (the right agent, whichever it is).
  const svg = svgEl('svg', { class: 'router__ink', 'aria-hidden': 'true' });
  fig.prepend(svg);
  cleanups.push(() => svg.remove());
  const paths: SVGPathElement[] = [];
  let bracket: SVGPathElement | null = null;
  if (opts.desktop && sw && masthead) {
    sizeSvg(svg, fig.offsetWidth, fig.offsetHeight);
    const fr = fig.getBoundingClientRect();
    const box = (el: Element): Box => { const r = el.getBoundingClientRect(); return { x: r.left - fr.left, y: r.top - fr.top, w: r.width, h: r.height }; };
    const s = box(sw);
    // The bracket holds the agents (rows 02–03), not Sage itself.
    const agentRows = rows.slice(1);
    const m = agentRows.length ? (() => { const a = box(agentRows[0]); const z = box(agentRows[agentRows.length - 1]); return { x: a.x, y: a.y, w: a.w, h: z.y + z.h - a.y }; })() : box(masthead);
    const swIn = s.x + s.w / 2 - 12;
    const swOut = s.x + s.w / 2 + 12;
    const swY = s.y + s.h / 2;
    slips.forEach((slip) => {
      const b = box(slip);
      const y = b.y + b.h / 2;
      paths.push(svg.appendChild(svgEl('path', { d: ortho([[b.x + b.w + 2, y], [b.x + b.w + 16, y], [b.x + b.w + 16, swY], [swIn, swY]]) })));
    });
    const bx = m.x - 14;
    bracket = svg.appendChild(svgEl('path', { d: ortho([[bx + 8, m.y + 6], [bx, m.y + 6], [bx, m.y + m.h - 6], [bx + 8, m.y + m.h - 6]]) }));
    const midY = m.y + m.h / 2;
    paths.push(svg.appendChild(svgEl('path', { d: ortho([[swOut, swY], [swOut + 14, swY], [swOut + 14, midY], [bx, midY]]) })));
  }
  if (paths.length) gsap.set(paths, { drawSVG: '0% 0%' });
  if (bracket) gsap.set(bracket, { drawSVG: '0% 0%' });
  gsap.set(slips, { autoAlpha: 0, x: opts.desktop ? -24 : 0, y: opts.desktop ? 0 : 12 });
  gsap.set(stamp, { autoAlpha: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: fig, start: 'top 72%', end: 'bottom 55%', scrub: 0.5 } });
  if (bracket) tl.to(bracket, { drawSVG: '0% 100%', duration: 3, ease: 'power2.inOut' }, 0);
  const out = paths[paths.length - 1];
  const stops = [-34, 0, 34];
  slips.forEach((slip, i) => {
    const b = 1 + i * 10;
    tl.to(slip, { autoAlpha: 1, x: 0, y: 0, duration: 3, ease: 'power2.out' }, b);
    if (paths[i] && paths[i] !== out) tl.fromTo(paths[i], { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 2.4, ease: 'power2.inOut', immediateRender: false }, b + 2);
    // quantized decision: the caret clicks through positions, it never glides
    tl.to(caret, { y: stops[(i + 2) % 3], duration: 1.2, ease: 'steps(1)' }, b + 3);
    tl.to(caret, { y: stops[(i + 1) % 3], duration: 1.2, ease: 'steps(1)' }, b + 4.2);
    tl.to(caret, { y: stops[i % 3], duration: 1.2, ease: 'steps(1)' }, b + 5.4);
    if (out && opts.desktop) tl.fromTo(out, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 1.6, ease: 'power2.inOut', immediateRender: false }, b + 6.4);
    tl.fromTo(stamp, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out', immediateRender: false }, b + 6.6);
    tl.to(slip, { x: opts.desktop ? 10 : 0, duration: 2.4, ease: 'power2.in' }, b + 7);
    if (i < slips.length - 1) {
      tl.to(stamp, { autoAlpha: 0, duration: 0.8 }, b + 9);
      if (paths[i] && paths[i] !== out) tl.to(paths[i], { drawSVG: '100% 100%', duration: 1.4 }, b + 8.6);
      if (out && opts.desktop) tl.to(out, { drawSVG: '100% 100%', duration: 1.2 }, b + 8.8);
    }
  });
}

/* VI — memory: the record deposits year by year. */
function memory(cleanups: Array<() => void>) {
  const fig = $('[data-fore]');
  const f = drawFore();
  if (!fig || !f) return;
  animateFore(f, fig);
  cleanups.push(() => $('[data-fore-svg]')?.replaceChildren());
}

/* VII — the binding: a hard edge of charcoal, a spine of ink across the top, and almost nothing else moves. */
function binding() {
  const section = $('[data-binding]');
  if (!section) return;
  const head = $$('.chapter__head .kicker, .chapter__head .lede', section);
  gsap.fromTo(section, { '--spine': 0 }, { '--spine': 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 92%', end: 'top 40%', scrub: 0.5 } });
  gsap.fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1, ease: 'settle', scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' } });
  const controls = $$('.control', section);
  gsap.fromTo(controls, { '--lead': 0 }, {
    '--lead': 1, duration: 0.7, ease: 'draw', stagger: 0.07,
    scrollTrigger: { trigger: $('[data-controls]', section), start: 'top 72%', toggleActions: 'play none none reverse' },
  });
  gsap.fromTo($('.epigraph', section), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: 'settle', scrollTrigger: { trigger: $('.epigraph', section), start: 'top 80%', toggleActions: 'play none none reverse' } });
}

/* VIII — reserved offprints are tipped in; working papers are set. Nothing travels sideways past the gutter. */
function field(opts: Opts) {
  gsap.fromTo($$('[data-offprint]'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'settle', scrollTrigger: { trigger: '.offprints', start: 'top 78%', toggleActions: 'play none none reverse' } });
  gsap.fromTo($$('[data-paper]'), { opacity: 0, y: opts.desktop ? 14 : 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'settle', scrollTrigger: { trigger: '.papers', start: 'top 82%', toggleActions: 'play none none reverse' } });
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
  svg.replaceChildren();
  sizeSvg(svg, booking.offsetWidth, booking.offsetHeight);
  const cb = layoutBox(cta, booking);
  const wordRects = lineRects(word, booking);
  const wr: Box = wordRects[wordRects.length - 1] ?? { x: 0, y: -60, w: 40, h: 40 };
  // Keep the gutter run on screen on phones (the same gutter as the hero's rail).
  const railX = -Math.max(8, Math.min(26, booking.getBoundingClientRect().left - 8));
  const startX = wr.x + wr.w * 0.5;
  const startY = wr.y + wr.h + 6;
  const d = ortho([[startX, startY], [startX, startY + 14], [railX, startY + 14], [railX, cb.y + cb.h + 6], [cb.x + cb.w, cb.y + cb.h + 6]]);
  const path = svg.appendChild(svgEl('path', { d }));
  gsap.fromTo(path, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none', scrollTrigger: { trigger: booking, start: 'top 88%', end: () => `top+=${layoutBox(cta, booking).y} 62%`, scrub: 0.6 } });
  cleanups.push(() => svg.replaceChildren());
}

/* ─────────────── Pocket edition: the record and the answer, without a pin ─────────────── */
export function buildPocketRecord() {
  const cleanups: Array<() => void> = [];
  const docs = $$('.desk .doc').filter((d) => getComputedStyle(d).display !== 'none');
  gsap.fromTo(docs, { autoAlpha: 0, y: 24, rotation: (i) => (i % 2 ? 2 : -2) }, {
    autoAlpha: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.07, ease: 'settle',
    scrollTrigger: { trigger: '.desk', start: 'top 80%', toggleActions: 'play none none reverse' },
  });
  gsap.fromTo('.vellum', { y: 60 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '.vellum', start: 'top bottom', end: 'top 60%', scrub: 0.4 } });
  gsap.fromTo($$('.verb__mark'), { opacity: 0.25 }, { opacity: 1, stagger: 0.25, duration: 0.6, ease: 'settle', scrollTrigger: { trigger: '.verbs', start: 'top 70%', toggleActions: 'play none none reverse' } });

  // The answer: each clause is set as it reaches the reading line, and a rail of ink in the gutter ties it to its source below.
  const clauses = $$('[data-clause]');
  const galley = $('[data-galley]');
  const gInk = $<SVGSVGElement>('[data-galley-ink]');
  const sources = $$('[data-source]');
  if (galley && gInk && clauses.length) {
    gInk.replaceChildren();
    const answer = $('#answer')!;
    const gb = galley.getBoundingClientRect();
    const ab = answer.getBoundingClientRect();
    sizeSvg(gInk, galley.offsetWidth, ab.bottom - gb.top);
    // One rail per clause in the page margin, later clauses outermost, so the rungs to the sources never cross.
    // Each leg runs in the clear band under the clause's last line, not through the text.
    const n = clauses.length;
    const pitch = Math.min(3.5, Math.max(2, (gb.left - 4) / n));
    const railX = (i: number) => -(gb.left - 3) + (n - 1 - i) * pitch;
    const paths = clauses.map((c, i) => {
      const cite = c.querySelector('.cite')!;
      const cr = cite.getBoundingClientRect();
      const rects = Array.from(c.getClientRects()).filter((r) => r.width > 0);
      const last = rects[rects.length - 1] ?? cr;
      const sr = sources[i].getBoundingClientRect();
      const y0 = last.bottom - gb.top + 2;
      const y1 = sr.top - gb.top + 9;
      const x0 = cr.left - gb.left + cr.width / 2;
      const person = sources[i].classList.contains('source--person');
      const d = ortho([[x0, y0], [railX(i), y0], [railX(i), y1], [sr.left - gb.left - 4, y1]]);
      return gInk.appendChild(svgEl('path', { d, opacity: 0.75, 'stroke-width': 1, ...(person ? { 'stroke-dasharray': '3 2.5', class: 'rail--person' } : {}) }));
    });
    // The text is always readable; what arrives with scroll is the ink: each clause's phrase is washed and tied to its source.
    const lands = clauses.map((c) => c.querySelector<HTMLElement>('mark.land'));
    // Dashed (the person) is revealed, not drawn: DrawSVG would overwrite the dash pattern.
    const dashed = (p: SVGPathElement) => p.classList.contains('rail--person');
    gsap.set(paths.filter((p) => !dashed(p)), { drawSVG: '0% 0%' });
    gsap.set(paths.filter(dashed), { opacity: 0 });
    gsap.set(lands.filter(Boolean), { backgroundSize: '0% 100%' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: galley, start: 'top 72%', end: 'bottom 40%', scrub: 0.5 } });
    clauses.forEach((_c, i) => {
      if (lands[i]) tl.to(lands[i], { backgroundSize: '100% 100%', duration: 0.6, ease: 'none' }, i);
      if (dashed(paths[i])) tl.to(paths[i], { opacity: 0.75, duration: 1, ease: 'none' }, i + 0.2);
      else tl.to(paths[i], { drawSVG: '0% 100%', duration: 1, ease: 'none' }, i + 0.2);
    });
    cleanups.push(() => gInk.replaceChildren());
  }
  gsap.fromTo(sources, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'settle', scrollTrigger: { trigger: '.margin--sources', start: 'top 85%', toggleActions: 'play none none reverse' } });
  ScrollTrigger.refresh();
  return () => cleanups.forEach((fn) => fn());
}
