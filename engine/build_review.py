"""Builds a review page from the engine's data.

  python3 build_review.py <slug> [<slug> ...]      (no args = every target with a site/page.html)

Reads   targets/<slug>/audit.json, review.json, site/page.html, site/proto-data.json
Writes  targets/<slug>/site/index.html — page.html with __ENGINE_CSS__, __ENGINE_JS__, __DATA__ and __PROTO__ filled in,
        targets/<slug>/site/data.json — the same payload, for anyone who wants the numbers without the page.
The page template keeps the hero art and the working fixes; the engine supplies scorecard, findings, plan and files.
"""
import json, os, sys
from engine import HERE, load_index, load_targets, rank_against_index, pillar_table, checks_table, weakest_pillar, BANDS, PILLARS

index = load_index()
index_mean = round(sum(r["score"] for r in index) / len(index), 1)


def payload(t):
    rv = t["review"]
    rk, n = rank_against_index(t["score"], index)
    wk = weakest_pillar(t)
    return {
        "review": rv,
        "scorecard": {"score": t["score"], "grade": t["grade"], "band": BANDS[t["grade"]], "rank": rk, "index_n": n, "index_mean": index_mean,
                      "verified": t["verified"], "coverage": t["coverage"], "confidence": t["confidence"], "weakest": wk,
                      "weakest_name": dict((p[0], p[1]) for p in PILLARS).get(wk, ""), "pillars": pillar_table(t), "checks": checks_table(t),
                      "platform": t["platform"], "audited_at": t["audited_at"], "sample_urls": t.get("sample_urls", {}), "pages_checked": t.get("pages_checked", [])},
    }


def build(t):
    d = os.path.join(HERE, "targets", t["slug"], "site")
    tpl = os.path.join(d, "page.html")
    if not os.path.isfile(tpl):
        print("skip", t["slug"], "(no site/page.html)"); return
    data = payload(t)
    json.dump(data, open(os.path.join(d, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    proto = {}
    pf = os.path.join(d, "proto-data.json")
    if os.path.isfile(pf):
        proto = json.load(open(pf, encoding="utf-8"))
    css = open(os.path.join(HERE, "templates", "review-engine.css"), encoding="utf-8").read()
    js = open(os.path.join(HERE, "templates", "review-engine.js"), encoding="utf-8").read()
    safe = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    html = open(tpl, encoding="utf-8").read()
    html = html.replace("__ENGINE_CSS__", css).replace("__ENGINE_JS__", js).replace("__DATA__", safe(data)).replace("__PROTO__", safe(proto))
    for k in ("__ENGINE_CSS__", "__ENGINE_JS__", "__DATA__", "__PROTO__"):
        assert k not in html, k
    out = os.path.join(d, "index.html")
    open(out, "w", encoding="utf-8").write(html)
    print("built", out, len(html) // 1024, "KB — score", t["score"], t["grade"], "rank", data["scorecard"]["rank"], "of", data["scorecard"]["index_n"])


if __name__ == "__main__":
    want = sys.argv[1:]
    for t in load_targets():
        if t.get("review") and (not want or t["slug"] in want):
            build(t)
