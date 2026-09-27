// "Every part in its place": scrolling down, the scattered coloured parts fly into their slots and the board is
// stamped; scrolling on, they fly back out the other way; scrolling up replays it in reverse (scrubbed over the
// board's whole pass through the screen). Reduced motion: the board is simply complete.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function parts(sections: HTMLElement[], env: Env) {
  if (env.reduced) return;
  sections.forEach((section) => {
    const board = section.querySelector<HTMLElement>('[data-parts-board]');
    const pieces = [...section.querySelectorAll<HTMLElement>('[data-piece]')];
    const stamp = section.querySelector<HTMLElement>('[data-parts-stamp]');
    if (!board || !pieces.length) return;
    const rnd = gsap.utils.random;
    // Thrown outwards from the board's centre (further for the corners), in from below and out towards the top.
    const out = (lift: number) => pieces.map((_, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      return {
        xPercent: (col - 1) * rnd(110, 190) + rnd(-50, 50),
        yPercent: (row - 1) * rnd(90, 160) + rnd(-40, 40) + lift,
        rotation: rnd(-40, 40),
        scale: rnd(0.7, 0.95),
        opacity: 0.35,
      };
    });
    const before = out(90);
    const after = out(-120);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: board,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          if (!stamp) return;
          const on = self.progress > 0.44 && self.progress < 0.62;
          if (on !== stamp.classList.contains('is-on')) {
            stamp.classList.toggle('is-on', on);
            gsap.to(stamp, on ? { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' } : { opacity: 0, scale: 0.8, y: 8, duration: 0.25 });
          }
        },
      },
    });
    pieces.forEach((p, i) => {
      const d = i * 0.012;
      tl.fromTo(p, before[i], { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power3.out', duration: 0.4 }, d);
      tl.to(p, { ...after[i], ease: 'power2.in', duration: 0.36 }, 0.62 + d);
    });
  });
}
