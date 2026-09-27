// Tiles rise onto the page, one after another, when their grid scrolls into view.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function pop(grids: HTMLElement[], env: Env) {
  if (env.reduced) return;
  grids.forEach((grid) => {
    const items = [...grid.querySelectorAll<HTMLElement>('[data-pop]')];
    gsap.set(items, { y: 56, scale: 0.97, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08, clearProps: 'transform,opacity' }),
    });
  });
}
