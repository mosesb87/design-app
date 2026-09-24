export type Box = { x: number; y: number; w: number; h: number };

/**
 * Position of an element relative to an ancestor, in *layout* coordinates.
 * Uses offset chains rather than getBoundingClientRect so that transforms
 * (camera scale, pin offsets, Lenis) never distort the measurement.
 */
export function layoutBox(el: HTMLElement, root: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    const parent = node.offsetParent as HTMLElement | null;
    if (!parent) break;
    // Stop if we passed the root (root must be positioned for this to be exact).
    if (!root.contains(parent) && parent !== root) {
      const r = root.getBoundingClientRect();
      const p = parent.getBoundingClientRect();
      x += p.left - r.left;
      y += p.top - r.top;
      break;
    }
    node = parent;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/** Visual (transformed) box relative to a root; use only when layout is at rest. */
export function visualBox(el: Element, root: Element): Box {
  const r = el.getBoundingClientRect();
  const o = root.getBoundingClientRect();
  return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
}

/** Client rects of an inline element's line boxes, relative to a root. */
export function lineRects(el: Element, root: Element): Box[] {
  const o = root.getBoundingClientRect();
  return Array.from(el.getClientRects()).map((r) => ({ x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height }));
}

/** An orthogonal polyline — horizontal/vertical runs with square elbows. */
export function ortho(points: Array<[number, number]>): string {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join(' ');
}

export const round = (n: number) => Math.round(n * 2) / 2; // snap to .5px so hairlines stay crisp

export function svgEl<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

export function sizeSvg(svg: SVGSVGElement, w: number, h: number) {
  svg.setAttribute('viewBox', `0 0 ${round(w)} ${round(h)}`);
  svg.setAttribute('width', String(round(w)));
  svg.setAttribute('height', String(round(h)));
  // Inline size wins over stylesheet percentages, so user units always equal CSS pixels (no letterboxing).
  svg.style.width = `${round(w)}px`;
  svg.style.height = `${round(h)}px`;
}

/** Deterministic pseudo-random numbers so every render (and print) matches. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let t = 0;
  return (...args: Parameters<T>) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
}
