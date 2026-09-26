// "Every part in its place": scattered parts fly into their slots as the board scrolls into view (scrubbed),
// and the board is stamped when the last one lands. Reduced motion: the board is simply complete.
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
    pieces.forEach((p, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      // Thrown outwards from the board's centre, a little further for the corners.
      gsap.set(p, { xPercent: (col - 1) * rnd(90, 170) + rnd(-40, 40), yPercent: (row - 1) * rnd(90, 160) + rnd(-50, 50) - 60, rotation: rnd(-70, 70), scale: rnd(0.7, 1.1) });
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: board,
        start: 'top 90%',
        end: 'center 55%',
        scrub: 0.8,
        onUpdate: (self) => {
          if (!stamp) return;
          const on = self.progress > 0.97;
          if (on !== stamp.classList.contains('is-on')) {
            stamp.classList.toggle('is-on', on);
            gsap.to(stamp, on ? { opacity: 1, scale: 1, rotation: 6, duration: 0.6, ease: 'back.out(2.4)' } : { opacity: 0, scale: 0.6, duration: 0.2 });
          }
        },
      },
    });
    tl.to(pieces, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, ease: 'back.out(1.4)', stagger: { each: 0.06, from: 'random' }, duration: 1 });
  });
}
