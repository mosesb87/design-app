import { gsap } from './runtime';

export type Counter = { play: () => void; revert: () => void };

/**
 * A statistic that counts up once from zero to its printed value (prefix and suffix kept: "$", "%", "+").
 * Assistive tech always reads the final value; the counting copy is aria-hidden and sits in a box
 * reserved at the final width, so nothing around it moves. Only used when motion is on.
 */
export function prepareCount(el: HTMLElement): Counter | null {
  const text = (el.textContent ?? '').trim();
  const m = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, pre, raw, suf] = m;
  const target = parseFloat(raw.replace(/,/g, ''));
  const decimals = (raw.split('.')[1] ?? '').length;
  const grouped = raw.includes(',');

  const width = el.getBoundingClientRect().width;
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  const view = document.createElement('span');
  view.setAttribute('aria-hidden', 'true');
  el.replaceChildren(sr, view);
  el.style.minWidth = `${Math.ceil(width)}px`;

  const state = { v: 0 };
  let played = false;
  const format = (v: number) => {
    const n = v.toFixed(decimals);
    return grouped ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n;
  };
  const render = () => { view.textContent = `${pre}${format(state.v)}${suf}`; };
  render();

  return {
    play() {
      if (played) return;
      played = true;
      gsap.to(state, { v: target, duration: 0.9, ease: 'power2.out', onUpdate: render, onComplete: () => { state.v = target; render(); } });
    },
    revert() {
      gsap.killTweensOf(state);
      el.textContent = text;
      el.style.minWidth = '';
    },
  };
}
