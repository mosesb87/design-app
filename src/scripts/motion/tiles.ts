// Floating icon tiles ([data-tiles], tiles [data-tile] with data-depth) lean towards the pointer by their depth
// and settle back when it leaves (fine pointers only). Their float is a CSS animation on the `translate`
// property, so the lean (a GSAP transform) adds to it. Reduced motion: still.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function tiles(roots: HTMLElement[], env: Env) {
  if (env.reduced || !env.fine) return;
  roots.forEach((root) => {
    const items = [...root.querySelectorAll<HTMLElement>('[data-tile]')].map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      r: gsap.quickTo(el, 'rotation', { duration: 1.1, ease: 'power3.out' }),
      d: Number(el.dataset.depth || 0.6),
    }));
    if (!items.length) return;
    root.addEventListener('pointermove', (e) => {
      const b = root.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width - 0.5;
      const ny = (e.clientY - b.top) / b.height - 0.5;
      items.forEach((m) => { m.x(nx * 56 * m.d); m.y(ny * 40 * m.d); m.r(nx * 10 * m.d); });
    });
    root.addEventListener('pointerleave', () => items.forEach((m) => { m.x(0); m.y(0); m.r(0); }));
  });
}
