// Card grids: each card flies in from a scattered spot (off to one side, below, turned) and settles into its
// place as it comes up the screen, one after another; near the top it scatters away again, and scrolling up
// plays it all backwards. Each card is scrubbed over its own pass through the screen, so long grids work the
// same as short ones, and a card is in place by the time it is most of the way up the screen.
// Cards in the same row are offset a little by column, so a row arrives left to right.
// The card is its own trigger, so its transform is reverted while positions are measured (invalidateOnRefresh).
// Reduced motion: the cards simply sit in place.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function pop(grids: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const rnd = gsap.utils.random;
  const mm = gsap.matchMedia();
  mm.add({ wide: '(min-width: 700px)', narrow: '(max-width: 699px)' }, (ctx) => {
    const { wide } = ctx.conditions as { wide: boolean };
    const reach = wide ? 1 : 0.45; // phones: smaller throws, so nothing flies far off a narrow screen
    const tls: gsap.core.Timeline[] = [];
    const els: HTMLElement[] = [];
    // Each grid is set up only as it nears the screen (within about one and a half screens), so opening a page
    // doesn't build every card's scroll animation at once.
    const setup = (grid: HTMLElement) => {
      const items = [...grid.querySelectorAll<HTMLElement>('[data-pop]')];
      if (!items.length) return;
      // Measure every card before animating any (reads first, then writes): its column in the laid-out grid,
      // and whether it sits on the page's first screen.
      const lefts = items.map((el) => Math.round(el.offsetLeft));
      const cols = [...new Set(lefts)].sort((a, b) => a - b);
      const firstScreen = items.map((el) => el.getBoundingClientRect().top + scrollY < innerHeight * 0.92);
      items.forEach((el, i) => {
        const col = Math.max(0, cols.indexOf(lefts[i]));
        const side = (col + i) % 2 ? 1 : -1;
        const d = col * 0.06;
        const from = { x: side * rnd(90, 220) * reach, y: rnd(120, 220) * (wide ? 1 : 0.7), rotation: side * rnd(8, 20), scale: rnd(0.82, 0.92) };
        const to = { x: -side * rnd(60, 180) * reach, y: -rnd(60, 150), rotation: -side * rnd(6, 16), scale: rnd(0.86, 0.94) };
        // Cards already on the first screen when the page opens start in place; they only scatter away.
        const onFirstScreen = firstScreen[i];
        const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.9, invalidateOnRefresh: true } });
        if (onFirstScreen) tl.fromTo(el, placed, { ...to, ease: 'power2.in', duration: 0.24 }, 0.78 + d / 3);
        else {
          tl.fromTo(el, from, { ...placed, ease: 'power3.out', duration: 0.34 - d / 2 }, d)
            .to(el, { ...to, ease: 'power2.in', duration: 0.24 }, 0.78 + d / 3);
        }
        tl.set({}, {}, 1.05);
        tls.push(tl);
        els.push(el);
      });
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); setup(e.target as HTMLElement); } });
    }, { rootMargin: '50% 0px 150% 0px' });
    grids.forEach((g) => io.observe(g));
    return () => { io.disconnect(); tls.forEach((tl) => { tl.scrollTrigger?.kill(); tl.kill(); }); gsap.set(els, { clearProps: 'transform' }); };
  });
}
