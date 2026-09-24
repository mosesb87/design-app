import { gsap, ScrollTrigger, SplitText } from './runtime';
import type { Convergence } from './hero';
import { prepareLines, type SetLines } from './type';
import { layoutBox, ortho, seeded, sizeSvg, svgEl, type Box } from '../lib/geom';
import { setChapter } from '../ui/chrome';

/*
 * ACT I + II — the single take (desktop, motion on).
 * One pinned stage, one scrubbed timeline, measured in vh of scroll:
 *
 *   0 ─ 45   pull back      the title page is one page of the community's record
 *  45 ─ 105  scatter        inboxes, drives, disconnected tools; queries left open   (Ch I)
 * 105 ─ 150  four systems   where it lives today; the systems never merge
 * 150 ─ 200  the layer      a sheet of vellum slides *over* them                     (Ch II)
 * 200 ─ 240  organize · connect · activate
 * 240 ─ 305  the question   the layer becomes the page of Chapter III
 * 305 ─ 430  five insertions: margin → main text; the fifth source is a person        (Ch III)
 * 430 ─ 480  proof, climax (the trail straightens), hold
 */
export const PHASE = { pull: 0, scatter: 45, sort: 105, layer: 150, verbs: 200, question: 240, answer: 280, insert: 305, reveal: 430, climax: 448, end: 480 };
const NAV: Record<string, number> = { title: 0, scattered: 92, layer: 196, answer: 300 };

type Built = { st: ScrollTrigger; navTo: (id: string) => number | null; kill: () => void };

export function buildRecord(conv: Convergence | null): Built | null {
  const record = document.querySelector<HTMLElement>('[data-record]');
  const camera = document.querySelector<HTMLElement>('[data-camera]');
  const title = document.getElementById('title');
  const answer = document.querySelector<HTMLElement>('[data-answer]');
  if (!record || !camera || !title || !answer) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const W = vw;
  const H = vh;
  const S = 0.36; // the pulled-back camera scale
  const rand = seeded(20261209);
  const cleanups: Array<() => void> = [];

  const docs = Array.from(camera.querySelectorAll<HTMLElement>('.doc'));
  const stay = docs.filter((d) => !d.classList.contains('doc--leaving'));
  const leaving = docs.filter((d) => d.classList.contains('doc--leaving'));

  /* ── 1. The record: sixteen pages around the title page (desk units, centre = 0,0) ── */
  const slots: Array<[number, number]> = [];
  const xs = [-1.3, -0.78, -0.26, 0.26, 0.78, 1.3];
  xs.forEach((x) => slots.push([x, -0.74]));
  [-1.3, -0.78, 0.78, 1.3].forEach((x) => slots.push([x, 0]));
  xs.forEach((x) => slots.push([x, 0.74]));
  // Interleave systems so no column of the desk is "about" one system.
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

  /* ── 2. Scatter vectors: outward from the centre, a little turned ── */
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
  const docScreenW = 0.43 * vw * S * 0.92;
  const k = colW / docScreenW; // scale so a filed page fits its column
  const sorted = new Map<HTMLElement, { x: number; y: number; order: number }>();
  const sortScale = S * 0.92;
  perCol.forEach((col, ci) => {
    const cb = capBoxes[ci];
    const gap = Math.min((vh - stackTop - 80) / 5, vh * 0.12);
    col.forEach((d, ri) => {
      const screenX = cb.x + cb.w / 2;
      const screenY = stackTop + ri * gap + (d.offsetHeight * sortScale * k) / 2;
      sorted.set(d, { x: (screenX - vw / 2) / sortScale, y: (screenY - vh / 2) / sortScale, order: ci + ri * 0.6 });
    });
  });

  /* ── 5. Chapter plates: headings set by line inside the take ── */
  const plateI = document.getElementById('scattered')!;
  const plateII = document.getElementById('layer')!;
  const setI = prepareLines(plateI.querySelector('h2')!);
  const setII = prepareLines(plateII.querySelector('h2')!);
  const answerTitleSet = prepareLines(answer.querySelector('#answer-h')!);
  cleanups.push(setI.revert, setII.revert, answerTitleSet.revert);

  /* ── 6. Vellum ink: organize (bracket), connect (ties), activate (caret) ── */
  const vellum = document.querySelector<HTMLElement>('[data-vellum]')!;
  const vInk = document.querySelector<SVGSVGElement>('[data-vellum-ink]')!;
  const vq = document.querySelector<HTMLElement>('[data-vellum-q]')!;
  const vBox = layoutBox(vellum, record);
  sizeSvg(vInk, vBox.w, vBox.h);
  vInk.replaceChildren();
  const toV = (x: number, y: number): [number, number] => [x - vBox.x, y - vBox.y];
  // bracket spans the four columns just under the question
  const qBox = layoutBox(vq, vellum);
  const bracketY = qBox.y - 26;
  const [bxL] = toV(capBoxes[0].x - 8, 0);
  const [bxR] = toV(capBoxes[3].x + capBoxes[3].w + 8, 0);
  const bxM = (bxL + bxR) / 2;
  // a brace under the four systems, gathering them into one point above the question
  const bracket = svgEl('path', { d: ortho([[bxL, bracketY - 16], [bxL, bracketY], [bxR, bracketY], [bxR, bracketY - 16]]) + ` M${bxM} ${bracketY} V${qBox.y - 8}` });
  vInk.appendChild(bracket);
  // ties: horizontal correlation rows across the four columns, a dot on each filed page they touch
  const ties: SVGPathElement[] = [];
  const dots: SVGCircleElement[] = [];
  const rowGap = Math.min((vh - stackTop - 80) / 5, vh * 0.12);
  [0, 1, 2].forEach((row) => {
    const y = stackTop + row * rowGap - 7;
    const xsRow = perCol.map((col, ci) => (col[row] ? capBoxes[ci].x + capBoxes[ci].w / 2 : null));
    const present = xsRow.filter((x): x is number => x !== null);
    if (present.length < 2) return;
    const [x0, yy] = toV(Math.min(...present), y);
    const [x1] = toV(Math.max(...present), y);
    const p = svgEl('path', { d: `M${x0.toFixed(1)} ${yy.toFixed(1)} H${x1.toFixed(1)}` });
    vInk.appendChild(p);
    ties.push(p);
    present.forEach((x) => {
      const [cx] = toV(x, y);
      const c = svgEl('circle', { cx: cx.toFixed(1), cy: yy.toFixed(1), r: 3.4, fill: 'var(--ink)', stroke: 'none' });
      vInk.appendChild(c);
      dots.push(c);
    });
  });
  // activate: a caret under the question's first word, and the question underlined in ink
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
  const question = answer.querySelector<HTMLElement>('[data-question]')!;
  const readout = Array.from(answer.querySelectorAll<HTMLElement>('[data-trail-readout] span'));
  const qualifier = answer.querySelector<HTMLElement>('.qualifier')!;
  const flag = answer.querySelector<HTMLElement>('.label--flag')!;
  const folio = answer.querySelector<HTMLElement>('.answer__spread .folio-mark')!;
  const galleyText = galley.querySelector<HTMLElement>('.galley__text')!;

  // Clauses are set word by word (never by letter). The readable text is untouched for assistive tech.
  const splits = clauses.map((c) => SplitText.create(c, { type: 'words', wordsClass: 'gw', aria: 'none' }));
  cleanups.push(() => splits.forEach((sp) => sp.revert()));
  const clauseWords = splits.map((sp) => sp.words as HTMLElement[]);

  const G = layoutBox(galley, spread);
  const sizeG = () => sizeSvg(gInk, galley.offsetWidth, galley.offsetHeight);
  sizeG();
  gInk.replaceChildren();
  const rel = (b: Box): Box => ({ x: b.x - G.x, y: b.y - G.y, w: b.w, h: b.h });
  const mainRight = layoutBox(main, spread).x + main.offsetWidth - G.x;
  const marginLeft = layoutBox(margin, spread).x - G.x;
  const chan = (i: number) => Math.min(mainRight + 18, marginLeft - 40) + i * 7;

  // Baselines of the galley: one hairline per line of the finished paragraph.
  const range = document.createRange();
  range.selectNodeContents(galleyText);
  const gr = galley.getBoundingClientRect();
  const lineBoxes = Array.from(range.getClientRects())
    .map((r) => ({ x: r.left - gr.left, y: r.top - gr.top, w: r.width, h: r.height }))
    .filter((r) => r.w > 1 && r.h > 4)
    .sort((a, b) => a.y - b.y)
    .reduce<Box[]>((acc, r) => {
      const last = acc[acc.length - 1];
      const mid = r.y + r.h / 2;
      if (last && Math.abs(mid - (last.y + last.h / 2)) < last.h * 0.5) {
        const right = Math.max(last.x + last.w, r.x + r.w);
        last.x = Math.min(last.x, r.x);
        last.w = right - last.x;
        return acc;
      }
      acc.push({ ...r });
      return acc;
    }, []);
  const baselines = lineBoxes.map((b) => {
    const p = svgEl('path', { d: `M0 ${(b.y + b.h + 3).toFixed(1)} H${(galleyText.offsetWidth * 0.97).toFixed(1)}`, class: 'baseline' });
    gInk.appendChild(p);
    return p;
  });

  const leaders: SVGPathElement[] = [];
  const carets: SVGPathElement[] = [];
  const riders: HTMLElement[] = [];
  let personFrame: SVGPathElement[] = [];
  clauses.forEach((clause, i) => {
    const cite = clause.querySelector<HTMLElement>('.cite')!;
    const src = sources[i];
    const cr = cite.getBoundingClientRect();
    const cb = { x: cr.left - gr.left, y: cr.top - gr.top, w: cr.width, h: cr.height };
    const line = lineBoxes.find((l) => cb.y + cb.h >= l.y && cb.y <= l.y + l.h) ?? { y: cb.y, h: cb.h * 2, x: 0, w: 0 };
    const under = line.y + line.h + 1;
    const cx = cb.x + cb.w / 2;
    const sb = rel(layoutBox(src, spread));
    const sy = sb.y + 9;
    const lane = chan(i);
    const person = src.classList.contains('source--person');
    const pts: Array<[number, number]> = person
      ? [[cx, under + 4], [cx, under + 12], [lane, under + 12], [lane, sy], [sb.x - 10, sy]]
      : [[sb.x - 8, sy], [lane, sy], [lane, under + 5], [cx, under + 5]];
    const leader = svgEl('path', { d: ortho(pts) });
    gInk.appendChild(leader);
    leaders.push(leader);
    const c = svgEl('path', { d: `M${cx - 6} ${under + 11} L${cx} ${under + 2} L${cx + 6} ${under + 11}` });
    gInk.appendChild(c);
    carets.push(c);
    if (person) {
      const pad = 3;
      personFrame = [0, 7].map((o) => {
        const r = svgEl('path', {
          d: `M${sb.x - pad - o} ${sb.y - pad - o} H${sb.x + sb.w + pad + o} V${sb.y + sb.h + pad + o} H${sb.x - pad - o} Z`,
        });
        gInk.appendChild(r);
        return r;
      });
    } else {
      const phrase = src.querySelector('mark')?.textContent ?? '';
      const rider = document.createElement('span');
      rider.className = 'rider';
      rider.setAttribute('aria-hidden', 'true');
      rider.innerHTML = `<span class="rider__it"></span><span class="rider__ro"></span>`;
      rider.querySelector('.rider__it')!.textContent = phrase;
      rider.querySelector('.rider__ro')!.textContent = phrase;
      galley.appendChild(rider);
      riders.push(rider);
    }
  });
  cleanups.push(() => riders.forEach((r) => r.remove()));

  // The trail: one vertical ink line the answer leaves behind, running on into Chapter IV.
  const qb = rel(layoutBox(question, spread));
  const stetX = -26;
  const stet = svgEl('path', { d: `M${stetX} ${qb.y - 6} V${vh - G.y - spread.offsetTop + 40}`, 'stroke-width': 2 });
  gInk.appendChild(stet);
  const stetLabel = document.createElement('span');
  stetLabel.className = 'stet';
  stetLabel.setAttribute('aria-hidden', 'true');
  stetLabel.textContent = 'stet';
  stetLabel.style.left = `${stetX - 34}px`;
  stetLabel.style.top = `${qb.y + 2}px`;
  galley.appendChild(stetLabel);
  cleanups.push(() => stetLabel.remove());

  /* ── 8. Start states (JS only) ── */
  const plateIParts = Array.from(plateI.querySelectorAll('.kicker, .body, .reading'));
  const plateIIParts = Array.from(plateII.querySelectorAll('.kicker, .pull, .body, .small'));
  const verbs = Array.from(plateII.querySelectorAll<HTMLElement>('.verb'));
  gsap.set([plateI, plateII], { xPercent: -118 });
  gsap.set([...setI.lines, ...setII.lines, ...answerTitleSet.lines], { yPercent: 104 });
  gsap.set(verbs, { opacity: 0.32 });
  gsap.set(queries, { scaleX: 0 });
  gsap.set(queries.map((q) => q.querySelector('span')), { autoAlpha: 0 });
  gsap.set(caps, { autoAlpha: 0, '--cap-rule': 0 });
  gsap.set(vellum, { yPercent: 108 });
  gsap.set([bracket, ...ties, caret, underline], { drawSVG: '0% 0%' });
  gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(answer, { autoAlpha: 0, clipPath: 'inset(0% 0% 0% 0%)' });
  gsap.set(answer.querySelectorAll('.answer__title .kicker'), { autoAlpha: 0 });
  gsap.set([folio, flag, question, qualifier, ...readout], { autoAlpha: 0 });
  gsap.set(sources, { autoAlpha: 0, x: 18 });
  gsap.set(answer.querySelectorAll('.source mark'), { backgroundSize: '0% 100%' });
  gsap.set(clauseWords.flat(), { opacity: 0 });
  gsap.set(answer.querySelector('#sources-h'), { autoAlpha: 0 });
  gsap.set([...baselines, ...leaders, ...carets, ...personFrame, stet], { drawSVG: '0% 0%' });
  gsap.set(riders, { autoAlpha: 0 });
  gsap.set(stetLabel, { autoAlpha: 0 });

  /* ── 9. The timeline ── */
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  const at = (t: number) => t;

  // A · pull back
  if (conv) {
    tl.fromTo(conv.paths, { drawSVG: '0% 100%' }, { drawSVG: '0% 0%', duration: 12, stagger: 0.8, immediateRender: false }, at(0));
    tl.fromTo(conv.mark, { autoAlpha: 1 }, { autoAlpha: 0, duration: 6, immediateRender: false }, at(0));
  }
  tl.fromTo([camera, title], { scale: 1 }, { scale: S, duration: 40, ease: 'power2.inOut' }, at(5));
  tl.fromTo(title, { '--page-edge': 0 }, { '--page-edge': 1, duration: 18 }, at(10));

  // B · scatter (Chapter I)
  docs.forEach((d) => {
    const s = scatter.get(d)!;
    const leave = d.classList.contains('doc--leaving');
    const start = PHASE.scatter + rand() * 12;
    if (leave) {
      const dir = Number(d.dataset.leave || 1);
      tl.to(d, { x: dir * 2.6 * W, y: s.y * 0.6, rotation: dir * 14, duration: 40, ease: 'power2.in' }, at(PHASE.scatter + 14));
    } else {
      tl.to(d, { x: s.x, y: s.y, rotation: s.r, duration: 36, ease: 'power1.inOut' }, at(start));
    }
  });
  tl.to(title, { x: -0.035 * W * S, y: -0.02 * H * S, rotation: -1.6, duration: 40, ease: 'power1.inOut' }, at(PHASE.scatter));
  tl.to([camera], { scale: S * 0.92, duration: 58 }, at(PHASE.scatter));
  tl.to(title, { scale: S * 0.92, duration: 58 }, at(PHASE.scatter));
  tl.to(queries, { scaleX: 1, duration: 10, stagger: 2.2, ease: 'power2.out' }, at(PHASE.scatter + 26));
  tl.to(queries.map((q) => q.querySelector('span')), { autoAlpha: 1, duration: 4, stagger: 2.2 }, at(PHASE.scatter + 33));
  tl.to(plateI, { xPercent: 0, duration: 15, ease: 'power3.out' }, at(PHASE.scatter + 3));
  tl.to(setI.lines, { yPercent: 0, duration: 11, stagger: 2.2, ease: 'power3.out' }, at(PHASE.scatter + 9));
  tl.fromTo(plateIParts.slice(1), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 9, stagger: 4.5, ease: 'power2.out' }, at(PHASE.scatter + 17));

  // C · four systems
  tl.to(queries, { autoAlpha: 0, duration: 7 }, at(PHASE.sort));
  tl.to(title, { autoAlpha: 0, duration: 12 }, at(PHASE.sort));
  stay.forEach((d) => {
    const s = sorted.get(d)!;
    tl.to(d, { x: s.x, y: s.y, rotation: 0, scale: k, duration: 30, ease: 'power3.inOut' }, at(PHASE.sort + 3 + s.order * 3.2));
  });
  tl.to(caps, { autoAlpha: 1, '--cap-rule': 1, duration: 12, stagger: 3, ease: 'power2.out' }, at(PHASE.sort + 16));

  // D · the layer (Chapter II)
  tl.to(plateI, { xPercent: -118, duration: 14, ease: 'power2.in' }, at(PHASE.layer));
  tl.to(plateII, { xPercent: 0, duration: 15, ease: 'power3.out' }, at(PHASE.layer + 8));
  tl.to(setII.lines, { yPercent: 0, duration: 11, stagger: 2.2, ease: 'power3.out' }, at(PHASE.layer + 13));
  tl.fromTo(plateIIParts.slice(1), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 9, stagger: 4, ease: 'power2.out' }, at(PHASE.layer + 24));
  tl.to(vellum, { yPercent: 0, duration: 28, ease: 'power2.out' }, at(PHASE.layer + 12));

  // E · organize · connect · activate
  tl.to(bracket, { drawSVG: '0% 100%', duration: 11, ease: 'power2.inOut' }, at(PHASE.verbs));
  tl.to(verbs[0], { opacity: 1, duration: 5 }, at(PHASE.verbs));
  tl.to(ties, { drawSVG: '0% 100%', duration: 12, stagger: 2, ease: 'power2.inOut' }, at(PHASE.verbs + 11));
  tl.to(dots, { scale: 1, duration: 3, stagger: 0.6 }, at(PHASE.verbs + 12));
  tl.to(verbs[1], { opacity: 1, duration: 5 }, at(PHASE.verbs + 11));
  tl.to(caret, { drawSVG: '0% 100%', duration: 6, ease: 'power2.out' }, at(PHASE.verbs + 26));
  tl.to(underline, { drawSVG: '0% 100%', duration: 10, ease: 'power2.inOut' }, at(PHASE.verbs + 29));
  tl.to(verbs[2], { opacity: 1, duration: 5 }, at(PHASE.verbs + 26));

  // F · the layer becomes the page of Chapter III
  const vr = layoutBox(vellum, record);
  const inset = `inset(${((vr.y / vh) * 100).toFixed(2)}% ${(((vw - vr.x - vr.w) / vw) * 100).toFixed(2)}% ${(((vh - vr.y - vr.h) / vh) * 100).toFixed(2)}% ${((vr.x / vw) * 100).toFixed(2)}%)`;
  tl.set(answer, { autoAlpha: 1, clipPath: inset }, at(PHASE.question));
  tl.fromTo(answer, { clipPath: inset }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 26, ease: 'power3.inOut', immediateRender: false }, at(PHASE.question));
  tl.to(answer.querySelectorAll('.answer__title .kicker'), { autoAlpha: 1, duration: 6 }, at(PHASE.question + 14));
  tl.to(answerTitleSet.lines, { yPercent: 0, duration: 12, stagger: 2.6, ease: 'power3.out' }, at(PHASE.question + 16));

  // G · title card lifts; the page is laid out
  tl.to(answer.querySelector('.answer__title'), { y: -0.06 * vh, autoAlpha: 0, duration: 12, ease: 'power2.in' }, at(PHASE.answer));
  tl.to([folio, flag], { autoAlpha: 1, duration: 6 }, at(PHASE.answer + 8));
  tl.fromTo(question, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 10, ease: 'power2.out', immediateRender: false }, at(PHASE.answer + 9));
  tl.to(baselines, { drawSVG: '0% 100%', duration: 10, stagger: 1.2, ease: 'power2.inOut' }, at(PHASE.answer + 12));
  tl.to(answer.querySelector('#sources-h'), { autoAlpha: 1, duration: 6 }, at(PHASE.answer + 10));
  tl.to(sources, { autoAlpha: 0.5, x: 0, duration: 10, stagger: 1.6, ease: 'power2.out' }, at(PHASE.answer + 12));

  // H · five insertions
  const span = 25;
  clauses.forEach((_clause, i) => {
    const b = PHASE.insert + i * span;
    const src = sources[i];
    const person = src.classList.contains('source--person');
    tl.to(src, { autoAlpha: 1, duration: 4 }, at(b));
    if (!person) {
      tl.to(src.querySelector('mark'), { backgroundSize: '100% 100%', duration: 5, ease: 'power2.out' }, at(b + 1));
      tl.to(leaders[i], { drawSVG: '0% 100%', duration: 8, ease: 'power2.inOut' }, at(b + 3));
      tl.to(carets[i], { drawSVG: '0% 100%', duration: 4 }, at(b + 8));
      const rider = riders[i];
      tl.set(rider, { autoAlpha: 1 }, at(b + 9));
      tl.fromTo(rider, { motionPath: { path: leaders[i], align: leaders[i], alignOrigin: [0, 0.6], start: 0, end: 0 } },
        { motionPath: { path: leaders[i], align: leaders[i], alignOrigin: [0, 0.6], start: 0, end: 1 }, duration: 9, ease: 'power1.inOut', immediateRender: false }, at(b + 9));
      tl.to(rider.querySelector('.rider__it'), { opacity: 0, duration: 1.4 }, at(b + 14));
      tl.to(rider.querySelector('.rider__ro'), { opacity: 1, duration: 1.4 }, at(b + 14));
      tl.to(clauseWords[i], { opacity: 1, duration: 1.2, stagger: 6 / clauseWords[i].length, ease: 'power1.out' }, at(b + 15.5));
      tl.to(rider, { autoAlpha: 0, duration: 3 }, at(b + 18));
      tl.to(carets[i], { autoAlpha: 0, duration: 3 }, at(b + 20));
      tl.to(leaders[i], { drawSVG: '0% 5%', duration: 4, ease: 'power2.in' }, at(b + 21));
    } else {
      // The fifth source is a person: nothing rides. The answer points out to them.
      tl.to(clauseWords[i], { opacity: 1, duration: 1.2, stagger: 6 / clauseWords[i].length, ease: 'power1.out' }, at(b + 2));
      tl.to(carets[i], { drawSVG: '0% 100%', duration: 4 }, at(b + 7));
      tl.to(leaders[i], { drawSVG: '0% 100%', duration: 9, ease: 'power2.inOut' }, at(b + 9));
      tl.to(personFrame, { drawSVG: '0% 100%', duration: 8, stagger: 2, ease: 'power2.inOut' }, at(b + 15));
    }
  });

  // I · proof: every clause tied to its source at once
  tl.to(leaders.slice(0, 4), { drawSVG: '0% 100%', opacity: 0.55, duration: 8, stagger: 1 }, at(PHASE.reveal));
  tl.to(readout, { autoAlpha: 1, duration: 5, stagger: 3 }, at(PHASE.reveal + 2));
  tl.to(qualifier, { autoAlpha: 1, duration: 8 }, at(PHASE.reveal + 6));

  // J · climax: the leaders gather into one trail
  tl.to([...leaders, ...carets], { opacity: 0, duration: 7 }, at(PHASE.climax));
  tl.to(baselines, { opacity: 0, duration: 7 }, at(PHASE.climax));
  tl.to(stet, { drawSVG: '0% 100%', duration: 14, ease: 'power2.inOut' }, at(PHASE.climax + 2));
  tl.to(stetLabel, { autoAlpha: 1, duration: 5 }, at(PHASE.climax + 8));
  tl.to({}, { duration: PHASE.end - (PHASE.climax + 16) }, at(PHASE.climax + 16));

  /* ── 10. Pin and scrub ── */
  const total = PHASE.end;
  const pxPerUnit = vh / 100;
  const st = ScrollTrigger.create({
    trigger: record,
    start: 'top top',
    end: `+=${total * pxPerUnit}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.6,
    animation: tl,
    anticipatePin: 1,
    invalidateOnRefresh: false,
    onUpdate: (self) => {
      const u = self.progress * total;
      setChapter(u < 30 ? 'title' : u < PHASE.layer ? 'scattered' : u < PHASE.question + 10 ? 'layer' : 'answer');
    },
    onLeave: () => setChapter('trail'),
    onEnterBack: () => setChapter('answer'),
  });

  const navTo = (id: string) => {
    if (!(id in NAV)) return null;
    return st.start + (NAV[id] / total) * (st.end - st.start);
  };

  return {
    st,
    navTo,
    kill: () => {
      st.kill();
      tl.kill();
      cleanups.forEach((fn) => fn());
    },
  };
}

export type { SetLines };
