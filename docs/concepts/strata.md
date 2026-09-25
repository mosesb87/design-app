# Direction A — STRATA
> Full specification as developed by the concept team. Unedited working document; the selected direction and its amendments are in [../02-concepts.md](../02-concepts.md).
**STRATA: The Organization That Never Forgets**
_The whole site is one survey plate of a professional community. The visitor descends through thirty years of member-built knowledge and watches a single question drilled through it as a core. The core comes back up as a tray of cited layers, and the last compartment is left empty for the person who was there._

## Concept

Sapience already describes itself in geological terms. Its platform pillar is called the “Private Intelligence Core”. It says “Your organization builds its own foundational AI — and it gets smarter every year.” It calls itself “the layer” that will “sit above your existing systems”. It speaks of “decades of member built knowledge… built to compound”, and it proposed an SXSW27 session titled “The Organization That Never Forgets”. STRATA takes those words literally. The site is drawn as one nineteenth-century survey plate: a cross-section through an illustrative professional community, with one band for each year from 1996 to 2026. Members lay down knowledge every year as sessions, minutes, standards, threads and conversations, and the record thickens. People move on, but their layer stays, except at handovers. There the record breaks (a geologist would call it an unconformity), and the pieces scatter into “inboxes, drives, and disconnected tools.” The survey language (neatline frame, lithology legend, hatching, curved lettering, marginal footnotes, title-block cartouche) extends the brand's cream, serif and purple into an archival print. Cream is the paper, purple is the engraver's ink, and charcoal is the bedrock.

The page is one continuous camera move, like a single take. First, the flat print tilts into a three-dimensional block. The visitor descends through the years, and a detail inset shows that every hatch line is a person's contribution. The camera pulls back to four boreholes: AMS, CRM, LMS and content systems. Sapience hangs them on one datum and ties matching layers together. Then comes the signature scene. A question from a member-services team arrives at the surface, Sage routes it to where the drilling should happen, and the core descends through thirty years, picking up cited fragments and crossing the 2018 gap. It comes back up and is laid out in a core tray: four sources, then an empty fifth compartment for the committee chair who still holds the reasoning. From there the visitor goes down into bedrock (security) and rises again as new layers settle on top with no gaps. The page ends back on the finished, flat plate, with a request to book a conversation. The motion follows two rules. Things fall into place with gravity, and lines are drawn with a pen. The only things that rise are the answer and the surface of the record.

## Why it fits

1) STRATA takes Sapience's own vocabulary literally. Its words are already geological, so the concept adds no new metaphor:
- “Private Intelligence Core” and “Your organization builds its own foundational AI — and it gets smarter every year” (sapienceai.co/platform)
- “Sapience AI is the layer that changes everything. We sit above your existing systems to organize, connect, and activate relevant knowledge” (LinkedIn company page)
- “Professional organizations sit on decades of member built knowledge… built to compound for the community it came from” (Company values)
- “Institutional Knowledge Infrastructure” (ToS)
- “The Organization That Never Forgets” (proposed SXSW27 session)

2) The problem is the one Sapience itself names: “When board members or committee chairs move on, so does the knowledge they carried” (SXSW27 proposal). It is backed by cited industry context, never presented as a Sapience result:
- ASAE, Sep 2026: officer handovers “often take years of institutional knowledge with them”
- ASAE, Jul 2026: “a decision may be documented, but the reasoning behind the decision is not”
The second quote is the reason the core's fifth compartment holds a person rather than a document.

3) Each set piece animates a mechanism Sapience says it provides (research §10.3). Nothing is decoration:
- “Insights sit scattered across inboxes, drives, and disconnected tools” (/customers) becomes the unconformity and the scattered pieces.
- “organize, connect, and activate” becomes hanging four systems on a datum, correlation ties, and an inked horizon.
- Sage “Routes every question to the right agent automatically” becomes choosing where to drill.
- “the right insight reaches the right person at the right moment” (mission) is the one motion that rises: the core comes up to the surface.
- “Every AI recommendation comes with a full audit trail. You set the permissions.” becomes the chain-of-custody log.
- The 8 published controls become the bedrock.
- “it gets smarter every year” becomes deposition.

4) People come before prompts (§10.2). “The most powerful intelligence in a professional community already lives within its people” (Humans in Partnership) becomes the Detail A inset, where hatch lines turn out to be contributor roles, and the empty person compartment. Labs' “you needed a person, not a prompt” appears only with its early-access and waitlist label.

5) It occupies whitespace from research §5.7:
- #2: the research itself says “A motion metaphor of accrual (strata, rings, an archive that thickens) fits”.
- #3: knowledge that survives turnover.
- #4: a scholarly, proceedings register, with plates, footnotes and marginalia like the journals and standards associations publish.
- #5: sourced data, shown as “readings” with the publisher and year.
- #6: governance made visible.
It sits outside both competitor families (§5.2). There are no KPI dashboards, no dark neon and no network nodes. No association competitor uses an editorial serif register.

6) It is honest by construction:
- Affinity and Corporate appear as names only.
- Flagged sentences are left out: “You own the model.” and “No third-party vendor processes your member records.”
- There are no certification badges, customers or invented metrics.
- Every scenario carries an “Illustrative” label.
- The only figures are attributed industry readings: iMIS/ASI 2026 “Only 43% can easily access and understand the data they need…” and ASAE/Avenue M 2026 “92%… using AI, but only 6% to 13% have an AI policy”.

7) It makes “collective intelligence” literal. The record is thousands of small deposits by many hands, and no single person's layer is the whole. That is the category line, “the collective intelligence platform for professional communities”, shown rather than asserted.

## Visual language

DIRECTION: an archival survey plate (the lineage of William Smith's 1815 geological map and 19th-century survey sheets), printed in Sapience's colors. Paper and ink, not screens and light.

PALETTE (CSS tokens; flat colour only; no gradients, glow, blur, shadow or glass):
- --paper #F2EFEA: the sheet (Sapience cream).
- --paper-2 #E9E4DC: plate margins and core-tray compartments.
- --rule #CFC7BC: hairlines and inactive ticks.
- --wash-1 #E7E0EC, --wash-2 #D9CDE3, --wash-3 #C7B6D8: flat hand-tint washes behind hatching, one per formation group. Nearer slabs use darker washes.
- --ink #5A2D82: Sapience purple as the engraver's ink. Used for linework, the core, links, the primary CTA and italic emphasis. 8.6:1 on paper.
- --ink-deep #3B1E57: dense hatch and pressed CTA.
- --ink-muted #8C6BB1: far-slab linework and the “ai” in the wordmark slot. Decorative only (3.8:1).
- --charcoal #1C1C1E: text, and the bedrock ground in Plate VIII. 14.8:1 with paper.
- --graphite #57535C: secondary text and marginalia. 6.5:1 on paper.
- --ink-light #B9A3D6: linework and labels on bedrock. 7.5:1 on charcoal.
Rule: purple is only ever line, type or flat fill.

TYPE (all from npm @fontsource):
- Display: Bodoni Moda Variable (@fontsource-variable/bodoni-moda/opsz.css + opsz-italic.css; opsz 6–96, wght 400–900; latin woff2 46 KB roman, 54 KB italic). This is a deliberate step on from Sapience's Libre Baskerville-like serif: Baskerville (1757) to the engraved romans of the first geological maps. Roman carries statements; italic carries emphasis, formation names and years.
  - H1: opsz 96, wght 420, clamp(3.25rem, 1.6rem + 5.4vw, 8.5rem) (≈104px at 1440), line-height .94, tracking −.018em. Mobile override below 768px: clamp(2.625rem, 1.9rem + 3vw, 3.25rem).
  - H2: opsz 72, wght 440, clamp(2.125rem, 1.35rem + 2.6vw, 4.5rem), lh 1.02.
  - H2-long (the S1 and S10 statements): clamp(1.875rem, 1.2rem + 1.9vw, 3.25rem).
  - Formation names (H3): italic, opsz 28, clamp(1.375rem, 1.1rem + .9vw, 2rem).
  - Engraved plate titles: uppercase, opsz 11, wght 500, 13px, tracking .22em.
- Body and UI: Public Sans Variable (@fontsource-variable/public-sans/wght.css; 27 KB). It comes from the U.S. Web Design System, so it reads as civic, survey-office, multi-generational type.
  - Lede: clamp(1.125rem, 1rem + .4vw, 1.375rem), lh 1.45, max 36ch.
  - Body: clamp(1.0625rem, 1rem + .2vw, 1.1875rem), lh 1.6, max 60ch.
  - Marginalia: 13–14px, lh 1.45, graphite.
  - Buttons: 600, 16px.
- Field-log mono: IBM Plex Mono 400/500 (@fontsource/ibm-plex-mono/400.css, 500.css), for depths, years, readings, plate captions and citations.
  - Captions: 500, 11–12px, uppercase, tracking .14–.16em.
  - Readouts: 400, 13px, tabular.
- Fallback metrics: “Bodoni Fallback” = local Times New Roman with size-adjust 97%; Public Sans fallback = Arial with size-adjust 103%. Only Bodoni roman latin is preloaded.

GRID:
- Neatline: a double-rule plate border fixed to the viewport. 1px --ink at 14px inset plus a 0.5px inner rule at 18px. Graduated ticks every 12px on the left edge, 10px long at plate boundaries.
- Desktop (≥1200): fixed left depth rail 72px. 12 columns, 24px gutters, max 1320px. Reading column is cols 1–4. The sticky stage is cols 5–12, with marginalia in cols 11–12 when needed. Header 64px; bottom imprint band 28px.
- Tablet (768–1199): rail 48px, 8 columns, 20px gutters, marginalia inline as footnotes.
- Mobile (<768): 16px side gutters, 4 columns, and a 40px “spine” column.
- Spacing scale: 8, 16, 24, 40, 64, 104, 168.
- Buttons: 48px tall (52 on mobile), 2px radius, no shadow.

LAYOUT PRINCIPLES:
1. Every viewport is a plate. The neatline, the plate caption and the fixed imprint (“Plate VI of XI”) frame it.
2. Text never sits on moving art without a cartographic paper halo (paint-order: stroke fill; -webkit-text-stroke .09em var(--paper)) or a knocked-out cartouche.
3. Chapters use an asymmetric 4/8 split, with reading on the left and the stage on the right. The hero, the core and the finale are full-bleed.
4. Sources sit beside claims as numbered marginal footnotes, never in tooltips.
5. Every figure carries a caption (“Fig./Plate”), a legend and an “Illustrative” flag where it applies.
6. No cards, no rounded panels and no three-equal-feature rows.

IMAGERY, built only from SVG, HTML and type (zero raster, zero stock):
- Lithology hatch patterns, one per illustrative “formation” of member knowledge. Minimum pitch 4px to avoid moiré.
  - Annual meeting sessions: cross-bedding arcs, 14×8 tile.
  - Committee minutes: shale dashes, 8 on / 4 off, 4px rows, alternate rows offset.
  - Certification standards: limestone brick, 16×6, running bond.
  - Member forum threads: 45° hatch, 4px pitch.
  - Chapter notes: wavy lines, λ8, amplitude 1.
  - Journals and proceedings: laminae, 4px pitch in alternating .5/.9 weights.
  - Hallway conversations (rarely written down): nearly empty, one short tick every 22px. The emptiness is the point.
  - Bedrock: small crosses on a 10px grid in --ink-light.
- Diagram forms: stratigraphic columns, exploded block diagrams, a fence diagram, a core barrel and core tray, a borehole log sheet, cased bores, Detail callouts, a scale bar (“0 · 10 · 20 · 30 YEARS”), lettering that follows the strata along curved paths (SVG textPath), and a title-block cartouche.
- The strata geometry is deterministic: generated from seeded noise at build time, so every page and the print edition match.

## Motion language

PRINCIPLES
1. Gravity. Everything that arrives falls into place from above: y −16/−24px → 0, or yPercent −100 → 0 inside a line mask. Sediment settles, so headlines settle down into place instead of rising.
2. Only answers rise. Upward motion is reserved for two things:
   - the core pulled up to the surface (the answer reaching “the right person at the right moment”)
   - the Plate IX ascent, where the record's surface rises into the future.
3. Lines are engraved, not faded in.
   - Year boundaries draw left to right; bores draw top to bottom (DrawSVG).
   - Hatch fills follow the pen with clip-path wipes set 0.12s behind their line.
   - Opacity is used only to support text, at 0.6s or less.
4. Scroll is the drill. Every narrative scene is scrubbed and fully reversible. One-shot reveals are limited to headline lines, paragraphs and labels entering, and they do not replay when scrolling back.
5. Time has weight.
   - The camera uses scrub 0.8; line drawings use 0.4; Flip-in-scrub uses 0.6.
   - The descent covers 30 years in 140vh; the ascent covers the same 30 years in 60vh (the future moves faster than the archive).
6. Still by default.
   - No idle loops, no ambient drift, no hover wobble, no autoplay over 5s, so WCAG 2.2.2 is never triggered.
   - Reading text, the neatline, the rail, the legend and the CTA never move after they settle.

EASES (CustomEase; the first three already exist in src/motion/runtime.ts)
- settle “M0,0 C0.16,1 0.3,1 1,1”: arrivals and text.
- draw “M0,0 C0.65,0 0.35,1 1,1”: engraving lines, bores, ties.
- lift “M0,0 C0.2,0 0,1 1,1”: hover and focus.
- New, deposit “M0,0 C0.42,0 0.18,1 1,1”: layers landing.
- New, extract “M0,0 C0.72,0 0.28,1 1,1”: the core resists, then comes free.
- New, compact “M0,0 C0.45,0 0.55,1 1,1”: older layers compressing, scaleY 1 → .94.
- Camera timelines inside scrubs use ease “none”, so scroll alone controls speed.

DURATIONS (the DUR tokens)
- Durations: micro .28 (hover), short .6 (paragraphs and labels), base .9 (line draws), long 1.4 (surface line, the deposition wave), epic 2.2 (ceiling for the whole hero intro).
- Staggers: strata .028s from the bottom up; headline lines .10s; legend and control rows .06s.

WHAT MOVES, AND WHY
- Strata deposit: the record accrues.
- The block tilts and explodes: the print becomes a place to enter.
- The camera descends: time is depth.
- Faults and scattered pieces: knowledge leaves at handovers.
- Columns align to a datum: organize.
- Tie lines: connect.
- The inked horizon: activate.
- The core draws down: a question searched through time.
- Segments Flip into a tray: evidence laid out.
- Provenance trails: every answer traces back to where it came from.
- Log rows ink in: audit.
- Casings draw: isolation.
- New slabs land: the record compounds.

WHAT STAYS STILL
Body copy, marginal footnotes once settled, navigation and CTA buttons, the neatline, the imprint, and the legend swatches except when highlighted.

REDUCED-MOTION STATE AND TOGGLE
Everything above is declared inside one gsap.matchMedia() with desktop, mobile and reduce conditions, plus a site-wide “Motion: On / Still” toggle that calls gsap.matchMediaRefresh().

## Hero scene

COMPOSITION (1440×900, Plate I, “Surface”)
- Frame and header:
  - A fixed double-rule neatline frames the viewport.
  - Header row (64px, inside the neatline):
    - Left: the logo slot, “sapience ai” in lowercase Bodoni Moda (opsz 28, wght 500, 24px), with “ai” in --ink-muted. Marked data-slot=“logo” as a placeholder, because the icon refresh is running in parallel.
    - Centre: the plate caption in IBM Plex Mono 500, 11px, tracking .16em, graphite: “PLATE I · SURFACE · SECTION THROUGH A PROFESSIONAL COMMUNITY, 1996–2026 · ILLUSTRATIVE”.
    - Right: nav in Public Sans 500, 15px (Platform · Governance · Labs · Company), the mono toggle “Motion: On”, and the primary button “Book a conversation” (--ink fill, --paper text, 48px tall, 2px radius).
- H1:
  - Placement: cols 1–9, cap top at about 21vh, last baseline at 50vh.
  - Text: “The organization / that never forgets.¹”, Bodoni Moda opsz 96, wght 420, ≈104px, lh .94. Line 1 is roman in charcoal. On line 2, “that” is roman and “never forgets.” is italic in --ink.
  - The H1 is the LCP element and is never hidden or transformed.
  - A paper halo (paint-order stroke) lets the descender of the “g” in “forgets” dip into and knock out the top band of the section, so the headline appears to stand on the ground.
- Footnote: the superscript ¹ is in Plex Mono 14px, --ink. Its note sits in the right margin (cols 11–12) level with line 1 and is joined by a hairline leader: “¹ Title of Sapience AI's proposed SXSW27 session.” (Public Sans 13px, graphite).
- The section, from 50vh to the bottom edge, full width between the rails:
  - A hand-drawn surface profile (amplitude 3px) runs exactly along the H1's last baseline, measured after fonts load. A CSS estimate positions it before that.
  - Below it are 30 annual bands, 1996–2026, each 7–19px thick, with flat washes, hatch from the legend and 1px --ink boundaries.
  - The rail labels read “2026” at the surface, then “2016” and “2006”. 1996 continues below the fold, inviting the descent.
- Cartouche (the lede), inset into the section:
  - Placement: cols 8–12, 440px wide, top at 56vh. Paper fill with a double neatline.
  - Lede (Public Sans, about 21px, lh 1.45, charcoal): “Sapience AI is the collective intelligence platform for professional communities. Your association sits on decades of member-built knowledge. We make it searchable, actionable, and built to compound for the community it came from.” This is verbatim-adapted from the Collective Intelligence value and is marked data-copy=“adapted”.
  - Actions: [Book a conversation] and the text link “See how the record works ↓” (anchor to #unconformity).
  - Footer of the cartouche: a scale bar (alternating ink/paper blocks, “0 · 10 · 20 · 30 YEARS”) and “One band = one year. Illustrative.”
- Left rail: the graduated depth scale, plate numerals I–XI as real links, and the mini-column motif.
- Fixed imprint in the bottom neatline margin (Plex Mono 11px, graphite):
  - Left: “Speculative design concept. Not affiliated with or endorsed by Sapience AI.”
  - Right: “Plate I of XI”.
- The first viewport names the category and the audience (associations and membership organizations) and offers two CTAs.

LOAD CHOREOGRAPHY (no loader; text paints first)
- Before first paint: a roughly 300-byte inline script in the head adds html.motion when reduced motion is not requested and no “still” preference is stored (read inside try/catch).
  - Under .motion, CSS pre-sets only the stroke-dashoffset and clip scale of the strata. The H1, lede, nav and CTAs are never hidden.
  - Failsafe: the script removes .motion after 2500ms if main.ts has not added .motion-ready.
- 0ms: paper, frame, header, H1, cartouche and imprint paint. Target LCP under 1.2s on desktop broadband.
- 120ms, deposition: the 30 boundary paths draw left to right (DrawSVG 0 → 100%, 0.7s each, ease “draw”), staggered .028s from the oldest band at the bottom up to the newest. Each band's hatch clip scales X from 0 to 1 starting at the left, 0.12s behind its line (0.7s, settle). Thirty years of accrual play in about 1.5s.
- 1.30s: the surface profile draws (1.0s, draw). The present settles last, just under the headline.
- 1.55s: the rail year labels fall into place, −8px → 0 with opacity (0.5s, settle, stagger .05, bottom to top).
- 1.70s: the neatline ticks grow from the frame edge (0.4s, stagger .004).
- 1.75s: the footnote leader draws from ¹ to the margin note (0.5s, draw).
- Done by 2.25s.
- Any wheel, touch or key input before then jumps the intro to its end (tl.progress(1)), so it never fights the user.

## Hero to scroll

The print becomes a place (desktop, from 10vh to 110vh).
- Setup: Stage A is a CSS-sticky layer, 100vh tall, that lives inside a 500vh wrapper spanning Plates I–IV. The H1 and cartouche scroll away in normal flow and are never transformed. The camera timeline is scrubbed at 0.8.
- 10–60vh, the lift: the section block rises and tilts.
  - translateY: surface moves from 50vh to 14vh.
  - rotateX: 0° → −32° (camera elevation), so the slabs' top faces come into view.
  - rotateY: 0° → −14° (a three-quarter block-diagram view), bringing the right-side faces into view.
  - scale: 1 → .84.
  - x: +16vw, so the block settles into stage cols 5–12 and leaves room for the reading column.
  - Perspective: 1600px, origin 50% 30%.
- 40–110vh, the explode:
  - Build: the 30 bands are grouped into 10 slabs of three years each. Each slab has a front face (section hatch), a top face (plan-view hatch, its first year engraved in large Bodoni italic, and the formation name on a curved textPath) and a right side face.
  - Motion: slab gaps open from 0 to 24px (slab i moves −i×24px along the block's local Y).
  - Depth cue: line weight falls from 1px on near slabs to .6px on far ones, and washes step down from wash-3 to wash-1.
- 60–100vh, the chrome follows:
  - The rail readout switches on at “2026”.
  - Plate numeral II inks purple.
  - At 100vh the imprint rolls from “Plate I of XI” to “Plate II” (a 0.3s vertical digit roll).
- Reverse: scrolling back up returns the block to the flat print, exactly on the H1 baseline.
- Mobile: a separate composition. There is no 3D. Between 0 and 80vh, Flip morphs the horizontal hero band into the 40px sticky “spine” column at the left edge of the text, which becomes the borehole log for the rest of the page.

## Signature sequence

PLATE VI, “THE CORE”
- Page range: 700–1020vh.
- Pinned wrapper: .plate-vi__pin, start “top top”, end “+=300%”, scrub .6. The camera uses scrub .8 and line draws use .4.
- Composition: frontal and orthographic, because this scene is about legibility.
- The scenario is illustrative, and labeled so on the plate.

ENTRY (700–750vh; pin 0–17%)
- 700–730vh: the fence from Plate V flattens (rotations go to 0°). Flip merges the four system columns into one full-width section: the connected record. Faint dashed tie marks stay visible inside it.
- 730–750vh:
  - The question settles in at the surface as an engraved annotation in Bodoni italic, 28px, with a leader line: “What did we decide the last time the certification standards changed — and why?” Beneath it, in mono: “ILLUSTRATIVE · ASKED BY A MEMBER-SERVICES TEAM”.
  - A ▽ marker labeled “Sage” draws at the left end of the surface. The marginal note is verbatim: “Sage — Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use.”
  - Routing is shown as choosing where to drill. A dashed ink route line draws along the surface, and the question label slides along it to the bore collar at x 58% (0.4 scrub).

TRANSFORMATION (750–880vh; 17–60%)
- The core barrel descends: two parallel 1.5px --ink walls 14px apart with a 0.5px centre line (DrawSVG, top to bottom, 1:1 with scroll). The section's translateY follows so the drill head always sits at 58% of viewport height.
- The rail readout rolls 2026 → 2010.
- Four hits. Each takes 8vh inside the scrub: a bracket closes on the core at that depth, the band's wash inks from wash-2 to an ink tint, a superscript appears on the core, and a footnote settles into the right margin:
  - 775vh: ¹ “2019 · Certification Committee minutes: the decision.”
  - 800vh: ² “2017 · Annual meeting session notes: the member debate.”
  - 822vh: ³ “2016 · Member forum thread: practitioners' concerns.”
  - 860vh: ⁴ “2011 · Standards revision memo: the precedent.”
- At 812vh the core crosses the wavy 2018 unconformity set up in Plate II. The margin note reads: “Hiatus crossed · 2018 · the committee's staff liaison left.”

INFORMATION REVEAL (880–950vh; 60–83%)
- 880–905vh: extraction, the scene's one upward motion. The core, now a vertical stack of 12 hatched segments that match the bands it passed through, rises out of the bore to above the surface (ease “extract”). The camera pans up so the surface sits at 30vh.
- 905–935vh: Flip turns the stack into a horizontal core tray. The tray is a real HTML <ol> with five compartments in a row across cols 2–12.
  - The four cited segments move into compartments 1–4.
  - The uncited segments drop into the tray's slack channel below, still hatched.
- 935–950vh: each compartment's label settles in: the year in mono, the source, the superscript and a formation swatch.
- Compartment 5 stays empty, drawn as a dashed outline. Its label: “Not everything was written down. The reasoning behind the 2019 decision sits with the committee's chair, 2016–2019. ⁵ Illustrative.”

CLIMAX (950–990vh; 83–97%)
- Provenance trails (0.75px --ink hairlines) draw from each compartment back to its origin depth in the section, which has scaled to .5 in the top-left of the stage (DrawSVG, stagger by compartment).
- Compartment 5's trail runs to the 2018 hiatus mark instead of a band.
- The climax headline (H3, Bodoni opsz 72, clamp 2–3.5rem) settles line by line: “An answer you can trace to the layer it came from, and a person you can ask.”
- The five superscripts in the margin ink from --rule to --ink in order.
- The mission line, verbatim with attribution, settles beneath: “…so the right insight reaches the right person at the right moment.”

RESOLUTION (990–1020vh; 97–100%, then release)
- The pin releases at 1000vh. The tray stays in normal flow as a static figure (Fig. VI-a).
- A real <table>, “Core log”, follows below, with columns Depth · Formation · Source (illustrative) · Contributor role · Cited as.
- Then a small radiogroup: “Drill another illustrative question”.
  - The three options are hand-authored paths: the certification question; “Who has run a hybrid annual meeting here before?”; “How have other chapters kept volunteers from burning out?”
  - Each option redraws the drill at a different collar (routing) as a 2.4s time-based replay, then swaps the tray and log contents.
  - Label: “Drill paths are illustrative and drawn by hand, not generated.”

REVERSE BEHAVIOUR
- Everything from 700 to 1000vh lives in one deterministic scrubbed timeline, so scrolling back plays it exactly in reverse: the trails retract, the tray un-flips into a vertical core, the core sinks back into the bore, the hits un-ink, the notes lift out, the question slides back and the fence re-forms.
- Flip states are captured in onRefresh with invalidateOnRefresh: true, so resizing mid-pin rebuilds them.
- The only non-reversing elements are the one-shot line reveals of the climax H3 and the mission line. They stay visible once shown.
- Jumping into the middle from the rail nav renders the correct frame, because there are no onEnter-only states inside the pin.

## Signature moment

The fifth compartment. The core has come up through thirty years and the tray has filled with four hatched, cited segments: 2019 minutes, 2017 session notes, a 2016 forum thread and a 2011 memo. The last compartment stays empty, a dashed outline. A single hairline then runs from it down to the wavy 2018 gap in the record, and the label settles in: “Not everything was written down. The reasoning behind the 2019 decision sits with the committee's chair, 2016–2019.” Visitors leave remembering that Sapience's answer is a tray of evidence you can trace, and that the last piece of it is a person. It is “a person, not a prompt” shown rather than said. Afterwards, hovering or focusing any compartment redraws its provenance trail back to its layer.

## Evolving motif

THE COLUMN
A miniature stratigraphic column, 10px wide and 60vh tall, lives in the fixed left depth rail beside the plate numerals I–XI, which are real links. It records the state of the record as the visitor moves through the plates, and ends as the key column in the footer's title block.

I Surface: pristine. 30 bands, uncored, unlabeled.

II Unconformity: three wavy hiatus glyphs draw in at 2024, 2021 and 2018 (MorphSVG, straight to wavy, 0.4 scrub). Three tiny notches mark where pieces scattered.

III The Record: a year readout scrubs 2026 → 1996. Each band fills with its formation wash as the camera passes it.

IV Detail A: a 6px circle marks the founding slab, 1996–1998.

V Correlation: three short tie ticks extend right from the column, so it is now tied to other systems. A datum rule caps its top.

VI The Core: a purple core line runs down the column to 2010, with superscript notches ¹–⁴. A small open bracket at the top stands for the empty fifth compartment.

VII Chain of custody: a “LOGGED” mono bracket stamps beside the column's top.

VIII Bedrock: the column's base gains a double-rule casing, and the rail inverts to --ink-light on charcoal.

IX Deposition: three new bands deposit on top (+1, +2 and +3 yr) and the older bands compact to 94%. The historical hiatus glyphs stay wavy (history keeps its gaps). The new contacts are straight, and the +2 yr handover glyph morphs from wavy to straight.

X Field instruments: unchanged; the instruments sit beside the record.

XI Surface, surveyed: resolution. The column Flips out of the rail (1.1s, settle) into the title-block cartouche as “Key column: Plate XI”, complete with core, ties, casing, logged stamp and three new layers: a souvenir of the whole descent.

TYPOGRAPHIC ECHO: the wavy rule under “handover” in the Plate II H2 becomes the straight double rule under “no gap” in the Plate IX H2.

## Typography as motion

1. Headlines settle; they never rise.
   - Only h1 to h3 are split, by lines only, never characters: SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit }).
   - Lines drop into place from above inside their masks: yPercent −100 → 0, 1.1s, ease settle, stagger .10.
   - The split is reverted after the animation, so screen readers and agents see plain text.
   - The H1 is exempt: it is painted static as the LCP element.

2. Ink as emphasis. Key words switch from roman charcoal to italic --ink:
   - “never forgets.”, “handover”, “no gap”, “together”.
   - The switch is part of the static markup. What animates is a ruled line under the word:
     - a wavy unconformity rule under “handover” (Plate II)
     - a straight double “conformable” rule under “no gap” (Plate IX).
   - Both draw with DrawSVG, .9s, ease draw.

3. Lettering that follows the strata.
   - Formation names in Bodoni italic sit on SVG textPath along each slab's curved top face, like map lettering.
   - They ink from --rule to --ink (.3s) as they cross the eye line during the descent.

4. Odometer years.
   - The rail's Plex Mono year readout rolls digit by digit (each digit is a 1-em mask column, .3s, settle). It goes down in the descent and up in the ascent.
   - The imprint's plate numeral rolls the same way at plate boundaries.
   - These are readouts, never headlines.

5. Type as imagery. In Detail A, the hatch lines of a stratum are 2.2-unit micro-text. A crisp viewBox zoom (×7) turns texture into legible contributor roles.

6. Citations that ink.
   - Superscripts ¹–⁵ appear on the core at each hit and ink from --rule to --ink.
   - Their marginal notes settle in with a hairline leader.
   - Hovering or focusing a superscript redraws its leader (.28s, lift).

7. The question never types. The illustrative question in Plate VI settles as one engraved line and then slides along the route line to its bore collar, which is how routing is shown.

8. Plate captions behave like instrument labels: static uppercase mono, tracked .16em. They change only at plate boundaries.

## Spatial depth

THREE PLANES
1. Screen plane (fixed): neatline, depth rail, header and imprint. Never moves.
2. Paper plane: the reading column and marginalia, in normal scroll at 1.0×.
3. The stage: a CSS 3D space with perspective 1600px and perspective-origin 50% 30%, holding the block and fence. The stage is CSS-sticky across Plates I–IV and pinned elsewhere. Its internal camera is keyframed.

CAMERA PATH (one continuous take)
- K0 Print, 0vh: orthographic and flat; the surface at 50vh.
- K1 Oblique, 110vh: rotateX −32°, rotateY −14°, scale .84, x +16vw, exploded 24px.
- K2 Descent, 240–380vh: translateY about −1100px; rotateX eases to −24° as the view goes deeper.
- K3 Detail, 400–500vh: the camera holds; the Detail A panel is a 2D screen-plane inset over the stage.
- K4 Wide, 500–700vh: the block flattens into column 1 of the fence. The fence tilts to rotateY −16°, rotateX 10° at 655–680vh, then flattens at 700–730vh.
- K5 Core, 700–1000vh: orthographic, because legibility beats spectacle. The section translates to follow the drill head at 58% of viewport height.
- K6 Bedrock, 1160–1320vh: flat charcoal.
- K7 Ascent, 1340–1400vh: back to the K1 pose, translateY reversed quickly.
- K8 Deposition, 1400–1520vh: oblique; new slabs fall from −40vh in camera space.
- K9 Print, 1640–1700vh: back to K0, bookending the opening.

DEPTH CUES
The engraver's aerial perspective, never fog, blur or shadow:
- Line weight falls from 1px near to .6px far.
- Washes step from wash-3 near to wash-1 far.
- Hatch pitch widens from 4px to 6px with distance.
- Far linework uses --ink-muted.
- The gaps between exploded slabs are the main depth signal.

CONSTRUCTION
- 10 slabs × 3 faces (front hatch section, top plan face, right side face), each an inline SVG.
- transform-style: preserve-3d and backface-visibility: hidden.
- will-change is set only while a camera trigger is active (ScrollTrigger onToggle).
- The pinned or sticky wrapper is never itself animated; only the inner .block is.

## Three d decision

CSS 3D transforms only, with no WebGL and no Canvas.

WHAT IT IS: the cinematic depth (the tilting print, the exploded slabs, the descent and ascent, the fence rotation) is 10 DOM slabs of three inline-SVG faces each (about 30 composited faces) in a perspective container, animated only through transforms.

WHY WEBGL IS NOT NEEDED
1. The aesthetic is line engraving and flat washes, which SVG renders crisply at any DPR and which print. A shader adds nothing to that look.
2. The text must stay the LCP element and all content must exist before JS. The faces are server-rendered SVG, so no-JS and reduced motion show the finished drawings.
3. Every label in the 3D scene stays real text (textPath, HTML), selectable and readable by screen readers and agents.
4. It saves about 150 KB of three.js and the GPU risk on board-room laptops and projectors.
5. Engineering can maintain it without graphics expertise.

WHERE THE FLAT PLATE WINS: Plate VI (the core) is deliberately orthographic. At the moment of evidence, the design chooses legibility over spectacle.

SAFEGUARD
- An FPS probe watches gsap.ticker deltaRatio during the first 3D scrub.
- If the average falls below about 45fps, html gets a .lite class, which drops the top and side faces and the explode and turns the descent into a 2D translate. Nothing else changes.

## Microinteractions

1. Survey reticle (desktop, fine pointer only).
   - Over any section figure, a 1px --ink horizontal hairline follows the pointer's Y across the section. No custom cursor; the native pointer switches to crosshair.
   - The rail shows a Plex Mono readout, e.g. “Depth reading · 2011 · Certification standards (illustrative)”.
   - Decorative and aria-hidden. The keyboard equivalent is the legend.

2. Legend ↔ strata.
   - Hovering or focusing a legend item (a real <button> in a <ul>) highlights every band of that formation: its wash steps to wash-3 and the boundaries go to 1.5px, while other bands drop to wash-1 (.28s, lift).
   - aria-describedby links each item to the figure caption.

3. Footnotes. Hovering or focusing a superscript draws a hairline leader to its margin note and underlines the note in ink (.28s draw). The two are linked by real anchor links both ways.

4. Tray compartments. Hovering or focusing a compartment redraws its provenance trail to its origin layer (.5s draw) and inks that layer. Compartment 5's trail goes to the 2018 hiatus.

5. Drill another illustrative question. A native radiogroup of three options replays the drill at a different collar in 2.4s (time-based) and swaps the tray contents and log rows. Under reduced motion it swaps instantly.

6. Primary CTA, “Book a conversation”.
   - On hover, the fill deposits from the bottom: an --ink-deep layer's clip-path goes from inset(100% 0 0 0) to inset(0) in .28s (lift).
   - Focus-visible: a 2px --ink outline plus a 0.5px outer rule at 4px offset, matching the neatline. Square.

7. Links. A hand-ruled underline redraws left to right on hover (background-size 0 → 100%, .28s). The base underline stays visible for accessibility.

8. Depth-rail plate nav. Hovering a numeral shows a mono flag with the plate title. Clicking uses Lenis scrollTo (1.6s), then moves focus to the plate's heading. Real <a href="#plate-vi"> links work without JS.

9. “Motion: On / Still” toggle.
   - A header <button aria-pressed>.
   - It crossfades (.2s) into the Still plate edition via gsap.matchMediaRefresh().
   - The choice persists in localStorage, wrapped in try/catch.

10. Copy button on the OpenClaw code block. It really copies. The label reads “Copied” only after navigator.clipboard.writeText resolves; otherwise “Copy failed. Select the text instead.”

11. Mobile taps. Tapping a spine band opens the readout as an inline disclosure (a button with aria-expanded), with no hover dependency. Tap targets are at least 44px.

## Mobile direction

PRINCIPLE: the page becomes a borehole log. A portrait phone is the natural shape of a stratigraphic column, so mobile is recomposed around a vertical spine rather than shrunk from the 3D stage.

FRAME (390×844)
- Neatline: a single 1px rule, 8px inset, no ticks.
- Sticky header, 56px: the logo slot, a “Menu” button that opens a sheet with the plates list, the nav and the Motion toggle, and a mono microline under the wordmark: “Speculative concept. Not affiliated with Sapience AI.” (11px). The full notice is in the menu and the footer.
- 16px side gutters.

HERO
- Plate caption in mono, 10.5px, two lines.
- H1 at clamp(2.625rem, 1.9rem + 3vw, 3.25rem) (about 42px), set as three lines: “The organization / that never / forgets.”
- The ground line sits under “forgets.” at about 260px.
- A flat 16-band section fills 260–470px, with the years 2026, 2016 and 2006 in 10px mono on paper halos.
- Below the section, in normal flow: the lede at 18px/1.5, a full-width 52px “Book a conversation” button, and the “See how the record works ↓” link.
- The deposition intro is the same, shortened to 1.3s.

HERO TO SCROLL: no 3D. From 0 to 80vh, scrub .5, Flip morphs the horizontal band into a 40px CSS-sticky spine at the left edge of the text column (x 16–56px). Text runs in the remaining 304px (about 36ch at 17px).

PLATES
- II Unconformity: hiatus glyphs draw into the spine as the paragraph passes. Scattered pieces scrub out of the spine into an inline three-bin figure below the text.
- III The Record: the spine is the record. Its year readout is sticky at the top, and the legend is a vertical list.
- IV Detail A: a full-width inline panel whose viewBox zoom is scrubbed as it crosses the viewport centre. No pin.
- V Correlation: a CSS-sticky figure inside a 180vh section with four mini columns (4 × 64px + 3 × 20px = 316px). The datum and ties are scrubbed; there is no 3D fence rotation.
- VI The Core:
  - The core draws down the spine as the user scrolls through the section (scrub, no pin).
  - Hits appear as inline footnote cards at the matching text positions.
  - The tray is a vertical core box: five full-width rows, each with a depth label, an 80px swatch segment and the source. It enters with a one-shot Flip (1.1s, settle) rather than a long scroll-jacked scrub.
  - The empty fifth row has a dashed outline.
- VII Chain of custody: the log becomes stacked row entries (a <dl> per row). No horizontal scroll.
- VIII Bedrock: one cased bore diagram, 200px tall and full width, then the 8 controls in a single column.
- IX Deposition: three bands deposit onto the top of the spine as the paragraph passes; “No hiatus” is labeled inline.
- X Field instruments: the ledger stacks, with Chrome first.
- XI Surface: the spine Flips back into a full-width horizontal band, bookending the hero. The CTA is full width and the title block stacks.

TECHNICAL
- No Lenis on touch. No ScrollTrigger pins at all (CSS sticky only).
- ScrollTrigger.config({ ignoreMobileResize: true }).
- No hover interactions. At most one scrubbed scene is active at a time.
- Mobile total is about 1400vh of natural reading scroll.

## Reduced motion

THE STILL PLATE EDITION
It is triggered by prefers-reduced-motion: reduce, by the header toggle (“Motion: Still”), and by no-JS, which renders identically because the static HTML already contains every final-state drawing. It is designed as a finished set of eleven printed plates, not as a degraded site.

WHAT IS OFF
No Lenis, no pinning, no scrub, no parallax, no 3D transforms, no SplitText (headings stay whole), and no odometers (readouts show static values).

WHAT EACH PLATE SHOWS
- I: the fully deposited flat section beneath the H1.
- II: the unconformity drawn, with its three wavy hiatus marks and labels, and the three bins with their pieces already placed.
- III: the exploded block as a static axonometric engraving. The build script generates it as a separate SVG and draws it at the same camera pose as K1. The legend sits beside it.
- IV: Detail A as a callout circle with its enlarged panel already open.
- V: the fence complete: aligned on the datum, ties drawn, 2019 horizon inked.
- VI: the section with the bore drawn and hits marked ¹–⁴, the core tray laid out below with its empty fifth compartment and its trail, then the core-log table. The question radiogroup swaps contents instantly.
- VII: the full log sheet with the LOGGED stamp.
- VIII: the charcoal bedrock plate with its diagram and the 8 controls.
- IX: the column with three new bands and straight contacts.
- X: the ledger.
- XI: the complete plate and the title block.

WHAT STILL MOVES
Only colour and opacity changes of 150ms or less on hover and focus (legend highlights, link underlines, CTA fill), and the static crosshair readout on click.

EXTRAS
- The rail becomes a plain plate index.
- The same Still styles power @media print: each plate prints on its own page with its caption and footnotes. This serves board members who want short, printable answers (research §6).

## Technical approach

STACK
- Vite multi-page app with TypeScript. Home is the chaptered plate set; /platform, /governance, /labs, /company, /contact (concept form, clearly not live) and /rationale reuse the plate system.
- Static HTML5 deployed to Firebase Hosting, using the existing firebase.json.
- Libraries: GSAP 3.15 core, ScrollTrigger, SplitText (lines and mask only), DrawSVGPlugin, MorphSVGPlugin (straight ↔ wavy contacts), Flip (core → tray, four columns ↔ one section, rail → title block), CustomEase (settle, draw and lift already exist in src/motion/runtime.ts; add deposit, extract and compact). Lenis 1.3.26 on desktop only, synced as in the existing runtime.
- No WebGL and no Canvas.
- Fonts: @fontsource-variable/bodoni-moda (opsz + opsz-italic), @fontsource-variable/public-sans (wght), @fontsource/ibm-plex-mono (400, 500). All confirmed on npm at 5.3.0.

ART PIPELINE (the key investment)
- scripts/strata.mjs is a deterministic Node generator (mulberry32 seeded ‘sapience-1996’ plus 1D value noise, smoothed with Catmull-Rom into cubic Béziers).
- It writes committed SVG partials to src/art/:
  - section.svg: 30 boundaries, band washes and clip rects
  - patterns.svg: 7 formation patterns and bedrock
  - slabs/*.svg: 10 slabs × front, top and side faces
  - axonometric.svg: the static exploded block for the Still plate edition
  - fence.svg: 4 columns with per-system thickness jitter
  - core.svg: barrel and 12 segments
  - bedrock.svg
- A roughly 30-line Vite plugin (transformIndexHtml) inlines the partials at build time, so every drawing is in the static HTML in its final state.
- The OG image is rendered at build from Plate I with the existing scripts/capture.mjs (Playwright), so no image is referenced that the build does not produce.

SCENE MODULES
- Files: src/scenes/surface.ts, unconformity.ts, record.ts, detail.ts, correlation.ts, core.ts, custody.ts, bedrock.ts, deposition.ts, outro.ts.
- Each exports init(ctx) and is registered in one gsap.matchMedia() with the conditions desktop '(min-width: 900px) and (prefers-reduced-motion: no-preference)', mobile '(max-width: 899.98px) and (prefers-reduced-motion: no-preference)' and reduce, plus html.still, handled via matchMediaRefresh.
- Start states are set only from JS, apart from the head-script html.motion class and its 2.5s failsafe.

RENDERING PER SET PIECE
- Hero deposition: inline SVG with DrawSVG and clip-rect scaleX.
- Tilt, descent and ascent: CSS 3D on DOM slabs.
- Unconformity: DrawSVG faults, transforms on the pieces, MorphSVG contacts.
- Detail A: an SVG viewBox tween plus clip-path.
- Correlation: SVG columns in DOM wrappers (Flip), DrawSVG ties, CSS 3D rotation.
- Core: SVG barrel (DrawSVG), DOM segments Flipped into an HTML <ol> tray, trails drawn on an overlay SVG measured on refresh.
- Custody: an HTML <table> with rule draws.
- Bedrock: SVG and a clip-path theme flip.
- Deposition: CSS 3D slabs.
- Labs: HTML.
- Outro: 3D to flat, plus a Flip from rail to title block.

SCROLLTRIGGER
- Global: config({ ignoreMobileResize: true }); anticipatePin: 1; invalidateOnRefresh: true; fastScrollEnd: true.
- Pins: Plate V +=180%, VI +=300%, VIII +=80%, IX +=170%. Plates I–IV use CSS sticky (a 500vh wrapper). Pinned elements are never the animated elements.
- Total desktop length is about 1800vh; about 730vh of that is pinned.

SEO / AIO
- One H1 per page, a sequential outline, footnotes as real <ol>, the legend and controls as <ul>, and every word present before JS.
- All illustrative SVGs use role=img with aria-labeledby pointing to a plain-language figcaption. Decorative duplicates are aria-hidden.
- Copy is tagged data-copy="verbatim|adapted|concept|illustrative" to feed the copy deck.
- GA4 events: plate_view (I–XI), cta_click, motion_toggle, core_replay.

PERFORMANCE BUDGET
- HTML about 60 KB gzipped, including inline SVG art.
- JS 95 KB or less gzipped (gsap core ~27, ScrollTrigger ~17, SplitText ~7, Flip ~8, MorphSVG ~9, DrawSVG ~2, CustomEase ~2, Lenis ~4, app ~15).
- CSS 18 KB or less gzipped.
- Fonts about 170 KB. Only Bodoni roman latin (46 KB) is preloaded; everything uses font-display: swap with metric-matched fallbacks.
- LCP (the H1 text) 1.8s or less on 4G desktop; CLS 0.05 or less; INP 100ms or less.
- At most about 34 composited 3D faces, with DPR for faces capped at 1.5.
- Only transform, opacity, clip-path and stroke-dashoffset animate.
- The FPS probe switches to .lite below about 45fps.

BUILD ESTIMATE: medium-high.
- About 13 dev-days for the home page and shared plate system: art generator 1.5, hero and descent 2, unconformity and detail 1.5, correlation 1.5, core 2.5, custody and bedrock 1.5, deposition and outro 1.5, mobile art direction 1.5.
- Plus about 4 days for secondary pages and about 2 days for QA (reverse scroll, keyboard, reduced motion, projector check).
- This fits the Dec 9 launch runway.

## What the hiring team will recognize

HEAD OF BRAND & COMMUNICATIONS / MARKETING COMMUNICATIONS (a remit of an identity system across core and developer products, plus naming and taxonomy)
- They will see their own palette kept, with a stated reason for the change: Baskerville's lineage carried on to the engraved romans of survey plates.
- They get a real system, not a page: neatline, plate captions, legend, marginalia, title block, and a Labs register (field instruments in mono) that extends to developer products.
- Product names are spelled exactly: Sage, Affinity, Corporate, OpenClaw Middleware Suite, NoteBouncer.
- The logo is a labeled slot that respects the parallel icon refresh.
- Every claim is footnoted, and the copy is tagged verbatim, adapted or concept.
- The story is one they can repeat to boards in their own words: “The Organization That Never Forgets”, and “the next handover leaves no gap.”

CEO (go-to-market)
- The category and audience are in the first viewport.
- “Book a conversation” appears in the header, the hero, after the core and in the finale.
- A sales-ready demo metaphor (“drill a question through thirty years”) sets them apart from both competitor families without a single invented customer or metric.
- An honest reserved proof slot is ready for design-partner stories.

FOUNDER (product and UX educator)
- The motion teaches the mechanism rather than decorating it: a datum and ties show organize and connect, choosing where to drill shows Sage's routing, the tray shows cited retrieval, the fifth compartment shows people, and the log shows the audit trail.
- “Humans in Partnership” is made visible, and so is “Not to automate humanity. To elevate it.”

ENGINEERING (runs GCP, owns HubSpot)
- Plain static HTML5 on Firebase Hosting.
- Deterministic, build-time SVG committed to the repo; no WebGL and no framework lock-in.
- Every drawing exists before JS; reduced motion and print come free.
- A performance budget with a .lite fallback, and GA4 events per plate.
- A concept contact form that says plainly it is not wired, with documented seams for the HubSpot connection they own.
- An existing runtime (Lenis sync, eases, DUR tokens) extended rather than replaced.

THE WHOLE ROOM
- The designer read the company closely. The core metaphor is Sapience's own vocabulary taken literally: core, foundational, layer, sits above, compound, never forgets.
- Every flagged claim from the audit is visibly handled.

## Narrative sections

### plate-i-surface — impact

- **Purpose:** State the promise, the category and the audience in Sapience's own words, show the record accruing, and offer the first CTA.
- **Headline:** The organization that never forgets.¹ (footnote: title of Sapience AI's proposed SXSW27 session) · Lede (adapted verbatim): “Sapience AI is the collective intelligence platform for professional communities. Your association sits on decades of member-built knowledge. We make it searchable, actionable, and built to compound for the community it came from.”
- **Composition:** Full-bleed plate, 0–100vh. The H1 spans cols 1–9 and stands on the ground line at 50vh, with its descender knocking out the 2026 band. The 30-band section fills 50–100vh. The cartouche with the lede, the two CTAs and a scale bar is inset in cols 8–12. The marginal footnote ¹ sits in cols 11–12. The depth rail, the neatline and the fixed imprint (‘Speculative design concept. Not affiliated with or endorsed by Sapience AI. · Plate I of XI’) frame the page.
- **Motion:** Load: strata deposit from the bottom up (DrawSVG .7s each, stagger .028, ease draw, hatch clip .12s behind). The surface line comes last at 1.30s. Rail years fall in; ticks grow; the footnote leader draws; everything is done by 2.25s. Scroll 10–110vh: the print tilts into a 3D block (rotateX −32°, rotateY −14°, scale .84, x +16vw) and explodes into 10 slabs (gaps 0 → 24px), scrub .8, fully reversible.

### plate-ii-unconformity — calm

- **Purpose:** Name the problem: knowledge breaks at handovers and scatters. Uses Sapience's SXSW thesis, its /customers line, and cited ASAE and iMIS context.
- **Headline:** Geologists call a missing layer an unconformity. Associations call it a handover.
- **Composition:** 100–240vh. Reading column (cols 1–4): mono kicker ‘PLATE II · UNCONFORMITY’; the H2-long with a wavy ink rule under ‘handover’; a verbatim quote with attribution, “When board members or committee chairs move on, so does the knowledge they carried.” (Sapience AI, proposed SXSW27 session); verbatim “Insights sit scattered across inboxes, drives, and disconnected tools, leaving teams to make decisions without the full picture.”; a mono ‘Reading’ block, “43% — Only 43% can easily access and understand the data they need to monitor and improve performance” (iMIS/ASI 2026 benchmark, footnoted). Margin note: ASAE, Sep 2026, “they often take years of institutional knowledge with them.” Stage (cols 5–12): the oblique block framed on the top ten years. Three handover slabs carry illustrative labels: 2024 ‘Board chair's term ends’, 2021 ‘Chapter president moves on’, 2018 ‘Committee staff liaison leaves’. Three outline bins at the stage's right edge, captioned in mono: INBOXES / DRIVES / DISCONNECTED TOOLS.
- **Motion:** 130–175vh: fault lines draw top to bottom through the three slabs (DrawSVG, scrub .4). 175–215vh: each slab breaks into 2–3 hatched pieces that slide right into the bins (x +14…+24vw, rotateZ ±1.5°, ease none in scrub). The empty contact left behind morphs from straight to wavy (MorphSVG) and a ‘Hiatus’ label draws beside it. The rail motif gains its wavy glyphs. 215–240vh: the bins wipe out (clip-path) as Plate III begins; the gaps stay. The headline lines settle down from their masks (1.1s, settle, stagger .10), and the wavy underline draws in .9s.

### plate-iii-the-record — discovery

- **Purpose:** Reframe the asset: decades of member-built knowledge that belongs to the people who made it. Introduce the illustrative legend of what a community deposits.
- **Headline:** Your members have been laying this down for decades.
- **Composition:** 240–400vh. Reading column: kicker ‘PLATE III · THE RECORD’; H2; verbatim value, “Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it.” (Company, Collective Intelligence). Below it, a survey legend titled ‘Illustrative legend: what a professional community deposits’. It is a real <ul> of 7 focusable items, each with a 28×16 hatch swatch, the formation name in Bodoni italic and a one-line Public Sans gloss: Annual meeting sessions · Committee minutes · Certification standards · Member forum threads · Chapter notes · Journals & proceedings · Hallway conversations (rarely written down). Stage: the exploded block, with a hairline ‘eye line’ at 50% of the stage and a mono readout (‘2011 · Certification standards’).
- **Motion:** 240–380vh: the camera descends. The block's translateY moves about −1100px, and rotateX eases from −32° to −24° as the view goes deeper (scrub .8). The rail year rolls 2026 → 1996 (odometer digits, .3s). As each slab crosses the eye line, its curved formation label inks from --rule to --ink (.3s) and the matching legend item gains a 2px ink rule. 380–400vh: the camera arrives at the founding slab, 1996–1998. Legend items fall in once (y −12 → 0, .6s settle, stagger .06).

### plate-iv-detail-a — pause

- **Purpose:** Make the record human. Every line is a person's contribution. Humans in Partnership.
- **Headline:** Look closer. Every line is someone.
- **Composition:** 400–500vh. Reading column: kicker ‘PLATE IV · DETAIL A (ENLARGED ×7) · HUMANS IN PARTNERSHIP’; H2; the verbatim value, “The most powerful intelligence in a professional community already lives within its people. Technology will never replace that. Our work is to elevate it, so every voice carries further and every contribution matters more.”; a pull line, “Not to automate humanity. To elevate it.” (Sapience AI, LinkedIn); a concept line, “Some of them moved on years ago. Their contribution didn't.” Stage: a Detail A circle (r 28px) on the founding slab, and a leader line to a neatline-framed enlarged panel covering 62% of the stage. The panel holds an SVG whose hatch lines are rows of 2.2-unit micro-text such as ‘question from the floor — member’, ‘minutes — committee secretary’, ‘reply that settled the thread — chapter member’, ‘mentoring notes — past president’, ‘revision comment — standards volunteer’. Roles only, no names, labeled Illustrative.
- **Motion:** 400–420vh: the circle and leader draw (DrawSVG, .4 scrub). 420–470vh: the panel opens (clip-path from the circle's bounds to the full rect) while its SVG viewBox tweens from the full slab (0 0 1100 140) to a 150×19 window. That is a crisp ×7 zoom, so the ‘hatching’ resolves into legible lines at about 16px (scrub .6). 470–500vh: hold, then the panel folds back into the circle as the camera pulls back. The ascenders of the micro-text never animate individually.

### plate-v-correlation — acceleration

- **Purpose:** Mechanism 1. Sapience sits above existing systems to organize, connect and activate, with no migration. Systems are shown generically, with no vendor names.
- **Headline:** Nothing to excavate. Everything connects.
- **Composition:** 500–700vh; pinned 500–680 (.plate-v__pin, end +=180%). Left (cols 1–3): kicker ‘PLATE V · CORRELATION’; H2; verbatim “We sit above your existing systems to organize, connect, and activate relevant knowledge.” (Sapience AI, LinkedIn); a mono stepper, ‘01 Organize: hang every system on one datum · 02 Connect: tie the same moment across systems · 03 Activate: make the tied layer usable’; verbatim “We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace.” Small print, verbatim and footnoted as Sapience's own claim: “Secure, private, and live in days — not months.” A note: ‘Systems shown generically; Sapience AI names no specific vendors.’ Stage (cols 4–12): four borehole columns, each 160px wide and 62vh tall, captioned in mono AMS / CRM / LMS / CONTENT SYSTEMS. Each records the same years at different thicknesses and starts at a different vertical offset (−60, +90, −30, +140px).
- **Motion:** 500–530vh: the 3D block collapses (explode → 0, rotations → 0) and scales into column 1, while columns 2–4 rise into place (y 100vh → 0, stagger). 530–580vh, Organize: the columns slide vertically to hang on one datum. A datum rule draws across their tops, labeled ‘SAPIENCE AI · SITS ABOVE YOUR EXISTING SYSTEMS’. 580–630vh, Connect: seven dashed correlation ties draw left to right between matching horizons (DrawSVG, stagger). 630–655vh, Activate: the ‘2019 · certification change’ horizon (illustrative) fills solid --ink in all four columns, and its tie band fills wash-3. 655–680vh: the fence rotates into 3D (rotateY −16°, rotateX 10°) so the viewer sees it as one connected surface. The stepper's active row inks in sync. Scrub .6, reversible.

### plate-vi-the-core — impact

- **Purpose:** The signature. Sage routes a question, and the core drills through thirty years and returns cited fragments plus a person. Right insight, right person, right moment.
- **Headline:** One question, drilled through thirty years. · Climax: “An answer you can trace to the layer it came from, and a person you can ask.”
- **Composition:** 700–1020vh; pinned 700–1000 (end +=300%). A full-width frontal plate. The question annotation and the Sage ▽ marker sit at the surface. The core runs at x 58%. Footnotes ¹–⁵ collect in the right margin. The core tray is an HTML <ol> of five compartments across cols 2–12, with a slack channel below it. At lower left, an agents legend lists names only: ‘01 Sage — AI Assistant · 02 Affinity — AI Agent · 03 Corporate — AI Agent’, with Sage's verbatim description attached only to Sage. After the pin come the ‘Core log’ <table> and the three-option radiogroup for illustrative questions. Kicker: ‘PLATE VI · THE CORE · ILLUSTRATIVE SCENARIO’.
- **Motion:** See signature_sequence. Entry 700–750 (the fence merges into one section via Flip; the question settles; the route line draws). Transformation 750–880 (the core draws down, the camera follows, four hits and a hiatus crossing). Information reveal 880–950 (extraction with ease extract, then Flip into the tray). Climax 950–990 (provenance trails, the H3 settles, superscripts ink in). Resolution 990–1020 (the pin releases; the static figure and log table follow). Every step is scrubbed and reversible.

### plate-vii-chain-of-custody — calm

- **Purpose:** Governance on the main path. Every recommendation is auditable and the organization sets the permissions.
- **Headline:** Every sample keeps its chain of custody.
- **Composition:** 1020–1160vh. Reading column: kicker ‘PLATE VII · CHAIN OF CUSTODY · GOVERNANCE YOU CONTROL’; H2; verbatim “Every AI recommendation comes with a full audit trail. You set the permissions.” and “Governance-ready for your board and your regulators.” The flagged sentence ‘You own the model.’ is left out. A mono Reading: “92% of association executives are using AI, but only 6% to 13% have an AI policy” (ASAE / Avenue M, Sep 2026, footnoted). Right (cols 6–12): a CSS-sticky log sheet. It is a real <table> styled as a borehole log form with ruled columns No. · Entry · By · Visible to · Ref. Six illustrative rows: 01 Question received · Member services · Staff / 02 Routed · Sage / 03 Sources consulted · ¹²³⁴ / 04 Person suggested · Chair, Certification Committee 2016–2019 · ⁵ / 05 Recommendation drafted · with citations ¹–⁵ / 06 Reviewed · Staff reviewer. Footer: ‘Illustrative audit trail; fields to be defined by Sapience AI.’
- **Motion:** 1040–1120vh, scrubbed .4: rows log in one at a time. Each row's bottom rule draws left to right, then its text settles down 6px as if written by a plotter. Ref superscripts ink in and link back to the tray compartments. 1125vh: a square ‘LOGGED’ bracket stamp draws (.9s, draw) with no rotation gimmick. The rail stamps its motif.

### plate-viii-bedrock — pause

- **Purpose:** Security, as architecture rather than badges. Uses only the 8 published controls and no certification claims.
- **Headline:** Enterprise-grade security and controls
- **Composition:** 1160–1320vh; charcoal field. Left: kicker ‘PLATE VIII · BEDROCK’; H2 (verbatim); verbatim body, “Sapience AI runs on Google Cloud with the controls enterprise teams expect — private per-tenant data models, envelope encryption with per-tenant keys, SAML SSO, audit logging, and OWASP WAF protection.”; the link ‘Read the governance plate →’. Right: an engineering section in --ink-light linework on crystalline bedrock hatch. Three cased bores with double walls: ‘YOUR ORGANIZATION’ drawn prominently, and two thinner bores labeled ‘ANOTHER ORGANIZATION’. A keyed collar (a line-drawn key glyph) sits on each bore. ‘Detail B: envelope encryption’ shows nested outlines: data inside a data key inside a per-tenant key. Below: the 8 controls verbatim as a 2×4 <ul> in Plex Mono 500, 13px, uppercase, each with a bedrock swatch: PER-TENANT ENCRYPTION KEYS · SAML SSO · CLOUD AUDIT LOGS · OWASP WAF · PER-TENANT ISOLATION · MANAGED DATA LIFECYCLE · TLS 1.2+ IN TRANSIT · POINT-IN-TIME RESTORE. Caption (concept): ‘Your column is cased, keyed, and kept apart.’
- **Motion:** 1160–1190vh: bedrock rises. A charcoal band's clip-path goes from inset(100% 0 0 0) to inset(0) (scrub). At 50% a ScrollTrigger class swaps the frame, rail and imprint tokens to the dark set. Pinned 1190–1270vh (end +=80%): casing walls draw top to bottom, wall by wall (DrawSVG, .4 scrub); keys stamp in (scale .92 → 1, settle); the envelope outlines draw from outside in. 1270–1320vh: control rows fall into place once (y −12 → 0, .6s settle, stagger .06). There are no ticks, checkmarks or badges.

### plate-ix-deposition — acceleration

- **Purpose:** Value over time. A private core that compounds, and a future where a handover no longer leaves a gap.
- **Headline:** The next handover leaves no gap.
- **Composition:** 1320–1520vh; paper returns. Reading column: kicker ‘PLATE IX · DEPOSITION · PRIVATE INTELLIGENCE CORE’; H2 with a straight double rule under ‘no gap’; verbatim “Your data trains your model only.” and “Your organization builds its own foundational AI — and it gets smarter every year.” The flagged middle sentence is left out. Then “built to compound for the community it came from.” (Company values). Stage: the oblique exploded block again, with three new slabs above the 2026 surface labeled in mono ‘+1 YR’, ‘+2 YR · COMMITTEE CHAIR'S TERM ENDS · NO HIATUS’, ‘+3 YR’. They are relative, not dated claims.
- **Motion:** 1320–1340vh: bedrock drops away (clip-path reverse). 1340–1400vh: the ascent. The camera rises 1996 → 2026 in 60vh as a time-lapse (translateY reversed, scrub .8), the rail year rolls upward, and the old wavy hiatus marks pass by unchanged. Pinned 1330–1500 (end +=170%). 1400–1480vh: three slabs deposit from above (y −40vh → 0, ease deposit, 25vh each). Older slabs compact (scaleY 1 → .94, ease compact). At +2 yr the contact draws as a straight line and the rail glyph morphs from wavy to straight (MorphSVG). 1480–1520vh: hold, then release.

### plate-x-field-instruments — discovery

- **Purpose:** The Labs and developer register. Shipped work with its true status, and a lighter, punchier voice. Includes the honest proof slot.
- **Headline:** A look inside how our team thinks & builds. (Sapience AI Labs, verbatim)
- **Composition:** 1520–1640vh; a --paper-2 ‘specimen drawer’. An asymmetric ledger, not three equal cards. Each entry is a specimen label with mono fields.
Lead, cols 1–7: Sapience AI for Chrome. Fields: Specimen · Status ‘Early access · peer-matching waitlist’ · v1.0.3. Pull quote in Bodoni italic: “…you needed a person, not a prompt.” Link: ‘View on Chrome Web Store’.
Cols 8–12, top: OpenClaw Middleware Suite. “Safety guardrails for AI agents.” Status ‘Open source · v1.0.0 · 2026-04-27’. A real code block, `npm i @sapience-ai-corporation/openclaw-middleware-suite` then `sai init`, with a copy button. README line: “Because ‘Autonomous’ shouldn't mean ‘Uncontrolled.’”
Cols 8–12, bottom: NoteBouncer Zoom Extension. “Your meetings. Your control.” Status ‘Announced for the Zoom Marketplace’.
Under the ledger: a reserved ‘Field reports’ core box with three empty compartments, captioned ‘Reserved for approved customer stories, to be supplied by Sapience AI.’ This is the honest proof slot.
- **Motion:** Not pinned. Labels fall into place once (y −16 → 0, .6s settle, stagger .08). A hairline ‘pin’ cross draws at each label's top (.3s draw). The code block's copy button shows ‘Copied’ only after navigator.clipboard resolves. No scrub; this plate is a breath.

### plate-xi-surface-surveyed — resolution

- **Purpose:** Resolution. Return to the flat plate, now complete, and make the conversion ask. The footer is the plate's title block.
- **Headline:** Let's explore what your community's collective intelligence can look like when it's truly connected. (Contact H1, verbatim) · Sign-off: “Let's achieve more, together.”
- **Composition:** 1640–1800vh. The H2-long spans cols 1–8, followed by [Book a conversation] (to /contact, a concept form that states plainly it is not connected and that engineering wires it to HubSpot) and the secondary link ‘Read the design rationale’. The finished section spans the lower half full-width: it now carries the core hole, the correlation ties, the historical hiatus marks and three new bands with straight contacts. The sign-off is set large in Bodoni italic --ink. Footer, as a title-block cartouche (cols 8–12, double neatline): ‘SAPIENCE AI · CONCEPT PLATES I–XI / The organization that never forgets: a section through a professional community, 1996–2026 (+3 yrs). Illustrative. / Drawn as a speculative design concept. Not affiliated with or endorsed by Sapience AI.’ Links: Notes & sources (all footnotes collected) · Rationale · Audit appendix · Platform · Governance · Labs · Company. The key column arrives from the rail.
- **Motion:** 1640–1700vh: the 3D block returns to the flat orthographic print, reversing the hero tilt (rotateX −32° → 0, rotateY → 0, explode → 0, scrub .8). This bookends the opening. At about 1720vh the rail's mini-column Flips into the title block (1.1s, settle), then the title-block rules draw (.9s, draw). The sign-off lines settle down from their masks. The imprint reads ‘Plate XI of XI’.

## Risks

- Mining or extraction connotation. Drilling cores out of members' knowledge could read as data extraction, which would contradict “That knowledge belongs to the people who created it.” Mitigation: a vocabulary rule in the copy deck (survey, sample, cite, credit; never mine, extract or harvest). Every tray segment credits a contributor role, and the provenance trails show that nothing is taken away from where it came from.
- Geology can feel cold, inert or ‘dead’, the opposite of a living community. Mitigation: Plate IV (every line is someone) and the empty person compartment put people at the emotional peaks. The copy stays people-first, and purple ink stays warm on cream.
- The exploded slabs could read as the generic ‘stacked cards’ UI trope or as floating dashboards. Mitigation: engraved hatching, curved lettering, square hairline edges, and no shadows, glass or radius. Test with three outside viewers before building out.
- Scroll length (about 18 viewports, about 730vh pinned) may tire executives in a Seattle review. Mitigation: the depth-rail plate nav, the ‘See how the record works’ skip link, anchors per plate, and the Still plate edition for walkthroughs. Pins can be cut by 20% after the first review if needed.
- Performance of CSS 3D with SVG pattern faces on integrated GPUs, and Safari's 60fps cap. Mitigation: faces capped at DPR 1.5, patterns at a 4px minimum pitch, will-change only while active, and an FPS probe that falls back to .lite (2D descent).
- Fine hatching can moiré on 1× displays and projectors. Mitigation: 4px minimum pitch, a projector check in QA, and hatch density that drops with distance.
- The illustrative scenario (certification question, roles, years) could be mistaken for customer data. Mitigation: an ‘Illustrative’ label on every figure, generic roles only, no names or counts, a footnote on each scenario, and the core-log caption ‘Illustrative sources’.
- Jargon (unconformity, hiatus, datum, correlation, casing) could lose non-technical board readers. Mitigation: every term is glossed in plain words in the same sentence (for example ‘a missing layer — an unconformity’), and headlines always carry the human meaning.
- Flip combined with scrub and resize complexity in the core tray could drift out of measurement. Mitigation: capture Flip states in onRefresh with invalidateOnRefresh, test resizing mid-pin, and fall back to precomputed transforms.
- Brand friction. Bodoni Moda departs from Sapience's Baskerville-like serif while an icon and guidelines refresh is running in parallel (Brand Graphic Designer, Sep 14 to Oct 12). Mitigation: type is tokenized, a Libre Baskerville alternate token is ready, and the wordmark is a labeled slot.
- Name collision. ‘Sage’ is also MemberJunction's association agent and an accounting brand. Mitigation: always write ‘Sage, Sapience AI's assistant’ in body copy and structured data.
- Governance claims could conflict with policy. Mitigation: exclude ‘You own the model.’ and ‘No third-party vendor processes your member records.’, show no certifications, and have Sapience legal confirm the audit-trail log fields.
