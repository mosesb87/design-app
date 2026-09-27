// Hero (home and inner pages): the title's letters fly in from scattered spots, hop when touched and scatter
// away as the header scrolls off; icon tiles settle in, float gently, lean
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
  // The title's letters fly in from scattered spots, each from its own direction, and settle into the words.
  // Kept short (Mousa, round 5: the flight was too much): a little under a fifth of the screen at most, a light
  // turn, close to their own size.
  const rnd = gsap.utils.random;
  const reach = Math.min(innerWidth * 0.16, 200);
  if (letters.length) {
    tl.from(letters, {
      x: () => rnd(-reach, reach), y: () => rnd(-110, 110), rotation: () => rnd(-28, 28), scale: () => rnd(0.75, 1.25), opacity: 0,
      duration: 1.2 * k, ease: 'expo.out', stagger: { each: 0.03 * k, from: 'random' },
    }, 0);
  }
  // The icon tiles start scattered around the photo — each thrown its own way — and come into place.
  if (stickers.length) tl.from(stickers, {
    x: () => rnd(-reach, reach), y: () => rnd(-120, 120), rotation: () => rnd(-40, 40), scale: 0.6, opacity: 0,
    duration: 1.1 * k, ease: 'expo.out', stagger: { each: 0.07 * k, from: 'random' },
  }, 0.3 * k);
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

  // Letters: a short hop and a flash when touched — blue, except the one letter marked data-hot="red", which flashes red (on yPercent, so it never fights the scatter's x/y).
  letters.forEach((l) => {
    const hop = () => {
      if (gsap.isTweening(l)) return;
      gsap.fromTo(l, { yPercent: 0 }, { yPercent: -8, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 });
      l.classList.add('is-hot');
      l.style.color = l.dataset.hot === 'red' ? 'var(--red)' : 'var(--accent)';
      setTimeout(() => { l.style.color = ''; l.classList.remove('is-hot'); }, 600);
    };
    l.addEventListener('pointerenter', hop);
    l.addEventListener('pointerdown', hop);
  });

  // Pointing at the photo: the tiles scatter a little and settle back into place (x and rotation only — the
  // float owns y). Fine pointers only; touch has the press.
  if (me && env.fine) {
    let busy = false;
    me.addEventListener('pointerenter', () => {
      if (busy) return;
      busy = true;
      stickers.forEach((s) => {
        gsap.timeline({ onComplete: () => { busy = false; } })
          .to(s, { x: rnd(-34, 34), rotation: rnd(-18, 18), scale: rnd(0.9, 1.08), duration: 0.32, ease: 'power2.out' })
          .to(s, { x: 0, rotation: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.55)' });
      });
    });
  }

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

  // Scroll: as the header leaves, its letters scatter away again, each its own way; scrolling back up brings
  // them home (scrubbed). On /reviews/ the header holds still (sticky) while the checks sort themselves; its letters wait for the hold
  // to end, then leave with the header.
  const hold = hero.closest<HTMLElement>('[data-checks-hold]');
  const held = () => !!hold && getComputedStyle(hero).position === 'sticky';
  if (letters.length) {
    const out = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: () => (held() ? hold!.getBoundingClientRect().top + scrollY + hold!.offsetHeight - hero.offsetHeight : 'top top'),
        end: (self) => (held() ? self.start + hero.offsetHeight : 'bottom top'),
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    out.fromTo(letters, { x: 0, y: 0, rotation: 0, scale: 1 }, {
      x: () => rnd(-reach, reach), y: () => rnd(-140, 30), rotation: () => rnd(-24, 24), scale: () => rnd(0.8, 1.15),
      ease: 'power2.in', duration: 1, stagger: { each: 0.01, from: 'random' }, immediateRender: false,
    }, 0);
  }

  // Scroll: as the hero leaves, the tiles scatter away — each its own way, the deeper ones further — and scrolling
  // back up brings them into place again (scrubbed). The photo sinks slowly into its panel.
  holders.forEach((h) => {
    const d = Number(h.dataset.depth || 0.5);
    gsap.fromTo(h, { xPercent: 0, yPercent: 0, rotation: 0 }, {
      xPercent: () => rnd(-90, 90) * d, yPercent: () => -rnd(60, 160) * d, rotation: () => rnd(-30, 30),
      ease: 'power1.in', immediateRender: false, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
  });
  if (photo) gsap.to(photo, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
}
