// Ghost words: the large outlined word behind a section slides sideways as the section passes (scrubbed).
// Reduced motion: the word simply sits there.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function ghost(words: HTMLElement[], env: Env) {
  if (env.reduced) return;
  words.forEach((word, i) => {
    const host = word.closest('section') || word.parentElement!;
    const dir = i % 2 ? 1 : -1;
    gsap.fromTo(word, { xPercent: -8 * dir }, { xPercent: 8 * dir, ease: 'none', scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
  });
}
