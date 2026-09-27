// S5 — The register rack. Desktop + fine pointer + motion: the track is pinned in a sticky viewport and
// scroll moves it sideways (no hijack — vertical scroll distance simply equals the track's overflow).
// As each card reaches the centre its promise stretches to full width and its screenshot grows with it; away
// from the centre both squeeze together. It is a transform, so the text keeps its line breaks.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function rack([section]: HTMLElement[], env: Env) {
  if (env.reduced || !env.fine) return;
  const viewport = section.querySelector<HTMLElement>('[data-rack-viewport]')!;
  const track = section.querySelector<HTMLElement>('[data-rack-track]')!;
  const cards = [...section.querySelectorAll<HTMLElement>('[data-tool]')];

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    section.setAttribute('data-rack-sticky', '');
    // Wrap the viewport in a spacer so the sticky stage has scroll room equal to the track's overflow.
    const spacer = document.createElement('div');
    spacer.className = 'rack__spacer';
    viewport.parentNode!.insertBefore(spacer, viewport);
    spacer.appendChild(viewport);
    Object.assign(viewport.style, { position: 'sticky', top: `calc(50svh - ${track.offsetHeight / 2}px)` });
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth + parseFloat(getComputedStyle(viewport).paddingLeft));
    const setSize = () => { spacer.style.height = `${track.offsetHeight + distance()}px`; viewport.style.top = `max(var(--nav-h), calc(50svh - ${track.offsetHeight / 2}px))`; };
    setSize();

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: { trigger: spacer, start: 'top top+=' + Math.max(0, innerHeight / 2 - track.offsetHeight / 2), end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: setSize },
    });
    // Promise and screenshot squeeze and stretch together as their card nears the centre.
    const promises = cards.map((c) => c.querySelector<HTMLElement>('[data-promise]')!);
    const shots = cards.map((c) => c.querySelector<HTMLElement>('.tool__media'));
    promises.forEach((p) => { p.style.transformOrigin = '0% 50%'; p.style.willChange = 'transform'; });
    shots.forEach((m) => { if (m) { m.style.transformOrigin = '50% 50%'; m.style.willChange = 'transform'; } });
    const centre = () => {
      const mid = innerWidth / 2;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.min(1, Math.abs(r.left + Math.min(r.width, innerWidth * 0.45) / 2 - mid) / (innerWidth * 0.6));
        const k = 1 - d;
        promises[i].style.transform = `scaleX(${(0.8 + 0.2 * k).toFixed(3)})`;
        const m = shots[i];
        if (m) m.style.transform = `scale(${(0.86 + 0.14 * k).toFixed(3)})`;
      });
    };
    ScrollTrigger.create({ trigger: spacer, start: 'top bottom', end: 'bottom top', onUpdate: centre });
    centre();
    return () => {
      promises.forEach((p) => p.removeAttribute('style'));
      shots.forEach((m) => m?.removeAttribute('style'));
      tween.scrollTrigger?.kill();
      tween.kill();
      spacer.parentNode!.insertBefore(viewport, spacer);
      spacer.remove();
      viewport.removeAttribute('style');
      section.removeAttribute('data-rack-sticky');
      gsap.set(track, { clearProps: 'x' });
    };
  });
}
