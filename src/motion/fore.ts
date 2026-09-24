import { gsap } from './runtime';
import { seeded, sizeSvg, svgEl } from '../lib/geom';

/*
 * Fig. 6 — the fore-edge of a community's record. One hairline per contribution,
 * one band per year, oldest at the bottom. Committee chairs change; the lines
 * they added stay in ink. Deterministic (seeded), so screen, print and reduced
 * motion all show the same figure. Diagram, not data.
 */
const FIRST = 1996;
const LAST = 2026;
const CHAIRS: Array<[number, number]> = [[2010, 2013], [2013, 2016], [2016, 2019], [2019, 2022], [2022, 2025]];

export type Fore = {
  bands: SVGGElement[];
  years: SVGTextElement[];
  chairs: Array<{ g: SVGGElement; from: number; to: number }>;
  now: SVGGElement;
  clip: SVGRectElement;
  height: number;
};

export function drawFore(): Fore | null {
  const svg = document.querySelector<SVGSVGElement>('[data-fore-svg]');
  if (!svg) return null;
  svg.replaceChildren();
  const W = svg.clientWidth || svg.parentElement?.clientWidth || 900;
  const H = svg.clientHeight || 420;
  sizeSvg(svg, W, H);
  const compact = W < 560;
  const rand = seeded(1996);

  const padT = 26;
  const padB = 22;
  const x0 = compact ? 40 : 58;
  const tagW = compact ? 0 : Math.min(260, W * 0.26);
  const x1 = W - tagW - (compact ? 6 : 26);
  const counts: number[] = [];
  for (let y = FIRST; y <= LAST; y++) {
    const i = y - FIRST;
    counts.push(1 + Math.floor(i / 7) + (rand() < 0.4 ? 1 : 0));
  }
  const units = counts.reduce((a, b) => a + b, 0) + counts.length * 2.2;
  const unit = (H - padT - padB) / units;

  const defs = svgEl('defs');
  const clipPath = svgEl('clipPath', { id: 'fore-clip' });
  const clip = svgEl('rect', { x: 0, y: 0, width: W, height: H });
  clipPath.appendChild(clip);
  defs.appendChild(clipPath);
  svg.appendChild(defs);
  const strata = svgEl('g', { 'clip-path': 'url(#fore-clip)' });
  svg.appendChild(strata);

  const bands: SVGGElement[] = [];
  const years: SVGTextElement[] = [];
  const bandY = new Map<number, [number, number]>();
  let y = H - padB;
  const inkLines = new Map<number, number[]>(); // chair index → y of their inked lines
  for (let yr = FIRST; yr <= LAST; yr++) {
    const n = counts[yr - FIRST];
    const g = svgEl('g', { 'data-year': yr });
    const bottom = y;
    const chairIdx = CHAIRS.findIndex(([a, b]) => yr >= a && yr < b);
    for (let j = 0; j < n; j++) {
      y -= unit;
      const segs = 7;
      let d = `M${x0} ${y.toFixed(2)}`;
      for (let s = 1; s <= segs; s++) {
        const xx = x0 + ((x1 - x0) * s) / segs;
        const yy = y + (rand() - 0.5) * unit * 0.5;
        d += ` L${xx.toFixed(1)} ${yy.toFixed(2)}`;
      }
      const inked = chairIdx >= 0 && j === n - 1;
      const p = svgEl('path', { d, class: inked ? 'band band--ink' : 'band' });
      g.appendChild(p);
      if (inked) {
        const list = inkLines.get(chairIdx) ?? [];
        list.push(y);
        inkLines.set(chairIdx, list);
      }
    }
    y -= unit * 2.2;
    bandY.set(yr, [y + unit * 2.2, bottom]);
    strata.appendChild(g);
    bands.push(g);
    if ((yr - FIRST) % 5 === 0 || yr === LAST) {
      const t = svgEl('text', { x: x0 - 10, y: (((bandY.get(yr)![0] + bottom) / 2) + 3.5).toFixed(1), 'text-anchor': 'end', class: 'year' });
      t.textContent = String(yr);
      svg.appendChild(t);
      years.push(t);
    }
  }

  // Chairs: a bracket over their years, their inked lines, and leaders that outlast the term.
  const chairs: Fore['chairs'] = [];
  if (compact) {
    CHAIRS.forEach(([from, to], ci) => {
      const ly = (inkLines.get(ci) ?? [])[0];
      if (ly == null) return;
      const g = svgEl('g', { class: 'chair' });
      const label = svgEl('text', { x: x1 - 4, y: (ly - 4).toFixed(1), 'text-anchor': 'end', class: 'tag-text tag-text--halo' });
      label.textContent = `Chair ’${String(from).slice(2)}–${String(to).slice(2)}`;
      if (ci < CHAIRS.length - 1) label.classList.add('tag-text--past');
      g.appendChild(label);
      svg.appendChild(g);
      chairs.push({ g, from, to });
    });
  } else {
    CHAIRS.forEach(([from, to], ci) => {
      const top = bandY.get(to - 1)![0];
      const bot = bandY.get(from)![1];
      const bx = x1 + 22;
      const g = svgEl('g', { class: 'chair' });
      g.appendChild(svgEl('path', { d: `M${bx - 6} ${top + 1} H${bx} V${bot - 1} H${bx - 6}`, class: 'tag-rule' }));
      (inkLines.get(ci) ?? []).forEach((ly) => {
        g.appendChild(svgEl('path', { d: `M${x1} ${ly.toFixed(2)} H${bx}`, class: 'leader' }));
      });
      const label = svgEl('text', { x: bx + 10, y: ((top + bot) / 2 - 2).toFixed(1), class: 'tag-text' });
      label.textContent = `Chair · ${from}–${String(to).slice(2)}`;
      const sub = svgEl('text', { x: bx + 10, y: ((top + bot) / 2 + 13).toFixed(1), class: 'tag-text tag-text--sub', 'data-sub': '' });
      sub.textContent = ci === CHAIRS.length - 1 ? 'Education Committee' : 'moved on · notes still cited';
      if (ci < CHAIRS.length - 1) label.classList.add('tag-text--past');
      g.append(label, sub);
      svg.appendChild(g);
      chairs.push({ g, from, to });
    });
  }

  const now = svgEl('g', { class: 'now' });
  const topY = bandY.get(LAST)![0];
  now.appendChild(svgEl('path', { d: `M${x0} ${(topY - 8).toFixed(1)} H${x1}`, class: 'tag-rule', 'stroke-dasharray': '2 5' }));
  const nowText = svgEl('text', { x: x0, y: (topY - 14).toFixed(1), class: 'tag-text tag-text--sub' });
  nowText.textContent = 'and it gets smarter every year';
  now.appendChild(nowText);
  svg.appendChild(now);

  return { bands, years, chairs, now, clip, height: H };
}

/** Scroll-scrubbed deposition: the record builds up from 1996; chairs arrive, move on, their ink stays. */
export function animateFore(f: Fore, trigger: Element) {
  const H = f.height;
  gsap.set(f.clip, { attr: { y: H, height: 0 } });
  gsap.set([...f.chairs.map((c) => c.g), f.now], { autoAlpha: 0 });
  f.chairs.forEach((c, i) => {
    if (i < f.chairs.length - 1) {
      const label = c.g.querySelector('.tag-text:not(.tag-text--sub)');
      const sub = c.g.querySelector('[data-sub]');
      if (label) gsap.set(label, { fill: '#5A2D82' });
      if (sub) gsap.set(sub, { opacity: 0 });
    }
  });
  gsap.set(f.years, { autoAlpha: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.to(f.clip, { attr: { y: 0, height: H }, duration: 10 }, 0);
  tl.to(f.years, { autoAlpha: 1, duration: 0.5, stagger: 10 / f.years.length }, 0);
  const span = LAST - FIRST + 1;
  f.chairs.forEach((c, i) => {
    const tIn = ((c.from - FIRST) / span) * 10;
    const tOut = ((c.to - FIRST) / span) * 10;
    tl.to(c.g, { autoAlpha: 1, duration: 0.6 }, tIn);
    if (i < f.chairs.length - 1) {
      const sub = c.g.querySelector('[data-sub]');
      const label = c.g.querySelector('.tag-text:not(.tag-text--sub)');
      if (label) tl.fromTo(label, { fill: '#5A2D82' }, { fill: '#6E6862', duration: 0.6, immediateRender: false }, tOut + 0.4);
      if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.6 }, tOut + 0.4);
    }
  });
  tl.to(f.now, { autoAlpha: 1, duration: 0.8 }, 9.6);
  gsap.timeline({
    scrollTrigger: { trigger, start: 'top 78%', end: 'bottom 60%', scrub: 0.6 },
  }).add(tl);
}
