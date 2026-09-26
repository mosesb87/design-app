# Direction 2 — bright and playful

## Why it changed

Mousa's verdict on the first direction ("In Register": paper, proof red and register blue, crop marks, a calm document-like base): *not impressive enough; the look and the colours; too much like a document.* Asked which way to go, he chose **bright and playful**, pointed at **the content of mousabatarseh.com/v2** and at **coinsetters.io**, and asked for the blog and the reviews to become sections of this site in the same design, with no hopping between separate sites.

What carried over: every fact, every capture, the page structure of `/v2` (hero → about → numbers → how I check → tools → sites → reviews → method → blog → contact), the sheet / register / shelf check, "Counted, not claimed", real recordings, honest labels, accessibility and performance budgets.

What changed: the whole look and the motion vocabulary.

## Reference influence

| From | Taken | Adapted |
|---|---|---|
| mousabatarseh.com/v2 (content) | Section order and copy: "Every part in its place", "Counted, not claimed", the sheet/register/shelf check, the four-step method, the services | Rewritten only where the old layout needed shorter lines; facts untouched |
| coinsetters.io | A white base with candy-bright rooms, oversized condensed type, glossy die-cut stickers that pop, float and react, a moving spectrum as the signature | Stickers are drawn from Mousa's world (price tag, spreadsheet cell, cursor, magnifier, check seal, blocks, barcode, percent, pin), never crypto imagery; the spectrum stays a highlight, not a wash |

## System

- **Colour:** white base; brights tomato `#ff5a36`, pink `#ff4fa3`, aqua `#19c7b8`, lime `#c5f03a`, sun `#ffc933` (ink text on them); deeps violet `#5b3df5`, blue `#2458e6`, night `#1a1430` (white text); tints for cards (blush, lilac, sky, mint, lemon, peach). Signature: an animated spectrum gradient (tomato → pink → violet → blue → aqua → lime). Every text pair checked by axe at AA.
- **Type:** Hubot Sans at 75% width and weight 900, uppercase, for display; Mona Sans for text. Both SIL OFL, self-hosted and subset.
- **Shapes:** pill buttons with a spectrum halo on hover, rounded "rooms" (`--r-xl`), a floating pill nav with a spectrum progress bar, SVG stickers with a white die-cut edge and a soft shadow.
- **Grounds:** most sections sit on white or a pastel card; chapters that need weight (tools, contact) are violet or night rooms.

## Motion

| Moment | What happens | Reduced motion |
|---|---|---|
| Page headers (every page) | Letters of the title rise in with a slight random tilt; stickers pop in with overshoot, then float; a touched letter hops and flashes a bright; stickers lean towards the pointer (fine pointers) and spin when clicked; they drift up as you scroll | Everything is simply there |
| Parts into slots (home) | Nine labelled parts fly into a 3×3 board, scrubbed by scroll; "✓ All in place" stamps at the end | The board is shown assembled |
| The check (home) | Pinned on desktop: sheet, register and shelf cards; the $19.20 promo is struck when check 04 fails; the shelf card flips to "Blocked before a menu" | The final state, readable |
| Tools rack (home) | Pinned horizontal track, each promise tightening from 92% to 75% width | A vertical list |
| Cards (sites, case studies, reviews, notes) | Pop in with overshoot in batches; tilt towards the pointer; arrows rotate on hover | Static |
| Filters (work, blog, reviews) | Rows re-flow with GSAP Flip; the result is announced to screen readers | Instant |
| Page change | The page wipes up over the spectrum; the clicked case-study capture morphs into the next page's hero (View Transitions, Chromium) | Normal navigation |

Tools: GSAP 3.15 (ScrollTrigger, SplitText, Flip, matchMedia, quickTo), Lenis on fine pointers only, CSS for loops (marquee, glow). No WebGL.

## Pages

`/` · `/work/` (counts, 11 case-study cards, the full index with filters and a preview loupe) · `/work/<case>/` ×11 · `/blog/` and `/blog/<post>/` ×16 · `/reviews/` and `/reviews/<review>/` ×22 · `/about/` · `404`. How the blog and reviews were rebuilt: [content-sections.md](content-sections.md).
