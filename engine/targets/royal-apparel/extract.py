"""Royal Apparel — pulls the data the review's working prototypes use out of captures/ (served HTML, sitemap, inline product JSON).
Run:  python3 extract.py [captures_dir]   → writes site/proto-data.json"""
import json, os, re, sys, html
CAP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "captures")
def T(name): return open(os.path.join(CAP, name), encoding="utf-8", errors="ignore").read()
def J(name): return json.load(open(os.path.join(CAP, name), encoding="utf-8"))

# 1. sitemap classification (1,063 URLs)
urls = [u.strip() for u in T("sitemap-urls.txt").splitlines() if u.strip()]
def cls(u):
    if "catalog_browse.p" in u: return "cgi_browse"
    if "/cgi-bin/" in u: return "cgi_other"
    if "/product/" in u: return "product"
    if "/Category/" in u or "/Accessory-Type/" in u: return "category"
    return "page"
counts = {}
for u in urls: counts[cls(u)] = counts.get(cls(u), 0) + 1
cgi_other = [html.unescape(u).split("wam_tmpl/")[1].split("?")[0] for u in urls if cls(u) == "cgi_other"]
transactional = sorted({c for c in cgi_other if any(k in c for k in ("cart", "checkout", "login", "password", "invoice", "wish", "registration", "order_results", "search", "store_locator", "layout.p"))})
sitemap_xml = T("sitemap.xml")
lastmods = re.findall(r"<lastmod>([^<]+)</lastmod>", sitemap_xml)
products_with_lastmod = len(re.findall(r"<loc>[^<]*/product/[^<]*</loc>\s*<lastmod>", sitemap_xml))
sample_products = [u for u in urls if cls(u) == "product"][:6]

# 2. redirect chain (from HEAD checks logged in redirect-chains.txt / index.txt)
chain = [
    {"url": "https://www.royalapparel.net/", "status": 200, "note": "515-byte stub: <meta http-equiv=refresh> → marketing.p; canonical → itself; no title, no description"},
    {"url": "…/cgi-bin/liveb2b/wam_tmpl/marketing.p?site=B2B&layout=Baseb2b&page=homepage", "status": 301, "note": "→ /index"},
    {"url": "https://www.royalapparel.net/index", "status": 200, "note": "the real homepage: title, description, og:url=/index — no canonical"},
]
variants = [{"url": "http://royalapparel.net/", "status": 200}, {"url": "http://www.royalapparel.net/", "status": 200},
            {"url": "https://royalapparel.net/", "status": 200}, {"url": "https://www.royalapparel.net/", "status": 200}]

# 3. structured data on style 5051 (all three blocks, verbatim)
h = T("product-5051.html")
ld = [b.strip() for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)]
prod = J("product-5051-prodJSON.json")["product"][0]
colors = prod.get("color") or []
five = {"style": prod["styleCode"], "name": prod["description"], "url": "https://www.royalapparel.net/product/5051/Unisex-Short-Sleeve-Tee.html",
        "low": prod.get("regLowPrice"), "high": prod.get("regHighPrice"), "colors": len(colors), "sizes": len(prod.get("size") or []),
        "altviews": len(prod.get("altView") or []), "hex_placeholder": sum(1 for c in colors if str(c.get("hexColor", "")).upper() in ("FFFFFF", "")),
        "avail_sizes_empty": sum(1 for c in colors if not c.get("availSizes")), "show_stock_false": sum(1 for z in prod.get("size") or [] if not z.get("show_stock")),
        "color_names": [c["description"] for c in colors], "size_names": [z["description"] for z in prod.get("size") or []],
        "images": [a["imageLg"] for a in (prod.get("altView") or [])[:4]], "mill": prod.get("millCode"), "video": prod.get("video"),
        "image": prod.get("imageLg") or "https://live.royalapparel.net/prodimg/large/5051_072226104431.png"}

# 4. dataLayer pushes as served (category + PDP), verbatim slices
cat = T("category-men.html")
m = re.search(r'impressionList\s*=\s*(\{.*?\});', cat, re.S)
impressions = json.loads(m.group(1))["impressions"] if m else []
page_push = re.search(r"dataLayer\.push\(\[\{.*?\}\]\);", h, re.S).group(0)
view_item = re.search(r'dataLayer\.push\(\{\s*"event":\s*"view_item".*?\}\);', h, re.S).group(0)
related = re.search(r'dataLayer\.push\(\{\s*"ecommerce":\s*\{\s*"currencyCode".*?\}\);', h, re.S).group(0)
js = T("js-catalog_product.js")
atc = [m.group(0)[:260] for m in re.finditer(r"'?event'?\s*:\s*'add_to_cart'.{0,240}", js, re.S)][:2]

# 5. category grid: the 21 products in the served JSON blob
bp = J("category-men-browse-data.json")["browseProd"]
grid = [{"id": p["productID"], "name": p["description"], "mill": p["mill"], "price": p["regPrice"], "priceDisp": p["regPriceDisp"], "isNew": p["isNew"],
         "url": p["prodURL"], "cat": p.get("prodCat", ""), "swatches": len(p.get("colorSwatch") or []), "onSale": p.get("onSale"), "sale": p.get("salePriceDisp"),
         "img": (re.search(r"data-src='([^']+)'", p.get("prodImg", "")) or re.search(r"src='([^']+)'", p.get("prodImg", ""))).group(1) if p.get("prodImg") else ""} for p in bp]
pageinfo = {"total": 136, "per_page": 21, "pages": 7}

# 6. the 20-page PDP sample
sample = J("pdp-sample-analysis.json")

out = {"sitemap": {"total": len(urls), "counts": counts, "transactional": transactional, "lastmod_max": max(lastmods) if lastmods else None,
                   "products_with_lastmod": products_with_lastmod, "sample_products": sample_products,
                   "dead": [{"style": "15250006", "name": "USA Team Beanie", "status": "200 — body 'Product Not Found'"},
                            {"style": "20055", "name": "Unisex Triblend V-Neck", "status": "200 — itemStatus obsolete"},
                            {"style": "32112", "name": "Women's eco Triblend Scoop Neck", "status": "200 — itemStatus obsolete"}]},
       "chain": chain, "variants": variants, "ld": ld, "five": five,
       "datalayer": {"page_push": page_push, "impressions": impressions[:21], "view_item": view_item, "related": related[:900], "add_to_cart": atc},
       "grid": grid, "pageinfo": pageinfo, "sample": sample}
os.makedirs(os.path.join(os.path.dirname(__file__), "site"), exist_ok=True)
json.dump(out, open(os.path.join(os.path.dirname(__file__), "site", "proto-data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(counts, "transactional", len(transactional), "lastmod max", out["sitemap"]["lastmod_max"], "prod lastmod", products_with_lastmod, "| ld blocks", len(ld), "| five", five, "| impressions", len(impressions), "| grid", len(grid), "| atc", len(atc))
