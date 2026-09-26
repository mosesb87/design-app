// S0 — Opening "Registration". The hero is readable from first paint; this only brings its plates into register.
// ≤ 1.6 s on a first visit per session, 0.6 s on return, skipped by any input, absent under reduced motion.
import { gsap } from 'gsap';
import type { Env } from './runtime';
import { ease, dur, stagger } from './tokens';

export default function opening([hero]: HTMLElement[], env: Env) {
  const word = hero.querySelector<HTMLElement>('[data-hero-word]');
  if (!word || env.reduced) { hero.dispatchEvent(new CustomEvent('opening:done')); return; }
  const crops = hero.querySelectorAll<HTMLElement>('[data-crop]');
  const proof = hero.querySelector<HTMLElement>('[data-proof]');
  const target = hero.querySelector<SVGElement>('[data-hero-target] svg');
  const seen = (() => { try { return sessionStorage.getItem('mb-opened') === '1'; } catch { return false; } })();
  try { sessionStorage.setItem('mb-opened', '1'); } catch {}

  const k = seen ? 0.25 : 1; // returning visitors get a shorter, gentler version
  const vw = innerWidth / 100;
  const fullText = proof?.dataset.proofText || proof?.textContent || '';
  word.classList.add('is-live');
  gsap.set(word, { '--rx': `${-4 * vw * k}px`, '--ry': `${-1.5 * vw * k}px`, '--bx': `${3 * vw * k}px`, '--by': `${2 * vw * k}px` });

  const tl = gsap.timeline({
    defaults: { ease: ease.register },
    onComplete: () => { word.classList.remove('is-live'); hero.dispatchEvent(new CustomEvent('opening:done')); },
  });
  tl.from(crops, { scale: 0, transformOrigin: 'center', duration: dur.line * k + 0.2, stagger: 0.06 }, 0)
    .to(word, { '--rx': '0px', '--ry': '0px', duration: dur.plate * (seen ? 0.55 : 1) }, 0.15)
    .to(word, { '--bx': '0px', '--by': '0px', duration: dur.plate * (seen ? 0.55 : 1) }, 0.15 + stagger.plates);
  if (!seen) {
    // The last millimetre: a small settle, like the press closing.
    tl.to(word, { '--rx': '1px', '--bx': '-1px', duration: 0.09, ease: 'power1.out' })
      .to(word, { '--rx': '0px', '--bx': '0px', duration: dur.settle, ease: ease.settle });
  }
  if (proof && fullText && !seen) {
    proof.setAttribute('aria-label', fullText);
    // Hold the finished slug's height while it types, so a two-line slug on a phone never pushes the hero.
    // (Set now, not in onStart: the tween's immediate render empties the slug as soon as it is created.)
    proof.style.minHeight = `${proof.offsetHeight}px`;
    const counter = { n: 0 };
    tl.fromTo(counter, { n: 0 }, {
      n: fullText.length,
      duration: 0.6,
      ease: 'none',
      onStart: () => { proof.textContent = ''; },
      onUpdate: () => { proof.textContent = fullText.slice(0, Math.round(counter.n)); },
      onComplete: () => { proof.textContent = fullText; proof.style.minHeight = ''; proof.removeAttribute('aria-label'); },
    }, 0.55);
  }
  if (target) tl.fromTo(target, { rotate: -90, scale: 1.12 }, { rotate: 0, scale: 1, duration: 0.5, transformOrigin: '50% 50%' }, seen ? 0.2 : 1.05);

  const finish = () => { if (tl.progress() < 1) tl.progress(1); off(); };
  const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  const off = () => evs.forEach((e) => removeEventListener(e, finish));
  evs.forEach((e) => addEventListener(e, finish, { passive: true, once: true }));
}
