// Counted numbers: the true value is already in the HTML; motion only rolls its digits, then prints the source.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';
import { ease, dur, stagger } from './tokens';

export default function counters(els: HTMLElement[], env: Env) {
  if (env.reduced) return;
  els.forEach((el) => {
    const original = el.textContent || '';
    const host = el.closest('[data-count-host]') as HTMLElement | null;
    const after = host?.querySelectorAll<HTMLElement>('[data-count-after]') || [];
    if (after.length) gsap.set(after, { autoAlpha: 0, y: 6 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        el.setAttribute('aria-label', original);
        const frag = document.createDocumentFragment();
        const strips: { strip: HTMLElement; d: number }[] = [];
        for (const ch of original) {
          if (/\d/.test(ch)) {
            const col = document.createElement('span');
            col.className = 'odo';
            col.setAttribute('aria-hidden', 'true');
            const strip = document.createElement('span');
            strip.className = 'odo__strip';
            strip.innerHTML = '0123456789'.split('').map((d) => `<span>${d}</span>`).join('');
            col.appendChild(strip);
            frag.appendChild(col);
            strips.push({ strip, d: Number(ch) });
          } else {
            const s = document.createElement('span');
            s.setAttribute('aria-hidden', 'true');
            s.textContent = ch;
            frag.appendChild(s);
          }
        }
        el.textContent = '';
        el.appendChild(frag);
        el.classList.add('is-counting');
        const tl = gsap.timeline({
          onComplete: () => {
            el.textContent = original;
            el.classList.remove('is-counting');
            el.removeAttribute('aria-label');
          },
        });
        strips.forEach(({ strip, d }, i) => {
          tl.fromTo(strip, { yPercent: 0 }, { yPercent: -d * 10, duration: dur.count, ease: ease.register }, i * stagger.digits);
        });
        if (after.length) tl.to(after, { autoAlpha: 1, y: 0, duration: dur.line, ease: ease.register, stagger: 0.08 }, '-=0.5');
      },
    });
  });
}
