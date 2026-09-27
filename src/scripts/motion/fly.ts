// Headings whose letters fly ([data-fly], letters [data-fl]): as the heading comes up the screen its letters fly
// in from every direction (golden-angle steps, so neighbours never share one) and settle into the words by the
// time the heading is 60% up the screen; once it passes the top quarter they scatter again, the other way.
// Scrubbed, so scrolling back reverses both. data-fly="in" keeps only the arrival: a heading at the foot of
// the page (the contact block) can't leave the screen, so it stays in place when the page ends, and scrolling
// back up scatters it again. No fading — the letters only move — so the text
// always has its full contrast. Reduced motion: in place.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function fly(heads: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const rnd = gsap.utils.random;
  heads.forEach((h) => {
    const letters = [...h.querySelectorAll<HTMLElement>('[data-fl]')];
    if (!letters.length) return;
    const reach = Math.min(innerWidth * 0.22, 280);
    const spread = (lift: number, turn: number) => letters.map((_, i) => {
      const a = i * 2.39996 + turn + rnd(-0.4, 0.4);
      const r = rnd(0.5, 1) * reach;
      return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.6 + lift, rotation: rnd(-40, 40), scale: rnd(0.65, 1.3) };
    });
    const from = spread(60, 0), to = spread(-90, Math.PI);
    const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
    // The arrival ends when the heading is 60% up the screen, or at the page's end if the page is too short to
    // get it there, so the words are always whole once the scrolling stops.
    const settle = () => Math.min(ScrollTrigger.maxScroll(window), h.getBoundingClientRect().top + scrollY - innerHeight * 0.6);
    const inn = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top bottom', end: settle, scrub: 0.8, invalidateOnRefresh: true } });
    const out = h.dataset.fly === 'in' ? null : gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 25%', end: 'bottom top', scrub: 0.8 } });
    letters.forEach((l, i) => {
      const d = (i % 8) * 0.03;
      inn.fromTo(l, from[i], { ...placed, ease: 'power3.out', duration: 1 }, d);
      out?.fromTo(l, placed, { ...to[i], ease: 'power2.in', duration: 1, immediateRender: false }, d);
    });
  });
}
