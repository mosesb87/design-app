// S2 — Sheet → Register → Shelf. One scroll progress value drives the whole scene (tilt, separate, check,
// verdict, collapse back into register). Without motion, the CSS default is the static exploded diagram.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function thesis([section]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const q = <T extends Element = HTMLElement>(s: string) => section.querySelector<T>(s)!;
  const qa = (s: string) => [...section.querySelectorAll<HTMLElement>(s)];
  const track = q('.thesis__track');
  const stage = q('[data-stage]');
  const sheet = q('[data-card="sheet"]');
  const register = q('[data-card="register"]');
  const shelf = q('[data-card="shelf"]');
  const steps = qa('[data-step]');
  const scans = qa('[data-scan]');
  const titleA = q('[data-title-a]');
  const titleB = q('[data-title-b]');

  const mm = gsap.matchMedia();
  mm.add({ desk: '(min-width: 1024px)', mob: '(max-width: 1023px)', short: '(max-width: 1023px) and (max-height: 820px)' }, (ctx) => {
    const desk = !!ctx.conditions?.desk;
    // Short phones (360×740) have less stage between the title and the step text: separate the plates less.
    const short = !!ctx.conditions?.short;
    const zS = desk ? 300 : short ? 120 : 200;
    const zR = desk ? 150 : short ? 60 : 100;
    const rx = desk ? 52 : 48;
    const rz = desk ? -32 : -26;

    gsap.set(stage, { transformPerspective: 1400, rotationX: 0, rotationZ: 0 });
    gsap.set(sheet, { z: 0 });
    gsap.set(register, { z: 1 });
    gsap.set(shelf, { z: 2 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    // 1 · Tilt into isometric and separate the layers.
    tl.to(stage, { rotationX: rx, rotationZ: rz, duration: 0.2, ease: 'power2.inOut' }, 0.1)
      .to(sheet, { z: zS, duration: 0.2, ease: 'power2.inOut' }, 0.1)
      .to(register, { z: zR, duration: 0.2, ease: 'power2.inOut' }, 0.1)
      // 2 · The check sweeps through the stack.
      .fromTo(scans, { left: '0%', opacity: 0 }, { left: '100%', opacity: 1, duration: 0.12, stagger: 0.02, ease: 'power1.inOut' }, 0.46)
      .to(scans, { opacity: 0, duration: 0.02 }, 0.62)
      // The stale price is struck through by a class toggle in onUpdate (pseudo-elements can't be tweened).
      .to(q('[data-sheet-ok]'), { opacity: 0, duration: 0.03 }, 0.55)
      .fromTo(q('[data-stamp-fail]'), { opacity: 0, scale: 1.35 }, { opacity: 1, scale: 1, duration: 0.04, ease: 'back.out(2)' }, 0.56)
      .fromTo(q('[data-reg-flag]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.04 }, 0.57)
      // 3 · The verdict: the promotion never reaches the shelf.
      .to(q('[data-tile-live]'), { opacity: 0, y: -8, duration: 0.05 }, 0.66)
      .fromTo(q('[data-tile-held]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.05 }, 0.68)
      .fromTo(q('[data-verdict]'), { opacity: 0, scale: 1.3, rotate: -8 }, { opacity: 1, scale: 1, rotate: -2, duration: 0.05, ease: 'back.out(2)' }, 0.74)
      // 4 · Everything collapses back into register; the heading resolves.
      .to(titleA, { opacity: 0, y: -12, duration: 0.05 }, 0.82)
      .fromTo(titleB, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05 }, 0.84)
      .to(stage, { rotationX: 0, rotationZ: 0, duration: 0.14, ease: 'power2.inOut' }, 0.86)
      .to(sheet, { z: 0, duration: 0.14, ease: 'power2.inOut' }, 0.86)
      .to(register, { z: 1, duration: 0.14, ease: 'power2.inOut' }, 0.86)
      .to({}, { duration: 0.01 }, 0.99);

    const thresholds = [0.24, 0.44, 0.62, 0.82];
    const stale = q('.card__stale');
    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      animation: tl,
      onUpdate: (self) => {
        const p = self.progress;
        let active = -1;
        thresholds.forEach((t, i) => { if (p >= t) active = i; });
        steps.forEach((s, i) => s.classList.toggle('is-active', i === active || (active === -1 && i === 0 && p > 0.12)));
        stale.classList.toggle('is-struck', p >= 0.54);
      },
    });
    return () => st.kill();
  });
}
