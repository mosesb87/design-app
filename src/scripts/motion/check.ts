// "A request is trusted by default": the three cards are dealt, the lens reads across them, the stale price is
// struck, check 04 fails, the shelf card flips to "blocked" and the verdict lands.
// Desktop: scrubbed while the section is pinned (CSS sticky). Smaller screens: plays once when in view.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';

export default function check([section]: HTMLElement[], env: Env) {
  if (env.reduced) return;
  const q = <T extends Element = HTMLElement>(s: string) => [...section.querySelectorAll<T>(s)] as unknown as T[];
  const cards = q<HTMLElement>('[data-card]');
  const lens = section.querySelector<HTMLElement>('[data-lens]');
  const fail = section.querySelector<HTMLElement>('[data-fail]');
  const stale = section.querySelector<HTMLElement>('[data-stale]');
  const flip = section.querySelector<HTMLElement>('[data-flip]');
  const faces = q<HTMLElement>('.chk__face');
  const verdict = section.querySelector<HTMLElement>('[data-verdict]');
  const track = section.querySelector<HTMLElement>('[data-check-track]');
  const stage = section.querySelector<HTMLElement>('[data-check-stage]');
  if (!cards.length || !flip || !stage || !track) return;

  const build = (scrubbed: boolean) => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: scrubbed ? 'none' : 'back.out(1.5)' } });
    const D = scrubbed ? 1 : 1; // same shape; the scrubbed version is mapped onto scroll
    tl.fromTo(cards, { y: 140, opacity: 0, rotation: (i) => [-12, 7, -6][i] ?? 0, scale: 0.88 }, { y: 0, opacity: 1, rotation: (i) => [-2, 1.5, -1][i] ?? 0, scale: 1, duration: 0.22 * D, stagger: 0.05, ease: 'back.out(1.6)' }, 0);
    if (lens && scrubbed) {
      tl.fromTo(lens, { x: () => -lens.offsetWidth, y: 0, rotation: -20, opacity: 0 }, { x: () => stage.offsetWidth * 0.12, opacity: 1, rotation: -8, duration: 0.1, ease: 'power2.out' }, 0.26)
        .to(lens, { x: () => stage.offsetWidth * 0.5 - lens.offsetWidth / 2, y: -20, rotation: 6, duration: 0.18, ease: 'power1.inOut' }, 0.36);
    }
    // The strike follows the playhead in both directions (a callback would only fire one way reliably).
    tl.eventCallback('onUpdate', () => stale?.classList.toggle('is-struck', tl.time() >= 0.5));
    tl.fromTo(fail, { scale: 0.4, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.07, ease: 'back.out(2.4)' }, 0.52)
      .fromTo(cards[1], { x: 0 }, { keyframes: { x: [-10, 10, -6, 6, 0] }, duration: 0.06, ease: 'none' }, 0.52)
      .to(flip, { rotationY: 180, duration: 0.14, ease: scrubbed ? 'power2.inOut' : 'back.out(1.2)' }, 0.6)
      .fromTo(verdict, { scale: 0.3, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.08, ease: 'back.out(2.2)' }, 0.8);
    if (lens && scrubbed) tl.to(lens, { x: () => stage.offsetWidth * 0.84 - lens.offsetWidth / 2, y: 30, rotation: 18, duration: 0.14, ease: 'power1.inOut' }, 0.6).to(lens, { opacity: 0, scale: 0.6, duration: 0.06 }, 0.78);
    tl.to({}, { duration: 0.1 }, 0.9);
    // The flip needs the faces to stack in 3D.
    gsap.set(flip, { transformStyle: 'preserve-3d' });
    return tl;
  };

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const tl = build(true);
    const st = ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.6, animation: tl, invalidateOnRefresh: true });
    return () => { st.kill(); tl.kill(); gsap.set([...cards, fail, verdict, flip, lens].filter(Boolean), { clearProps: 'all' }); };
  });
  mm.add('(max-width: 1023px)', () => {
    const tl = build(false);
    tl.timeScale(0.28); // ~3.5 s in real time
    const st = ScrollTrigger.create({ trigger: stage, start: 'top 72%', once: true, onEnter: () => tl.play() });
    return () => { st.kill(); tl.kill(); gsap.set([...cards, fail, verdict, flip].filter(Boolean), { clearProps: 'all' }); };
  });
  void faces;
}
