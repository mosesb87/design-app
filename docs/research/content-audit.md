# Mousa Batarseh portfolio: content audit (as fetched 2026-09-26 via Exa)

**Scope.** I fetched every URL in the brief. Some pages build their content with JavaScript, and for those Exa returned only the page title or code. I've marked them "text not extractable", which means I could not check their content. The pages that exist but aren't listed on the portfolio (`/v2/about/`, `/v2/lab/`, `/about`) all return **404**. I also fetched `/v2/work/`, `/reviews/`, `/reworked-review/`, the live tools, and `asas.mousabatarseh.com`. One external source came up in a search: LinkedIn `linkedin.com/in/mousabatarseh`. I've labelled it "external" wherever I use it.

---

## 1. Identity

**Positioning lines and taglines**
| Line | URL |
|---|---|
| "Webmaster \| Ecommerce Specialist"; page title "E-Commerce & Website Management" | `/` (v1), `work.` |
| "I build and run WordPress websites and e-commerce stores — and the checks that keep them honest. Catalogs, promotions, SEO, and the Friday jobs nobody should do by hand." | `/v2` hero |
| "Every part in its place." / "the person you call when the website looks fine but nothing quite works" / "happiest when a site goes from fragile to boring — in the best way" | `/v2` |
| "Counted, not claimed." / "Built to fix something real." / "Then I make them work better." / "Start with the business goal. End with the measurement." | `/v2` |
| "Send the site, the store or the spreadsheet that isn't behaving. I'll tell you what I see, with dates." | `/v2` CTA |
| "A request is trusted by default. Almost every error begins there." / "makes the check run before the mistake does" / "Calculated, not claimed." | `/v2`, `lab.` |
| "Structure first. Style without limits." / "Build the page before you style it." / "Grey is a decision, not a placeholder." / Quote: "I built ASAS because I kept starting client pages by deleting somebody else's colours." | v1, `asas.` |
| "I prevent pricing errors and menu discrepancies before they go live." / "The check runs before the promotion does." | `lab./northgate-group/` |
| "Independent website reviews, built from live evidence" | `/reviews/` |
| "Exploring marketing-operations, e-commerce and promotions roles in cannabis." | `/deals-os/` footer |
| External: "I Build websites that work, then I make them work better." | LinkedIn |

**Location:** Warren, Michigan / Warren, MI / "Metro Detroit" (`/reviews/`). The Bran proposal says "Michigan-based, Eastern Time".

**Years of experience claimed (they don't agree):**
- **"5+ years"**: v1, `work.`, Northgate page, LinkedIn headline (external).
- **"Six years"**: `/v2` about, `/deals-os/` footer, Gardner-White proposal.
- **"Seven years of web development, WordPress since 2019"**: Bran proposal.
- The v2 counter "0+ Years" doesn't render a number.

**Languages:** English and Arabic (`/v2`). Arabic search, RTL support and Arabic stop-words appear in ASAS, SEO Tools and AI Academy.

**Platforms:** v1 lists WordPress, Elementor, WooCommerce, Shopify. v2 adds Divi. The proposals add Wix (k-wav.com), plus Squarespace and GoDaddy described as "audited".

**Contact details as published:**
- Email: `hireme@mousabatarseh.com` (v2, case studies, lab, reviews, proposals, jobs).
- Phone: `(248) 810-1816 (+12488101816)` (lab, `/reviews/`, `/deals-os/`, Gardner-White).
- LinkedIn: `linkedin.com/in/mousabatarseh` (`/reviews/`, Gardner-White).
- **v1 shows no email or phone** in the extracted text. `work.` only has "Download Resume".

---

## 2. Skills, services, tools, certifications and methods

**v1 / `work.` skill groups:**
- Business Operations: SOPs, scope tracking, executive support, change logs, QA.
- Product Data Management: imports/CSV, attribute mapping, variants, SKU/image-URL mapping, customer groups and wholesale pricing, volume-pricing rules.
- SEO Expertise: keyword research, technical/on-page SEO, schema, sitemaps, GSC/GA4, audits.
- E-Commerce Management: coupons, shipping, B2B registration, responsive QA.
- Excel Expertise: VLOOKUP, XLOOKUP, INDEX/MATCH, pivots, validation, reconciliation, price sheets.

**v1 tools:**
- Development: WordPress, Elementor, WooCommerce, Shopify, HTML, CSS, **Adobe Dreamweaver**, Photoshop.
- Analytics: GA4, GSC, Google Business Profile, **Moz**, Semrush, Yoast.
- Email: Mailchimp, Constant Contact.
- Productivity: MS Office, Google Workspace, Jotform.
- Content and AI: Grammarly, ChatGPT, Copilot, Gemini, Claude ("Human review before any content is published").

**v2 services (6):** E-commerce operations; Product data & catalogs; WordPress & Elementor builds; SEO & analytics; Design & marketing assets; Workflow & documentation.

**v2 skill chips:** these add **JavaScript and PHP** and drop Moz, Dreamweaver, Grammarly, the AI tools and MS Office.

**Courses & Certifications (v1 and `work.` only; `work.` adds "View Certificate" links):**
| Course | Issuer as stated |
|---|---|
| Advanced Digital Marketing & Growth Strategies | "Coursera coursework from the Wharton School" |
| Foundations of Digital Marketing | Google |
| Think Outside the Inbox | Google |
| Attract and Engage Customers | Google |
| Shopify Complete Training | Udemy |
| WordPress Complete Training | Udemy |
| Web Development Fundamentals | NuCamp |

v1 calls these "coursework" or "training". v2 has no certifications section at all.

**11-step method** (identical on v1, `work.` and v2): 1 Business Goal → 2 Research → 3 Planning → 4 Content → 5 Design → 6 Development → 7 Testing → 8 SEO → 9 Launch → 10 Measure → 11 Improve. v1 gives a one-line description for each step.

**Four-step method.** v2 lists only the names. The full definitions are on `/reviews/`:
1. **Read it like a machine**: "Sitemap, robots, canonicals, schema and prices, straight from the public HTML."
2. **Date every claim**: "Every finding carries its date, URL and the check behind it."
3. **Build the fix**: "A scanner, a template or a working browser a team can use on Monday."
4. **Sequence the work**: "Template fixes first, because one change fixes hundreds of pages."

**Three layers** (`/v2`, `lab.`):
- **01 The sheet ("What was asked")**: the supplier export, deal sheet or brief. Example: promo $19.20 against reg $24.00 at 20% off, which matches.
- **02 The register ("What the system holds")**: catalog, live price, inventory, vendor terms, margin floor. Example: system reg $25.60, vendor cap 20%, margin floor 32%, so the sheet price is stale and Check 04 fails.
- **03 The shelf ("What the customer sees")**: menu, product page, search result, the answer an AI engine quotes. Verdict: blocked, owner is the pricing team.

The lab also publishes five build principles ("How every build is made", i–v). The main ones: public data only, runs in the browser, a plain-English reason plus a named owner for every verdict, two independent implementations must agree where money is involved, and a guide ships with every build.

---

## 3. Published metrics

| Metric | Label / context | Source |
|---|---|---|
| 14,000-item catalog | Universal Wholesale "prepared for migration" | v1 |
| "14,000-SKU catalog migration" | Mistakenly attached to the HOT WHEEL demo entry (copy error) | `work.` |
| "1,000 to 14,000+ SKUs" | Catalog range | Northgate |
| 287 users, 1,954 events, July 4–31, 2026 | GA4, Great Lakes Cigar Festival | v1, `work.` |
| 4,038 templates, 32 families, EN+AR, native .JSON | ASAS | v1, `work.`; lab says "4,038 real Elementor blocks" |
| **3,881 blocks, 143 pages, 29 categories**, 12 kits, 37 widget types, 24 blocks/file, 187 heroes, 1,290-px captures | ASAS | `asas.`, `/v2/work/asas-studio/` |
| PageSpeed desktop 98 / 100 / 100 / 100 | Performance, Accessibility, Best Practices, SEO | `work.` (v1 shows the widget with no numbers) |
| 16 checks, 5 groups, 4 answers, 11 mandatory fields, film 3:46 | Deals OS | `/v2/work/deals-os/`, `/deals-os/` |
| 20 submitted, 7 cleared (35%), 11 blocked, 2 held | "modeled week" (Deals OS) / "sample week" (Northgate) | `/deals-os/`, Northgate |
| **$6,479 "Exposure prevented in one week"** | Labelled modeled on `/deals-os/`; **not labelled modeled on Northgate** | Northgate |
| D-1009: $39.99 on the sheet vs $34.99 in the system; 35% off gives $22.74 | Demo | `/deals-os/`, Northgate |
| 25% discount, guest price $67.49, binding limit: vendor cap | Calculator example | `lab.` |
| 9 tools; 71 chars → 11 clipped → 58 of 60 | SEO Tools | `/v2/work/seo-tools/`, `lab.` |
| changeatlas-core 1.0.0; 1,349 deltas; ProofGraph depth 3, cap 80 nodes, 42 affected; samples of about 1,000, 300 and 10,000 rows | ChangeAtlas | `/changeatlas/`, `/changeatlas/app/` |
| 10 MB, 5,000 rows, 200 cols, 30 sheets; 12 product destinations; 13 sample sheets | CSV Mapper / Commerce Studio | `/csv-mapper/` |
| 65 records; 16 URLs; public pages read 2026-08-27→29; **865 formula cells, 13 sheets**; 7 scenes (~6 min); completeness weights 25/25/20/15/10/5; T-003 est. 2–4 h | DiaMedical | `/diamedical-intro/` |
| 12 stations; "Paycom job 270458" | Interview Trainer | `/diamedical-training/` |
| Explainers of 56 min and 28 min | DiaMedical | `/diamedical/` (from its code) |
| 1,447 / 3,545 listings (40.8%) sold out; 124 collections; 23 PDPs; 2,611 single-image listings (73.7%) | Carhartt Reworked review, Sep 25, 2026 | `/v2`, `/reworked-review/` |
| "20 reviews · 56 builds · updated Sep 22, 2026" | Reviews index | `/reviews/` |
| "All 22 reviews"; "53 entries"; "All 26 websites & stores" | Work index | `/v2/work/`, `/v2` |
| 26 apps, 2 interviews, 22 reviews, 34 people, 70+ roles | Job tracker | `/jobs/` |
| "Fifty-two builds on one hosting account" | RMC | `/rmc-proposal/` |
| 78–94 mobile PageSpeed, 96–100 accessibility | "The reviews site" | Bran, RMC proposals |
| 140 pages sampled; 5/22 pages with schema; 98.5% alt; TTFB 0.075 s; 1,275,015 B HTML; 63 scripts; 0/36 meta | Audit of Bran's sites | `/bran-proposal/` |
| **100% / 80% / 60% / 90%** tiles | Unlabelled; they read like targets | `/bran-proposal/` |
| 68 pages sampled across 4 sites; per-site table | Audit of RMC's sites | `/rmc-proposal/` |
| 19 lessons, Arabic + English | AI Academy | `apps.moseswebworks.com/aiacademy/` |

**v2 "By the numbers" counters (all show 0 in the text):**
| Counter | Best value found elsewhere | Status |
|---|---|---|
| "+ Years managing websites…" | 5+ (v1, `work.`, Northgate) / 6 (v2, Gardner-White) / 7 (Bran) | **Unverified; needs the client** |
| "+ Product SKUs cleaned…" | 14,000 (v1, Northgate, ASAS) | Supported by other pages |
| "Real Elementor blocks in ASAS" | 3,881 (current ASAS site) vs 4,038 (v1, lab) | **Conflict** |
| "Checks every promotion passes" | 16 | Supported |
| "Independent website reviews" | 20 (`/reviews/`, proposals) vs 22 (`/v2/work/`, `/jobs/`) | **Conflict** |
| "Files uploaded by my browser tools" | 0 | **0 is the correct value** |

The lab page counters also show 0 in the text. Values I found elsewhere: 20 / 7 / 11 / $6,479 (modeled); 65 records; 16 URLs; 7 scenes; 865 cells; 13 worksheets; title budget 60. "Developer tickets", "Flags reconciled" and "Passes" have no source, so they are unverified. The `/reviews/` counters also show 0. "Products checked by script" and "% of findings dated" have no source.

---

## 4. Item-by-item inventory

| Item | What it is | Problem → approach | Key features / numbers | Disclaimers | Status |
|---|---|---|---|---|---|
| **ChangeAtlas Commerce** `/changeatlas/`, `/changeatlas/app/` | Checks a catalog import before it runs | A single wrong column can wipe barcodes or alt text → it diffs a Matrixify or WooCommerce export in the browser | 7 delta classes (created…unknown); 6 evidence classes; ProofGraph; "absence is not emptiness"; batch plan; signed review package; BLOCK / READY / REVIEW / UNKNOWN samples | Role: "Concept, rules, design and build". Fictional store. No store writes, no uploads | Live |
| **CSV Mapper** `/csv-mapper/` (Commerce Studio `commerce-studio.mousabb2.chatgpt.site` is the same app) | Supplier spreadsheet → Shopify or WooCommerce import | Messy columns → auto-mapping, 4 check layers, a record of review decisions | 12 destinations (Matrixify, WebToffee, WP All Import…); sheet types Products, Categories, Customers, Deals; 13 fictional samples; manual | Fictional sample data; "not a certified integration". Manual says "Back to **Musa's** Portfolio" and mentions "House of Dank control families" | Both live (duplicates) |
| **DealProof** `/dealproof/` | Promotion checks before launch | Wrong price ruins a promo → guided inspection, industry walkthroughs, Google Sheets workbook | Checks price, dates, eligibility, channels | — | Page title only; text not extractable |
| **SEO Tools** `/SEO-Tools/` | 9 client-side SEO tools | — | Meta/SERP preview, OG/Twitter, JSON-LD, keyword density with Arabic stop-words, robots.txt (can block AI crawlers), UTM, slug, hreflang, counter | "No tracking" | Live |
| **Deals OS** `/deals-os/` | Promotion QA workbook, rule engine and films | Deal sheet vs the system of record → 16 checks C1–C16 in 5 groups; pass / warn / fail / n/a | Spreadsheet and JavaScript versions give "same verdicts to the dollar"; Friday report | "Exposure figures… modeled examples, not money anyone banked" | Live |
| **ASAS Studio** `asas.mousabatarseh.com` | Elementor wireframe library with Arabic block names | Judge structure before style → browse, stack, colour kit, native JSON | Figures in §3 (conflict); RTL; "Free… don't resell"; "Elementor Ltd. is not involved" | Where the blocks come from and how they're licensed isn't stated | Site live; `/studio/` text not extractable |
| **DiaMedical Lab** `/diamedical/` + suite | Independent case study for a Marketing and eCommerce Coordinator role | Buyer question ("four-station lab for 24 students") vs catalog language → loop: search, data, QA, ticket, measure; Pathfinder | Figures in §3; synonym and typo search; completeness score; ticket T-003 | "independent, not commissioned… not commissioned or endorsed by DiaMedical USA"; metrics tagged public / bounded / modeled / hypothesis | Main, Academy, Review, v3: text not extractable. **Copy, print and right-click are blocked by script.** Training and Intro live |
| ↳ Interview Trainer `/diamedical-training/` | 12-station study path | — | Shows internal notes publicly: "Do not say DiaMedical asked for or approved this", "content/paycom-270458.md; ROLE_COVERAGE.md" | — | Live |
| ↳ How I Thought It Through `/diamedical-intro/` | Narrated walkthrough in 6 acts | — | "I checked two misspelled searches… Two checks is a hypothesis, not a finding" | "practice numbers, clearly marked" | Live |
| **The Lab** `lab.mousabatarseh.com` | Hub for 5 builds | — | Meridian Wholesale / Northgate / Halden Medical Supply are labelled "modeled company" | Yes | Live |
| **Northgate Retail Group** `lab./northgate-group/` | Deals OS adapted for a Dutchie / Weedmaps / Leafly role | Same 16 rules, plus the Menu & Promotion Manager, QA workbook and calculator | $6,479; "minutes from Riverside"; "Happy to walk through any of it in the interview" | **No fictional disclaimer on the page itself.** Only `/v2` and `lab.` say it's fictional | Live |
| **Halden Medical** `lab./halden-medical/` | DiaMedical adaptation | — | — | Title only: "(independent)" | Text not extractable; copy-protected |
| **HOD demo** `hod-demo.mousabatarseh.com` | Menu & Promotion Manager | — | — | "INTERVIEW DEMO… for House of Dank. All products… fictional. This is not a House of Dank system." (clear) | Banner only extractable |
| **Job tracker** `/jobs/` | Public application tracker | — | Figures in §3 | — | Live; **see §7** |
| **AI Academy** `apps.moseswebworks.com/aiacademy/` | Arabic + English AI learning board | — | 19 lessons (Cursor, Claude Code, ChatGPT, "Cursor cracks" security lesson) | — | Live over https; http timed out once |
| **Gardner-White** `/gardner-white-proposal/` | "Same-Day Answers" web-orders desk demo | Rules spread across 4 policy pages → one queue with policy clock, fraud screen, reply drafts, end-of-day report | 9 demo inquiries; 7 fraud signals; 90-day plan | "Fictional customers… Real policy figures… quoted Sep 22, 2026" | Live. Title matches URL |
| **Bran Marketing** `/bran-proposal/` | Web department proposal: audit, "Line Card Intelligence", build standard | — | Figures in §3; prototype with 18 fictional products; code snippets | Snippets marked fictional | Live. Title matches URL |
| **RMC** `/rmc-proposal/` | Build standard, "watchtower" monitoring, request desk | — | 68-page audit table; 6-domain watchtower run | Riverbend is marked fictional | Live. Title matches URL |
| **Carhartt Reworked review** `/reworked-review/` | 10 work orders, 4 working fixes | — | Figures in §3 | "my read of a public posting, not inside information" | Live |

**Websites and stores.** The client should confirm each one.
- v1 Selected Work: Universal Wholesale (WooCommerce), Firefly Burgers MI, Great Lakes Cigar Festival, United Textile Wholesale (Shopify), Wild Bill's Vape Flavors Menu.
- `/v2/work/` lists 26 sites: ASAS; PTEE ×6 variants (including "BTEE Bilingual Build"); American Hot Wheel; Eat With Samar; Father's Day landing; Firefly; Full House Wholesale; GLCF; Jabal Amman Publishers; Larkspur Mobility; Mawtini Dabke Troupe; Mr. Vapor menu; Ophir Publishers – Jordan; Samona Hospitality; St. Mary Church Berkley; United Textile; Universal Wholesale; Wild Bill's ×4 landing pages and menus.

---

## 5. Content found in only one version

- **v1 only:** full skill, Excel, email, productivity and AI-tool lists; certifications; Moz and Dreamweaver; Wild Bill's Vape Flavors Menu; Firefly on the home page; the GA4 metric; a PageSpeed widget with no numbers.
- **`work.` only:** PTEE featured with a description; the **Hot Wheel demo-store** ("A portfolio skill showcase—not a live business website"); "Download Resume"; PageSpeed 98/100/100/100; "View Certificate" links.
- **v2 only:**
  - About (six years, Divi, languages)
  - By the numbers
  - Sheet / register / shelf
  - The four-step method
  - 7 systems and the fictional-adaptation note
  - Eat With Samar, Larkspur, Jabal Amman
  - The Carhartt review teaser
  - The 6 services
  - JavaScript and PHP
  - The whole `/v2/work/` index: DiaMedical suite, proposals, job tracker, AI Academy, Commerce Studio, "House of Dank Marketing Operations OS"
- **Proposals only:** k-wav.com (Wix LED-display manufacturer, "built and maintained"); "independent contractor"; "on-call alongside a full-time job for the last two years"; the "200+ location retailer" (Wild Bill's Tobacco) and its B2B store; monthly GA4/GSC reporting at two employers; United Textile rankings. **k-wav.com is missing from the 26-site list.**

---

## 6. Keep vs. fix

**Worth keeping:**
- The sheet / register / shelf model.
- The four-step review method.
- Evidence classes (public / bounded / modeled / hypothesis, and ChangeAtlas's six).
- "A check that did not run is not a check that agreed."
- Two independent implementations that agree.
- Dated, sourced findings that lead with a number.
- The D-1009 break-it-yourself demo and the ChangeAtlas row-412 walkthrough.
- The "What the product refuses to do" list.
- The loop-in-one-week story (DiaMedical).
- The lab's five build principles.
- Bilingual ASAS with Arabic block names.
- The clear HOD disclaimer.
- 90-day plans.

**Weak, repetitive or unclear:**
- **The counters render as 0 in the text.** That undercuts "Counted, not claimed" for crawlers, AI engines, no-JS visitors and screen readers.
- The hero name is repeated 4× in the text ("Mousa Mousa Mousa Mousa…").
- **Duplicate or overlapping tools:** CSV Mapper = Commerce Studio = "Commerce Import Workspace". DealProof overlaps Deals OS, HOD OS and Northgate. There are 6 DiaMedical entries plus Halden, and 6 PTEE entries.
- Case studies describe the tools but give no real-world adoption or outcomes. The "Built with" field is empty for ChangeAtlas and Deals OS.
- Jargon is dense (ProofGraph, rekeyed, NOT_EXECUTED).
- The v1 and `work.` skill/tool lists are long and generic, and they duplicate each other.
- `work.` has a copy error (the 14,000-SKU line under Hot Wheel) and inconsistent casing ("Woocommerce", "Wordpress").
- The copy-protection scripts on DiaMedical and Halden are hostile to reviewers and hurt accessibility.
- Commerce Studio sits on a third-party `chatgpt.site` domain and spells the name "Musa".
- Much of the content only renders with JavaScript, so it can't be indexed or quoted.

---

## 7. Contradictions and risky claims the client needs to confirm

1. **Years of experience:** 5+ vs six vs seven ("WordPress since 2019").
2. **ASAS inventory:** 4,038 templates / 32 families vs 3,881 blocks / 29 categories.
3. **Universal Wholesale platform and role.** The portfolio and Bran proposal say WooCommerce, and "built and ran" / "migrated the catalog across platforms". LinkedIn (external) says **Repzio**, with the migration from an HTML site. v1 only says "prepared for migration". Also check whether "14,000-SKU migrations" should be plural.
4. **United Textile SEO.** RMC says "pages 1–2 within the first year". LinkedIn says "first page within six months" for United Textile and "first or second pages within the first year" for *Universal Wholesale*. These look conflated. LinkedIn also says about 1,000 products.
5. **Review and build counts:** 20 vs 22 reviews; 56 vs 52 builds vs 53 entries vs 26 sites.
6. **Employment claims that appear only in proposals:** "200+ location retailer" and its B2B store; "ran the request queue for a whole company"; monthly GA4/GSC reporting at Universal Wholesale and Wild Bill's; "independent contractor"; "on-call… last two years"; k-wav.com; "built this from your public pages in a day".
7. **American Hot Wheel.** `/v2/work/` lists it as a "WooCommerce storefront" under "Sites and stores I built or ran". `work.` says it's a demo, not a live business. `/jobs/` shows he applied to AMERICAN HOT WHEEL LLC. Visitors could read it as client work.
8. **Northgate** is presented like a real application ("Riverside", "the interview") with no fictional disclaimer on the page. It reuses the real House of Dank posting (Dutchie, Weedmaps, Leafly, Monday.com). The $6,479 figure isn't marked modeled there.
9. **Bran KPI tiles (100/80/60/90%)** read like results but are unexplained targets.
10. **Point-in-time scores:** PageSpeed 98/100/100/100 and 78–94. GA4 287 / 1,954: confirm the year and property.
11. **`/jobs/` is public and linked from `/v2/work/`.** It publishes recruiters' and hiring managers' names, salary asks ("asked $45–$50/hr"), an interview street address, "Needs ApplicantPro password", and skip reasons. This is a high privacy and reputation risk; I'd recommend removing it or putting it behind a login. Its weekdays also don't match 2026: "Sunday Sept 14, 2026" was a Monday, and "Mon Aug 18" and "Sun Aug 31" match 2025, not 2026.
12. **DiaMedical Interview Trainer** exposes interview-prep notes, and `/jobs/` shows an active DiaMedical interview. Decide whether both should be public.
13. **Public critiques of named companies and people:** Recovery Africa "credits Shannon Egan", testimonial domains that are parked, proposals addressed to "Alicia, Marcie" and "Shannon", and reviews of cannabis firms he contacted. Confirm he's comfortable publishing these.
14. **ASAS block sourcing and licensing.** The blocks are "real captures of rendered Elementor templates" offered under "Yours… don't resell". Confirm where the templates came from and what rights he holds.
15. **Certifications:** confirm each one is a certificate rather than coursework, and that the "Wharton via Coursera" wording is accurate.
16. **PHP and JavaScript** appear as v2 skills; the only evidence is the proposal code snippets.

**Couldn't verify:** the text of the DiaMedical Academy, Review and v3 pages, Halden Medical, the ASAS `/studio/`, DealProof, and the body of the HOD demo, because they only render with JavaScript. I also couldn't find the URL of the Hot Wheel demo store.
