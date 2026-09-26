// Archive filters: pressing a category re-flows the rows (GSAP Flip) and announces the result.
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';
import { ease } from './tokens';

gsap.registerPlugin(Flip);

export default function filter([group]: HTMLElement[], env: Env) {
  const root = group.closest('[data-loupe]') || document;
  const rows = [...root.querySelectorAll<HTMLElement>('[data-row]')];
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('[data-filter-value]')];
  const status = group.querySelector<HTMLElement>('[data-filter-status]');
  const apply = (value: string, animate = true) => {
    const state = animate && !env.reduced ? Flip.getState(rows) : null;
    let shown = 0;
    rows.forEach((r) => {
      const on = value === 'all' || r.dataset.cat === value;
      r.hidden = !on;
      if (on) shown++;
    });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filterValue === value)));
    if (status) status.textContent = `${shown} ${shown === 1 ? 'entry' : 'entries'} shown`;
    if (state) Flip.from(state, { duration: 0.5, ease: ease.register, stagger: 0.012, onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: ease.register, stagger: 0.015 }), onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.2 }), onComplete: () => ScrollTrigger.refresh() });
    else ScrollTrigger.refresh();
    const url = new URL(location.href);
    if (value === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', value);
    history.replaceState(null, '', url);
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filterValue || 'all')));
  const initial = new URL(location.href).searchParams.get('filter');
  if (initial && buttons.some((b) => b.dataset.filterValue === initial)) apply(initial, false);
}
