// Archive "proof loupe": hovering (or focusing) a row opens its capture through an expanding circular lens
// that follows the pointer with lerp 0.15. Keyboard focus anchors the lens beside the row.
import { gsap } from 'gsap';
import type { Env } from './runtime';
import { ease } from './tokens';

export default function loupe(els: HTMLElement[], env: Env) {
  if (!env.fine) return;
  els.forEach((root) => {
    const lens = root.querySelector<HTMLElement>('[data-loupe-lens]');
    const img = root.querySelector<HTMLImageElement>('[data-loupe-img]');
    if (!lens || !img) return;
    const rows = [...root.querySelectorAll<HTMLElement>('[data-row][data-preview]')];
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let open = false;
    let raf = 0;
    const w = () => lens.offsetWidth;
    const h = () => lens.offsetHeight;
    const loop = () => {
      const k = env.reduced ? 1 : 0.15;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      lens.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      raf = open || Math.abs(target.x - pos.x) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const place = (x: number, y: number) => {
      // Keep the lens on screen, offset from the pointer so it never covers the row being read.
      const lx = Math.min(innerWidth - w() - 16, Math.max(16, x + 28));
      const ly = Math.min(innerHeight - h() - 16, Math.max(16, y - h() / 2));
      target.x = lx; target.y = ly;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const show = (row: HTMLElement) => {
      const src = row.dataset.preview!;
      if (img.getAttribute('src') !== src) img.src = src;
      if (!open) {
        open = true;
        pos.x = target.x; pos.y = target.y;
        gsap.to(lens, { clipPath: 'circle(72% at 50% 50%)', duration: env.reduced ? 0.01 : 0.55, ease: ease.register, overwrite: true });
      }
    };
    const hide = () => {
      open = false;
      gsap.to(lens, { clipPath: 'circle(0% at 50% 50%)', duration: env.reduced ? 0.01 : 0.35, ease: ease.exit, overwrite: true });
    };
    rows.forEach((row) => {
      row.addEventListener('pointerenter', (e) => { place(e.clientX, e.clientY); show(row); });
      row.addEventListener('pointermove', (e) => place(e.clientX, e.clientY));
      row.addEventListener('pointerleave', hide);
      row.addEventListener('focusin', () => {
        const r = row.getBoundingClientRect();
        place(Math.min(r.left + r.width * 0.55, innerWidth - w() - 40), r.top + r.height / 2);
        show(row);
      });
      row.addEventListener('focusout', hide);
    });
    addEventListener('scroll', () => { if (open) hide(); }, { passive: true });
  });
}
