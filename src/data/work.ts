// The complete archive: every build on Mousa's own lists — /v2/work/, his builds index (/reviews/builds/, 58
// builds, scanned 2026-09-22) and the project list on his earlier home page — merged where they are the same
// product, plus every review (each has its own page here) and every proposal (audited 2026-09-27). Excluded at
// Mousa's request: the Job Search Log and the DiaMedical Interview Trainer. Private builds are listed without a link.
import { reviews } from './site';
import { allReviews, statText } from './reviews';

export type Category = 'systems' | 'case-studies' | 'sites' | 'reviews' | 'proposals';
export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: 'systems', label: 'Systems', blurb: 'Working tools, running live. Nothing uploads a file or needs an account.' },
  // Not "Case studies": only the lab itself is one; the rest are the pieces built around it (Mousa, round 6).
  { id: 'case-studies', label: 'Commerce lab', blurb: 'The Halden Medical Commerce Intelligence Lab — an independent e-commerce case study — and the pieces built around it.' },
  { id: 'sites', label: 'Sites & stores', blurb: 'WooCommerce, Shopify and WordPress sites and stores, in English and Arabic.' },
  { id: 'reviews', label: 'Reviews', blurb: 'Independent website reviews — public pages only, every finding dated.' },
  { id: 'proposals', label: 'Proposals', blurb: 'Proposal sites built for specific job applications, each a working demo.' },
];

export type Status = 'live' | 'preview' | 'demo' | 'login' | 'adaptation' | 'independent' | 'unverified' | 'private' | 'unchecked';
export const statusLabel: Record<Status, string> = {
  live: 'Live',
  preview: 'Preview — domain pending',
  demo: 'Demo — not a live business',
  login: 'Login required',
  adaptation: 'Fictional-company adaptation',
  independent: 'Independent — not commissioned',
  unverified: 'Host blocks automated checks',
  private: 'Private — shared on request',
  unchecked: 'From my earlier portfolio — not re-checked',
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
  media?: string; // capture slug for the card screenshots
  // ISO date it last shipped — published or updated: a review's date; the day it was last uploaded to Mousa's
  // hosting (Last-Modified); for WordPress sites, the page's published or modified date. Evidence:
  // capture/hosting/scan.json (public scan, 2026-09-27), reviews.json, the Sapience build history. Left out where
  // nothing dates it with at least medium confidence.
  date?: string;
};

const M = 'https://mousabatarseh.com';

export const entries: Entry[] = [
  // ── Systems
  { slug: 'rankreceipt', title: 'RankReceipt', category: 'systems', what: 'Search ranking you can read: load any list and every result shows its receipt, rule by rule. Tune weights and synonyms, keep test searches with known answers, try what-if edits. Runs in the browser.', platform: 'Browser tool', url: `${M}/rankreceipt/`, status: 'live', media: 'rankreceipt', date: '2026-09-28' },
  { slug: 'shelfmark', title: 'ShelfMark', category: 'systems', what: 'Michigan Storefront Benchmark: 21 stores scored on 29 public-page checks, with report cards, evidence and a score-your-store calculator. Scoring model ships as a workbook.', platform: 'Web · workbook', url: `${M}/shelfmark/`, status: 'live', media: 'shelfmark', date: '2026-09-28' },
  { slug: 'asas-studio', title: 'ASAS Studio', category: 'systems', what: 'Elementor wireframe studio: real blocks, English and Arabic search, one color system, native JSON export.', platform: 'WordPress · Elementor', languages: ['EN', 'AR'], url: 'https://asas.build/', status: 'live', caseStudy: 'asas-studio', media: 'asas', date: '2026-09-23' },
  { slug: 'asas-studio-app', title: 'ASAS Studio app', category: 'systems', what: 'The studio itself: browse the ASAS Elementor block and wireframe library and build a page from it.', platform: 'Web app · Elementor', languages: ['EN', 'AR'], url: 'https://asas.build/studio/', status: 'live', family: 'asas-studio', media: 'asas-studio-app', date: '2026-09-13' },
  { slug: 'changeatlas', title: 'ChangeAtlas Commerce', category: 'systems', what: 'Shows what a catalog import will change before it runs.', platform: 'Browser tool', url: `${M}/changeatlas/`, status: 'live', caseStudy: 'changeatlas', media: 'changeatlas', date: '2026-09-22' },
  { slug: 'changeatlas-demo', title: 'ChangeAtlas review demo', category: 'systems', what: 'Interactive demo of the review workflow, processed locally in the browser.', platform: 'Browser tool', url: `${M}/changeatlas/app/`, status: 'live', family: 'changeatlas', media: 'changeatlas-app', date: '2026-09-22' },
  { slug: 'deals-os', title: 'The Deals Operating System', category: 'systems', what: 'Promotion QA: one intake row, sixteen checks, one verdict.', platform: 'Workbook · rule engine', url: `${M}/deals-os/`, status: 'live', caseStudy: 'deals-os', media: 'deals-os', date: '2026-09-20' },
  { slug: 'dealproof', title: 'DealProof', category: 'systems', what: 'Promotion launch checker.', platform: 'Browser tool', url: `${M}/dealproof/`, status: 'live', family: 'deals-os', media: 'dealproof', date: '2026-09-25' },
  { slug: 'northgate', title: 'Northgate Retail Group', category: 'systems', what: 'The Deals Operating System adapted for a retail-operations role.', platform: 'Browser tool', url: 'https://lab.mousabatarseh.com/northgate-group/', status: 'adaptation', family: 'deals-os', media: 'northgate-retail', date: '2026-09-20' },
  { slug: 'csv-mapper', title: 'CSV Mapper', category: 'systems', what: 'A supplier’s spreadsheet arrives messy. It leaves as a store import.', platform: 'Browser tool', url: `${M}/csv-mapper/`, status: 'live', caseStudy: 'csv-mapper', media: 'csv-mapper', date: '2026-09-15' },
  { slug: 'commerce-studio', title: 'Commerce Studio', category: 'systems', what: 'Published edition of CSV Mapper.', platform: 'Browser tool', url: 'https://commerce-studio.mousabb2.chatgpt.site/', status: 'live', family: 'csv-mapper', media: 'commerce-studio' },
  { slug: 'seo-tools', title: 'SEO Tools', category: 'systems', what: 'Nine client-side SEO tools — SERP preview, schema, robots.txt, hreflang and more. No tracking.', platform: 'Browser tool', languages: ['EN', 'AR'], url: `${M}/SEO-Tools/`, status: 'live', media: 'seo-tools', date: '2026-09-15' },
  { slug: 'the-lab', title: 'The Lab', category: 'systems', what: 'Hub for working demos and modeled-company adaptations.', platform: 'Browser tools', url: 'https://lab.mousabatarseh.com/', status: 'live', media: 'the-lab', date: '2026-09-19' },

  // ── Commerce lab (the Halden Medical lab and the pieces built around it)
  { slug: 'halden-lab', title: 'Halden Medical Commerce Intelligence Lab', category: 'case-studies', what: 'Independent e-commerce case study built from public information for a Marketing and eCommerce Coordinator role.', platform: 'Web · workbook', url: 'https://lab.mousabatarseh.com/halden-medical/', status: 'independent', caseStudy: 'halden-medical', media: 'halden-lab', date: '2026-09-15' },
  { slug: 'halden-workbook', title: 'Halden Medical Workbook', category: 'case-studies', what: 'The 13-sheet analysis workbook as a read-only page.', url: 'https://lab.mousabatarseh.com/halden-medical/workbook-view/', status: 'independent', family: 'halden-lab', media: 'halden-workbook', date: '2026-09-15' },
  { slug: 'halden-walkthrough', title: 'How I Thought It Through', category: 'case-studies', what: 'Seven-scene walkthrough of the reasoning, from the customer question to the measurement plan.', url: 'https://lab.mousabatarseh.com/halden-medical/walkthrough', status: 'independent', family: 'halden-lab', media: 'halden-walkthrough', date: '2026-09-15' },
  { slug: 'halden-pathfinder', title: 'Halden Medical Product Pathfinder', category: 'case-studies', what: 'Discovery tool: turns a lab goal into a station map, then builds a product-discovery path from the answers.', url: 'https://lab.mousabatarseh.com/halden-medical/commerce-lab/pathfinder', status: 'independent', family: 'halden-lab', media: 'halden-pathfinder' },

  // ── Sites & stores
  { slug: 'united-textile', title: 'United Textile', category: 'sites', what: 'Shopify B2B wholesale store: collections, case-pack pricing and buyer accounts.', platform: 'Shopify', languages: ['EN'], url: 'https://shopunitedtextile.com/', status: 'live', caseStudy: 'united-textile', media: 'united-textile', date: '2024-06-05' },
  { slug: 'universal-wholesale', title: 'Universal Wholesale', category: 'sites', what: 'A 14,000-item catalog prepared for migration: record cleanup, field mapping, import planning and validation.', platform: 'Wholesale e-commerce', languages: ['EN'], url: 'https://universalwholesaleonline.com/', status: 'live', caseStudy: 'universal-wholesale', media: 'universal-wholesale' },
  { slug: 'firefly-burgers', title: 'Firefly Burgers — Michigan', category: 'sites', what: 'Mobile-first WordPress restaurant site: menu, hours, location and branding.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://fireflyburgersmi.com/ver2/', status: 'live', caseStudy: 'firefly-burgers', media: 'firefly-burgers' },
  { slug: 'mikes-party-store', title: 'Mike’s Party Store', category: 'sites', what: 'Information-only WordPress site for a Dearborn Heights party store: six aisle pages and a Breeze flavor shelf, all in free Elementor.', platform: 'WordPress · Elementor', languages: ['EN'], url: `${M}/mikes-party-store/`, status: 'preview', media: 'mikes-party-store', date: '2026-09-29' },
  { slug: 'eat-with-samar', title: 'Eat With Samar', category: 'sites', what: 'Bilingual health and food website.', languages: ['EN', 'AR'], url: 'https://eatwithsamar.com/', status: 'live', caseStudy: 'eat-with-samar', media: 'eat-with-samar', date: '2026-09-09' },
  { slug: 'great-lakes-cigar-festival', title: 'Great Lakes Cigar Festival', category: 'sites', what: 'WordPress event and ticketing site: tickets, schedules, sponsors and vendors.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://greatlakescigarfest.com/home/', status: 'live', caseStudy: 'great-lakes-cigar-festival', media: 'great-lakes-cigar-festival', date: '2025-07-21' },
  { slug: 'ptee', title: 'PTEE', category: 'sites', what: 'Bilingual education platform: a courses website and a separate admissions platform.', languages: ['AR', 'EN'], url: 'https://ptee-courses-admissions-renewal.mousabb2.chatgpt.site/', status: 'live', caseStudy: 'ptee', media: 'ptee-admissions' },
  { slug: 'btee', title: 'BTEE bilingual build', category: 'sites', what: 'Hosting-migration build of the PTEE redesign, with separate Arabic and English sites.', languages: ['AR', 'EN'], url: 'https://btee.moseswebworks.com/ar/', status: 'live', family: 'ptee', media: 'btee-en', date: '2026-09-19' },
  { slug: 'ptee-courses', title: 'PTEE courses & programs', category: 'sites', what: 'Bilingual course catalog.', languages: ['AR', 'EN'], url: 'https://ptee.moseswebworks.com/courses/ar/courses/catalog', status: 'live', family: 'ptee', media: 'ptee-catalog' },
  { slug: 'ptee-org', title: 'PTEE — ptee.org', category: 'sites', what: 'The program’s bilingual education website.', languages: ['AR'], url: 'https://ptee.org/', status: 'live', family: 'ptee', media: 'ptee-org', date: '2026-09-24' },
  { slug: 'jabal-amman-publishers', title: 'Jabal Amman Publishers', category: 'sites', what: 'WooCommerce publishing house and bookstore.', platform: 'WooCommerce', languages: ['AR'], url: 'https://japublishers.com/', status: 'live', media: 'jabal-amman-publishers' },
  { slug: 'ophir-publishers', title: 'Ophir Publishers — Jordan', category: 'sites', what: 'WooCommerce publishing catalog.', platform: 'WooCommerce', languages: ['AR'], url: 'https://ophir.com.jo/', status: 'live', family: 'jabal-amman-publishers', media: 'ophir-publishers' },
  { slug: 'mawtini-dabke', title: 'Mawtini Dabke Troupe', category: 'sites', what: 'Community organization website: services, performance galleries and a quote-request path.', platform: 'WordPress', languages: ['EN'], url: 'https://mawtinidabke.com/', status: 'live', media: 'mawtini-dabke', date: '2025-09-10' },
  { slug: 'st-mary-berkley', title: 'St. Mary Church Berkley', category: 'sites', what: 'Church website: parish history, clergy, iconography, gallery and online donations.', platform: 'WordPress · Elementor', languages: ['EN'], url: 'https://stmaryberkley.org/', status: 'unverified', media: 'st-mary-berkley' },
  { slug: 'samona-hospitality', title: 'Samona Hospitality Group', category: 'sites', what: 'WordPress hospitality website.', platform: 'WordPress', languages: ['EN'], url: 'https://the-shg.com/', status: 'live', media: 'samona-hospitality', date: '2025-05-14' },
  { slug: 'larkspur-mobility', title: 'Larkspur Mobility', category: 'sites', what: 'WordPress website for a mobility service.', platform: 'WordPress', languages: ['EN'], url: `${M}/Larkspur/`, status: 'live', media: 'larkspur-mobility' },
  { slug: 'american-hot-wheel', title: 'American Hot Wheel', category: 'sites', what: 'WooCommerce storefront concept with a vehicle-first finder. Checkout disabled.', platform: 'WooCommerce', languages: ['EN'], url: 'https://interviewdemo.mousabatarseh.com/', status: 'demo', media: 'american-hot-wheel' },
  { slug: 'full-house-wholesale', title: 'Full House Wholesale', category: 'sites', what: 'B2B wholesale product catalog.', languages: ['EN'], url: 'https://www.fullhousewholesale.com/', status: 'login', media: 'full-house-wholesale' },
  { slug: 'wildbills-drivethru-menu', title: 'Wild Bill’s drive-thru menu', category: 'sites', what: 'WordPress digital catalog and menu.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/drivethru-menu/', status: 'live', media: 'wildbills-drivethru-menu', date: '2025-05-02' },
  { slug: 'wildbills-disposables-menu', title: 'Mr. Vapor disposable menu', category: 'sites', what: 'WordPress product catalog and interactive menu.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/disposables-menu-2/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-disposables-menu', date: '2025-04-21' },
  { slug: 'wildbills-fathers-day', title: 'Father’s Day sales landing', category: 'sites', what: 'WordPress campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/fathers-day-specials/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-fathers-day', date: '2024-06-06' },
  { slug: 'wildbills-christmas', title: 'Christmas sale landing', category: 'sites', what: 'WordPress holiday campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/christmas-sale-2024/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-christmas', date: '2024-12-12' },
  { slug: 'wildbills-stpatrick', title: 'St. Patrick’s sales form', category: 'sites', what: 'WordPress campaign and sales form.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/stpatrick-form/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-stpatrick', date: '2025-03-12' },
  { slug: 'wildbills-wild-wednesdays', title: 'Wild Wednesdays landing page', category: 'sites', what: 'WordPress campaign landing page.', platform: 'WordPress', languages: ['EN'], url: 'https://wildbillstobacco.com/wild-wednesdays/', status: 'live', family: 'wildbills-drivethru-menu', media: 'wildbills-wild-wednesdays', date: '2026-02-18' },
  { slug: 'k-wav', title: 'K-WAV (now Total LED)', category: 'sites', what: 'Production Wix build for a direct-view LED display manufacturer: spec-sheet product-line pages, forms and rebrand-migration planning.', platform: 'Wix', languages: ['EN'], url: 'https://www.k-wav.com/', status: 'unchecked', media: 'k-wav' },
  { slug: 'our-family-life', title: 'Our Family Life Blog', category: 'sites', what: 'Family blog website.', languages: ['EN'], url: 'https://ourfamilylife.net/', status: 'unchecked', media: 'our-family-life' },

  // ── Reviews: every one, each linking to its own independent website
  ...allReviews.map((r): Entry => ({ slug: `review-${r.slug}`, title: r.brand, category: 'reviews', what: `${r.kind}: ${statText(r)} ${r.stat.label}.`, platform: r.focus.join(' · '), url: r.source, status: 'live', media: reviews.find((x) => x.slug === r.slug)?.media, date: r.date })),

  // ── Proposals
  { slug: 'proposal-gardner-white', title: 'Same-Day Answers · Gardner-White web-orders desk', category: 'proposals', what: 'Proposal site built for a job application: a working web-orders desk demo with fictional customers.', url: `${M}/gardner-white-proposal/`, status: 'live', media: 'proposal-gardner-white', date: '2026-09-22' },
  { slug: 'proposal-bran', title: 'Bran Marketing web department proposal', category: 'proposals', what: 'Proposal site built for a job application: a site audit, a filterable line card and a build standard.', url: `${M}/bran-proposal/`, status: 'live', media: 'proposal-bran', date: '2026-09-22' },
  { slug: 'proposal-rmc', title: 'Recovery Movement Consulting proposal', category: 'proposals', what: 'Proposal site built for a job application: a build standard, a monitoring run and a request desk.', url: `${M}/rmc-proposal/`, status: 'live', media: 'proposal-rmc', date: '2026-09-22' },
  { slug: 'proposal-jaus', title: 'JAUS Event-Ready · Fit & Occasion Finder', category: 'proposals', what: 'Project for a JAUS application: a measured review of shopjaus.com, an Event-Ready Finder built from 3,801 in-stock dresses, an eight-week rebuild plan and a Shopify partner-store build kit.', platform: 'Shopify · review + demo', languages: ['EN'], url: `${M}/jaus-project/`, status: 'independent', media: 'jaus-project', date: '2026-09-24' },
  { slug: 'proposal-bulletproof', title: 'Bulletproof.com Build & QA Review', category: 'proposals', what: 'Application project for a Shopify Ecommerce Specialist contract: all 127 products and 110 collections on bulletproof.com checked — ten findings, five working tools and a five-month plan.', platform: 'Shopify · review + tools', languages: ['EN'], url: `${M}/bulletproof-review/`, status: 'independent', media: 'bulletproof-review', date: '2026-09-28' },
  { slug: 'partify-application', title: 'Partify · Four repair orders', category: 'proposals', what: 'Application project for a Web Developer role: a live JSON-LD price bug with a Liquid fix, a 160-page offer audit in TypeScript, product-page weight measurements and a working fitment lab with 77 tests.', platform: 'Shopify · React · TypeScript', languages: ['EN'], url: `${M}/partify/`, status: 'independent', media: 'partify-application', date: '2026-09-29' },
  { slug: 'sapience-annotated-record', title: 'Sapience AI · The Annotated Record', category: 'proposals', what: 'Independent, motion-led design concept for a web-designer role: a nine-chapter annotated record with margin notes, a provenance view and a motion toggle. Not an official Sapience AI website.', platform: 'Design concept', languages: ['EN'], url: `${M}/sapienceai/`, status: 'independent', media: 'sapience-annotated-record', date: '2026-09-25' },
  { slug: 'proposal-puff-cannabis', title: 'Puff Cannabis · Deal Integrity Case Study', category: 'proposals', what: 'Independent case study: a customer reads "2/$25 disposables" and cannot tell which products, which store, or what they will pay. Follows that question to a deal checker, a reconciliation workspace, tickets and measurement. 28 real, cited offers; product sample modelled and labelled. Not commissioned or endorsed by Puff Cannabis.', platform: 'Case study · workbook', languages: ['EN'], url: `${M}/puff-cannabis/`, status: 'independent', media: 'puff-cannabis', date: '2026-09-29' },
];

export const entryCount = entries.length;
export const countBy = (c: Category) => entries.filter((e) => e.category === c).length;

// Upload times (UTC, from the hosting scan's Last-Modified) for the builds of the last week, to order same-day
// builds; a group child uploaded in the same second as its parent is the same build and isn't counted twice.
const uploadedAt: Record<string, string> = {
  'proposal-puff-cannabis': '23:49:56', rankreceipt: '23:59:58','review-reworked': '20:19:23', dealproof: '17:29:42', 'sapience-annotated-record': '10:08:02',
  'proposal-gardner-white': '23:01:06', changeatlas: '23:00:56', 'changeatlas-demo': '23:00:56', 'proposal-rmc': '20:39:28',
  'proposal-bran': '18:36:25', 'review-bran': '17:53:50',
  // PetSafe is dated Sep 20 and went up at 03:56 on Sep 21, after everything else dated Sep 20.
  'review-petsafe': '23:59:59', northgate: '19:42:46', 'review-highprofile': '15:42:22', 'review-jars': '15:36:17',
  'deals-os': '15:13:33', 'review-lume': '15:05:23', 'review-dutchie': '14:00:55',
};
const stamp = (e: Entry) => `${e.date}T${uploadedAt[e.slug] || '00:00:00'}`;

// The sixteen most recent builds shown on /work/ ("The index."), of every kind, newest first.
export const latestBuilds: string[] = (() => {
  const picked: Entry[] = [];
  for (const e of entries.filter((x) => x.date).sort((a, b) => stamp(b).localeCompare(stamp(a)))) {
    const parent = e.family && picked.find((p) => p.slug === e.family);
    if (parent && stamp(parent) === stamp(e)) continue;
    picked.push(e);
    if (picked.length === 16) break;
  }
  return picked.map((e) => e.slug);
})();
