// Headings whose letters scatter ([data-fly], letters [data-fl]): the words sit whole whenever the page is
// still, and scrolling jostles the letters out of place only while the page moves — each its own way (golden-angle
// steps, so neighbours never share one), as far as the scroll is fast — and they come straight back as it slows
// (jostle.ts; Mousa, round 7: aligned at rest, scattered only while scrolling). No fading — the letters only
// move — so the text always has its full contrast. Reduced motion: in place.
import { gsap } from 'gsap';
import type { Env } from './runtime';
import { jostle } from './jostle';

export default function fly(heads: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const rnd = gsap.utils.random;
  heads.forEach((h) => {
    const letters = [...h.querySelectorAll<HTMLElement>('[data-fl]')];
    if (!letters.length) return;
    // Pointing at the heading: the letters scatter a little, then settle back into the words. This rides on the
    // CSS `translate`/`rotate` (see base.css, [data-fl].is-scat), so it adds to the scroll's transform instead of
    // fighting it. Fine pointers only.
    if (env.fine) {
      let busy = 0;
      h.addEventListener('pointerenter', () => {
        if (busy) return;
        letters.forEach((l) => {
          l.style.setProperty('--sx', `${rnd(-0.18, 0.18).toFixed(2)}em`);
          l.style.setProperty('--sy', `${rnd(-0.15, 0.15).toFixed(2)}em`);
          l.style.setProperty('--sr', `${rnd(-8, 8).toFixed(0)}deg`);
          l.classList.add('is-scat');
        });
        busy = window.setTimeout(() => { letters.forEach((l) => l.classList.remove('is-scat')); busy = 0; }, 260);
      });
    }
    jostle(h, letters, { reach: Math.min(innerWidth * 0.08, 100), lift: -30, turn: 14, grow: 0.12 });
  });
}
