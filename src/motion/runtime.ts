import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

/*
 * Motion tokens. Every animation in the site draws from these so the
 * whole experience moves with one voice.
 *   settle  — things arriving at rest (reveals, resolves). Long tail, no overshoot.
 *   draw    — lines and cores being drawn. Starts decisive, lands softly.
 *   lift    — micro-interactions (hover/focus). Quick and quiet.
 *   core    — the scroll-scrubbed narrative. Linear-ish so scroll stays in control.
 */
CustomEase.create('settle', 'M0,0 C0.16,1 0.3,1 1,1');
CustomEase.create('draw', 'M0,0 C0.65,0 0.35,1 1,1');
CustomEase.create('lift', 'M0,0 C0.2,0 0,1 1,1');

export const DUR = { micro: 0.28, short: 0.6, base: 0.9, long: 1.4, epic: 2.2 } as const;

export const media = {
  reduce: '(prefers-reduced-motion: reduce)',
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 900px)',
  mobile: '(max-width: 899.98px)',
  fine: '(hover: hover) and (pointer: fine)',
};

export const prefersReducedMotion = () => window.matchMedia(media.reduce).matches;

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Smooth scrolling only where it improves the experience: motion allowed, not touch-first. */
export function initScroll() {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduced-motion');
    return null;
  }
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3.2),
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  return lenis;
}

/** In-page anchor navigation that respects smooth scroll, reduced motion and focus. */
export function scrollToTarget(target: HTMLElement, opts: { offset?: number } = {}) {
  const offset = opts.offset ?? 0;
  const moveFocus = () => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6, onComplete: moveFocus });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'auto' });
    moveFocus();
  }
}

export { gsap, ScrollTrigger, SplitText };
