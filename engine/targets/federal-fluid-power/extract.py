"""Federal Fluid Power — pulls the data the review's working prototypes use out of captures/ (Magento HTML, sitemaps, the PDP sample CSV).
Run:  python3 extract.py [captures_dir]   → writes site/proto-data.json"""
import json, os, re, sys, html, csv
CAP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "captures")
def T(name): return open(os.path.join(CAP, name), encoding="utf-8", errors="ignore").read()

# 1. sitemap shape across the three files fetched
files = {}
tot = keyless = 0
for f in ("sitemap_001.xml", "sitemap_005.xml", "sitemap_009.xml"):
    x = T(f); locs = re.findall(r"<loc>([^<]+)</loc>", x)
    k = sum(1 for u in locs if "/catalog/product/view/" in u)
    files[f] = {"urls": len(locs), "keyless": k}; tot += len(locs); keyless += k
keyless_examples = [u for u in re.findall(r"<loc>([^<]+)</loc>", T("sitemap_005.xml")) if "/catalog/product/view/" in u][:8]
# categories carry priority 0.5 in Magento's sitemap (products 1.0); CMS pages have no lastmod image and sit at 0.25/none
entries = re.findall(r"<url>(.*?)</url>", T("sitemap_001.xml"), re.S)
cats = [re.search(r"<loc>([^<]+)</loc>", e).group(1) for e in entries if "<priority>0.5</priority>" in e]
suffixed = sum(1 for u in cats if re.search(r"-\d+\.html$", u))

# 2. the 19-page PDP sample
rows = list(csv.DictReader(open(os.path.join(CAP, "pdp_sample.csv"), encoding="utf-8")))
sample = []
for r in rows:
    sample.append({"url": r["fetched_url"], "title": r["title"], "title_type": r["title_type"], "canonical": r["canonical"], "canon_ok": r["canonical_matches_fetched_url"],
                   "desc_words": int(r["description_words"] or 0), "attrs": r["more_info_attributes"], "weight": r["weight"], "brand": r["brand"], "sku": r["sku"],
                   "price": r["price_visible"], "cta": r["cta"], "ld_availability": r["ld_availability"], "images": int(r["gallery_images"] or 0),
                   "first_image": r["first_image"], "logo": r["first_image_is_logo"] == "yes", "attachments": r["attachments"], "lead_time": r["lead_time_shown"],
                   "html_kb": round(int(r["html_bytes"]) / 1024), "scripts": int(r["script_tags"]), "breadcrumb_blocks": int(r["breadcrumb_ld_blocks"] or 0)})

# 3. names with specs buried in the string (from the PDP h1 + the on-page description line where one exists)
names = [
    {"sku": "BV3-04-NPT", "brand": "DNP Americas", "text": "BV3-04-NPT 1/4\" Three way selector Ball valve w/ 1/4\" NPT Threads. (5,800 PSI)"},
    {"sku": "HP-10Y", "brand": "Tompkins", "text": "HP-10Y - 4.50\"X10.00\" YELLOW HOSE PROTECTOR"},
    {"sku": "LS-5502-12-12", "brand": "Tompkins", "text": "LS-5502-12-12 - 12MP-12FP 90 LIVE SWIVEL"},
    {"sku": "NV105-04-04", "brand": "Tompkins", "text": "NV105-04-04 - 04COMP-04COMP NEEDLE VALVE"},
    {"sku": "M2-5.5-R-40", "brand": "Yuken", "text": "M2-5.5-R-40 - 3 Phase Electric Motor 7.3 hp"},
    {"sku": "ST1004-10-10", "brand": "Yuken", "text": "ST1004-10-10 - JIS Air Bleed 2.64 gpm"},
    {"sku": "PV2R12-31-41-F-REAA-4390", "brand": "Yuken", "text": "PV2R12-31-41-F-REAA-4390 - Double Fixed Vol Vane pump"},
    {"sku": "KS-A37-05-32", "brand": "Yuken", "text": "KS-A37-05-32 - Seal Kit for A37 - 05 Piston Pump"},
    {"sku": "DSHG-03-3C4-D24-N1-14", "brand": "Yuken", "text": "DSHG-03-3C4-D24-N1-14 - Dir. Valve Pilot Operated"},
    {"sku": "FI-TE-04LLMK-W3-MS", "brand": "Stauff", "text": "FI-TE-04LLMk-W3-MS - 6010000456"},
    {"sku": "BPO-NPT-06-08", "brand": "DNP Americas", "text": "BPO-NPT-06-08"},
    {"sku": "700018114", "brand": "White Drive Products", "text": "700018114"},
]

# 4. layered-navigation option values on Cylinders (as served)
c = T("category_hydraulics-1_cylinders-1.html")
blocks = re.findall(r'<span class="title text-md md:text-lg font-semibold "\s*:class="isNotSidebarClass">\s*(.*?)\s*</span>(.*?)(?=<span class="title text-md md:text-lg font-semibold "|$)', c, re.S)
facets = {}
for name, body in blocks:
    opts = re.findall(r'<a[^>]*href="[^"]*"[^>]*>(.*?)</a>', body, re.S)
    clean = [html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", o))).strip() for o in opts]
    clean = [x for x in clean if x and len(x) < 40]
    if name.strip() in ("Bore", "Stroke", "Rod Diameter", "Ports NPTF", "Column Load", "Bore x Stroke", "Retracted Length"):
        facets[name.strip()] = clean if name.strip() != "Bore x Stroke" else clean
# Tare Dist. block swallowed page chrome; not used.

# 5. store-view strings on the Federal homepage
home = T("homepage.html")
footer = {"copyright": re.search(r"©\s*20\d\d[^<]{0,60}", home).group(0).strip() if re.search(r"©\s*20\d\d", home) else "",
          "header_phone": (re.search(r"Call Us:?\s*([\d-]+)", home) or [None, ""])[1],
          "federal_phone": "1-734-455-1722", "patriot_phone": "734-479-9641",
          "policy_links": {"Shipping Policy": "/terms/", "Return Policy": "/terms/", "Order History": "#", "Order Tracking": "#"}}

# 6. RFQ-with-InStock rows (from the sample)
rfq = [s for s in sample if s["cta"].startswith("Request")]
out = {"sitemap": {"files": files, "total": tot, "keyless": keyless, "pct": round(100 * keyless / tot, 1), "examples": keyless_examples,
                   "categories_in_001": len(cats), "categories_suffixed": suffixed},
       "sample": sample, "names": names, "facets": facets, "footer": footer, "rfq": rfq}
os.makedirs(os.path.join(os.path.dirname(__file__), "site"), exist_ok=True)
json.dump(out, open(os.path.join(os.path.dirname(__file__), "site", "proto-data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(files, tot, keyless, out["sitemap"]["pct"], "| cats", len(cats), suffixed, "| sample", len(sample), "| facets", {k: len(v) for k, v in facets.items()}, "| footer", footer["copyright"], footer["header_phone"], "| rfq", len(rfq))
