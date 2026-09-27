// "Every part in its place": scrolling down, the scattered coloured parts fly into their slots, the letters of
// the title fly in from all over and settle into the words, and the board is stamped; scrolling on, parts and
// letters fly back out the other way; scrolling up replays it in reverse (scrubbed over the board's whole pass
// through the screen). Desktop: title and board share one timeline. Phones: the title runs on its own pass,
// since it sits above the board. Reduced motion: everything is simply in place.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function parts(sections: HTMLElement[], env: Env) {
  if (env.reduced) return;
  sections.forEach((section) => {
    const board = section.querySelector<HTMLElement>('[data-parts-board]');
    const pieces = [...section.querySelectorAll<HTMLElement>('[data-piece]')];
    const stamp = section.querySelector<HTMLElement>('[data-parts-stamp]');
    const title = section.querySelector<HTMLElement>('[data-parts-title]');
    const letters = [...section.querySelectorAll<HTMLElement>('[data-pl]')];
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
    // Letters: spread across the text column and a little beyond, each with its own spin and size.
    const spread = (lift: number) => letters.map(() => ({
      x: rnd(-1, 1) * Math.min(innerWidth * 0.32, 420),
      y: rnd(-1, 1) * 220 + lift,
      rotation: rnd(-80, 80),
      scale: rnd(0.45, 1.35),
      opacity: 0.2,
    }));
    const lettersIn = (tl: gsap.core.Timeline, at: number, dur: number) => {
      const from = spread(160), to = spread(-200);
      letters.forEach((l, i) => {
        const d = (i % 7) * 0.01;
        tl.fromTo(l, from[i], { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power3.out', duration: dur }, at + d);
        tl.to(l, { ...to[i], ease: 'power2.in', duration: 0.34 }, 0.64 + d);
      });
    };
    const stampOn = (progress: number) => {
      if (!stamp) return;
      const on = progress > 0.44 && progress < 0.62;
      if (on !== stamp.classList.contains('is-on')) {
        stamp.classList.toggle('is-on', on);
        gsap.to(stamp, on ? { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' } : { opacity: 0, scale: 0.8, y: 8, duration: 0.25 });
      }
    };

    const before = out(90);
    const after = out(-120);
    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 1024px)', narrow: '(max-width: 1023px)' }, (ctx) => {
      const { wide } = ctx.conditions as { wide: boolean };
      const tl = gsap.timeline({
        scrollTrigger: { trigger: board, start: 'top bottom', end: 'bottom top', scrub: 0.8, onUpdate: (self) => stampOn(self.progress) },
      });
      pieces.forEach((p, i) => {
        const d = i * 0.012;
        tl.fromTo(p, before[i], { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power3.out', duration: 0.4 }, d);
        tl.to(p, { ...after[i], ease: 'power2.in', duration: 0.36 }, 0.62 + d);
      });
      // On wide screens the title sits beside the board, so it assembles on the same scroll as the parts.
      let own: gsap.core.Timeline | undefined;
      if (letters.length && title) {
        if (wide) lettersIn(tl, 0.02, 0.4);
        else {
          own = gsap.timeline({ scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
          lettersIn(own, 0, 0.42);
        }
      }
      return () => { tl.scrollTrigger?.kill(); tl.kill(); own?.scrollTrigger?.kill(); own?.kill(); gsap.set([...pieces, ...letters], { clearProps: 'transform,opacity' }); };
    });
  });
}
