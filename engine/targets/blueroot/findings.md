# Blueroot Health — role-specific findings (DTC Operations Manager)

Scope: fairhavenhealth.com scored in full (40 fetches, all HTTP 200, 2026-09-28); bariatricfusion.com, vitalnutrients.co and unjury.com sampled (17 fetches) for cross-brand consistency. All four are separate Shopify stores sharing one app stack (Klaviyo, Recharge, Rebuy, Stamped, Gorgias, Redo, Route, Triple Whale, UserWay) and one ship-from/footer address (45 Kenneth Dooley Drive, Middletown CT 06457). Everything below is structural, data, merchandising or technical-SEO; no health or medical claim language was evaluated. Evidence files are in `captures/` (see `captures/index.txt` for URL → file → status → time).

---

## What the sites do well (lead with these)

**S1. A clean technical-SEO baseline on Fairhaven.** robots.txt allows crawling and ends with `Sitemap: https://www.fairhavenhealth.com/sitemap.xml`; the sitemap index resolves to 32 product and 42 collection URLs; every one of the 20 sampled PDPs has a self-referencing canonical, a unique title, a unique meta description and a `Product` + `Offer` JSON-LD block (with `sku` and `gtin12`), and 17 of 20 add `FAQPage` JSON-LD. Proof: `captures/fh_robots.txt`, `captures/fh_sitemap.xml`, `captures/fh_pdp_sample_summary.json`.

**S2. Real, metafield-driven discovery on collections.** Collection pages use Shopify Search & Discovery filters built on custom metafields — `filter.p.m.custom.gender`, `life_stage`, `trying_to_conceive_`, `health_benefit`, `key_ingredients`, `made_without`, `product_form`, `lifestyle`, `fsa_hsa_eligible` — plus nine sort options, and `/search?q=fertilaid` returns a proper results page ("Search: 30 results found") with the same filters. Sister stores use the same approach (Bariatric Fusion: `product_form`, `flavor`, `surgery_type`; Vital Nutrients: `category`, `lifestyle`, `dietary_restriction_free_from_`). Proof: `captures/fh_collections_female-fertility-supplements.html`, `captures/fh_search_fertilaid.html`, `captures/bf_collections_all.html`, `captures/vn_collections_all.html`.

**S3. One PDP template, and prices that agree everywhere.** All 20 sampled Fairhaven PDPs render the same `template--23886386430237__main-product` structure — Key benefits → Ingredients → Suggested Use → Product Description → Frequently Asked Questions → Frequently Bought Together (Rebuy) — with a Stamped review badge (FertilAid for Women: 1,921 reviews, 4.5★) and a Recharge subscribe-and-save widget at 10% on 17 of 20. Collection-card price = PDP price = `products.json` price on 20 of 20 sampled Fairhaven products, 40 of 40 Bariatric Fusion cards and 16 of 16 Vital Nutrients cards checked; and the 89 SKUs sold on both bariatricfusion.com and unjury.com show 0 price mismatches and 0 availability mismatches. Proof: `captures/fh_pdp_sample_summary.json`, `captures/fh_products.json`, `captures/bf_products.json`, `captures/unjury_products.json`.

---

## Findings

### FIND-1 · Footer "Shop" links and the sitemap point at empty collections

**Observed.** `/collections/shop-pregnancy` (footer link "Pregnancy") renders "0 products … No products found", yet its `<title>` still reads "Stretch Mark Cream, Fetal Dopplers, Prenatal Vitamins – Fairhaven Health" and the page is indexable and listed in `sitemap_collections_1.xml`. `/collections/pregnancy-and-ovulation-tests` (footer link "Pregnancy and Ovulation Tests") also renders "No products found"; `/collections/ovulation-prediction` (footer link "Ovulation Prediction") returns exactly one product via `/collections/ovulation-prediction/products.json` — the sold-out BabyDance lubricant; `/collections/private/products.json` returns 0 products, and `private`, `uncategorized` and `fairhaven-health` are all published in the public sitemap. `collections.json` reports `products_count: 0` for `pregnancy-products` and `shop-pregnancy`, and counts such as 120 (`fairhaven-health`), 74 (`sitewide-savings`) and 45 (`private`) against a storefront of 32 published products, i.e. the collections are still full of unpublished/legacy items.

**Count.** 3 of the 8 collection links in the footer "Shop" column lead to an empty or single-sold-out-item collection; 4 of the 42 collections in the sitemap were verified empty or near-empty (2 report `products_count: 0`); 32 published products vs 42 published collections.

**Why it matters.** The posting's first duty is "collections, navigation … routine QA checks for broken links … content discrepancies"; a footer link to "0 products" is exactly the purchase-path dead end that role exists to catch.

**Fix.** In Shopify Admin → Products → Collections, unpublish `shop-pregnancy`, `pregnancy-products`, `pregnancy-and-ovulation-tests`, `private`, `uncategorized` and `fairhaven-health` from the Online Store sales channel (or delete them) so they leave the sitemap; retitle the survivors (drop "Stretch Mark Cream, Fetal Dopplers"); edit the footer menu (Online Store → Navigation → Footer) so "Pregnancy" → `/collections/prenatal` and "Ovulation Prediction" is removed or repointed; add a monthly check that reads `/collections.json` and flags any published collection whose storefront count is 0.

**Proof.** `captures/fh_collections_shop-pregnancy.html`, `captures/fh_collections_pregnancy-and-ovulation-tests.html`, `captures/fh_collections_ovulation-prediction_products.json`, `captures/fh_collections_private_products.json`, `captures/fh_collections.json`, `captures/fh_sitemap_collections_1.xml`, `captures/fh_home.html` (footer links).

---

### FIND-2 · A sold-out product is the #2 item on All Products and in the search drawer sitewide

**Observed.** `/collections/all` defaults to "Alphabetically, A-Z" (`<option value="title-ascending" selected>`), so "BabyDance Fertility Lubricant – No Applicators" — the only fully sold-out product in `products.json` (`available: false`) — sits at position 2 of 32 with a "Sold out" badge. The theme's search drawer "Trending Now" block, present on every fetched page, lists the same first three A-Z products, so the sold-out item is the second "trending" product on the homepage, contact page, policy pages and every PDP. On the curated collection `/collections/female-fertility-supplements` (sort "Featured"/manual, 17 products) it is placed 13th, and in `/search?q=fertilaid` it is 12th of 30. vitalnutrients.co `/collections/all` also defaults to A-Z; bariatricfusion.com's defaults to "Featured".

**Count.** Sold-out item at position 2 of 32 on `/collections/all`; at position 2 of 3 in "Trending Now" on 32 of 32 captured Fairhaven pages; 1 of 32 products sold out (Bariatric Fusion 7 of 112 + 2 partially; Vital Nutrients 4 of 168; UNJURY 8 of 85).

**Why it matters.** The role owns "sort defaults" and "product discoverability"; the first screen of the all-products page and the search drawer are the two highest-traffic merchandising slots and both currently lead with an item nobody can buy.

**Fix.** Set the default sort for the All Products collection to Best selling (Admin → Collections → All products → Sort: Best selling) or to Manual with sold-out items pushed last; enable "push sold-out to bottom" in the Search & Discovery app and point the Vision theme's search-drawer "Trending Now" block at a curated collection instead of the default product list; add the `available` flag from `/products.json` to the weekly QA sheet so any OOS SKU ranking in the top 8 of a nav collection is flagged.

**Proof.** `captures/fh_collections_all.html`, `captures/fh_home.html`, `captures/fh_pages_contactus.html`, `captures/fh_search_fertilaid.html`, `captures/fh_collections_female-fertility-supplements.html`, `captures/fh_products.json`, `captures/vn_collections_all.html`, `captures/bf_collections_all.html`.

---

### FIND-3 · "30% OFF" promo badge on single-variant products while every price still shows full

**Observed.** A theme promo badge reading "30% OFF / LIMITED-TIME OFFER / SELECT SIZES – APPLIED IN CART" is rendered over the product image on 5 cards of `/collections/all` and on the matching PDPs (`fertilecm-cervical-mucus-supplement`, `fertilitea-fertility-tea-for-women`, `milkies-nursing-postnatal-breastfeeding-multivitamin`, `complete-lactation-support`, `menopause-multivitamin-essentials`). All five are single-variant products (`options: ['Title']`, variant "Default Title"), so "select sizes" cannot apply. Because the discount is an in-cart automatic discount, the card, the PDP price ($26.99 for FertileCM), the `Offer.price` in JSON-LD (26.99) and the Recharge widget's subscription price ($24.29 = 10% off full price) all show the undiscounted number; `compare_at_price` is null on 32 of 32 products (and on 112 of 112 Bariatric Fusion, 167 of 168 Vital Nutrients and 85 of 85 UNJURY products), so no store ever shows a strike-through sale price.

**Count.** 5 of 32 products badged; 5 of 5 single-variant; 0 of 5 show a reduced price on card, PDP or JSON-LD; 0 of 32 products use compare-at pricing.

**Why it matters.** "Pricing errors … content discrepancies" and "promotions" are explicit QA duties, and an `Offer.price` that differs from the checkout price is a Merchant Center / Shop app mismatch waiting to be flagged.

**Fix.** Run the promotion as compare-at pricing on the affected variants (Admin → Products → bulk editor → Compare-at price) or as a Shopify Functions discount surfaced on cards/PDP via the theme's price block, so badge, price and `Offer.price` agree; edit the badge copy in the theme block (drop "SELECT SIZES" for single-variant products, or make it conditional on `product.variants.size > 1`); document a promo launch checklist: badge → price display → JSON-LD → subscription price → cart total, tested on one badged PDP before go-live.

**Proof.** `captures/fh_products_fertilecm-cervical-mucus-supplement.html` (badge markup + `$26.99` + ld+json price 2699), `captures/fh_collections_all.html`, `captures/fh_home.html`, `captures/fh_products.json` (`compare_at_price: null`, single `Default Title` variants), `captures/bf_products.json`, `captures/vn_products.json`, `captures/unjury_products.json`.

---

### FIND-4 · Supplement Facts live only in JPGs; product_type and tags are unusable for merchandising

**Observed.** On 17 of 20 sampled Fairhaven PDPs the facts panel is a gallery image (`…_SFP.jpg`, alt "…supplement facts."); no PDP has an HTML table, and the "Ingredients" accordion on 15 of 20 holds only the other-ingredients line of 8–19 words (e.g. "Vegetarian Capsule (cellulose), Cellulose, Rice Bran Lipid, Silica…"). Only PeaPod Prenatal (117 words), FertiliTea (206) and BabyDance (270) list contents as text. `products.json` shows `product_type` blank on 32 of 32 products (Bariatric Fusion: 0 of 112 blank, typed as Capsule / Soft Chews / Protein Tubs…; Vital Nutrients 4 of 168; UNJURY 1 of 85), 32 distinct tags on 32 products including three spellings for one concept ("Vaginal Care & Menopause", "Shop Vaginal Care", "vaginal care"), "Bundles" and "Combo", and internal tags (`exclude_rebuy`, `fam-fhpro-men`, `faw-fhpro-women`, `Ovia`, `The Ribbon Box`, `Private`, `premium`) mixed with merchandising tags. One product (`milkies-nursing-postnatal-breastfeeding-multivitamin`) has an empty `body_html`, 3 images, no facts image and no subscription widget.

**Count.** Facts panel image-only on 17 of 20 PDPs, HTML table on 0 of 20; Ingredients accordion ≤19 words on 15 of 20; `product_type` blank on 32 of 32; 32 tags / 32 products; 1 of 32 products with an empty description.

**Why it matters.** "Product attributes", "SKU-level conversion monitoring" and feeds all key off product_type/tags, and text that exists only inside a JPG cannot be searched, filtered, read by screen readers, or by the UCP/MCP agent endpoint the store's own robots.txt advertises.

**Fix.** Create a `custom.supplement_facts` metafield (rich text or JSON) per product and render it as a table in the Vision theme's Ingredients accordion (keep the image as a secondary view); set Shopify's standard Product Category plus a house `product_type` list (Capsule, Powder, Tea, Lubricant, Bundle…) on all 32 products via CSV import; move `exclude_rebuy`/`fam-*`/`faw-*`/`Ovia`/`The Ribbon Box` to a `custom.internal_flags` metafield and collapse the three vaginal-care tags into one; add body copy and a facts image to the Milkies PDP. A CSV diff of `products.json` before/after is the acceptance test.

**Proof.** `captures/fh_pdp_sample_summary.json`, `captures/fh_products_fh-pro-for-women.html` (Ingredients accordion, `FH_ImageStack_FH.PROWOMEN.REV05_SFP.jpg`), `captures/fh_products_milkies-nursing-postnatal-breastfeeding-multivitamin.html`, `captures/fh_products.json`, `captures/bf_products.json`, `captures/vn_products.json`, `captures/unjury_products.json`.

---

### FIND-5 · Every sampled PDP title truncates in search; homepage has no H1; no rating or breadcrumb schema

**Observed.** All 20 sampled Fairhaven PDP `<title>` tags run 73–91 characters because each carries a benefit clause plus " – Fairhaven Health" (e.g. "FH Pro® Fertility Multivitamin For Women | Support for Women's Fertility – Fairhaven Health", 91 chars), so Google will cut all of them; 13 of 20 meta descriptions end with the filler "Learn more…". The homepage contains no `<h1>` or `<h2>` (only six `<h3>` section headers) and the hero copy "A Better Prenatal for the First 1000 Days" is not a heading. `Product` JSON-LD carries no `aggregateRating` on 20 of 20 PDPs even though the Stamped badge exposes `data-reviews="102" data-rating="4.7"` on the same page (19 of 20 have ≥1 review), and there is no `BreadcrumbList` on any Fairhaven or Bariatric Fusion PDP (Vital Nutrients has it). `og:image` is emitted with `http://` on 20 of 20 PDPs and the homepage. The homepage FH PRO block also contains the typo "clincially-tested".

**Count.** 20 of 20 titles > 70 chars (min 73, max 91); 13 of 20 descriptions end "Learn more…"; 0 H1/H2 on the homepage; 0 of 20 PDPs with `aggregateRating`, 0 of 20 with `BreadcrumbList`; 20 of 20 `og:image` over http.

**Why it matters.** The posting asks for "on-page SEO … titles, descriptions … organic search visibility" and "content scorecards"; these are the cheapest measurable wins on the digital shelf.

**Fix.** Rewrite titles to ≤60 chars with the product name first and the brand at the end (Admin → Products → Search engine listing, or the bulk editor) and replace the "Learn more…" tail with a concrete phrase; wrap the hero headline in `<h1>` in the Vision theme's slideshow section (one H1 per page); enable Stamped's "Rich Snippets / JSON-LD" setting so `aggregateRating` is injected, and add a `BreadcrumbList` snippet to `main-product.liquid` mirroring the visible crumb; set the theme's social image URL to `https://`. Track title length and schema presence per SKU in the weekly digital-shelf scorecard.

**Proof.** `captures/fh_pdp_sample_summary.json` (title/desc lengths, ld types), `captures/fh_home.html`, `captures/fh_products_fh-pro-for-women.html`, `captures/bf_products_glp-one.html`, `captures/vn_products_glp-1-complete.html`.

---

### FIND-6 · Four stores, four conventions: policies, shipping promises and shared-SKU naming diverge

**Observed.** The portfolio runs four different themes (Fairhaven: Vision 7.0.0; Bariatric Fusion: custom Dawn 7.0.1; Vital Nutrients: eHouse "All Natural" 0.1.0; UNJURY: Expanse 4.4.1) with policy pages at four URL patterns (`/pages/shipping-and-returns` vs `/pages/shipping-policy` + `/pages/return-policy` vs `/pages/shipping-return-policy`; terms at `/policies/terms-of-service` vs `/pages/terms-of-service` vs `/pages/terms-and-conditions` vs `/pages/terms-conditions`; contact at `/pages/contactus` vs `/pages/contact-us` vs `/pages/contact`). All four ship from 45 Kenneth Dooley Drive, yet the customer promise differs: free shipping at $35 (Fairhaven), $49 (Vital Nutrients) and $100 (Bariatric Fusion); under-threshold rates $4.95 / from $4.95 / $8.50; processing "1-2 business days" vs "within 2 business days"; delivery "4-8 business days" vs "3-5 business days". On the catalog side, bariatricfusion.com and unjury.com sell 89 identical SKUs with matching prices and stock but 28 different product titles for the same SKU (BFCAPSIRON30: "One Per Day Bariatric Multivitamin With Iron" vs "One PER Day Bariatric Multivitamin Capsule With 45mg Iron"; BFCAPSSLEEP: "Sleep Support*" vs "Sleep Support"). Bariatric Fusion still serves a live product at `/products/copy-of-bariatric-calcium-citrate-soft-chews-bone-metabolic-support-4-pack-variety-pack` (published 2020-06-05, title "Bariatric Fusion - Best Sellers Calcium Citrate Chews", canonical to the copy-of URL, 5% Recharge discount vs 10% on `/products/glp-one`), five more "-1" duplicate handles (`probiotic-capsule-1`, `watermelon-bariatric-iron-soft-chew-with-vitamin-c-1`…), 2 empty collections and 31 of 79 collections with no description; Vital Nutrients has 7 products with an empty `body_html`, six of them the kids line launched May–June 2026 (`tummy-troopers-probiotic`, `d3-dynamo`, `iron-invincibles`…), whose PDP content lives only in theme sections so feeds get no description.

**Count.** 4 themes / 4 policy-URL patterns across 4 stores; 3 different free-shipping thresholds and 2 different delivery promises from one warehouse; 28 of 89 shared BF/UNJURY SKUs with mismatched titles (0 price, 0 stock mismatches); 1 live "copy-of-" handle + 5 "-1" handles on Bariatric Fusion; 7 of 168 Vital Nutrients products with empty descriptions; `BreadcrumbList` on 1 of 3 brands' PDPs.

**Why it matters.** The role is defined as "a documented, repeatable operating cadence across the portfolio" and "catalog accuracy … across all DTC storefronts"; these are the concrete places where one owner and one checklist would show up immediately.

**Fix.** Publish a one-page portfolio standard (policy handles, page titles, free-shipping copy, processing/transit language sourced from the 3PL's actual SLA, subscription discount %) and align each store's pages/menus to it; keep a master SKU sheet (SKU → canonical title → price → subscription %) and reconcile bariatricfusion.com and unjury.com titles against it via CSV export/import; on Bariatric Fusion, rename the "copy-of-" and "-1" handles with 301 URL redirects (Admin → Product → URL handle → "Create a URL redirect"), unpublish the two empty collections and fill collection descriptions; on Vital Nutrients, copy the kids-line section copy into `body_html` (or a description metafield mapped to the Google & YouTube channel) so Shop/Google feeds carry a description.

**Proof.** `captures/fh_home.html`, `captures/bf_home.html`, `captures/vn_home.html`, `captures/unjury_home.html` (theme + footer link inventories), `captures/fh_pages_shipping-and-returns.html`, `captures/bf_pages_shipping-policy.html`, `captures/vn_pages_shipping-policy.html`, `captures/unjury_pages_shipping-return-policy.html`, `captures/bf_products.json`, `captures/unjury_products.json`, `captures/bf_products_copy-of-calcium-variety-pack.html`, `captures/bf_products_glp-one.html`, `captures/bf_collections.json`, `captures/vn_products.json`, `captures/vn_products_tummy-troopers-probiotic.html`.

---

## Smaller observations (for the microsite's "also noticed" list)

- Fairhaven `/collections/all` has no meta description (Shopify default); nav collections do.
- PDP breadcrumb is only "Home / {product}" (no collection level) while collection pages show "Home / Shop / {collection}".
- The Rebuy "Frequently Bought Together" widget's hidden `<select>` exposes live inventory (`data-qty="15816"` for FH PRO for Men on `/products/fh-pro-for-women`) — public stock counts.
- `complete-menopause-relief` renders a Stamped badge with `data-reviews="0" data-rating="0.0"` on cards and PDP (an empty "0.0" widget instead of hiding).
- Multi-variant cards (`myo-inositol` $19.99/$35.99) show a single "$19.99" with no "From" prefix.
- Blog index and homepage blog cards carry no publish dates (article pages not fetched under the fetch cap).
- Fairhaven `products.json` shows the newest `published_at` as 2026-01-28 (32 products) while Vital Nutrients published 6 kids SKUs in May–June 2026 and UNJURY's newest is 2026-07-28 — useful context for "launch/seasonal freshness".
