// Full-page captures inside a fixed-height frame: as the frame crosses the viewport, the page inside scrolls
// from its top to its bottom — the whole live page is read without a 9,000-pixel image on screen.
// Reduced motion / no JS: the frame is natively scrollable (keyboard focusable) instead.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function scrollframe(els: HTMLElement[], env: Env) {
  if (env.reduced) return;
  els.forEach((frame) => {
    const inner = frame.querySelector<HTMLElement>('[data-scrollframe-inner]');
    if (!inner) return;
    frame.classList.add('is-driven');
    gsap.fromTo(inner, { y: 0 }, {
      y: () => -(inner.offsetHeight - frame.clientHeight),
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top 75%', end: 'bottom 25%', scrub: 0.6, invalidateOnRefresh: true },
    });
  });
}
