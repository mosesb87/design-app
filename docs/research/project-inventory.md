# Portfolio audit: Mousa Batarseh (checked Sep 26, 2026)

Mousa's own pages disagree with the live sites in several places. The ASAS counts, the Great Lakes Cigar Festival analytics year, the review count and the Universal Wholesale platform all conflict. Five entries could not be checked because the crawler couldn't reach them. The reviews are much stronger material than most of the client sites.

**How this was checked.** I used Exa text fetches only, so I did not see any page visually. The visual quality scores (Q) below are provisional: they come from page structure and copy, not from a rendered screenshot. Exa can't detect age-gate popups either. For tobacco and vape pages I can confirm the nicotine warning text at the top of the page, but whether a 21+ popup appears needs a real browser.

**Sources for Mousa's own claims**
- **M1**: https://mousabatarseh.com/ (the v1 homepage)
- **W**: https://work.mousabatarseh.com/
- **WP**: https://work.mousabatarseh.com/portfolio/
- **V2**: https://mousabatarseh.com/v2/work/
- **WH**: the other homepage version with project tags, reached via https://work.mousabatarseh.com/?s=migration
- **CS**: case-study pages under work.mousabatarseh.com, linked where used

---

## Part 1: Websites and stores

| # | Entry → live URL | Mousa's label · platform claimed (source) | Lang | Mousa's blurb (source) | What the live site shows | Status | Gate / popup risk | What to capture | Q* | Feature? |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ASAS → https://asas.mousabatarseh.com/ | "Elementor block and wireframe studio" · WordPress + Elementor (V2, M1) | EN+AR | "turn thousands of reusable Elementor blocks into complete, editable pages… native Elementor JSON" (M1) | Product site: "3,881 real blocks", 143 ready-made pages, 29 categories, 12 colour kits that repaint the page live, a JSON code sample. **The portfolio says 4,038 templates and 32 families.** | Live | None | "Twelve kits. Try one on this page." (live repaint); the "Four moves. One page." scroll-build section | 5 | **Yes (hero)** |
| 2 | PTEE → https://ptee.org/ | "Bilingual education platform" (V2); "Wordpress" (W) | AR (EN claimed) | "a modern and professional bilingual experience in Arabic and English… courses website with a separate admissions platform" (W) | Old-style Arabic site: programs, statement of faith, stat counters, MENATE/ATA accreditation. An email link shows "info@ptee.org (info@university.com)", a leftover template placeholder. | Live | None | Programs block | 2 | No. Use the renewal build (#17) as PTEE's face. |
| 3 | American Hot Wheel → https://interviewdemo.mousabatarseh.com/ | "WooCommerce storefront" (V2); a "private interview concept" with 12 brands, 11 locations, DEMO labels and checkout disabled ([CS](https://work.mousabatarseh.com/american-hot-wheel-woocommerce-storefront/)) | EN | "A portfolio skill showcase—not a live business website" (W) | Could not fetch (crawler error twice) | **Not checked** | Low | Vehicle-first finder and brand grid (from the case study) | n/a | Only if it loads. It's the strongest e-commerce UX concept. |
| 4 | BTEE Bilingual Build → https://btee.moseswebworks.com/ar/ | "Hosting migration build" (V2) | AR | Label only | Modern Arabic PTEE redesign (page title says "PTEE"): hero, stats 1981 / +5,000 / +1,406, six principles, three programme tiers, four-step path, news. Page metadata date 2026-08-26. | Live | None | Hero + stats; programme tiers | 4 | Merge with #17 (nearly the same content) |
| 5 | Eat With Samar → https://eatwithsamar.com/ | "Bilingual health and food website" (V2) | EN+AR | Label only | Dietitian brand: "Nutrition that still tastes like home.", M.S. and RD/RDN credentials, the "Sufra" three moves, four services, "A Damascene table, a Michigan clinic." | Live | None | Hero; "Four ways families work with Samar" | 4 | **Yes** |
| 6 | Father's Day Sales Landing → https://wildbillstobacco.com/fathers-day-specials/ | "WordPress campaign landing page" (V2) | EN | "campaign graphics, focused offer copy, product cards, and direct paths to featured Father's Day deals" (WP) | Almost no text: the nicotine warning, "Mr. Vapor Flex", and "Kratom, CBD, & All Other Hemp Supplements (Indiana Only)". Mostly images. A separate page, /fathers-day-2025/, has fuller copy, but its fine print was copied from Wild Wednesdays ("VALID EVERY WEDNESDAY FROM 04/16/25 – 08/06/25"). | Live but out of date (2025) | High | Offer grid | 2 | No (archive) |
| 7 | Firefly Burgers → https://fireflyburgersmi.com/ver2/ | "Restaurant website" (V2); WordPress (M1) / WordPress + Elementor (WP) | EN | "branded visuals, an easy-to-read menu, and convenient access to key customer information" (M1) | "ABOVE ALL BURGERS": signature burgers, the "Cheese it up" injection section, "Turn up the heat", "From Rainbow Street in Amman to Sterling Heights", address and hours. The root domain fireflyburgersmi.com is a different, thinner version. | Live (two versions) | None | Hero; "Cheese it up" | 4 | **Yes** |
| 8 | Full House Wholesale → https://www.fullhousewholesale.com/ | "B2B wholesale product catalog" (V2) | EN | Label only | Only a login form | Live, behind login | Login wall | Nothing public | 1 | No |
| 9 | Great Lakes Cigar Festival → https://greatlakescigarfest.com/home/ | "WordPress event and ticketing site" (V2); WordPress + Elementor ([CS](https://work.mousabatarseh.com/great-lakes-cigar-festival/)) | EN | "GA4 tracked 287 users and 1,954 events from July 4–31, **2026**" (M1) | The **2025** event page (July 26, 2025, Pontiac): four ticket tiers from $279, vendors, gallery. The root https://greatlakescigarfest.com/ is now a post-event "Thank You" page. | Live (event is over) | Medium–high (21+ tobacco event; Surgeon General warning on the root page) | Ticket-tier cards; gallery | 3 | **Yes, after fixing the year** |
| 10 | Jabal Amman Publishers → https://japublishers.com/ | "WooCommerce publishing and bookstore" (V2) | AR | "streamlined WooCommerce bookstore organizes titles, improves product details" (WP) | Arabic bookstore: category tiles, a 30-title carousel, authors, a book-of-the-month (Don Norman) | Live | None | Book carousel | 3 | Group with Ophir |
| 11 | Larkspur Mobility → https://mousabatarseh.com/Larkspur/ | "WordPress website" (V2); tags "healthcare transport • accessibility • booking" (WH) | EN | Label only | /Larkspur/ gave a crawler error; lowercase /larkspur/ returns 404 | **Not checked** | — | — | n/a | Not until checked |
| 12 | Mawtini Dabke Troupe → https://mawtinidabke.com/ | "Community organization website" (V2); Salient + WPBakery (WP) | EN | "services, performance galleries, team profiles, and quote-request pathway" (WP) | "10+ years", "350+ weddings", five services, seven testimonials | Live | None | Stats + services; testimonials | 3 | Secondary |
| 13 | Mr. Vapor Disposable Menu (V2 links the drive-thru URL) | "WordPress product catalog and interactive menu" (V2). Probably the portfolio's "Wild Bill's Disposable Vape Menu": "An extensive Divi product menu… device-friendly mega-menu" (WP) | EN | See label | Most likely correct URL: https://wildbillstobacco.com/disposables-menu-2/ (title "Largest Selection of Mr. Vapor Disposables…", flavour lists). **Not confirmed.** | Link duplicates #24 | High | Flavour columns | 2 | No (merge) |
| 14 | Ophir Publishers → https://ophir.com.jo/ | "WooCommerce publishing catalog" (V2) | AR | "clearer product groups, stronger content, and improved catalog navigation" (WP) | Arabic WooCommerce store: new releases, bestsellers, app subscription, author grid. Prices display as "$10,14" (comma as decimal). | Live | Low | Product rows | 3 | Group with Jabal Amman |
| 15 | PTEE Admissions Portal → https://ptee.moseswebworks.com/admissions/en | "Bilingual admissions portal" (V2) | EN+AR | Label only | "Admissions and Online Services Portal", version 5.2.0, seven services (apply, save for 30 days, track, documents, verify a document). Footer phones read "+12 345 67 89" (placeholder). | Live | None | Service grid | 3 | Yes, inside the PTEE card, once the placeholder is fixed |
| 16 | PTEE Company Platform → https://ptee.online/ | "Education platform" (V2) | AR | Label only | Moodle front page, "last modified 21 Oct 2025" | Live | Moodle login | — | 2 | No |
| 17 | PTEE Courses & Admissions Renewal → https://ptee-courses-admissions-renewal.mousabb2.chatgpt.site/ | "Published renewal build" (V2) | AR | Label only | Same redesign as #4, plus credit hours 40/80/120, "28 countries", ICETE | Live | None | Hero/stats; tiers | 4 | **Yes, as the single PTEE card** (a URL not on chatgpt.site would look better) |
| 18 | PTEE Courses & Programs → https://ptee.moseswebworks.com/courses/ar | "Bilingual course catalog" (V2) | AR/EN | Label only | /courses/ar, /courses/en and the host root all gave crawler errors, although /admissions/en on the same host worked | **Not checked** | — | — | n/a | Check first |
| 19 | Samona Hospitality Group → https://the-shg.com/ | "WordPress hospitality website" (V2) | EN | "Responsive WordPress pages organize the hospitality group's service content" (WP) | Hotel-management firm: four services, locations gallery. Contact lines still carry template placeholders "(contact@mysite.com)" and "(123-456-7890)". | Live | None | Services row | 2 | No |
| 20 | St. Mary Church Berkley → https://stmaryberkley.org/ | "Church website" (V2); WordPress + Elementor, nine pages, GiveWP ([CS](https://work.mousabatarseh.com/st-mary-christian-orthodox-church-website/)) | EN | "parish history, clergy, iconography, remodeling, a gallery… GiveWP donations" (WP) | Could not fetch. Church directories list the parish site as **stmaryofberkley.org** ([coccdetroit](https://www.coccdetroit.org/berkley_stmary)), which also wouldn't fetch. | **Not checked** | Low | — | n/a | Only if it loads |
| 21 | United Textile → https://shopunitedtextile.com/ | "Shopify B2B wholesale store" (V2); Shopify (M1) | EN | "organizes textile collections, case pricing, and product details in a clearer B2B experience" (M1) | Shopify B2B store: free next-day shipping over $1,000, collection tiles, "$72.00 USD / Unit Price: $6.00". Prices are visible to guests, although [LinkedIn](https://www.linkedin.com/in/mousabatarseh) claims hidden pricing for non-logged-in users. | Live | Low | Collection tiles; case-price product cards | 3 | **Yes** |
| 22 | Universal Wholesale → https://universalwholesaleonline.com/ | "Woocommerce" (M1); WordPress + WooCommerce ([CS](https://work.mousabatarseh.com/universal-wholesale/)). **LinkedIn says Repzio.** | EN | "A 14,000-item e-commerce catalog was prepared for migration…" (M1) | Homepage is a wall of policy text: delivery minimums, "11,000+ Items", a 170,000 sq ft warehouse, a tariff letter dated Apr 10, 2025 | Live | Low | Use the case study, not the homepage | 2 | Yes as a data story, once the platform is settled |
| 23 | Wild Bill's Christmas Sale → https://wildbillstobacco.com/christmas-sale-2024/ | "WordPress holiday campaign landing page" (V2); Divi (WP) | EN | "branded holiday artwork and seasonal gift offers" (WP) | Page loads (published 2024-12-12) but has no text, only images | Live but out of date | High | — | 2 | No |
| 24 | Wild Bill's Drive-thru Menu → https://wildbillstobacco.com/drivethru-menu/ | "WordPress digital catalog and menu" (V2) | EN | Label only | "FLAVOR MENU": long flavour lists for 11+ device lines. Typos: "SOURE FCKN FAB", "STRAWKIWI LEMOMADE", "RASPERRY LEMON". | Live (2025-04-21) | High | Flavour columns | 2 | Keep at most one menu |
| 25 | Wild Bill's St. Patrick Sales Form → https://wildbillstobacco.com/stpatrick-form/ | "WordPress campaign and sales form" (V2) | EN | "St. Patrick's Day artwork… campaign dates, and action-focused links" (WP) | Receipt-upload sweepstakes for Mar 14–17, 2025, "$1 = 1 Entry", 21+ consent checkbox | Live but out of date | High | Form | 3 | Archive |
| 26 | Wild Wednesdays → https://wildbillstobacco.com/wild-wednesdays/ | "WordPress campaign landing page" (V2) | EN | Label only | One intro paragraph and legal fine print; the deals are images | Live | High | — | 2 | Archive |
| 27 | Wild Bill's Vape Flavors Menu (listed on M1) | WordPress (M1) | EN | "responsive digital flavor menu organizes a product selection for easier scanning" (M1) | The link target isn't visible in a text crawl. It is most likely the drive-thru menu page (its heading is "FLAVOR MENU"). WP lists it separately from the "Disposable Vape Menu". | Not confirmed | High | — | 2 | Duplicate of #24 |

\*Q is provisional; see the note at the top.

---

## Part 2: Reviews

The complete list is https://mousabatarseh.com/reviews/reviews/, which shows **22** reviews. The /reviews header still says "20 reviews · updated Sep 22", even though Carhartt Reworked (Sep 25) is listed. Unless noted, each review's URL is `https://mousabatarseh.com/<slug>-review/`.

| Review (URL) | Site | Focus | Date | Headline number / finding | Fix or tool built |
|---|---|---|---|---|---|
| Carhartt Reworked ([full](https://mousabatarseh.com/reworked-review/), [card](https://mousabatarseh.com/reviews/reviews/reworked/)) | reworked.carhartt.com | E-com & DTC | Sep 25 | 1,447 of 3,545 listings with nothing left to buy (figure from your brief; the counter is animated and shows 0 in text). Six gift collections with 0 products; the fall tag spelled two ways (1,260 + 1,040 listings); 23 of 23 sampled product pages mark used gear as NewCondition. | "Four working fixes", including a gift-collection builder |
| Bran Marketing ([bran-review](https://mousabatarseh.com/bran-review/)) | getbran.com | SEO & AI search | Sep 22 | 5 of 22 sitemap pages have any JSON-LD; 6 of 6 team pages still have Wix placeholder text; 0 of 36 Marsh & Moore pages have a meta description | Filterable line card + 90-day build standard |
| PetSafe ([petsafe-review](https://mousabatarseh.com/petsafe-review/)) | petsafe.com | E-com & DTC | Sep 20 | 0 JSON-LD blocks on the homepage; /sitemap.xml returns HTML; llms.txt 404; the same 15-word meta description on every product page | "The 1,000-Page Fix" interactive tool + an evidence log with rerunnable commands |
| High Profile ([highprofile-review](https://mousabatarseh.com/highprofile-review/)) | highprofilecannabis.com | Cannabis | Sep 20 | 7 of 7 state deals pages still running a contest that ended 13 days earlier; Connecticut's drawing date falls before the contest starts | Launch board mapped to the Deals Operating System checks |
| JARS ([jars-review](https://mousabatarseh.com/jars-review/)) | jarscannabis.com | Cannabis | Sep 20 | 25 products with two prices for the same bundle; 10,532 deal records read; the Poison Control number listed as customer service in the homepage schema; 45% of deals end in the year 4200 | Mapped to promotion-QA engine checks |
| Lume ([lume-review](https://mousabatarseh.com/lume-review/)) | lume.com | Cannabis | Sep 20 | 509 bundle pairs priced above the single price; a "20% Off" deal set to 25%; hours conflict on 32 of 40 store pages | Rollout checklist mapped to the checks |
| Dutchie ([dutchie-review](https://mousabatarseh.com/dutchie-review/)) | dutchie.com | Cannabis / launch | Sep 20 | 0 help articles for Consumer AI 97 days after launch; a shipped feature still titled "Coming soon" | Six-item launch board |
| Salt Security ([salt-review](https://mousabatarseh.com/salt-review/)) | salt.security | SEO & AI search | Sep 19 | 57 of 60 sampled pages have no JSON-LD; 0 FAQPage; 720 sitemap URLs blocked by robots.txt; llms.txt 404 | An "answer layer" of structured data he'd build in Webflow |
| Vanguard ([vanguard-review](https://mousabatarseh.com/vanguard-review/)) | vanguardworld.com | E-com & DTC | Sep 19 | One product template with three defects on all 443 products; one alt text shared across a 39-image gallery; homepage CLS 0.365 | **Before/after toggle** that applies the fix to all 443 products |
| Oakwood Veneer ([oakwood-review](https://mousabatarseh.com/oakwood-review/)) | oakwoodveneer.com | E-com & DTC | Sep 19 | 300+ species but only two filters; 6.6 s mobile LCP; 39 of 54 images with empty alt | **"Species Atlas", a working faceted browser** |
| Moment ([moment-review](https://mousabatarseh.com/moment-review/)) | drinkmoment.com | E-com & DTC | Sep 19 | Two review counts on one product page (3,302 and 8,848); the real subscription discount is 13.6% against a "20% off" headline; 43 of 152 products sold out | Findings only |
| JB Tools ([jbtools-review](https://mousabatarseh.com/jbtools-review/)) | jbtools.com | Catalog & listings | Sep 19 | 104,348 products in the search index; 122 of 358 torque wrenches out of stock, one ranked #3; 0 GTINs in schema | Triage board + supplier-price SOP |
| Dunham's ([dunhams-review](https://mousabatarseh.com/dunhams-review/)) | dunhamssports.com | SEO | Sep 19 | 275 stores, 0 indexable store pages; 41 duplicate "-1/-2" category URLs | Store-page generator |
| BioTRUST ([biotrust-review](https://mousabatarseh.com/biotrust-review/)) | biotrust.com | Launch readiness | Sep 19 | Public, indexable staging store with 117 products; every page has two title tags and two canonicals; a $36 homepage price vs $49 on the product page | **Clickable go-live gate** (the score only reaches GO when blockers are cleared) |
| Best Life Brands ([bestlife-review](https://mousabatarseh.com/bestlife-review/)) | bestlifebrands.com | SEO / local | Sep 19 | A 1-555 phone number on a live, indexed page; about 800 location pages across six brands | Location-health scanner |
| BeHealth Digital ([behealth-review](https://mousabatarseh.com/behealth-review/)) | behealthdigital.com | Technical SEO | Sep 19 | Four signals (canonical, og:url, sitemap, schema) point to a lovable.app host that returns 404 | Findings + client audit |
| AEDIT ([aedit-review](https://mousabatarseh.com/aedit-review/)) | aedit.com | Launch readiness | Sep 19 | aeditmedshop.com parked for 19 months; every page links to a password page; 0 analytics tags | A 10-day go-live countdown. The index card says "ten days before launch", which the review itself doesn't claim. |
| Déhanche ([dehanche-review](https://mousabatarseh.com/dehanche-review/)) | dehanche.com | E-com & DTC | Sep 16 | 164 products scanned; 0 of 722 images have their own alt text; a sold-out belt in slot 10 | Week-0 report + pacing board |
| Hay House ([hayhouse-review](https://mousabatarseh.com/hayhouse-review/)) | shop.hayhouse.com | E-com & DTC | Sep 16 | Same ISBN at $9.50 on one Hay House site and $18.99 on the other; 14 of 14 compared ISBNs cheaper on hayhouse.com; 0 of 878 variants have a weight | Catalog card + worked examples |
| Carhartt.com ([carhartt-review](https://mousabatarseh.com/carhartt-review/)) | carhartt.com | E-com & DTC | Sep 15 | 13 findings; 10 of 24 jacket tiles hide the warmth rating | Prototypes + 90-day plan |
| ICR Services ([icr-review](https://mousabatarseh.com/icr-review/)) | ebay.com/str/icrservices | Catalog & listings | Sep 15 | 59 listings, titles average 58 of 80 characters; 3 of 24 photo slots used on a $3,499.95 pendant; seven spellings of "R-2000" | Title linter + photo standard |
| DiaMedical ([review](https://mousabatarseh.com/diamedical-review/), [lab](https://mousabatarseh.com/diamedical/)) | diamedicalusa.com | UX / commerce | No date shown | The review page renders by JavaScript, so no text was extractable. The lab page has 56-min and 28-min explainer videos and a copy/print-blocking script. | Commerce Intelligence Lab |

**Ranking for an animated portfolio** (weighing recency, interactive fixes, and fit with e-commerce, product data and SEO):
1. **Carhartt Reworked**: newest, big brand, catalog-scale numbers, working builder.
2. **Oakwood Veneer**: the Species Atlas is the most visual interactive fix.
3. **Vanguard**: "fix one template, fix 443 products" is a natural before/after animation.
4. **JB Tools**: 104k-product catalog data, closest to his core skill.
5. **Hay House**: a clear pricing story ($9.50 vs $18.99) plus the catalog card.
6. **BioTRUST or JARS**: BioTRUST's gate animates well; JARS carries the strongest single finding (Poison Control listed as customer service).

Next tier: PetSafe, Bran, Dunham's. The cannabis trio fits better as proof for the Deals Operating System than as standalone cards.

---

## Part 3: Six blog posts

URLs come from the site's WordPress API (https://work.mousabatarseh.com/wp-json/wp/v2/posts); I opened #1 and #4 to confirm.

| # | Title | Date | URL |
|---|---|---|---|
| 1 | Field Mapping Is the Whole Migration | Nov 6, 2025 | https://work.mousabatarseh.com/product-catalog-migration-field-mapping/ |
| 2 | Redirects Are the Migration | Mar 19, 2026 | https://work.mousabatarseh.com/redirect-mapping-ecommerce-migration/ |
| 3 | On-Page SEO When You Have Thousands of Product Pages | Jan 27, 2026 | https://work.mousabatarseh.com/on-page-seo-large-product-catalog/ |
| 4 | Filters Are the Real Search | May 14, 2026 | https://work.mousabatarseh.com/product-filters-attributes-ecommerce/ |
| 5 | The SKU Is a Decision, Not a Label | Mar 3, 2026 | https://work.mousabatarseh.com/sku-structure-product-catalog/ |
| 6 | Core Web Vitals on a Page-Builder Site | Aug 12, 2026 | https://work.mousabatarseh.com/core-web-vitals-elementor-wordpress/ |

Alternates: "Inventory and Price Sync: Where the Numbers Drift" (Jun 23, 2026, https://work.mousabatarseh.com/inventory-price-sync-drift/) and "Category Trees That Don't Collapse at 5,000 Products" (Apr 28, 2026, https://work.mousabatarseh.com/category-structure-large-catalog/).

The mousabatarseh.com/blog index lists more posts than the WordPress blog. I couldn't find working URLs for those extra posts, such as "Building a WordPress Event Website People Actually Use".

---

## Shortlist to feature (sites and stores)
1. **ASAS**: his own product, bilingual, with a live colour-kit repaint that suits animation. Correct the counts first.
2. **United Textile**: a real Shopify B2B store with case-pack pricing, and his employer.
3. **Universal Wholesale**, told through the [case study](https://work.mousabatarseh.com/universal-wholesale/): the 14,000-SKU data story. Don't use homepage screenshots.
4. **Firefly Burgers /ver2/**: the strongest restaurant copy and visuals.
5. **Eat With Samar**: bilingual personal brand with distinctive copy.
6. **Great Lakes Cigar Festival**: ticket tiers and GA4 numbers, once the year is fixed. Expect an age-gate check.
7. **PTEE**, as one card: the renewal build (#17) plus the admissions portal (#15).
8. **American Hot Wheel or St. Mary**, but only after confirming they load.

## Archive only (weak or duplicate)
- **Out-of-date or image-only Wild Bill's campaigns:** Father's Day, Christmas 2024, St. Patrick form, Wild Wednesdays.
- **Duplicate vape menus:** Mr. Vapor, Drive-thru and Vape Flavors. Keep at most one.
- **Nothing to show publicly:** Full House (login wall) and PTEE Company Platform (Moodle).
- **Duplicate PTEE builds:** ptee.org legacy, the BTEE build and the Courses & Programs catalog.
- **Placeholder text on the live site:** Samona.
- **Not checked:** Larkspur.
- **Combine:** put Ophir and Jabal Amman on a single "Arabic WooCommerce bookstores" card.

## Broken, unreachable or inconsistent
- **Couldn't reach:** interviewdemo.mousabatarseh.com, /Larkspur/, ptee.moseswebworks.com/courses/*, stmaryberkley.org (and stmaryofberkley.org). These were crawler errors, so they may not be broken; check them in a browser.
- **Duplicate link:** V2 points "Mr. Vapor Disposable Menu" at the drive-thru menu URL. The likely correct page is https://wildbillstobacco.com/disposables-menu-2/.
- **Great Lakes Cigar Festival year:** the event was July 26, 2025, but the analytics claim says July 2026, and the root URL is now a thank-you page.
- **ASAS counts:** 4,038 templates / 32 families on M1 and W, but the live site says 3,881 blocks / 29 categories.
- **Review count:** "20 reviews" on /reviews vs 22 on the index and "All 22 reviews" on V2.
- **Universal Wholesale platform:** WooCommerce on M1, the case study and the [field-mapping post](https://work.mousabatarseh.com/product-catalog-migration-field-mapping/), but Repzio on LinkedIn.
- **United Textile pricing:** LinkedIn says prices are hidden from guests; the homepage shows them.
- **Placeholder text on Mousa's own portfolio page:** "Lorem Ipsum is simply dumy text…" appears twice on WP.
- **work.mousabatarseh.com home:** the "14,000-SKU catalog migration" tagline sits on the Hot Wheel card, and that blurb has a broken sentence ("skills. vehicle-fitment").
- **Placeholder text on client sites:** Samona (contact@mysite.com, 123-456-7890), the PTEE admissions footer (+12 345 67 89), and ptee.org (info@university.com).
- **Smaller issues:**
  - Flavour-name typos on the drive-thru menu.
  - Ophir's "$10,14" price format.
  - Firefly has two versions live (root and /ver2/).
  - The AEDIT card claims a launch date the review doesn't.
