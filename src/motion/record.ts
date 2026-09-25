import { gsap, ScrollTrigger, SplitText } from './runtime';
import type { Convergence } from './hero';
import { prepareLines } from './type';
import { prepareCount } from './count';
import { layoutBox, ortho, seeded, sizeSvg, svgEl, type Box } from '../lib/geom';
import { setChapter } from '../ui/chrome';

/*
 * ACT I + II — the single take (desktop, motion on).
 * One pinned stage, one scrubbed timeline, measured in vh of scroll:
 *
 *   0 ─ 45   pull back      the title page is one page of the community's record
 *  45 ─ 100  scatter        inboxes, drives, disconnected tools; queries left open   (Ch I)
 * 100 ─ 145  four systems   where it lives today; the systems never merge
 * 145 ─ 190  the layer      a sheet of vellum slides *over* them                     (Ch II)
 * 190 ─ 235  organize · connect · activate   (then a short hold on the question)
 * 247 ─ 300  the question   the layer opens from the question into Chapter III
 * 300 ─ 325  the page is laid out
 * 325 ─ 475  five insertions: margin → main text; the fifth source is a person
 * 475 ─ 520  proof, the gather into one trail, hold
 *
 * Only text-free, aria-hidden marks ever use visibility; everything a reader
 * (or a screen reader) can read stays in the accessibility tree.
 */
export const PHASE = { pull: 0, scatter: 45, sort: 100, layer: 145, verbs: 190, question: 247, answer: 300, insert: 325, reveal: 475, climax: 490, end: 520 };
const SPAN = 30;
const NAV: Record<string, number> = { title: 0, scattered: 86, layer: 186, answer: 283, 'answer-end': 489 };

export type Built = {
  st: ScrollTrigger;
  navTo: (id: string) => number | null;
  yAtProgress: (p: number) => number;
  stetPageX: number;
  kill: () => void;
};

export function buildRecord(conv: Convergence | null): Built | null {
  const record = document.querySelector<HTMLElement>('[data-record]');
  const camera = document.querySelector<HTMLElement>('[data-camera]');
  const title = document.getElementById('title');
  const answer = document.querySelector<HTMLElement>('[data-answer]');
  if (!record || !camera || !title || !answer) return null;
  void conv;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const W = vw;
  const H = vh;
  const S = 0.36; // the pulled-back camera scale
  const rand = seeded(20261209);
  const cleanups: Array<() => void> = [];
  const headH = document.querySelector<HTMLElement>('.running-head')?.offsetHeight ?? 56;
  const footH = document.querySelector<HTMLElement>('.running-foot')?.offsetHeight ?? 34;

  const docs = Array.from(camera.querySelectorAll<HTMLElement>('.doc'));
  const stay = docs.filter((d) => !d.classList.contains('doc--leaving'));
  const leaving = docs.filter((d) => d.classList.contains('doc--leaving'));

  /* ── 0. Chapter plates must fit short laptop screens: scale the slip's contents, never clip them ── */
  const plateI = document.getElementById('scattered')!;
  const plateII = document.getElementById('layer')!;
  const fitPlate = (plate: HTMLElement) => {
    const inner = plate.querySelector<HTMLElement>('.plate__inner')!;
    const apply = (s: number) => {
      inner.style.transform = s < 1 ? `scale(${s})` : '';
      inner.style.width = s < 1 ? `${100 / s}%` : '';
    };
    apply(1);
    const cs = getComputedStyle(plate);
    const avail = plate.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (inner.scrollHeight <= avail + 1) return;
    // Scaling widens the measure, so the lines reflow and need less height: search for the largest scale that fits.
    let lo = Math.max(0.7, avail / inner.scrollHeight); // fits: at a wider measure the text is never taller
    let hi = 1;
    for (let i = 0; i < 7; i++) {
      const m = (lo + hi) / 2;
      apply(m);
      if (inner.scrollHeight * m <= avail + 1) lo = m;
      else hi = m;
    }
    apply(lo);
  };
  cleanups.push(() => [plateI, plateII].forEach((p) => {
    const inner = p.querySelector<HTMLElement>('.plate__inner')!;
    inner.style.transform = '';
    inner.style.width = '';
  }));

  /* ── 1. The record: sixteen pages around the title page (desk units, centre = 0,0) ── */
  const slots: Array<[number, number]> = [];
  const xs = [-1.3, -0.78, -0.26, 0.26, 0.78, 1.3];
  xs.forEach((x) => slots.push([x, -0.74]));
  [-1.3, -0.78, 0.78, 1.3].forEach((x) => slots.push([x, 0]));
  xs.forEach((x) => slots.push([x, 0.74]));
  const home = new Map<HTMLElement, { x: number; y: number; r: number }>();
  stay.forEach((d, i) => {
    const [sx, sy] = slots[i % slots.length];
    home.set(d, { x: sx * W + (rand() - 0.5) * 0.03 * W, y: sy * H + (rand() - 0.5) * 0.05 * H, r: (rand() - 0.5) * 1.2 });
  });
  leaving.forEach((d, i) => home.set(d, { x: (i ? -0.26 : 0.26) * W, y: (i ? 1.34 : -1.34) * H, r: (rand() - 0.5) * 2 }));
  docs.forEach((d) => {
    const h = home.get(d)!;
    gsap.set(d, { x: h.x, y: h.y, xPercent: -50, yPercent: -50, rotation: h.r, transformOrigin: '50% 50%' });
  });

  /* ── 2. Scatter: outward, a little turned; the title page drifts into the open desk beside the slip ── */
  const plateRight = layoutBox(plateI, record).x + plateI.offsetWidth;
  const shift = Math.max(0, (plateRight + 24) / 2 - 20); // screen px: centre of the free desk
  const scatter = new Map<HTMLElement, { x: number; y: number; r: number }>();
  docs.forEach((d) => {
    const h = home.get(d)!;
    const len = Math.hypot(h.x / W, h.y / H) || 1;
    const push = 0.18 + rand() * 0.22;
    scatter.set(d, {
      x: h.x + (h.x / W / len) * push * W + (rand() - 0.5) * 0.16 * W,
      y: h.y + (h.y / H / len) * push * H + (rand() - 0.5) * 0.18 * H,
      r: (rand() - 0.5) * 11,
    });
  });

  /* ── 3. Queries: dashed leaders that stop short of anything ── */
  const queryDocs = stay.filter((_, i) => i % 3 === 1);
  const queries: HTMLElement[] = queryDocs.map((d, i) => {
    const q = document.createElement('i');
    q.className = `doc__query doc__query--${i % 2 ? 'l' : 'r'}`;
    q.innerHTML = '<span>Qy.</span>';
    d.appendChild(q);
    return q;
  });
  cleanups.push(() => queries.forEach((q) => q.remove()));

  /* ── 4. Four systems: targets measured from the captions (screen space → desk space) ── */
  const caps = Array.from(document.querySelectorAll<HTMLElement>('[data-cap]'));
  const colOf: Record<string, number> = { ams: 0, crm: 1, lms: 2, content: 3 };
  const capBoxes = caps.map((c) => layoutBox(c, record));
  const colW = capBoxes[0]?.w ?? 160;
  const stackTop = (capBoxes[0]?.y ?? 100) + (capBoxes[0]?.h ?? 20) + 18;
  const perCol: HTMLElement[][] = [[], [], [], []];
  stay.forEach((d) => perCol[colOf[d.dataset.sys || 'content'] ?? 3].push(d));
  const sortScale = S * 0.92;
  const docScreenW = 0.43 * vw * sortScale;
  const k = colW / docScreenW;
  const rowGap = Math.min((vh - stackTop - 190) / 5, vh * 0.115);
  const sorted = new Map<HTMLElement, { x: number; y: number; order: number; box: Box }>();
  perCol.forEach((col, ci) => {
    const cb = capBoxes[ci];
    col.forEach((d, ri) => {
      const h = d.offsetHeight * sortScale * k;
      const screenX = cb.x + cb.w / 2;
      const top = stackTop + ri * rowGap;
      sorted.set(d, {
        x: (screenX - vw / 2) / sortScale,
        y: (top + h / 2 - vh / 2) / sortScale,
        order: ci + ri * 0.6,
        box: { x: cb.x, y: top, w: cb.w, h },
      });
    });
  });
  const lastDocBottom = Math.max(...Array.from(sorted.values()).map((s) => s.box.y + s.box.h));

  /* ── 5. Chapter plates: headings set by line inside the take ── */
  const setI = prepareLines(plateI.querySelector('h2')!);
  const setII = prepareLines(plateII.querySelector('h2')!);
  const answerTitleSet = prepareLines(answer.querySelector('#answer-h')!);
  cleanups.push(setI.revert, setII.revert, answerTitleSet.revert);
  // Fit after the headings are split: the masked lines are what actually has to fit.
  fitPlate(plateI);
  fitPlate(plateII);

  /* ── 6. Vellum: organize (the brace), connect (the relevant pages wired in), activate (the question) ── */
  const vellum = document.querySelector<HTMLElement>('[data-vellum]')!;
  const vInk = document.querySelector<SVGSVGElement>('[data-vellum-ink]')!;
  const vq = document.querySelector<HTMLElement>('[data-vellum-q]')!;
  const question = answer.querySelector<HTMLElement>('[data-question]')!;
  const vBox = layoutBox(vellum, record);
  const braceScreenY = Math.min(lastDocBottom + 30, vBox.y + vBox.h - 110);
  const toV = (x: number, y: number): [number, number] => [x - vBox.x, y - vBox.y];
  const bracketY = braceScreenY - vBox.y;
  const [bxL] = toV(capBoxes[0].x - 8, 0);
  const [bxR] = toV(capBoxes[3].x + capBoxes[3].w + 8, 0);
  const bxM = (bxL + bxR) / 2;
  // The vellum's question is set to the measure of Chapter III's question, scaled, so the same words can carry across the cut.
  const qScale = parseFloat(getComputedStyle(vq).fontSize) / parseFloat(getComputedStyle(question).fontSize);
  const vqW = Math.min(question.offsetWidth * qScale, vBox.w - 40);
  const vqL = Math.max(20, Math.min(bxM - 14, vBox.w - 20 - vqW));
  Object.assign(vq.style, { top: `${bracketY + 34}px`, bottom: 'auto', left: `${vqL}px`, right: 'auto', width: `${vqW}px`, maxWidth: 'none' });
  vq.style.setProperty('text-wrap', 'balance');
  cleanups.push(() => vq.removeAttribute('style'));
  sizeSvg(vInk, vBox.w, vBox.h);
  vInk.replaceChildren();
  const qBox = layoutBox(vq, vellum);
  // A proofreader's brace: the ends turn in, and a nib at the centre is where the stem leaves for the question.
  const nib = 7;
  const bracket = svgEl('path', {
    d: ortho([[bxL + 8, bracketY - 16], [bxL, bracketY - 16], [bxL, bracketY], [bxM - nib, bracketY], [bxM, bracketY + nib], [bxM + nib, bracketY], [bxR, bracketY], [bxR, bracketY - 16], [bxR - 8, bracketY - 16]]),
  });
  const sx = Math.max(qBox.x + 8, Math.min(bxM, qBox.x + qBox.w - 8));
  const stem = svgEl('path', {
    d: ortho(Math.abs(sx - bxM) < 1
      ? [[bxM, bracketY + nib], [bxM, qBox.y - 6]]
      : [[bxM, bracketY + nib], [bxM, bracketY + nib + 8], [sx, bracketY + nib + 8], [sx, qBox.y - 6]]),
  });
  vInk.append(bracket, stem);
  // connect: every page that bears on the question is marked, and leads down its column's gutter into the brace
  const related = stay.filter((d) => d.hasAttribute('data-rel'));
  const unrelated = stay.filter((d) => !d.hasAttribute('data-rel'));
  const ties: SVGPathElement[] = [];
  const marks: SVGPathElement[] = [];
  related.forEach((d) => {
    const b = sorted.get(d)?.box;
    if (!b) return;
    const [x0, y0] = toV(b.x, b.y);
    const gx = x0 - 10;
    const m = svgEl('path', { d: `M${x0 - 2} ${y0 - 2} H${x0 + b.w + 2} V${y0 + b.h + 2} H${x0 - 2} Z`, 'stroke-width': 1.2 });
    const t = svgEl('path', { d: ortho([[x0, y0 + 12], [gx, y0 + 12], [gx, bracketY]]) });
    vInk.append(m, t);
    marks.push(m);
    ties.push(t);
  });
  const qx = qBox.x;
  const qy = qBox.y + qBox.h + 4;
  const caret = svgEl('path', { d: `M${qx - 7} ${qy + 9} L${qx} ${qy} L${qx + 7} ${qy + 9}` });
  const underline = svgEl('path', { d: `M${qx} ${qy + 1} H${qx + Math.min(qBox.w, vBox.w - qx - 20)}` });
  vInk.append(caret, underline);

  /* ── 7. Chapter III geometry ── */
  const spread = answer.querySelector<HTMLElement>('.answer__spread')!;
  const galley = answer.querySelector<HTMLElement>('[data-galley]')!;
  const gInk = answer.querySelector<SVGSVGElement>('[data-galley-ink]')!;
  const clauses = Array.from(answer.querySelectorAll<HTMLElement>('[data-clause]'));
  const sources = Array.from(answer.querySelectorAll<HTMLElement>('[data-source]'));
  const main = answer.querySelector<HTMLElement>('.answer__main')!;
  const margin = answer.querySelector<HTMLElement>('.margin--sources')!;
  const readout = Array.from(answer.querySelectorAll<HTMLElement>('[data-trail-readout] span'));
  const qualifier = answer.querySelector<HTMLElement>('.qualifier')!;
  const flag = answer.querySelector<HTMLElement>('.label--flag')!;
  const folio = answer.querySelector<HTMLElement>('.answer__spread .folio-mark')!;
  const sourcesLabel = answer.querySelector<HTMLElement>('#sources-h');
  const answerTitle = answer.querySelector<HTMLElement>('.answer__title')!;
  const galleyText = galley.querySelector<HTMLElement>('.galley__text')!;

  // Clauses are set word by word (never by letter).
  const splits = clauses.map((c) => SplitText.create(c, { type: 'words', wordsClass: 'gw', aria: 'none' }));
  cleanups.push(() => splits.forEach((sp) => sp.revert()));
  const clauseWords = splits.map((sp) => sp.words as HTMLElement[]);

  // Centre the page in the frame: the signature deserves the middle of the screen, not the top third.
  const topMin = headH + vh * 0.045;
  const centred = Math.max(topMin, (vh - footH - spread.offsetHeight) / 2 + headH * 0.3);
  spread.style.top = `${centred}px`;
  cleanups.push(() => { spread.style.top = ''; });

  const G = layoutBox(galley, spread);
  sizeSvg(gInk, galley.offsetWidth, galley.offsetHeight);
  gInk.replaceChildren();
  const gr = galley.getBoundingClientRect();
  const rel = (b: Box): Box => ({ x: b.x - G.x, y: b.y - G.y, w: b.w, h: b.h });
  const vis = (el: Element): Box => { const r = el.getBoundingClientRect(); return { x: r.left - gr.left, y: r.top - gr.top, w: r.width, h: r.height }; };
  const mainRight = layoutBox(main, spread).x + main.offsetWidth - G.x;
  const marginLeft = layoutBox(margin, spread).x - G.x;
  const chan = (i: number) => Math.min(mainRight + 18, marginLeft - 44) + i * 7;

  // The lines of the finished paragraph. Word boxes are line boxes (SplitText words are inline-blocks); the clauses'
  // own client rects are the glyphs' content areas. All ink runs in the clear band between one line's glyphs and the next.
  type Line = { top: number; bottom: number; gTop: number; gBottom: number; clauses: Set<number> };
  const lines: Line[] = [];
  clauseWords.forEach((words, ci) => {
    words.filter((w) => !w.closest('.cite')).forEach((w) => {
      const b = vis(w);
      const line = lines.find((l) => b.y < l.bottom - 2 && b.y + b.h > l.top + 2);
      if (line) { line.top = Math.min(line.top, b.y); line.bottom = Math.max(line.bottom, b.y + b.h); line.clauses.add(ci); }
      else lines.push({ top: b.y, bottom: b.y + b.h, gTop: Infinity, gBottom: -Infinity, clauses: new Set([ci]) });
    });
  });
  lines.sort((a, b) => a.top - b.top);
  clauses.forEach((c) => Array.from(c.getClientRects()).forEach((r) => {
    if (r.width < 1) return;
    const mid = (r.top + r.bottom) / 2 - gr.top;
    const l = lines.find((ln) => mid >= ln.top && mid <= ln.bottom);
    if (l) { l.gTop = Math.min(l.gTop, r.top - gr.top); l.gBottom = Math.max(l.gBottom, r.bottom - gr.top); }
  }));
  lines.forEach((l) => {
    if (Number.isFinite(l.gTop) && l.gBottom - l.gTop > 4) return;
    const lead = (l.bottom - l.top) * 0.18;
    l.gTop = l.top + lead;
    l.gBottom = l.bottom - lead;
  });
  const lineOf = (b: Box) => lines.find((l) => b.y + b.h / 2 >= l.top - 2 && b.y + b.h / 2 <= l.bottom + 2) ?? lines[0];
  /** The middle of the clear band under a line, and half its height. */
  const bandUnder = (l: Line) => {
    const next = lines[lines.indexOf(l) + 1];
    const below = next ? next.gTop : l.gBottom + 2 * Math.max(4, l.bottom - l.gBottom);
    return { y: (l.gBottom + below) / 2, half: Math.max(3, (below - l.gBottom) / 2) };
  };
  // The galley rules sit on the real baseline (probed once; every line shares the font), so the text is set onto them.
  const probe = document.createElement('span');
  probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
  const firstWord = clauseWords[0][0];
  firstWord.appendChild(probe);
  const baseOff = probe.getBoundingClientRect().top - firstWord.getBoundingClientRect().top;
  probe.remove();
  const baselines = lines.map((l) => {
    const p = svgEl('path', { d: `M0 ${(l.top + baseOff + 1.5).toFixed(1)} H${(galleyText.offsetWidth * 0.97).toFixed(1)}`, class: 'baseline' });
    gInk.appendChild(p);
    return p;
  });

  const leaders: SVGPathElement[] = [];
  const carets: SVGPathElement[] = [];
  const gathers: SVGPathElement[] = [];
  const stetX = -26;
  let personFrame: SVGPathElement[] = [];
  let personIdx = -1;
  clauses.forEach((_clause, i) => {
    const src = sources[i];
    const fb = vis(clauseWords[i][0]);
    const band = bandUnder(lineOf(fb));
    const under = band.y;
    const ix = Math.max(0, fb.x); // the insertion point: where the clause begins
    const sb = rel(layoutBox(src, spread));
    const lane = chan(i);
    const person = src.classList.contains('source--person');
    let pts: Array<[number, number]>;
    if (person) {
      personIdx = i;
      pts = [[ix, under], [lane, under], [lane, sb.y + 14], [sb.x - 12, sb.y + 14]];
    } else {
      // Leave the note from its outer edge, level with the marked phrase, so the ink never crosses the note's text.
      const mark = src.querySelector('mark')!;
      const mr = mark.getClientRects()[0] ?? mark.getBoundingClientRect();
      const sy = mr.top - gr.top + mr.height * 0.55;
      pts = [[sb.x - 8, sy], [lane, sy], [lane, under], [ix, under]];
    }
    const leader = svgEl('path', { d: ortho(pts) });
    gInk.appendChild(leader);
    leaders.push(leader);
    // A small caret, sized to the band so it never touches the glyphs above or below.
    const a = Math.min(2.5, band.half - 2);
    const c = svgEl('path', { d: `M${ix - 4} ${(under + a).toFixed(1)} L${ix} ${(under - a).toFixed(1)} L${ix + 4} ${(under + a).toFixed(1)}` });
    gInk.appendChild(c);
    carets.push(c);
    const g = svgEl('path', { d: ortho([[ix, under], [stetX, under]]) });
    gInk.appendChild(g);
    gathers.push(g);
    if (person) {
      const pad = 3;
      personFrame = [0, 7].map((o) => {
        const r = svgEl('path', {
          d: `M${sb.x - pad - o} ${sb.y - pad - o} H${sb.x + sb.w + pad + o} V${sb.y + sb.h + pad + o} H${sb.x - pad - o} Z`,
          'stroke-dasharray': '3 3',
        });
        gInk.appendChild(r);
        return r;
      });
    }
  });
  // The phrase that carries each clause: washed in the note, then washed again where it lands in the answer.
  const lands = clauses.map((c) => c.querySelector<HTMLElement>('mark.land'));

  // The trail the answer leaves: one vertical ink line that runs on into Chapter IV.
  const qb = rel(layoutBox(question, spread));
  const stetBottom = vh - (centred + G.y) + 40;
  const stet = svgEl('path', { d: `M${stetX} ${qb.y - 6} V${stetBottom}`, 'stroke-width': 2 });
  gInk.appendChild(stet);
  const stetLabel = document.createElement('span');
  stetLabel.className = 'stet';
  stetLabel.setAttribute('aria-hidden', 'true');
  stetLabel.textContent = 'stet';
  stetLabel.style.left = `${stetX - 34}px`;
  stetLabel.style.top = `${qb.y + 2}px`;
  galley.appendChild(stetLabel);
  cleanups.push(() => stetLabel.remove());
  const stetPageX = gr.left + stetX;

  // The match-cut into Chapter III. The page rises from a band just under the vellum's question, and the page's own
  // question starts exactly where the vellum's sits (scaled to the same type size), so the words carry across the cut.
  const V = { x: vBox.x + qBox.x, y: vBox.y + qBox.y };
  const F = layoutBox(question, record);
  const halfLead = (el: HTMLElement) => {
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    return ((parseFloat(cs.lineHeight) || fs * 1.2) - fs) / 2;
  };
  const qFrom = { x: V.x - F.x, y: V.y + halfLead(vq) - (F.y + halfLead(question) * qScale), scale: qScale };
  const band: Box = { x: V.x - 16, y: V.y + qBox.h + 17, w: qBox.w + 32, h: 0 };
  // Built by hand at every step: browsers serialize inset(0% 0% 0% 0%) as inset(0%), which breaks string tweening.
  const bandInset = [band.y / vh, (vw - band.x - band.w) / vw, (vh - band.y - band.h) / vh, band.x / vw];
  const clipAt = (t: number) => `inset(${bandInset.map((v) => `${(v * (1 - t) * 100).toFixed(3)}%`).join(' ')})`;
  const cut = { t: 0 };

  /* ── 8. Start states (JS only; text stays readable by assistive tech) ── */
  const plateIParts = Array.from(plateI.querySelectorAll('.body, .reading'));
  // Chapter I's statistic counts up once, when its reading is set.
  const statEl = plateI.querySelector<HTMLElement>('[data-count]');
  const stat = statEl ? prepareCount(statEl) : null;
  if (stat) cleanups.push(stat.revert);
  const plateIIParts = Array.from(plateII.querySelectorAll('.pull, .small'));
  const verbs = Array.from(plateII.querySelectorAll<HTMLElement>('.verb'));
  const wrap = document.querySelector<HTMLElement>('[data-converge-wrap]');
  const convSvg = document.querySelector<SVGSVGElement>('[data-converge]');
  gsap.set([plateI, plateII], { xPercent: -118 });
  gsap.set([...setI.lines, ...setII.lines, ...answerTitleSet.lines], { yPercent: 104 });
  gsap.set(verbs, { opacity: 0.8 });
  gsap.set(queries, { scaleX: 0 });
  gsap.set(queries.map((q) => q.querySelector('span')), { autoAlpha: 0 });
  gsap.set(caps, { autoAlpha: 0, '--cap-rule': 0 });
  gsap.set(vellum, { yPercent: 108 });
  gsap.set([bracket, stem, ...ties, ...marks, caret, underline], { drawSVG: '0% 0%' });
  gsap.set(answer, { opacity: 0, pointerEvents: 'none', clipPath: clipAt(0) });
  gsap.set(answerTitle.querySelector('.kicker'), { opacity: 0 });
  gsap.set([folio, flag, qualifier, ...readout], { opacity: 0 });
  gsap.set(question, { x: qFrom.x, y: qFrom.y, scale: qFrom.scale, transformOrigin: '0 0' });
  if (sourcesLabel) gsap.set(sourcesLabel, { opacity: 0 });
  gsap.set(sources, { opacity: 0, x: 18 });
  gsap.set(answer.querySelectorAll('.source mark'), { backgroundSize: '0% 100%' });
  gsap.set(clauseWords.flat(), { opacity: 0 });
  gsap.set([...baselines, ...leaders, ...carets, ...gathers, stet], { drawSVG: '0% 0%' });
  gsap.set(personFrame, { opacity: 0, scale: 0.985, transformOrigin: '50% 50%' });
  gsap.set(lands.filter(Boolean), { backgroundSize: '0% 100%' });
  gsap.set(stetLabel, { autoAlpha: 0 });

  /* ── 9. The timeline ── */
  const tl = gsap.timeline({ defaults: { ease: 'none' } });

  // A · pull back — the hero's ink retracts toward its sources. The intro owns the paths; this owns their frame.
  if (convSvg) tl.fromTo(convSvg, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', duration: 12, ease: 'power1.in', immediateRender: false }, 0.5);
  if (wrap) tl.fromTo(wrap, { opacity: 1 }, { opacity: 0, duration: 5, immediateRender: false }, 0);
  tl.fromTo([camera, title], { scale: 1 }, { scale: S, duration: 40, ease: 'power2.inOut' }, 5);
  tl.fromTo(title, { '--page-edge': 0 }, { '--page-edge': 1, duration: 18 }, 10);

  // B · scatter (Chapter I) — the desk shifts so the title page lands in open space beside the slip
  docs.forEach((d) => {
    const s = scatter.get(d)!;
    const start = PHASE.scatter + rand() * 10;
    if (d.classList.contains('doc--leaving')) {
      const dir = Number(d.dataset.leave || 1);
      tl.to(d, { x: dir * 2.6 * W, y: s.y * 0.6, rotation: dir * 14, duration: 36, ease: 'power2.in' }, PHASE.scatter + 12);
    } else {
      tl.to(d, { x: s.x, y: s.y, rotation: s.r, duration: 33, ease: 'power1.inOut' }, start);
    }
  });
  tl.to(camera, { x: shift, scale: S * 0.92, duration: 50, ease: 'power1.inOut' }, PHASE.scatter);
  tl.to(title, { x: shift - 0.03 * W * S, y: -0.02 * H * S, rotation: -1.6, scale: S * 0.92, duration: 50, ease: 'power1.inOut' }, PHASE.scatter);
  tl.to(queries, { scaleX: 1, duration: 9, stagger: 2, ease: 'power2.out' }, PHASE.scatter + 24);
  tl.to(queries.map((q) => q.querySelector('span')), { autoAlpha: 1, duration: 4, stagger: 2 }, PHASE.scatter + 30);
  tl.to(plateI, { xPercent: 0, duration: 14, ease: 'power3.out' }, PHASE.scatter + 3);
  tl.to(setI.lines, { yPercent: 0, duration: 10, stagger: 2.2, ease: 'power3.out' }, PHASE.scatter + 8);
  tl.fromTo(plateIParts, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 9, stagger: 4.5, ease: 'power2.out' }, PHASE.scatter + 15);
  if (stat) tl.call(() => stat.play(), [], PHASE.scatter + 19.5);

  // C · four systems
  tl.to(queries, { autoAlpha: 0, duration: 6 }, PHASE.sort);
  tl.to(title, { opacity: 0, duration: 11 }, PHASE.sort);
  stay.forEach((d) => {
    const s = sorted.get(d)!;
    tl.to(d, { x: s.x, y: s.y, rotation: 0, scale: k, duration: 28, ease: 'power3.inOut' }, PHASE.sort + 2 + s.order * 3);
  });
  tl.to(camera, { x: 0, duration: 28, ease: 'power3.inOut' }, PHASE.sort + 2);
  tl.to(caps, { autoAlpha: 1, '--cap-rule': 1, duration: 11, stagger: 3, ease: 'power2.out' }, PHASE.sort + 15);

  // D · the layer (Chapter II) — the slips change places vertically, never crossing on one axis
  tl.to(plateI, { yPercent: -6, opacity: 0, duration: 10, ease: 'power2.in' }, PHASE.layer);
  tl.to(plateII, { xPercent: 0, duration: 14, ease: 'power3.out' }, PHASE.layer + 9);
  tl.to(setII.lines, { yPercent: 0, duration: 10, stagger: 2.2, ease: 'power3.out' }, PHASE.layer + 14);
  tl.fromTo(plateIIParts, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 9, stagger: 5, ease: 'power2.out' }, PHASE.layer + 20);
  tl.to(vellum, { yPercent: 0, duration: 26, ease: 'power2.out' }, PHASE.layer + 10);

  // E · organize · connect · activate
  tl.to(bracket, { drawSVG: '0% 100%', duration: 10, ease: 'power2.inOut' }, PHASE.verbs);
  tl.to(verbs[0], { opacity: 1, duration: 5 }, PHASE.verbs);
  // connect: the pages that bear on the question are marked; the rest recede under the layer, so no grid of rules is left
  tl.to(unrelated, { opacity: 0.45, duration: 8 }, PHASE.verbs + 9);
  tl.to(marks, { drawSVG: '0% 100%', duration: 7, stagger: 1.2, ease: 'power2.inOut' }, PHASE.verbs + 11);
  tl.to(ties, { drawSVG: '0% 100%', duration: 8, stagger: 1.2, ease: 'power2.inOut' }, PHASE.verbs + 15);
  tl.to(verbs[1], { opacity: 1, duration: 5 }, PHASE.verbs + 11);
  tl.to(stem, { drawSVG: '0% 100%', duration: 5, ease: 'power2.inOut' }, PHASE.verbs + 30);
  tl.to(caret, { drawSVG: '0% 100%', duration: 5, ease: 'power2.out' }, PHASE.verbs + 34);
  tl.to(underline, { drawSVG: '0% 100%', duration: 9, ease: 'power2.inOut' }, PHASE.verbs + 36);
  tl.to(verbs[2], { opacity: 1, duration: 5 }, PHASE.verbs + 32);

  // F · hold on the question. Chapter II's slip is taken off the desk, then the page of Chapter III rises from under
  //     the question: its own question is already in place, so the words are set rather than replaced.
  tl.to(plateII, { xPercent: -118, duration: 8, ease: 'power2.in' }, PHASE.question - 4);
  tl.set(answer, { opacity: 1, pointerEvents: 'auto' }, PHASE.question);
  tl.fromTo(cut, { t: 0 }, { t: 1, duration: 24, ease: 'power3.inOut', immediateRender: false, onUpdate: () => { answer.style.clipPath = clipAt(cut.t); } }, PHASE.question);
  tl.to([vInk, vq], { opacity: 0, duration: 8 }, PHASE.question + 4);
  tl.to(answerTitle.querySelector('.kicker'), { opacity: 1, duration: 6 }, PHASE.question + 12);
  tl.to(answerTitleSet.lines, { yPercent: 0, duration: 11, stagger: 2.6, ease: 'power3.out' }, PHASE.question + 14);

  // G · the thesis holds, then lifts; the question travels to the head of the page, and the page is laid out
  tl.to(answerTitle, { y: -0.06 * vh, opacity: 0, duration: 10, ease: 'power2.in' }, PHASE.answer);
  tl.to(question, { x: 0, y: 0, scale: 1, duration: 12, ease: 'power3.inOut' }, PHASE.answer + 4);
  tl.to([folio, flag], { opacity: 1, duration: 6 }, PHASE.answer + 11);
  tl.to(baselines, { drawSVG: '0% 100%', duration: 9, stagger: 1.1, ease: 'power2.inOut' }, PHASE.answer + 13);
  if (sourcesLabel) tl.to(sourcesLabel, { opacity: 1, duration: 6 }, PHASE.answer + 12);
  tl.to(sources, { opacity: 1, x: 0, duration: 9, stagger: 1.5, ease: 'power2.out' }, PHASE.answer + 13);

  // H · five insertions: each note's phrase is washed, its leader runs to the insertion point, and the clause is set there
  const lineDone = new Map<number, number>();
  clauseWords.forEach((words, i) => {
    const b = PHASE.insert + i * SPAN;
    const person = i === personIdx;
    const setAt = person ? b + 3 : b + 18;
    if (!person) {
      const leader = leaders[i];
      tl.to(sources[i].querySelector('mark'), { backgroundSize: '100% 100%', duration: 5, ease: 'power2.out' }, b + 1);
      tl.to(leader, { drawSVG: '0% 100%', duration: 10, ease: 'power2.inOut' }, b + 5);
      tl.to(carets[i], { drawSVG: '0% 100%', duration: 4 }, b + 14);
      tl.to(words, { opacity: 1, duration: 1.2, stagger: 7 / words.length, ease: 'power1.out' }, setAt);
      if (lands[i]) tl.to(lands[i], { backgroundSize: '100% 100%', duration: 5, ease: 'power2.out' }, setAt + 4);
      tl.to(carets[i], { opacity: 0, duration: 3 }, b + 25);
      tl.to(leader, { drawSVG: '0% 0%', duration: 4, ease: 'power2.in' }, b + 25);
    } else {
      // The fifth source is a person: nothing rides. The answer points out to them.
      tl.to(words, { opacity: 1, duration: 1.2, stagger: 7 / words.length, ease: 'power1.out' }, setAt);
      tl.to(carets[i], { drawSVG: '0% 100%', duration: 4 }, b + 9);
      tl.to(leaders[i], { drawSVG: '0% 100%', duration: 10, ease: 'power2.inOut' }, b + 11);
      // dashed, so it is revealed rather than drawn (DrawSVG would overwrite the dash pattern)
      tl.to(personFrame, { opacity: 1, scale: 1, duration: 6, stagger: 2, ease: 'power2.out' }, b + 19);
    }
    lines.forEach((l, li) => { if (l.clauses.has(i)) lineDone.set(li, Math.max(lineDone.get(li) ?? 0, setAt + 8)); });
  });
  // Each galley rule retires once the text on its line is set.
  baselines.forEach((p, li) => tl.to(p, { opacity: 0, duration: 4 }, lineDone.get(li) ?? PHASE.reveal));

  // I · proof: every clause tied to its source at once
  const noteLeaders = leaders.filter((_, i) => i !== personIdx);
  const personLeader = personIdx >= 0 ? leaders[personIdx] : null;
  tl.to(noteLeaders, { drawSVG: '0% 100%', opacity: 0.6, duration: 7, stagger: 1 }, PHASE.reveal);
  tl.to(carets, { opacity: 0.6, duration: 5 }, PHASE.reveal + 2);
  tl.to(readout, { opacity: 1, duration: 5, stagger: 3 }, PHASE.reveal + 2);
  tl.to(qualifier, { opacity: 1, duration: 8 }, PHASE.reveal + 5);

  // J · the gather: leaders retract into their insertion points, run left into one line, and the trail is drawn
  tl.to(noteLeaders, { drawSVG: '100% 100%', duration: 6, stagger: 0.8, ease: 'power2.in' }, PHASE.climax);
  if (personLeader) tl.to(personLeader, { drawSVG: '0% 0%', duration: 6, ease: 'power2.in' }, PHASE.climax + 3);
  tl.to(carets, { opacity: 0, duration: 4 }, PHASE.climax + 4);
  tl.to(gathers, { drawSVG: '0% 100%', duration: 6, stagger: 1, ease: 'power2.inOut' }, PHASE.climax + 5);
  tl.to(stet, { drawSVG: '0% 100%', duration: 12, ease: 'power2.inOut' }, PHASE.climax + 8);
  tl.to(gathers, { drawSVG: '100% 100%', duration: 6, stagger: 0.6, ease: 'power2.in' }, PHASE.climax + 16);
  tl.to(stetLabel, { autoAlpha: 1, duration: 4 }, PHASE.climax + 14);
  tl.to({}, { duration: PHASE.end - (PHASE.climax + 22) }, PHASE.climax + 22);

  /* ── 10. Pin and scrub ── */
  const total = PHASE.end;
  const st = ScrollTrigger.create({
    trigger: record,
    start: 'top top',
    end: `+=${(total * vh) / 100}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.6,
    animation: tl,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (!self.isActive) return;
      const u = self.progress * total;
      setChapter(u < 30 ? 'title' : u < PHASE.layer ? 'scattered' : u < PHASE.question + 8 ? 'layer' : 'answer');
    },
  });

  const yAt = (u: number) => st.start + (u / total) * (st.end - st.start);
  return {
    st,
    navTo: (id: string) => (id in NAV ? yAt(NAV[id]) : null),
    yAtProgress: (p: number) => st.start + p * (st.end - st.start),
    stetPageX,
    kill: () => {
      st.kill();
      tl.kill();
      cleanups.forEach((fn) => { try { fn(); } catch { /* already reverted */ } });
      gsap.set([question, answer, answerTitle, vInk, vq], { clearProps: 'transform,opacity,visibility,clipPath,pointerEvents' });
    },
  };
}
