// Reveal vocabulary: text lines rise through masks; image plates open; hairlines draw; rows arrive in sequence.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { Env } from './runtime';
import { ease, dur, stagger, revealStart } from './tokens';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function reveals(_: HTMLElement[], env: Env) {
  if (env.reduced) return;

  // 1 · Lines rise through masks (once), then the split is reverted so the DOM is clean text again.
  // Split only once the web fonts are in, so line breaks (and the block's height) match the final text.
  const splitLines = () => document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((host) => {
    // Lock the block's height while its lines are split, so the reveal can never move the layout (CLS 0).
    const targets = host.children.length && [...host.children].every((c) => c.tagName === 'P') ? ([...host.children] as HTMLElement[]) : [host];
    const lock = () => { host.style.height = `${host.offsetHeight}px`; };
    const unlock = () => { host.style.height = ''; };
    lock();
    let pending = targets.length;
    targets.forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        // Lines keep whole words, so assistive tech reads the paragraph as it is — and aria-label isn't
        // permitted on <p> anyway. The split is reverted once the lines have risen.
        aria: 'none',
        linesClass: 'split-line',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 108,
            duration: dur.line,
            ease: ease.register,
            stagger: stagger.lines,
            scrollTrigger: { trigger: host, start: revealStart, once: true },
            onComplete: () => { self.revert(); if (--pending === 0) unlock(); },
          });
        },
      });
    });
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(splitLines);

  // 3 · Image plates: ghosts converge while the frame opens.
  document.querySelectorAll<HTMLElement>('[data-plate]').forEach((plate) => {
    if (plate.hasAttribute('data-plate-static')) return;
    const img = plate.querySelector<HTMLElement>('.plate__img');
    const ga = plate.querySelector<HTMLElement>('.plate__ghost--a');
    const gb = plate.querySelector<HTMLElement>('.plate__ghost--b');
    const tl = gsap.timeline({ paused: true });
    if (img) tl.fromTo(img, { clipPath: 'inset(14% 0% 0% 0%)', scale: 1.04 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: dur.plate * 1.2, ease: ease.register }, 0);
    if (ga) tl.fromTo(ga, { x: -22, y: -12, autoAlpha: 0.9 }, { x: 0, y: 0, autoAlpha: 0, duration: dur.plate, ease: ease.register }, 0.05);
    if (gb) tl.fromTo(gb, { x: 20, y: 14, autoAlpha: 0.9 }, { x: 0, y: 0, autoAlpha: 0, duration: dur.plate, ease: ease.register }, 0.05 + stagger.plates);
    ScrollTrigger.create({ trigger: plate, start: 'top 85%', once: true, onEnter: () => tl.play() });
  });

  // 4 · Hairlines draw left → right.
  document.querySelectorAll<HTMLElement>('[data-draw]').forEach((el) => {
    gsap.from(el, { scaleX: 0, duration: dur.line, ease: ease.register, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  // 5 · Rows arrive in sequence.
  document.querySelectorAll<HTMLElement>('[data-rows]').forEach((list) => {
    const rows = [...list.children] as HTMLElement[];
    gsap.from(rows, { y: 18, autoAlpha: 0, duration: dur.line, ease: ease.register, stagger: stagger.rows, scrollTrigger: { trigger: list, start: revealStart, once: true } });
  });
}
