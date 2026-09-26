# The blog and the reviews, rebuilt as sections of this site

Mousa's request: *add the blog as part of the main website, same design, and the reviews as another part, same design — don't hook multiple websites together; create the pages within the same site.*

Both sections are generated from content fetched on GitHub Actions (this container can't reach his hosts): `.github/workflows/content.yml` and `sheets.yml` run `scripts/capture/content.mjs`, `blog-probe.mjs` and `review-sheets.mjs`, which only read public pages. The converters then run locally: `node scripts/content/blog.mjs` and `node scripts/content/reviews.mjs`.

## Blog — `/blog/`

- **Source:** the post list and order come from the live `/blog/` index (36 entries with topic, date, excerpt and cover). Full text comes from the WordPress REST API on work.mousabatarseh.com (16 posts).
- **16 posts → full pages** at `/blog/<slug>/`: cleaned to safe HTML (paragraphs, headings, lists, quotes, code, tables, images), images re-encoded to local WebP at two widths, links between posts rewritten to their new pages, reading time computed, JSON-LD `BlogPosting` + breadcrumbs, a share card each.
- **20 posts → summaries only.** Their links on the live index answer with the blog index itself, and a probe of every usual WordPress route (feed, `?rest_route`, `?name`, sitemaps, `/index.php/…`) found no article text on either domain (`capture/content/blog/probe.json`). They appear on `/blog/` as clearly labelled summary cards (title, date, topics, excerpt, cover — exactly as the live index shows them). **No article text was written for them.** If Mousa has the drafts, dropping them into the fetch (or WordPress) and re-running `blog.mjs` turns each into a page.
- The home page's "Notes" and the case studies' reading links now open these pages.

## Reviews — `/reviews/`

- **Source:** the reviews site's index (22 reviews), each review's summary page (`/reviews/reviews/<slug>/`: the headline number, three findings, site, dates, focus areas) and every sheet of each full review (`/<name>-review/` plus the sheets it links to: 1–11 per review).
- **22 reviews → pages** at `/reviews/<slug>/`: the number that explains the rest, the three findings, then the full review sheet by sheet with the first screen of each sheet as published. Every sentence is the review's own.
  - Tab panels (several reviews hide content behind tabs) are shown in full, each titled with its tab's label.
  - Prototype sheets (the interactive fixes) keep their explanatory text and a screenshot; their interface labels are kept as compact chip rows rather than dropped, so no words are lost, but the interactions themselves are not rebuilt here.
  - Each review keeps its disclaimer ("Independent, unsolicited review … not affiliated with …").
  - **Not linked:** the résumé and cover-letter PDFs attached to four reviews (Carhartt Reworked, Déhanche, Hay House, ICR). They are personal application documents; linking them is Mousa's call.
- The archive (`/work/`) now lists all 22 reviews, not six, each opening its page here; the home review cards do the same.

## What stays on the live domain

Nothing on the live sites was changed. After approval, `docs/deploy.md` describes replacing the `/blog/` and `/reviews/` indexes and the redirects the old URLs need (`deploy/redirects.htaccess`). The full-review folders (`/<name>-review/`) are left in place unless Mousa chooses to redirect them.
