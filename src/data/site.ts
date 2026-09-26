// Identity, method, services and supporting content.
// Every line here is taken from Mousa's published pages (sources noted) or was confirmed by him.

export const SITE_URL = 'https://mousabatarseh.com';
export const CHECKED = '2026-09-26'; // date the content audit verified these facts

export const person = {
  name: 'Mousa Batarseh',
  first: 'Mousa',
  last: 'Batarseh',
  roles: ['Webmaster', 'WordPress & e-commerce', 'Product data', 'SEO'],
  location: 'Warren, Michigan',
  region: 'Metro Detroit',
  email: 'hireme@mousabatarseh.com',
  phoneDisplay: '(248) 810-1816',
  phoneHref: 'tel:+12488101816',
  linkedin: 'https://www.linkedin.com/in/mousabatarseh',
  linkedinLabel: 'linkedin.com/in/mousabatarseh',
  languages: ['English', 'Arabic'],
  platforms: ['WordPress', 'WooCommerce', 'Shopify'],
  builders: ['Elementor', 'Divi'],
  years: 7, // confirmed by Mousa, 2026-09-26
  wordpressSince: 2019, // confirmed by Mousa, 2026-09-26
  // /v2 hero
  intro:
    'I build and run WordPress websites and e-commerce stores — and the checks that keep them honest. Catalogs, promotions, SEO, and the Friday jobs nobody should do by hand.',
  availability: 'Available for the next problem',
  // /v2 about (years updated to seven, confirmed)
  about: [
    'I’m Mousa — the person you call when the website looks fine but nothing quite works. Seven years building and running sites on WordPress, Elementor and Divi have taught me that a good website is equal parts design, data and discipline: pages that load fast and read well, catalogs that stay clean whether they live in WooCommerce or Shopify, and SEO that’s built into the structure rather than bolted on afterwards.',
    'I turn “someone does this by hand every Friday” into systems that run themselves, and I’m happiest when a site goes from fragile to boring — in the best way.',
  ],
  // /v2 thesis
  thesis: {
    lead: 'A request is trusted by default. Almost every error begins there.',
    body: 'A supplier’s export says one thing and the store’s import expects another. A deal sheet names one price and the register charges a second. The storefront a customer browses is a mirror of the register — and mirrors drift.',
    close:
      'Every build I make starts at that seam and does the same first thing: it reduces the request to something that can be checked, so one set of rules can judge it before a customer ever sees it.',
  },
  contactLine: 'Send the site, the store or the spreadsheet that isn’t behaving.',
  contactSub: 'I’ll tell you what I see, with dates.',
} as const;

// The three layers, with Mousa's own worked example (/v2).
export const layers = [
  {
    n: '01',
    name: 'The sheet',
    title: 'What was asked',
    text: 'The supplier export, the deal sheet, the brief. Written by a person, in a hurry, from memory.',
    example: 'Promo price $19.20 · reg price $24.00 · “20% off” → 20% of $24.00 is $19.20. Matches.',
  },
  {
    n: '02',
    name: 'The register',
    title: 'What the system holds',
    text: 'The catalog, the live price, the inventory, the signed vendor terms, the margin floor.',
    example: 'System reg price $25.60 · vendor cap 20% · margin floor 32% → sheet price is stale. Check 04 fails.',
  },
  {
    n: '03',
    name: 'The shelf',
    title: 'What the customer sees',
    text: 'The menu, the product page, the search result, the answer an AI engine quotes back.',
    example: 'Verdict: blocked before a menu · owner: pricing team · reason written in plain words → nothing wrong ever reached the shelf.',
  },
] as const;

// Four-step method (/reviews)
export const method = [
  { n: '01', title: 'Read it like a machine', text: 'Sitemap, robots, canonicals, schema and prices, straight from the public HTML.' },
  { n: '02', title: 'Date every claim', text: 'Every finding carries its date, URL and the check behind it.' },
  { n: '03', title: 'Build the fix', text: 'A scanner, a template or a working browser a team can use on Monday.' },
  { n: '04', title: 'Sequence the work', text: 'Template fixes first, because one change fixes hundreds of pages.' },
] as const;

// Eleven-step workflow (v1 with its descriptions)
export const workflow = [
  ['Business goal', 'Define the business need, audience, scope, and success criteria.'],
  ['Research', 'Review available data, competitors, users, and technical constraints.'],
  ['Planning', 'Map the site structure, content, tasks, owners, and timeline.'],
  ['Content', 'Write or refine clear, useful, search-aware website copy.'],
  ['Design', 'Create responsive layouts and visuals aligned with the brand.'],
  ['Development', 'Build or update pages, forms, stores, and site features.'],
  ['Testing', 'Verify content, links, forms, responsiveness, and core functionality.'],
  ['SEO', 'Optimize titles, metadata, headings, links, images, and crawl paths.'],
  ['Launch', 'Publish approved work and complete final production checks.'],
  ['Measure', 'Review analytics, search data, and key user actions.'],
  ['Improve', 'Use verified findings to prioritize the next site improvements.'],
] as const;

// Six services with the tools named on /v2
export const services = [
  {
    n: '01',
    title: 'E-commerce operations',
    text: 'Manage the details that keep Shopify and WooCommerce stores accurate: products, pricing, inventory, variants, images and promotions.',
    tools: ['Shopify', 'WooCommerce', 'Catalog management', 'B2B workflows', 'Promotions'],
  },
  {
    n: '02',
    title: 'Product data & catalogs',
    text: 'Clean, map, validate and migrate large catalogs with practical spreadsheets and import-ready CSV workflows.',
    tools: ['CSV imports', 'Attribute mapping', 'Variants & SKUs', 'Inventory & pricing', 'Catalog QA', 'XLOOKUP', 'INDEX/MATCH', 'Pivot tables'],
  },
  {
    n: '03',
    title: 'WordPress & Elementor builds',
    text: 'Build and maintain responsive pages that are consistent, easy to update and ready for real customers.',
    tools: ['WordPress', 'Elementor', 'Divi', 'HTML', 'CSS', 'JavaScript', 'PHP'],
  },
  {
    n: '04',
    title: 'SEO & analytics',
    text: 'Improve on-page structure and track performance with GA4, Search Console and reporting teams can act on.',
    tools: ['Google Analytics 4', 'Search Console', 'On-page SEO', 'Google Business Profile', 'Semrush', 'Yoast SEO'],
  },
  {
    n: '05',
    title: 'Design & marketing assets',
    text: 'Create product graphics, campaign pages and email assets that support launches and seasonal promotions.',
    tools: ['Photoshop', 'Mailchimp', 'Constant Contact', 'Jotform', 'Content QA'],
  },
  {
    n: '06',
    title: 'Workflow & documentation',
    text: 'Turn repeatable work into documented processes, QA checklists and tools that reduce errors and improve handoffs.',
    tools: ['SOPs', 'QA checklists', 'Change logs', 'Browser tools'],
  },
] as const;

// Skill groups (v1), condensed for the about page spec sheet
export const skills = [
  {
    title: 'Product data management',
    items: ['Catalog imports, exports and CSV preparation', 'Attribute mapping and variant structure', 'Categories, collections and product organization', 'SKU management and image-URL mapping', 'Inventory, pricing and product-data maintenance', 'Customer groups, wholesale and volume pricing', 'Catalog validation and quality assurance'],
  },
  {
    title: 'SEO',
    items: ['Keyword research and page-topic targeting', 'Technical and on-page SEO', 'Titles, metadata, headings and content structure', 'Internal linking and image optimization', 'Alt text, schema, sitemaps and crawl checks', 'Google Search Console and Google Analytics 4', 'SEO audits and documented updates'],
  },
  {
    title: 'E-commerce management',
    items: ['Shopify, WooCommerce and WordPress administration', 'Coupons, promotions and sale rules', 'Shipping settings and customer accounts', 'B2B registration and wholesale workflows', 'Responsive QA, bug tracking and issue resolution'],
  },
  {
    title: 'Excel',
    items: ['CSV import templates and product-data mapping', 'VLOOKUP, XLOOKUP, INDEX and MATCH', 'Pivot tables, charts and operational reports', 'Duplicate checks and exception review', 'Catalog and inventory reconciliation', 'Price sheets and volume-pricing models'],
  },
  {
    title: 'Business operations',
    items: ['Workflow planning, process improvement and SOPs', 'Scope tracking and project coordination', 'Cross-functional communication and handoffs', 'Issue tracking, change logs and organized files', 'Quality assurance and detail-oriented closeout'],
  },
] as const;

export const toolGroups = [
  { title: 'Development & website', items: ['WordPress', 'Elementor', 'Divi', 'WooCommerce', 'Shopify', 'HTML', 'CSS', 'Photoshop'] },
  { title: 'Analytics & SEO', items: ['Google Analytics 4', 'Google Search Console', 'Google Business Profile', 'Moz', 'Semrush', 'Yoast SEO'] },
  { title: 'Email marketing', items: ['Mailchimp', 'Constant Contact'] },
  { title: 'Productivity', items: ['Microsoft Word, Excel, PowerPoint', 'Google Workspace', 'Jotform'] },
  { title: 'Writing & AI', items: ['Grammarly', 'ChatGPT', 'Copilot', 'Gemini', 'Claude', 'Human review before anything is published'] },
] as const;

// Courses & certifications as published on v1 (issuer as stated; described there as coursework/training)
export const courses = [
  { title: 'Advanced Digital Marketing & Growth Strategies', issuer: 'Wharton School, via Coursera', text: 'Digital strategy, customer acquisition and growth frameworks.' },
  { title: 'Foundations of Digital Marketing', issuer: 'Google', text: 'Digital marketing fundamentals and online customer engagement.' },
  { title: 'Think Outside the Inbox', issuer: 'Google', text: 'Email strategy, campaign planning and audience engagement.' },
  { title: 'Attract and Engage Customers', issuer: 'Google', text: 'Search, digital campaigns and customer engagement.' },
  { title: 'Shopify Complete Training', issuer: 'Udemy', text: 'Shopify setup, catalog management, pricing, inventory and store operations.' },
  { title: 'WordPress Complete Training', issuer: 'Udemy', text: 'WordPress setup, themes, plugins, page builders and content management.' },
  { title: 'Web Development Fundamentals', issuer: 'NuCamp', text: 'HTML, CSS, responsive layouts and front-end fundamentals.' },
] as const;

// Six curated reviews (the full set of 22 stays on the live /reviews/ index)
export type Review = {
  slug: string;
  title: string;
  site: string;
  focus: string;
  date: string; // ISO
  number: string;
  numberLabel: string;
  fix: string;
  url: string;
  media: string; // capture slug
};
export const reviews: Review[] = [
  { slug: 'carhartt-reworked', title: 'Carhartt Reworked', site: 'reworked.carhartt.com', focus: 'E-commerce & DTC', date: '2026-09-25', number: '1,447 / 3,545', numberLabel: 'published listings with nothing left to buy', fix: 'Ten work orders and four working fixes, including a gift-collection builder.', url: 'https://mousabatarseh.com/reworked-review/', media: 'review-carhartt-reworked' },
  { slug: 'oakwood-veneer', title: 'Oakwood Veneer', site: 'oakwoodveneer.com', focus: 'Catalog & UX', date: '2026-09-19', number: '300+', numberLabel: 'species behind two filters', fix: 'Species Atlas — a working, species-faceted browser built as the fix.', url: 'https://mousabatarseh.com/oakwood-review/', media: 'review-oakwood' },
  { slug: 'vanguard', title: 'Vanguard', site: 'vanguardworld.com', focus: 'Product templates', date: '2026-09-19', number: '443', numberLabel: 'products carrying one template’s three defects', fix: 'A before/after toggle that applies the template fix to all 443 products.', url: 'https://mousabatarseh.com/vanguard-review/', media: 'review-vanguard' },
  { slug: 'jb-tools', title: 'JB Tools', site: 'jbtools.com', focus: 'Catalog & listings', date: '2026-09-19', number: '122 / 358', numberLabel: 'torque wrenches out of stock, one ranked #3', fix: 'A triage board and a supplier-price SOP.', url: 'https://mousabatarseh.com/jbtools-review/', media: 'review-jbtools' },
  { slug: 'hay-house', title: 'Hay House', site: 'shop.hayhouse.com', focus: 'Pricing & catalog', date: '2026-09-16', number: '$9.50 / $18.99', numberLabel: 'the same ISBN on two Hay House storefronts', fix: 'A catalog card with worked examples.', url: 'https://mousabatarseh.com/hayhouse-review/', media: 'review-hayhouse' },
  { slug: 'biotrust', title: 'BioTRUST', site: 'biotrust.com', focus: 'Launch readiness', date: '2026-09-19', number: '117', numberLabel: 'products in a public, indexable staging store', fix: 'A clickable go-live gate that only reads GO when the blockers are cleared.', url: 'https://mousabatarseh.com/biotrust-review/', media: 'review-biotrust' },
];
export const reviewsIndexUrl = 'https://mousabatarseh.com/reviews/';

// Six notes from the blog (WordPress)
export const posts = [
  { title: 'Core Web Vitals on a Page-Builder Site', date: '2026-08-12', topic: 'WordPress & web', url: 'https://work.mousabatarseh.com/core-web-vitals-elementor-wordpress/' },
  { title: 'Filters Are the Real Search', date: '2026-05-14', topic: 'E-commerce operations', url: 'https://work.mousabatarseh.com/product-filters-attributes-ecommerce/' },
  { title: 'Redirects Are the Migration', date: '2026-03-19', topic: 'SEO', url: 'https://work.mousabatarseh.com/redirect-mapping-ecommerce-migration/' },
  { title: 'The SKU Is a Decision, Not a Label', date: '2026-03-03', topic: 'Product data', url: 'https://work.mousabatarseh.com/sku-structure-product-catalog/' },
  { title: 'On-Page SEO When You Have Thousands of Product Pages', date: '2026-01-27', topic: 'SEO', url: 'https://work.mousabatarseh.com/on-page-seo-large-product-catalog/' },
  { title: 'Field Mapping Is the Whole Migration', date: '2025-11-06', topic: 'E-commerce operations', url: 'https://work.mousabatarseh.com/product-catalog-migration-field-mapping/' },
] as const;
export const blogUrl = 'https://mousabatarseh.com/blog';

// Everything lives on this site: the blog and the reviews are sections of it, not links to other sites.
export const nav = [
  { label: 'Work', href: '/work/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
] as const;

export function formatDate(iso: string, style: 'short' | 'long' = 'short') {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', style === 'short' ? { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' } : { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
