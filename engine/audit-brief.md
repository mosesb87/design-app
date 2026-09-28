# Store audit brief (for one target)

You are auditing ONE e-commerce storefront for Mousa Batarseh (Webmaster / E-Commerce Specialist, Warren MI), who is applying for a specific job at that company. Your output feeds (1) a 29-check ShelfMark scorecard and (2) a tailored, evidence-first review microsite with working fix prototypes. Everything must be TRUE and OBSERVED — quote what you saw, with URLs and dates. Never invent counts, names, numbers or page contents. If something can't be observed, say so.

## Tools
- Use `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"` via Bash to fetch raw HTML (you can grep <title>, <meta name="description">, <link rel="canonical">, <script type="application/ld+json">, alt="", "Skip to", breadcrumb markup, og:image etc.). Save every fetched page under the target's captures/ folder (see Output) so evidence is on disk.
- Use WebFetch when a page is JS-rendered or curl is blocked, and WebSearch for anything public about the company (size, HQ, brands, news).
- Do not log in, do not submit forms, do not add to cart, do not hammer the site: at most ~40 page fetches, spaced normally.
- If curl hits 403/429, fall back to WebFetch and note it.

## Part 1 — ShelfMark scorecard (29 checks)
Read /home/claude/engine/rubric.md and score every check exactly as defined (0/1/2/U). Fetch: homepage, robots.txt, sitemap.xml (+ the product sitemap it points to), one category/collection page, two product pages from it, contact/about pages, shipping/returns policy pages, any blog/news index. Write the result as JSON matching /home/claude/engine/audit-schema.json (all 29 ids present; evidence ≤140 chars each, with URL or quoted text; three strengths; three fixes; notes).

## Part 2 — Role-specific deep findings (the part that gets interviews)
Read the job posting duties listed in your target block. Then look for 4–6 findings that a hiring manager for THAT role would care about, each backed by evidence you captured. Prefer findings that can be COUNTED across many pages (e.g. "18 of 20 sampled PDPs share the same meta description", "product sitemap lists 1,240 URLs; 63 sampled return 404", "no BreadcrumbList schema on any PDP", "collection pages offer sort but no filters", "size chart is an image with no alt", "PDP titles truncate at 60 chars on 14 of 20", "search returns 0 results for the brand's own top SKU name"). To count, pull the product sitemap and sample 15–25 product URLs with curl (respectfully). Good finding types by role:
- Site merchandising / DTC ops: collection order and sort defaults, out-of-stock items ranking first, missing filters/facets, broken or empty collections, promo/price inconsistencies between listing and PDP, missing or duplicated PDP content blocks, launch/seasonal freshness, cross-sell gaps, subscription/bundle presentation, cart/checkout friction visible from public pages.
- Catalog/data quality (B2B): attribute completeness, spec tables, part-number searchability, unit/pack info, price visibility policy, category tree depth, duplicate products, image counts, PDF spec sheets, sitemap coverage vs. category counts.
- SEO/content: templated titles/descriptions, missing canonicals, indexable filter/parameter URLs, thin category copy, missing structured data, robots blocking, pagination, blog freshness, internal linking.
For EACH finding record: id, title (≤70 chars), what you observed (2–3 sentences with URLs), the count/sample ("14 of 20 sampled PDPs…"), why it matters for this role (1 sentence, no hype), the concrete fix (what changes on which page/setting — Shopify/Magento/etc. specific when the platform is known), and which captured file(s) prove it.
Also list 3 things the site does WELL (specific, with evidence) — the review must open with strengths.

## Part 3 — Brand and posting capture (for building the review in their look)
- brand.md: primary/secondary colors as hex (from the CSS / logo / buttons you fetched — quote the CSS variable or rule), fonts (from <link> to Google Fonts / @font-face names), logo description and URL of the logo image file, tone of voice in 5 words, 2–3 signature phrases from their homepage, favicon URL, og:image URL.
- posting.md: the exact role title, employer, location/mode, salary if shown, apply URL, the posting's responsibilities and requirements verbatim (or as close as the page allows), the people found (name, title, source URL — never invent), and the date posted.
- company.md: what the company is, size, HQ, brands/stores, anything public (news, funding, launches) from the last 12 months with sources.

## Output (write files, then reply with a short summary)
Write into /home/claude/reviews/<slug>/ :
- audit.json  (Part 1)
- findings.md (Part 2, structured as described; include the 3 strengths)
- brand.md, posting.md, company.md (Part 3)
- captures/  (raw HTML/text of every fetched page, named by path, plus a captures/index.txt listing URL → file → HTTP status → fetched-at)
Your final message: 10 lines max — score-relevant caveats, the 4–6 finding titles with their counts, and anything that blocked you. Do not paste the files into the message.
