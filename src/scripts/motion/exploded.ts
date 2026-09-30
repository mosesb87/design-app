// Case studies — exploded plates. Surface (real capture) / Structure (layout traced from the live page) /
// Data (facts) separate in depth as the section scrolls, then collapse back into the finished site.
// Desktop: the pointer orbits the stack ±12°. Reduced motion: the static exploded diagram (CSS default).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function exploded(els: HTMLElement[], env: Env) {
  if (env.reduced) return;
  els.forEach((section) => {
    const track = section.querySelector<HTMLElement>('[data-exploded-track]')!;
    const stack = section.querySelector<HTMLElement>('[data-stack]')!;
    const layers = [...section.querySelectorAll<HTMLElement>('[data-layer]')];
    const labels = [...section.querySelectorAll<HTMLElement>('[data-layer-label]')];
    if (!track || !stack || layers.length < 3) return;
    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 1024px)', mob: '(max-width: 1023px)' }, (ctx) => {
      const desk = !!ctx.conditions?.desk;
      const gap = desk ? 170 : 90;
      gsap.set(stack, { transformPerspective: 1600, rotationX: 0, rotationZ: 0 });
      layers.forEach((l, i) => gsap.set(l, { z: i }));
      gsap.set(labels, { autoAlpha: 0 });
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
      tl.to(stack, { rotationX: desk ? 56 : 50, rotationZ: desk ? -30 : -24, duration: 0.3 }, 0.05)
        .to(layers[0], { z: 0, duration: 0.3 }, 0.05)
        .to(layers[1], { z: gap, duration: 0.3 }, 0.05)
        .to(layers[2], { z: gap * 2, duration: 0.3 }, 0.05)
        .to(labels, { autoAlpha: 1, duration: 0.08, stagger: 0.04 }, 0.3)
        .to({}, { duration: 0.25 })
        .to(labels, { autoAlpha: 0, duration: 0.06 }, 0.72)
        .to(stack, { rotationX: 0, rotationZ: 0, duration: 0.22 }, 0.76)
        .to(layers[1], { z: 1, duration: 0.22 }, 0.76)
        .to(layers[2], { z: 2, duration: 0.22 }, 0.76);
      const st = ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.6, animation: tl });
      let off = () => {};
      if (desk && env.fine) {
        const rx = gsap.quickTo(stack, 'rotationY', { duration: 0.8, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          rx(((e.clientX - r.left) / r.width - 0.5) * 24 * Math.sin(Math.PI * Math.min(1, Math.max(0, st.progress * 1.4))));
        };
        section.addEventListener('pointermove', move);
        off = () => section.removeEventListener('pointermove', move);
      }
      return () => { st.kill(); off(); };
    });
  });
}
