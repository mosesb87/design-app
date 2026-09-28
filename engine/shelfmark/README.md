# ShelfMark — Michigan Storefront Benchmark (Vol. 1, Sept 2026)

Source for mousabatarseh.com/shelfmark/ and the scoring workbook.

- audits/audit_1..4.json — the 21 audited stores (29 checks each, evidence strings), plus skipped companies
- rubric.md — the audit rubric given to the auditors (public pages only; 0/1/2/U)
- model.py — scoring model (weights, coverage, confidence, grades, competition ranking)
- build_xlsx.py — builds ShelfMark-Michigan-Storefront-Benchmark-2026.xlsx (all formulas live; recalc with LibreOffice)
- build_site.py — injects the dataset into site/template.html → site/index.html (standalone) + artifact.html
- site/ — template, built page, og.png

Rebuild: `python3 build_xlsx.py && python3 build_site.py` from this folder (needs openpyxl; recalc via the xlsx skill's recalc.py).
Portfolio index entry: mosesb87/design-app → src/data/work.ts (slug `shelfmark`), media in public/media/shelfmark.
