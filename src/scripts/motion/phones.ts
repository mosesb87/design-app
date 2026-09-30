// The phone captures on the site cards turn on their own, apart from the desktop capture behind them: as a card
// passes up the screen its phone swings from one side to the other around its bottom edge (neighbouring cards
// swing opposite ways), scrubbed, so scrolling back reverses it. The hover swing (CSS rotate/translate in
// Sites.astro) adds to it. Reduced motion: still.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function phones(els: HTMLElement[], env: Env) {
  if (env.reduced) return;
  els.forEach((el) => {
    const dir = el.dataset.phone === 'r' ? -1 : 1;
    gsap.fromTo(el,
      { rotation: 10 * dir, yPercent: 10, z: 50, transformOrigin: '50% 100%' },
      { rotation: -8 * dir, yPercent: -6, z: 50, ease: 'none', scrollTrigger: { trigger: el.closest('li') || el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
  });
}
