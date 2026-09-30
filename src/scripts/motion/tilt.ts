// Cards lean towards the pointer (desktop only) and settle back when it leaves.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function tilt(cards: HTMLElement[], env: Env) {
  if (env.reduced || !env.fine) return;
  cards.forEach((card) => {
    gsap.set(card, { transformPerspective: 1200 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ry(x * 8);
      rx(-y * 6);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}
