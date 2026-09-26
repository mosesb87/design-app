// Recordings play only while in view, one at a time. Reduced motion / Save-Data: poster + play control.
import type { Env } from './runtime';

export default function media(els: HTMLElement[], env: Env) {
  const manual = env.reduced || env.saveData;
  const vids = els.map((wrap) => ({ wrap, v: wrap.querySelector('video') as HTMLVideoElement, btn: wrap.querySelector<HTMLButtonElement>('[data-video-toggle]') })).filter((x) => x.v);
  const ratios = new Map<HTMLVideoElement, number>();
  let current: HTMLVideoElement | null = null;
  const userPaused = new WeakSet<HTMLVideoElement>();

  const setState = (x: (typeof vids)[number], playing: boolean) => {
    x.wrap.classList.toggle('is-playing', playing);
    if (x.btn) {
      x.btn.setAttribute('aria-pressed', String(playing));
      x.btn.querySelector('[data-video-label]')!.textContent = playing ? 'Pause recording' : 'Play recording';
    }
  };

  const loadSrc = (v: HTMLVideoElement) => {
    if (v.dataset.src && !v.src) { v.src = v.dataset.src; v.load(); }
  };

  vids.forEach((x) => {
    x.v.muted = true;
    x.v.playsInline = true;
    x.v.addEventListener('play', () => setState(x, true));
    x.v.addEventListener('pause', () => setState(x, false));
    x.btn?.addEventListener('click', () => {
      loadSrc(x.v);
      if (x.v.paused) {
        userPaused.delete(x.v);
        vids.forEach((o) => o.v !== x.v && o.v.pause());
        current = x.v;
        x.v.play().catch(() => {});
      } else {
        // A pause someone chose sticks until the recording has left the screen.
        userPaused.add(x.v);
        x.v.pause();
      }
    });
  });
  if (manual) return;

  const pick = () => {
    let best: HTMLVideoElement | null = null;
    let bestR = 0.55;
    for (const [v, r] of ratios) if (r > bestR && !userPaused.has(v)) { best = v; bestR = r; }
    if (best !== current) {
      current?.pause();
      current = best;
      if (best) { loadSrc(best); best.play().catch(() => {}); }
    }
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      ratios.set(e.target as HTMLVideoElement, e.intersectionRatio);
      if (!e.isIntersecting) userPaused.delete(e.target as HTMLVideoElement);
    });
    pick();
  }, { threshold: [0, 0.25, 0.55, 0.75, 1] });
  vids.forEach((x) => io.observe(x.v));
  // Preload the next likely video shortly before it arrives.
  const pre = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { const v = e.target as HTMLVideoElement; if (v.dataset.src && !v.src) { v.preload = 'metadata'; loadSrc(v); } pre.unobserve(v); } }), { rootMargin: '600px 0px' });
  vids.forEach((x) => pre.observe(x.v));
  document.addEventListener('visibilitychange', () => { if (document.hidden) current?.pause(); else if (current && !userPaused.has(current)) current.play().catch(() => {}); });
}
