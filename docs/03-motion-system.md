# Motion system — The Annotated Record

Motion is treated like typography: it has rules, a small vocabulary, and a reason every time it is used.

## 1. The one rule

**Print is set once. Ink is live.**

- **Print** is charcoal type: the community's record. It is set when it arrives (masked lines) and never performs again. Body paragraphs never animate.
- **Ink** is Sapience purple, meaning what Sapience adds: carets, leaders, citation marks, washes, the audit trail and the call to action. All continuous, scroll-linked motion is ink, plus the paper planes that ink moves between.

Because of that split, reversing scroll is always coherent. Ink retracts and print stays.

## 2. Principles

1. **Motion shows provenance, never magic.** Every moving line connects a claim to a source or to a person. There is no shimmer, glow, particles or idle drift.
2. **Orthogonal paths.** Leaders run horizontally, then vertically, with square elbows, like a technical drawing. Nothing swoops or orbits.
3. **Nothing underneath moves.** Sapience's layer slides *over* the systems an association already runs, and the systems never move. This is "No rip and replace" expressed as motion.
4. **Things settle; they never bounce.** No overshoot, elastic or blur.
5. **Scroll owns time.** Set pieces are scrubbed and reverse exactly. When scrolling stops, the page is still, so no loop ever needs a pause control (WCAG 2.2.2).
6. **Stillness is part of the rhythm.** The security chapter barely moves, which is what makes the answer sequence feel like the climax.

## 3. Tokens

| Token | Curve / value | Used for |
|---|---|---|
| `draw` | `cubic-bezier(.65,0,.35,1)` | Pen strokes: leaders, carets, rules. Decisive start, soft landing. |
| `settle` | `cubic-bezier(.16,1,.3,1)` | Type being set, planes settling. Long tail, no overshoot. |
| `lift` | `cubic-bezier(.2,0,0,1)` | Micro-interactions (hover, focus, press). |
| `none` (scrub) | linear | Everything inside a scrubbed timeline. Lenis supplies the smoothing, so scroll stays in control. |

Durations:
- `micro` .28s, `short` .6s, `base` .9s, `long` 1.4s
- Line stagger .07s
- Leader draw time is .45s plus length/1000px, clamped to .5–1.2s (time-based contexts only)
- Scrub smoothing is `scrub: 0.6` on desktop and `0.35` on touch

## 4. Motion layers

### Micro motion
| Element | Trigger | Motion | Reverse | Reduced motion |
|---|---|---|---|---|
| Links | hover / focus-visible | The 1px ink underline thickens to 2px from the left (`lift`, .28s) | Returns | Instant colour and weight change |
| Primary button | hover / press | Fill deepens to `--ink-deep`; the drawn caret lifts 2px. Press moves it down 1px | Returns | No translation |
| Citation marker ↔ note | hover / focus of either | The note takes the ink wash, and its number and leader thicken (.28s) | Returns | Wash only |
| Focus ring | focus-visible | A 2px ink ring outside a 2px paper offset, no animation | — | Same |
| Running head title | chapter change | The chapter title swaps with a vertical mask (.45s, `settle`) | Swaps back | Instant swap |
| Fore-edge index | chapter change | The tab for the current chapter inks | Un-inks | Same, no transition |
| Contents slip | open / close | Drops 8px with its opacity (.4s, `settle`); dot leaders draw (.6s, `draw`) | Closes faster (easeReverse) | Opacity only |
| Motion toggle | click | Switches the whole motion system via `gsap.matchMedia` refresh; the choice is remembered | — | — |

### Component motion
| Element | Trigger | Start → end | Timing | Reverse |
|---|---|---|---|---|
| Heading set (h2/h3) | enters at 80% of the viewport | Lines masked: yPercent 100 → 0 | .9s `settle`, stagger .07 | Stays set (print is permanent) |
| Superscript cite | the clause it marks lands | opacity 0 → 1, scale .7 → 1 from the baseline | .35s | Scrubbed contexts reverse |
| Dot leaders (contents, controls) | enters | scaleX 0 → 1 from the left | .6s `draw` | Stays |
| Proof mark (strike, caret) | scrubbed | stroke-dashoffset | the range of its section | Exact |

### Section and narrative motion (desktop ≥ 1100px)

**Act I — The record** (hero, Chapter I and Chapter II share one pinned stage, "the desk", about 300vh)

| Beat | Scroll | What moves | Meaning |
|---|---|---|---|
| Load | time-based, 0–2.4s | H1 lines are set by mask. Margin fragments settle in (clip-path wipe). Then **six ink leaders draw from the fragments and converge on one word, "knows"**, and a superscript ¹⁻⁶ inks in. | Collective intelligence as one image: many sources, one claim. |
| Pull back | 0 → 0.22 | Leaders retract into their fragments. The camera group scales 1 → .3, revealing that the title page is one page among many: the community's record laid out on the desk. | Scale. "Decades of member-built knowledge." |
| Scatter | 0.22 → 0.45 | The pages drift apart and tilt slightly; two slide off the desk edge. Dashed leaders stop short in "Qy." queries. The Chapter I text plate is set. | "Insights sit scattered across inboxes, drives, and disconnected tools." Knowledge walks out at handover. |
| Four systems | 0.45 → 0.6 | The pages settle into four columns: AMS · CRM · LMS · Content, in a quantized diagonal wave. The column captions ink in. | This is where the knowledge lives today. The systems never merge. |
| The layer | 0.6 → 0.78 | A flat vellum sheet slides up *over* the columns; the columns do not move. The Chapter II text plate is set. | "We sit above your existing systems." |
| Organize · Connect · Activate | 0.78 → 1 | A proofreader's brace, ends turned in, draws under the four systems (organize). The pages that bear on the question are marked in ink and wired down their column gutters into the brace, while the rest recede under the layer (connect). A stem drops from the brace's centre nib onto the question, and a caret and underline ink it (activate). | The three verbs as three marks. |

**Act II — The answer** (Chapter III, the signature sequence, pinned about 260vh)

| Phase | Scroll | Motion |
|---|---|---|
| Match-cut | before 0 | Chapter II's slip is taken off the desk. The page of Chapter III rises from a band just under the vellum's question, and its own question is already in place, at the same size, so the italic note is *set* in roman type rather than replaced. The title card holds; then the question travels to the head of the page. Reverses exactly. |
| Entry | 0 → .08 | Five galley rules draw on the lines' real baselines. The notes arrive at full strength; being cited is shown by the wash and the leader, never by dimmed text. |
| Transformation | .08 → .76 | Five insertions of about 13.5% each. For each one, the note wakes and its key phrase takes the ink wash. The leader leaves the note from its outer edge, runs down the gutter channel, and turns into the clear band under the line (between one line's glyphs and the next) to a small caret at the insertion point. No ink ever crosses a glyph. The clause is then set word by word from there. **The same phrase is washed again where it lands in the answer**: a highlight rhyme that carries the source into the text, and the finished answer shows it. Each galley rule retires once its line is set. |
| The person | inside insertion 5 | Nothing rides. The leader draws out *empty* to a dashed double frame: "Not written down." The clause names the past chair. |
| Information reveal | .76 → .86 | All five leaders redraw together, and the trail readout completes: `SOURCES 4 · PERSON 1 · TRAIL RECORDED` (illustrative). |
| Climax | .86 → .94 | The leaders retract into their insertion points (the person's too). Gather lines run left from each one in the band under its line, the vertical *stet* draws down through their ends, and the gather lines retract into it. |
| Resolution | .94 → 1 | Still hold. The vertical line continues below the stage and becomes Chapter IV's audit trail. |

**Chapters IV–IX** flow in normal layout, with scroll-linked figures:

| Chapter | Figure motion | Intensity |
|---|---|---|
| IV — The trail comes with it | The trail line draws down as you read. Each step's node inks, then the access labels (Members / Staff only / Board). | pause / proof |
| V — Ask once (Sage) | Three illustrative question slips arrive. Sage's caret **steps in quantized clicks** (steps easing, no sliding) and routes each slip to the agents bracket, which is stamped `ROUTED`. It implies nothing about what individual agents do. | acceleration |
| VI — The organization that never forgets | The fore-edge of the volume, 1996–2026 in hairline strata, is drawn by scroll. Role tags (Chair · 2013–16 …) fade as their leaders persist, and new hairlines deposit each year. | reflective pause |
| VII — Bound in trust (security) | A hard edge of charcoal, with an ink spine drawn across its top. The eight controls tick on as dot-leader spec lines. Almost nothing else moves. | stillness |
| VIII — Reports and working papers | Reserved offprints are tipped in on a strip of desk, and the Labs papers are set as a contents list with dot leaders. | light |
| IX — Afterword and back matter | A dele stroke draws through "automate". "together" inks purple, then settles to charcoal. **The final leader travels and becomes the underline of "Book a conversation".** | resolution |

## 5. The evolving motif: caret and leader

| Where | State of the motif |
|---|---|
| Hero | Six leaders converge on one word: many sources, one claim. |
| I — Scattered | Leaders break into dashed lines and stop short in queries ("Qy."): provenance lost. |
| II — The layer | Leaders reconnect across systems. A bracket groups, and a caret activates. |
| III — The answer | The caret inserts five times. The fifth leader runs out empty to a person. |
| IV — The trail | All the leaders straighten into one vertical audit trail. |
| V — Sage | The caret becomes a switch that steps in decisive clicks. |
| VI — Memory | Leaders outlive the people who drew them: tags fade, lines stay. |
| VII — Binding | Leaders become dot leaders in the controls list (light ink on charcoal). |
| IX — Close | A proofreader's correction, then the last leader underlines the call to action. Resolved. |

## 6. Rhythm

The pacing follows impact → calm → discovery → pause → acceleration → resolution:

- **Impact:** the hero convergence.
- **Discovery:** the pull back and scatter.
- **Acceleration:** four systems → layer → three verbs.
- **Climax:** the answer.
- **Pause:** the trail.
- **Acceleration:** Sage.
- **Reflective pause:** memory.
- **Stillness:** binding.
- **Lightness:** field reports and Labs.
- **Resolution:** together → Book a conversation.

## 7. Responsive art direction

| Width | Composition |
|---|---|
| ≥ 1100px | Full spread: folio column, text, gutter channel and margin column. Acts I and II are pinned. The stage needs at least 600px of height. Shorter windows, including 200% zoom, get the Pocket Edition. |
| 900–1099px | Compact spread: narrower margin. Acts I and II are pinned with shorter ranges. |
| < 900px, the "Pocket Edition" | A separate composition, described below. |

The Pocket Edition:
- The margin moves to the foot of each paragraph.
- Leaders become a vertical *gutter rail*: a hairline at the left edge that grows with scroll and connects each marker to its note.
- Act I is not pinned. The desk becomes an inline scroll-scrubbed figure.
- Act II uses a short pin, and the notes rise from a tray into the galley.
- There is no Lenis. Native momentum scrolling is used, and all tap targets are at least 44px.

## 8. Reduced motion and no-JS

"With motion off, the record reads the same." This applies with `prefers-reduced-motion: reduce`, with the running-head **Motion: Off** toggle, and without JavaScript.

- Lenis, pins, scrubs, drift and text splitting are all removed.
- Every figure renders in its finished state:
  - the hero with its converged leaders;
  - the desk as a static scattered plate;
  - the systems under the layer;
  - the fully cited answer with its notes and the person frame;
  - the trail;
  - the fore-edge;
  - the controls.
- The base CSS *is* this static edition. The motion layout is added by JavaScript (`html.motion`), and start states are only ever set from JS.
- Still allowed: 150ms opacity changes for hover, focus and the Contents slip.

## 9. Engineering rules

- Everything is set up inside `gsap.matchMedia()` with desktop, mobile and reduced-motion conditions, so it reverts automatically. The toggle calls `matchMediaRefresh()`.
- Only transform, opacity, clip-path and stroke-dashoffset are animated. There are no animated filters or box-shadows.
- The pinned element itself is never animated, only its children.
- Leader geometry is measured in stage-local coordinates after `document.fonts.ready` and rebuilt on ScrollTrigger refresh.
- Headings are split by lines only, with the original kept for assistive technology (an aria-hidden split copy). Nothing is split by characters.
- Content inside pinned stages is real DOM, in reading order. Focusing an element inside a stage scrolls the stage to the phase where that element is shown.
- Text is the LCP element. Fonts are self-hosted (Fontsource) with `font-display: swap`, and metric-matched fallbacks keep CLS low.
