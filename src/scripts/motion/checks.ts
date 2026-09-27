// The review checks beside the /reviews/ title: scattered, then into order, then scattered again, scrubbed to
// scroll so scrolling up plays it backwards. Desktop: the header holds still for a short stretch while the cards
// sort themselves (pinned, no hijack — the extra scroll is added to the page). Phones: the same moves over the
// cards' own pass through the screen, no pin. Reduced motion: the cards simply sit in order.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function checks([root]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-check]')];
  const header = root.closest<HTMLElement>('[data-play-hero]') || root.parentElement!;
  const rnd = gsap.utils.random;
  // Two different scatters, so "scattered again" is not simply the first state rewound.
  const scatter = (spreadX: number, spreadY: number) => cards.map((_, i) => ({
    x: rnd(-spreadX, spreadX) + (i % 2 ? spreadX * 0.35 : -spreadX * 0.35),
    y: rnd(-spreadY, spreadY),
    rotation: rnd(-26, 26),
    scale: rnd(0.82, 1.04),
  }));
  const place = (from: ReturnType<typeof scatter>, to: ReturnType<typeof scatter>, tl: gsap.core.Timeline) => {
    cards.forEach((c, i) => {
      tl.fromTo(c, from[i], { x: 0, y: 0, rotation: 0, scale: 1, ease: 'power3.out', duration: 0.46 }, i * 0.012);
      tl.to(c, { ...to[i], ease: 'power2.in', duration: 0.4 }, 0.6 + i * 0.012);
    });
  };

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top top', end: '+=85%', pin: true, pinSpacing: true, scrub: 0.8, anticipatePin: 1 } });
    place(scatter(320, 220), scatter(360, 260), tl);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: 'transform' }); };
  });
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 95%', end: 'bottom top', scrub: 0.8 } });
    place(scatter(120, 90), scatter(140, 110), tl);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: 'transform' }); };
  });
}
