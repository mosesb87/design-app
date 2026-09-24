import { gsap, SplitText } from './runtime';

/**
 * Headings are "set" by line — never by character. The readable original
 * stays in the accessibility tree; an aria-hidden copy is what moves.
 */
export type SetLines = { lines: HTMLElement[]; revert: () => void };

export function prepareLines(el: HTMLElement): SetLines {
  const original = el.innerHTML;
  const text = el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  const copy = document.createElement('span');
  copy.setAttribute('aria-hidden', 'true');
  copy.className = 'set-copy';
  copy.style.display = 'block';
  copy.innerHTML = original;
  el.replaceChildren(sr, copy);
  const split = SplitText.create(copy, { type: 'lines', mask: 'lines', linesClass: 'set-line', aria: 'none' });
  return {
    lines: split.lines as HTMLElement[],
    revert: () => {
      split.revert();
      el.innerHTML = original;
    },
  };
}

/** Flow headings: set once when they arrive; they stay set (print is permanent). */
export function setOnEnter(el: HTMLElement) {
  const s = prepareLines(el);
  gsap.set(s.lines, { yPercent: 104 });
  gsap.to(s.lines, {
    yPercent: 0,
    duration: 0.95,
    ease: 'settle',
    stagger: 0.08,
    scrollTrigger: { trigger: el, start: 'top 84%', once: true },
  });
  return s;
}
