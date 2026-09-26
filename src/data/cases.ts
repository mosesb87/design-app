// Case studies. Copy is written only from facts Mousa published (sources below and in
// docs/research/case-facts.md) or confirmed with him. Where a role, date or outcome was not published,
// it is simply not stated. "Observed" facts come from the live site on the capture date.

export type Fact = { label: string; value: string; source?: string };
export type Metric = { value: string; label: string; source: string; note?: string };
export type CaseStudy = {
  slug: string;
  order: number;
  group: 'systems' | 'sites';
  title: string;
  kicker: string;
  promise?: string;
  summary: string;
  url: string;
  urlLabel?: string;
  platform: string[];
  languages: string[];
  media: { hero: string; mobile?: string; full?: string; video?: string; more?: { slug: string; label: string }[] };
  intro: string[];
  role?: { text: string; source: string };
  features?: { title: string; text: string }[];
  spec: Fact[];
  metrics?: Metric[];
  quote?: { text: string; source: string };
  disclaimer?: string;
  related?: { title: string; url: string }[];
  family?: { title: string; url: string; note: string }[];
};

const M = 'https://mousabatarseh.com';
const V1 = `${M}/`;
const V2 = `${M}/v2`;
const WORK = `${M}/v2/work/`;

export const cases: CaseStudy[] = [
  // ─────────────────────────────── Systems
  {
    slug: 'asas-studio',
    order: 1,
    group: 'systems',
    title: 'ASAS Studio',
    kicker: 'Elementor wireframe studio',
    promise: 'Build the page before you style it.',
    summary: 'A structure-first Elementor studio: real blocks drawn in grey, searchable in English and Arabic, stacked into a live page and exported as a native Elementor template.',
    url: 'https://asas.build/',
    urlLabel: 'asas.build',
    platform: ['WordPress', 'Elementor'],
    languages: ['English', 'Arabic'],
    media: { hero: 'asas', video: 'asas', more: [{ slug: 'asas-studio-app', label: 'The studio: ready-made pages, filtered and previewed' }] },
    intro: [
      'I designed and built ASAS to turn thousands of reusable Elementor blocks into complete, editable pages. Users can search in English or Arabic, stack sections into a live page, apply one shared colour system, and export the finished layout as a native Elementor JSON template.',
      'The blocks are drawn in grey on purpose, so a page’s structure is judged before anyone argues about colour.',
    ],
    role: { text: 'I designed and built ASAS', source: V1 },
    features: [
      { title: 'Find', text: 'Search thousands of real blocks in English or Arabic.' },
      { title: 'Build', text: 'Stack sections into a live page and reorder them.' },
      { title: 'Preview', text: 'Apply one shared colour system across the whole page.' },
      { title: 'Export', text: 'Download the finished layout as a native Elementor JSON template.' },
    ],
    spec: [
      { label: 'Platform', value: 'WordPress · Elementor' },
      { label: 'Search', value: 'English + Arabic' },
      { label: 'Output', value: 'Native Elementor .JSON' },
      { label: 'Live', value: 'asas.build' },
    ],
    metrics: [
      { value: '3,881', label: 'real Elementor blocks in the library', source: 'https://asas.build/' },
      { value: '143', label: 'ready-made pages', source: 'https://asas.build/' },
      { value: '29', label: 'categories', source: 'https://asas.build/' },
      { value: '12', label: 'colour kits that repaint the page live', source: 'https://asas.build/' },
    ],
    quote: { text: 'Structure first. Style without limits.', source: V1 },
    disclaimer: 'An independent tool. Elementor Ltd. is not involved.',
  },
  {
    slug: 'changeatlas',
    order: 2,
    group: 'systems',
    title: 'ChangeAtlas Commerce',
    kicker: 'Catalog import proof system',
    promise: 'Know what an import will change before it runs.',
    summary: 'Reads a catalog export in the browser and classifies every change an import would make — before it runs.',
    url: `${M}/changeatlas/`,
    platform: ['Browser tool', 'Matrixify & WooCommerce exports'],
    languages: ['English'],
    media: { hero: 'changeatlas', video: 'changeatlas', more: [{ slug: 'changeatlas-app', label: 'The review demo, processing a sample catalog update' }] },
    intro: [
      'One wrong column in an import can quietly wipe barcodes or alt text across a catalog. ChangeAtlas compares a Matrixify or WooCommerce export in the browser and classifies every change before the import runs, with the evidence behind each one.',
      'It never writes to a store and never uploads a file: the catalog stays on the machine that opened it.',
    ],
    role: { text: 'Concept, rules, design and build', source: `${M}/changeatlas/` },
    features: [
      { title: 'Every change classified', text: 'Seven delta classes — from created to unknown — so nothing is summarised away.' },
      { title: 'Evidence attached', text: 'Six evidence classes; absence is not treated as emptiness.' },
      { title: 'Blast radius', text: 'A proof graph shows which records a single change reaches.' },
      { title: 'A verdict to act on', text: 'Block, ready, review or unknown — with a batch plan and a review package.' },
    ],
    spec: [
      { label: 'Runs', value: 'In the browser' },
      { label: 'Reads', value: 'Matrixify and WooCommerce exports' },
      { label: 'Writes', value: 'Nothing — no store writes, no uploads' },
      { label: 'Data', value: 'A fictional store’s sample catalog' },
    ],
    disclaimer: 'Demonstrated on a fictional store’s sample data.',
  },
  {
    slug: 'deals-os',
    order: 3,
    group: 'systems',
    title: 'The Deals Operating System',
    kicker: 'Promotion QA system',
    promise: 'One intake row. Sixteen checks. One verdict.',
    summary: 'Every promotion is checked against the system of record — price, cap, margin, dates — before it reaches a menu.',
    url: `${M}/deals-os/`,
    platform: ['Workbook', 'JavaScript rule engine'],
    languages: ['English'],
    media: {
      hero: 'deals-os',
      video: 'deals-os',
      more: [
        { slug: 'dealproof', label: 'DealProof — the launch checker' },
        { slug: 'northgate-retail', label: 'Northgate Retail Group — a fictional-company adaptation' },
        { slug: 'house-of-dank-demo', label: 'An interview demo with fictional products' },
      ],
    },
    intro: [
      'A deal sheet names one price and the register charges a second. The Deals Operating System reads each promotion as a single intake row and runs sixteen checks against the system of record, so a stale price or a broken margin is blocked before it reaches a menu — with the reason written in plain words and an owner named.',
      'The rules exist twice — once as a workbook, once as a JavaScript engine — and the two must reach the same verdicts, to the dollar.',
    ],
    features: [
      { title: 'One intake row', text: 'Eleven mandatory fields describe a promotion completely.' },
      { title: 'Sixteen checks', text: 'Five groups; every check answers pass, warn, fail or not applicable.' },
      { title: 'Two implementations', text: 'Workbook and JavaScript engine must agree before a verdict counts.' },
      { title: 'A Friday report', text: 'A weekly summary of what cleared and what was blocked.' },
    ],
    spec: [
      { label: 'Checks', value: '16 in 5 groups' },
      { label: 'Answers', value: 'Pass · warn · fail · n/a' },
      { label: 'Built as', value: 'Workbook + JavaScript engine' },
      { label: 'Figures', value: 'Modeled examples' },
    ],
    metrics: [
      { value: '16', label: 'checks every promotion passes before it reaches a menu', source: `${M}/deals-os/` },
      { value: '20 → 7', label: 'deals submitted → cleared in a modeled week (11 blocked, 2 held)', source: `${M}/deals-os/`, note: 'Modeled week' },
    ],
    disclaimer: 'Exposure and weekly figures are modeled examples, not money anyone banked.',
    family: [
      { title: 'DealProof', url: `${M}/dealproof/`, note: 'The promotion launch checker.' },
      { title: 'Northgate Retail Group', url: 'https://lab.mousabatarseh.com/northgate-group/', note: 'Fictional-company adaptation of the same rules.' },
      { title: 'Marketing operations OS demo', url: 'https://hod-demo.mousabatarseh.com/', note: 'Interview demo; fictional products.' },
    ],
  },
  {
    slug: 'csv-mapper',
    order: 4,
    group: 'systems',
    title: 'CSV Mapper',
    kicker: 'Spreadsheet mapping workspace',
    promise: 'A supplier’s spreadsheet arrives messy. It leaves as a store import.',
    summary: 'Maps supplier columns to Shopify and WooCommerce import formats, checks them in layers, and records every review decision.',
    url: `${M}/csv-mapper/`,
    platform: ['Browser tool'],
    languages: ['English'],
    media: { hero: 'csv-mapper', video: 'csv-mapper', more: [{ slug: 'commerce-studio', label: 'Commerce Studio — the published edition' }] },
    intro: [
      'Supplier spreadsheets never match a store’s import format. CSV Mapper maps the columns, checks the result in layers, and keeps a record of every decision a reviewer makes — so the file that reaches the store is one somebody actually looked at.',
    ],
    features: [
      { title: 'Many destinations', text: 'Import formats for Shopify and WooCommerce tooling, including Matrixify, WebToffee and WP All Import.' },
      { title: 'Four kinds of sheet', text: 'Products, categories, customers and deals.' },
      { title: 'Checks in layers', text: 'Problems surface before the import, not after it.' },
      { title: 'Nothing uploaded', text: 'Files are read in the browser.' },
    ],
    spec: [
      { label: 'Runs', value: 'In the browser' },
      { label: 'Sheets', value: 'Products · categories · customers · deals' },
      { label: 'Sample data', value: 'Fictional' },
    ],
    disclaimer: 'Sample data is fictional. Not a certified integration.',
    family: [{ title: 'Commerce Studio', url: 'https://commerce-studio.mousabb2.chatgpt.site/', note: 'The published edition of the same workspace.' }],
  },
  {
    slug: 'diamedical-lab',
    order: 5,
    group: 'systems',
    title: 'DiaMedical Commerce Intelligence Lab',
    kicker: 'Independent e-commerce case study',
    promise: 'One question, followed all the way to the measurement.',
    summary: 'An independent case study built from public information: one buyer’s question traced through search, data, QA, a ticket and a measurement.',
    url: `${M}/diamedical/`,
    platform: ['Web', 'Workbook'],
    languages: ['English'],
    media: {
      hero: 'diamedical-lab',
      video: 'diamedical-lab',
      more: [
        { slug: 'diamedical-intro', label: 'How I Thought It Through — the narrated walkthrough' },
        { slug: 'diamedical-review', label: 'The experience review' },
        { slug: 'diamedical-workbook', label: 'The workbook explorer' },
      ],
    },
    intro: [
      '“We need a four-station Med-Surg lab for 24 students. Where do we start?” A buyer asks in their own words; a catalog answers in product language. The lab follows that one question through search, catalog data, QA, a developer ticket and the measurement that would prove the fix worked.',
      'It was built for a Marketing and eCommerce Coordinator application, from public pages only, and every number in it is labelled for what it is: public, bounded, modeled or a hypothesis.',
    ],
    features: [
      { title: 'Search', text: 'What the buyer typed, and what the catalog returned.' },
      { title: 'Data', text: 'The product records behind the answer, scored for completeness.' },
      { title: 'Ticket', text: 'The fix, written for a developer.' },
      { title: 'Measure', text: 'How you would know it worked.' },
    ],
    spec: [
      { label: 'Built from', value: 'Public pages only' },
      { label: 'Evidence', value: 'Public · bounded · modeled · hypothesis' },
      { label: 'Suite', value: 'Lab · academy · review · workbook · walkthrough' },
    ],
    disclaimer: 'An independent case study built from public information. Not commissioned or endorsed by DiaMedical USA.',
    family: [
      { title: 'DiaMedical Academy', url: `${M}/diamedical/academy/`, note: 'Guided learning experience.' },
      { title: 'Experience review', url: `${M}/diamedical-review/`, note: 'Evidence-backed website review.' },
      { title: 'Workbook explorer', url: `${M}/diamedical/v3/`, note: 'Interactive workbook.' },
      { title: 'How I Thought It Through', url: `${M}/diamedical-intro/`, note: 'Narrated reasoning walkthrough.' },
      { title: 'Halden Medical', url: 'https://lab.mousabatarseh.com/halden-medical/', note: 'Fictional-company adaptation.' },
    ],
  },

  // ─────────────────────────────── Sites & stores
  {
    slug: 'united-textile',
    order: 1,
    group: 'sites',
    title: 'United Textile',
    kicker: 'Shopify B2B wholesale store',
    summary: 'A Shopify wholesale storefront that organizes textile collections, case pricing and product details into a clearer B2B experience for buyers and staff.',
    url: 'https://shopunitedtextile.com/',
    urlLabel: 'shopunitedtextile.com',
    platform: ['Shopify'],
    languages: ['English'],
    media: { hero: 'united-textile', mobile: 'united-textile', full: 'united-textile', video: 'united-textile' },
    intro: [
      'A retail theme doesn’t explain case packs or wholesale pricing. United Textile is a Shopify storefront built for buyers who reorder rather than browse: collections organised around how retailers restock, case pricing shown alongside the unit price, and product details written for someone buying by the case.',
    ],
    spec: [
      { label: 'Platform', value: 'Shopify' },
      { label: 'Audience', value: 'Wholesale (B2B) buyers' },
      { label: 'Pricing', value: 'Case price with unit price' },
    ],
    related: [{ title: 'B2B Collections That Match How Retailers Actually Shop', url: 'https://mousabatarseh.com/blog' }],
  },
  {
    slug: 'universal-wholesale',
    order: 2,
    group: 'sites',
    title: 'Universal Wholesale',
    kicker: '14,000-item catalog migration',
    summary: 'A 14,000-item e-commerce catalog prepared for migration through record cleanup, field mapping, import planning, quality checks and data validation.',
    url: 'https://universalwholesaleonline.com/',
    urlLabel: 'universalwholesaleonline.com',
    platform: ['Wholesale e-commerce'],
    languages: ['English'],
    media: { hero: 'universal-wholesale', mobile: 'universal-wholesale', full: 'universal-wholesale', video: 'universal-wholesale' },
    intro: [
      'A catalog migration is decided before a single row is imported. Fourteen thousand items were prepared through detailed record cleanup, field mapping, import planning, quality checks and data validation — the work that decides whether a new store opens with a clean catalog or a messy one.',
    ],
    spec: [
      { label: 'Catalog', value: '14,000 items' },
      { label: 'Work', value: 'Cleanup · field mapping · import planning · QA · validation' },
    ],
    metrics: [{ value: '14,000', label: 'catalog items prepared for migration', source: V1 }],
    related: [{ title: 'Field Mapping Is the Whole Migration', url: 'https://work.mousabatarseh.com/product-catalog-migration-field-mapping/' }],
  },
  {
    slug: 'firefly-burgers',
    order: 3,
    group: 'sites',
    title: 'Firefly Burgers',
    kicker: 'Mobile-first restaurant website',
    summary: 'A responsive WordPress restaurant site with branded visuals, an easy-to-read menu and quick access to hours and location.',
    url: 'https://fireflyburgersmi.com/ver2/',
    urlLabel: 'fireflyburgersmi.com',
    platform: ['WordPress', 'Elementor'],
    languages: ['English'],
    media: { hero: 'firefly-burgers', mobile: 'firefly-burgers', full: 'firefly-burgers', video: 'firefly-burgers' },
    intro: [
      'Nobody sits at a desktop to find a burger special. Firefly Burgers was built mobile-first: the menu, hours, location and branding had to hold up for someone already in the parking lot.',
    ],
    spec: [
      { label: 'Platform', value: 'WordPress · Elementor' },
      { label: 'Priority', value: 'Mobile first' },
      { label: 'Location', value: 'Michigan' },
    ],
    related: [{ title: 'Restaurant Websites That Work on a Phone: Firefly Burgers', url: 'https://mousabatarseh.com/blog' }],
  },
  {
    slug: 'eat-with-samar',
    order: 4,
    group: 'sites',
    title: 'Eat With Samar',
    kicker: 'Bilingual health & food website',
    summary: 'A bilingual dietitian’s website, in English and Arabic, built around the food families already cook.',
    url: 'https://eatwithsamar.com/',
    urlLabel: 'eatwithsamar.com',
    platform: [],
    languages: ['English', 'Arabic'],
    media: { hero: 'eat-with-samar', mobile: 'eat-with-samar', full: 'eat-with-samar', video: 'eat-with-samar' },
    intro: [
      'A registered dietitian in Metro Detroit, presented in English and Arabic: her method, the ways families work with her and a direct way to get in touch — written for families who want nutrition advice that respects the food they already cook.',
    ],
    spec: [
      { label: 'Languages', value: 'English + Arabic' },
      { label: 'Sections', value: 'Method · services · contact' },
    ],
  },
  {
    slug: 'great-lakes-cigar-festival',
    order: 5,
    group: 'sites',
    title: 'Great Lakes Cigar Festival',
    kicker: 'WordPress event & ticketing site',
    summary: 'A responsive WordPress event hub for tickets, schedules, sponsors and vendors — measured in GA4 through the festival month.',
    url: 'https://greatlakescigarfest.com/home/',
    urlLabel: 'greatlakescigarfest.com',
    platform: ['WordPress', 'Elementor'],
    languages: ['English'],
    media: { hero: 'great-lakes-cigar-festival', mobile: 'great-lakes-cigar-festival', full: 'great-lakes-cigar-festival', video: 'great-lakes-cigar-festival' },
    intro: [
      'An event site has to hold tickets, vendors, schedules and sponsors without turning into a PDF. The festival hub was built in WordPress, then measured in Google Analytics 4 through the festival month to see whether people actually used it.',
    ],
    spec: [
      { label: 'Platform', value: 'WordPress · Elementor' },
      { label: 'Holds', value: 'Tickets · schedule · sponsors · vendors' },
      { label: 'Measured with', value: 'Google Analytics 4' },
    ],
    metrics: [
      { value: '287', label: 'users in GA4, July 4–31, 2025', source: V1, note: 'Date corrected to 2025 with Mousa' },
      { value: '1,954', label: 'events in GA4, July 4–31, 2025', source: V1, note: 'Date corrected to 2025 with Mousa' },
    ],
    related: [{ title: 'Building a WordPress Event Website People Actually Use', url: 'https://mousabatarseh.com/blog' }],
  },
  {
    slug: 'ptee',
    order: 6,
    group: 'sites',
    title: 'PTEE',
    kicker: 'Bilingual education platform',
    summary: 'A modern bilingual experience in Arabic and English for a theological education programme: a courses website and a separate admissions platform.',
    url: 'https://ptee-courses-admissions-renewal.mousabb2.chatgpt.site/',
    urlLabel: 'PTEE courses & admissions',
    platform: ['Courses website', 'Admissions portal'],
    languages: ['Arabic', 'English'],
    media: {
      hero: 'ptee-renewal',
      mobile: 'ptee-renewal',
      full: 'ptee-renewal',
      video: 'ptee-renewal',
      more: [
        { slug: 'ptee-admissions', label: 'The admissions and online-services portal' },
        { slug: 'btee-build', label: 'The hosting-migration build' },
      ],
    },
    intro: [
      'A Program for Theological Education by Extension (PTEE) needed a modern, professional bilingual experience in Arabic and English. The project combines a dedicated academic courses website with a separate admissions platform.',
    ],
    spec: [
      { label: 'Languages', value: 'Arabic (RTL) + English' },
      { label: 'Parts', value: 'Courses website · admissions portal' },
    ],
    family: [
      { title: 'Admissions portal', url: 'https://ptee.moseswebworks.com/admissions/en', note: 'Apply, save, track and verify documents.' },
      { title: 'BTEE bilingual build', url: 'https://btee.moseswebworks.com/ar/', note: 'Hosting-migration build of the redesign.' },
      { title: 'Courses & programs', url: 'https://ptee.moseswebworks.com/courses/ar', note: 'Bilingual course catalog.' },
    ],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
export const siteCases = () => cases.filter((c) => c.group === 'sites').sort((a, b) => a.order - b.order);
export const systemCases = () => cases.filter((c) => c.group === 'systems').sort((a, b) => a.order - b.order);
export const orderedCases = () => [...systemCases(), ...siteCases()];
