# Creative direction — "In Register"

> **Superseded on 2026-09-26.** Mousa reviewed this direction on the preview and asked for something brighter, more playful and less like a document. The site now follows [04-bright-and-playful.md](04-bright-and-playful.md); this file is kept as the record of the first direction.

## The idea in one paragraph

In print, a sharp image exists only when separate plates line up exactly. In commerce, a trustworthy store exists only when three layers line up: **the sheet** (what was asked — the brief, the supplier export, the deal sheet), **the register** (what the system holds — the catalog, the live price, the rules) and **the shelf** (what the customer sees — the page, the menu, the search result, the answer an AI engine quotes back). Mousa's work, in every discipline he practises, is keeping those three in register. The site is built from three plates and one verb: **align**.

The concept is not imposed on him — it is his own model. `/v2` already explains his work as *sheet / register / shelf*; this direction turns that sentence into the visual identity, the motion language and the page structure.

**Intended emotional response:** the small, satisfying *click* of things lining up. Calm confidence; precision with warmth; a little play in the misregistration, never chaos. A visitor should leave thinking "this person notices the detail that everyone else misses — and makes it boring again."

## Two directions considered

### A — In Register (chosen)
Three ink plates (proof red, register blue, shelf ink) that arrive offset and snap into alignment as content is "checked"; printer's crop marks and slug lines as the information system; an exploded three-layer view as the depth moment.

### B — Grey First (not chosen)
The site begins as an unstyled wireframe — grey blocks, measurement lines, Elementor-style labels — and builds itself as you scroll, colour arriving last ("Build the page before you style it", from ASAS).

**Why A.** B is honest about craft but centres page-building over data, SEO and operations; the self-assembling wireframe is a familiar trope; and grey-dominant pages read unfinished. A comes from Mousa's own thesis, maps onto every discipline (sheet = requests and data; register = systems and tools; shelf = sites, stores and search), gives one motion verb that scales from a letter to a page transition, produces a real depth moment grounded in real content, and evolves his existing red/blue/green mark instead of discarding it. B's best idea survives inside A as the *Structure* plate of each case study.

## Distinctive art-direction decisions

1. **Three-plate registration.** Headlines, images and the wordmark arrive as three offset plates overprinting on paper (multiply blend) and snap into register. Hover lets them drift apart (inspection); leaving re-registers them. It is the site's only expressive motif — everything else stays calm.
2. **The proof slug as the information system.** Every piece of work sits inside crop marks with a monospaced slug line: plate number · URL · platform · languages · date checked. Every number carries its source. "Counted, not claimed" is not a tagline here; it is the layout.
3. **Exploded plates.** Case studies separate a real project into Data (facts), Structure (a block wireframe traced by script from the live page's layout) and Surface (a real capture), then collapse them back into the finished site.
4. **The page tells you its own weight.** The footer prints the real, build-measured weight of the page and its JavaScript — an SEO and performance specialist's portfolio publishing its receipt.

## Systems

### Typography (all SIL OFL, self-hosted, subset)
| Role | Family | Axes used | Notes |
|---|---|---|---|
| Display, wordmark, numbers | **Hubot Sans** | wght 500–900, wdth 88–125 | Mechanical, register-machine character. Width is animated (100 → 112) on hover and registration. |
| Text, UI | **Mona Sans** | wght 380–700 (+ italic) | Hubot's companion superfamily: one voice, two temperaments. |
| Slugs, data, labels | **Azeret Mono** | wght 400–600 | Ledger character; tabular by nature. |

Scale (fluid): wordmark `clamp(4.5rem, 15.5vw, 15rem)` / 0.84 / −0.045em · H1 `clamp(3rem, 8vw, 8.5rem)` / 0.9 · H2 `clamp(2.25rem, 4.6vw, 4.75rem)` / 0.95 · H3 `clamp(1.375rem, 2vw, 1.875rem)` · lead `clamp(1.25rem, 1.4vw, 1.625rem)` / 1.35 · body `clamp(1.0625rem, 0.35vw + 0.95rem, 1.1875rem)` / 1.55, measure 60–68ch · slug `0.6875–0.75rem`, uppercase, +0.06em. Numbers use tabular figures everywhere they align. Split-text animation keeps the complete string in the accessibility tree and is reverted after it plays, so extracted text never reads "A w a r d".

### Colour
| Token | Value | Use |
|---|---|---|
| Paper | `#EFECE4` | Default ground — proof stock |
| Paper-2 | `#E4E0D5` | Plates, table stripes |
| Rule | `#CFC9BB` | Hairlines, crop marks on paper |
| Ink | `#141414` | Text, the shelf plate |
| Ink-2 | `#57534B` | Secondary text |
| Proof red | `#E23D28` | The sheet plate; graphics and large text |
| Proof red (text) | `#B3261A` | Small red text on paper |
| Red ground | `#C4301D` | The contact finale |
| Register blue | `#1D3FD8` | The register plate; links |
| Check green | `#0B6E3D` | "Checked" stamps only |
| Night | `#101114` | The register chapter (tools) |

Chapters shift the ground, never abruptly: paper → night (the register: tools) → paper (reviews, index) → red (contact). All text pairs meet WCAG AA (verified in QA).

### Grid, spacing, rhythm
12 columns ≥ 1024px, 8 on tablet, 4 on phones. Gutters `clamp(16px, 1.6vw, 28px)`; outer margins `clamp(16px, 4vw, 64px)`. Column 1 on desktop is the **slug margin** — plate numbers and metadata live there, so content starts off-centre and images bleed to one edge. 8-point spacing scale (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192); section rhythm 160–240px desktop, 96–128px mobile; 4px baseline for mono labels.

### Imagery
Real captures of Mousa's own sites and tools only — no stock, no AI imagery, no fake browser chrome, no device mockups. Desktop captures sit inside crop marks; mobile captures are presented as tall strips; detail crops are enlarged 2× with hairline leader callouts; recordings are real runs of the tools, 6–10 seconds, muted, playing only while in view (one at a time). Registration reveals use pre-built, low-resolution red and blue duotone "ghost" plates that slide to zero and fade — transform and opacity only.

### Graphic language
Crop marks · the registration target (the new mark, evolved from the red/blue/green plus) · colour-control bars (scroll progress) · slug lines · hairline rules · sparing check stamps. Explicitly excluded: gradients, glows, orbs, glass, pills, bento grids, decorative icons.

## Page structure and narrative

The home page is a single argument in eleven scenes: *who he is → how he thinks → what he builds → what it proves → how to reach him.*

| # | Scene | Role in the story |
|---|---|---|
| S0 | Opening — registration | First impression: the name comes into register |
| S1 | Hero | Who: name, discipline, one sentence in his own words |
| S2 | Sheet → Register → Shelf (pinned) | How he thinks: his thesis, played with his own example |
| S3 | Every part in its place | Calm read: bio + the four-step method |
| S4 | Then I make them work better | Six sites and stores as plates |
| S5 | The register (night) | Seven tools he built, as real runs |
| S6 | Counted, not claimed | Six reviews, each led by its number |
| S7 | All the work | Index teaser → the complete archive |
| S8 | What I do | Six services as a spec sheet |
| S9 | Notes | Six articles from his blog |
| S10 | Contact | The request, stated plainly |

Other pages: `/work/` (the complete archive — the most crafted utility on the site), `/work/<slug>/` (eleven case studies), `/about/`, `404`.

## Scroll storyboard

Each scene lists desktop behaviour, the mobile adaptation and the reduced-motion state. Timings reference `docs/03-motion-system.md`.

**S0 — Opening (≤ 1.6 s, first visit per session; 0.6 s on return).** The hero HTML is readable from first paint — nothing is hidden. The red and blue plates of the wordmark start offset (red −4vw/−1.5vw, blue +3vw/+2vw) and converge onto the ink (900 ms `register`, 80 ms apart); crop marks draw at the frame corners (600 ms, 60 ms stagger); the slug types "PROOF 01 · WARREN, MI · CHECKED ‹build date›"; a 180 ms settle; the registration target rotates 90° and locks. Any input completes it instantly. *Mobile:* same, offsets halved. *Reduced:* final state only.

**S1 — Hero (100svh).** Wordmark across the full width, bottom-aligned; the registration target sits where the old plus sat. Top-left slug: disciplines. Top-right: the intro sentence (from `/v2`). Bottom: location, availability, a colour-bar scroll cue. *Desktop:* the pointer drives misregistration (red follows at 0.6×, blue at −0.4×; idle 2 s → re-registers). Scrolling out, the plates part by 0.08em and the wordmark scales to 0.94 — the plates are about to become physical cards. *Mobile:* two-line wordmark, intro below; plates drift with scroll velocity instead of pointer. *Reduced:* static.

**S2 — Sheet → Register → Shelf (sticky stage, 320vh desktop / 260vh mobile).** One scroll progress value drives everything. 0–12%: one flat card — the menu tile a customer sees. 12–30%: the stage tilts to isometric (rotateX 55°, rotateZ −35°) and three cards separate in depth, labelled *01 The sheet — What was asked · 02 The register — What the system holds · 03 The shelf — What the customer sees*. 30–50%: the sheet shows "Promo $19.20 · reg $24.00 · 20% off — matches". 50–68%: a red check line sweeps through the stack; the register shows "System reg $25.60 · vendor cap 20% · margin floor 32%"; the sheet's price strikes through: *Check 04 fails*. 68–85%: the verdict — "Blocked before a menu · owner: pricing team · reason written in plain words" — with a green stamp: *nothing wrong reached the shelf*. 85–100%: the cards collapse back into register; the heading resolves to "Every build I make starts at that seam." *Mobile:* smaller stage, gentler tilt (50°/−25°), captions beneath. *Reduced:* no sticky; a static exploded figure with all three texts plus the steps as an ordered list.

**S3 — Every part in its place (calm).** Bio (from `/v2`, years corrected to seven), a facts ledger (Warren, Michigan · English, Arabic · WordPress, WooCommerce, Shopify · WordPress since 2019) and the four-step method with its definitions. Only line-mask reveals (600 ms, 70 ms stagger), once. *Mobile:* single column. *Reduced:* no motion.

**S4 — Then I make them work better (6 plates).** United Textile, Universal Wholesale, Firefly Burgers, Eat With Samar, Great Lakes Cigar Festival, PTEE. Alternating asymmetric compositions: the desktop capture bleeds to one edge, a mobile strip overlaps the opposite corner and moves at 1.12× (depth), the slug sits under the image. Reveal: ghost plates converge while a clip inset opens 12% → 0. *Desktop hover:* plates part, the title widens (wdth 100 → 112), the cursor becomes the registration target reading "Open". Click morphs the image into the case-study hero (View Transitions). *Mobile:* full-width image, smaller strip, tap to open. *Reduced:* static, crossfade only.

**S5 — The register (night chapter).** The ground tweens paper → night over the first fifth of the section. "Built to fix something real." A pinned horizontal rack of seven tools: ASAS Studio, ChangeAtlas Commerce, Deals Operating System, CSV Mapper, DealProof, SEO Tools, DiaMedical Commerce Intelligence Lab — each with its one-line promise in Hubot (width 88 → 112 as the card centres) and a real recording; only the centred card's video plays. *Mobile:* native horizontal scroll-snap, posters with a play control. *Reduced:* a vertical list with posters.

**S6 — Counted, not claimed (paper returns).** Six reviews, each led by its number: Carhartt Reworked 1,447 of 3,545 · Oakwood 2 filters for 300+ species · Vanguard 443 products · JB Tools 122 of 358 · Hay House $9.50 vs $18.99 · BioTRUST 117 products. The number is in the HTML; motion only rolls its digits (1.2 s, 30 ms per digit) and then prints the source slug. *Mobile:* stacked. *Reduced:* static.

**S7 — All the work.** The first rows of the archive table (same component, same loupe) and "See all N entries" — N computed from the data.

**S8 — What I do.** Six services as a spec sheet (service · what it covers · tools). Calm.

**S9 — Notes.** Six articles, date · title · topic, linking to their WordPress posts.

**S10 — Contact (red ground).** "Send the site, the store or the spreadsheet that isn't behaving. I'll tell you what I see, with dates." The email arrives as three plates; copy-to-clipboard snaps them into register with a green stamp. LinkedIn, phone, location. Footer slug with the page's measured weight.

## How the references shaped principles (not sections)

| Reference | Principle adopted | Where it lives |
|---|---|---|
| Hon Tran /work | Receipts over screenshots; the archive as a sortable data table | `/work/`, slug lines |
| Aino / Samsøe | "How it's built" spec lists; a published performance budget | Case-study spec list; footer weight |
| monolayer | A numbered process spine carried by one system visual | S2 thesis |
| Wild (craft) | Real recorded runs instead of mockups | S5 rack, case-study recordings |
| Driftime 2025 | Chapters with sourced numbers; candour | S6, case-study receipts |
| Coinsetters | A calm base with one signature motif | Registration is the only loud motion |
| S25 | Motion as a token library; real imagery only | `docs/03-motion-system.md`; media policy |
| Twohands | The QA checklist as a visible artefact | `docs/qa-report.md` |
| DDDx Palermo | The utility component gets the most craft | `/work/` |
| Trionn | One progress value drives many effects; reduced motion designed, not disabled | S2, S5, runtime |

Nothing was copied: no layouts, graphics, code, copy or imagery from the references appear on the site.
