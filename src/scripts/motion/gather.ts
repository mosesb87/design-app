// "The latest builds" on /work/: the cards start scattered all over the screen — thrown out from their places
// in every direction (golden-angle steps, so neighbours never share one), turned and resized — and come together
// into the grid, scrubbed to scroll so scrolling up scatters them again.
// Desktop screens tall enough for the whole grid: the section holds still (a sticky stage in a taller wrapper, the
// space reserved in CSS) while they gather, so the whole grid comes together on one screen. Elsewhere each card
// gathers over its own pass up the screen. Cards are thrown mostly downwards and sideways, so while scattered
// they come up from below rather than lying over the section above. Reduced motion: the cards sit in the grid.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function gather([root]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-gather-card]')];
  if (!cards.length) return;
  const hold = root.closest<HTMLElement>('[data-gather-hold]');
  const rnd = gsap.utils.random;
  const thrown = (reachX: number, reachY: number) => cards.map((_, i) => {
    const a = i * 2.39996 + rnd(-0.35, 0.35);
    const r = rnd(0.55, 1);
    return { x: Math.cos(a) * reachX * r, y: (Math.sin(a) * 0.6 + 0.45) * reachY * r, rotation: rnd(-34, 34), scale: rnd(0.72, 1.12) };
  });
  const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (min-height: 760px)', () => {
    const from = thrown(Math.min(innerWidth * 0.42, 620), Math.min(innerHeight * 0.5, 440));
    // From when the section is three quarters of the way up the screen to near the end of the hold.
    const tl = gsap.timeline({ scrollTrigger: { trigger: hold || root, start: 'top 75%', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true } });
    cards.forEach((c, i) => tl.fromTo(c, from[i], { ...placed, ease: 'power3.out', duration: 0.62 }, (i % 4) * 0.03 + Math.floor(i / 4) * 0.07));
    return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cards, { clearProps: 'transform' }); };
  });

  mm.add('(max-width: 1023px), (max-height: 759px)', () => {
    const from = thrown(Math.min(innerWidth * 0.5, 320), 180);
    // Each card's pass is measured from the grid (layout offsets ignore the card's own transform).
    const grid = root.querySelector<HTMLElement>('.lb__grid') || root;
    const tweens = cards.map((c, i) => {
      const dy = () => c.offsetTop - grid.offsetTop;
      return gsap.fromTo(c, from[i], {
        ...placed, ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: () => `top+=${dy()} bottom`, end: () => `top+=${dy()} 62%`, scrub: 0.8, invalidateOnRefresh: true },
      });
    });
    return () => { tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); gsap.set(cards, { clearProps: 'transform' }); };
  });
}
