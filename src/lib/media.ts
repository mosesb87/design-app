import manifest from '../data/media.json';

export type Variant = { w: number; src: string };
export type View = {
  w: number;
  h: number;
  webp: Variant[];
  avif: Variant[];
  lqip?: string;
  color?: string;
  ghostA?: string;
  ghostB?: string;
};
export type Detail = { name: string; label: string; w: number; h: number; webp: Variant[] };
export type Outline = {
  viewport: { w: number; h: number };
  background: string;
  text: string;
  fonts: { body: string; h1: string | null };
  loadedFonts: string[];
  items: { k: string; x: number; y: number; w: number; h: number }[];
};
export type MediaEntry = {
  title: string | null;
  url: string | null;
  capturedAt: string | null;
  views: Partial<Record<'desktop-hero' | 'desktop-full' | 'mobile-hero' | 'mobile-full' | 'tablet-hero', View>>;
  video?: { src: string; poster: string | null; w: number; h: number; seconds: number | null; bytes: number };
  interaction?: { src: string; poster: string | null; w: number; h: number; seconds: number | null; bytes: number };
  outline?: Outline;
  details?: Detail[];
};

const m = manifest as Record<string, MediaEntry>;

export function media(slug?: string): MediaEntry | undefined {
  return slug ? m[slug] : undefined;
}
export function view(slug: string | undefined, v: keyof MediaEntry['views']): View | undefined {
  return slug ? m[slug]?.views?.[v] : undefined;
}
export const srcset = (vs: Variant[]) => vs.map((v) => `${v.src} ${v.w}w`).join(', ');
export const largest = (vs: Variant[]) => vs[vs.length - 1];
export const pick = (vs: Variant[], target: number) => vs.find((v) => v.w >= target) || vs[vs.length - 1];

export function capturedDate(slug?: string) {
  const d = slug ? m[slug]?.capturedAt : null;
  return d ? d.slice(0, 10) : null;
}

export function domain(url?: string | null) {
  if (!url) return '';
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/\/$/, '');
    return u.hostname.replace(/^www\./, '') + (p && p !== '' ? p : '');
  } catch {
    return url;
  }
}
