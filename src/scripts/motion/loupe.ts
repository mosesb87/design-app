// The archive preview: hovering (or focusing) a row opens a small browser window beside the pointer, showing that
// project. Where a full-page capture exists, the page scrolls inside the window — down, a pause, back up — on a
// loop, like a screen recording; otherwise its first screen drifts in slowly. The window follows the pointer with
// lerp 0.15; keyboard focus anchors it beside the row. Reduced motion: a still first screen, no following.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function loupe(els: HTMLElement[], env: Env) {
  if (!env.fine) return;
  els.forEach((root) => {
    const lens = root.querySelector<HTMLElement>('[data-loupe-lens]');
    const img = root.querySelector<HTMLImageElement>('[data-loupe-img]');
    const url = root.querySelector<HTMLElement>('[data-loupe-url]');
    const view = img?.parentElement;
    if (!lens || !img || !view) return;
    const rows = [...root.querySelectorAll<HTMLElement>('[data-row][data-preview]')];
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let open = false;
    let raf = 0;
    let current: HTMLElement | null = null;
    let run: gsap.core.Timeline | gsap.core.Tween | null = null;
    const w = () => lens.offsetWidth;
    const h = () => lens.offsetHeight;

    const loop = () => {
      const k = env.reduced ? 1 : 0.15;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      lens.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      raf = open || Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const place = (x: number, y: number, row?: HTMLElement) => {
      // Keep the window on screen and clear of the project's name: to the right of the title cell (or of the
      // pointer, whichever is further), so it never covers the row being read.
      const title = row?.querySelector('th')?.getBoundingClientRect();
      const lx = Math.min(innerWidth - w() - 16, Math.max(16, x + 32, title ? title.right - 40 : 0));
      const ly = Math.min(innerHeight - h() - 16, Math.max(16, y - h() / 2));
      target.x = lx; target.y = ly;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // The scroll inside the window: travel = the page's height beyond the window, at a steady reading pace.
    const play = (row: HTMLElement) => {
      run?.kill();
      gsap.set(img, { y: 0, scale: 1 });
      if (env.reduced) return;
      const ratio = Number(row.dataset.ratio || 0);
      if (row.dataset.full && ratio) {
        const travel = () => Math.max(0, view.clientWidth * ratio - view.clientHeight);
        const secs = Math.min(14, Math.max(4, travel() / 240));
        run = gsap.timeline({ repeat: -1, delay: 0.5, repeatDelay: 0.6 })
          .to(img, { y: () => -travel(), duration: secs, ease: 'sine.inOut' })
          .to(img, { y: 0, duration: secs * 0.45, ease: 'power2.inOut' }, `+=0.9`);
      } else {
        run = gsap.fromTo(img, { scale: 1 }, { scale: 1.08, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' });
      }
    };

    const show = (row: HTMLElement) => {
      if (current !== row) {
        current = row;
        const src = row.dataset.full || row.dataset.preview!;
        if (url) url.textContent = row.dataset.host || '';
        run?.kill();
        gsap.set(img, { y: 0, scale: 1 });
        // Show the first screen at once; swap to the full page when it has loaded, then start the scroll.
        if (img.getAttribute('src') !== src) {
          if (row.dataset.full && row.dataset.preview) img.src = row.dataset.preview;
          const next = new Image();
          next.decoding = 'async';
          next.src = src;
          next.decode().catch(() => {}).then(() => { if (current === row) { img.src = src; play(row); } });
        } else play(row);
      }
      if (!open) {
        open = true;
        pos.x = target.x; pos.y = target.y;
        lens.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
        gsap.fromTo(lens, { autoAlpha: 0, scale: 0.92, y: 12 }, { autoAlpha: 1, scale: 1, y: 0, duration: env.reduced ? 0.01 : 0.45, ease: 'expo.out', overwrite: true, transformOrigin: '0% 50%' });
      }
    };
    const hide = () => {
      open = false;
      current = null;
      run?.kill();
      gsap.to(lens, { autoAlpha: 0, scale: 0.96, duration: env.reduced ? 0.01 : 0.25, ease: 'power3.in', overwrite: true });
    };
    rows.forEach((row) => {
      row.addEventListener('pointerenter', (e) => { place(e.clientX, e.clientY, row); show(row); });
      row.addEventListener('pointermove', (e) => { place(e.clientX, e.clientY, row); if (!open) show(row); });
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
