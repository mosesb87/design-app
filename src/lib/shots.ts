// The picture for a build's card: its site capture where there is one, otherwise — for a review — the review's own
// screenshot (thumb, hero or the first sheet with one). Shared by /work/ (the latest builds) and /index/.
import { allReviews, type ReviewImage } from '../data/reviews';
import type { Entry } from '../data/work';

export function reviewShot(e: Entry): ReviewImage | null {
  if (e.category !== 'reviews') return null;
  const r = allReviews.find((x) => `review-${x.slug}` === e.slug);
  return r?.thumb || r?.hero || r?.sheets.find((s) => s.shot)?.shot || null;
}
