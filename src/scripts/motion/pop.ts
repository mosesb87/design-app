// Tiles pop onto the page (a little overshoot and a wobble) when their grid scrolls into view.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function pop(grids: HTMLElement[], env: Env) {
  if (env.reduced) return;
  grids.forEach((grid) => {
    const items = [...grid.querySelectorAll<HTMLElement>('[data-pop]')];
    gsap.set(items, { y: 80, scale: 0.86, opacity: 0, rotation: (i) => (i % 2 ? 9 : -9) });
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.09, clearProps: 'transform,opacity' }),
    });
  });
}
