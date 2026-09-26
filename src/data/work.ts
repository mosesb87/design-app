// The complete archive. Every non-review project from /v2/work/ is here (merged where they are the
// same product), plus the six curated reviews and the three proposals. Two entries are deliberately
// excluded at Mousa's request: the Job Search Log and the DiaMedical Interview Trainer.
import { reviews } from './site';

export type Category = 'systems' | 'case-studies' | 'sites' | 'reviews' | 'proposals';
export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: 'systems', label: 'Systems', blurb: 'Working tools, running live. Nothing uploads a file or needs an account.' },
  { id: 'case-studies', label: 'Case studies', blurb: 'An independent e-commerce case study and the pieces built around it.' },
  { id: 'sites', label: 'Sites & stores', blurb: 'WooCommerce, Shopify and WordPress sites and stores, in English and Arabic.' },
  { id: 'reviews', label: 'Reviews', blurb: 'Independent website reviews — public pages only, every finding dated.' },
  { id: 'proposals', label: 'Proposals', blurb: 'Proposal sites built for specific job applications, each a working demo.' },
];

export type Status = 'live' | 'demo' | 'login' | 'adaptation' | 'independent' | 'unverified';
export const statusLabel: Record<Status, string> = {
  live: 'Live',
  demo: 'Demo — not a live business',
  login: 'Login required',
  adaptation: 'Fictional-company adaptation',
  independent: 'Independent — not commissioned',
  unverified: 'Link being verified',
};

export type Entry = {
  slug: string;
  title: string;
  category: Category;
  what: string;
  platform?: string;
  languages?: string[];
  url?: string;
  status: Status;
  caseStudy?: string; // slug of /work/<slug>/
  family?: string; // parent slug for grouped rows
  media?: string; // capture slug for the loupe preview
  date?: string; // ISO — only where published
};

const M = 'https://mousabatarseh.com';

export const entries: Entry[] = [
  // ── Systems
  { slug: 'asas-studio', title: 'ASAS Studio', category: 'systems', what: 'Elementor wireframe studio: real blocks, English and Arabic search, one colour system, native JSON export.', platform: 'WordPress · Elementor', languages: ['EN', 'AR'], url: 'https://asas.mousabatarseh.com/', status: 'live', caseStudy: 'asas-studio', media: 'asas' },
  { slug: 'changeatlas', title: 'ChangeAtlas Commerce', category: 'systems', what: 'Shows what a catalog import will change before it runs.', platform: 'Browser tool', url: `${M}/changeatlas/`, status: 'live', caseStudy: 'changeatlas', media: 'changeatlas' },
  { slug: 'changeatlas-demo', title: 'ChangeAtlas review demo', category: 'systems', what: 'Interactive demo of the review workflow, processed locally in the browser.', platform: 'Browser tool', url: `${M}/changeatlas/app/`, status: 'live', family: 'changeatlas', media: 'changeatlas-app' },
  { slug: 'deals-os', title: 'The Deals Operating System', category: 'systems', what: 'Promotion QA: one intake row, sixteen checks, one verdict.', platform: 'Workbook · rule engine', url: `${M}/deals-os/`, status: 'live', caseStudy: 'deals-os', media: 'deals-os' },
  { slug: 'dealproof', title: 'DealProof', category: 'systems', what: 'Promotion launch checker.', platform: 'Browser tool', url: `${M}/dealproof/`, status: 'live', family: 'deals-os', media: 'dealproof' },
  { slug: 'northgate', title: 'Northgate Retail Group', category: 'systems', what: 'The Deals Operating System adapted for a retail-operations role.', platform: 'Browser tool', url: 'https://lab.mousabatarseh.com/northgate-group/', status: 'adaptation', family: 'deals-os', media: 'northgate-retail' },
  { slug: 'house-of-dank', title: 'House of Dank marketing operations OS', category: 'systems', what: 'Interview demo of a menu and promotion manager. Fictional products; not a House of Dank system.', platform: 'Browser tool', url: 'https://hod-demo.mousabatarseh.com/', status: 'demo', family: 'deals-os', media: 'house-of-dank-demo' },
  { slug: 'csv-mapper', title: 'CSV Mapper', category: 'systems', what: 'A supplier’s spreadsheet arrives messy. It leaves as a store import.', platform: 'Browser tool', url: `${M}/csv-mapper/`, status: 'live', caseStudy: 'csv-mapper', media: 'csv-mapper' },
  { slug: 'commerce-studio', title: 'Commerce Studio', category: 'systems', what: 'Published edition of CSV Mapper.', platform: 'Browser tool', url: 'https://commerce-studio.mousabb2.chatgpt.site/', status: 'live', family: 'csv-mapper', media: 'commerce-studio' },
  { slug: 'seo-tools', title: 'SEO Tools', category: 'systems', what: 'Nine client-side SEO tools — SERP preview, schema, robots.txt, hreflang and more. No tracking.', platform: 'Browser tool', languages: ['EN', 'AR'], url: `${M}/SEO-Tools/`, status: 'live', media: 'seo-tools' },
  { slug: 'the-lab', title: 'The Lab', category: 'systems', what: 'Hub for working demos and modeled-company adaptations.', platform: 'Browser tools', url: 'https://lab.mousabatarseh.com/', status: 'live', media: 'the-lab' },
  { slug: 'ai-academy', title: 'AI Academy', category: 'systems', what: 'Bilingual AI learning map — nineteen lessons in Arabic and English.', platform: 'Web app', languages: ['AR', 'EN'], url: 'https://apps.moseswebworks.com/aiacademy/', status: 'live', media: 'ai-academy' },

  // ── Case studies
  { slug: 'diamedical-lab', title: 'DiaMedical Commerce Intelligence Lab', category: 'case-studies', what: 'Independent e-commerce case study built from public information for a Marketing and eCommerce Coordinator role.', platform: 'Web · workbook', url: `${M}/diamedical/`, status: 'independent', caseStudy: 'diamedical-lab', media: 'diamedical-lab' },
  { slug: 'diamedical-academy', title: 'DiaMedical Academy', category: 'case-studies', what: 'Guided learning experience built around the lab.', url: `${M}/diamedical/academy/`, status: 'independent', family: 'diamedical-lab', media: 'diamedical-academy' },
  { slug: 'diamedical-review', title: 'DiaMedical Experience Review', category: 'case-studies', what: 'Evidence-backed website review.', url: `${M}/diamedical-review/`, status: 'independent', family: 'diamedical-lab', media: 'diamedical-review' },
  { slug: 'diamedical-workbook', title: 'DiaMedical Workbook Explorer', category: 'case-studies', what: 'Interactive workbook experience.', url: `${M}/diamedical/v3/`, status: 'independent', family: 'diamedical-lab', media: 'diamedical-workbook' },
  { slug: 'diamedical-intro', title: 'How I Thought It Through', category: 'case-studies', what: 'Narrated reasoning walkthrough of the lab.', url: `${M}/diamedical-intro/`, status: 'independent', family: 'diamedical-lab', media: 'diamedical-intro' },
  { slug: 'halden-medical', title: 'Halden Medical', category: 'case-studies', what: 'The lab adapted for a medical-supply company.', url: 'https://lab.mousabatarseh.com/halden-medical/', status: 'adaptation', family: 'diamedical-lab', media: 'halden-medical' },

  // ── Sites & stores
  { slug: 'united-textile', title: 'United Textile', category: 'sites', what: 'Shopify B2B wholesale store: collections, case-pack pricing and buyer accounts.', platform: 'Shopify', languages: ['EN'], url: 'https://shopunitedtextile.com/', status: 'live', caseStudy: 'united-textile', media: 'united-textile' },
  { slug: 'universal-wholesale', title: 'Universal Wholesale', category: 'sites', what: 'A 14,000-item catalog prepared for migration: record cleanup, field mapping, import planning and validation.', platform: 'Wholesale e-commerce', languages: ['EN'], url: 'https://universalwholesaleonline.com/', status: 'live', caseStudy: 'universal-wholesale', media: 'universal-wholesale' },
  { slug: 'firefly-burgers', title: 'Firefly Burgers — Michigan', category: 'sites', what: 'Mobile-first WordPress restaurant site: menu, hours, location and branding.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://fireflyburgersmi.com/ver2/', status: 'live', caseStudy: 'firefly-burgers', media: 'firefly-burgers' },
  { slug: 'eat-with-samar', title: 'Eat With Samar', category: 'sites', what: 'Bilingual health and food website.', languages: ['EN', 'AR'], url: 'https://eatwithsamar.com/', status: 'live', caseStudy: 'eat-with-samar', media: 'eat-with-samar' },
  { slug: 'great-lakes-cigar-festival', title: 'Great Lakes Cigar Festival', category: 'sites', what: 'WordPress event and ticketing site: tickets, schedules, sponsors and vendors.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://greatlakescigarfest.com/home/', status: 'live', caseStudy: 'great-lakes-cigar-festival', media: 'great-lakes-cigar-festival' },
  { slug: 'ptee', title: 'PTEE', category: 'sites', what: 'Bilingual education platform: a courses website and a separate admissions platform.', languages: ['AR', 'EN'], url: 'https://ptee-courses-admissions-renewal.mousabb2.chatgpt.site/', status: 'live', caseStudy: 'ptee', media: 'ptee-renewal' },
  { slug: 'ptee-admissions', title: 'PTEE admissions portal', category: 'sites', what: 'Bilingual admissions and online-services portal.', languages: ['EN', 'AR'], url: 'https://ptee.moseswebworks.com/admissions/en', status: 'live', family: 'ptee', media: 'ptee-admissions' },
  { slug: 'btee', title: 'BTEE bilingual build', category: 'sites', what: 'Hosting-migration build of the PTEE redesign.', languages: ['AR'], url: 'https://btee.moseswebworks.com/ar/', status: 'live', family: 'ptee', media: 'btee-build' },
  { slug: 'ptee-courses', title: 'PTEE courses & programs', category: 'sites', what: 'Bilingual course catalog.', languages: ['AR', 'EN'], url: 'https://ptee.moseswebworks.com/courses/ar', status: 'unverified', family: 'ptee', media: 'ptee-courses' },
  { slug: 'ptee-org', title: 'PTEE — ptee.org', category: 'sites', what: 'The programme’s bilingual education website.', languages: ['AR'], url: 'https://ptee.org/', status: 'live', family: 'ptee', media: 'ptee-org' },
  { slug: 'ptee-online', title: 'PTEE company platform', category: 'sites', what: 'Education platform.', url: 'https://ptee.online/', status: 'login', family: 'ptee', media: 'ptee-online' },
  { slug: 'jabal-amman-publishers', title: 'Jabal Amman Publishers', category: 'sites', what: 'WooCommerce publishing house and bookstore.', platform: 'WooCommerce', languages: ['AR'], url: 'https://japublishers.com/', status: 'live', media: 'jabal-amman-publishers' },
  { slug: 'ophir-publishers', title: 'Ophir Publishers — Jordan', category: 'sites', what: 'WooCommerce publishing catalog.', platform: 'WooCommerce', languages: ['AR'], url: 'https://ophir.com.jo/', status: 'live', family: 'jabal-amman-publishers', media: 'ophir-publishers' },
  { slug: 'mawtini-dabke', title: 'Mawtini Dabke Troupe', category: 'sites', what: 'Community organization website: services, performance galleries and a quote-request path.', platform: 'WordPress', languages: ['EN'], url: 'https://mawtinidabke.com/', status: 'live', media: 'mawtini-dabke' },
  { slug: 'st-mary-berkley', title: 'St. Mary Church Berkley', category: 'sites', what: 'Church website: parish history, clergy, iconography, gallery and online donations.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://stmaryberkley.org/', status: 'unverified', media: 'st-mary-berkley' },
  { slug: 'samona-hospitality', title: 'Samona Hospitality Group', category: 'sites', what: 'WordPress hospitality website.', platform: 'WordPress', languages: ['EN'], url: 'https://the-shg.com/', status: 'live', media: 'samona-hospitality' },
  { slug: 'larkspur-mobility', title: 'Larkspur Mobility', category: 'sites', what: 'WordPress website for a mobility service.', platform: 'WordPress', languages: ['EN'], url: `${M}/Larkspur/`, status: 'unverified', media: 'larkspur-mobility' },
  { slug: 'american-hot-wheel', title: 'American Hot Wheel', category: 'sites', what: 'WooCommerce storefront concept with a vehicle-first finder. Checkout disabled.', platform: 'WooCommerce', languages: ['EN'], url: 'https://interviewdemo.mousabatarseh.com/', status: 'demo', media: 'american-hot-wheel' },
  { slug: 'full-house-wholesale', title: 'Full House Wholesale', category: 'sites', what: 'B2B wholesale product catalog.', languages: ['EN'], url: 'https://www.fullhousewholesale.com/', status: 'login', media: 'full-house-wholesale' },
  { slug: 'wildbills-drivethru-menu', title: 'Wild Bill’s drive-thru menu', category: 'sites', what: 'WordPress digital catalog and menu.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/drivethru-menu/', status: 'live', media: 'wildbills-drivethru-menu' },
  { slug: 'wildbills-disposables-menu', title: 'Mr. Vapor disposable menu', category: 'sites', what: 'WordPress product catalog and interactive menu.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/disposables-menu-2/', status: 'unverified', family: 'wildbills-drivethru-menu', media: 'wildbills-disposables-menu' },
  { slug: 'wildbills-fathers-day', title: 'Father’s Day sales landing', category: 'sites', what: 'WordPress campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/fathers-day-specials/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-fathers-day' },
  { slug: 'wildbills-christmas', title: 'Christmas sale landing', category: 'sites', what: 'WordPress holiday campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/christmas-sale-2024/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-christmas' },
  { slug: 'wildbills-stpatrick', title: 'St. Patrick’s sales form', category: 'sites', what: 'WordPress campaign and sales form.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/stpatrick-form/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-stpatrick' },
  { slug: 'wildbills-wild-wednesdays', title: 'Wild Wednesdays landing page', category: 'sites', what: 'WordPress campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/wild-wednesdays/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-wild-wednesdays' },

  // ── Reviews (curated; the full index lives at /reviews/)
  ...reviews.map((r): Entry => ({ slug: `review-${r.slug}`, title: r.title, category: 'reviews', what: `${r.number} ${r.numberLabel}. ${r.fix}`, platform: r.focus, url: r.url, status: 'live', media: r.media, date: r.date })),

  // ── Proposals
  { slug: 'proposal-gardner-white', title: 'Same-Day Answers — web-orders desk', category: 'proposals', what: 'Proposal site built for a job application: a working web-orders desk demo with fictional customers.', url: `${M}/gardner-white-proposal/`, status: 'live', media: 'proposal-gardner-white' },
  { slug: 'proposal-bran', title: 'Web department proposal', category: 'proposals', what: 'Proposal site built for a job application: a site audit, a filterable line card and a build standard.', url: `${M}/bran-proposal/`, status: 'live', media: 'proposal-bran' },
  { slug: 'proposal-rmc', title: 'Build standard & monitoring proposal', category: 'proposals', what: 'Proposal site built for a job application: a build standard, a monitoring run and a request desk.', url: `${M}/rmc-proposal/`, status: 'live', media: 'proposal-rmc' },
];

export const entryCount = entries.length;
export const countBy = (c: Category) => entries.filter((e) => e.category === c).length;
