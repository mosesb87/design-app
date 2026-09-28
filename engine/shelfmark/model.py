"""ShelfMark scoring model — shared by the spreadsheet builder and the web index.

Score = weighted average of pillar percentages, where a pillar percentage is
verified points / (2 x verified checks). Unverified ("U") checks are excluded
from both numerator and denominator; a pillar with zero verified checks drops
out and the remaining weights renormalise. Coverage = verified checks / 29.
"""
import json, glob, re

PILLARS = [
    ("F", "Findability", 25, "Can search engines and shoppers find the store and its products?"),
    ("C", "Catalog",     30, "Is the product data complete enough to sell from?"),
    ("B", "Buy",         20, "Is there a clear, trustworthy path from product to purchase?"),
    ("T", "Trust",       15, "Does the site prove there is a real, reachable business behind it?"),
    ("N", "Content",     10, "Does the store publish anything that helps a shopper decide?"),
]
WEIGHTS = {p[0]: p[2] for p in PILLARS}

CHECKS = [
    # id, name, 2, 1, 0
    ("F1", "HTTPS", "Site serves on https (final URL https)", "Mixed / uncertain", "http only"),
    ("F2", "robots.txt", "Present, does not block products/categories, contains a Sitemap: line", "Present but no Sitemap line, or blocks something important", "Missing, or Disallow: / for everything"),
    ("F3", "XML sitemap", "Reachable and includes product/category (or article) URLs", "Reachable but thin / only static pages", "Not reachable"),
    ("F4", "Title tags", "Homepage title is descriptive (brand + what/where) AND a sampled product title is unique and descriptive", "Present but generic / duplicated / templated", "Missing or just 'Home'"),
    ("F5", "Meta descriptions", "Specific meta description on homepage AND on a sampled product page", "On one only, or templated / duplicated", "None"),
    ("F6", "Canonical tags", "Canonical present on homepage AND product page", "On one only", "None"),
    ("F7", "Structured data", "Product/Breadcrumb schema evidence seen on product pages", "Partial evidence (e.g. breadcrumb schema only)", "None seen where expected"),
    ("F8", "Clean URLs", "Readable hyphenated product/category URLs, no session IDs", "Readable but awkward separators or numeric IDs appended", "Query-string-only product URLs"),
    ("C1", "Product titles", "Descriptive and consistent (brand / type / size or count)", "Partially descriptive", "Vague / inconsistent"),
    ("C2", "Descriptions", ">=50 words of specific copy on both sampled products", "Short / boilerplate (<50 words) or only one product", "Missing"),
    ("C3", "Imagery", ">=2 images per product (gallery) with alt text", "One image, or missing alt text", "None / placeholder"),
    ("C4", "Price & availability", "Price AND stock state visible (B2B: clear 'login for pricing' plus how to get an account)", "Price only, no availability", "Neither / unclear"),
    ("C5", "Variants & specs", "Structured variant selectors and/or a spec table", "Variants only described in text", "None where expected"),
    ("C6", "Taxonomy & breadcrumbs", "Logical category tree (>=2 levels) AND breadcrumbs", "Categories but no breadcrumbs", "Flat / none"),
    ("C7", "Filters & sort", "Filters (price / type / attribute) AND sort on category pages", "Sort or pagination only", "None"),
    ("C8", "Site search", "Search box with a results page", "Search present but weak / unclear", "None"),
    ("B1", "Primary CTA", "Add to cart / order / request a quote prominent on product page AND homepage", "Present but buried", "No path to buy or enquire"),
    ("B2", "Shipping & returns", "Shipping AND returns info with specifics (thresholds, timelines) linked from product page or footer", "Generic policy page only", "None"),
    ("B3", "Checkout access", "Guest checkout, or for B2B a clear become-a-customer application with steps", "Account required but sign-up exists", "No way to buy online"),
    ("B4", "Merchandising", "Homepage features collections / seasonal / new / best sellers with working links", "Static links only", "None"),
    ("B5", "Trust signals", "Product or store reviews PLUS guarantees / awards / secure badges", "One type only", "None"),
    ("T1", "Contact", "Phone + physical address + form or email", "Form or email only", "None"),
    ("T2", "About", "Substantial about / story page", "Brief", "None"),
    ("T3", "Policies", "Privacy AND terms (accessibility statement is a bonus)", "One", "None"),
    ("T4", "Social", ">=2 linked profiles", "One", "None"),
    ("T5", "Accessibility basics", "Skip link AND alt text on product images (or an accessibility statement)", "Some", "Images without alt and no skip link"),
    ("N1", "Blog / news freshness", "A dated post within the last 90 days", "Blog exists but stale or undated", "None"),
    ("N2", "Guides / FAQ", "FAQ AND guides / recipes / how-tos", "FAQ only, or one guide", "None"),
    ("N3", "Locations / where to buy", "Locator or locations page with addresses & hours (B2B: service area / depots)", "A bare list", "None"),
]
CHECK_IDS = [c[0] for c in CHECKS]
CHECK_NAME = {c[0]: c[1] for c in CHECKS}

GRADES = [(85, "A"), (70, "B"), (55, "C"), (40, "D"), (0, "F")]
BANDS = {"A": "Benchmark", "B": "Strong", "C": "Developing", "D": "Needs work", "F": "At risk"}


def grade(score):
    for cut, g in GRADES:
        if score >= cut:
            return g
    return "F"


def confidence(verified):
    if verified >= 26:
        return "High"
    if verified >= 20:
        return "Medium"
    return "Low"


def load_audits(pattern="audit_*.json"):
    out = []
    for f in sorted(glob.glob(pattern)):
        for c in json.load(open(f)):
            if c.get("status") == "audited":
                out.append(c)
    return out


def score_store(c):
    pillars = {}
    for pid, _, w, _ in PILLARS:
        pts = mx = ver = 0
        for cid in CHECK_IDS:
            if cid[0] != pid:
                continue
            s = c["checks"][cid]["s"]
            if s == "U":
                continue
            pts += s; mx += 2; ver += 1
        pillars[pid] = {"pts": pts, "max": mx, "verified": ver, "pct": (pts / mx) if mx else None}
    num = sum(WEIGHTS[p] * pillars[p]["pct"] for p in pillars if pillars[p]["pct"] is not None)
    den = sum(WEIGHTS[p] for p in pillars if pillars[p]["pct"] is not None)
    score = round(100 * num / den, 1) if den else None
    verified = sum(p["verified"] for p in pillars.values())
    return {
        "pillars": pillars,
        "score": score,
        "grade": grade(score) if score is not None else None,
        "verified": verified,
        "coverage": round(verified / len(CHECK_IDS), 3),
        "confidence": confidence(verified),
        "points": sum(p["pts"] for p in pillars.values()),
        "points_max": sum(p["max"] for p in pillars.values()),
    }


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def build_dataset():
    stores = load_audits()
    rows = []
    for c in stores:
        r = dict(c)
        r.update(score_store(c))
        r["slug"] = slug(c["company"])
        rows.append(r)
    rows.sort(key=lambda r: (-r["score"], -r["coverage"], r["company"]))
    # competition ranking ("1224"), identical to Excel's RANK()
    for i, r in enumerate(rows):
        r["rank"] = 1 + sum(1 for o in rows if o["score"] > r["score"])
    return rows


if __name__ == "__main__":
    rows = build_dataset()
    print(f"{'#':>2} {'Store':30} {'Seg':18} {'Platform':20} {'Score':>6} G  Cov   F    C    B    T    N")
    for r in rows:
        p = r["pillars"]
        fmt = lambda k: ("  -- " if p[k]["pct"] is None else f"{100*p[k]['pct']:4.0f} ")
        print(f"{r['rank']:>2} {r['company']:30} {r['segment']:18} {r['platform']:20} {r['score']:6.1f} {r['grade']}  {r['coverage']:.2f} {fmt('F')}{fmt('C')}{fmt('B')}{fmt('T')}{fmt('N')}")
    import statistics
    print("mean", round(statistics.mean(r["score"] for r in rows), 1), "median", statistics.median(r["score"] for r in rows))
