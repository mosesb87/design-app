# Brand capture — Federal Fluid Power (federalfp.com)

Captured 2026-09-28 from captures/homepage.html, captures/merged.css (the site's single merged stylesheet, `static/version1789741354/_cache/merged/ae99b5f97e9e4803df98938f5a963829.css`) and captures/FFP_Logo.png.

## Colors

| Role | Hex | Where it comes from |
|---|---|---|
| Logo blue (brand primary) | `#0e5ea8` (sampled buckets `#1060a8`, `#0858a8`, `#0058a8`) | emblem lower half + "FEDERAL FLUID" wordmark in FFP_Logo.png |
| Logo red (brand accent) | `#e81820` (bucket `#e81818`) | emblem upper half + "POWER" wordmark in FFP_Logo.png |
| UI primary button | `#1d4ed8` (hover `#2563eb`, active `#1e40af`) | `.btn-primary{--btn-bg:#1d4ed8;--btn-color:#fff;--btn-hover-bg:#2563eb;--btn-active-bg:#1e40af}` and `.bg-primary{background-color:rgb(29 78 216/…)}` — Hyvä/Tailwind blue-700 defaults, not the logo blue |
| Secondary button | stroke `#2563eb`, bg `#fff`, text `#000` | `.btn-secondary{--btn-stroke:#2563eb;--btn-bg:#fff;--btn-color:#000;--btn-hover-stroke:#1e40af}` |
| Primary text | `#1f2937` | `.text-primary{color:rgb(31 41 55/…)}` |
| Secondary text | `#4b5563` | `.text-secondary{color:rgb(75 85 99/…)}` |
| Footer band | `#e5e7eb` (Tailwind `bg-gray-200`) | footer wrapper `<div class="bg-gray-200 p-3">` |
| CMS inline blue / red | `#0012b8` (3 uses), `#e22626` (1 use) | inline styles inside the homepage Magezon category grid |

Note for the review site: the storefront's buttons use stock Tailwind blue (`#1d4ed8`), while the logo is a darker blue (`#0e5ea8`) + red (`#e81820`). Use the logo pair as the brand palette and the Tailwind blue only for "current UI" references.

## Fonts

- No Google Fonts `<link>` and no text `@font-face`; the only `@font-face` rules are icon fonts (`mgz_openiconic`, `Magezon-Icons`, `Font Awesome 5 Free/Brands`, `Magento-Icons`).
- Body stack from merged.css: `html{font-family:Segoe UI,Helvetica Neue,Arial,sans-serif}` (Hyvä default). Headings are the same stack, weight via Tailwind `font-semibold`/`font-bold`.
- Logo wordmark is a heavy geometric sans, all caps, italic-leaning; tagline in a light condensed sans.

## Logo

- URL: `https://federalfp.com/media/logo/stores/2/FFP_Logo.png` (300×97 PNG, served lazily with a 1×1 base64 placeholder and `data-amsrc`; alt="Federal Fluid Power").
- Description: a round emblem split horizontally — red upper half, blue lower half — with white "FFP" letters across the seam and white arrow/flow lines suggesting fluid direction; to the right, "FEDERAL FLUID" in blue caps over "POWER" in red spaced caps, and the tagline "SERVING YOUR HYDRAULIC NEEDS" in dark grey.
- Favicon: `https://federalfp.com/media/favicon/stores/2/FFP_Logo.jpg` (a JPEG of the same logo, declared as `image/x-icon`).
- og:image: none on the homepage (only og:type/title/description/url/site_name). PDPs set og:image to the product image, e.g. `https://federalfp.com/media/catalog/product/cache/6517c62f5899ad6aa0ba23ceb3eeff97/S/t/Stauff_GaugeAndStudConnectors.png`.
- Hero banner image: `https://federalfp.com/media/wysiwyg/HPUBannerFFP.jpg` (1101×234, alt "DumpTrailerBannerFFP").

## Tone of voice (5 words)

Plain, industrial, catalog-first, service-minded, unpolished.

## Signature phrases (verbatim from the homepage)

1. "Click a category below. Find everything you need to Build it Better." (homepage H1)
2. "Federal Fluid Power is a full service hydraulic component distributor offering application engineering services and design assistance."
3. "With more than 35 hydraulic component part lines represented by over 30 different manufacturers, Federal Fluid Power has components in stock to get you up and running and keep you moving."
4. Logo tagline: "Serving Your Hydraulic Needs"

## Layout notes

- Header: logo left, "Call Us: 734-479-9641" (Patriot's number), mega-menu with 5 roots (Hydraulics, Adapters & Fittings, Thermal Systems, Garage and Shop, Pneumatics), search, compare, account, cart.
- Homepage body: one banner, then a Magezon grid of ~25 category tiles (120×120 PNG icons) each expanding into sub-category link lists; one paragraph of company copy; no products, no reviews, no social.
- Footer: 4 link columns (Company / Information / Support / Locations) on `bg-gray-200`, three branch addresses with hours, copyright "© 2023 Patriot Hydraulics. All rights reserved" and a payment-icons strip from the Codazon theme demo (`/media/wysiwyg/codazon/fastest_fashion/home/cdz-footer-payment.webp`).
- Sister store patriothyd.com uses the same Hyvä layout with a different theme name (`PatriotHYD/default`), its own meta description and a value-props row.
