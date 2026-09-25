# The Annotated Record: an independent website concept for Sapience AI

A motion-first website concept for [Sapience AI](https://sapienceai.co/), *the collective intelligence platform for professional communities*.

> **Independent design concept by Mousa Batarseh. Not an official Sapience AI website.** It is not affiliated with or endorsed by Sapience AI. Quotations are attributed to their source: Sapience AI's published words, or the industry publisher named. Scenarios and quoted fragments marked *Illustrative* are fictional and written for the concept. The deployment is kept out of search on purpose.
>
> Live at **https://mousabatarseh.com/sapienceai** (see [`docs/06-deploy.md`](docs/06-deploy.md)); staging mirror at https://sapience-concept.vercel.app.

## The idea

Sapience AI's thesis is that the intelligence already exists inside a community. It is scattered across inboxes, drives and disconnected tools, and it walks out the door when people move on. The concept treats the site as a volume of proceedings, the kind associations themselves publish. Its one rule: **print is set once, ink is live.**

- **Print** is the community's record, set in charcoal. It holds still.
- **Ink** is Sapience's purple. Every moving line connects a claim to where it came from.

The story unfolds as one continuous take:

1. A title page where six margin sources converge on one claim.
2. The camera pulls back to reveal the whole record on a desk.
3. The pages scatter.
4. They settle into four systems (AMS, CRM, LMS, content), which never merge.
5. A sheet of Sapience's layer slides over them.
6. A question is answered from the margins. Each source's phrase is carried in ink to where its clause is set, and the fifth source is a person.
7. The leaders straighten into the audit trail, and the site continues through Sage, institutional memory, security, Labs, and a final proofreader's correction that becomes the call to action.

## Documents

| | |
|---|---|
| [`docs/01-research.md`](docs/01-research.md) | Research and audit: verified facts, the hiring context, a site audit, the market, platform decisions, and content rules |
| [`docs/02-concepts.md`](docs/02-concepts.md) | Three creative directions, the judging, and the decision with its amendments |
| [`docs/concepts/`](docs/concepts/) | Full specifications of all three directions, and the judges' scorecards |
| [`docs/03-motion-system.md`](docs/03-motion-system.md) | The motion system: tokens, layers, the evolving motif, rhythm, responsive and reduced-motion rules |
| [`docs/04-qa.md`](docs/04-qa.md) | QA and critique: what was tested, what was found, and what was fixed |
| [`docs/05-launch-notes.md`](docs/05-launch-notes.md) | From concept to launch: SEO/AIO, HubSpot, Firebase, measurement, customer testing, and the plan |
| [`docs/06-deploy.md`](docs/06-deploy.md) | Serving the concept at mousabatarseh.com/sapienceai: hosting findings, upload steps, `.htaccess`, checks |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, then build static HTML5 to dist/
npm run preview    # serve dist/ on http://localhost:4173/sapienceai/
node scripts/package-sapienceai.mjs   # build deploy/sapienceai.zip for the host
```

The site is built for the sub-path `/sapienceai/` (`base` in `vite.config.ts`); links in the HTML use Vite's `%BASE_URL%`.

Options:
- Add `?present` to the address for review sessions. Keys 0–9 jump to chapters, `M` toggles motion, `P` toggles Provenance view, and `C` opens Contents.
- **Motion: Off** in the running head, or the OS reduced-motion setting, gives the complete static edition.
- **Provenance view** (in Contents or the colophon) labels every passage by where its words came from.

QA harness: `node scripts/capture.mjs http://localhost:4173/sapienceai/ ./qa-shots --steps=24 [--reduced] [--reverse] [--keyboard]` takes scroll-sampled screenshots at four viewports, with a console-error report.

## Stack

- Static multi-page HTML5 built with Vite and TypeScript. Content lives in HTML, and there is no framework runtime.
- GSAP 3.15 with ScrollTrigger, SplitText (lines and words only, never letters), DrawSVG and MotionPath, plus Lenis for smooth scrolling on desktop.
- Figures are built from SVG and HTML. The site has no raster imagery, no video and no WebGL.
- Type: Libre Baskerville (headings, statistics) and Inter (body and interface), both under the SIL Open Font License; Newsreader for annotations; IBM Plex Mono for technical tags. All self-hosted and subset. `--font-ui` names Switzer first, so a licensed copy can be dropped in; this build uses Inter.
- Palette: cream `#f5f0e9`, near-black `#141414`, white, and Sapience purple `#5a2d82` (tokens in `src/styles/tokens.css`).
- Served as static files from a folder on the portfolio's host (`public/.htaccess`); `vercel.json` keeps a staging mirror; `firebase.json` remains for a Google Cloud option.

## Structure

```
index.html  notes.html  404.html   pages (all content is static HTML)
src/styles/                        tokens, static edition, stage mode, provenance, print
src/motion/                        runtime, hero, the single take (record.ts), chapters, fore-edge, static edition
src/ui/chrome.ts                   running head, contents, fore-edge index, toggles, presenter mode, form
public/                            favicon, og.png, llms.txt, .htaccess (sub-folder rules for the host)
scripts/                           QA capture harness, Open Graph renderer, deploy packager
```
