import { gsap } from './runtime';
import { layoutBox, ortho, sizeSvg, svgEl, lineRects } from '../lib/geom';

export type Convergence = { paths: SVGPathElement[]; mark: HTMLElement };

/**
 * The hero's image: six sources in the margin, one claim in the text.
 * Every fragment's leader runs left to its own lane in the gutter channel,
 * then all six climb and merge into a single line that ends at "knows."
 */
export function drawConvergence(layout: 'spread' | 'rail'): Convergence | null {
  const section = document.getElementById('title');
  const spread = section?.querySelector<HTMLElement>('.spread');
  const svg = section?.querySelector<SVGSVGElement>('[data-converge]');
  const mark = section?.querySelector<HTMLElement>('[data-converge-mark]');
  const target = section?.querySelector<HTMLElement>('[data-converge-target]');
  const fragments = section ? Array.from(section.querySelectorAll<HTMLElement>('[data-fragment]')) : [];
  if (!spread || !svg || !mark || !target || !fragments.length) return null;

  svg.replaceChildren();
  sizeSvg(svg, spread.offsetWidth, spread.offsetHeight);

  // Target geometry: the last line box of "knows." (layout-stable even when the page is scaled)
  const t = layoutBox(target, spread);
  const fontSize = parseFloat(getComputedStyle(target).fontSize);
  const markX = t.x + t.w + fontSize * 0.1;
  const markY = t.y + fontSize * 0.08;
  gsap.set(mark, { x: markX, y: markY });
  mark.classList.add('is-placed');
  const markH = mark.offsetHeight || 14;
  const joinY = markY + markH * 0.55;
  const joinX = markX + mark.offsetWidth + 6;

  const paths: SVGPathElement[] = [];
  if (layout === 'spread') {
    const block = spread.querySelector<HTMLElement>('.title-block')!;
    const margin = spread.querySelector<HTMLElement>('.margin--title')!;
    const bRight = layoutBox(block, spread).x + block.offsetWidth;
    const mLeft = layoutBox(margin, spread).x;
    const channelL = Math.max(bRight + 10, joinX + 14);
    const channelR = mLeft - 14;
    const lanes = fragments.length;
    const step = Math.max(4, Math.min(9, (channelR - channelL) / (lanes + 1)));
    // Nest the lanes: the note farthest from the join takes the innermost lane, so no two leaders cross.
    const ys = fragments.map((f) => layoutBox(f, spread).y + 9);
    const rank = ys.map((y, i) => ({ i, d: Math.abs(y - joinY) })).sort((a, b) => b.d - a.d).map((o) => o.i);
    fragments.forEach((f, i) => {
      const fb = layoutBox(f, spread);
      const sx = fb.x - 1;
      const sy = fb.y + 9;
      const lane = channelL + step * (rank.indexOf(i) + 1);
      const d = ortho([[sx, sy], [lane, sy], [lane, joinY], [joinX, joinY]]);
      const p = svgEl('path', { d, class: 'converge__lead' });
      svg.appendChild(p);
      paths.push(p);
    });
  } else {
    // Pocket edition: a gutter rail climbs from each note, runs under the headline, and rises into the mark.
    const railX = Math.max(4, layoutBox(fragments[0], spread).x - 12);
    const underY = t.y + t.h + 3;
    const upX = markX + mark.offsetWidth / 2;
    fragments.forEach((f) => {
      const fb = layoutBox(f, spread);
      const sy = fb.y + 9;
      const d = ortho([[fb.x - 1, sy], [railX, sy], [railX, underY], [upX, underY], [upX, markY + markH + 2]]);
      const p = svgEl('path', { d });
      svg.appendChild(p);
      paths.push(p);
    });
  }
  return { paths, mark };
}

/** Wrap each manual headline line so it can be set behind a mask. */
function ensureLineMasks(): HTMLElement[] {
  const lines = Array.from(document.querySelectorAll<HTMLElement>('.title-h__line'));
  return lines.map((line) => {
    let inner = line.querySelector<HTMLElement>(':scope > .title-h__in');
    if (!inner) {
      inner = document.createElement('span');
      inner.className = 'title-h__in';
      inner.style.display = 'inline-block';
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      line.classList.add('line-mask');
    }
    return inner;
  });
}

/** Load choreography. No loader, nothing waits on it, and it yields the moment the reader scrolls. */
export function heroIntro(conv: Convergence) {
  const lines = ensureLineMasks();
  const fragments = gsap.utils.toArray<HTMLElement>('#title [data-fragment]');
  const label = document.querySelector('#title-notes-h');
  const kicker = document.querySelector('#title .kicker');
  const category = document.querySelector('.title-h__category');
  const head = document.querySelector('.running-head');
  const foot = document.querySelector('.running-foot');
  document.documentElement.classList.remove('motion-pending');

  const tl = gsap.timeline({ defaults: { ease: 'settle' } });
  tl.fromTo(lines, { yPercent: 108 }, { yPercent: 0, duration: 1.05, stagger: 0.09 }, 0.05)
    .fromTo([kicker, category], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.25)
    .fromTo(label, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.55)
    .fromTo(fragments, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, stagger: 0.07 }, 0.62)
    .fromTo(conv.paths, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 1.05, ease: 'draw', stagger: 0.075 }, 1.05)
    .fromTo(conv.mark, { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.4 }, 1.95);
  if (head && foot) {
    tl.fromTo([head, foot], { '--rule-scale': 0 }, { '--rule-scale': 1, duration: 1, ease: 'draw' }, 0);
  }
  return tl;
}

/** Utility for tests of the geometry: the line boxes of the target word. */
export function targetLines() {
  const target = document.querySelector('[data-converge-target]');
  const spread = document.querySelector('#title .spread');
  return target && spread ? lineRects(target, spread) : [];
}
