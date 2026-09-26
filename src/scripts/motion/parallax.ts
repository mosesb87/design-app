// Depth: elements with data-parallax="0.12" drift against the scroll by that fraction of their travel.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function parallax(els: HTMLElement[], env: Env) {
  if (env.reduced) return;
  els.forEach((el) => {
    const k = parseFloat(el.dataset.parallax || '0.1');
    gsap.fromTo(el, { yPercent: k * 100 }, { yPercent: -k * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });
}
