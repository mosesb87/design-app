import { gsap } from './runtime';

/** Entrances that have already played this page view. Rebuilds (resize, late fonts, Motion toggle) never replay them. */
export const played = new WeakSet<Element>();

export type Counter = { play: () => void; revert: () => void };

/**
 * A statistic that counts up once from zero to its printed value (prefix and suffix kept: "$", "%", "+").
 * Assistive tech always reads the final value. The box is sized by an invisible copy of the final value,
 * and the counting copy is laid over it, so digits of any width never move the text around it.
 * Returns null once the counter has played (or if the text holds no number): the final value simply stays.
 */
export function prepareCount(el: HTMLElement): Counter | null {
  if (played.has(el)) return null;
  const text = (el.textContent ?? '').trim();
  const m = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, pre, raw, suf] = m;
  const target = parseFloat(raw.replace(/,/g, ''));
  const decimals = (raw.split('.')[1] ?? '').length;
  const grouped = raw.includes(',');

  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  const size = document.createElement('span');
  size.setAttribute('aria-hidden', 'true');
  size.style.visibility = 'hidden';
  size.textContent = text;
  const view = document.createElement('span');
  view.setAttribute('aria-hidden', 'true');
  Object.assign(view.style, { position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap' });
  el.style.position = 'relative';
  el.replaceChildren(sr, size, view);

  const state = { v: 0 };
  const format = (v: number) => {
    const n = v.toFixed(decimals);
    return grouped ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n;
  };
  const render = () => { view.textContent = `${pre}${format(state.v)}${suf}`; };
  render();

  return {
    play() {
      if (played.has(el)) return;
      played.add(el);
      gsap.to(state, { v: target, duration: 0.9, ease: 'power2.out', onUpdate: render, onComplete: () => { state.v = target; render(); } });
    },
    revert() {
      gsap.killTweensOf(state);
      el.textContent = text;
      el.style.position = '';
    },
  };
}
