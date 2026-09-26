// Site chrome: navigation behaviour, the mobile menu, the colour-bar progress and chapter grounds.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Env } from './runtime';
import { ease, dur } from './tokens';

export default function chrome(_: HTMLElement[], env: Env) {
  const header = document.querySelector<HTMLElement>('[data-nav]');
  const bar = document.querySelector<HTMLElement>('[data-progress]');

  // Nav tucks away while reading down and returns on the way up.
  if (header) {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      if (!document.documentElement.classList.contains('menu-open')) {
        const hide = y > 480 && y > last + 4;
        const show = y < last - 4 || y < 480;
        if (hide) header.classList.add('is-tucked');
        else if (show) header.classList.remove('is-tucked');
      }
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    header.addEventListener('focusin', () => header.classList.remove('is-tucked'));
    onScroll();
  }

  // Colour-control bar: how far through the proof you are.
  if (bar) {
    const fill = bar.querySelector<HTMLElement>('[data-progress-fill]');
    if (fill) {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => { fill.style.transform = `scaleX(${self.progress.toFixed(4)})`; },
      });
    }
  }

  // Chapter grounds: the whole viewport shifts ground as a chapter arrives (paper → night → paper → red).
  const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
  if (chapters.length) {
    document.documentElement.classList.add('grounds-js');
    const body = document.body;
    const base = body.dataset.ground || '';
    const setGround = (g: string) => {
      if (g) body.dataset.ground = g;
      else delete body.dataset.ground;
    };
    const active: HTMLElement[] = [];
    chapters.forEach((ch) => {
      ScrollTrigger.create({
        trigger: ch,
        start: 'top 62%',
        end: 'bottom 38%',
        onToggle: (self) => {
          const i = active.indexOf(ch);
          if (self.isActive && i < 0) active.push(ch);
          if (!self.isActive && i >= 0) active.splice(i, 1);
          const current = active[active.length - 1];
          setGround(current ? current.dataset.chapter || '' : base);
        },
      });
    });
  }

  // Mobile/compact menu.
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (toggle && menu) {
    const links = [...menu.querySelectorAll<HTMLElement>('a, button')];
    const items = [...menu.querySelectorAll<HTMLElement>('[data-menu-item]')];
    let open = false;
    const setOpen = (v: boolean) => {
      open = v;
      toggle.setAttribute('aria-expanded', String(v));
      toggle.querySelector('[data-menu-label]')!.textContent = v ? 'Close' : 'Menu';
      document.documentElement.classList.toggle('menu-open', v);
      menu.hidden = !v;
      if (v) {
        env.lenis?.stop();
        if (!env.reduced) {
          gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: dur.line, ease: ease.register });
          gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: dur.plate, ease: ease.register, stagger: 0.06, delay: 0.12 });
        }
        requestAnimationFrame(() => links[0]?.focus());
      } else {
        env.lenis?.start();
        toggle.focus();
      }
    };
    toggle.addEventListener('click', () => setOpen(!open));
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      if (e.key === 'Tab') {
        const f = links.filter((l) => l.offsetParent !== null);
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggle.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); toggle.focus(); }
      }
    });
    toggle.addEventListener('keydown', (e) => {
      if (open && e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); links[0]?.focus(); }
      if (open && e.key === 'Escape') setOpen(false);
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  // In-page anchors go through the smooth scroller when it is running.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const t = document.querySelector<HTMLElement>(id);
      if (!t) return;
      e.preventDefault();
      if (env.lenis) env.lenis.scrollTo(t, { offset: -16 });
      else t.scrollIntoView({ behavior: env.reduced ? 'auto' : 'smooth' });
      t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
      try { history.replaceState(history.state, '', id); } catch {}
    });
  });
}
