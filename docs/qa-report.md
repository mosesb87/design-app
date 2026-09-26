# QA report — the bright and playful site

Covers the redesign (direction 2, [04-bright-and-playful.md](04-bright-and-playful.md)) and the two new sections, the blog and the reviews ([content-sections.md](content-sections.md)). The first direction's four rounds are summarised at the end.

## Summary

| Check | Result |
|---|---|
| Pages | 55: home, /work/, 11 case studies, /blog/ + 16 posts, /reviews/ + 22 reviews, /about/, 404 |
| All-pages sweep (every page, phone + desktop, axe) | 110 runs. Findings fixed below; re-checked clean |
| Six viewports × motion and reduced motion | 120 runs (10 representative pages × 6 viewports × 2 modes): **0 findings** — no overflow, disappearing content, axe violations, small targets, focus problems, console errors or failed requests; CLS 0 on every run; LCP at load ≤ 476 ms locally |
| Interactions (Chromium) | 60/60 after fixes |
| Firefox 142 / WebKit 26 (Actions) | {{BROWSERS}} |
| Lighthouse 12 (9 pages × mobile + desktop) | Accessibility, best practices and SEO **100** on all 18 runs; performance 100 on desktop, 97–99 on mobile, except the home page (92–95, see *Known limitations*) |
| Internal links and assets | 3,098 references, 0 missing; in-page anchors checked too |
| Type check | `astro check`: 0 errors |

## Method

- **Viewports:** small mobile 360×740, large mobile 430×932, tablet 834×1194, laptop 1366×768, desktop 1440×900, large desktop 1920×1080. Phones and the tablet run with touch and mobile emulation.
- **Modes:** full motion, and `prefers-reduced-motion: reduce`.
- **Per run** (`scripts/qa.mjs`): scroll-sampled screenshots forward and back; overflow against the device width; text that vanishes scrolling back up (named); tap targets under 24×24 px, with inline links in running text exempt as WCAG 2.2 2.5.8 allows; a keyboard pass (every focused element on screen, with a visible outline); console errors, failed requests; CLS with its source, LCP; axe-core (WCAG 2.2 AA) at the top after a full scroll and again on screen at the bottom.
- **All-pages sweep:** `--pages=all` runs every page in the build at phone (430) and desktop (1440) with axe.
- **Interactions** (`scripts/interactions.mjs`): skip link, every nav link, the phone menu (open, Escape, focus return, tap); the home cards' stretched links; every filter on /work/, /blog/ and /reviews/ (visible rows = chip count, `aria-pressed`, the spoken status); every blog and review card opens a page on this site with one `h1`, its text and working in-page anchors; every case study's `h1` and next link; the recording control; `mailto:`, `tel:`, copy-email; the 404.
- **Cross-browser** (`scripts/browsers.mjs` on GitHub Actions): Firefox and WebKit at desktop and phone sizes, plus WebKit with reduced motion, on 12 pages including the blog and reviews; then the interaction suite in both engines.
- **Lighthouse 12:** mobile and desktop presets against the production build served with production headers (`scripts/serve.json`).
- **Links** (`scripts/linkcrawl.mjs`): every `href`, `src`, `srcset`, `poster`, `data-src` and `url()` in the build must resolve; `#anchors` must exist on their page. HTML is parsed, so code samples in review text are never mistaken for links.

## What the rounds found, and the fixes

### Round 1 — all 55 pages, phone and desktop (110 runs)

| Found | Fix |
|---|---|
| Four reviews showed a sentence where the brand belongs (Lume, Oakwood Veneer, JB Tools, BioTRUST). Their headline numbers carry a unit or prefix ("25%", "6.6s", "$36"), which shifted the lines the converter read | The converter now anchors on the "Brand · kind" line and reads the number from the review's own markup |
| Scrolling code blocks in 12 reviews couldn't take keyboard focus (axe `scrollable-region-focusable`) | Code blocks are focusable |
| A DiaMedical card link wrapping paragraphs sat inside a paragraph; browsers split it into an empty link (axe `link-name`) | Links that wrap blocks are kept out of paragraphs |
| Card links (reviews, case studies, "more like this") drew their focus ring on the card, which the keyboard check couldn't see; the nav logo and Work link were off-screen when focused while the nav was tucked | Links show their own ring (ink or white by ground); the nav shows at once when a link in it takes focus |
| CLS 0.057 on a case study at 430 px: the receipt counters changed line height while counting | Counters keep `line-height: 1` |
| An inline link in a review caption measured 142×19 | Article links get vertical padding (24 px); inline caption links are exempt as running text |
| Desktop home, scrolling back up: the check scene's cards were invisible until the pin began | Cards are dealt as the section arrives; the scrub drives only the check. Its fail stamp and verdict rewind by design (`data-rewinds`) |

### Interactions (Chromium): 59/60 → 60/60

- Clicking the image on a home site card (or a /work/ case card) didn't open the case study: the 3D-lifted capture sat in front of the stretched link. The captures now let clicks through.

### Cross-browser

- **WebKit 26:** every page clean at desktop, phone and reduced motion. Interactions found a real bug on a later run: "Let's talk" stopped 6,000 px short of the contact section (scrollY 16,658 of 22,690). The smooth scroller (Lenis) caps scrolls at its own measurement of the page, and right after load it still measured the page before the pinned scenes added their spacing (16,691 px of 23,402 in Chromium too, catching up about 1.5 s later). Lenis now re-measures on every ScrollTrigger refresh and before each in-page jump; an immediate click now lands. The check itself now polls and reports where the scroll landed, rather than looking after a fixed 1.6 s.
- **Firefox 142:** every page loads; its only messages are the advisory that the site "appears to use a scroll-linked positioning effect" (the pinned scenes — intentional). Interactions were 59/60: "Too many calls to Location or History APIs". Firefox allows about 200 History calls per 10 seconds per tab. Two things added up: filters wrote the URL on every click (now once clicking stops, and history updates can't throw), and ScrollTrigger switches `history.scrollRestoration` to manual and back while it measures — 9 writes a page, now 6 (only real changes are written). The suite loaded 38 blog and review pages in one tab within seconds; it now opens each in its own tab, as a visitor would. Forcing `manual` permanently would remove the count entirely but break the Back button's scroll restoration, so the site keeps the default. {{FIREFOX_RERUN}}

### Lighthouse

| Before | After |
|---|---|
| Blog post, mobile: TBT 240 ms, one 290 ms start-up task (ScrollTrigger re-measured the long page several times) | Start-up refreshes coalesced into one: TBT 0 ms, performance 99 |
| Oakwood review: accessibility 99 (a heading skipped a level where the source did) | Review headings step down one level at a time |
| Home, mobile: LCP 3.1 s | 2.9–3.1 s across runs, after dropping the mono-font preload and popping stickers from 25% scale. See *Known limitations* |

## Performance

| Page | Mobile (perf / a11y / BP / SEO) | Mobile LCP · TBT | Desktop | Desktop LCP |
|---|---|---|---|---|
| `/` | 92 / 100 / 100 / 100 | 3.1 s · 90 ms | 100 / 100 / 100 / 100 | 0.7 s |
| `/work/` | 97 / 100 / 100 / 100 | 2.4 s · 10 ms | 100 / 100 / 100 / 100 | 0.7 s |
| `/work/asas-studio/` | 99 / 100 / 100 / 100 | 2.1 s · 0 ms | 100 / 100 / 100 / 100 | 0.6 s |
| `/about/` | 99 / 100 / 100 / 100 | 1.7 s · 0 ms | 100 / 100 / 100 / 100 | 0.5 s |
| `/blog/` | 99 / 100 / 100 / 100 | 1.9 s · 10 ms | 100 / 100 / 100 / 100 | 0.6 s |
| `/blog/on-page-seo-large-product-catalog/` | 99 / 100 / 100 / 100 | 2.1 s · 0 ms | 100 / 100 / 100 / 100 | 0.5 s |
| `/reviews/` | 99 / 100 / 100 / 100 | 1.8 s · 0 ms | 100 / 100 / 100 / 100 | 0.5 s |
| `/reviews/hayhouse/` (longest review) | 97 / 100 / 100 / 100 | 2.4 s · 10 ms | 100 / 100 / 100 / 100 | 0.6 s |
| `/reviews/oakwood/` | 99 / 100 / 100 / 100 | 1.7 s · 10 ms | 100 / 100 / 100 / 100 | 0.5 s |

CLS is 0 on every run. Page weight before images: about 164–168 KB, of which 53 KB is JavaScript (gzipped); the footer of each page prints its own measured weight. The home page scored 95 (LCP 2.9 s) on the previous run with the same build settings; Lighthouse's simulated mobile numbers vary by a few points between runs.

Lighthouse ran locally against the production build with gzip and immutable asset caching; mobile uses simulated slow 4G and 4× CPU. Vercel adds Brotli and HTTP/2; cPanel hosting will differ. There is no field data yet.

## Accessibility notes

- Every page: one `h1`; skip link first; visible focus everywhere; the phone menu traps and returns focus.
- Page titles animate letter by letter, but the heading's accessible name is the whole title (a visually hidden copy); the letters are `aria-hidden`.
- Filters announce "N posts shown" / "N reviews shown" / "N entries shown".
- Reduced motion is designed: titles and stickers are simply there, the check scene shows its final state, the tools rack becomes a list, cards don't pop or tilt, and page changes don't animate.
- Review sheets: tab panels are shown in full with their tab labels as headings, so nothing is hidden behind a control that no longer exists.

## The brief's critical questions (for the new design)

**Does this feel designed specifically for Mousa?** The palette and stickers could belong to any playful studio; what makes it his is what they carry: a $19.20 price tag, a spreadsheet cell with a $25.60 register price, a magnifier, a check seal — the objects of catalog and promotion work — and a home page that runs his own check (sheet $19.20 vs register $25.60, check 04 fails, blocked before a menu). The reviews lead with his own counted numbers.

**Is there one clear, memorable idea?** "Every part in its place" — parts fly into slots, cards are dealt, a stale price is struck, a verdict stamps. The stickers and letters are the playful layer on top.

**Do type, graphics, content and motion feel like one system?** Yes: one display face at one width, one set of rooms and pills, one sticker family, one pop easing. The review sheets are the loosest join: they are Mousa's documents re-set in this type, and prototype sheets keep their interface labels as chips.

**Is motion meaningful?** On the home page it shows the work (parts into slots, the check). Elsewhere it is welcome and feedback (titles, cards, filters), deliberately lighter on long reading pages.

**Does mobile feel art-directed?** Stickers are re-placed per breakpoint, the check plays once instead of pinning, the rack becomes a swipe track, the archive becomes cards with thumbnails, review numbers scale to the card.

**Could any section belong unchanged to a generic site?** The services list on /about/ is the most conventional pattern, though its content is specific.

**Worthy of an excellent agency portfolio?** The system, motion and testing are at that level. Limits: the imagery is screenshots of real (sometimes dated) client sites, and 20 blog posts exist only as summaries until their text does.

## Known limitations

- **Emulation only.** No real phones or tablets; iOS Safari is approximated by Playwright's WebKit on Linux.
- **Home LCP on mobile (simulated) is 2.9–3.1 s**, above the 2.8 s budget. The largest early paint is the price-tag sticker's text, which waits for the display font under simulated slow 4G. Removing the intro animation would fix the number and lose the point of the hero, so it stays.
- **20 blog posts are summaries only** — their text isn't published anywhere (`capture/content/blog/probe.json`).
- **Review prototypes are not interactive here.** Each keeps its text and a screenshot of the sheet as published.
- **Captured sites drift.** Screenshots are dated 2026-09-26.
- **Hosts that block automated checks** (interviewdemo, mawtinidabke.com, /Larkspur/, stmaryberkley.org) are labelled in the archive, not removed.
- **Preview SEO:** the preview is `noindex` and behind Vercel Authentication by design; the production package is indexable and checked for it.

## Re-running

```bash
npm ci && npm run build
npx astro preview --port 4321 --host 127.0.0.1   # serves dist/ (daemonises in Astro 7)
node scripts/qa.mjs --axe                        # representative pages × 6 viewports × 2 modes
node scripts/qa.mjs --pages=all --vps=mob,desk --modes=motion --no-shots --axe
node scripts/interactions.mjs --base=http://127.0.0.1:4321
node scripts/linkcrawl.mjs dist
node scripts/axe-page.mjs /reviews/oakwood/      # one page, phone size
# Firefox + WebKit: bump docs/qa/browsers-run.json and push (GitHub Actions)
```

## The first direction ("In Register"), for the record

Four rounds of 180 runs each, a Lighthouse and axe pass, and cross-browser fixes; round 3 finished with 0 findings. That design was replaced at Mousa's request, and its layouts are gone; the fixes that carried over (overflow measured against the device width, axe before the keyboard pass, production cache headers for WebKit fonts, the recording toggle in WebKit) are part of the method above.
