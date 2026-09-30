# Motion system

> **Superseded on 2026-09-26** with the first direction. The current motion is described in [04-bright-and-playful.md](04-bright-and-playful.md#motion).

One verb — **register** (offset → aligned) — and a small set of tokens. No one-off timings: every tween in `src/scripts/motion/` reads from `src/scripts/motion/tokens.ts`, which mirrors the CSS custom properties in `src/styles/tokens.css`.

## Tokens

### Easing
| Token | GSAP | CSS | Use |
|---|---|---|---|
| `register` | `expo.out` | `cubic-bezier(.16, 1, .3, 1)` | Plates converging, reveals, arrivals |
| `settle` | `back.out(1.7)` | `cubic-bezier(.34, 1.56, .64, 1)` | The final 180 ms click; stamps only |
| `drift` | `sine.inOut` | `cubic-bezier(.37, 0, .63, 1)` | Idle misregistration, hover parting |
| `exit` | `power3.in` | `cubic-bezier(.55, 0, 1, .45)` | Leaving elements, page-out |
| `sweep` | `power3.inOut` | `cubic-bezier(.65, 0, .35, 1)` | Page transitions, chapter grounds |
| `scrub` | `none` | `linear` | Scroll-linked scenes (smoothed by `scrub: 0.6`) |

### Duration
| Token | ms | Use |
|---|---|---|
| `micro` | 160 | Colour, underline, focus ring |
| `small` | 320 | Buttons, nav items, hover parting |
| `line` | 600 | Text line reveals, hairline draws |
| `plate` | 900 | Plate convergence (+ `settle` 180) |
| `scene` | 1200–1600 | Opening, page transitions |
| `count` | 1200 | Digit roll |

### Stagger
letters 18 ms · lines 70 ms · rows 40 ms · plates 80 ms (sheet → register → shelf) · digits 30 ms.

### Offsets
Type plates ±0.06–0.12em · image plates ±10–24px · opening ±3–6vw · hover parting ±4px (type) / ±6px (image).

### Triggers
- Reveal-once: `start: 'top 80%'`, `once: true`. No reverse on scroll-up — content, once registered, stays registered.
- Scroll-linked scenes: CSS `position: sticky` stages driven by one ScrollTrigger progress value (`scrub: 0.6`); lengths 150–320vh. Sticky rather than GSAP pinning keeps layout stable and trivially disabled.
- Smooth scrolling: Lenis (`lerp 0.1`, wheel only) on fine pointers when motion is allowed. Touch uses native scrolling. Scrolling is never hijacked: no snapping, no locking, no speed changes to the visitor's input.

## Device and preference matrix

Decided once in `runtime.ts` with `gsap.matchMedia()`:

| Condition | Behaviour |
|---|---|
| `prefers-reduced-motion: reduce` | No Lenis, no sticky scenes (static compositions instead), no transforms; ≤ 200 ms opacity crossfades; counters show final values; videos show posters with a play control; View Transitions off. |
| Fine pointer, motion OK | Everything, including pointer-driven misregistration, loupe, hover parting and Lenis. |
| Coarse pointer (touch) | Scroll-linked scenes kept (lighter tilt), hover effects replaced by tap states and inline thumbnails, velocity drift instead of pointer drift, native scroll, horizontal rack becomes scroll-snap. |
| Save-Data or 2G | Recordings replaced by posters. |

## Performance rules
- Animate only `transform`, `opacity`, `clip-path` and CSS variables that feed them. No layout properties.
- Blend modes (`multiply` / `screen`) only while plates are moving; ghost plates are set to `opacity: 0; visibility: hidden` once registered.
- One playing video at a time (IntersectionObserver + centred-card rule).
- Heavy scenes (thesis, exploded plates, rack, loupe) are loaded with dynamic `import()` only when their element exists.
- `will-change` is added at the start of a tween and removed on complete.

## Accessibility rules
- Content is readable before and without any animation (server-rendered, including every number).
- Split text is reverted after playing; the element keeps an `aria-label` while split.
- Focus-visible styles are never animated away; focus rings use a 2px register-blue outline with 3px offset (paper) or a paper outline (dark/red grounds).
- Hover affordances have keyboard equivalents: the loupe opens on `:focus-visible`; plates part on focus.
- The opening never blocks input and completes on the first key, wheel, touch or click.

## Signature moments (implementation map)

| Moment | File | Driver |
|---|---|---|
| Opening registration | `opening.ts` | GSAP timeline, sessionStorage for returning visits |
| Hero press | `hero.ts` | pointer → quickTo on CSS vars `--rx/--ry/--bx/--by` |
| Sheet → Register → Shelf | `thesis.ts` | one ScrollTrigger progress → timeline.progress() |
| Exploded plates | `exploded.ts` | ScrollTrigger progress + pointer orbit (±12°) |
| Proof loupe | `loupe.ts` | pointer lerp 0.15, clip-path circle 0 → 44% |
| Counted numbers | `counters.ts` | digit columns, 30 ms stagger |
| The register rack | `rack.ts` | sticky track, translateX from progress |
| Contact finale | `contact.ts` | clipboard + plate snap + stamp |
| Page transitions | CSS `@view-transition` + `transitions.ts` | cross-document View Transitions, `pageswap`/`pagereveal` naming |
