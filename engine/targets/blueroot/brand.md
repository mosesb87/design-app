# Brand capture — Fairhaven Health (fairhavenhealth.com), with sister-brand notes

Source: `captures/fh_home.html` (fetched 2026-09-28, theme "Vision - Redesign 2.0", Shopify theme_store_id 2053, theme folder `/cdn/shop/t/65/`), plus PDP/collection captures.

## Colors (from the theme's `:root` CSS variables in `fh_home.html`)
| Role | Hex | CSS variable / rule |
|---|---|---|
| Primary accent (buttons, links hover, announcement bar, discount badge) | `#973961` (plum/maroon) | `--color-accent: #973961; --solid-button-background: #973961; --color-announcement-bar-bg: #973961; --badge-discount-bg-color: #973961` |
| Accent hover | `#7d2f50` | `--color-accent-hover: #7d2f50; --solid-button-background-hover: #7d2f50` |
| Body text / headings | `#000000` | `--color-body: #000000; --color-heading: #000000` |
| Secondary text | `#2c2d2e` | `--color-secondary-menu-text: #2c2d2e; --white-button-label: #2c2d2e` |
| Page background | `#ffffff` | `--bg-body: #ffffff` |
| Warm off-white section background | `#fdfaf7` | `.section-rich-text { --color-bg: #fdfaf7; }` |
| Light grey menu/background | `#F5F5F5` / `#f7f7f7` | `--color-secondary-menu-bg: #F5F5F5; --bg-body-darken: #f7f7f7` |
| Borders | `#DADCE0` / `#E2E2E2` | `--color-border: #DADCE0; --color-header-border: #E2E2E2` |
| Soft pink badge background | `#e9c5d4` | `--badge-heading-bg-color: #e9c5d4` |
| Collection-list block (lavender) | bg `#ded8e5`, button `#8866bc` | `.collection_list_block_... { --block-bg: #ded8e5; --button-bg: #8866bc; }` |
| Promo badge text (dark purple) | `#301934` | SVG `fill="#301934"` in the "LIMITED-TIME OFFER" badge |
| Star rating | `#FFAA47` | `--color-star: #FFAA47` |
| In stock / low stock | `#279A4B` / `#e97f32` | `--color-inventory-instock`, `--color-inventory-lowstock` |
| Sale / sold-out badges | `#c62a32` / `#6d6b6b` | `--color-badge-sale`, `--color-badge-sold-out` |
| Discounted price | `#ff0000` | `--color-price-discounted: #ff0000` |
| Buttons | 25px pill radius, white label | `--button-border-radius: 25px; --solid-button-label: #ffffff` |

Hex frequency in the homepage HTML: `#ffffff` ×36, `#973961` ×18, `#000000` ×14, `#2c2d2e` ×7, `#fdfaf7` ×6, `#7d2f50` ×4.

## Fonts
- Self-hosted Shopify font files, no Google Fonts `<link>`: `@font-face { font-family: Roboto }` at weights 400/500/600 (+ italics) from `//www.fairhavenhealth.com/cdn/fonts/roboto/…woff2`, and `@font-face { font-family: Inter }` at 400/700 from `/cdn/fonts/inter/`. Theme CSS: `font-family.css`, `app.css` under `/cdn/shop/t/65/assets/`.
- Theme variables: `--font-heading-letter-spacing: -0.02em`, `--font-body-medium-weight: 500`, `--font-body-bold-weight: 600`, `--Size-Body---regular: 16px / 24px`, `--Size-Body---large: 20px / 28px`; a `--custom_body_font: 'Arial'` override variable also exists.
- Icons: Font Awesome 6.3.0 from cdnjs.

## Logo
- Header logo: black wordmark SVG with ® — `https://www.fairhavenhealth.com/cdn/shop/files/FH_Logo_w__Registered_Trademark_Symbol_-_Black.svg?v=1750069948` (412×71, alt "Fairhaven Health"); same file used in Organization JSON-LD `logo`.
- Favicon: maroon "FH" mark — `https://www.fairhavenhealth.com/cdn/shop/files/FH_LOGO-Favicon_Maroon_32x32_3989da97-4d6f-45d4-98a2-f0f16d6f0ad1.png?crop=center&height=32&v=1730139481&width=32`
- og:image (homepage): `http://www.fairhavenhealth.com/cdn/shop/files/FH_LOGO_-RGB-Horizontal_1200x628_ae5527b7-c4d3-492e-a106-a5d22c796d6f.png?v=1747670561` (note: emitted over http).
- Hero image: `FH_Web_Hero_PrenatalMultivitamin_Desktop_96DPI.jpg` (alt "Fairhaven Prenatal Multivitamin bottle on a wooden surface with a pregnancy guide book in the background.").

## Tone of voice (5 words)
Clinical, warm, women-first, practitioner-backed, reassuring.

## Signature phrases (verbatim from the homepage / about page)
- "A Better Prenatal for the First 1000 Days"
- "You are unique. So are we. That's why we offer personalized solutions that will meet you where you are."
- "Clinically Studied Wellness for Every Stage"
- "Our Products. Your Story."
- "Supporting women for life, from menstruation to menopause & beyond" (Our Difference page)
- Announcement bar: "Free Shipping (US) on orders $35+" and "Not sure where to start? Take our product quiz."
- Footer disclaimer (regulatory, keep verbatim if reproduced): "*This statement has not been evaluated by the Food and Drug Administration…"

## Sister brands (for cross-brand panels — captured from each homepage)
| Store | Theme | Title tag | Free-shipping line | Footer address |
|---|---|---|---|---|
| bariatricfusion.com | Dawn 7.0.1 (custom "For Stamped - GW") | "Bariatric Vitamins \| Great Tasting Supplements \| Bariatric Fusion" | "FREE Shipping on Orders over $100" | 45 Kenneth Dooley Drive, Middletown CT |
| vitalnutrients.co | eHouse "All Natural" 0.1.0 ("New Updated Design [19/11/2025]") | "High Quality Nutritional Supplements Manufacturer \| Vital Nutrients" | "Free Shipping (US) on orders $49+" | same |
| unjury.com | Expanse 4.4.1 | "UNJURY Medical Quality Protein & Vitamins" | (none on homepage) | same |

Parent site: blueroothealth.co — "a consumer health company building clean, evidence-based brands that fuel lasting happiness and health for people and planet."
