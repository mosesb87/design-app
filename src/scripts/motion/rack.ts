// S5 — The register rack. Desktop + fine pointer + motion: the track is pinned in a sticky viewport and
// scroll moves it sideways (no hijack — vertical scroll distance simply equals the track's overflow).
// Each promise widens (75% → 92% font width) as its card reaches the centre (one progress value per card).
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
    // Promises widen as their card centres.
    const promises = cards.map((c) => c.querySelector<HTMLElement>('[data-promise]')!);
    // Reserve each promise's height at its widest setting, so re-wrapping never moves the text below it.
    const reserve = () => promises.forEach((p) => {
      p.style.minHeight = '';
      const prev = p.style.fontStretch;
      p.style.fontStretch = '92%';
      p.style.minHeight = `${p.offsetHeight}px`;
      p.style.fontStretch = prev;
    });
    reserve();
    addEventListener('resize', reserve);
    const centre = () => {
      const mid = innerWidth / 2;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.min(1, Math.abs(r.left + Math.min(r.width, innerWidth * 0.45) / 2 - mid) / (innerWidth * 0.6));
        promises[i].style.fontStretch = `${(92 - d * 17).toFixed(1)}%`;
      });
    };
    ScrollTrigger.create({ trigger: spacer, start: 'top bottom', end: 'bottom top', onUpdate: centre });
    centre();
    return () => {
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
