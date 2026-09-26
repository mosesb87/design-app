// Entry: decide the environment once, start smooth scroll where appropriate, then mount only the scenes present.
import { env, startSmoothScroll, mount, ScrollTrigger } from './motion/runtime';
import chrome from './motion/chrome';
import reveals from './motion/reveals';

let refreshTimer = 0;
startSmoothScroll();
chrome([], env);
reveals([], env);

// Scenes that change layout (sticky spacers, pinned tracks) must be in place before anything measures,
// so every trigger is recomputed once all scenes have mounted, and again when fonts and images settle.
Promise.all([
  mount('[data-play-hero]', () => import('./motion/play-hero')),
  mount('[data-parts]', () => import('./motion/parts')),
  mount('[data-check]', () => import('./motion/check')),
  mount('[data-pop-grid]', () => import('./motion/pop')),
  mount('[data-tilt]', () => import('./motion/tilt')),
  mount('[data-exploded]', () => import('./motion/exploded')),
  mount('[data-rack]', () => import('./motion/rack')),
  mount('[data-loupe]', () => import('./motion/loupe')),
  mount('[data-count]', () => import('./motion/counters')),
  mount('[data-video]', () => import('./motion/media')),
  mount('[data-contact]', () => import('./motion/contact')),
  mount('[data-filter]', () => import('./motion/filter')),
  mount('[data-scrollframe]', () => import('./motion/scrollframe')),
]).then(refreshSoon);

document.fonts?.ready.then(refreshSoon);
addEventListener('load', refreshSoon);

// Re-measuring a long page is the heaviest thing the scripts do at start-up, so requests that arrive close
// together (scenes mounted, fonts in, page loaded) share one refresh.
function refreshSoon() {
  clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
}
