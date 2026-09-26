// S1 — Hero press. Desktop: the pointer drives misregistration (red 0.6×, blue −0.4×); idle 2 s re-registers.
// Touch: plates drift with scroll velocity. Scrolling away, the name eases back as the thesis takes over.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';
import { ease } from './tokens';

export default function heroPress([hero]: HTMLElement[], env: Env) {
  const word = hero.querySelector<HTMLElement>('[data-hero-word]');
  const wrap = hero.querySelector<HTMLElement>('.hero__word-wrap');
  if (!word || env.reduced) return;

  // Scrolling away: the name eases back and the intro yields.
  if (wrap) {
    gsap.to(wrap, {
      scale: 0.94,
      yPercent: -6,
      transformOrigin: 'left bottom',
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }

  const start = () => {
    if (env.fine) pointerPress();
    else velocityDrift();
  };
  let started = false;
  const go = () => { if (!started) { started = true; start(); } };
  hero.addEventListener('opening:done', go, { once: true });
  setTimeout(go, 2200); // in case the opening was skipped before it could announce itself

  function pointerPress() {
    const size = () => parseFloat(getComputedStyle(word!).fontSize) || 100;
    let K = size() * 0.08;
    addEventListener('resize', () => { K = size() * 0.08; });
    const q = {
      rx: gsap.quickTo(word!, '--rx', { duration: 0.6, ease: 'power3.out' }),
      ry: gsap.quickTo(word!, '--ry', { duration: 0.6, ease: 'power3.out' }),
      bx: gsap.quickTo(word!, '--bx', { duration: 0.7, ease: 'power3.out' }),
      by: gsap.quickTo(word!, '--by', { duration: 0.7, ease: 'power3.out' }),
    };
    let idle: ReturnType<typeof setTimeout> | undefined;
    const home = () => {
      gsap.to(word!, { '--rx': '0px', '--ry': '0px', '--bx': '0px', '--by': '0px', duration: 0.9, ease: ease.register, overwrite: true, onComplete: () => word!.classList.remove('is-live') });
    };
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const dy = ((e.clientY - r.top) / r.height) * 2 - 1;
      word!.classList.add('is-live');
      q.rx(dx * 0.6 * K); q.ry(dy * 0.6 * K * 0.5);
      q.bx(-dx * 0.4 * K); q.by(-dy * 0.4 * K * 0.5);
      clearTimeout(idle);
      idle = setTimeout(home, 2000);
    });
    hero.addEventListener('pointerleave', () => { clearTimeout(idle); home(); });
  }

  function velocityDrift() {
    const s = gsap.quickTo(word!, '--s', { duration: 0.5, ease: 'power2.out' });
    let settle: ReturnType<typeof setTimeout> | undefined;
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-10, 10, self.getVelocity() / 180);
        word!.classList.add('is-live');
        s(v);
        clearTimeout(settle);
        settle = setTimeout(() => { s(0); setTimeout(() => word!.classList.remove('is-live'), 500); }, 160);
      },
    });
  }
}
