// A soft light that follows the pointer across cards ([data-glow]); the CSS draws it from --gx/--gy.
// Fine pointers only; nothing to do on touch or with reduced motion.
import type { Env } from './runtime';

export default function glow(cards: HTMLElement[], env: Env) {
  if (env.reduced || !env.fine) return;
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--gx', `${Math.round(e.clientX - r.left)}px`);
      card.style.setProperty('--gy', `${Math.round(e.clientY - r.top)}px`);
    }, { passive: true });
    card.addEventListener('pointerenter', () => card.classList.add('is-glow'));
    card.addEventListener('pointerleave', () => card.classList.remove('is-glow'));
  });
}
