// The background field: a faint grid of dots behind the page. It drifts slower than the content as you scroll
// (parallax) and parts around the pointer with a cobalt tint (fine pointers). Rooms with their own background
// cover it. Cheap by design: the grid is one pattern fill, only the ~100 dots near the pointer are drawn one by
// one, and nothing runs while the page is still. Reduced motion: a still grid. Hidden tabs: nothing runs.
import type { Env } from './runtime';

const GAP = 26;
const REACH = 150;
const BASE = 'rgba(14,17,22,0.09)';

export default function field([el]: HTMLElement[], env: Env) {
  const canvas = el as HTMLCanvasElement;
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  let w = 0, h = 0, dpr = 1;
  let pattern: CanvasPattern | null = null;
  let px = -9999, py = -9999, tx = -9999, ty = -9999, energy = 0, inside = false;
  let raf = 0, lastScroll = 0;

  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // One tile, one dot, drawn at device resolution; the pattern repeats it across the screen.
    const tile = document.createElement('canvas');
    tile.width = tile.height = Math.round(GAP * dpr);
    const t = tile.getContext('2d')!;
    t.fillStyle = BASE;
    t.fillRect(Math.round((GAP / 2 - 1) * dpr), Math.round((GAP / 2 - 1) * dpr), Math.max(1, Math.round(2 * dpr)), Math.max(1, Math.round(2 * dpr)));
    pattern = ctx.createPattern(tile, 'repeat');
    pattern?.setTransform(new DOMMatrix().scale(1 / dpr));
  };

  const offset = () => -(((window.scrollY || 0) * 0.35) % GAP);

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    if (!pattern) return;
    const off = offset();
    ctx.save();
    ctx.translate(0, off);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -GAP, w, h + GAP * 2);
    ctx.restore();
    if (energy < 0.01) return;
    // Dots near the pointer: erase the pattern's copy, redraw it pushed outwards, larger and tinted.
    const x0 = Math.floor((px - REACH) / GAP), x1 = Math.ceil((px + REACH) / GAP);
    const y0 = Math.floor((py - REACH - off) / GAP), y1 = Math.ceil((py + REACH - off) / GAP);
    for (let gy = y0; gy <= y1; gy++) {
      for (let gx = x0; gx <= x1; gx++) {
        const x = gx * GAP + GAP / 2, y = gy * GAP + GAP / 2 + off;
        const ex = x - px, ey = y - py;
        const d = Math.hypot(ex, ey);
        if (d >= REACH) continue;
        const k = (1 - d / REACH) * energy;
        const push = k * k * 12;
        const r = 1 + k * 0.9;
        ctx.clearRect(x - 1.5, y - 1.5, 3, 3);
        ctx.fillStyle = `rgba(43,77,224,${(0.09 + k * 0.45).toFixed(3)})`;
        ctx.fillRect(x + (ex / (d || 1)) * push - r, y + (ey / (d || 1)) * push - r, r * 2, r * 2);
      }
    }
  };

  const tick = (t: number) => {
    raf = 0;
    if (document.hidden) return;
    px += (tx - px) * 0.16; py += (ty - py) * 0.16;
    energy += ((inside ? 1 : 0) - energy) * 0.08;
    draw();
    // Keep going only while something is moving: the pointer easing in or out, or a recent scroll.
    const moving = Math.abs(tx - px) > 0.3 || Math.abs(ty - py) > 0.3 || (energy > 0.01 && energy < 0.99) || t - lastScroll < 160;
    if (moving) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  size();
  draw();
  canvas.classList.add('is-on');
  addEventListener('resize', () => { size(); env.reduced ? draw() : kick(); });
  if (env.reduced) return;
  addEventListener('scroll', () => { lastScroll = performance.now(); kick(); }, { passive: true });
  document.addEventListener('visibilitychange', kick);
  if (env.fine) {
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; inside = true; if (px < -999) { px = tx; py = ty; } kick(); }, { passive: true });
    // Leaving the window fades the tint where it is, rather than dragging it away.
    document.documentElement.addEventListener('pointerleave', () => { inside = false; kick(); });
  }
}
