// Motion runtime: decides once what this device and this visitor get, then wires the scene modules.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export type Env = {
  reduced: boolean;
  fine: boolean; // fine pointer + hover
  touch: boolean;
  saveData: boolean;
  lenis: Lenis | null;
};

const root = document.documentElement;
const mqReduced = matchMedia('(prefers-reduced-motion: reduce)');
const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;

export const env: Env = {
  reduced: mqReduced.matches,
  fine: mqFine.matches,
  touch: !mqFine.matches,
  saveData: !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || ''),
  lenis: null,
};

root.classList.toggle('motion-ok', !env.reduced);
root.classList.toggle('motion-reduced', env.reduced);
root.classList.toggle('pointer-fine', env.fine);
root.classList.toggle('pointer-coarse', !env.fine);

// A preference change mid-visit is honoured on the next page view; reload keeps state simple and correct.
mqReduced.addEventListener('change', () => location.reload());

gsap.defaults({ ease: 'expo.out', duration: 0.9 });
ScrollTrigger.config({ ignoreMobileResize: true });

export function startSmoothScroll() {
  if (env.reduced || !env.fine) return null;
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  env.lenis = lenis;
  (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  return lenis;
}

export function scrollToEl(el: Element | string, offset = 0) {
  if (env.lenis) env.lenis.scrollTo(el as HTMLElement, { offset });
  else {
    const t = typeof el === 'string' ? document.querySelector(el) : el;
    t?.scrollIntoView({ behavior: env.reduced ? 'auto' : 'smooth', block: 'start' });
  }
}

// Run a module only when its hook exists on the page.
export async function mount(selector: string, loader: () => Promise<{ default: (els: HTMLElement[], env: Env) => void }>) {
  const els = [...document.querySelectorAll<HTMLElement>(selector)];
  if (!els.length) return;
  const mod = await loader();
  mod.default(els, env);
}

export { gsap, ScrollTrigger };
