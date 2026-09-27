// Mousa's photo shrinks and extends with scroll: the panel behind him stretches wider and taller while the
// cut-out grows, then both shrink back (scrubbed, so scrolling up reverses it). Only the panel changes
// proportion; the photo always scales evenly, so he is never stretched. Both are anchored at the bottom, so he
// keeps standing on the panel's floor. On top of this the figure breathes slowly (CSS, hover.css).
// Hero ("hero"): starts at full size, extends over the first third of its scroll, then shrinks away.
// Contact block ("end"): it sits at the foot of the page, so it never leaves the screen — it comes in small,
// extends past full size and settles back to full size as the page reaches its end.
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
    const mode = fig.dataset.photoFlex || 'mid';
    gsap.set([panel, photo], { transformOrigin: '50% 100%' });
    const trigger = mode === 'hero' ? fig.closest('section') || fig : fig;
    const tl = gsap.timeline({
      defaults: { ease: 'sine.inOut' },
      scrollTrigger: {
        trigger,
        start: mode === 'hero' ? 'top top' : 'top bottom',
        end: mode === 'end' ? 'max' : 'bottom top',
        scrub: 0.8,
      },
    });
    if (mode === 'hero') {
      tl.to(panel, { scaleX: 1.16, scaleY: 1.07, duration: 0.35 }, 0).to(photo, { scale: 1.13, duration: 0.35 }, 0)
        .to(panel, { scaleX: 0.8, scaleY: 0.86, duration: 0.65 }, 0.35).to(photo, { scale: 0.8, duration: 0.65 }, 0.35);
    } else if (mode === 'end') {
      tl.fromTo(panel, { scaleX: 0.78, scaleY: 0.84 }, { scaleX: 1.14, scaleY: 1.06, duration: 0.6 }, 0)
        .fromTo(photo, { scale: 0.78 }, { scale: 1.12, duration: 0.6 }, 0)
        .to(panel, { scaleX: 1, scaleY: 1, duration: 0.4 }, 0.6).to(photo, { scale: 1, duration: 0.4 }, 0.6);
    } else {
      tl.fromTo(panel, { scaleX: 0.82, scaleY: 0.88 }, { scaleX: 1.14, scaleY: 1.06, duration: 0.5 }, 0)
        .fromTo(photo, { scale: 0.82 }, { scale: 1.12, duration: 0.5 }, 0)
        .to(panel, { scaleX: 0.8, scaleY: 0.86, duration: 0.5 }, 0.5).to(photo, { scale: 0.8, duration: 0.5 }, 0.5);
    }
  });
}
