// Floating icon tiles ([data-tiles], tiles [data-tile] with data-depth): they start scattered across the room
// and come into place as it scrolls up the screen (scrubbed, so scrolling back scatters them again); they lean
// towards the pointer by their depth and settle back when it leaves (fine pointers only); and pointing at the
// photo in the room ([data-photo-flex]) scatters them a little before they settle. The float is a CSS animation
// on `translate` and the lean is on the holder, so the scroll scatter and the hover live on the tile inside
// ([data-sticker]) and the three never fight. Reduced motion: still, in place.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function tiles(roots: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const rnd = gsap.utils.random;
  roots.forEach((root) => {
    const holders = [...root.querySelectorAll<HTMLElement>('[data-tile]')];
    if (!holders.length) return;
    const inner = holders.map((h) => h.querySelector<HTMLElement>('[data-sticker]') || h);

    // Scroll: thrown out from their places (golden-angle steps, so neighbours never share a direction) and back
    // into place by the time the room is 45% up the screen.
    const reach = Math.min(innerWidth * 0.3, 360);
    const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 45%', scrub: 0.8, invalidateOnRefresh: true } });
    inner.forEach((s, i) => {
      const a = i * 2.39996 + rnd(-0.4, 0.4);
      const r = rnd(0.5, 1) * reach;
      tl.fromTo(s, { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.6 + 80, rotation: rnd(-40, 40), scale: rnd(0.6, 1.2) }, { ...placed, ease: 'power3.out', duration: 1 }, (i % 4) * 0.05);
    });
    ScrollTrigger.refresh();

    if (!env.fine) return;

    // Hover on the photo: a small scatter, then back into place.
    const photo = root.querySelector<HTMLElement>('[data-photo-flex]');
    let busy = false;
    photo?.addEventListener('pointerenter', () => {
      if (busy || tl.progress() < 1) return;
      busy = true;
      inner.forEach((s) => {
        gsap.timeline({ onComplete: () => { busy = false; } })
          .to(s, { x: rnd(-36, 36), y: rnd(-24, 24), rotation: rnd(-18, 18), duration: 0.32, ease: 'power2.out' })
          .to(s, { ...placed, duration: 1, ease: 'elastic.out(1, 0.55)' });
      });
    });

    // Lean towards the pointer.
    const items = holders.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      r: gsap.quickTo(el, 'rotation', { duration: 1.1, ease: 'power3.out' }),
      d: Number(el.dataset.depth || 0.6),
    }));
    root.addEventListener('pointermove', (e) => {
      const b = root.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width - 0.5;
      const ny = (e.clientY - b.top) / b.height - 0.5;
      items.forEach((m) => { m.x(nx * 56 * m.d); m.y(ny * 40 * m.d); m.r(nx * 10 * m.d); });
    });
    root.addEventListener('pointerleave', () => items.forEach((m) => { m.x(0); m.y(0); m.r(0); }));
  });
}
