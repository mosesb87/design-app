// The rubric behind every review: ShelfMark's five pillars and 29 public-page checks, as scored on the Michigan
// Storefront Benchmark (Vol. 1, 2026-09-28) and on every store reviewed since. Source of truth: the review engine's
// shelfmark/model.py — keep the two identical.
export type Pillar = { id: string; name: string; weight: number; question: string };
export type Check = { id: string; name: string; pillar: string; two: string; one: string; zero: string };
export const pillars: Pillar[] = [
  { id: 'F', name: 'Findability', weight: 25, question: "Can search engines and shoppers find the store and its products?" },
  { id: 'C', name: 'Catalog', weight: 30, question: "Is the product data complete enough to sell from?" },
  { id: 'B', name: 'Buy', weight: 20, question: "Is there a clear, trustworthy path from product to purchase?" },
  { id: 'T', name: 'Trust', weight: 15, question: "Does the site prove there is a real, reachable business behind it?" },
  { id: 'N', name: 'Content', weight: 10, question: "Does the store publish anything that helps a shopper decide?" },
];
export const checks: Check[] = [
  { id: 'F1', name: "HTTPS", pillar: 'F', two: "Site serves on https (final URL https)", one: "Mixed / uncertain", zero: "http only" },
  { id: 'F2', name: "robots.txt", pillar: 'F', two: "Present, does not block products/categories, contains a Sitemap: line", one: "Present but no Sitemap line, or blocks something important", zero: "Missing, or Disallow: / for everything" },
  { id: 'F3', name: "XML sitemap", pillar: 'F', two: "Reachable and includes product/category (or article) URLs", one: "Reachable but thin / only static pages", zero: "Not reachable" },
  { id: 'F4', name: "Title tags", pillar: 'F', two: "Homepage title is descriptive (brand + what/where) AND a sampled product title is unique and descriptive", one: "Present but generic / duplicated / templated", zero: "Missing or just 'Home'" },
  { id: 'F5', name: "Meta descriptions", pillar: 'F', two: "Specific meta description on homepage AND on a sampled product page", one: "On one only, or templated / duplicated", zero: "None" },
  { id: 'F6', name: "Canonical tags", pillar: 'F', two: "Canonical present on homepage AND product page", one: "On one only", zero: "None" },
  { id: 'F7', name: "Structured data", pillar: 'F', two: "Product/Breadcrumb schema evidence seen on product pages", one: "Partial evidence (e.g. breadcrumb schema only)", zero: "None seen where expected" },
  { id: 'F8', name: "Clean URLs", pillar: 'F', two: "Readable hyphenated product/category URLs, no session IDs", one: "Readable but awkward separators or numeric IDs appended", zero: "Query-string-only product URLs" },
  { id: 'C1', name: "Product titles", pillar: 'C', two: "Descriptive and consistent (brand / type / size or count)", one: "Partially descriptive", zero: "Vague / inconsistent" },
  { id: 'C2', name: "Descriptions", pillar: 'C', two: ">=50 words of specific copy on both sampled products", one: "Short / boilerplate (<50 words) or only one product", zero: "Missing" },
  { id: 'C3', name: "Imagery", pillar: 'C', two: ">=2 images per product (gallery) with alt text", one: "One image, or missing alt text", zero: "None / placeholder" },
  { id: 'C4', name: "Price & availability", pillar: 'C', two: "Price AND stock state visible (B2B: clear 'login for pricing' plus how to get an account)", one: "Price only, no availability", zero: "Neither / unclear" },
  { id: 'C5', name: "Variants & specs", pillar: 'C', two: "Structured variant selectors and/or a spec table", one: "Variants only described in text", zero: "None where expected" },
  { id: 'C6', name: "Taxonomy & breadcrumbs", pillar: 'C', two: "Logical category tree (>=2 levels) AND breadcrumbs", one: "Categories but no breadcrumbs", zero: "Flat / none" },
  { id: 'C7', name: "Filters & sort", pillar: 'C', two: "Filters (price / type / attribute) AND sort on category pages", one: "Sort or pagination only", zero: "None" },
  { id: 'C8', name: "Site search", pillar: 'C', two: "Search box with a results page", one: "Search present but weak / unclear", zero: "None" },
  { id: 'B1', name: "Primary CTA", pillar: 'B', two: "Add to cart / order / request a quote prominent on product page AND homepage", one: "Present but buried", zero: "No path to buy or enquire" },
  { id: 'B2', name: "Shipping & returns", pillar: 'B', two: "Shipping AND returns info with specifics (thresholds, timelines) linked from product page or footer", one: "Generic policy page only", zero: "None" },
  { id: 'B3', name: "Checkout access", pillar: 'B', two: "Guest checkout, or for B2B a clear become-a-customer application with steps", one: "Account required but sign-up exists", zero: "No way to buy online" },
  { id: 'B4', name: "Merchandising", pillar: 'B', two: "Homepage features collections / seasonal / new / best sellers with working links", one: "Static links only", zero: "None" },
  { id: 'B5', name: "Trust signals", pillar: 'B', two: "Product or store reviews PLUS guarantees / awards / secure badges", one: "One type only", zero: "None" },
  { id: 'T1', name: "Contact", pillar: 'T', two: "Phone + physical address + form or email", one: "Form or email only", zero: "None" },
  { id: 'T2', name: "About", pillar: 'T', two: "Substantial about / story page", one: "Brief", zero: "None" },
  { id: 'T3', name: "Policies", pillar: 'T', two: "Privacy AND terms (accessibility statement is a bonus)", one: "One", zero: "None" },
  { id: 'T4', name: "Social", pillar: 'T', two: ">=2 linked profiles", one: "One", zero: "None" },
  { id: 'T5', name: "Accessibility basics", pillar: 'T', two: "Skip link AND alt text on product images (or an accessibility statement)", one: "Some", zero: "Images without alt and no skip link" },
  { id: 'N1', name: "Blog / news freshness", pillar: 'N', two: "A dated post within the last 90 days", one: "Blog exists but stale or undated", zero: "None" },
  { id: 'N2', name: "Guides / FAQ", pillar: 'N', two: "FAQ AND guides / recipes / how-tos", one: "FAQ only, or one guide", zero: "None" },
  { id: 'N3', name: "Locations / where to buy", pillar: 'N', two: "Locator or locations page with addresses & hours (B2B: service area / depots)", one: "A bare list", zero: "None" },
];
export const grades = [{ cut: 85, grade: 'A', band: 'Benchmark' }, { cut: 70, grade: 'B', band: 'Strong' }, { cut: 55, grade: 'C', band: 'Developing' }, { cut: 40, grade: 'D', band: 'Needs work' }, { cut: 0, grade: 'F', band: 'At risk' }];
export const indexStats = { stores: 21, observations: 609, audited: '2026-09-28', mean: 75.9 };
