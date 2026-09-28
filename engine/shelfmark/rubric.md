# ShelfMark Storefront Rubric v1.0 (Sept 2026)

You are auditing e-commerce storefronts with ONLY publicly fetchable pages. Score each criterion 0, 1 or 2 exactly as defined. If you could not observe the thing at all (page blocked, not fetched, not visible in fetched content), score "U" (unverified) — never guess. Evidence must be a specific, short observation (≤140 chars) with the URL or quoted text you saw.

Pages to fetch per company (use WebFetch; ask it to report the front-matter meta block — title, canonical, meta-description, meta-generator — plus nav links, footer links, prices, CTAs, breadcrumbs, filters, reviews, blog dates, phone/address, social links, "Skip to content" link, image alt text):
1. Homepage
2. https://DOMAIN/robots.txt (plain text)
3. https://DOMAIN/sitemap.xml (or the Sitemap: path from robots.txt)
4. One category/collection page (from the nav)
5. Two product pages (from that category). For B2B sites with no product pages, fetch the catalog/product-range page and the "become a customer"/ordering page instead.
6. Contact and/or About page if not clear from the homepage footer.

Platform detection (record + evidence): Shopify (cdn.shopify.com, /collections/, /products/, meta shopify-*), WooCommerce/WordPress (/wp-content/, meta-generator WordPress/Elementor + cart), BigCommerce (cdn11.bigcommerce.com, /shop/), Magento (/static/frontend/, mage), Wix (static.wixstatic.com), Squarespace (static1.squarespace.com), Salesforce/Demandware (demandware.static), custom/other.

## Pillar F — Findability (technical SEO)
F1 HTTPS — 2: site serves on https (final URL https). 0: http only. 1: mixed/uncertain.
F2 robots.txt — 2: present, does not block products/categories, contains a Sitemap: line. 1: present but no Sitemap line, or blocks something important. 0: missing, or Disallow: / for all.
F3 XML sitemap — 2: reachable and includes product/category (or article) URLs. 1: reachable but thin/only static pages. 0: not reachable.
F4 Title tags — 2: homepage title is descriptive (brand + what/where) AND a sampled product page title is unique and descriptive. 1: present but generic/duplicated/templated. 0: missing or just "Home".
F5 Meta descriptions — 2: specific meta description on homepage AND on a sampled product page. 1: on one only, or templated/duplicated. 0: none.
F6 Canonical tags — 2: canonical present on homepage AND product page. 1: on one only. 0: none.
F7 Structured data — usually U (WebFetch hides <script> tags). Score only if you saw explicit evidence (e.g. rich result text, "application/ld+json" mention); otherwise U.
F8 Clean URLs — 2: readable hyphenated product/category URLs, no session IDs. 1: readable but with awkward separators or numeric IDs appended. 0: query-string-only product URLs (e.g. ?id=123).

## Pillar C — Catalog (product data quality)
C1 Product titles — 2: descriptive and consistent (brand/type/size or count). 1: partially descriptive. 0: vague/inconsistent.
C2 Descriptions — 2: ≥50 words of specific copy on both sampled products. 1: short/boilerplate (<50 words) or only one product. 0: missing.
C3 Imagery — 2: ≥2 images per product (gallery) with alt text. 1: one image or missing alt. 0: none/placeholder.
C4 Price & availability — 2: price AND stock/availability state visible (B2B: clear "login for pricing" plus how to get an account). 1: price only, no availability. 0: neither/unclear.
C5 Variants & specs — 2: structured variant selectors and/or a spec table (size, weight, ingredients, dimensions). 1: variants only described in text. 0: none where expected.
C6 Taxonomy & breadcrumbs — 2: logical category tree (≥2 levels) AND breadcrumbs on product/category pages. 1: categories but no breadcrumbs. 0: flat/none.
C7 Collection filters & sort — 2: filters (price/type/attribute) AND sort on category pages. 1: sort or pagination only. 0: none.
C8 Site search — 2: search box with a results page. 1: search present but weak/unclear. 0: none.

## Pillar B — Buy (conversion path)
B1 Primary CTA — 2: "Add to cart"/"Order online"/"Request a quote" prominent on product page AND homepage. 1: present but buried. 0: no path to buy/enquire.
B2 Shipping & returns — 2: shipping AND returns/refund info with specifics (thresholds, timelines) linked from product page or footer. 1: generic policy page only. 0: none.
B3 Checkout access — 2: guest checkout, or for B2B a clear "become a customer" application with steps. 1: account required but sign-up exists. 0: no way to buy online.
B4 Merchandising — 2: homepage features collections/seasonal/new/best sellers with working links. 1: static links only. 0: none.
B5 Trust signals — 2: product reviews/ratings or store reviews PLUS guarantees/award/secure badges. 1: one type only. 0: none.

## Pillar T — Trust (credibility & contact)
T1 Contact — 2: phone + physical address + form/email. 1: form/email only. 0: none.
T2 About — 2: substantial about/story page. 1: brief. 0: none.
T3 Policies — 2: privacy AND terms (accessibility statement is a bonus, note it). 1: one. 0: none.
T4 Social — 2: ≥2 linked profiles. 1: one. 0: none.
T5 Accessibility basics — 2: skip link AND alt text on product images (or an accessibility statement). 1: some. 0: images without alt and no skip link.

## Pillar N — Content (authority & freshness)
N1 Blog/news freshness — 2: a dated post within the last 90 days (today is 2026-09-28). 1: blog exists but stale or undated. 0: none.
N2 Guides/FAQ — 2: FAQ AND guides/recipes/how-tos. 1: FAQ only or one guide. 0: none.
N3 Locations/where-to-buy — 2: store/dealer locator or locations page with addresses & hours (B2B: service area/depots). 1: a bare list. 0: none.
