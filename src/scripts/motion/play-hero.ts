// Hero: letters pop in and bounce when touched; stickers pop in, float, follow the pointer (fine pointers),
// drift with scroll, and spin when clicked. Reduced motion: everything is simply there.
import { gsap } from 'gsap';
import type { Env } from './runtime';

const BRIGHTS = ['#ff5a36', '#ff4fa3', '#5b3df5', '#2458e6', '#19c7b8', '#8fbf13'];

export default function playHero([hero]: HTMLElement[], env: Env) {
  const letters = [...hero.querySelectorAll<HTMLElement>('[data-l]')];
  const holders = [...hero.querySelectorAll<HTMLElement>('[data-ph-sticker]')];
  const stickers = holders.map((h) => h.querySelector<HTMLElement>('[data-sticker]')!).filter(Boolean);
  const fades = hero.querySelectorAll<HTMLElement>('[data-ph-fade]');
  if (env.reduced) return;

  // Opening: the name first, then the stickers land on it.
  const seen = (() => { try { return sessionStorage.getItem('mb-hero') === '1'; } catch { return false; } })();
  try { sessionStorage.setItem('mb-hero', '1'); } catch {}
  const k = seen ? 0.6 : 1;
  const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
  tl.from(letters, { yPercent: 110, rotation: () => gsap.utils.random(-14, 14), opacity: 0, duration: 0.8 * k, stagger: 0.045 * k }, 0)
    .from(stickers, { scale: 0.25, rotation: (i) => (i % 2 ? -50 : 50), duration: 0.9 * k, ease: 'back.out(2.6)', stagger: 0.07 * k }, 0.2 * k)
    .from(fades, { y: 18, opacity: 0, duration: 0.6 * k, ease: 'power3.out', stagger: 0.08 }, 0.3 * k);

  // Float: each sticker bobs on its own rhythm.
  stickers.forEach((s, i) => {
    gsap.to(s, { y: gsap.utils.random(-14, -8), rotation: `+=${gsap.utils.random(-6, 6)}`, duration: gsap.utils.random(2.2, 3.4), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 + i * 0.13 });
  });

  // Click (or tap) a sticker: a little spin and bounce.
  holders.forEach((h) => {
    const s = h.querySelector<HTMLElement>('[data-sticker]');
    h.addEventListener('pointerdown', () => {
      gsap.fromTo(h, { scale: 0.86 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
      if (s) gsap.to(s, { rotation: '+=360', duration: 0.8, ease: 'back.out(1.6)' });
    });
  });

  // Letters: a hop and a flash of colour when touched.
  letters.forEach((l, i) => {
    const hop = () => {
      if (gsap.isTweening(l)) return;
      gsap.fromTo(l, { y: 0 }, { y: -0.12 * l.offsetHeight, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 });
      l.style.color = BRIGHTS[i % BRIGHTS.length];
      l.classList.add('is-hot');
      setTimeout(() => { l.style.color = ''; l.classList.remove('is-hot'); }, 650);
    };
    l.addEventListener('pointerenter', hop);
    l.addEventListener('pointerdown', hop);
  });

  // Pointer parallax (desktop): stickers lean towards the pointer by their depth.
  if (env.fine) {
    const movers = holders.map((h) => ({ x: gsap.quickTo(h, 'x', { duration: 0.9, ease: 'power3.out' }), y: gsap.quickTo(h, 'y', { duration: 0.9, ease: 'power3.out' }), d: Number(h.dataset.depth || 0.5) }));
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m) => { m.x(nx * 60 * m.d); m.y(ny * 40 * m.d); });
    });
    hero.addEventListener('pointerleave', () => movers.forEach((m) => { m.x(0); m.y(0); }));
  }

  // Scroll: stickers drift up at their own speeds as the hero leaves.
  holders.forEach((h) => {
    gsap.to(h, { yPercent: -80 * Number(h.dataset.depth || 0.5), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
  });
}
