// Entry: decide the environment once, start smooth scroll where appropriate, then mount only the scenes present.
import { env, startSmoothScroll, mount, ScrollTrigger } from './motion/runtime';
import chrome from './motion/chrome';
import reveals from './motion/reveals';

startSmoothScroll();
chrome([], env);
reveals([], env);

// Scenes that change layout (sticky spacers, pinned tracks) must be in place before anything measures,
// so every trigger is recomputed once all scenes have mounted, and again when fonts and images settle.
Promise.all([
  mount('[data-opening]', () => import('./motion/opening')),
  mount('[data-hero-press]', () => import('./motion/hero')),
  mount('[data-thesis]', () => import('./motion/thesis')),
  mount('[data-exploded]', () => import('./motion/exploded')),
  mount('[data-rack]', () => import('./motion/rack')),
  mount('[data-loupe]', () => import('./motion/loupe')),
  mount('[data-count]', () => import('./motion/counters')),
  mount('[data-video]', () => import('./motion/media')),
  mount('[data-contact]', () => import('./motion/contact')),
  mount('[data-filter]', () => import('./motion/filter')),
  mount('[data-scrollframe]', () => import('./motion/scrollframe')),
  mount('[data-parallax]', () => import('./motion/parallax')),
]).then(() => ScrollTrigger.refresh());

document.fonts?.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());
