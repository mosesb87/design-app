// The background field: a faint grid of dots behind the page. It drifts slower than the content as you scroll
// (parallax), breathes in a slow diagonal wave, and parts around the pointer with a cobalt tint (fine pointers).
// Rooms with their own background cover it. Reduced motion: a still grid, drawn once. Hidden tabs: paused.
import type { Env } from './runtime';

const GAP = 26;
const REACH = 150;

export default function field([el]: HTMLElement[], env: Env) {
  const canvas = el as HTMLCanvasElement;
  const ctx = canvas.getContext?.('2d');
  if (!ctx) return;
  let w = 0, h = 0, dpr = 1;
  let px = -9999, py = -9999, tx = -9999, ty = -9999, energy = 0;
  let raf = 0, last = 0;
  const ink = [14, 17, 22];
  const acc = [43, 77, 224];

  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (t: number) => {
    ctx.clearRect(0, 0, w, h);
    const sy = window.scrollY || 0;
    const off = -((sy * 0.35) % GAP);
    const wave = env.reduced ? 0 : t / 1000;
    for (let y = off - GAP; y < h + GAP; y += GAP) {
      for (let x = (GAP / 2) % GAP; x < w + GAP; x += GAP) {
        let dx = x, dy = y, a = 0.075, r = 1, mix = 0;
        if (!env.reduced) a += 0.035 * Math.sin((x + y + sy * 0.35) * 0.012 - wave * 0.9);
        if (energy > 0.01) {
          const ex = x - px, ey = y - py;
          const d = Math.hypot(ex, ey);
          if (d < REACH) {
            const k = (1 - d / REACH) * energy;
            const push = k * k * 12;
            dx += (ex / (d || 1)) * push; dy += (ey / (d || 1)) * push;
            a += k * 0.45; r += k * 0.9; mix = k;
          }
        }
        const c0 = Math.round(ink[0] + (acc[0] - ink[0]) * mix), c1 = Math.round(ink[1] + (acc[1] - ink[1]) * mix), c2 = Math.round(ink[2] + (acc[2] - ink[2]) * mix);
        ctx.fillStyle = `rgba(${c0},${c1},${c2},${Math.max(0, Math.min(0.6, a)).toFixed(3)})`;
        ctx.fillRect(dx - r, dy - r, r * 2, r * 2);
      }
    }
  };

  const tick = (t: number) => {
    raf = 0;
    if (document.hidden) return;
    // Ease the pointer and its influence so the field follows softly.
    px += (tx - px) * 0.14; py += (ty - py) * 0.14;
    energy += ((tx > -999 ? 1 : 0) - energy) * 0.06;
    // Touch devices only redraw when scrolled; desktops keep the slow wave alive at ~30fps.
    if (env.fine && t - last < 33) { raf = requestAnimationFrame(tick); return; }
    last = t;
    draw(t);
    if (env.fine) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  size();
  draw(0);
  canvas.classList.add('is-on');
  if (env.reduced) {
    addEventListener('resize', () => { size(); draw(0); });
    return;
  }
  addEventListener('resize', () => { size(); kick(); });
  addEventListener('scroll', kick, { passive: true });
  document.addEventListener('visibilitychange', kick);
  if (env.fine) {
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; if (px < -999) { px = tx; py = ty; } kick(); }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { tx = -9999; ty = -9999; });
  }
  kick();
}
