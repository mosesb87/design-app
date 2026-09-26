# QA report — "In Register"

> **Draft:** the round 4, final Lighthouse and WebKit re-run results are still being filled in (the `{{…}}` markers below).

Tested on 2026-09-26 against production builds of this branch (`npm run build`), served locally and on the private Vercel preview. Every number below comes from a tool run whose output is in the repository or reproducible with the commands at the end. Where a check could not be run, or a tool has a known blind spot, it says so.

## Summary

| Area | Result |
|---|---|
| Pages × viewports × motion modes | 15 pages × 6 viewports × 2 modes = 180 runs per full round; four rounds |
| Final round | {{ROUND4}} |
| Layout shift (CLS) | 0 on every page and viewport in the last two rounds (was 0.054 on a small phone in round 1) |
| Horizontal overflow | None at 360, 375, 390, 430, 834, 1366, 1440 or 1920 px |
| Accessibility | axe-core (WCAG 2.0/2.1/2.2 A + AA) clean at the top of every page and on screen at the bottom, desktop and phone, both motion modes; Lighthouse accessibility 100 |
| Performance | {{LIGHTHOUSE_SUMMARY}} |
| Page weight | 150–175 KB per page before images, 53.5 KB of it JavaScript (gzipped), printed in each page's footer |
| Interactions | 42/42 in Chromium, Firefox and WebKit |
| Cross-browser | Chromium 141, Firefox 142, WebKit 26 (Playwright, Linux): 35 Firefox/WebKit runs, 0 issues; every font file fetched once |
| Links | 1,284 internal references in the build, 0 missing; 89 external URLs checked from GitHub Actions, 4 hosts refuse automated requests (labelled on the site) |
| Console | No errors or warnings, apart from Firefox's advisory about scroll-linked effects (explained below) |

## Method

- **Viewports:** small mobile 360×740, large mobile 430×932, tablet 834×1194, laptop 1366×768, desktop 1440×900, large desktop 1920×1080. Phones and the tablet run with touch and mobile emulation.
- **Modes:** full motion, and `prefers-reduced-motion: reduce`.
- **Per run** (`scripts/qa.mjs`):
  - Scroll-sampled screenshots, forward and back.
  - Overflow measured against the device width, not `innerWidth`, since mobile emulation widens the layout viewport to hide overflow.
  - Content that vanishes when scrolling back up.
  - Tap targets under 24×24 px (WCAG 2.2 2.5.8).
  - A 40-stop keyboard pass: every focused element must be on screen with a visible outline.
  - Console errors and warnings, and failed requests.
  - CLS with the element that moved, and LCP.
  - axe-core, twice: at the top after a full scroll, and at the bottom restricted to what is on screen.
- **Interactions** (`scripts/interactions.mjs`):
  - The skip link, every nav link and the mobile menu (open, Escape, focus return, tap to navigate).
  - The six featured cards, all six archive filters (row counts and `aria-pressed`) and the loupe.
  - Every case study's single `h1` and next link, and the recording play/pause.
  - `mailto:`, `tel:` and copy-email (clipboard contents), and the 404 (status and page).
- **Cross-browser** (`scripts/browsers.mjs` on GitHub Actions): Firefox and WebKit at desktop and phone sizes, plus WebKit with reduced motion. Checks cover status, overflow, stuck reveals, console, failed requests and view-transition support, with screenshots in `docs/qa/browsers/shots/`.
- **Lighthouse 12:** mobile and desktop presets against the production build, served with gzip and cache headers.
- **Links** (`scripts/linkcrawl.mjs`): every `href`, `src`, `srcset`, `poster`, `data-src` and `url()` in the build must resolve. External URLs are checked from GitHub Actions (`capture/reports/links.json`), because this container cannot reach them.
- **Visual review:** contact sheets of every page at every viewport, read by eye after each round.

## Rounds

### Round 1

180 runs, plus a visual review.

| Found | Fix |
|---|---|
| Detail-crop captions failed contrast (10 runs): small red text on the red contact chapter ground | Small red text follows the chapter ground (`--sheet-text` per ground) |
| CLS 0.054 on the 360 px home page, from the thesis scan line animated with `left` and the hero slug being typed | Scan line is now a transform; the slug's height is held while it types |
| Thesis plates covered the heading at 360×740 | Less plate separation on short phones, and the stage sits lower |
| Long review figures ("$9.50 / $18.99") ran into the next column on desktop and off-screen on phones | Each figure is sized to fit its column |
| The email in the red finale wrapped one letter onto its own line at 360 px | Sized to its row |
| Registration ghosts widened the page by 4 px on phones. The harness missed this; the cross-browser dry run caught it | Root clip that keeps sticky scenes working; the harness now measures overflow correctly |
| `astro check`: 3 type errors | Fixed (0 errors) |

### Lighthouse and axe pass

- Mobile home LCP was 4.1 s, simulated. Eight video posters (about 400 KB) were fetched at load, far below the fold. Posters are now lazy images, and the result is 2.2 s.
- Accessibility scored 93–96. The findings were:
  - `aria-label` on `<p>` (split-text, counters, slug).
  - A featured-card link whose name didn't match its visible text.
  - A badge at 4.0:1.
  - Dimmed inactive thesis steps (32% opacity).

  All are fixed, and the score is 100 on every page tested.
- The 404 page carried a canonical URL for `/404/`. It is now `noindex` with no canonical.

### Round 2

Motion pass: 90 runs. The reduced-motion pass was stopped after 13 runs because the build had changed.

- The new featured-card link was a 17 px tap target, and its focus ring sat on a stretched overlay. It is now 32 px, with a ring on the link.
- axe findings on five case pages were a harness artefact. The keyboard pass had left the page at the red finale, so off-screen content was measured against red. axe now runs before the keyboard pass, plus an on-screen check at the bottom.
- Tablet review:
  - The thesis stage was too small. It now scales for 700–1023 px.
  - Reviews were stacked. At tablet width each review now sits beside its plate.
  - The contact details touched their neighbours. The ledger now uses wider columns.

### Cross-browser fixes (between rounds 2 and 3, and after)

- WebKit: a paused recording could restart. The toggle now decides from its own state, and a manual pause is remembered until the recording leaves the screen.
- WebKit fonts were downloaded twice: a test-server artefact (see *Cross-browser notes*), confirmed by counting requests under production headers.
- Two interaction-test races, not site bugs, were fixed in the test:
  - Firefox reported "Image corrupt or truncated" when the test left a page before its images finished loading. The file decodes completely.
  - A WebKit click landed during smooth scrolling.

### Round 3

180 runs: **0 findings.** No overflow, stuck reveals, small targets, focus problems, console errors, failed requests or axe violations. CLS was 0 on every run.

### Round 4 (release candidate)

{{ROUND4_DETAIL}}

## Performance

{{LIGHTHOUSE_TABLE}}

Lighthouse was run locally against the production build, served with gzip and immutable asset caching. Vercel adds Brotli and HTTP/2, and cPanel hosting will differ. There is no field data yet. In real throttled Chrome (slow 4G, 4× CPU) the home LCP element, the wordmark, painted at 964 ms, the same moment as first paint.

## Cross-browser notes

- **Firefox 142:** all pages pass. Firefox logs an advisory that the site "appears to use a scroll-linked positioning effect". That describes the pinned, scroll-driven scenes, which are intentional. Firefox has no cross-document View Transitions yet, so pages change with a normal navigation.
- **WebKit 26:**
  - All pages pass, and View Transitions work.
  - Fonts: when the build was served with `Cache-Control: no-cache` (the Astro preview server), WebKit fetched each preloaded font twice and warned that the preload went unused. Under production headers (`/_assets/` immutable, as in `vercel.json` and the upload package) it fetches each font once and the warning disappears. The test now counts font requests per page, and the cross-browser run serves the build with the production headers (`scripts/serve.json`).
  - Recording play/pause: a manual pause now sticks until the recording leaves the screen. Earlier, WebKit could restart it.
- **Chromium (local):** this Chromium build has no H.264 decoder, so recordings are verified in Firefox and WebKit on Actions. Chrome, Edge and Safari all play H.264.

## Accessibility notes

- Keyboard:
  - The skip link is the first stop.
  - Every focus state is visible.
  - The mobile menu moves focus inside when it opens, closes on Escape and returns focus to its toggle.
- Split-text reveals keep whole words in the DOM, with no fragments.
- Counters and the typed slug expose their full value as text while they animate.
- Reduced motion is a designed state, not a disabled one:
  - Pinned scenes render as their final compositions.
  - The rack becomes a vertical list.
  - Recordings wait behind a play control.
- **Known blind spot:** axe-core 4.13 doesn't treat `overflow: clip` as clipping. That flags rack cards that are off-screen to the right of the pinned track. They are excluded from the top-of-page check, and the reduced-motion pass checks the same cards in the same colours as a vertical list.

## The brief's critical questions

**Does this feel designed specifically for Mousa Batarseh?**
Yes. The concept is his own sheet / register / shelf thesis from /v2. The pinned scene runs his own example, a $19.20 promotion against a $25.60 register price. The receipts are his dated reviews, and the footer prints each page's measured weight. That's "counted, not claimed" applied to the site itself.

**Is there one clear and memorable creative concept?**
Yes: registration. Three plates (sheet red, register blue, ink) line up into one image. It drives the wordmark, headings, image reveals, the thesis scene, page transitions, the contact finale and the 404 ("Out of register").

**Do typography, graphics, content and motion feel like one system?**
Mostly, yes. There is one verb (align), three plates, crop marks and proof slugs, and one easing family. The weakest joins are the services list and the Notes list. They are typeset in the system's slug language, but structurally they are conventional lists.

**Is motion meaningful across the full experience?**
On the home page and the case studies, yes. Motion either shows a check happening or brings something into register. The About page is deliberately calmer, with line reveals and registration on headings only. It has less motion, not decorative motion.

**Does the project presentation demonstrate professional judgment?**
- Every figure carries a source link.
- Demos, fictional-company adaptations and the independent DiaMedical study are labelled.
- Roles are quoted from Mousa's own pages, with links.
- Where a role, date or outcome was never published, it isn't stated. Eat With Samar and PTEE have no role line for that reason.
- Recordings are real sessions.

**Does mobile feel deliberately art-directed rather than stacked?**
Partly.

Deliberately re-staged for phones:
- The thesis shows one step at a time under the plates.
- Featured projects carry a mobile strip on the outer edge.
- The rack becomes a swipeable track.
- The archive becomes cards with thumbnails.
- Review figures scale to the column.
- Tablets now get their own layouts for the thesis, reviews and contact details.

Still essentially stacked: the services and notes lists, and the case-study "details" crops.

**Could any section belong unchanged to a generic AI-generated website?**
The services section is the closest: four capability groups with tool lists. The copy and the slug styling are specific, but the pattern isn't. Everything else depends on this concept or this content.

**Does the final result feel worthy of an excellent agency portfolio?**
The system, craft and testing are at that level. Two limits remain:
- The imagery is screenshots of real client sites, and some of those sites are dated. The framing (crop marks, ghosts, details) helps but can't redesign them.
- There is no bespoke photography or illustration. That was a deliberate choice, since the brief asked for real assets, nothing purchased and nothing invented.

## Known limitations

- **Emulation only.** No real phones or tablets were used. iOS Safari is approximated by Playwright's WebKit on Linux.
- **Captured sites.** Screenshots of client sites show them as they were on 2026-09-26 (dated on every plate). They will drift as those sites change.
- **Hosts that block automated checks:** interviewdemo.mousabatarseh.com, mawtinidabke.com, /Larkspur/ and stmaryberkley.org return 403 to scripted requests. They are labelled "Host blocks automated checks" in the archive, not removed.
- **Unfound post URLs.** Four blog posts are listed on /blog/, but their URLs couldn't be found:
  - Shopify Wholesale Store Setup
  - B2B Collections
  - Restaurant Websites That Work on a Phone
  - Building a WordPress Event Website

  The related links use posts with confirmed URLs instead.
- **Facts only Mousa can settle:** see *Confirm before launch* in the PR description.
- **Preview SEO.** The preview is `noindex` and behind Vercel Authentication by design, so Lighthouse SEO on the preview itself would fail by design. The production package passes.

## Re-running

```bash
npm ci && npm run build
npx astro preview --port 4321 &          # serves dist/ with the 404 page
node scripts/qa.mjs --axe                # 180 runs → qa/report.json + qa/shots/
node scripts/interactions.mjs            # nav, menu, filters, cases, recordings, contact, 404
node scripts/linkcrawl.mjs dist          # internal links and assets
# Firefox + WebKit: bump docs/qa/browsers-run.json and push (runs on GitHub Actions)
```
