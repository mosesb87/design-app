# Direction B — The Annotated Record
> Full specification as developed by the concept team. Unedited working document; the selected direction and its amendments are in [../02-concepts.md](../02-concepts.md).
**The Annotated Record**
_Sapience AI's site typeset as a volume of proceedings. The community's record is printed in charcoal and holds still. Sapience's purple ink moves: it carries what members know out of the margins and into the main text, and every answer arrives with its sources. The last source is a person._

## Concept

Professional associations are publishers. They issue proceedings, journals, standards and minutes, and that is their official record. What their members actually know lives in the margins: why a rule was chosen, the answer given from the floor, the forum thread where a chapter leader worked out an edge case, the past chair who has handled this before. It is 'scattered across inboxes, drives, and disconnected tools', and it leaves at every handover. The Annotated Record sets Sapience AI's site as one volume of proceedings, in book order: title page, epigraph, contents, six chapters, an appendix of Labs working papers, an afterword, an index and a colophon. The whole volume follows one rule: print is set once, ink is live. The charcoal type is the community's record. It never performs. Sapience's deep purple is the editor's ink. It draws the proofreader's caret that inserts marginal knowledge into the main text, the leader line that ties every claim to its source, and the footnote that becomes an audit trail.

One worked example, labeled Illustrative, runs through the book the way a textbook follows a single problem: how an association awarded continuing-education credit when its annual meeting went hybrid.
- Chapter I scatters that knowledge across the margins.
- Chapter II organizes it on a vellum layer that sits above existing systems, and none of those systems moves.
- Chapter III typesets the answer from five cited sources. The fifth source is a person, not a prompt.
- Chapter IV shows Sage routing the question.
- Chapter V shows the answer outliving the chair who wrote it.
- Chapter VI shows its trail.

Citation is the argument. In scholarship, citing is how knowledge stays with the people who created it, which is Sapience's own value: 'That knowledge belongs to the people who created it.' The volume closes with a final insertion. The word 'together' rides in from the margin and turns from purple ink into charcoal record, so the insight becomes the community's own. Its leader line keeps going and becomes the underline of 'Book a conversation'.

## Why it fits

1) It occupies the whitespace the research names. §5.7.4 calls for 'An editorial, scholarly register… footnotes, marginalia, citation superscripts, purple as ink. It mirrors the journals and standards associations themselves publish.' §5.2 found no association-vertical competitor using a serif-led editorial register. Sapience's own identity already leans this way (§4.3: cream ~#F2EFEA, deep purple ~#5A2D82, serif headlines). The direction keeps that identity and gives each element a job.

2) Collective intelligence becomes visible. The signature answer is co-authored by the community: committee minutes, an annual-meeting Q&A, a member forum, staff guidance and a past chair. Citation keeps each contributor attached to what they gave. This is Sapience's value verbatim: 'Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it. We unlock it, making it searchable, actionable, and built to compound for the community it came from.' (Company › Collective Intelligence).

3) Every set piece is a mechanism Sapience itself states (§10.3):
- Ch I: 'Insights sit scattered across inboxes, drives, and disconnected tools, leaving teams to make decisions without the full picture.' (Customers)
- Ch II: 'We sit above your existing systems to organize, connect, and activate relevant knowledge' (LinkedIn) and 'We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace.' (Platform). In the scene, the vellum layer moves and the systems beneath never do.
- Ch III: '…so the right insight reaches the right person at the right moment' (mission, LinkedIn) and 'you needed a person, not a prompt' (Labs).
- Ch IV: Sage 'Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use.' (Platform)
- Ch V: 'The Organization That Never Forgets' (proposed SXSW27 session); 'When board members or committee chairs move on, so does the knowledge they carried.'; 'it gets smarter every year' (Private Intelligence Core); ASAE's officer-handover finding.
- Ch VI: 'Every AI recommendation comes with a full audit trail.' (Governance You Control), the verbatim security body and all 8 published controls.

4) Trust comes from provenance, not logos (§10.5, §5.7.5). Sapience cannot honestly win the logo-wall game, so the form of the page becomes the proof:
- 57% is footnoted 'source to be confirmed by Sapience AI' and reconciled against iMIS/ASI 2026 ('Only 43%…').
- ASAE (Associations Now, Jul and Sep 2026) is credited by name and year.
- Affinity and Corporate appear as '[Description forthcoming]'. There are no invented customers.

5) People come before prompts (§10.2). The hero's only footnote leads to 'The most powerful intelligence in a professional community already lives within its people.' (Company › Humans in Partnership). The answer's last citation is a person.

6) It is built for the room and for the stack:
- Contents, running heads and an index make the concept presentable, chapter by chapter, at the weekly Seattle reviews.
- A print stylesheet serves board members who need 'short, calm, printable answers' (§6).
- Static HTML5 on Firebase Hosting (Google infrastructure) with a text LCP, verified reduced motion and honest HubSpot seams answers §3.4 items 5–7 and §8.

## Visual language

PALETTE (tokens)
- --paper #F2EFEA: Sapience cream, the page.
- --paper-deep #E9E4DC: the desk, the system sheets, offprint backing.
- --vellum rgba(248,246,242,.86): Sapience's layer. Flat, with NO backdrop-filter: this is paper, not glass.
- --print #1C1C1E: charcoal record text, 14.8:1 on paper.
- --print-2 #4A4643: marginalia and decks, 8.1:1.
- --print-3 #6E6862: captions, meta, input rules, 4.8:1.
- --rule #CDC7BE: decorative hairlines only.
- --ink #5A2D82: Sapience purple used as ink. Markers, leaders, carets, links and the one filled button. 8.6:1 on paper.
- --ink-deep #43205F: hover and pressed states.
- --ink-wash #E4DCE6: the highlighter, used for cited phrases and ::selection. Purple on the wash is 7.4:1.
- --binding #1C1C1E and --binding-2 #26252A: the charcoal case in Ch VI.
- --ink-reversed #BCA6D2: ink on the binding, 7.7:1. Cream text on the binding is 14.8:1.

Purple never fills a background (the CTA button is the only exception). It never tints a shadow, never sits in a gradient and never glows.

TYPE
- Newsreader Variable (@fontsource-variable/newsreader, opsz.css + opsz-italic.css; opsz 6–72, wght 200–800) for display, text and italic marginalia. It is a contemporary editorial serif with true optical sizes, a deliberate step from Sapience's Baskerville-like headlines into a journal register.
- Public Sans Variable (@fontsource-variable/public-sans) for the apparatus: running heads, caps labels, buttons, form labels and superscript figures. Its civic, standards-body lineage (USWDS) suits associations.
- IBM Plex Mono 400/500 (@fontsource/ibm-plex-mono) for the record-keeping register: source labels, trails, specs and Labs.
- Body text is serif, because it is the record. This deliberately evolves Sapience's sans body, and a single token switches it back.
- Verified constraint: I inspected the Fontsource woff2 files. They expose only liga/pnum/tnum, so there are no true small caps, oldstyle figures or sups, and U+2038 (caret) is absent. The consequences:
  - Labels are real Public Sans caps with tracking.
  - Figures are lining.
  - Superscripts are CSS-raised Public Sans figures.
  - All proofreader's marks are drawn as SVG.

TYPE SCALE
| Role | Size | Settings |
|---|---|---|
| Hero | clamp(2.75rem, 1.35rem + 5.6vw, 6.5rem), ≈102px at 1440 | opsz 72, wght 320, lh .97, tracking −.02em |
| Epigraph | clamp(2.25rem, 1rem + 4.2vw, 5rem) | italic, opsz 72, wght 300, lh 1.03 |
| Display (chapter lines) | clamp(2.125rem, 1rem + 3.6vw, 4.5rem) | opsz 60, wght 340, lh 1.02 |
| Stat | clamp(4.5rem, 2rem + 8vw, 10rem) | wght 280, tnum |
| H3 | clamp(1.5rem, 1.15rem + 1.1vw, 2.125rem) | wght 420 |
| Deck | clamp(1.1875rem, 1.05rem + .55vw, 1.5rem) | italic, lh 1.4 |
| Body | clamp(1.125rem, 1.04rem + .3vw, 1.3125rem) | lh 1.55, max 64ch, font-optical-sizing auto |
| Note | clamp(.9375rem, .9rem + .15vw, 1.0625rem) | italic, lh 1.45, --print-2 |
| Labels | .75rem | Public Sans 600 caps, +.1em |
| UI | .9375rem | Public Sans 560 |
| Mono | .8125rem | lh 1.55 |
| Markers | .62em | Public Sans 650, raised .58em, --ink |

GRID: the Tufte page
- ≥1100px: 12 columns, max 1440px, outer margin clamp(24px, 4.4vw, 64px), 24px gutters. Named areas:
  - FOLIO (col 1): chapter numerals, folios, hanging quotation marks.
  - TEXT (cols 2–8): never more than 64ch.
  - CHANNEL (col 9): where leaders travel.
  - MARGIN (cols 10–12): sidenotes and sources.
  - Display type may span cols 2–11.
- 900–1099px: 10 columns (text 2–7, channel 8, margin 9–10).
- <900px: the Pocket Edition (see mobile).
- Rhythm unit: half the body line-height. Running head 56px, running foot 32px.

LAYOUT PRINCIPLES
- Always left-aligned. Journals do not centre.
- The margin is a real column with content, not ornament.
- Every figure carries 'Fig. n', a caption and a provenance tag: Illustrative / Diagram, not data / Sapience AI copy.
- Hairlines only: 1px, square caps, square orthogonal elbows. Border radius 0.
- No cards, icons or emoji. Only typographic glyphs and drawn marks.
- At most one filled element per screen: the CTA.

IMAGERY is built from:
- type, rules and leaders;
- proofreader's marks as SVG strokes (caret, dele, query 'Qy.', 'stet', square bracket);
- paper planes in CSS (sheets, vellum, slips, binding);
- one Canvas 2D fore-edge of hairline strata;
- real HTML UI (contents slip, form, index).

There are zero raster images. og:image is rendered from the title page at build time.

## Motion language

THE RULE: print is set once, ink is live.
- Charcoal type is the community's record, and it never performs. Headings are set once by line masks. Body text never animates. Print moves only as a whole pinned page.
- Sapience's purple ink carries all continuous motion: markers, carets, leaders, washes and underlines.
- Marginal notes move only when ink carries them.

PRINCIPLES
1. Motion shows provenance, never magic. Every moving line connects a claim to a source or a person.
2. Paths are orthogonal, horizontal then vertical like a technical drawing, with square elbows. Nothing curves, swoops, floats or orbits.
3. Nothing underneath moves. The systems beneath the layer and the page beneath the slips stay still, which is 'No rip and replace' as motion.
4. Things settle; they never bounce. No overshoot, elastic, blur, glow or shimmer.
5. No idle motion and no loops. When scrolling stops, the page is still, so WCAG 2.2.2 never triggers.
6. Scroll owns time. Set pieces are scrubbed and reverse exactly. Print stays set on reverse (once: true), because print is permanent and ink is reversible.

EASES (CustomEase, matching the existing src/motion/runtime.ts)
| Name | Curve | Use and timing |
|---|---|---|
| draw (ink) | M0,0 C0.65,0 0.35,1 1,1 | Pen strokes: leaders, carets, rules. Duration .45s + length/1000px, clamped to .5–1.2s. Decisive start, soft landing. |
| settle (set) | M0,0 C0.16,1 0.3,1 1,1 | Type setting and plane settling. .9s; line stagger .07s, slip stagger .08s. |
| carry | M0,0 C0.45,0 0.2,1 1,1 | Excerpts riding a leader in time-based contexts. 1.1s. |
| lift | M0,0 C0.2,0 0,1 1,1 | Micro-interactions. .28s. |

- Scrubbed timelines use ease 'none' internally, with scrub .6 on desktop (Lenis supplies the smoothing) and .35 on touch.
- Toggle-type ink reveals use GSAP 3.15 easeReverse 'power2.in' at 0.6× duration, so exits are quicker than entrances.
- Running-head title swaps take .45s.

PINS (desktop)
| Section | Pin length |
|---|---|
| Title → epigraph exchange | 110vh |
| II | 200vh |
| III | 300vh, snapped to each insertion |
| IV | 140vh |
| V | 180vh |
| VI | 160vh |

All other sections flow. The pinned element is never animated itself; only its children are.

WHAT MOVES: purple ink, marginal notes carried by ink, and whole paper planes (vellum up, binding up, slips sideways).

WHAT STAYS STILL: body paragraphs, the system sheets, the folio column, the running foot and its notice, and the page itself. Print has no parallax.

Only transform, opacity, clip-path, stroke-dashoffset and one font-variation tween are animated. There are no filters.

## Hero scene

DESKTOP (1440×900): the title page of the volume.

RUNNING HEAD (fixed, 56px, cream, 1px #CDC7BE rule below)
- Left: the wordmark slot 'SAPIENCE AI' in Public Sans 600 caps, 12px, +.12em (data-slot='wordmark'). The official mark drops in after the icon refresh, so the concept does not copy the logotype.
- Centre: the running title 'THE ANNOTATED RECORD · FRONT MATTER' in Public Sans caps, 11px, #6E6862.
- Right: 'Contents' (text button), 'Motion: On' (toggle, aria-pressed), and 'Book a conversation' (purple link with a hairline underline).

FOLIO COLUMN (col 1): only the folio 'i' in Newsreader italic 15px at the page foot.

MAIN TEXT (cols 2–9), starting 20vh from the top
- Kicker (concept copy): 'FOR PROFESSIONAL ASSOCIATIONS AND MEMBERSHIP ORGANIZATIONS'. Public Sans 600 caps, 12px, +.1em, #4A4643.
- H1 (verbatim): 'The collective intelligence platform for professional communities'.
  - Newsreader opsz 72, wght 320, ≈102px, lh .97, tracking −.02em, #1C1C1E.
  - Four lines: 'The collective / intelligence¹ platform / for professional / communities'.
  - After 'intelligence' sits a purple superscript ¹ in Public Sans 650. It is CSS generated content with empty alt text (content: '1' / ''), so crawlers read a clean H1. The H1 carries aria-describedby='sn-1'.
- Deck (verbatim, Collective Intelligence value), in cols 2–7: 'Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it. We unlock it, making it searchable, actionable, and built to compound for the community it came from.' Newsreader italic opsz 24, ≈22px, lh 1.4, #4A4643, 46ch.
- Actions:
  - 'Book a conversation': flat #5A2D82 button, cream Public Sans 600 15px, 52px tall, radius 0, a small drawn caret at the right. It jumps to #book.
  - 'Read the record ↓': Newsreader 19px with a 1px purple underline. It jumps to #contents.

MARGIN (cols 10–12), aligned to the cap height of H1 line 2
- Caps label 'NOTES'.
- Sidenote ¹ (verbatim, Our values): '“The most powerful intelligence / in a professional community / already lives within its people.”' Newsreader italic 16px, lh 1.45, set with the same three nowrap line breaks the epigraph will use.
- Attribution: 'SAPIENCE AI · OUR VALUES · HUMANS IN PARTNERSHIP'.
- At the bottom of the margin, concept copy in 13px italic #6E6862: 'A note on this concept: quotations are Sapience AI's own words, with sources. Scenarios marked Illustrative are ours.'

THE LEADER: a 1px #5A2D82 orthogonal hairline, the only line on the page. It runs from the ¹ along H1 line 2's x-height through the gutter channel, turns a square elbow, drops to the note's first baseline and ends in a 5px tick.

RUNNING FOOT (fixed, 32px, 1px rule above)
- Left: 'Speculative design concept · Not affiliated with or endorsed by Sapience AI' in Public Sans 12px #4A4643. It is persistent on every screen and every page.
- Right: the folio 'i / 11' in tabular figures.

RIGHT VIEWPORT EDGE: an 8px 'fore-edge' reading strip of 11 hairline segments (aria-hidden).

The only colour on the page is the ¹, the leader, the button and one underline.

LOAD CHOREOGRAPHY (no loader, and no print is ever hidden)
First paint shows every charcoal word: the running head, kicker, H1 (the LCP element), deck and CTA labels. Only the purple ink and the sidenote get start states. JS sets them behind an html.js class, which an inline script in <head> adds with a 2.5s failsafe.

| Time | Action |
|---|---|
| 0.00s | Page paints. |
| 0.10s | The running-head rule draws left to right and the running-foot rule right to left (scaleX, 1.0s, 'draw'). |
| 0.35s | The ¹ inks in: opacity 0→1, scale .6→1 from its baseline (.35s, 'settle'). |
| 0.55s | The leader draws from the ¹ to the note (DrawSVG 0→100%, .85s, 'draw'). |
| 1.25s | The sidenote wipes in top to bottom (clip-path inset(0 0 100% 0)→inset(0), .7s, 'settle'). The attribution follows .1s later. |
| 1.55s | The 'Read the record' underline draws (.5s). The button's caret lifts 2px once and settles (.4s). |
| 1.80s | The fore-edge strip fades in (.4s). |
| ≈2.2s | Everything is still. |

There is no loop, no idle drift and no bouncing scroll cue. If the visitor scrolls before 2.2s, the intro timeline jumps to its end state, progress(1), so the scroll exchange always starts clean.

## Hero to scroll

THE MARGIN BECOMES THE TEXT

The title page and the epigraph page form one pinned spread on desktop (≥900px): pin start 'top top', end '+=110%', scrub .6, anticipatePin 1. In static HTML they are two sections in normal flow.

0–12vh: The leader retracts from the ¹ end back toward the note (DrawSVG '0% 100%' → '100% 100%'). The note lets go of the claim.

0–40vh: The title block (kicker, H1, deck, actions) rises −14vh as one plate and fades 1→0 between 8 and 40vh. It never splits, scales or blurs. At 30vh the running-head centre swaps 'FRONT MATTER' for the H1's words in caps, 'THE COLLECTIVE INTELLIGENCE PLATFORM FOR PROFESSIONAL COMMUNITIES', with a .45s mask swap. The title docks as the book's running title for the rest of the read.

8–80vh: The epigraph grows out of the margin.
- The epigraph is a <blockquote> that belongs to the next section and is measured in advance.
- It starts fitted onto the sidenote's box with Flip.fit (scale ≈ .21, sitting in the margin). The small sidenote hides underneath.
- It travels left into the main measure (cols 2–11) and scales to 1.
- Its three nowrap line spans match the note's line breaks, so no word ever reflows.
- Newsreader's optical size tweens with the growth: font-variation-settings 'opsz' 16→72 and 'wght' 380→300. The small italic note becomes the display cut as it grows.

20–80vh: The citation becomes the voice. The purple ¹ is an SVG glyph outline laid over the CSS marker. MorphSVG turns it into a large opening quotation mark “, which moves to hang in the folio column beside the epigraph's first line. It is the only purple on the new page.

80–110vh: The attribution 'SAPIENCE AI · OUR VALUES · HUMANS IN PARTNERSHIP' wipes in left to right, and the folio ticks from i to ii. Then the spread unpins. In normal flow below come the verbatim continuation, 'Technology will never replace that. Our work is to elevate it, so every voice carries further and every contribution matters more.', and then the Contents. Each Contents row draws its dot leader as it enters, and a caret inks beside Chapter I ('you are here').

REVERSE: the whole exchange is scrubbed. Scrolling up returns the epigraph to the margin, turns the “ back into the ¹, redraws the leader and brings the title plate back.

Under 900px there is no pin (see mobile direction).

## Signature sequence

CHAPTER III, 'THE MARGINS, SET IN THE MAIN TEXT'

Pinned spread (desktop):
- Pin: start 'top top', end '+=300%', scrub .6.
- Snap: 'labelsDirectional', duration .2–.6s, ease 'settle', delay .15. The page never comes to rest mid-flight.

Stage layout:
- Folio column: 'III' and the caps label 'ILLUSTRATIVE SCENARIO'.
- Main column (cols 2–8):
  - The question as an H3 in Newsreader 34px: 'Q. When our annual meeting went hybrid, how did we award continuing-education credit?'
  - Below it the 'galley': five 1px baselines where the answer will be set.
- Margin (cols 10–12): five source notes. Each has a Plex Mono caps label, a 1–2 line italic excerpt with its key phrase, and a mono meta line.
- Page foot: a 'trail' strip of five empty mono slots numbered 1–5.

ENTRY (0–40vh)
- At pin start, the question is set once with a line mask (.9s 'settle'). This runs outside the scrub, because print is permanent.
- 0–12vh: the galley baselines draw left to right, staggered.
- 8–40vh, 'Sage reads': 1.5px purple underlines draw beneath 'annual meeting', 'hybrid' and 'continuing-education credit', about 10vh each.
- The notes sit dormant at opacity .5, with their labels still legible.

TRANSFORMATION (40–220vh): five insertions of 36vh each
For note n, base = 40 + 36(n−1). Offsets are in vh from base.

| Offset | What happens |
|---|---|
| +0–8 | The note wakes (opacity .5→1). Its key phrase takes the #E4DCE6 wash, background-size 0→100% left to right. |
| +6–14 | A caret (two 1px SVG strokes) inks at the insertion point, at the end of the previous clause in the galley. |
| +10–20 | The leader draws from the note's left edge into the gutter channel (col 9), turns a square elbow and runs along the galley baseline to the caret. |
| +18–30 | An aria-hidden clone of the excerpt lifts 4px and rides the leader, using MotionPath on the same path and scaling .86→1. Halfway along, the italic margin clone crossfades to a roman body clone. That register change is the moment knowledge enters the record. |
| +28–34 | Landing. The real galley clause unmasks left to right (clip-path inset(0 100% 0 0)→0). The clone fades. The caret morphs into superscript n, and n inks on the note. |
| +30–36 | The leader retracts to a 12px tick at the note, and trail slot n fills purple. |

The five clauses (illustrative concept copy), with their sources:
1. 'Credit went to live virtual attendance, verified at session check-in.' Source: MINUTES · EDUCATION COMMITTEE.
2. 'The committee chose check-in over quizzes so hybrid attendees wouldn't be penalized.' Source: SESSION Q&A · ANNUAL MEETING.
3. 'Recordings watched later count only when a chapter confirms attendance,' Source: FORUM THREAD · MEMBERS.
4. 'and staff apply the rule at renewal.' Source: STAFF HANDBOOK · MEMBER SERVICES.
5. 'For a case the record doesn't cover, ask a person, not a prompt: the committee's past chair.' Source: PERSON · PAST CHAIR, EDUCATION COMMITTEE.

Clause 2 carries the reasoning. That pays off Chapter I's line 'The margins keep the reasoning.'

When source 5 lands, two hairlines draw a double frame around the person note, because it is a person and not a document. In the galley, 'a person, not a prompt' takes the wash.

INFORMATION REVEAL (220–256vh): the 'proof view'
- All five leaders redraw together at 60% opacity. For a moment every clause on the page is visibly tied to its source.
- The trail strip completes with a mono readout: 'SOURCES 4 · PERSON 1 · TRAIL RECORDED' (illustrative).
- A short leader points downward to 'see Chapter VI'.

CLIMAX (256–284vh)
- The leaders and baselines fade away, leaving a clean, fully cited paragraph.
- A 2px purple bar draws down the paragraph's left edge: the editor's approval.
- 'stet' (let it stand) appears in small purple italic in the folio column (aria-hidden).
- The lede's last sentence, 'The trail comes with it.', underlines.

RESOLUTION (284–300vh)
- A still hold for reading, then the spread unpins.
- The answer and its notes stay in the static layout as an ordinary annotated page.

REVERSE BEHAVIOUR
- The whole timeline is scrubbed and reverses exactly. Clauses re-mask, clones ride back to the margin, carets erase, and the notes return to dormant.
- Only the question's typesetting persists, because print is permanent.
- Keyboard and screen-reader users always get the final document: the answer paragraph, the superscript links, and the notes as <aside role='note'>.
- A 'Skip figure' link precedes the pin.

## Signature moment

Watching an answer get typeset from the margins. One by one, five marginal sources are marked with a purple caret. Each rides a hairline leader into the paragraph, changes from italic margin hand to roman text as it lands, and leaves a footnote number behind. The fifth source is not a document. It is a person, framed twice: 'ask a person, not a prompt.' Then every leader flashes back at once, and the visitor sees one plain, readable answer whose whole trail is visible. Scroll back up and it takes itself apart.

## Evolving motif

THE EDITOR'S CARET AND ITS LEADER: a purple proofreader's insertion mark (‸) plus a 1px orthogonal hairline. Both are drawn as SVG strokes. It always means 'this belongs here, and here is where it came from.'

How it changes, section by section:
- Title page (i): the first stroke. One leader ties the H1's ¹ to its source in the margin: claim → source.
- Epigraph and Contents (ii): the ¹ morphs into a hanging “ and the leader retracts, so the source becomes the voice. In the Contents, the caret marks 'you are here'.
- I, Written in the margins: broken provenance. Carets have nothing to insert. Dashed leaders stop 40% short of the text and end in a purple 'Qy.', the proofreader's query.
- II, The layer: leaders become connectors on the vellum. A drawn square bracket groups the scattered fragments (organize, connect). One caret joins the group to the question (activate).
- III, The answer: the caret does its job five times. Leaders carry excerpts into the text, carets become superscripts, and the fifth insertion is a person.
- IV, Sage: the caret turns 90° and becomes a switch. It slides (y only, never rotating) to align with the right lane.
- V, Never forgets: leaders become ribbons across years of the fore-edge. They persist after the role tags that made them fade out. Their count grows 0, 1, 3, 6, 10, 15, 21, labeled 'diagram, not data'.
- VI, The apparatus: every leader straightens into one vertical audit trail. On the charcoal binding it becomes the dot leaders of the eight controls. Ink becomes specification.
- Appendix: the caret sits on each offprint's status line and points to the truth: early access, waitlist, open source v1.0.0.
- Afterword: the caret rises. It draws under 'elevate' and lifts 6px, so insertion becomes elevation ('Not to automate humanity. To elevate it.').

RESOLUTION (back matter): the last insertion. The word 'together' rides from the margin into 'Let's achieve more, together.' As it lands it turns from purple ink into charcoal record: the insight becomes the community's own. The same leader keeps travelling down and becomes the 2px underline of 'Book a conversation'. In the Index, the dot leaders are the motif at rest.

## Typography as motion

Type moves in five ways, and only these five.

1. SET. Print is set once. Headings (h1–h3 only) reveal by lines using SplitText { type: 'lines', mask: 'lines', autoSplit: true, onSplit }: yPercent 100→0, .9s 'settle', stagger .07, once: true.
   - Body paragraphs never animate.
   - Split copies are aria-hidden and sit beside an sr-only original, because SplitText's aria-label mode fails in JAWS and VoiceOver (§8.8).
   - Text is never split by characters, scrambled, typed on, or given rotating words.

2. CITE. Superscript markers ink in: Public Sans 650 figures at .62em, raised .58em, opacity 0→1 and scale .7→1 from the baseline over .35s. The matching number on the note inks in the same frame, so the pair reads as a single event.

3. CARRY. Marginal notes enter the text by riding a leader. Aria-hidden clones do the travelling; the real text unmasks when the clone lands. The register shift carries the meaning: italic, small and grey (margin) becomes roman, body-size and charcoal (record). In the finale, purple 'together' becomes charcoal.

4. CORRECT. Proofreader's marks are drawn as ink:
   - caret (insert), throughout;
   - dele (strike) through 'automate' in the Afterword;
   - 'Qy.' (query) in Ch I;
   - 'stet' (let it stand) in Ch III;
   - a square bracket (group) in Ch II.

5. SIZE. Optical size is part of the motion. When the margin note grows into the epigraph, 'opsz' tweens 16→72 and 'wght' 380→300 inside nowrap line spans, so nothing reflows. The small text cut turns into the display cut as it grows.

Also part of the system:
- The running head swaps chapter titles with a .45s vertical mask, like turning to a new right-hand page, and the folio increments in tabular figures.
- Dot leaders in the Contents, the Index and the controls list draw left to right to their locators (.6s 'draw').
- Numbers never count up; they cite. '57%' is simply set, and only its footnote leader moves.

## Spatial depth

Flat and precise. Depth comes only from paper planes stacking over and occluding each other. There is no perspective, no rotation and no blur.

THE FIVE PLANES
1. Desk, #E9E4DC. Visible only at the page's fore-edge in Chapter I, where fragments slide off the page onto it, and beyond 1600px.
2. Page, #F2EFEA. The base.
3. Vellum, rgba(248,246,242,.86). Sapience's layer in Chapter II, sitting literally above the systems.
   - No backdrop-filter: it is paper, not glass.
   - 1px #CDC7BE top edge.
   - Shadow: 0 -18px 36px -28px rgba(28,28,30,.28).
4. Slips and tip-ins: routing slips, offprints, the Contents slip, fragments.
   - Shadow: 0 1px 1px rgba(28,28,30,.06), 0 12px 28px -18px rgba(28,28,30,.30).
5. Binding, #1C1C1E. The charcoal case the cream pages slide into in Chapter VI: security encloses the record.

RULES
- Planes move only as whole objects, on one axis at a time: y for the vellum and the binding, x for slips.
- Scale stays between .94 and 1 (the page receding into the binding).
- Z-order carries meaning: the layer is above the systems, and the binding encloses the pages.
- Print never has parallax. The only drift is Chapter I's fragments (at most 6vh on y and 5vw on x), because scattering is the problem that chapter shows.

## Three d decision

No WebGL and no CSS 3D.
- The authority of this direction comes from print precision. A 3D scene would contradict it and pull the page back toward the §5.5 clichés.
- A canvas hero would compete with the text LCP.
- 3D costs GPU on the older laptops that association executives and board volunteers actually use.

Everything is DOM text, SVG ink and CSS planes, with one justified exception: Chapter V's fore-edge uses Canvas 2D. It accumulates several hundred to about 2,000 hairlines as you scroll, which would be DOM-heavy as SVG. It:
- caches each year-band to an offscreen canvas once, then only composites per frame;
- draws purple ribbons as progress-limited paths;
- caps DPR at 2 and pauses via ScrollTrigger onToggle when off-screen;
- has an inline-SVG static version (7 bands × 10 lines plus ribbons) for reduced motion and no-JS.

## Microinteractions

1. Marker and note pairing. Hovering or focusing a superscript (an <a href='#n3'>) gives its note the #E4DCE6 wash and thickens its leader from 1 to 1.5px (.28s 'lift'). On touch, the marker is a <button aria-expanded> that opens the note inline.

2. Provenance view (toggle in the Contents slip and the colophon). Every text block shows its data-copy tag in the margin; the tags ink in with a .02s stagger. Tags read: 'SAPIENCE AI · VERBATIM · /platform', 'CONCEPT COPY', 'ILLUSTRATIVE', 'INDUSTRY SOURCE · ASAE 2026', 'WORDMARK SLOT', or 'CAPABILITY TO BE CONFIRMED'. Verbatim blocks get a 2px purple rule and concept copy gets a dashed one, so brand and comms can audit every word.

3. Cite. Each verbatim quote has a small mono 'cite' button that copies the quote plus its source URL. An aria-live region announces 'Copied with its source.'

4. Running head. The chapter title swaps with a vertical mask (.45s) and the folio ticks. On desktop, 'Book a conversation' is always one click away.

5. Contents slip. It drops from the running head (y −8px→0 plus opacity, .5s 'settle'), then its dot leaders draw and the current chapter shows the caret. Focus is trapped inside, Esc closes it and focus returns to the trigger. The slip also holds the Motion and Provenance toggles.

6. Links. A 1px purple underline at .18em offset thickens to 2px from the left on hover (.28s). There is no colour flash.

7. Primary button. Flat #5A2D82. On hover the fill deepens to #43205F and its drawn caret lifts 2px; on press it moves down 1px (translateY). Every focusable element gets a focus-visible double ring: 2px #5A2D82 outside a 2px #F2EFEA offset.

8. Selection. ::selection uses the ink wash, so the reader's highlight matches the editor's.

9. Fore-edge progress. An 8px strip of 11 hairline segments on the right edge; segments already read turn purple. It is aria-hidden; navigation stays in Contents.

10. Motion toggle. 'Motion: On/Off' with aria-pressed. The choice is remembered in localStorage (wrapped in try/catch) and calls gsap.matchMediaRefresh().

11. Form.
- Caps labels sit above underline-only inputs; the bottom rule is #6E6862, which meets 3:1.
- Focus draws a purple rule left to right.
- Errors appear as italic margin notes with a caret pointing at the field.
- Submit never fakes success. It shows: 'Concept only. This form isn't connected. In production it hands off to the HubSpot connection Sapience's engineering team owns.'
- Without JS, the form's action is #concept-note, so the same honest message appears.

12. Index locators. Clicking scrolls (via Lenis) to the chapter and gives its heading a .6s wash ('you are here').

13. 'Print this record' (in the colophon). The print stylesheet turns sidenotes into numbered footnotes, prints URLs after links and keeps running heads via @page.

## Mobile direction

THE POCKET EDITION: a separately art-directed composition below 900px, not a squeezed desktop.

GRID AND THE MARGIN
- 4 columns, 20px outer margin, 16px gutter. From 600 to 899px the type scale steps up and the index uses 2 columns.
- The margin moves to the foot. Each note sits directly under the paragraph it annotates, in a strip with a 1px purple left rule and its number.
- Leaders become the 'gutter rail': a vertical purple hairline at x=10px in the left gutter, connecting each marker down to its note. Its length is scrubbed with scroll. The rail is the mobile motif.

TITLE PAGE (390×844)
- Running head, 48px: wordmark slot on the left, 'Contents' on the right. 'Book a conversation' lives in the Contents slip, the hero and the finale.
- Kicker: 11px caps, two lines.
- H1: 2.75rem, five lines, lh .98.
- The ¹ note sits directly under the H1, with the rail drawn from the ¹ down to it.
- Deck at 18px, a full-width 52px 'Book a conversation' button, then 'Read the record ↓'.
- Running foot, 28px: 'Speculative design concept · Not affiliated with Sapience AI' at 11px.
- Load: the rail draws (.6s) and the note wipes in. Everything is still by 1.4s.

CHAPTERS
- Exchange: no pin. The epigraph is set by lines as it enters, and the rail runs on from the hero's ¹ to the epigraph's hanging “ across the scroll distance.
- Ch I: fragments become a vertical scatter between paragraphs, drifting at most 12px. The two 'leaving' slips slide off the right edge.
- Ch II: the sheets become four stacked strips. The vellum slides up over them in a 120vh pin with three short beats.
- Ch III: the only long pin, 180vh. The foot becomes the margin: the five notes wait in a tray at the bottom of the viewport and rise one at a time along the rail into the galley. Scroll snaps to each insertion.
- Ch IV: slips drop top-down through the Sage switch into three pigeonholes side by side (time-based on enter, play and reverse).
- Ch V: the canvas runs at 100vw × 56vh, scrubbed by section progress, with no pin.
- Ch VI: the trail runs vertically. The binding simply begins as a charcoal page with no slide-in, and the control rows draw their dot leaders.
- Index: two columns with 44px rows.

MECHANICS
- No Lenis on touch; native momentum scrolling.
- Scrub .35 and ScrollTrigger.config({ ignoreMobileResize: true }).
- All tap targets are at least 44px.
- At 400% browser zoom the Pocket Edition takes over, so WCAG 1.4.10 reflow holds.

## Reduced motion

'With motion off, the record reads the same.' This applies when prefers-reduced-motion is set or the running-head toggle is Off. It is handled by the gsap.matchMedia 'reduce' branch, which reverts automatically.

REMOVED: Lenis, pinning, scrubbing, parallax, travel and text splitting.

Every section renders in its finished, fully annotated state, as a typeset document:
- Title page: the ¹, its drawn leader and the note.
- Epigraph: its own page, with a hanging “.
- Ch I: fragments in place, with the dashed queries drawn.
- Ch II: the vellum resting over the lower sheets, the bracket group drawn and the question activated.
- Ch III: the complete cited answer, with the notes in the margin, their leaders drawn and the 'stet' bar.
- Ch IV: all lanes drawn, two slips per lane.
- Ch V: the static SVG fore-edge.
- Ch VI: the trail plus the binding plate.
- Afterword: the strike and the caret drawn.
- Back matter: 'together' in place with the caret beneath it, and the CTA underline drawn.

Leaders are computed once from the DOM and drawn static. With no JS at all, notes still sit in the margin grid, paired by number.

STILL ALLOWED: 150ms opacity crossfades for hover and focus, and for the Contents slip.

The same words, sources and reading order appear in every mode. No content exists only in motion.

## Technical approach

STACK
- Vite 8 + TypeScript multi-page static build: index; /security (Chapter VI expanded); /notes (the rationale and audit, titled 'Editor's notes'); and a 404, 'This page is not in the record'.
- Builds on the existing repo scaffold:
  - src/motion/runtime.ts already provides Lenis on the gsap ticker, the 'settle', 'draw' and 'lift' eases, DUR tokens, and the 900px desktop/mobile split.
  - scripts/capture.mjs already runs QA across 4 viewports, plus reverse-scroll and keyboard passes.
- Firebase Hosting via firebase.json, adding CSP, HSTS, a 404 page and X-Robots-Tag: noindex for the concept.

GSAP 3.15 PLUGINS
- ScrollTrigger: six pins (hero 110vh, II 200vh, III 300vh, IV 140vh, V 180vh, VI 160vh); snap on III; anticipatePin; invalidateOnRefresh.
- SplitText: headings only.
- DrawSVG: leaders, rules and marks.
- MorphSVG: ¹ → “, and caret → numerals. The glyph outlines are extracted at build time from the subset font with opentype.js.
- MotionPath: excerpts riding their leaders.
- Flip: Ch II 'organize', the epigraph fit, the Labs offprints and the Contents slip.
- CustomEase: adds 'carry' to the runtime eases.
- easeReverse: faster exits on toggle reveals.
- Lenis 1.3: desktop only.
- All motion sits in one gsap.matchMedia({ desktop, mobile, reduce }); the user toggle feeds gsap.matchMediaRefresh().

LEADERS
- One aria-hidden SVG overlay per stage, with pointer-events: none and vector-effect: non-scaling-stroke.
- A leader(from, to, { elbow: 'h-v' }) builder turns getBoundingClientRect() positions into orthogonal path strings, snapped to .5px.
- Paths recompute on ScrollTrigger 'refreshInit', on document.fonts.ready and via ResizeObserver. Measuring happens in refresh; writing happens in the ticker.

RENDERING PER SET PIECE
| Set piece | Rendering |
|---|---|
| Hero + exchange | DOM, SVG, Flip.fit and a font-variation tween |
| Ch I | DOM slips and dashed SVG, scrubbed |
| Ch II | CSS planes, Flip and an SVG bracket |
| Ch III | Real DOM text, aria-hidden clones, MotionPath and DrawSVG |
| Ch IV | DOM slips and SVG lanes |
| Ch V | Canvas 2D with an SVG fallback |
| Ch VI | DOM list, SVG trail and CSS planes |
| Labs | Flip |
| Afterword and finale | SVG strokes and MotionPath |

FONTS
- @fontsource-variable/newsreader (opsz.css + opsz-italic.css), @fontsource-variable/public-sans, @fontsource/ibm-plex-mono 400/500.
- I verified the files: they carry only liga/pnum/tnum. The design therefore uses caps labels, CSS-raised figures and drawn marks rather than OpenType small caps, oldstyle figures or superscripts.
- The latin Newsreader opsz files weigh 132KB (roman) and 147KB (italic). They are subset at build with subset-font (HarfBuzz, which keeps the variation axes) to Basic Latin plus typographic punctuation, targeting 70KB or less each. A build check fails if any character used on the page is missing.
- Only the roman is preloaded. Metric-matched fallbacks (size-adjust and ascent-override on Georgia) prevent layout shift when fonts swap.

PROGRESSIVE ENHANCEMENT
- Every word is in static semantic HTML: one H1, an H2 per chapter, notes as <aside role='note'>, controls as a <ul>.
- An inline script in <head> sets html.js, with a 2.5s failsafe. Start states are set only by JS, and the H1 is never hidden.
- The H1's footnote marker is CSS generated content with empty alt text, so the H1 text stays clean.

SEO / AIO
- Organization and WebSite JSON-LD, llms.txt and .md twins are all built, but sit behind a VITE_PRODUCTION_SEO flag that is off for the concept. That keeps this unaffiliated site from adding to Sapience's entity collision (§9).
- Analytics seams: track('chapter_progress' | 'cta_click' | 'motion_toggle' | 'provenance_toggle') only logs to the console in concept builds.

PERFORMANCE BUDGET
- JS ≤110KB gzipped (gsap core and plugins about 85KB, Lenis about 5KB, app about 20KB).
- Fonts ≤200KB, CSS ≤30KB, HTML ≤60KB.
- Zero raster images. og:image is rendered from the title page at build with playwright-core.
- LCP ≤1.8s, and the LCP element is text.
- CLS ≤0.02: only transform, opacity, clip-path and stroke-dashoffset animate, with no filters.
- INP ≤150ms.
- 60fps, with at most one active SVG overlay per pin. The canvas pauses off-screen.

BUILD COMPLEXITY: medium-high, about 20–22 developer days.
| Work | Days |
|---|---|
| Foundation: tokens, grid, type, static HTML for all 11 sections, sources, print CSS | 4 |
| Hero + exchange | 2 |
| Ch I–II | 3 |
| Ch III | 4 |
| Ch IV–VI | 4 |
| Labs, Afterword, back matter | 1.5 |
| Pocket Edition | 2 |
| Reduced motion, accessibility, QA | 2 |

## What the hiring team will recognize

HEAD OF BRAND & COMMUNICATIONS (visual identity across core and developer products; naming and taxonomy)
- Their palette, purple and serif are kept and each is given a job. Purple is formally defined as ink, never glow.
- A two-register system: the core proceedings register and a mono Labs/Developer register.
- The taxonomy is used exactly: Sage — AI Assistant, Affinity — AI Agent, Corporate — AI Agent, Private Intelligence Core, Governance You Control, No Migration Required, Humans in Partnership.
- The wordmark is a labeled slot, ready for the parallel icon refresh.
- Provenance view lets them audit every word as verbatim, concept or illustrative.

HEAD OF MARKETING COMMUNICATIONS
- A story sales can repeat in one breath: 'Your members' knowledge lives in the margins. Sapience sets it in the main text, with the trail.'
- It is built on the §5.7 whitespace: a person, not a prompt; knowledge that compounds; the organization that never forgets; an editorial register; sourced data; governance you can see.
- Category and audience are named in the first viewport, and the copy is human and benefit-led.

CEO
- A conversion path that never disappears: 'Book a conversation' in the running head, the hero, the Contents slip and the finale.
- Chapters that map to buyer objections: problem → integration → how it works → agents → continuity → governance.
- Measurement seams for chapter progress and CTA clicks.

FOUNDER (product and UX educator)
- Motion that explains mechanisms step by step: scattered → layered → routed → cited → remembered → audited.
- Complexity is made to disappear, not dramatized.

ENGINEERING (GCP, HubSpot)
- Static semantic HTML5 on Firebase Hosting, with CSP, HSTS and noindex.
- No WebGL and no framework lock-in.
- A performance budget with a text LCP, and progressive enhancement with a verified reduced-motion path.
- A print stylesheet.
- A form with documented HubSpot v3 seams that never fakes success.
- SEO that is safe for the entity, switched off in the concept build.

EVERYONE
- Restraint and honesty as craft:
  - No invented customers, logos or statistics.
  - '57%' is footnoted 'to be confirmed'.
  - Affinity and Corporate read '[Description forthcoming]'.
  - Industry facts are credited to ASAE and iMIS/ASI.
  - The speculative-concept notice sits in the running foot of every screen.
- It answers the audit's weaknesses one by one:
  - no proof → provenance as proof;
  - no 'how it works' → Chapters II–III;
  - undescribed agents → an honest masthead;
  - unsourced stats → footnotes;
  - one generic CTA → 'Book a conversation' kept visible everywhere, plus 'Read the record'.

## Narrative sections

### i-title-page — impact (quiet)

- **Purpose:** First viewport. Names the category and the audience, and places the primary CTA. Establishes the book's one rule, 'every claim has its source', with a single footnote that leads to people. The H1 is the LCP element and is never hidden or animated on load.
- **Headline:** H1 (verbatim, home): 'The collective intelligence platform for professional communities'. Kicker (concept): 'For professional associations and membership organizations'. Sidenote ¹ (verbatim, Our values): '“The most powerful intelligence in a professional community already lives within its people.”' Deck (verbatim, Collective Intelligence): 'Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it. We unlock it, making it searchable, actionable, and built to compound for the community it came from.' Actions: 'Book a conversation' / 'Read the record ↓'.
- **Composition:** Title page of a proceedings volume. Running head (56px): wordmark slot, running title, Contents, Motion, Book a conversation. Running foot (32px) carries the persistent notice. Folio col 1 shows 'i'. H1 in cols 2–9 at ≈102px, four lines. Deck in cols 2–7. A flat purple button and an underlined text link. Margin cols 10–12: the 'NOTES' label, sidenote ¹ aligned to H1 line 2, its attribution, and a concept note at the bottom. One purple orthogonal leader runs from the ¹ to the note. Purple appears only on the ¹, the leader, the button and the link underline.
- **Motion:** Load, about 2.2s, with no loader: rules draw, then the ¹ inks, the leader draws, the note wipes in and the underline draws. Then a 110vh pinned exchange (see hero_to_scroll).

### ii-epigraph-contents — pause / discovery

- **Purpose:** States the thesis (intelligence lives in people). Gives the reading key. Provides a table of contents that doubles as navigation and as the reviewers' chapter index.
- **Headline:** Epigraph (verbatim): '“The most powerful intelligence in a professional community already lives within its people.”', Sapience AI, Our values. H2: 'Contents'.
- **Composition:** Epigraph in Newsreader italic opsz 72 at clamp(2.25rem, 1rem + 4.2vw, 5rem), cols 2–11, three lines, with a purple hanging “ in col 1 and a caps attribution. Verbatim continuation in body text: 'Technology will never replace that. Our work is to elevate it, so every voice carries further and every contribution matters more.' Contents in cols 2–8: rows from 'I · Written in the margins' through 'Index & colophon', Newsreader 22px, caps numerals, dot leaders ending at tabular folios. Margin 'Reading key' (concept): 'Charcoal is the record. Purple is Sapience AI's ink: sources, connections, insertions. Scenarios marked Illustrative are ours.'
- **Motion:** The epigraph arrives through the exchange. As they enter, Contents rows draw their dot leaders left to right (.6s 'draw', stagger .05, once), and a caret inks beside chapter I. Unpinned, about 140vh.

### iii-chapter-i-margins — calm → unease

- **Purpose:** The problem, in association terms: knowledge is scattered, the reasoning behind decisions goes undocumented, and the people who hold it leave. Figures are sourced, with their provenance visible.
- **Headline:** 'Chapter I · Written in the margins'. Display (concept): 'Your record keeps the decisions. The margins keep the reasoning.' Body (verbatim, Customers): 'Insights sit scattered across inboxes, drives, and disconnected tools, leaving teams to make decisions without the full picture.'
- **Composition:** Chapter opener: caps label, display in cols 2–9, body in cols 2–7. 'Fig. 1: Where the reasoning went (illustrative)': six paper slips in Plex Mono and italic, scattered through the margin, the channel and past the page's visible fore-edge onto the desk (#E9E4DC). The slips read: 'Re: Re: Fwd: CE credit for the hybrid sessions?' · 'Education Committee notes FINAL (2).docx' · 'Forum: Does a recording count? (unresolved)' · 'Annual meeting: question from the floor, not transcribed' · 'Chair's handover memo (draft, never sent)' · 'Roster: past chair, Education Committee'. The slips are aria-hidden; a figcaption describes them. Three purple 'Qy.' queries sit in the margin on dashed leaders. Stat block: '57%' (Newsreader wght 280, up to 10rem) with the caption 'of member orgs can't easily access their own performance data'. Its footnote: 'Sapience AI figure; source to be confirmed by Sapience AI. Compare iMIS & ASI, 2026 Membership Performance Benchmark Report: “Only 43% can easily access and understand the data they need…”'. The display line carries a footnote to ASAE, Associations Now, July 2026: 'a decision may be documented, but the reasoning behind the decision is not.'
- **Motion:** Unpinned, about 180vh, scrubbed across the section. Slips drift outward (y +6→−10vh, x 0→5vw, opacity 1→.55). Between 55% and 95%, the handover memo and the question from the floor slide off the page edge and out of view (x +40vw, opacity to 0): they 'move on'. Dashed query leaders draw to 60% and stop at a '?'. On enter, the 57% footnote marker inks in and its leader draws (a reversible toggle).

### iv-chapter-ii-layer — discovery

- **Purpose:** How it works, part one: Sapience sits above existing systems without migration, and organizes, connects and activates.
- **Headline:** 'Chapter II · A layer above the record'. Display (concept): 'Nothing underneath has to move.' Verbatim (LinkedIn): 'We sit above your existing systems to organize, connect, and activate relevant knowledge.' Verbatim (Platform, No Migration Required): 'We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace. Secure, private, and live in days — not months.'
- **Composition:** Pinned stage. Text in cols 1–4: label, display line, the two verbatim lines, and the verbs 'organize · connect · activate' as a list. Diagram in cols 5–12: four deeper-paper sheets side by side, caps-labeled 'AMS', 'CRM', 'LMS' and 'CONTENT SYSTEMS', each with eight hairline rows. No vendor names, no fake data. Chapter I's slips sit on their home sheets (illustrative mapping: roster on AMS, email on CRM, session Q&A on LMS; notes, forum and memo on content). The vellum plane is labeled 'SAPIENCE AI · THE LAYER (ILLUSTRATIVE)'.
- **Motion:** Pin 200vh, scrub .6. 0–20%: slips settle on their sheets. 20–40%: the vellum rises over the sheets (y 100%→12%) and the sheets never move. 40–60%, ORGANIZE: outlined reference copies of the slips Flip onto a grid on the vellum; the originals stay put and gain a purple tick (references move, data doesn't). 60–80%, CONNECT: a drawn square bracket groups the six references, and short leaders tie each row to its spine. 80–100%, ACTIVATE: the slip 'Qy. How did we award CE credit when the annual meeting went hybrid?' lands at the top of the vellum, a caret inks, the bracket spine extends to it, and the group takes the wash. The three verbs in the text column underline in sync.

### v-chapter-iii-answer — climax

- **Purpose:** The signature mechanism. 'The right insight reaches the right person at the right moment', shown as an answer typeset from marginal sources, with a visible trail, ending in a person.
- **Headline:** 'Chapter III · The margins, set in the main text'. Display (verbatim, mission): 'So the right insight reaches the right person at the right moment.' Lede (concept): 'Sapience brings the margins into the main text. The trail comes with it.'
- **Composition:** Opener in normal flow, then a pinned spread. Folio col 1: 'III' and 'ILLUSTRATIVE SCENARIO'. Cols 2–8: the question H3 and a galley of five baselines. Cols 10–12: five source notes, each with a mono label, an italic excerpt and a mono meta line. A trail strip of five slots at the page foot. End state: a five-clause cited paragraph with notes 1–5; the fifth is a person in a double frame.
- **Motion:** Pin 300vh, snapped to each insertion. Entry: the question is set and Sage underlines its key terms. Then five insertions (wake, caret, leader, carry, land, number, retract), then the proof view, the stet bar and a hold. Fully reversible (see signature_sequence).

### vi-chapter-iv-sage — acceleration

- **Purpose:** Explains Sage and the agents using only verified copy: there is one place to ask, and routing is Sapience's job, not the member's or the staff's.
- **Headline:** 'Chapter IV · Ask once'. Kicker (verbatim): 'Purpose-built AI agents for your community'. Display (adapted from Platform): 'Sage routes every question to the right agent automatically.' Masthead (verbatim): '01. Sage — AI Assistant. Your command center. Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use.' / '02. Affinity — AI Agent [Description forthcoming]' / '03. Corporate — AI Agent [Description forthcoming]'
- **Composition:** A journal masthead page. The listing sits in cols 2–6: names in Newsreader, roles in Public Sans caps, the verbatim text, and '[Description forthcoming]' in italic #6E6862. The routing figure sits in cols 7–12: an inlet slot labeled 'ONE PLACE TO ASK' (concept), a channel down to Sage's switch (the caret turned 90°, in purple), and three lanes ending in pigeonholes labeled 'AFFINITY', 'CORPORATE' and 'SPECIALIZED AGENTS YOU DEPLOY'. The third label comes from the verbatim 'Deploy specialized agents that reflect how your organization works'. Sage is the switch, not a destination.
- **Motion:** Pin 140vh, scrub. 0–15%: the masthead is set. 15–85%: six blank 'Qy.' slips drop through the inlet one at a time. The caret slides on y only, never rotating, to align with a lane, and each slip follows an orthogonal leader into a pigeonhole, two per lane. 85–100%: 'without knowing which tool to use' underlines in the masthead.

### vii-chapter-v-memory — pause (reflective)

- **Purpose:** Continuity through turnover, and intelligence that compounds: the association's knowledge as an asset that grows in value.
- **Headline:** 'Chapter V · The Organization That Never Forgets' (the title of Sapience AI's proposed SXSW27 session). Verbatim (SXSW27 post): 'When board members or committee chairs move on, so does the knowledge they carried.' Concept turn: 'In the record, their notes stay in the margins, still cited and still answering.' Verbatim (Private Intelligence Core): 'Your data trains your model only.' … 'and it gets smarter every year.'
- **Composition:** 'Fig. 5: The record as it accumulates. Diagram, not data.' A Canvas 2D fore-edge in cols 2–9, 64vh tall: seven bands of 36 hairlines, with caps labels 'YEAR 1–7'. DOM role tags on bands 1–4: 'COMMITTEE CHAIR', 'BOARD MEMBER', 'STAFF LEAD', 'CHAPTER LEADER'. Purple ticks sit at the band edges, with ribbon leaders between them on the right side. Text in cols 10–12, with an ASAE footnote (Associations Now, Sept 2026) on officer handovers: 'they often take years of institutional knowledge with them.'
- **Motion:** Pin 180vh. 0–60%: bands accumulate from the bottom up. Two bands after each role tag appears, it takes a hairline strike and fades ('moves on'), but its purple tick stays. The ribbon count grows 0, 1, 3, 6, 10, 15, 21. 80–100%: a 'Qy.' at year 7 is answered by a ribbon reaching down to year 1's tick.

### viii-chapter-vi-governance — calm (proof)

- **Purpose:** Governance on the main reading path, using only the published controls: the audit trail, permissions, isolation and encryption. No badges.
- **Headline:** 'Chapter VI · The apparatus'. Display (verbatim, Governance You Control): 'Every AI recommendation comes with a full audit trail.' Verbatim: 'You set the permissions.' / 'Governance-ready for your board and your regulators.' Binding H3 (verbatim): 'Enterprise-grade security and controls'. Epigraph (verbatim, Built on Trust): 'Safety and privacy are not features. They are how we build.'
- **Composition:** Part A, on cream: Chapter III's worked example as a vertical trail in Plex Mono (illustrative): QUESTION RECEIVED → SOURCES CONSULTED: minutes, session Q&A, forum thread, staff handbook → PERSON SUGGESTED: past chair, Education Committee → PERMISSIONS: set by your organization → RECOMMENDATION: delivered with sources → AUDIT LOG: recorded. One purple vertical leader connects them; the verbatim lines sit in the margin. Part B, the binding (#1C1C1E, cream text, #BCA6D2 ink): the verbatim security body ('Sapience AI runs on Google Cloud with the controls enterprise teams expect — private per-tenant data models, envelope encryption with per-tenant keys, SAML SSO, audit logging, and OWASP WAF protection.'). The eight controls as a <ul> in Plex Mono caps with dot leaders: PER-TENANT ENCRYPTION KEYS · SAML SSO · CLOUD AUDIT LOGS · OWASP WAF · PER-TENANT ISOLATION · MANAGED DATA LIFECYCLE · TLS 1.2+ IN TRANSIT · POINT-IN-TIME RESTORE. A line diagram of two volumes in separate slipcases, 'YOUR ORGANIZATION' and 'ANOTHER ORGANIZATION', each with its own key and an envelope fold. A link to the Data Privacy & Governance Policy. No certifications.
- **Motion:** Pin 160vh. 0–35%: trail entries are set line by line as the vertical leader extends (scrubbed). 35–55%: the binding rises from below and the cream page recedes into it (scale 1→.94, y −4vh, shadow deepens). 55–100%: the eight rows tick in, each drawing its dot leader before its label appears, about 5% of the scroll per row. The slipcases then slide shut over their volumes, one key each.

### ix-appendix-labs — acceleration (light)

- **Purpose:** Shipped work and developer credibility, in a punchier mono sub-register, with each product's true status.
- **Headline:** 'Appendix · Working papers from Sapience AI Labs'. Display (verbatim, Labs, with an early-access qualifier): 'You needed a person, not a prompt.' Intro (verbatim): 'Sapience AI Labs is where our team explores ideas unrestrained by commercial expectation, before they become anything else.'
- **Composition:** Three offprints: cream slips on deeper paper, titles in Newsreader, bodies in italic, status lines in Plex Mono with the caret pointing at them. 'Sapience AI for Chrome: Find the person who knows.' EARLY ACCESS · PEER-MATCHING WAITLIST. 'OpenClaw Middleware Suite: Safety guardrails for AI agents. “Because ‘Autonomous’ shouldn't mean ‘Uncontrolled.’”' OPEN SOURCE · v1.0.0 · 2026-04-27. 'NoteBouncer: Your meetings. Your control.' ANNOUNCED FOR THE ZOOM MARKETPLACE. Real outbound links go to the Chrome Web Store, GitHub and sapienceai.co/labs.
- **Motion:** Unpinned, about 130vh. On enter, the stacked offprints fan into a row (Flip, .6s 'settle', stagger .08; toggleActions 'play none none reverse' with easeReverse 'power2.in'), and the status carets ink. This register moves faster than the rest, at .5–.6s.

### x-afterword — pause

- **Purpose:** The human stance, in Sapience's own words, and the bridge to the invitation.
- **Headline:** 'Afterword · Humans in Partnership'. Display (verbatim, LinkedIn): 'Not to automate humanity. To elevate it.' Founding principle (attributed to Sapience AI's founder post): 'good things come from individuals, great things occur from communities united by a shared interest, and remarkable things happen from intentional AI empowering both toward a common purpose.' Founder line (Monte Gibbs, attributed): 'Human Mode … Humans in partnership with AI.'
- **Composition:** The quiet page. Display line across cols 2–11. The founding principle as a block quote in cols 2–7, with the Human Mode line and the attributions as margin notes. The verbatim Purpose-Driven Innovation value closes the block. Generous white space.
- **Motion:** No pin. On enter (time-based, reversible): a purple dele stroke draws through 'automate' (.6s 'draw', aria-hidden SVG). Then a caret draws under 'elevate' and rises 6px (.5s 'settle').

### xi-back-matter — resolution

- **Purpose:** Resolution and conversion: the final insertion, a booking form with honest seams, and the book's back matter (index, sources, and a colophon carrying the notice).
- **Headline:** Display (verbatim, founder sign-off): 'Let's achieve more, together.' H2 (verbatim, Contact): 'Book a conversation with our team.' Body (verbatim, Contact H1): 'Let's explore what your community's collective intelligence can look like when it's truly connected.' Further H2s: 'Index', 'Notes & sources', 'Colophon'.
- **Composition:** Display line across cols 2–11; 'together' starts as a purple italic margin note in cols 10–12. Form (#book) in cols 2–7: Name, Work email, Organization, 'What would you like to explore?', a consent checkbox, and the 'Book a conversation' button with a concept-only status line. The margin notes 'Engineering-owned: HubSpot connection (v3 submit seam documented)'. Index: A–Z in four columns, Newsreader 17px, with caps locators linking to anchors: 'Affinity, IV'; 'AMS, CRM, LMS, II'; 'Audit trail, III, VI'; 'Committee chairs, I, V'; 'Continuing-education credit, I–III'; 'Members, passim'; 'Person, not a prompt, III, App.'; 'Sage, IV'; and so on. Notes & sources: numbered references with URLs. Colophon: typefaces, build and hosting, 'With motion off, the record reads the same', 'Speculative design concept. Not affiliated with or endorsed by Sapience AI.', and links to Provenance view, 'Print this record' and 'Editor's notes →'.
- **Motion:** Scrubbed over about 60vh as the display line enters. A caret inks after 'more,'. The leader draws from the margin note, and 'together' rides it in (MotionPath), crossfading from purple italic to charcoal roman as it lands. The leader continues down to become the button's 2px underline. On enter, the index draws its dot leaders column by column (once). The page ends still.

## Risks

- It may read as too quiet for a 'motion-first' brief. A still body and a single ink colour can look like restraint to the point of absence. Mitigation: three real set pieces (the exchange, the Ch III insertion, the binding), exact timing, and presenting it on a large screen, where hairline precision shows.
- It could read as 'our current site with footnotes', because the palette is Sapience's own. Mitigation: the book anatomy, proofreader's marks, running heads and margin system are structurally new. Show a before/after spread in the Editor's notes.
- Leader geometry is fragile. The paths are computed at runtime and depend on font loading, zoom and resize, and a misaligned hairline looks broken. Mitigation: recompute on fonts.ready, refreshInit and ResizeObserver; snap to .5px; run capture.mjs QA at four viewports and at 200% browser zoom.
- The illustrative scenario implies the platform can suggest a person ('ask … the committee's past chair'). That isn't verified; the nearest support is the Labs Chrome copy, which is early access. Mitigation: label it 'Illustrative scenario', tag it 'capability to be confirmed by Sapience AI' in Provenance view, and add it to the Appendix A questions.
- The serif body text deliberately departs from Sapience's sans body, and the brand team is mid icon refresh. Mitigation: the body family is a single token and can switch to Public Sans without layout changes.
- Pin fatigue: about 11 viewport heights are pinned in total. Mitigation: snap points, the Contents slip on every screen, a 300vh cap per pin, and a 'Skip figure' link before each pinned stage.
- Clone-to-text crossfades can shimmer if the clone rasterizes differently from the real text. Mitigation: keep travelling clones at scale 1 (scale down, never up), match computed styles, and crossfade only on landing.
- The Fontsource subsets lack smcp, onum and sups (verified), and custom subsetting can drop glyphs or axes. Mitigation: a build-time glyph and axis check, and no design dependence on OpenType features.
- Font weight: unsubset Newsreader opsz roman and italic total 279KB. Mitigation: subset both, preload only the roman, and let the italic load after first paint (the sidenote reveal doesn't start until 1.25s).
- Canvas fore-edge performance on low-end devices. Mitigation: DPR capped at 2, offscreen band caching, pausing when off-screen, and the static SVG under reduced motion.
- The proceedings metaphor could feel academic or dated for a launch-stage AI company. Mitigation: contemporary cuts (Newsreader opsz 72 light, Public Sans), generous space, crisp purple, and plain, human, benefit-led copy.
