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
