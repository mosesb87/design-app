// Floating icon tiles ([data-tiles], tiles [data-tile] with data-depth): they sit straight in their spots, and
// scrolling jostles them out of place only while the page moves — whenever it is still they are back where they
// belong (jostle.ts); they lean towards the pointer by their depth and settle back when it leaves (fine pointers
// only); and pointing at a tile or the photo in the room ([data-photo-flex]) scatters them a little before they
// settle. The float is a CSS animation on `translate` and the lean is on the holder, so the scroll jostle and the
// hover live on the tile inside ([data-sticker]) and take turns. Reduced motion: still, in place.
import { gsap } from 'gsap';
import type { Env } from './runtime';
import { jostle } from './jostle';

export default function tiles(roots: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const rnd = gsap.utils.random;
  roots.forEach((root) => {
    const holders = [...root.querySelectorAll<HTMLElement>('[data-tile]')];
    if (!holders.length) return;
    const inner = holders.map((h) => h.querySelector<HTMLElement>('[data-sticker]') || h);
    placeCluster(root);

    const placed = { x: 0, y: 0, rotation: 0, scale: 1 };
    let busy = false;
    const shake = jostle(root, inner, { reach: Math.min(innerWidth * 0.12, 150), lift: -40, turn: 26, grow: 0.15, weight: (el) => Number(el.closest<HTMLElement>('[data-tile]')?.dataset.depth || 0.6), hold: () => busy });

    if (!env.fine) return;

    // Pointing at any tile (or the photo): they all scatter, then come back into place.
    const photo = root.querySelector<HTMLElement>('[data-photo-flex]');
    const scatter = () => {
      if (busy || shake.moving()) return;
      busy = true;
      inner.forEach((s) => {
        gsap.timeline({ onComplete: () => { busy = false; } })
          .to(s, { x: rnd(-70, 70), y: rnd(-50, 50), rotation: rnd(-28, 28), duration: 0.32, ease: 'power2.out' })
          .to(s, { ...placed, duration: 1, ease: 'elastic.out(1, 0.55)' });
      });
    };
    holders.forEach((h) => h.addEventListener('pointerenter', scatter));
    photo?.addEventListener('pointerenter', scatter);

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

// The contact room's grid of tiles ([data-tile-cluster]) sits with its top edge level with the top of Mousa's head,
// centred in the space between the end of the words ([data-cluster-edge]) and the photo, whatever the screen width: measured from the layout (untransformed
// offsets, so the photo's scroll and hover scaling don't move it), and again when the page resizes or its fonts
// settle. Below the desktop layout the CSS positions rule.
function placeCluster(root: HTMLElement) {
  const cluster = root.querySelector<HTMLElement>('[data-tile-cluster]');
  const fig = root.querySelector<HTMLElement>('[data-photo-flex]');
  const img = fig?.querySelector<HTMLImageElement>('img');
  if (!cluster || !fig || !img) return;
  const place = () => {
    if (!matchMedia('(min-width: 1024px)').matches) { cluster.style.top = ''; cluster.style.right = ''; return; }
    let top = 0, left = 0;
    for (let el: HTMLElement | null = fig; el && el !== root; el = el.offsetParent as HTMLElement | null) { top += el.offsetTop; left += el.offsetLeft; }
    const headTop = top + fig.offsetHeight - img.offsetHeight;
    // The right edge of the words, at the room's scale: the widest of the title and the line under it.
    let textRight = 0;
    root.querySelectorAll<HTMLElement>('[data-cluster-edge]').forEach((t) => {
      let l = 0;
      for (let el: HTMLElement | null = t; el && el !== root; el = el.offsetParent as HTMLElement | null) l += el.offsetLeft;
      textRight = Math.max(textRight, l + t.offsetWidth);
    });
    const centre = (textRight + left) / 2;
    cluster.style.top = `${Math.round(headTop)}px`;
    cluster.style.right = `${Math.round(root.clientWidth - centre - cluster.offsetWidth / 2)}px`;
  };
  place();
  if (!img.complete) img.addEventListener('load', place, { once: true });
  document.fonts?.ready.then(place);
  addEventListener('load', place);
  addEventListener('resize', place);
}
