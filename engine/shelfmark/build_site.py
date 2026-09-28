import json, re, html
from model import build_dataset, PILLARS, CHECKS

rows = build_dataset()
stores = []
for r in rows:
    stores.append({
        "company": r["company"], "slug": r["slug"], "url": r["url"], "hq_city": r["hq_city"],
        "segment": r["segment"], "sells": r.get("sells", ""), "platform": r["platform"],
        "platform_evidence": r.get("platform_evidence", ""), "audited_at": r["audited_at"],
        "score": r["score"], "grade": r["grade"], "rank": r["rank"], "coverage": r["coverage"],
        "verified": r["verified"], "confidence": r["confidence"],
        "pillars": {p: {"pts": v["pts"], "max": v["max"], "pct": v["pct"]} for p, v in r["pillars"].items()},
        "checks": {cid: {"s": r["checks"][cid]["s"], "e": r["checks"][cid]["e"]} for cid, *_ in CHECKS},
        "strengths": r["strengths"], "fixes": r["fixes"], "sample_urls": r.get("sample_urls", {}),
        "notes": r.get("notes", ""),
    })
data = {
    "meta": {"title": "ShelfMark — Michigan Storefront Benchmark", "volume": 1, "audited": "2026-09-28", "method": "1.0"},
    "pillars": [{"id": p, "name": n, "weight": w, "question": q} for p, n, w, q in PILLARS],
    "checks": [{"id": c, "name": n, "pillar": c[0], "two": s2, "one": s1, "zero": s0} for c, n, s2, s1, s0 in CHECKS],
    "stores": stores,
}
payload = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
tpl = open("site/template.html", encoding="utf-8").read()
body = tpl.replace("__DATA__", payload)
open("site/artifact.html", "w", encoding="utf-8").write(body)

# standalone document for self-hosting (mousabatarseh.com/shelfmark)
ld = {
    "@context": "https://schema.org",
    "@graph": [
        {"@type": "Dataset", "name": "ShelfMark — Michigan Storefront Benchmark, Vol. 1",
         "description": "Scores for 21 Michigan e-commerce storefronts on 29 public-page checks across findability, catalog, buy path, trust and content.",
         "creator": {"@type": "Person", "name": "Moses Batarseh", "url": "https://mousabatarseh.com"},
         "dateModified": "2026-09-28", "license": "https://creativecommons.org/licenses/by/4.0/",
         "variableMeasured": ["ShelfMark Score", "Findability", "Catalog", "Buy", "Trust", "Content"],
         "keywords": ["e-commerce", "benchmark", "Michigan", "storefront audit", "technical SEO"]},
        {"@type": "Person", "name": "Moses Batarseh", "jobTitle": "Webmaster / E-Commerce Specialist",
         "url": "https://mousabatarseh.com", "sameAs": ["https://www.linkedin.com/in/mousabatarseh"],
         "address": {"@type": "PostalAddress", "addressLocality": "Warren", "addressRegion": "MI"}},
    ],
}
head_extra = ('<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
              '<link rel="canonical" href="https://mousabatarseh.com/shelfmark/">\n'
              f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n')
# move the <title>…</style> block and metas into <head>
m = re.search(r"^(.*?</style>\s*)", body, re.S)
head = m.group(1)
rest = body[m.end():]
standalone = f'<!doctype html>\n<html lang="en">\n<head>\n{head_extra}{head}</head>\n<body>\n{rest}\n</body>\n</html>\n'
standalone = standalone.replace('content="og.png"', 'content="https://mousabatarseh.com/shelfmark/og.png"')
open("site/index.html", "w", encoding="utf-8").write(standalone)
print("artifact.html", len(body)//1024, "KB; index.html", len(standalone)//1024, "KB; stores", len(stores))
