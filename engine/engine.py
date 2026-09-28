"""Review Engine — the scoring model and loaders shared by the workbook builder and the review sites.

The engine turns ShelfMark (the public Michigan Storefront Benchmark) into a standing rubric:
the same 29 public-page checks score any target store, the ShelfMark index is the comparison pool
("would rank N of 21"), and each target's role-specific findings become a reusable findings library.

Layout (all relative to this file):
  shelfmark/audits/audit_*.json   the 21 benchmark stores (Vol. 1, 2026-09-28)
  shelfmark/model.py              pillars, checks, weights, grades — imported, never duplicated
  targets/<slug>/audit.json       the target store scored on the same 29 checks
  targets/<slug>/review.json      curated review content: role, people, strengths, findings, fixes, plan
  targets/<slug>/captures.tar.gz  every page fetched, as evidence
"""
import json, os, sys, glob, re

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "shelfmark"))
from model import PILLARS, WEIGHTS, CHECKS, CHECK_IDS, CHECK_NAME, GRADES, BANDS, grade, confidence, score_store, slug  # noqa: E402


def load_index():
    """The ShelfMark benchmark pool: 21 audited Michigan stores, scored and ranked."""
    rows = []
    for f in sorted(glob.glob(os.path.join(HERE, "shelfmark", "audits", "audit_*.json"))):
        for c in json.load(open(f, encoding="utf-8")):
            if c.get("status") == "audited":
                r = dict(c); r.update(score_store(c)); r["slug"] = slug(c["company"]); r["source"] = "index"
                rows.append(r)
    rows.sort(key=lambda r: (-r["score"], -r["coverage"], r["company"]))
    for r in rows:
        r["rank"] = 1 + sum(1 for o in rows if o["score"] > r["score"])
    return rows


def load_targets():
    """Every reviewed target store, scored on the same model, with its review.json when present."""
    out = []
    for d in sorted(glob.glob(os.path.join(HERE, "targets", "*"))):
        a = os.path.join(d, "audit.json")
        if not os.path.isfile(a):
            continue
        c = json.load(open(a, encoding="utf-8"))
        r = dict(c); r.update(score_store(c)); r["slug"] = os.path.basename(d); r["source"] = "target"
        rv = os.path.join(d, "review.json")
        r["review"] = json.load(open(rv, encoding="utf-8")) if os.path.isfile(rv) else None
        out.append(r)
    return out


def rank_against_index(score, index):
    """Competition rank the target would hold if it joined the index (1 = best)."""
    return 1 + sum(1 for o in index if o["score"] > score), len(index)


def pillar_table(r):
    return [{"id": p, "name": n, "weight": w, "question": q,
             "pts": r["pillars"][p]["pts"], "max": r["pillars"][p]["max"],
             "verified": r["pillars"][p]["verified"], "pct": r["pillars"][p]["pct"]}
            for p, n, w, q in PILLARS]


def checks_table(r):
    return [{"id": cid, "name": name, "pillar": cid[0], "s": r["checks"][cid]["s"], "e": r["checks"][cid]["e"],
             "two": s2, "one": s1, "zero": s0} for cid, name, s2, s1, s0 in CHECKS]


def weakest_pillar(r):
    cands = [(v["pct"], p) for p, v in r["pillars"].items() if v["pct"] is not None]
    return min(cands)[1] if cands else None


if __name__ == "__main__":
    index = load_index()
    print(f"index: {len(index)} stores, mean {sum(r['score'] for r in index)/len(index):.1f}")
    for t in load_targets():
        rk, n = rank_against_index(t["score"], index)
        print(f"{t['company']:40} {t['score']:5.1f} {t['grade']}  would rank {rk} of {n}  weakest={weakest_pillar(t)}  coverage={t['coverage']:.0%}")
