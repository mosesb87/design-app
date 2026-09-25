import { drawConvergence } from './hero';
import { drawFore } from './fore';
import { layoutBox, lineRects, ortho, sizeSvg, svgEl } from '../lib/geom';

/*
 * "With motion off, the record reads the same."
 * Reduced motion / Motion: Off — every figure is drawn in its finished state.
 */
export function drawStatic() {
  const wide = window.matchMedia('(min-width: 900px)').matches;
  drawConvergence(wide ? 'spread' : 'rail');
  drawFore();
  if (wide) drawAnswerLeaders();
}

function drawAnswerLeaders() {
  const galley = document.querySelector<HTMLElement>('[data-galley]');
  const svg = document.querySelector<SVGSVGElement>('[data-galley-ink]');
  const spread = document.querySelector<HTMLElement>('.answer__spread');
  const margin = document.querySelector<HTMLElement>('.margin--sources');
  if (!galley || !svg || !spread || !margin) return;
  svg.replaceChildren();
  sizeSvg(svg, galley.offsetWidth, galley.offsetHeight);
  const G = layoutBox(galley, spread);
  const marginLeft = layoutBox(margin, spread).x - G.x;
  const text = galley.querySelector<HTMLElement>('.galley__text')!;
  const textRight = text.offsetWidth;
  const lh = parseFloat(getComputedStyle(text).lineHeight) || 0;
  const clauses = Array.from(document.querySelectorAll<HTMLElement>('[data-clause]'));
  const sources = Array.from(document.querySelectorAll<HTMLElement>('[data-source]'));
  clauses.forEach((clause, i) => {
    const cite = clause.querySelector('.cite');
    const src = sources[i];
    if (!cite || !src) return;
    const c = lineRects(cite, galley)[0];
    const s = layoutBox(src, spread);
    if (!c) return;
    const lane = Math.min(textRight + 18, marginLeft - 40) + i * 7;
    // Run under the cited line in the clear band between its glyphs and the next line's (the line box's lower edge).
    const rects = lineRects(clause, galley).filter((r) => r.w > 0);
    const last = rects[rects.length - 1];
    const y = last && lh ? last.y + last.h + Math.max(3, (lh - last.h) / 2) : c.y + c.h + 10;
    const d = ortho([[s.x - G.x - 8, s.y - G.y + 9], [lane, s.y - G.y + 9], [lane, y], [c.x + c.w / 2, y]]);
    svg.appendChild(svgEl('path', { d, opacity: 0.45 }));
  });
  // The trail the answer leaves: the editor's "let it stand".
  const q = document.querySelector<HTMLElement>('[data-question]');
  if (q) {
    const qy = layoutBox(q, spread).y - G.y;
    svg.appendChild(svgEl('path', { d: `M-26 ${qy - 6} V${galley.offsetHeight + 20}`, 'stroke-width': 2 }));
  }
}
