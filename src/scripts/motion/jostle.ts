// Scroll jostle: while the page is scrolling, a heading's letters and its icon tiles are thrown out, each along
// its own direction (golden-angle steps, so neighbours never share one), as far as the scroll is fast and the way
// it is going; as the scrolling slows they come straight back. So whenever the page is still, everything sits
// exactly in place — aligned letters, tiles in their spots — and they only scatter while the page moves (Mousa,
// round 7). One ticker drives every group on the page, and a group only moves while it is near the screen.
import { gsap } from 'gsap';

type Opts = {
  reach: number; // furthest throw at full speed (px, or % of each element's own size with percent)
  lift?: number; // extra throw upwards when scrolling down (downwards when scrolling up)
  turn?: number; // furthest turn, degrees
  grow?: number; // furthest change of size (0.2 = ±20%)
  percent?: boolean; // move on xPercent/yPercent instead of x/y, so another motion can own x/y
  weight?: (el: HTMLElement) => number; // per-element multiplier (tile depth)
  hold?: () => boolean; // while true, another motion owns these properties: the jostle writes nothing
};
type Group = { near: boolean; amt: number; set: (a: number) => void; hold?: () => boolean };

const groups: Group[] = [];
let lastY = 0;
let running = false;

export function jostle(box: Element, els: HTMLElement[], o: Opts) {
  const rnd = gsap.utils.random;
  const parts = els.map((el, i) => {
    const w = o.weight?.(el) ?? 1;
    const a = i * 2.39996 + rnd(-0.4, 0.4);
    const r = rnd(0.55, 1) * o.reach * w;
    return {
      dx: Math.cos(a) * r,
      dy: Math.sin(a) * r * 0.6 + (o.lift ?? 0) * w,
      dr: rnd(-1, 1) * (o.turn ?? 0),
      ds: rnd(-1, 1) * (o.grow ?? 0),
      x: gsap.quickSetter(el, o.percent ? 'xPercent' : 'x', o.percent ? '' : 'px') as (v: number) => void,
      y: gsap.quickSetter(el, o.percent ? 'yPercent' : 'y', o.percent ? '' : 'px') as (v: number) => void,
      r: gsap.quickSetter(el, 'rotation', 'deg') as (v: number) => void,
      sx: o.grow ? (gsap.quickSetter(el, 'scaleX') as (v: number) => void) : null,
      sy: o.grow ? (gsap.quickSetter(el, 'scaleY') as (v: number) => void) : null,
    };
  });
  const g: Group = {
    near: false,
    amt: 0,
    hold: o.hold,
    set: (a) => parts.forEach((p) => { p.x(p.dx * a); p.y(p.dy * a); p.r(p.dr * a); if (p.sx) { const k = 1 + p.ds * Math.abs(a); p.sx(k); p.sy!(k); } }),
  };
  groups.push(g);
  new IntersectionObserver(([e]) => { g.near = e.isIntersecting; }, { rootMargin: '25% 0px' }).observe(box);
  if (!running) { running = true; lastY = scrollY; gsap.ticker.add(tick); }
  return { moving: () => g.amt !== 0 };
}

function tick(_time: number, dt: number) {
  const y = scrollY;
  const v = dt > 0 ? ((y - lastY) / dt) * 1000 : 0; // px per second
  lastY = y;
  // A single wheel notch gives a small shake; a quick scroll throws everything as far as it goes.
  const target = Math.sign(v) * Math.min(1, (Math.abs(v) / 2600) ** 0.8);
  const k = 1 - 0.84 ** (dt / 16.7);
  for (const g of groups) {
    const goal = g.near ? target : 0;
    if (goal === 0 && g.amt === 0) continue;
    g.amt += (goal - g.amt) * k;
    if (goal === 0 && Math.abs(g.amt) < 0.002) g.amt = 0;
    if (!g.hold?.()) g.set(g.amt);
  }
}
