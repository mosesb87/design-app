// Mousa's photo shrinks and extends with scroll: the panel behind him stretches wider and taller while the
// cut-out grows, then both shrink back as the section leaves (scrubbed, so scrolling up reverses it). Only the
// panel changes proportion; the photo always scales evenly, so he is never stretched. Both are anchored at
// the bottom, so he keeps standing on the panel's floor.
// Hero: starts at full size, extends over the first third of its scroll, then shrinks away.
// Elsewhere (the About page): comes in small, extends at the middle of the screen, shrinks as it leaves.
// Reduced motion: the photo keeps its size.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function photoflex(figs: HTMLElement[], env: Env) {
  if (env.reduced) return;
  figs.forEach((fig) => {
    const panel = fig.querySelector<HTMLElement>('[data-flex-panel]');
    const photo = fig.querySelector<HTMLElement>('[data-flex-photo]');
    if (!panel || !photo) return;
    const hero = fig.dataset.photoFlex === 'hero';
    gsap.set([panel, photo], { transformOrigin: '50% 100%' });
    const tl = gsap.timeline({
      defaults: { ease: 'sine.inOut' },
      scrollTrigger: { trigger: hero ? fig.closest('section') || fig : fig, start: hero ? 'top top' : 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
    const peak = hero ? 0.35 : 0.5;
    if (hero) {
      tl.to(panel, { scaleX: 1.1, scaleY: 1.04, duration: peak }, 0).to(photo, { scale: 1.08, duration: peak }, 0);
    } else {
      tl.fromTo(panel, { scaleX: 0.9, scaleY: 0.94 }, { scaleX: 1.08, scaleY: 1.03, duration: peak }, 0)
        .fromTo(photo, { scale: 0.9 }, { scale: 1.06, duration: peak }, 0);
    }
    tl.to(panel, { scaleX: 0.88, scaleY: 0.92, duration: 1 - peak }, peak).to(photo, { scale: 0.88, duration: 1 - peak }, peak);
  });
}
