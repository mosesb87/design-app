# Direction C — A Person, Not a Prompt (Wayfinding)
> Full specification as developed by the concept team. Unedited working document; the selected direction and its amendments are in [../02-concepts.md](../02-concepts.md).
**Meeting Point: Follow the Purple Line**
_Sapience AI shown as the wayfinding system of a professional community. One purple line takes a question from the information desk (Sage), under signs hung above the systems the association already owns, to the meeting point where it reaches the person who knows. The route it draws turns out to be the audit trail._

## Concept

Professional associations already know how to move thousands of strangers through an unfamiliar building. At the annual meeting, a wayfinding system does it: overhead signs, room plates, colour-coded tracks, badges with ribbons, a session board and an information desk. Together they get each person to the right room at the right moment. Meeting Point treats Sapience AI as that system for a community's knowledge. The building is the association. Its rooms are the systems it already runs: AMS, CRM, LMS and content systems. They are never moved or rebuilt. Its people are the members and staff who hold what the documents leave out. Sapience is the layer hung above the rooms ("We sit above your existing systems to organize, connect, and activate relevant knowledge"). Sage is the information desk that "Routes every question to the right agent". The purple line painted on the floor is the route a question takes.

The site follows one question, labelled Illustrative: "Why did the certification committee change the recertification requirement?" It is told through a transit-grade signage system in motion. One 12px purple line, drawn only at 0°, 45° and 90°, carries the visitor through ten numbered rooms. At each stop the question's ticket gets a route mark. In room 06 those marks turn out to have been the audit trail all along ("Every AI recommendation comes with a full audit trail"). The route never ends at a chatbot. It ends twice at people: first at a past committee chair (an illustrative role, never a named person), and finally at Sapience's own team ("Book a conversation with our team."). The system speaks in a working grotesk and people speak in a serif. Sapience's serif is not dropped; it becomes the voice of the humans the platform exists to reach.

## Why it fits

MECHANISM, 1:1 WITH VERIFIED CLAIMS
• Information desk = Sage: "Your command center. Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use." (sapienceai.co/platform). Needing no map of the building is exactly what a desk gives a visitor.
• Signs hung above rooms that stay unchanged = "We sit above your existing systems to organize, connect, and activate relevant knowledge" (LinkedIn) and "We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace." (Platform). Wayfinding is by nature a retrofit: you don't knock down walls to install signs.
• A route that reaches the person who knows = the mission "so the right insight reaches the right person at the right moment" (LinkedIn), the value "The most powerful intelligence in a professional community already lives within its people" (/company), and the Labs line "you needed a person, not a prompt" / "Find the person who knows." (/labs). Person-routing is always labelled Illustrative, and the Chrome peer-matching is labelled "early access, waitlist" (§4.6, §11.4).
• The route is the record = "Every AI recommendation comes with a full audit trail. You set the permissions." (Platform), and §5.7 whitespace #6: animate question → sources → people → recommendation → reviewer.
• A building that gains floors = "built to compound for the community it came from" and "it gets smarter every year" (values, Private Intelligence Core), plus "The Organization That Never Forgets" (proposed SXSW27 session, "When board members or committee chairs move on, so does the knowledge they carried.").

HOW IT SHOWS COLLECTIVE INTELLIGENCE
Knowledge is spread across many rooms and many people. The concept makes it navigable as one place without centralising it: rooms keep their identity and people keep ownership ("That knowledge belongs to the people who created it"). The meeting-point pictogram, with arrows converging on a shared place, is the visual form of collective intelligence. It shows convergence, not a hive mind or a network.

STRATEGIC FIT
• §5.7 whitespace #1: people-routing is unclaimed in the association category, and this makes it the hero idea.
• §5.2: incumbents use floating dashboards and AI-native players use glowing nodes. No one uses a modernist signage system. It is also the association's own vernacular (§5.6: annual meeting, committees, certification, chapters, badges, session boards).
• The Head of Brand & Communications owns "naming and taxonomy architecture". A wayfinding system is taxonomy made visible: codes, tracks and names that can take renamed products without redesign.
• Legibility is wayfinding's first duty, which fits multi-generational board readers (§5.4 "designing for trust across generations").
• Honesty is built into the metaphor. Affinity and Corporate are gates with "Description to be published by Sapience AI". Customer stories are "To be announced" slots on a session board. Future stations are drawn dashed, as on real transit maps.

## Visual language

PALETTE: flat solid hexes only. No gradients, transparency effects, shadows or glow.
• --ground #F2EFEA cream: page, the building's walls
• --paper #FAF8F4: plates, tickets, badges
• --ink #5A2D82 purple: the route line, sign panels, primary buttons (cream on ink 8.6:1)
• --ink-deep #41205F: pressed states, arrow tile inside the purple button
• --ink-soft #D9CCE6: secondary text on purple (6.5:1)
• --ghost #DCD2E6: dashed planned routes and highlight flashes (non-text)
• --charcoal #1C1C1E: text, directory boards, architectural hairlines (14.9:1)
• --graphite #4A474F: secondary text (7.9:1)
• --board-soft #B9B3C2: secondary text on charcoal (8.3:1)
• --rule #CBC3B8: decorative hairlines only
• Track codes, used only as 20px chips, badge bands and ribbons, never as large fields:
  – R Route: #5A2D82
  – S Systems: #1C1C1E
  – G Governance: #2F6B5B, the green of ISO 7010 safe-condition signs (5.4:1)
  – M Memory: brass #86591A (5.3:1 with cream)

TYPE: two voices, three packages
• SYSTEM voice: Archivo variable, @fontsource-variable/archivo/wdth.css (wght 100–900, wdth 62–125; latin woff2 is 90KB). Used for signs, codes, labels, H1/H2 and body. Chosen for its grotesque robustness and a width axis that lets sign lines be fitted to their plates the way signmakers do.
• HUMAN voice: Newsreader variable, @fontsource-variable/newsreader/wght.css + wght-italic.css (58KB + 65KB). The opsz files are skipped because they double the weight. Used for questions, roles on badges, values, the secondary line of every sign, "You are here", the wordmark slot and the sign-off.
• LABS ONLY: @fontsource-variable/atkinson-hyperlegible-mono (18KB), for npm and CLI lines.
• Type scale (size / line-height / weight / wdth / tracking):
  – sign-xl: clamp(3.5rem, 8.2vw, 8.5rem) / .9 / 740 / 100 / −0.028em
  – sign-l (H2): clamp(2.25rem, 4.4vw, 4.75rem) / 1.0 / 680 / 100 / −0.02em
  – sign-m (H3, plate titles): clamp(1.375rem, 2vw, 2rem) / 1.1 / 650 / fitted between 84 and 100
  – code: clamp(2.5rem, 4vw, 4rem) / 1 / 800 / 75, tabular
  – stat numerals: clamp(4.5rem, 10vw, 9.5rem) / .85 / 800 / 75
  – H1: clamp(1.75rem, 2.8vw, 2.75rem) / 1.05 / 640 / 96
  – body: clamp(1.0625rem, .3vw + .98rem, 1.1875rem) / 1.55 / 400, max 62ch
  – label caps: 13px / 650 / wdth 88 / +0.1em. Minimum 12px anywhere.
  – human-secondary: Newsreader italic clamp(1.25rem, 1.9vw, 1.75rem) / 1.25
  – human-quote: Newsreader 450 clamp(1.375rem, 2.2vw, 2rem)
  – sign-off: Newsreader italic clamp(2.5rem, 6vw, 6rem)

GRID
• 12 columns at 1024px and up: margins clamp(16px, 4.4vw, 64px), 24px gutter, content max 1440px.
• 8 columns from 640 to 1023px (16px gutter). 4 columns below 640px (12px gutter, 16px margin).
• 8px base unit.
• Radii: sign panels 6px, plates 4px, tiles 2px.

SIGN ANATOMY: the core component
[code square][pictogram tile] PRIMARY LINE (Archivo) [arrow tile], with a secondary line under it (Newsreader italic).
• Tile = 1.5 × the primary line's cap height. Padding = 0.5 tile. Gap = 0.25 tile.
• The arrow sits on the side it points to (→ at the right edge, ← at the left, ↑/↓ at the right).
• Variants: overhead sign (purple panel hung on two 1px charcoal cables ending in 6px cream clamps), room plate (paper with a 1.5px charcoal border), directory board (charcoal), status plate (small, dashed border = not yet in service), ticket, badge with ribbons.

ROUTE GRAMMAR
• One stroke: 12px on desktop, 8px on mobile, purple, square caps, vector-effect non-scaling-stroke.
• Angles are 0°, 45° or 90° only. Corners are 45° chamfers of 3× the stroke.
• Stops are 28px cream circles with a 4px purple ring. Future stops are dashed hollow circles. Terminus is a perpendicular bar 3× the stroke.
• The route never branches, except the merge in room 02 (many lines into one), and never loops, except the tenant perimeter in room 08.

PICTOGRAMS
A bespoke set of 26 on a 24-unit grid: 2u stroke matched to the Archivo 700 stem, 0/45/90° construction, square terminals, filled heads on person figures. All are inline SVG symbols with aria-hidden and a text label always beside them.
• Wayfinding: entrance, information "i", concourse, meeting point (four arrows converging), trip log, elevator, key, program board, meeting room.
• Systems: AMS (member card), CRM (address book), LMS (book with tick), content (document stack).
• The 8 security controls.
• The arrow: 8 directions only.

IMAGERY
No photos, illustrations, stock or faces. Everything is built from type, SVG pictograms, route lines, hairline architectural elevations (corridors, doors, building sections) and real HTML badges, boards and tables.

LAYOUT PRINCIPLES
1. Thin charcoal lines show what the association already has. The thick purple line is what Sapience adds.
2. Rooms never move. Only signs and routes do.
3. Every room opens with a room sign at top left (code, pictogram, track chip) and closes with an exit.
4. Sizes are big or small, nothing in between: signage contrast.
5. Illustrative scenarios carry a visible "ILLUSTRATIVE" plate. Copy is tagged in the source as data-copy="verbatim|concept".

## Motion language

PRINCIPLE: signs are installed, routes are traced, nothing floats. All motion shows a mechanism: something being signed, routed, connected, recorded or kept.

RULES
1. SCROLL IS WALKING PACE. Travel (route draws, corridor pans, the ticket riding the line) is scrubbed with ease "none", so distance equals scroll. Scrub smoothing is 0.6 on desktop and 0.3 on touch.
2. DIRECTIONS ARE DISCRETE. Arrows rotate only in 45° clicks, never a continuous spin. Scrubbed rotations pass through gsap.utils.snap(45) modifiers.
3. THE SYSTEM SPEAKS, THE HUMAN ANSWERS. On every sign the Archivo line reveals first and the Newsreader line follows 180ms later with the same ease. Never the reverse.
4. INSTALLATION IS TIME-BASED AND PLAYS ONCE. Signs hang, plates letter in, numerals roll. Once installed they stay put.
5. EVERY SET PIECE SETTLES into a static, readable sign. There are no idle loops at all, so WCAG 2.2.2 is satisfied by design.

EASES (CustomEase, extending src/motion/runtime.ts)
• settle "M0,0 C0.16,1 0.3,1 1,1": arrivals and line-mask reveals. 0.9s for lines, 0.6s for plates.
• draw "M0,0 C0.65,0 0.35,1 1,1": time-based route draws. Duration is path length ÷ 1100px/s, clamped to 0.5–1.4s.
• hang "M0,0 C0.22,0.88 0.34,1.035 0.56,1.012 0.76,0.994 1,1": signs and badges dropping on cables. 0.8s, y −24px→0, rotation 1.2°→0 (at most 1.2°, so it stays physical and not cartoonish).
• click "M0,0 C0.45,0 0.25,1.22 0.6,1.04 0.8,0.99 1,1": each 45° arrow step (0.18s), route marks filling, stops popping.
• roll: power3.inOut 0.42s, for roller-blind sign changes.
• lift "M0,0 C0.2,0 0,1 1,1": hover and focus, 0.22s.
• Duration tokens: micro .18, short .42, base .6, long .9, epic 1.4.

WHAT MOVES, AND WHY
• Overhead signs hang (the layer arrives above the rooms).
• The purple line draws (a question travelling).
• Arrows click (a decision about direction).
• Route marks fill (a step logged).
• Status plates roll (state changed).
• Floors stack (knowledge compounds).
• Directory rows letter in (controls listed).

WHAT STAYS STILL
• Rooms and existing systems: they are never moved, redrawn or restyled, which is the "No rip and replace" message.
• Body copy, the H1, the header, the persistent notice, forms and footnotes.
• No parallax on any text. No cursor followers or custom cursor. No headline ever rotates or types itself.
• Only transform, opacity, clip-path, stroke-dashoffset, and font-variation on single-line elements are animated.

## Hero scene

COMPOSITION: "The overhead sign" (desktop reference 1440×900)

HEADER (fixed, two tiers, 84px total)
• Bar, 56px, cream with a 1px #CBC3B8 rule.
  – Left: wordmark slot, lowercase "sapience ai" in Newsreader 500 22px with "ai" in #8A6BAE, marked data-slot="wordmark" so the refreshed icon can drop in. Beside it, the persistent notice as a hairline-bordered "temporary sign" plate: "SPECULATIVE DESIGN CONCEPT" (Archivo 650, 12px caps) with "Not affiliated with or endorsed by Sapience AI." (Newsreader italic 13px).
  – Right: "Directory" (pictogram + label), "Motion · On" toggle, and the primary "Book a conversation" button (purple, 40px, arrow tile).
• Rail, 28px: holds the docked strip map after the first scroll. It is empty at load.

OVERHEAD SIGN
• A purple #5A2D82 panel across columns 1–12, top 108px, height clamp(380px, 50vh, 500px), radius 6px.
• Hung by two 1px charcoal cables from the top edge of the viewport at the centres of columns 2 and 11. Each cable ends in a 6px cream clamp square.
• Inside, 40px padding:
  – Top left: a 48px cream pictogram tile (entrance) and the label "ENTRANCE · YOU ARE HERE" (Archivo 650, wdth 90, 14px caps, +.12em, #D9CCE6).
  – Top right: code "01" (Archivo 800, wdth 75, 44px, cream) with a track chip "R".
  – Middle, the LCP element, as a <p> (concept copy adapted from Labs' "Find the person who knows."): "The person / who knows" in Archivo 740 at clamp(3.5rem, 8.2vw, 8.5rem), cream, leading .9. Set on the second line, flush to the panel's right edge, is a 108px cream arrow tile with a purple → on the 24u grid.
  – Bottom: the secondary line, Newsreader italic 27px, cream (verbatim, /company): "The most powerful intelligence in a professional community already lives within its people."

BELOW THE SIGN (y ≈ 600–820)
• Columns 1–7:
  – Audience label, Archivo 650 13px caps, preceded by a charcoal track square: "FOR PROFESSIONAL ASSOCIATIONS AND MEMBERSHIP ORGANIZATIONS".
  – H1 in Archivo 640, 40px, charcoal, max 26ch: "Sapience AI is the collective intelligence platform for professional communities."
  – Body, 19px graphite (verbatim, LinkedIn): "We provide every person, at every level, meaningful access to the insights, guidance and expertise that already live inside their network."
  – CTA row: a purple button "Book a conversation" (56px tall, with a #41205F arrow tile) and an outlined "Follow the route" with a ↓ tile.
• Columns 9–12: the question ticket, 320×220.
  – Paper with a 1.5px charcoal border and a punched hole at top left.
  – 36px purple band: "QUESTION · ILLUSTRATIVE".
  – Newsreader 500 24px: "Why did the certification committee change the recertification requirement?"
  – Footer: six empty 18px route-mark squares numbered 01–06.
  – It has no caret, no field and no send button. It is a paper tag, not a prompt box.

BOTTOM (100svh − 76px)
• The strip map: a 4px purple line from column 1 to column 12 with ten 14px stops.
• Labels above in 12px caps: ENTRANCE, LOST & FOUND, INFORMATION DESK, CONCOURSE, MEETING POINT, TRIP LOG, ALL LEVELS, SERVICES, PROGRAM, MEETING ROOM. Codes 01–10 below.
• The "You are here" marker (an 18px purple disc with a 3px cream ring, labelled in Newsreader italic) sits on 01.
• This is the site's real chapter index: <nav><ol> of <a href> links, with aria-current="location".

LOAD CHOREOGRAPHY: no loader, text never hidden
• t=0: first paint shows every word in its final position. Archivo (latin, wdth) and the Newsreader italic are preloaded. font-display is swap, with metric-matched fallbacks (Arial with size-adjust, ascent-override and descent-override tuned at build) so CLS stays at or below 0.02.
• A roughly 300-byte inline head script adds html.js-motion only when motion is allowed. That class pre-hides decorative strokes only (cables, the strip-map line, the arrow preset to ↑). There is a failsafe: if main JS hasn't run within 2.5s, the class is removed.
• After document.fonts.ready (capped at 500ms):
  – 0–520ms: the cables draw downward (DrawSVG, draw ease). The sign is being hung.
  – 280–640ms: the arrow clicks ↑→↗→→ (2 × 180ms, click ease). The installer sets its direction.
  – 420–1320ms: the strip-map line draws left to right. Stops pop as the line passes (200ms each, 70ms stagger). At 900ms the marker drops 12px onto 01 (settle).
  – 700–1000ms: the ticket's six route-mark outlines tick in (50ms stagger).
  – Everything is finished by 1.35s. Nothing blocks input.

## Hero to scroll

The hero is not pinned. Scroll 0 → 100vh, scrubbed at 0.6: "walking under the sign".

• 0–14vh, DOCK: the hero strip map fades out. The header rail's compact strip (2px line, 6px ticks) draws in. The "You are here" marker moves with Flip from hero stop 01 to rail stop 01. From here the rail is the persistent progress and navigation: stop labels become hover and focus tooltips, and each chapter's ScrollTrigger sets aria-current and fires a GA4 chapter_progress event.
• 0–70vh, WALK UNDER: the sign's wrapper, never the text node, moves up 1.35× faster than the page (extra y = −0.35 × scroll) and scales 1 → 1.05 from its top centre, as though the visitor is passing beneath a hanging sign. The cables' scaleY shrinks 1 → 0.35 from the top. There is no blur and no fade, so the text stays crisp until it leaves.
• 10–30vh, TURN: the arrow in the tile clicks → ↘ ↓. The steps are snapped to scroll positions 12vh and 24vh, never in between.
• 24–100vh, ROUTE BEGINS: a 12px purple line draws straight down from the tip of the arrow (DrawSVG, scrubbed, lane R = the arrow tile's centre x), past the right edge of the ticket, into room 02. It lands on the top-right plate of the sign wall and becomes that plate's arrow. That landing triggers the wall's hang-in: the single route breaks into 24 contradicting signs, and the next beat begins.
• The H1, body copy, CTAs and ticket scroll normally and are never animated.
• Reverse: every part is scrubbed. Scrolling back to the top re-docks the marker into the hero strip, lowers the sign, turns the arrow back to → and retracts the line.

## Signature sequence

Room 02 "Lost & Found", desktop.
• Structure: a 30vh lead-in, then the stage (the room's inner wrapper) pinned for 160vh with scrub 0.6. The section is pinned; the stage is animated, following ScrollTrigger's "don't animate the pinned element".
• The wall is 24 plates, 6 per row × 4 rows, each 199×104px with a 16px gap, spanning columns 1–12 from 38vh to 90vh.
• Each plate has a 40px charcoal arrow tile at top left and its label at bottom left (Archivo 600 16px). The label names a place knowledge hides: Inboxes, Shared drives, AMS, CRM, LMS, Content systems, Board minutes, Committee notes, Session recordings, Chapter spreadsheets, Certification files, Journal archive, Webinar library, Survey results, Standards drafts, Volunteer handbook, Annual meeting slides, Listserv threads, Policy binder, Member directory, Past chairs' email, Desktop folders, Renewal notes, Event feedback.
• A caption reads: "Illustrative. AMS, CRM, LMS and content systems are the systems Sapience AI names."

ENTRY (−30vh → 0)
• Room sign 02 hangs in.
• The H2 lines rise from masks (900ms settle, 80ms stagger): "Insights sit scattered across inboxes, drives, and disconnected tools". The serif line follows 180ms later: "…leaving teams to make decisions without the full picture." (verbatim, /customers).
• The hero route lands on the top-right plate.
• At pin start the 24 plates hang in row by row (hang ease, 25ms stagger). This plays once.

TRANSFORMATION (0 → 60vh), "confusion"
• Each arrow clicks through directions as the visitor scrolls: rotation_i = base_i + 45° × floor(progress × rate_i).
• rate_i is seeded from {3, 4, 5, 7}, so it's deterministic, and snapped so no arrow ever sits between directions.
• The labels never move: the systems stay put. The wall visibly contradicts itself.

INFORMATION REVEAL (30 → 70vh)
• The stat plate at top right (columns 9–12) rolls "43%" on an odometer: tabular digit reels, 900ms settle, triggered at 30vh.
• Beside it: "Only 43% can easily access and understand the data they need to monitor and improve performance." Footnote tile [1]: iMIS/ASI 2026 Membership Performance Benchmark Report.
• It is labelled as industry context, never as a Sapience result.

CLIMAX (70 → 115vh), "the alignment"
• A diagonal wave re-signs the wall. Each plate's delay is (row + col) × 0.035 of the phase. Each arrow takes the shortest path to → in 45° clicks.
• As each arrow lands, its tile turns charcoal → purple and the plate border turns purple.
• By 115vh all 24 face the same way.

RESOLUTION (115 → 160vh), "one route"
• The arrow shafts extend and join each row into one line (DrawSVG on four row paths through the empty top band of each plate, so no text is struck through).
• The stage pans left 40vw (ease none), opening space on the right where the four lines merge through 45° chamfers into a single 12px trunk at floor height (64vh).
• The trunk carries three stops that light as it passes them: "Organize" at 128vh, "Connect" at 142vh and "Activate" at 156vh (verbatim verbs from Sapience's layer line). It exits the right edge at 160vh.
• The pin releases. Room 03's floor line starts at the left edge at the same height (cut continuity).

REVERSE BEHAVIOUR
• Every phase is scrubbed, so scrolling up retracts the trunk, un-pans, un-aligns and re-scatters the arrows exactly.
• The one-shot hang-in does not replay.
• The odometer rolls back to blank if the visitor scrolls above the 30vh mark.
• A "Skip this route ↓" plate (visible, and focusable at the bottom right of the stage) jumps to room 03.

## Signature moment

THE ALIGNMENT. Twenty-four contradicting signs (Inboxes, AMS, Board minutes, Session recordings, Past chairs' email…) click through directions as the visitor scrolls. Then a diagonal wave snaps them one by one to face the same way. Their arrows fuse into a single purple line that picks up three stops, Organize, Connect, Activate, and carries the visitor to Sage's desk. None of the signs is removed or renamed; they are only re-signed.

Before alignment, on devices with a precise pointer, a hovered plate's arrow clicks to point at the cursor, as if every system is competing for attention. Scroll back and the building falls back into confusion.

It is the one image that explains "organize, connect, and activate" and "No rip and replace" to a non-technical executive in about four seconds of scrolling.

## Evolving motif

THE PURPLE LINE: 12px, only 0/45/90°, always the same stroke, colour and grammar. It is the brand's ink turned into a route.

• 01 ENTRANCE, potential: the whole route is compressed into one arrow on the overhead sign. On the first scroll it turns ↓ and extrudes into a line.
• 02 LOST & FOUND, broken, re-signed, fused: the line shatters into 24 contradicting arrows, aligns, and fuses into one trunk with stops at Organize, Connect and Activate.
• 03 INFORMATION DESK, guided: a floor line leads the question ticket to Sage's desk. The desk's arrow tile turns ↓ → → and sends it onward. Route marks 01 and 02 fill.
• 04 CONCOURSE, above and along: the line doubles. A purple overhead rail (the layer that sits "above your existing systems") and the floor route run the corridor. Short dashed spurs reach each room's threshold without ever entering or changing the room. Marks 03 and 04 fill.
• 05 MEETING POINT, first arrival: the route and a second short line from the past chair's badge converge on the meeting-point tile and end in a terminus bar. Mark 05 fills.
• 06 TRIP LOG, record: a small silhouette of the winding journey morphs into a straight strip map. The ticket's five marks fly into its stops, and a sixth stop, "Reviewed", completes it. The route was the audit trail.
• 07 ALL LEVELS, core: the line turns vertical and becomes the elevator core of a building that gains floors. When a past chair's badge leaves, the spur to their floor stays connected.
• 08 SERVICES, perimeter: the line closes into a loop around "your floor". This is per-tenant isolation drawn as a boundary, beside ghosted, separate floors.
• 09 PROGRAM, planned: the line runs down the session board with solid stops for shipped Labs work and dashed hollow stops for stories "to be announced". These are the transit map's future stations.
• 10 MEETING ROOM, terminus: the line enters the final sign, "Book a conversation with our team", and ends in the last terminus bar. At the same moment the header strip map fills end to end. The route ends at people, which resolves "a person, not a prompt."

## Typography as motion

TWO VOICES
• Archivo is the system: signs, codes, labels, body.
• Newsreader is people: questions, roles on badges, values, "You are here", the sign-off.
• Choreography rule: the system line reveals first and the human line answers 180ms later with the same settle ease. It is never reversed, anywhere on the site. The sequence reads like a bilingual sign, with the serif as the "second language" of humans.

WIDTH-AXIS FITTING (Archivo wdth 62–125)
• Single-line sign plates (room names, directional signs, the final "Book a conversation with our team" sign) are fitted to their plate on load and resize. JS binary-searches wdth between 84 and 100 until the line fills the plate, as a signmaker condenses a long destination.
• On reveal they settle from wdth 116 / wght 780 to their fitted value / 700 (900ms settle).
• Only nowrap elements with fixed box height get this, so there is zero reflow and zero CLS. Multi-line headings never change width.

LINE-MASK REVEALS (H2s only)
• SplitText { type: 'lines', mask: 'lines' } runs on an aria-hidden visual copy. The semantic heading stays in the DOM, visually hidden during the reveal, then swaps back and the copy is removed. This follows research §8.8, since the aria-label approach fails across screen readers.
• yPercent 105 → 0, 900ms settle, 80ms stagger. Never split by characters.

ROLLER-BLIND STATE CHANGES
• Status plates, never headlines, change state by a vertical roll: two stacked spans in an overflow-clipped box, yPercent −100, 420ms power3.inOut. Examples: "Ask here → Routed", "To be announced", "Copy → Copied".
• The state is written into the static HTML as the final text.

ODOMETER NUMERALS
• "43%", "46%" and the floor indicator roll once on tabular Archivo wdth 75 digit reels (aria-hidden duplicates; the real number is static text), 900ms settle. They stay fixed afterwards.

ARROWS AS TYPE
• The arrow is drawn to match Archivo 700's stem. It sits in the text line as a glyph tile and rotates only in 45° clicks (180ms), so arrows behave like punctuation that changes its mind in discrete steps.

DIRECTORY LETTERING
• Rows on boards (the security directory and the Directory dialog) appear the way vinyl letters are applied to a board: each row rises from a 100% mask, 70ms stagger. Played once, then static.

## Spatial depth

A flat signage world: three planes, zero perspective.

1. OVERHEAD PLANE: hanging signs, the ceiling rail, cables and badges on lanyards. It is the only plane that parallaxes, at 1.12–1.35× scroll speed on desktop. It "hangs": things drop on cables with at most 1.2° of pendulum settle, and scale 1 → 1.05 as they pass above the viewer, as though you are walking beneath them.
2. WALL PLANE: text, room plates, doors, directory boards and the session board. Always 1×, never parallaxed.
3. FLOOR PLANE: the purple route and the question ticket, where the traveller is.

CAMERA
• In the horizontal rooms (02–06) the camera follows the traveller as a dolly: the world translates, and the ticket holds at 38vw on the floor line.
• In room 07 the camera becomes an elevator: floors stack and the indicator ticks.
• From 08 to 10 the route is a vertical spine running down the page.
• Cut continuity: a route leaving one room on the right re-enters the next room on the left at the same floor height (64vh), like following someone across film cuts.

DEPTH CUES
• Only cables and lanyards (things hang from something), overlap (the route passes in front of walls and behind overhead signs), speed difference, and the slight scale-up of overhead signs.
• No drop shadows, blur, depth-of-field, gradients or 3D transforms.
• z-index tokens: wall 0, floor/route 10, overhead 20, header 50, dialog 100.

## Three d decision

No WebGL, no Three.js, no canvas. Signage is a flat, printed medium: its authority comes from crisp vector edges, strict angles and legibility, and a 3D scene would weaken all three.
• WebGL would add 150KB or more plus GPU risk.
• It would compete with text as the LCP element.
• It would pull toward the category's glow and particle clichés (§5.5).

Everything is DOM plus inline SVG, animated only on transform, opacity, clip-path, stroke-dashoffset, and font-variation on single-line elements. The sense of space comes from the three planes, parallax rates and hanging physics described under spatial depth. If Sapience later wants a launch film, the same sign system can be rendered in 3D for video. The website doesn't need it.

## Microinteractions

1. ARROW TILES (every CTA and arrowed link): on hover or focus-visible, the tile fills from outline to solid purple (clip-path wipe left to right, 220ms lift) and the arrow advances 6px in its own direction. On press it advances 10px and returns. Keyboard focus gets the same fill plus a 3px charcoal outline offset by 3px.
2. HEADER STRIP MAP: hovering or focusing a stop drops its label plate (180ms hang). Clicking scrolls there with Lenis and moves focus to that room's heading. The "You are here" marker moves with Flip (500ms settle) whenever the chapter changes. aria-current="location" moves with it.
3. DIRECTORY: a native <dialog>. A charcoal building-directory board drops 24px while its rows letter in (30ms stagger, 360ms total). Each row shows code, name, track chip and serif line, with the current room marked "You are here". Esc closes it and focus returns to the trigger. It also lists the "Why this design" and audit pages.
4. SIGN WALL (before alignment, fine pointers only): the hovered plate's arrow clicks toward the cursor's quadrant in 45° steps. After alignment, hover only underlines the label: the signs no longer compete.
5. QUESTION TICKET: hover or focus rolls down a legend of the route marks earned so far.
6. BADGES: hover or focus rolls in the tag "Illustrative role — not a real person".
7. FOOTNOTE TILES (small square numerals): clicking scrolls to the Sources row and flashes it with #DCD2E6 (400ms, then back to none). A return link goes back to the reference.
8. SECURITY ROWS: hover or focus grows a purple left bar (scaleY 0 → 1, 200ms) and redraws the row's pictogram.
9. COPY BUTTON (Labs): a real clipboard write. The label rolls "Copy" → "Copied" and back after 2s. If the write fails it says "Select and copy".
10. MOTION TOGGLE: a two-state sign plate, "Motion · On/Off", with the tooltip "Your scroll. Your control." (a nod to NoteBouncer's "Your meetings. Your control."). It calls gsap.matchMediaRefresh() and saves the choice in localStorage inside try/catch.
11. FORM: focus draws a 3px purple route under the field from the left (240ms). Errors appear as small plates with a "!" pictogram, linked by aria-describedby. On submit the honest "Not sent" plate appears.
12. PRESENTER MODE (?present, for the weekly Seattle reviews): keys 1–9 and 0 jump to rooms, M toggles motion, D opens the Directory. These keys are active only in presenter mode (WCAG 2.1.4).
13. SKIP PLATES: every pinned stage has a visible, focusable "Skip this route ↓" plate at bottom right.

## Mobile direction

A separate composition: the overhead convention signage of desktop becomes a pocket program, or handheld route card, on mobile.

THE SPINE
• The purple route is a permanent vertical spine at x = 24px (8px stroke), running the full length of the page like a subway line diagram in a pocket guide.
• Each room is a station on the spine: a 22px stop circle. Content sits on a 4-column grid to the right of the spine (content left edge 48px, right margin 16px).
• Horizontal travel becomes downward travel. On mobile, arrows on signs point ↓.

HEADER
• A 48px bar with the wordmark slot, a "Directory" button, and a "Book" button whose accessible name is "Book a conversation" (label-in-name compliant).
• A 22px persistent notice strip: "SPECULATIVE CONCEPT · NOT AFFILIATED WITH SAPIENCE AI", Archivo 650 12px caps.
• A 3px progress line of 10 ticks.

HERO (390×844)
• The purple sign runs from 86px to about 62svh. The sign line breaks as "The person / who / knows" in Archivo 760 wdth 92 at clamp(3.25rem, 15vw, 4.25rem). The arrow tile points ↓. The serif secondary line is 19px.
• Below: the H1 (24px/1.1), body at 17px and a full-width 56px CTA.
• The ticket first appears in room 03, not the hero.

ROOM BY ROOM
• 02: a 2×6 wall of 12 plates, pinned for 120svh. It keeps the confusion → alignment wave, but the row lines merge left into the spine instead of into a trunk exiting right. The 43% stat sits above the wall.
• 03: stacked. The ticket rides down the spine to the desk panel (scrubbed, not pinned), and the agents list follows.
• 04: the corridor becomes a stairwell. Four room cards are stacked. As each enters, a purple sign strip is installed across its top (scaleX 0 → 1 from the spine side, 500ms) and a dashed spur draws from the spine. The cards themselves never change.
• 05: the staff badge above, the meeting point between, the past chair below. The ticket's handoff travels downward.
• 06: the spine itself becomes the strip map, with six stops labelled to the right. No MorphSVG: the visitor has been scrolling the record all along, and that is the point.
• 07: floors run full width, and the indicator is a sticky mini plate.
• 08: the tenant diagram sits above the stacked board rows (28px pictograms).
• 09: program cards with status chips.
• 10: a full-bleed CTA panel where the spine ends in the terminus bar, then a single-column form with 56px fields.

TECHNICAL
• No Lenis on touch. ScrollTrigger.config({ ignoreMobileResize: true }). svh units throughout.
• Room 02 is the only pinned section.
• Sizes: H2 at clamp(2.125rem, 9vw, 2.75rem), secondary 18px, body 17/1.5, labels at least 12px, tap targets at least 48px.

## Reduced motion

With prefers-reduced-motion, or the header toggle set to Off, the site becomes a composed "signage manual": every room is a finished, static plate.
• No Lenis, pins, scrubs, parallax, hang physics, odometers, rollers or SplitText. gsap.matchMedia's reduceMotion branch reverts everything. No JS start states are applied.
• Routes are drawn in full from static SVG paths baked at build time for desktop and mobile widths. Stops are all visible. Every route mark on each chapter's ticket is filled up to that chapter's point.
• Room 02 becomes a triptych in signage-manual style, three frames at one-third width each captioned in Archivo caps: "SCATTERED" (the contradicting wall), "ALIGNED" (every arrow →), "ROUTED" (one line with Organize, Connect, Activate). The mechanism still reads without motion.
• Room 04 renders the corridor as a static elevation drawing that wraps into two rows, with the signs already hung. On mobile, the room cards already carry their sign strips.
• Room 06 shows the finished strip map with all six stops and labels. Room 07 shows every floor, with the brass fill and the departed badge drawn as a dashed outline at the building's edge.
• Numerals render at their final values. Status plates show their final text.
• Hover keeps colour and underline changes but drops arrow nudges. Focus styles are unchanged.
• The static result stays fully branded, with no emptiness and no "fallback" look. It is also the print stylesheet, giving board members a printable one-page-per-room summary.

## Technical approach

STACK
• Vite 8 multi-page build with TypeScript. Static HTML5 with every word in the markup, deployed to Firebase Hosting (Google infrastructure).
• GSAP 3.15: core, ScrollTrigger, SplitText (lines only), DrawSVGPlugin, MorphSVGPlugin (room 06 only), Flip, CustomEase.
• Lenis 1.3 on desktop fine pointers only (syncTouch false), wired with the documented ScrollTrigger sync.
• No WebGL, no canvas, no raster images. The og:image is a PNG of the hero rendered by the repo's existing Playwright capture script.

STRUCTURE
• One gsap.matchMedia() holds every set piece, with the conditions { isDesktop, isMobile, reduceMotion } plus a manual html[data-motion="off"] check that calls matchMediaRefresh().
• Modules:
  – route.ts: buildPath(anchors, chamfer = 3 × stroke) turns DOM anchors (data-route="02:3") into 0/45/90° chamfered path strings, rebuilt on ScrollTrigger refreshInit.
  – Set pieces: signs.ts (hang, roll, width fitting), wall.ts, desk.ts, corridor.ts, meeting.ts, triplog.ts, levels.ts, services.ts, program.ts.
  – directory.ts (strip map, dialog, aria-current, GA4 chapter_progress), toggle.ts.
• The arrow and the 26 pictograms live in one inline SVG sprite of <symbol>s, about 9KB.

PER SET PIECE
• Hero: CSS sign; SVG cables and strip map; DrawSVG intro; a scrubbed transform on the sign wrapper; Flip for the marker dock.
• Room 02: 24 <li> plates with <use href="#arrow">; one pinned timeline with snap(45) rotation modifiers and seeded rates; an SVG overlay for the row lines and trunk, computed from plate rects.
• Room 03: pinned timeline. The ticket's x is tied to the line's progress, and route marks are toggled by callbacks so they reverse.
• Room 04: the section is pinned and the track's x is tweened (ease none, invalidateOnRefresh). Child tweens use containerAnimation.
• Room 05: Flip handoff, hang tweens, DrawSVG.
• Room 06: MorphSVG between two authored paths with equal segment counts, plus a Flip of the route marks into the stops.
• Room 07: DrawSVG slabs, odometer reels.
• Rooms 08–10: toggle-once timelines, roller spans, and a --wdth custom property tweened on single lines.

STATIC FALLBACK
• A build step uses playwright-core, already a devDependency, to measure anchors at 1440 and 390 widths and bake static route paths into the HTML. These serve no-JS, reduced motion and print.

PERFORMANCE BUDGET
• JS ≤ 100KB gz: GSAP core about 27, ScrollTrigger 18, SplitText 7, DrawSVG 3, MorphSVG 11, Flip 8, CustomEase 2, Lenis 5, app code about 18.
• CSS ≤ 22KB gz.
• Fonts ≤ 235KB: Archivo latin wdth 90KB (preloaded), Newsreader latin wght 58KB plus italic 65KB (italic preloaded), Atkinson Hyperlegible Mono 18KB (Labs only). Latin subsets only.
• Inline SVG ≤ 40KB. DOM ≤ 1,800 nodes.
• Targets: LCP ≤ 1.8s on slow 4G (the LCP is the hero sign text), CLS ≤ 0.02, INP ≤ 120ms, and 60fps with transform-only animation. Fewer than 6 active ScrollTriggers per viewport.

INTEGRATION SEAMS
• One H1 per page and a sequential outline. The security badges are a <ul>.
• Organization and WebSite JSON-LD with sameAs links.
• GA4 events: chapter_progress, cta_click, directory_open, motion_toggle, route_skip.
• The HubSpot v3 form seam is documented and marked engineering-owned. The CSP allowlist is noted.

BUILD COMPLEXITY
Medium-high. About 11 developer-days for one senior creative developer, plus about 3 design-days for the pictogram set and sign specifications.
• Hardest parts: the computed route builder under resize, the horizontal corridor, and the room 06 morph.
• Fastest win: the hero plus room 02 as a vertical slice for the first Seattle review.

## What the hiring team will recognize

• THEIR OWN WORDS, FOUND AND ORDERED. Every room pairs a verbatim Sapience line with a concept line, and each is tagged in the source. Sage's exact description sits on the desk. The four values are placed across the journey. "The Organization That Never Forgets" gets its own room, and "Let's achieve more, together." closes the site.
• JUDGMENT ABOUT WHAT NOT TO SAY. Affinity and Corporate appear as gates with "Description to be published by Sapience AI". The flagged claims "You own the model" and "No third-party vendor processes your member records" are deliberately absent. The impact figure appears with "Source to be confirmed". There are no certification badges and no invented customers. Stories are "To be announced" slots on a session board.
• THE BRAND, EVOLVED RATHER THAN REPLACED. Cream stays and purple stays as ink, never glow. The serif is promoted to the voice of people. The wordmark is a swappable slot, with the Brand Graphic Designer's parallel icon refresh in mind.
• A SYSTEM, NOT A PAGE. Sign, plate, tile, route, stop, badge and board are components with tokens and rules: route grammar, track codes, and the bilingual system-and-human hierarchy. That speaks directly to the Head of Brand & Communications' remit over the identity system and "naming and taxonomy architecture": wayfinding is taxonomy made visible, and it can survive product renames.
• THE PRODUCT STORY THE CURRENT SITE LACKS. A non-technical executive can see how it works: scattered → organized, one desk, signs above unchanged systems, a person found, and every step on the record, without a single dashboard.
• THEIR AUDIENCE'S OWN WORLD. Annual meetings, badges with ribbons, committee chairs, certification, the program at a glance. Association executives will recognise these at once, and no competitor uses them.
• ENGINEERING-READY CRAFT. Static HTML on Firebase and Google infrastructure. Text is the LCP. There is one H1, aria-current="location" on the route, JSON-LD for disambiguation, GA4 chapter events, and a HubSpot seam labelled as engineering-owned. Reduced motion is a first-class static design, and the performance budget is explicit.
• REVIEWABLE IN THE SEATTLE ROOM. Numbered rooms, a Directory, presenter keys, skip plates, and a persistent speculative-concept notice. It presents well on a big screen and it is honest about what it is.

## Narrative sections

### 01-entrance — impact

- **Purpose:** Name the company, category and audience in the first viewport. Plant the idea that the destination is a person. Install the signage system and start the route. Offer the primary CTA.
- **Headline:** Sign line (concept, adapted from Labs' “Find the person who knows.”): “The person who knows →”. Secondary line (verbatim, /company): “The most powerful intelligence in a professional community already lives within its people.” H1 (verbatim category): “Sapience AI is the collective intelligence platform for professional communities.” Audience label: “For professional associations and membership organizations”. Body (verbatim, LinkedIn): “We provide every person, at every level, meaningful access to the insights, guidance and expertise that already live inside their network.” CTAs: “Book a conversation” / “Follow the route”.
- **Composition:** The overhead purple sign is hung on two cables across columns 1–12. It carries the entrance pictogram, code 01, a two-line sign in Archivo 740 at up to 136px, a cream arrow tile and a Newsreader italic secondary line. Below it on cream: the audience label, H1, body and CTAs in columns 1–7, and the illustrative question ticket in columns 9–12. A full-width strip map of all ten rooms sits at the bottom, with the “You are here” marker on 01. The header has two tiers: the wordmark slot with the persistent notice plate and controls, plus a rail that receives the strip map.
- **Motion:** Load, 1.35s, decorative only: the cables draw, the arrow clicks ↑→→, the strip map draws and its stops pop, the marker drops, the ticket's marks tick in. First scroll (0–100vh, scrubbed): the strip map docks into the header rail, the sign rises 1.35× faster and scales to 1.05 (walking under it), the arrow clicks to ↓ and extrudes the route down into room 02. Text is never animated.

### 02-lost-and-found — acceleration → climax

- **Purpose:** Show the problem Sapience names, with scattered knowledge and contradicting directions, then show the layer that organizes, connects and activates it without replacing anything. This is the signature set piece.
- **Headline:** H2 (verbatim, /customers): “Insights sit scattered across inboxes, drives, and disconnected tools”. Secondary line: “…leaving teams to make decisions without the full picture.” Stat (industry context, cited): “43%: Only 43% can easily access and understand the data they need to monitor and improve performance.” [iMIS/ASI 2026]. Trunk stops (verbatim verbs): “Organize · Connect · Activate”.
- **Composition:** Room sign 02 (charcoal code square, track chip S Systems) and the H2 in columns 1–8. The stat plate is in columns 9–12. The sign wall is 6×4 = 24 plates across columns 1–12 from 38 to 90vh. Each plate has a charcoal arrow tile at top left and a label at bottom left, with an illustrative caption. During the resolution, the stage pans 40vw left to reveal the merge space and the trunk at floor height 64vh.
- **Motion:** 30vh lead-in, then pinned for 160vh (full phases under signature_sequence). The plates hang in once. Arrows click through directions, quantized to 45° and seeded. The 43% odometer rolls. A diagonal alignment wave turns every arrow to → and every tile purple. Row lines draw and merge into a trunk while the stage pans. The Organize, Connect and Activate stops light. The trunk exits right. All of it is fully reversible by scrub.

### 03-information-desk — discovery

- **Purpose:** Introduce Sage in its exact published role: the desk that routes every question to the right agent, so staff never need to know which tool to use. Present Affinity and Corporate honestly, as names only.
- **Headline:** H2 (concept): “Nobody should need a map of your systems.” Secondary (concept): “Ask once. The desk knows the building.” Sage plate (verbatim): “01. Sage — AI Assistant. Your command center. Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use.” Agents directory: “02. Affinity — AI Agent” and “03. Corporate — AI Agent”, each followed by “Description to be published by Sapience AI.” Desk roller sign: “Ask here” → “Routed”.
- **Composition:** Room sign 03 (information pictogram, track R) and the H2 in columns 1–7. The floor line runs full width at 64vh. The desk is centred in columns 6–8: a 24px charcoal counter slab under a purple Sage sign panel that carries the verbatim description in #D9CCE6. A roller strip sits on the counter front. An “Agents on this level” directory plate is in columns 9–12 above the floor line; rows 02 and 03 have dashed borders, the future-station convention. The illustrative question ticket enters from the left on the line.
- **Motion:** Pinned for 120vh, scrubbed. 0–35%: the floor line draws to the desk while the ticket rides its head, and route mark 01 “Asked” fills with a click. 35–55%: the roller flips “Ask here” to “Routed”, the desk's arrow tile clicks ↓ → →, and mark 02 “Routed” fills. 55–100%: the line and ticket continue to the right edge. The Sage row in the directory gains a purple left bar. The secondary line answers at 60%.

### 04-concourse — acceleration

- **Purpose:** Make “No rip and replace” and “We sit above your existing systems” literal. The rooms stay unchanged while Sapience installs signs above them. Reveal why documents aren't enough: the reasoning lives with people.
- **Headline:** H2 (concept): “Keep every room. We hang the signs.” Secondary (verbatim, LinkedIn): “We sit above your existing systems to organize, connect, and activate relevant knowledge.” Record plate (illustrative): “Board minutes: what changed.” Sign: “The decision is documented. The reasoning isn't.” with footnote [2], ASAE, Jul 2026: “a decision may be documented, but the reasoning behind the decision is not.” End plate (verbatim pillar): “No Migration Required. We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace. Secure, private, and live in days — not months.” Exit sign: “Meeting point ↗”.
- **Composition:** A horizontal track 300vw wide, drawn as a flat architectural elevation. The H2 panel occupies 0–58vw. A ceiling rail (purple, 12px) runs at 22vh. The architectural floor (charcoal, 2px) is at 78vh, with the purple route just above it. Four doorways stand at 70, 115, 160 and 205vw (18vw × 40vh, charcoal 1.5px outlines), each with a room plate: AMS “Member records”, CRM “Relationships”, LMS “Learning & credits”, Content systems “Publications, minutes, recordings” (generic descriptors, concept copy). The record plate and gap sign sit at 225–250vw. The exit turn is at 280vw. The ticket is fixed at 38vw on the floor, and the world moves past it.
- **Motion:** Pinned for 200vh. The track's x runs 0 → −200vw with ease none. The rail draws about 20vw ahead of the ticket. As each door enters (containerAnimation, start “left 75%”), a purple sign drops from the rail on its cable (hang, 800ms) reading “Member records ↓”, “Relationships ↓” and so on, and a dashed spur draws from the route to the threshold. The rooms themselves never change. Mark 03 “Consulted” fills at the first spur. At Content systems the record plate slides out of the door and the gap sign rolls down; mark 04 “Found: what changed, not why” fills. At 80–100% the route chamfers 45° and then 90° up to the “Meeting point ↗” sign and exits at top right. Reversible scrub.

### 05-meeting-point — calm

- **Purpose:** The emotional arrival. The route reaches a person, not a document or a chatbot. Keep it scrupulously honest about what is illustrative and what is early access.
- **Headline:** H2 (adapted from Labs' “you needed a person, not a prompt”): “A person, not a prompt.” Secondary (verbatim, LinkedIn): “Not to automate humanity. To elevate it.” Body (verbatim, /labs): “Every time you've typed the same question into three different AI chatbots and still weren't sure, you needed a person, not a prompt.” Pull quote (verbatim, Humans in Partnership value): “The most powerful intelligence in a professional community already lives within its people. Technology will never replace that. Our work is to elevate it, so every voice carries further and every contribution matters more.” Stat (cited): “46% credit member-to-member outreach for winning back members” [iMIS/ASI 2026]. Status plate: “Illustrative route. As published, Sage routes every question to the right agent. Finding the person who knows is what Sapience AI Labs is building in Sapience AI for Chrome, which is in early access with a waitlist for peer-matching.”
- **Composition:** The H2 spans columns 1–8 in Archivo 700 up to 7.5rem. Two conference badges hang on 1px lanyards in the lower half. Each is 280×380, paper, with a punched slot, a 64px band, and the role set in Newsreader 500 at 40px, with no names and no faces. The left badge (columns 2–4) has a purple band, “MEMBER SERVICES”, role “Staff”, subline “asking for a first-year member”, and a ribbon “FIRST-YEAR MEMBER'S QUESTION”. The right badge (columns 9–11) has a brass band, “CERTIFICATION COMMITTEE”, role “Past chair”, and ribbons “PAST CHAIR” and “CERTIFIED MEMBER”. Both carry an “ILLUSTRATIVE ROLE” corner tag. Between them in columns 6–7 is a 160px meeting-point pictogram tile. The 46% stat is in columns 1–3 at the bottom and the status plate in columns 9–12 at the bottom.
- **Motion:** Pinned for 100vh. On pin, the badges hang in (time-based). 0–30%: the route draws from the left under the staff badge and climbs to the meeting point (scrubbed). 30–55%: a short line draws from the past chair's badge. When both arrive, the tile's four arrows click 8px inward. The ticket moves with Flip from the staff badge to the tile, and mark 05 “Recommended: talk to the past chair” fills. A terminus bar draws. 55–100%: the pull quote reveals line by line, the 46% odometer rolls and the status plate rolls in. Reversible.

### 06-trip-log — discovery

- **Purpose:** Show governance as the route itself. Every step the question took is logged and reviewable, and permissions are signage. The main information reveal.
- **Headline:** H2 (concept): “Every turn is on the record.” Secondary (verbatim, Platform): “Every AI recommendation comes with a full audit trail. You set the permissions.” Body (verbatim): “Governance-ready for your board and your regulators.” Strip map stops (illustrative): “01 Asked, at the desk (Sage) · 02 Routed, to the right agent · 03 Consulted: AMS, LMS, content systems · 04 Found: what changed, not why · 05 Recommended: talk to the past chair · 06 Reviewed, by the people you permit”. Door signs (illustrative): “Members”, “Staff only”, “Board”.
- **Composition:** Room sign 06 (trip-log pictogram, green G chip) and the H2 in columns 1–7. A mini silhouette of the whole journey so far sits top right. At 52vh a full-width strip map, like the line diagram above train doors, runs across columns 1–12 with 6 stops and alternating labels: Archivo 650 16px above, Newsreader italic 16px detail below. The completed ticket is docked at the left. Three access-door signs sit in columns 1–6 at the bottom. A green plate in columns 8–12 reads “Logged · reviewable”, with links to the Data Privacy & Governance Policy.
- **Motion:** Pinned for 100vh. 0–40%: the winding silhouette morphs (MorphSVG, paths authored with equal segment counts) and scales into the straight strip-map line, ending in a terminus bar. 25–60%: the ticket's five filled marks move with Flip into stops 01–05 (80ms stagger), each label revealing through a line mask. 60–80%: stop 06 draws, a green tick tile clicks in, and mark 06 fills, completing the ticket. 70–100%: the door signs roll in. Reversible.

### 07-all-levels — pause

- **Purpose:** Turn institutional memory and compounding value into a building that gains floors and keeps them when people leave. This is Sapience's own framing: The Organization That Never Forgets.
- **Headline:** Kicker: “From Sapience AI's proposed SXSW 2027 session”. H2 (verbatim title): “The organization that never forgets.” Secondary (verbatim): “When board members or committee chairs move on, so does the knowledge they carried.” Body (verbatim, Collective Intelligence value): “Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it. We unlock it, making it searchable, actionable, and built to compound for the community it came from.” Body (verbatim, Private Intelligence Core): “Your data trains your model only. … Your organization builds its own foundational AI — and it gets smarter every year.” Concept line: “People move on. What they built stays on the map.” Footnote [3], ASAE, Sep 2026, on officer turnover: “they often take years of institutional knowledge with them.”
- **Composition:** Text in columns 1–6. A building section in columns 7–12: seven floor slabs (charcoal 2px, 8.5vh apart). Each has an illustrative floor plate in Newsreader italic: “Founding bylaws”, “First certification exam”, “Chapter charters”, “Standards revisions”, “Annual meeting archives”, “Committee decisions”, “This year's questions”. The elevator core is the purple 12px route rising at the building's right edge. A charcoal floor-indicator square (72px, cream Archivo 800 wdth 75 numerals) sits on the roof. Track chip M (brass).
- **Motion:** Pinned for 120vh. 0–70%: floors are added bottom-up. Each slab draws left to right (300ms), the core line extends to meet it (scrubbed), and the indicator clicks up one level on the odometer. 45–60%: a small past-chair badge on “Committee decisions” slides out of the building to the right (700ms settle). Its floor stays, and its purple spur stays connected to the core as the concept line answers. 70–100%: each floor fills bottom-up with flat light brass #EDE3D2, a warm accrual with no glow. Reversible.

### 08-services — calm

- **Purpose:** Put security and governance on the main path, shown as architecture and a directory of the 8 published controls. No certification badges.
- **Headline:** H2 (verbatim): “Enterprise-grade security and controls”. Secondary (verbatim, Built on Trust value): “Safety and privacy are not features. They are how we build.” Body (verbatim): “Sapience AI runs on Google Cloud with the controls enterprise teams expect — private per-tenant data models, envelope encryption with per-tenant keys, SAML SSO, audit logging, and OWASP WAF protection.” Board rows (verbatim labels): PER-TENANT ENCRYPTION KEYS · SAML SSO · CLOUD AUDIT LOGS · OWASP WAF · PER-TENANT ISOLATION · MANAGED DATA LIFECYCLE · TLS 1.2+ IN TRANSIT · POINT-IN-TIME RESTORE, each with a one-line plain-language gloss marked as concept copy for Sapience review. Diagram label (concept): “Your floor. Your keys.”
- **Composition:** Not pinned, about 130vh. Room sign 08 (key pictogram, G chip), the H2, the body and the tenant diagram sit in columns 1–5. In the diagram, the purple route closes into a rectangle around “Your organization” with a key pictogram at its door, beside two dashed ghost rectangles labelled “Another organization”, separated by 24px gaps. In columns 6–12, a charcoal directory board headed “SERVICES ON THIS LEVEL · as published by Sapience AI” lists 8 rows (a real <ul>, not H2s). Each row has a cream line pictogram (32px), the label in Archivo 650 wdth 88 18px caps and a gloss in 15px #B9B3C2. The footer row links to the Data Privacy & Governance Policy and the Privacy Policy.
- **Motion:** Board enters at top 70%: rows letter in from masks (500ms settle, 70ms stagger, played once and then static) and pictograms draw (DrawSVG, 600ms). The point-in-time-restore clock hand clicks back 45° once. The tenant perimeter is scrubbed from 20% to 60% of the section and is reversible: the route closes into its loop.

### 09-program — discovery

- **Purpose:** Show shipped Labs work with its true status, and honest proof slots that look finished with zero names. Room for the flagged impact figure with its caveat.
- **Headline:** H2 (concept): “Program at a glance.” Secondary (verbatim, Purpose-Driven Innovation): “Technology should be shaped to serve.” Labs intro (verbatim): “A look inside how our team thinks & builds.” Rows: L1 NoteBouncer Zoom Extension, “Your meetings. Your control.”, status “Coming to the Zoom Marketplace, to be confirmed”. L2 OpenClaw Middleware Suite, “Safety guardrails for AI agents.” and “Because 'Autonomous' shouldn't mean 'Uncontrolled.'”, status “Open source · v1.0.0”, with the code line npm i @sapience-ai-corporation/openclaw-middleware-suite. L3 Sapience AI for Chrome, “Find the person who knows.”, status “Early access · waitlist”. S1 “A professional association's story”, “To be announced”. S2 “A membership organization's story”, “To be announced”. S3 “$150K–$300K conservative annual impact per mid-size association”, “Source to be confirmed by Sapience AI”.
- **Composition:** Not pinned, about 150vh. A convention-style session board built as a semantic <table> across columns 1–12. Columns are Code (Archivo 800 wdth 75), Session, Status (a roller plate), and Track (chip). There are two track headers: “LABS · SAPIENCE AI LABS” and “COMMUNITY STORIES”. A 4px purple spine runs down the left edge, with solid stops for the Labs rows and dashed hollow stops for the stories not yet announced. The code line is set in Atkinson Hyperlegible Mono with a real Copy button.
- **Motion:** As each row enters, its status plate rolls in (420ms, staggered by row). The spine draws, scrubbed. The hollow stops draw as dashed rings (scale 0.6 → 1, click ease). Copy rolls “Copy” → “Copied” after a real clipboard write and reverts after 2s. Played once, static afterwards.

### 10-meeting-room — resolution

- **Purpose:** Resolve the journey. The final destination is a person at Sapience, not a prompt. A clear, repeated CTA with honest HubSpot seams, and a footer holding sources, information architecture and the notice.
- **Headline:** H2 (verbatim, /contact): “Let's explore what your community's collective intelligence can look like when it's truly connected.” Sign line (verbatim): “Book a conversation with our team →”. Secondary (concept): “The route ends where it should: with people.” Contact line: “Or write to contact@sapienceai.co”. Footer sign-off (verbatim, founder post): “Let's achieve more, together.” Also verbatim: “Humans in Partnership”.
- **Composition:** The H2 in columns 1–8. A full-bleed purple sign panel echoes the hero but spans edge to edge, marking arrival: meeting-room pictogram tile, code 10, the single-line sign fitted by its width axis, a cream arrow tile, and the serif secondary line. The page spine arrives into the arrow tile and ends in the final terminus bar. Below it: a semantic form in columns 1–7 (Name, Work email, Organization, Role, “What should we know?”, consent). Every label is a real <label>; fields are 56px with 1.5px charcoal borders. It carries WebMCP toolname and tooldescription attributes and HubSpot hooks (hutk, pageUri, consent) marked data-owner=“engineering”. Columns 9–12 hold the email and the notice. Footer on cream: the sign-off in Newsreader italic at up to 6rem, a two-column building directory of the real IA (Platform, Developers, Company, Customers, Labs, Contact, Careers, Terms of Service, Privacy Policy, Data Privacy & Governance Policy), a numbered Sources list, the colophon, a “Why this design” rationale link, the notice and the motion toggle.
- **Motion:** As the panel enters, the arrow clicks ↓ → →, the terminus bar draws (200ms), and the sign line settles from wdth 116 to 100 and wght 780 to 700 (900ms settle; single line, fixed box, so no CLS). The header strip map fills to 10 and the “You are here” marker arrives. The sign-off reveals line by line. The form never animates beyond focus states. Submitting without JS goes to a static “/concept-form-notice” page, and with JS it shows an inline plate: “Not sent. This is a speculative concept. In production this form posts to HubSpot (engineering-owned).” No success is ever claimed.

## Risks

- It could slide into literal clip-art if the pictograms are weak. Mitigation: one designer draws the whole 26-glyph set on a strict 24-unit, 0/45/90° grid before any build, with a 5-second legibility test. Pictograms always sit next to text and never replace it.
- Overclaiming Sage: the story reaches a person, but Sage's published role is routing questions to the right agent. Mitigation: person-routing is always labelled Illustrative, the room 05 status plate names Sapience AI for Chrome as early access with a waitlist, and steps 03–06 of the trip log are illustrative. All of it needs a line-by-line copy review with Sapience before any external use.
- Too many track colours could dilute the purple-and-cream identity. Mitigation: the green and brass appear only as 20px chips, badge bands and ribbons, never as fields or lines. The route is always purple. All track colours are tokens, swappable if the icon refresh changes the palette.
- The question ticket might be read as a disguised prompt box. Mitigation: it is designed as a paper tag, with a punched hole, route-mark squares, an ILLUSTRATIVE band, and no caret, input or send button.
- Scroll fatigue and scroll-jacking: about 1,900vh on desktop, with six pinned rooms totalling about 820vh. Mitigation: pins stay at or below 200vh each, every pin has a visible skip plate, the header strip map allows jumping anywhere, mobile pins only room 02, and the motion toggle is always available.
- The horizontal corridor fighting trackpads and resizes. Mitigation: ease-none tracks, invalidateOnRefresh, containerAnimation children, debounced route rebuilds, and a QA matrix covering Safari's 60fps cap with Lenis, iPad and Android address-bar resizing.
- The room 06 MorphSVG can look mushy between dissimilar shapes. Mitigation: author both paths with identical segment counts. The fallback is a Flip that straightens individual segments.
- Items on the sign wall (board minutes, committee notes…) could be read as integration claims. Mitigation: a visible caption states that only AMS, CRM, LMS and content systems are named by Sapience AI, and the rest are illustrative places knowledge hides.
- Width-axis fitting and variable fonts on older Safari. Mitigation: fitting is limited to single-line nowrap plates with fixed boxes, with a static font-variation fallback. Check that Archivo's wdth axis is present in the fontsource wdth.css import.
- “Lost & Found” may read as flippant to executives. The alternative room name “Everywhere at once” is ready. The metaphor otherwise stays sober: pendulum under 1.2°, no characters, no emoji.
