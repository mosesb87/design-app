# Royal Apparel — brand capture (from fetched CSS/HTML, 2026-09-28)

## Colors (quoted from the stylesheets)
- Primary action / button: black on white — `captures/css-baseb2b.css`: `.btn-primary { color: #fff; background-color: #000; border-color: #000; }`
- Body text: `#3d4348` and headings `#3e5055` — `captures/css-main.css`: `--default-color: #3d4348; --heading-color: #3e5055; --background-color: #ffffff; --surface-color: #ffffff;` (a dark-section variant defines `--background-color: #060606; --surface-color: #252525;`)
- Base text (Bootstrap body rule in baseb2b.css): `body { … color: #333; background-color: #fff; }`
- Rules / dividers: `#989898` — homepage inline CSS `.follow_us .container {border-top: 1px solid #989898;border-bottom: 1px solid #989898}` and `.copyright {border-top: 1px solid #989898}`
- Light surfaces: `#f8fbfc` (main.css `--background-color` for light sections), `#f9f9f9`, `#e9e9e9`, `#f1f1f1`, `#ddd`
- Link blue (untouched Bootstrap 3 default): `#337ab7` (24 occurrences in baseb2b.css); alert/sale reds are Bootstrap `#d9534f` / `#c9302c`
- Net effect: a monochrome black/white/grey system with product photography supplying the color. No brand accent color is defined in CSS variables.

## Fonts (self-hosted @font-face, no Google Fonts link on any page)
- `Garamond` → `/fonts/AGaramondPro-Regular.otf` and `AGaramondPro-Bold.otf` (Adobe Garamond Pro; serif display/heading face)
- `Helvetica` → `/fonts/HelveticaNeueLTStd-Cn.otf` and `HelveticaNeueLTStd-BdCn.otf` (Helvetica Neue LT Std Condensed; UI/nav and buttons, e.g. the all-caps mega-menu headings)
- `quicksand` (light 300 + book) → `../fonts/quicksand_light-webfont.*`, `quicksand_book-webfont.*`
- Fallback stack: `"Helvetica Neue", Helvetica, Arial, sans-serif` (Bootstrap body)
- Icon fonts: FontAwesome 4.3 (`use.fontawesome.com/826a7e3dce.js`), Glyphicons Halflings, Bootstrap Icons
- Recommended web stand-ins for the review microsite: EB Garamond (headings) + Barlow Condensed / Roboto Condensed (nav, labels) + Quicksand (light accents)

## Logo
- Header logo: `https://www.royalapparel.net/img//RoyalLogoHeader.jpg` (`<img src="/img//RoyalLogoHeader.jpg" alt="Royal Apparel" style="height:44px;">`)
- Secondary/larger logo: `https://www.royalapparel.net/img//Royalapparel_logo2.png` (`alt="Royal Apparel"`, max-width 160px, used in the mobile/offcanvas menu)
- Description: wordmark "Royal Apparel" in black; the site pairs it with a "USA manufacturer" message and Made-in-USA style icons (`/img/style_icons/USA2.png`, alt "Made in USA")
- Sister brand shown on the homepage dual panel: Basic Supply Co. (basicsupplyco.net), "Global Sourcing, Competitive Pricing"

## Favicon and social image
- Favicon: `https://www.royalapparel.net/favicon.ico` (HEAD 200, `image/x-icon`); no `<link rel="icon">` tag in the HTML — browsers fall back to the root file
- og:image: **none** — `/index` and all 20 sampled PDPs emit `og:title`, `og:url`, `og:description` only. Best stand-in for a social card: the product hero `https://live.royalapparel.net/prodimg/large/5051_072226104431.png` or the current slider `https://www.royalapparel.net/img/homepage_slider/B2B_S_USAManu_20260923.jpg`

## Tone of voice (5 words)
Proud, plain-spoken, American-made, practical, wholesale-direct

## Signature phrases from the homepage and about page
- "USA-Made Wholesale Apparel & Eco-Friendly Clothing" (title / og:title)
- "Made in USA Comfort — Our Identity" (homepage dual panel)
- "Premium blank apparel made in the USA, including organic tees, hoodies, tanks, and fleece for bulk printing, promo programs, and branded resale" (meta description)
- "Only 3% of fashion is made in the USA and we're proud to be part of that community." (about page)
- Header utility line: "SEE DETAILS FOR FREE SHIPPING", "CREATE ACCOUNT", "ECO + USA"

## Layout cues
- Bootstrap 3 grid, 4-slide Bootstrap carousel hero, all-caps condensed nav labels, black square buttons, grey hairline dividers, footer in four columns (Company / Product Info / Work With Us / newsletter) with six social icons; product cards are white tiles with the style number preceding the name ("5051 Unisex Short Sleeve Tee").
