// The background: three soft colour washes (cobalt, orange, pale cobalt) fixed behind the page. As the page
// scrolls they wander slowly along their own paths (scrubbed to the whole page), so every stretch of the page
// has a slightly different light. No pointer reaction; only transforms move, so it costs almost nothing.
// Reduced motion: the washes stay where they are.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function aura([root]: HTMLElement[], env: Env) {
  root.classList.add('is-on');
  if (env.reduced) return;
  const [a, b, c] = [...root.querySelectorAll<HTMLElement>('i')];
  const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' }, scrollTrigger: { start: 0, end: 'max', scrub: 1.6 } });
  if (a) tl.to(a, { keyframes: [{ x: '38vw', y: '28vh', scale: 1.15 }, { x: '8vw', y: '62vh', scale: 0.9 }, { x: '46vw', y: '18vh', scale: 1.1 }, { x: '14vw', y: '48vh', scale: 1 }], duration: 1 }, 0);
  if (b) tl.to(b, { keyframes: [{ x: '-34vw', y: '-12vh', scale: 0.9 }, { x: '-8vw', y: '26vh', scale: 1.2 }, { x: '-46vw', y: '4vh', scale: 1 }, { x: '-20vw', y: '-18vh', scale: 1.1 }], duration: 1 }, 0);
  if (c) tl.to(c, { keyframes: [{ x: '24vw', y: '-30vh', scale: 1.1 }, { x: '-20vw', y: '-54vh', scale: 0.95 }, { x: '10vw', y: '-20vh', scale: 1.2 }, { x: '-12vw', y: '-40vh', scale: 1 }], duration: 1 }, 0);
}
