# Direction 3 — calm and precise, still animated

## Why it changed

Mousa liked the bright-and-playful build — the animation, the story in the /v2 order, the pages — but found it "very playful, like for kids". His asks (2026-09-27):

- cut the colours and make them more serious;
- make the icons more serious shapes;
- add background motion and hover effects;
- add a Tools section that explains the tools he built, with details;
- put a screenshot on every review;
- put his photo on the site, with the background removed;
- use his original logo, unchanged;
- in the index, show each project scrolling inside a browser window on hover.

Everything else stays: the /v2 story order on the home page, the type, the layout, the pages and the motion system.

## Palette

White and near-black with cool greys, one cobalt accent, and dark "night" rooms for weight (`src/styles/tokens.css`).

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0e1116` | Text, dark buttons |
| `--ink-2` | `#4a505c` | Secondary text (8:1 on white) |
| `--cloud` / `--line-soft` | `#f3f4f6` / `#e3e5e9` | Card rooms, rules |
| `--accent` | `#2b4de0` | The one colour: dots, links, highlights, one tile per group (white text on it 6.5:1) |
| `--accent-deep` / `--accent-soft` / `--accent-tint` | `#1c33a8` / `#8ea2ff` / `#eef1fc` | Accent text on tints; accent on night; pale accent rooms |
| `--night` | `#0d1015` | Dark rooms (tools rack, one card per stack) |
| `--fail` / `--pass` | `#c8321f` / `#17784a` | Used small: a failed check, a live status |

The old bright names (tomato, pink, aqua, lime, sun and the tints) are kept as aliases so every component follows the new palette; they now resolve to greys and pale cobalt. The spectrum signature became one cobalt sweep (ink → deep → accent → soft), used thin: the scroll bar in the nav, button halos, the hero glow.

## Icons

The glossy die-cut stickers became thin-line icons on white tiles (`src/components/play/Sticker.astro`): the same subjects (price tag, check, cursor, spreadsheet cell, lens, layout blocks, barcode, percent, pin, a sparkline, a console, a heart), one line weight at every size (non-scaling strokes), ink lines with a single cobalt detail. On dark rooms the tile turns night with light strokes. They still enter, float and lean with the pointer, but calmly: no spin, no bounce.

## Motion, calmer

- Cards no longer sit tilted; hover lifts them instead of straightening them.
- Easing moved from overshoot (`back.out`, elastic) to `expo.out`; the pop-in is a rise, not a wobble.
- Letters in the hero hop and flash the accent, not a rainbow.

## Background motion and hover

- **The field** (`scripts/motion/field.ts`): a faint grid of dots fixed behind every page. It drifts slower than the content as you scroll, breathes in a slow diagonal wave, and parts around the pointer with a cobalt tint. Rooms with their own background cover it. Touch devices redraw only on scroll; hidden tabs pause it; reduced motion draws it once, still.
- **Cursor light** (`scripts/motion/glow.ts`, `[data-glow]`): a soft light follows the pointer across cards — reviews, number tiles, method steps, services, tool steps, sites, case studies, blog cards.
- **Ghost words** (`src/components/Ghost.astro`, `scripts/motion/ghost.ts`): a large outlined word behind six home sections (About, Counted, Stores, Reviews, Method, Blog) slides sideways as the section passes.

## Portrait and logo

- The hero now pairs the name with Mousa's cut-out standing in a cobalt panel, his head breaking the panel's top edge. On a mouse it starts black-and-white and turns to colour on hover; it leans with the pointer and sinks slowly into the panel as the hero scrolls away. /about/ repeats it on a night panel; blog posts use a head-and-shoulders avatar. How the photo was chosen and cut out: `docs/asset-inventory.md`.
- The logo is Mousa's own mark — the blue, red and green bars — inlined byte-for-byte from the file on his live site (`src/components/Logo.astro`), in the nav, the footer, the favicon and the share images.

## Tools — `/tools/`

A new page and a nav item: nine sections (DealProof, ChangeAtlas Commerce, the Deals Operating System, CSV Mapper, ASAS Studio, SEO Tools, the DiaMedical lab, AI Academy, The Lab). The name, promise, role and links stay pinned on the left; the right column runs through the real recording in a browser frame, the problem, how it works, what's inside, the numbers, the quote, any disclaimer and related builds. Every line is Mousa's published wording or a fact from his pages (`src/data/tools.ts`); fields a page doesn't state are left out. The home tools rack now links each card to its section.

## Reviews with screenshots

Every review card — the six on the home page and all 22 on /reviews/ — leads with the review's first screen in a browser frame, then its number, what the number counts, the brand and the date (`src/components/ReviewCard.astro`).

## Index preview

Hovering (or focusing) a row in the /work/ index opens a small browser window beside the pointer, clear of the project's name, showing that project. Where a full-page capture exists (21 projects), the page scrolls inside the window — down, a pause, back up — on a loop; otherwise the first screen drifts in slowly. Reviews show their own first screen. Reduced motion: a still first screen (`scripts/motion/loupe.ts`).

## Round 2 — Mousa's notes (2026-09-27)

- **Three colours:** black, cobalt and orange (`--orange: #ff7a1a`; ink text on it, `--orange-deep` for orange text on white). Orange takes the money and place icons, one tile per group, the footer email, the problem cards, the review marquee and the second background wash.
- **Background:** the pointer-reactive dot grid did not fit and is gone. Three soft washes (cobalt, orange, pale cobalt) sit behind the page and wander as it scrolls (`scripts/motion/aura.ts`); no pointer reaction, transforms only. Ghost words are clearer (14% outline, faint fill) and travel further.
- **Home:** less space above the hero; "Every part in its place", "Built to fix something real", "Each one leads with the number…" and "Start with the business goal…" on two lines. The parts are coloured tiles (cobalt, orange, night, white) that fly into their slots on scroll down, back out as you continue, and in again on scroll up. The check-scene lens is an orange tile. The tools icon types (prompt nudges, cursor blinks). In the tools rack the promise and its screenshot squeeze and stretch together as a transform, so the text keeps its line breaks.
- **Screenshot cards** (case studies, reviews, sites): equal sizes; a taller screenshot (16:11) in a black browser window that breaks out of the card's top edge, centred. Every browser frame on the site is black (orange and cobalt dots).
- **/work/:** "The long versions" became "11 case studies" (kicker "In depth"); an ASAS Studio spotlight sits above them (promise, four moves, recording, studio capture, the four numbers, links). The index preview window is larger (up to 660 px) and black.
- **/reviews/:** twelve checks taken from the reviews' own findings sit beside the title, each naming the reviews it came from. On desktop the header holds for a short stretch while they go from scattered, to sorted, to scattered (scrubbed; reverses on scroll up). Phones: the same over the cards' own pass, no hold.
- **Nav:** Home before Work.
- **Footer:** one slim night strip — logo and name, links, the email in orange, back to top — over a slow cobalt-and-orange glow; the contact block above it is about half its former height.
- **No one-sided borders**, anywhere: accent stripes became full backgrounds, list dividers became separate rounded rows, link underlines are text decoration. On the Tools page the dark sections' cards are white (the problem card orange), so they no longer match their room.
- **Blog:** "Notes from running stores." on two lines. All 39 blog graphics were redrawn in the site's style with the same content: the 16 article covers and 3 in-article diagrams from a faithful transcription of each original (`src/data/blog-graphics.json` — every headline, highlighted word, label and value), the 20 summary covers from their titles and categories (`scripts/blog-graphics.mjs` → `public/media/blog/drawn/`). The originals stay in `public/media/blog/`.
- **About:** each course is a card; where Mousa's site publishes the certificate, a quarter of it peeks from the card's corner, hovering shows the whole certificate, and clicking opens it full size in a dialog. Titles, issuers and dates follow the certificates (the Wharton certificate is from the Aresty Institute of Executive Education, 22 Nov 2023 — not "via Coursera" as the old portfolio listed).

## Round 3 — Mousa's notes (2026-09-27, later)

- **Hover, everywhere** (`src/styles/hover.css`, mouse and trackpad only): headings, card titles and intro lines get a band of light that passes through the letters; icon drawings turn inside their tiles; kickers pulse; big numbers grow; browser windows lift, their dots light up and the page inside eases closer; rows, facts and list items step aside with a tint; cards that had no hover lift; method cards ring and turn their icon; parts slots turn solid cobalt; marquee words light up; article tables, quotes and lists answer too. Hover movement uses the `translate`/`scale`/`rotate` properties so it composes with the scroll animations.
- **Scattered cards** (`scripts/motion/pop.ts`): every card grid — the home reviews, "What I can take off your plate", "Counted, not claimed", stores, notes, /work/ cases and counts, /reviews/, /blog/, /about/, /tools/, case-study and review pages — flies in from scattered, turned positions one after another as it comes up the screen, and scatters away again near the top; scrolling up reverses it. Cards on the first screen start in place.
- **"Every part in its place."** is bigger; its letters fly in from all over and assemble on the same scroll as the parts, then fly off again; every part is a coloured tile (cobalt, orange, night, sky, peach); letters hop under the pointer.
- **Hero:** more room above and below the name and between the elements; the photo's icon tiles are coloured.
- **The check scene:** the orange lens is gone; a cobalt scan line with a dark "Check 04" chip reads across the three cards (the chip turns red while the check fails). More space above "Nothing wrong reached the shelf".
- **/work/:** the header icons are coloured tiles (on every inner page). ASAS Studio: the title squeezes and stretches with scroll, letter by letter, and its letters widen and turn orange under the pointer; the studio capture swings in; the recording drifts; the move chips and number cards scatter in.
- **Contact and footer:** one black room — the contact block with coloured icon tiles (cobalt, sky, white) and a slow cobalt glow, the footer as its bottom bar with the pages, coloured round buttons (email, LinkedIn, phone, back to top) and the provenance line. No orange at the bottom.
- **/reviews/:** the header's hold is now a sticky header whose extra scroll is reserved in CSS, so the page no longer shifts when the scripts start.
