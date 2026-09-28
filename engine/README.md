# Review Engine

ShelfMark's 29 public-page checks, turned into a standing rubric that produces a tailored, evidence-backed review of any
target store — the page, the workbook, the résumé, the cover letter and the one-page summary — from one folder of data.
The public ShelfMark index (21 Michigan stores) is the comparison pool, so every target gets a rank, not just a number.

Built Sept 28, 2026. Lives at `~/Projects/mousa-studio/review-engine/` on the Mac; transport branch `review-engine` on
`mosesb87/design-app`.

## What is in here

| Path | What it is |
|---|---|
| `engine.py` | scoring model + loaders (imports `shelfmark/model.py`; never duplicates the rubric) |
| `build_workbook.py` | `Review-Engine.xlsx` (Rubric · Index · Checks · Findings library · Impact ledger · Outreach · Messages) and one QA workbook per target |
| `build_review.py` | the review page: `targets/<slug>/site/page.html` + `data.json` + `proto-data.json` → `site/index.html` |
| `build_docs.py` + `docs.json` | tailored résumé (.docx + .pdf), cover letter (.docx + .pdf), one-page summary (.pdf) per target |
| `build_og.py` | `site/assets/og.png` per target |
| `templates/review-engine.{css,js}` | the shared structure every review page uses (hero stats, findings, scorecard, plan, files) |
| `rubric.md`, `audit-brief.md`, `audit-schema.json` | what an auditor (me, or a subagent) is given |
| `shelfmark/` | the ShelfMark source (21 audits, model, workbook and site builders) |
| `targets/<slug>/` | one folder per reviewed store: `audit.json`, `review.json`, `findings.md`, `brand.md`, `posting.md`, `company.md`, `extract.py`, `captures.tar.gz`, `site/` |

## The one-hour review

1. **Pick the posting.** Company with its own store, a named duty list, a reachable hiring manager. Note the apply URL.
2. **Audit.** Hand `audit-brief.md` + `rubric.md` + the posting duties to an auditor (a subagent works). It fetches ≤40 public
   pages with curl/WebFetch, scores the 29 checks with evidence into `targets/<slug>/audit.json`, and writes `findings.md`
   (4–6 findings that can be COUNTED across sampled pages, each mapped to a duty), `brand.md`, `posting.md`, `company.md`,
   and saves every page under `captures/` (tar it: `tar czf captures.tar.gz captures`).
3. **Curate.** Write `targets/<slug>/review.json` (copy a sibling): role, people, hero stats, three strengths first, the
   findings (title · count · observed · why · fix · evidence · prototype id), also-noticed, prototypes, 30/60/90, files.
   Plain voice. Counts, never adjectives. No health/legal/financial claim language.
4. **Extract.** `targets/<slug>/extract.py` pulls the numbers the prototypes need out of `captures/` into
   `site/proto-data.json` — so every prototype runs on the store's real data.
5. **Page.** Copy a sibling `site/page.html`, set the brand tokens (colors, three fonts, radius) from `brand.md`, write the
   hero art and the working fixes. The shared engine renders everything else from `review.json`.
6. **Build.** `python3 build_workbook.py && python3 build_review.py <slug> && python3 build_docs.py <slug> && python3 build_og.py <slug>`
   then recalc the workbooks (`python3 /mnt/skills/public/xlsx/scripts/recalc.py <file>` or LibreOffice).
7. **QA.** Desktop 1440 and mobile 390 screenshots (`qa/shot.mjs`): no horizontal overflow, no console errors, every
   `.rv` revealed, PDFs one page.
8. **Deploy** with rsync (never tar-over-ssh — it reset `public_html` permissions once):
   `rsync -avz --chmod=D755,F644 targets/<slug>/site/ bluehost:~/public_html/<path>/` — the page is `noindex`.
9. **Send.** Apply with the page URL in the website field. Within 48 hours, one InMail/email to one named person: the
   private link and ONE finding with its count. Log the row on the Outreach sheet. One follow-up after 7 days.
10. **Index.** Add the review to the jobs ledger and the reviews list on the portfolio; add the target row to `Review-Engine.xlsx`
    (it happens automatically on rebuild).

## Rules

- Public pages only. Never log in, cart, submit a form or request a quote.
- Lead with three strengths. Every finding names the page, the count, the duty and the fix.
- Nothing is typed in that wasn't observed; a prototype that needs a value the page doesn't show says so.
- Review pages are `noindex` and sent as private links. Public listings stay anonymized or positive.
- The ShelfMark score is the credential; the tailored findings are the pitch.
