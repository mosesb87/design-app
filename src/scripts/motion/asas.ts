// ASAS Studio spotlight on /work/:
// - the title squeezes and stretches as the section passes (wide as it arrives, narrow in the middle, wide
//   again as it leaves), letter by letter so the change runs through the word like a wave;
// - under the pointer, the letters nearest it widen and turn orange;
// - the studio capture swings in beside the recording and keeps drifting; the recording rises slightly slower
//   than the page; the glow wanders.
// The move chips and number cards scatter into place through pop.ts. Scrubbed, so scrolling up reverses it.
// Reduced motion: none of it — the title sits at its normal width.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function asas([section]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const title = section.querySelector<HTMLElement>('[data-asas-title]');
  const letters = [...section.querySelectorAll<HTMLElement>('[data-al]')];
  const studio = section.querySelector<HTMLElement>('[data-asas-studio]');
  const media = section.querySelector<HTMLElement>('[data-asas-media]');
  const glow = section.querySelector<HTMLElement>('[data-asas-glow]');

  // Width with scroll: 125 → 75 → 118, staggered across the letters.
  if (letters.length) {
    gsap.set(letters, { '--wd': 125 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
    tl.to(letters, { '--wd': 75, ease: 'power2.inOut', duration: 0.36, stagger: { each: 0.012, from: 'start' } }, 0.04)
      .to(letters, { '--wd': 118, ease: 'power2.in', duration: 0.3, stagger: { each: 0.012, from: 'end' } }, 0.62);
  }

  // Width under the pointer: letters within reach widen (up to +50) and warm to orange; they ease back on leave.
  if (title && letters.length && env.fine) {
    const to = letters.map((l) => gsap.quickTo(l, '--hw', { duration: 0.45, ease: 'power3.out' }));
    const move = (e: PointerEvent) => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const k = Math.max(0, 1 - Math.hypot(dx, dy * 1.4) / 220);
        to[i](k * 50);
        l.classList.toggle('is-hot', k > 0.55);
      });
    };
    title.addEventListener('pointermove', move);
    title.addEventListener('pointerleave', () => letters.forEach((l, i) => { to[i](0); l.classList.remove('is-hot'); }));
  }

  if (studio) {
    gsap.fromTo(studio, { xPercent: 40, yPercent: 30, rotation: 12, opacity: 0.2 }, {
      xPercent: -6, yPercent: -18, rotation: -4, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: media || section, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
    });
  }
  if (media) {
    const frame = media.firstElementChild as HTMLElement | null;
    if (frame) gsap.fromTo(frame, { y: 60 }, { y: -40, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
  }
  if (glow) {
    gsap.fromTo(glow, { xPercent: -18, yPercent: 10, rotation: -8 }, { xPercent: 12, yPercent: 40, rotation: 10, ease: 'sine.inOut', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
  }
}
