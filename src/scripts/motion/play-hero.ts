// Hero (home and inner pages): letters rise in and hop when touched; icon tiles settle in, float gently, lean
// towards the pointer (fine pointers) and drift with scroll; on the home page the photo leans with the pointer
// and rises slower than the page. Reduced motion: everything is simply there.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function playHero([hero]: HTMLElement[], env: Env) {
  const letters = [...hero.querySelectorAll<HTMLElement>('[data-l]')];
  const holders = [...hero.querySelectorAll<HTMLElement>('[data-ph-sticker]')];
  const stickers = holders.map((h) => h.querySelector<HTMLElement>('[data-sticker]')!).filter(Boolean);
  const fades = hero.querySelectorAll<HTMLElement>('[data-ph-fade]');
  const me = hero.querySelector<HTMLElement>('[data-ph-me]');
  // The photo's frame clips it to the panel; motion is applied to the image inside the frame, slightly enlarged,
  // so a lean never shows the panel behind its edges.
  const photo = hero.querySelector<HTMLElement>('[data-ph-photo] img');
  if (env.reduced) return;

  // Opening: the name first, then the photo and the tiles.
  const seen = (() => { try { return sessionStorage.getItem('mb-hero') === '1'; } catch { return false; } })();
  try { sessionStorage.setItem('mb-hero', '1'); } catch {}
  const k = seen ? 0.6 : 1;
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (letters.length) tl.from(letters, { yPercent: 105, opacity: 0, duration: 1 * k, stagger: 0.035 * k }, 0);
  if (stickers.length) tl.from(stickers, { scale: 0.7, opacity: 0, y: 16, duration: 0.9 * k, stagger: 0.08 * k }, 0.35 * k);
  if (fades.length) tl.from(fades, { y: 16, opacity: 0, duration: 0.7 * k, ease: 'power3.out', stagger: 0.08 }, 0.3 * k);
  // The photo rises without fading: it is the page's largest paint, and a fade would hold that paint back.
  if (me) tl.from(me, { y: 40, duration: 1.1 * k }, 0.15 * k);
  if (photo) gsap.set(photo, { scale: 1.05, transformOrigin: '50% 100%' });

  // Float: each tile drifts slowly on its own rhythm.
  stickers.forEach((s, i) => {
    gsap.to(s, { y: gsap.utils.random(-8, -4), duration: gsap.utils.random(2.8, 3.8), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 + i * 0.13 });
  });

  // Press a tile: a small, quick settle.
  holders.forEach((h) => {
    h.addEventListener('pointerdown', () => gsap.fromTo(h, { scale: 0.94 }, { scale: 1, duration: 0.5, ease: 'power3.out' }));
  });

  // Letters: a short hop and an accent flash when touched.
  letters.forEach((l) => {
    const hop = () => {
      if (gsap.isTweening(l)) return;
      gsap.fromTo(l, { y: 0 }, { y: -0.08 * l.offsetHeight, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 });
      l.classList.add('is-hot');
      l.style.color = 'var(--accent)';
      setTimeout(() => { l.style.color = ''; l.classList.remove('is-hot'); }, 600);
    };
    l.addEventListener('pointerenter', hop);
    l.addEventListener('pointerdown', hop);
  });

  // Pointer parallax (desktop): tiles lean towards the pointer by their depth; the photo leans a little.
  if (env.fine) {
    const movers = holders.map((h) => ({ x: gsap.quickTo(h, 'x', { duration: 0.9, ease: 'power3.out' }), y: gsap.quickTo(h, 'y', { duration: 0.9, ease: 'power3.out' }), d: Number(h.dataset.depth || 0.5) }));
    const px = photo ? gsap.quickTo(photo, 'x', { duration: 1.1, ease: 'power3.out' }) : null;
    const pr = photo ? gsap.quickTo(photo, 'rotation', { duration: 1.1, ease: 'power3.out' }) : null;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m) => { m.x(nx * 44 * m.d); m.y(ny * 30 * m.d); });
      px?.(nx * 16);
      pr?.(nx * 1.2);
    });
    hero.addEventListener('pointerleave', () => { movers.forEach((m) => { m.x(0); m.y(0); }); px?.(0); pr?.(0); });
  }

  // Scroll: tiles drift up at their own speeds as the hero leaves; the photo sinks slowly into its panel.
  holders.forEach((h) => {
    gsap.to(h, { yPercent: -60 * Number(h.dataset.depth || 0.5), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
  });
  if (photo) gsap.to(photo, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
}
