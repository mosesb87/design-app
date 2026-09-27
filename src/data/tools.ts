// The tools Mousa built. Every line is his own published wording or a fact from his pages (checked Sep 26, 2026;
// sources in docs/research/case-facts.md and docs/research/content-audit.md). Fields a page doesn't state are
// left out rather than written for him. `tools` (the first seven) feeds the home rack; `toolPages` feeds /tools/.
export type ToolDetail = {
  slug: string;
  name: string;
  promise?: string;
  what: string;
  problem?: string;
  problemSource?: string;
  how?: { title: string; text?: string }[];
  inside?: string[];
  numbers?: { v: string; l: string }[];
  role?: string;
  made?: string;
  languages?: string;
  quote?: string;
  note?: string;
  status: 'Live' | 'Live demo' | 'Independent study';
  live: string;
  liveLabel?: string;
  caseStudy?: string;
  media: string;
  shows?: string;
  family?: { name: string; url: string; note: string }[];
};

const M = 'https://mousabatarseh.com';

export const toolPages: ToolDetail[] = [
  {
    slug: 'dealproof',
    name: 'DealProof',
    promise: 'Good deals. No surprises.',
    what: 'A guided promotion check before launch: price, dates, eligibility and channels.',
    problem: 'One wrong price can undo a great promotion.',
    how: [
      { title: 'Capture' },
      { title: 'Check', text: 'The demo offer: $24 × (1 − 20%) = $19.20, against an offer price of $18.00.' },
      { title: 'Resolve' },
      { title: 'Review', text: '“Keep the decision human.”' },
    ],
    inside: ['Four industry workspaces: grocery, fashion retail, restaurants and cannabis retail', 'A Google Sheets workbook with fictional examples across eight worksheets', '“Try it. Nothing publishes.”'],
    numbers: [{ v: '4', l: 'industries' }, { v: '52', l: 'fictional examples' }, { v: '8', l: 'worksheets' }],
    role: 'Concept, checks, design and build',
    note: 'Fictional records. Example systems, no live connection.',
    status: 'Live demo',
    live: `${M}/dealproof/`,
    media: 'dealproof',
    family: [{ name: 'The Deals Operating System', url: '#deals-os', note: 'The full promotion-QA system this check comes from' }],
  },
  {
    slug: 'changeatlas',
    name: 'ChangeAtlas Commerce',
    promise: 'Know what an import will change before it runs.',
    what: 'A browser-only checker that compares a Matrixify or WooCommerce catalog export with a baseline and returns a decision — BLOCK, REVIEW, READY or UNKNOWN — with row-level evidence.',
    problem: 'A catalog import is the most dangerous routine job in a store. One column in the wrong place and a thousand variants lose their barcodes, or a “blank” cell quietly clears an image alt text on every product.',
    how: [
      { title: 'Load', text: 'A Matrixify XLSX or WooCommerce CSV export and its baseline, in the browser. No credentials, no store writes.' },
      { title: 'Class every change', text: 'Created, changed, cleared, omitted, rekeyed, removed or unknown — each cited by sheet, row and column.' },
      { title: 'Keep unknowns unknown', text: '“Absence is not emptiness”: a missing sheet stays UNKNOWN until you declare it empty.' },
      { title: 'Decide and hand over', text: 'A decision, a batch plan that keeps groups intact, and a review package with digests and the rule-set version.' },
    ],
    inside: ['Six evidence classes: source stated, calculated, inferred, observed, user asserted, unknown', 'A ProofGraph — bounded traversal, depth 3, capped at 80 nodes', 'Rule set changeatlas-core@1.0.0', 'A print view, and a walkthrough: “Four minutes, one blank cell”'],
    numbers: [{ v: '0', l: 'store writes' }, { v: '0', l: 'files uploaded' }, { v: '1,349', l: 'deltas in the sample' }],
    role: 'Concept, rules, design and build',
    quote: 'Evidence before confidence.',
    note: 'Everything runs in the browser against a fictional store.',
    status: 'Live',
    live: `${M}/changeatlas/`,
    caseStudy: 'changeatlas',
    media: 'changeatlas',
    family: [{ name: 'ChangeAtlas review demo', url: `${M}/changeatlas/app/`, note: 'The review workflow, processing sample catalog updates' }],
  },
  {
    slug: 'deals-os',
    name: 'The Deals Operating System',
    promise: 'One intake row. Sixteen checks. One verdict.',
    what: 'A working promotion-QA prototype: every deal is checked against the system of record — price, cap, margin, dates — before it reaches a menu. It exists as a spreadsheet and a JavaScript engine, with a narrated film.',
    problem: 'A promotion can look right and still start from the wrong price.',
    how: [
      { title: 'One intake row', text: 'Eleven fields are mandatory, including the SKU, both prices and the limit per customer.' },
      { title: 'Sixteen checks', text: 'In five groups: identity (C1–C3), price (C4–C5), policy (C6–C9), timing (C10–C12) and readiness (C13–C16).' },
      { title: 'One verdict', text: 'Four answers — pass, warn, fail, n/a. One failure blocks the deal. QA writes the verdict into the last two columns.' },
      { title: 'The Friday report', text: 'Written from the same rows.' },
    ],
    inside: ['A spreadsheet version and a JavaScript version that return the same verdicts to the dollar', 'A live copy of the engine, on deal D-1009: the regular price is $39.99; the SKU master says $34.99', 'A 3:46 narrated film, then a six-minute walkthrough'],
    numbers: [{ v: '16', l: 'checks' }, { v: '5', l: 'groups' }, { v: '4', l: 'answers' }],
    role: 'Workbook, rule engine, walkthrough and films',
    quote: 'A check that did not run is not a check that agreed.',
    note: 'Exposure figures in the report are modeled examples, not money anyone banked.',
    status: 'Live',
    live: `${M}/deals-os/`,
    caseStudy: 'deals-os',
    media: 'deals-os',
    shows: 'Fixing D-1009, the blocked deal, in the live demo',
    family: [
      { name: 'DealProof', url: '#dealproof', note: 'The launch checker' },
      { name: 'Northgate Retail Group', url: 'https://lab.mousabatarseh.com/northgate-group/', note: 'A fictional-company adaptation: Menu & Promotion Manager, the QA workbook and a discount calculator' },
      { name: 'House of Dank marketing operations OS', url: 'https://hod-demo.mousabatarseh.com/', note: 'An interview demo; all products, brands and prices are fictional. Not a House of Dank system.' },
    ],
  },
  {
    slug: 'csv-mapper',
    name: 'CSV Mapper',
    promise: 'A supplier’s spreadsheet arrives messy. It leaves as a store import.',
    what: 'A browser-only workspace that maps a supplier CSV or XLSX to Shopify or WooCommerce import templates, runs four layers of checks and exports the file.',
    problem: 'The slow part of a catalog migration is lining up someone else’s columns against the template.',
    how: [
      { title: 'Load a sheet', text: 'Products, categories, customers or deals. Your file stays in the browser — no spreadsheet uploads to a server.' },
      { title: 'Map it', text: 'To one of twelve product destinations: six Shopify, including Matrixify, and six WooCommerce, including WP All Import.' },
      { title: 'Check it', text: 'Four layers: file & mapping, values & logic, relationships, destination & evidence.' },
      { title: 'Decide, then export', text: 'Blockers can’t be overridden. Warnings need a written reason of at least 12 characters.' },
    ],
    inside: ['An optional trusted reference sheet, with “Fill verified blanks”', 'Unusual sibling-price detection', 'GTIN check digits', 'Deal maths: percent off, BOGO, buy-X-get-Y', 'A user manual and fictional sample sheets'],
    numbers: [{ v: '12', l: 'destinations' }, { v: '0', l: 'files uploaded' }, { v: '0', l: 'accounts needed' }],
    role: 'Concept, mapping rules, design and build',
    quote: 'Blank means unknown, not zero or false.',
    status: 'Live',
    live: `${M}/csv-mapper/`,
    caseStudy: 'csv-mapper',
    media: 'csv-mapper',
    shows: 'Loading a sample sheet and mapping its columns',
    family: [{ name: 'Commerce Studio', url: 'https://commerce-studio.mousabb2.chatgpt.site/', note: 'The published edition of CSV Mapper' }],
  },
  {
    slug: 'asas-studio',
    name: 'ASAS Studio',
    promise: 'Build the page before you style it.',
    what: 'A free library of real Elementor blocks drawn in grey: stack them into a page, color it with a kit and export native Elementor JSON. English and Arabic, right-to-left native.',
    problem: 'A styled template makes you judge the color. A grey one makes you judge the page: does the hierarchy hold, does the proof sit next to the claim, does the call to action arrive when the reader is ready?',
    how: [
      { title: 'Browse', text: 'Filter by room (hero, pricing, FAQ), by behaviour (static, carousel, accordion, tabs, split) or by ASAS name.' },
      { title: 'Stack', text: 'Build the page in grey, so the first thing you judge is the structure.' },
      { title: 'Color', text: 'Twelve kits set ink, paper, lines and accent across every block at once.' },
      { title: 'Export', text: 'The same JSON format Elementor uses for its own library. Arabic pages export right-to-left.' },
    ],
    inside: ['Every block has an Arabic name with English beside it', 'The Studio names any block that needs Elementor Pro before you download', 'Elementor core widgets only: 37 widget types, no third-party add-on', 'Placeholder images are copied into the media library on import'],
    numbers: [{ v: '3,881', l: 'blocks' }, { v: '143', l: 'ready-made pages' }, { v: '29', l: 'categories' }, { v: '12', l: 'kits' }],
    role: 'Product, library, studio and bilingual site',
    languages: 'English & Arabic',
    quote: 'Grey is a decision, not a placeholder.',
    note: 'Independent — made by one builder, not a marketplace. Elementor Ltd. is not involved.',
    status: 'Live',
    live: 'https://asas.build/',
    liveLabel: 'asas.build',
    caseStudy: 'asas-studio',
    media: 'asas',
    shows: 'Applying color kits to the live page',
  },
  {
    slug: 'seo-tools',
    name: 'SEO Tools',
    promise: 'Sixty characters. Spend them on what people search for.',
    what: 'Nine browser tools for the checks a webmaster actually runs. Nothing is uploaded, tracked or stored.',
    how: [
      { title: 'Write the title', text: 'As written: 71 characters, 11 clipped in the results page.' },
      { title: 'Preview it', text: 'The search preview updates as you type.' },
      { title: 'Fix it', text: '58 of 60 characters, with the keyword first.' },
    ],
    inside: ['Meta tags with a search-results preview', 'Open Graph and Twitter cards', 'Schema JSON-LD', 'Keyword density with Arabic stop-words', 'robots.txt — it can block AI crawlers', 'UTM builder', 'Slug generator', 'hreflang, English + Arabic ready', 'Word counter'],
    numbers: [{ v: '9', l: 'tools' }, { v: '0', l: 'accounts' }, { v: '0', l: 'sent to a server' }],
    role: 'Design and build, single-file HTML + JS',
    languages: 'English · Arabic stop-words',
    status: 'Live',
    live: `${M}/SEO-Tools/`,
    media: 'seo-tools',
    shows: 'Typing a title and URL — the search preview updates live',
  },
  {
    slug: 'diamedical-lab',
    name: 'DiaMedical Commerce Intelligence Lab',
    promise: 'One question, followed all the way to the measurement.',
    what: 'An independent e-commerce case study: one buyer’s question traced through product discovery, catalog quality, website QA, a developer handoff and a measurement, backed by a 13-sheet Excel workbook.',
    problem: 'A program director thinks in learners, skills, room and budget; a catalog is organized by category, brand, attribute and SKU.',
    how: [
      { title: 'Search', text: 'Product discovery with explained ranking, synonyms and typo tolerance.' },
      { title: 'Score', text: 'A catalog quality score out of 100 with visible weights: identity 25%, category and attributes 25%, content 20%, SEO 15%, merchandising 10%, freshness 5%.' },
      { title: 'Hand off', text: 'A website QA register that keeps observation apart from interpretation, and developer ticket T-003 with eight others.' },
      { title: 'Measure', text: 'A modelled reporting workspace and a 30/60/90-day plan. Every claim is labelled public, bounded, modeled or hypothesis.' },
    ],
    numbers: [{ v: '65', l: 'product records' }, { v: '16', l: 'audited URLs' }, { v: '13', l: 'workbook sheets' }],
    role: 'Research, workbook, QA, walkthrough — independent, not commissioned',
    quote: 'Two checks is a hypothesis, not a finding.',
    note: 'Not commissioned, approved, or endorsed by DiaMedical USA. Not a redesign of the store. Not a claim of measured business results.',
    status: 'Independent study',
    live: `${M}/diamedical/`,
    caseStudy: 'diamedical-lab',
    media: 'diamedical-lab',
  },
  {
    slug: 'ai-academy',
    name: 'AI Academy',
    what: 'A bilingual AI learning map: nineteen lessons in Arabic and English.',
    inside: ['Lessons on Cursor, Claude Code and ChatGPT', 'A security lesson: “Cursor cracks”'],
    numbers: [{ v: '19', l: 'lessons' }, { v: '2', l: 'languages' }],
    languages: 'Arabic & English',
    status: 'Live',
    live: 'https://apps.moseswebworks.com/aiacademy/',
    media: 'ai-academy',
  },
];

// The home rack: seven tools, each linking to its section on /tools/.
export type Tool = { n: string; name: string; promise: string; what: string; href: string; live: string; media: string; caseStudy?: boolean; shows?: string };
const rackOrder = ['changeatlas', 'deals-os', 'csv-mapper', 'diamedical-lab', 'asas-studio', 'dealproof', 'seo-tools'];
export const tools: Tool[] = rackOrder.map((slug, i) => {
  const t = toolPages.find((x) => x.slug === slug)!;
  return { n: String(i + 1).padStart(2, '0'), name: t.name, promise: t.promise ?? t.what, what: t.what, href: `/tools/#${t.slug}`, live: t.live, media: t.media, caseStudy: !!t.caseStudy, shows: t.shows };
});
