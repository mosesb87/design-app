// "The index." on /work/: the cards start thrown out of their places — sideways (golden-angle steps, so neighbours
// never share one), always downwards, turned and resized a little — and come together into the grid, scrubbed to
// scroll: each card gathers over its own pass up the screen (scrolling back before it has landed throws it out
// again). Once a card has landed it stays put, so the grid is always tidy when you come back to it. Cards are only
// ever thrown down, so while scattered they come up from below and never lie over the title and button above
// them. The scatter is set up only once the section is within about a screen of view, so until then the cards
// simply sit in the grid (nothing overlaps while nobody can see it). A card whose pass is already behind you when
// it is set up (a reload or a link that lands partway down the page) goes straight to its place.
// Reduced motion: the cards sit in the grid.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function gather([root]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-gather-card]')];
  if (!cards.length) return;
  const hold = root.closest<HTMLElement>('[data-gather-hold]');
  const grid = root.querySelector<HTMLElement>('.lb__grid') || root;
  const rnd = gsap.utils.random;
  const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
  const io = new IntersectionObserver((seen) => {
    if (!seen.some((s) => s.isIntersecting)) return;
    io.disconnect();
    setup();
  }, { rootMargin: '0px 0px 110% 0px' });
  io.observe(hold || root);

  // A card's top within the grid, from layout offsets (these ignore the card's own transform).
  const within = (c: HTMLElement) => {
    let y = 0;
    for (let n: HTMLElement | null = c; n && n !== grid; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
    return y;
  };

  function passes(throwX: number, drop: [number, number], turn: number, shrink: number) {
    const from = cards.map((_, i) => ({ x: Math.cos(i * 2.39996) * throwX, y: rnd(drop[0], drop[1]), rotation: rnd(-turn, turn), scale: rnd(shrink, 1) }));
    const tweens = cards.map((c, i) => gsap.fromTo(c, from[i], {
      ...placed, ease: 'power3.out',
      scrollTrigger: {
        trigger: grid, start: () => `top+=${within(c)} bottom`, end: () => `top+=${within(c)} 62%`, scrub: 0.8, invalidateOnRefresh: true,
        // Uses self.animation, not the tween's variable: when the pass is already behind you, this runs while
        // the tween is still being created.
        onLeave: (self) => { const a = self.animation; self.kill(false, true); a?.progress(1); },
      },
    }));
    return () => { tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); gsap.set(cards, { clearProps: 'transform' }); };
  }

  function setup() {
    const mm = gsap.matchMedia();
    // Four columns: a wider throw and a firmer turn.
    mm.add('(min-width: 700px)', () => passes(Math.min(innerWidth * 0.07, 110), [110, 190], 16, 0.86));
    // Two columns: a small throw, mostly from below with a light turn, so cards don't pile onto each other
    // (one card's caption over another's screenshot) while they gather or leave.
    mm.add('(max-width: 699px)', () => passes(Math.min(innerWidth * 0.18, 70), [90, 150], 14, 0.9));
  }
}
