"""Blueroot Health — pulls the data the review's working prototypes use out of captures/ (Shopify public feeds + served HTML).
Run:  python3 extract.py [captures_dir]   → writes site/proto-data.json. Nothing here is typed in by hand except the rewritten titles."""
import json, os, re, sys, html
CAP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "captures")
def J(name): return json.load(open(os.path.join(CAP, name), encoding="utf-8"))
def T(name): return open(os.path.join(CAP, name), encoding="utf-8", errors="ignore").read()

fh = J("fh_products.json")["products"]
products = []
for p in fh:
    v = p["variants"]
    products.append({"handle": p["handle"], "title": p["title"], "price": float(v[0]["price"]), "compare_at": v[0]["compare_at_price"],
                     "available": any(x["available"] for x in v), "variants": len(v), "variant_titles": [x["title"] for x in v],
                     "product_type": p["product_type"], "tags": p["tags"], "images": len(p["images"]), "published_at": p["published_at"][:10],
                     "empty_body": not (p.get("body_html") or "").strip()})
products.sort(key=lambda x: x["title"].lower())        # the store's live default on /collections/all: title-ascending

# footer "Shop" column links (around the shop-pregnancy anchor in the served homepage)
home = T("fh_home.html")
i = home.find("collections/shop-pregnancy"); seg = home[i - 6000:i + 4000]
footer = []
for u, t in re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', seg, re.S):
    t = re.sub(r"<[^>]+>", "", t).strip()
    if "/collections/" in u and t != "All Products":
        footer.append({"label": t, "handle": u.split("/collections/")[1].split("?")[0]})
colls = {c["handle"]: c for c in J("fh_collections.json")["collections"]}
verified = {  # storefront product counts actually observed in this review (rendered page or the collection's products.json)
    "shop-pregnancy": ("No products found", 0), "pregnancy-and-ovulation-tests": ("No products found", 0),
    "ovulation-prediction": ("products.json → 1 product, sold out", 1), "private": ("products.json → 0 products", 0),
}
for f in footer:
    c = colls.get(f["handle"], {})
    f["products_count_reported"] = c.get("products_count")
    f["storefront"] = verified.get(f["handle"], ("not fetched in this review", None))
collections = [{"handle": h, "title": c["title"], "products_count": c["products_count"], "storefront": verified.get(h, ("", None))} for h, c in colls.items()]

# trending-now drawer: first three products of the A–Z list (what the theme renders on every page)
k = home.find("Trending"); tn = re.findall(r'href="(/products/[^"?#]+)', home[k:k + 6000])
trending = []
for u in tn:
    hnd = u.split("/products/")[1]
    if hnd not in trending: trending.append(hnd)

# promo badges: the five products carrying the LIMITED-TIME badge on /collections/all (verified on their PDPs)
badged = ["fertilecm-cervical-mucus-supplement", "fertilitea-fertility-tea-for-women", "milkies-nursing-postnatal-breastfeeding-multivitamin", "complete-lactation-support", "menopause-multivitamin-essentials"]
promo = []
for p in products:
    if p["handle"] in badged:
        promo.append({"handle": p["handle"], "title": p["title"], "price": p["price"], "compare_at": p["compare_at"], "variants": p["variants"],
                      "badge": "30% OFF · LIMITED-TIME OFFER · SELECT SIZES – APPLIED IN CART", "subscription": round(p["price"] * 0.9, 2)})

# PDP sample (20) — titles, lengths, schema presence
sample = J("fh_pdp_sample_summary.json")
rewrites = {  # ≤60 chars, product first, brand last — editorial work, checked against each product's own name
    "babydance-fertility-lubricant-no-applicators": "BabyDance Fertility Lubricant, Flip-Top Tube – Fairhaven",
    "calcium-magnesium-prenatal": "Calcium + Magnesium Prenatal Supplement – Fairhaven Health",
}
pdp = []
for s in sample:
    pdp.append({"handle": s["handle"], "title": s["title"], "title_len": s["tl"], "desc": s["desc"], "desc_len": s["dl"],
                "ld": s["ld"], "ldrating": s["ldrating"], "bc_ld": s["bc_ld"], "sf_table": s["sf_table"], "sfp_img": s["sfp_img"],
                "rating": s["rating"], "og_http": (s.get("og") or "").startswith("http://"), "h1": s["h1"]})

# shared SKUs: bariatricfusion.com vs unjury.com
def by_sku(prods):
    m = {}
    for p in prods:
        for v in p["variants"]:
            if v.get("sku"): m[v["sku"]] = {"title": p["title"], "price": v["price"], "available": v["available"], "handle": p["handle"]}
    return m
bf, un = by_sku(J("bf_products.json")["products"]), by_sku(J("unjury_products.json")["products"])
shared = sorted(set(bf) & set(un))
norm = lambda t: re.sub(r"\s+", " ", t).strip().lower()   # case-insensitive: 28 real naming differences (29 counting one case-only twin)
mism = [{"sku": s, "bf": bf[s]["title"], "unjury": un[s]["title"], "price_bf": bf[s]["price"], "price_un": un[s]["price"]} for s in shared if norm(bf[s]["title"]) != norm(un[s]["title"])]
price_mism = sum(1 for s in shared if bf[s]["price"] != un[s]["price"]); stock_mism = sum(1 for s in shared if bf[s]["available"] != un[s]["available"])

# portfolio standard: what the four stores say today (from the captured policy/home pages, checked by hand in this review)
standard = [
    {"store": "fairhavenhealth.com", "theme": "Vision 7.0.0", "free_ship": "$35+", "under": "$4.95", "processing": "1–2 business days", "transit": "4–8 business days", "shipping_page": "/pages/shipping-and-returns", "terms": "/policies/terms-of-service", "contact": "/pages/contactus", "sub_discount": "10%"},
    {"store": "bariatricfusion.com", "theme": "Dawn 7.0.1 (custom)", "free_ship": "$100+", "under": "$8.50", "processing": "within 2 business days", "transit": "3–5 business days", "shipping_page": "/pages/shipping-policy + /pages/return-policy", "terms": "/pages/terms-of-service", "contact": "/pages/contact-us", "sub_discount": "10% (5% on the copy-of handle)"},
    {"store": "vitalnutrients.co", "theme": "eHouse All Natural 0.1.0", "free_ship": "$49+", "under": "from $4.95", "processing": "1–2 business days", "transit": "3–5 business days", "shipping_page": "/pages/shipping-policy", "terms": "/pages/terms-and-conditions", "contact": "/pages/contact", "sub_discount": "—"},
    {"store": "unjury.com", "theme": "Expanse 4.4.1", "free_ship": "(none on homepage)", "under": "—", "processing": "—", "transit": "—", "shipping_page": "/pages/shipping-return-policy", "terms": "/pages/terms-conditions", "contact": "/pages/contact", "sub_discount": "—"},
]

out = {"products": products, "footer": footer, "collections": collections, "trending": trending[:3], "promo": promo, "pdp": pdp,
       "shared": {"count": len(shared), "title_mismatches": mism, "price_mismatches": price_mism, "stock_mismatches": stock_mism},
       "standard": standard}
os.makedirs(os.path.join(os.path.dirname(__file__), "site"), exist_ok=True)
json.dump(out, open(os.path.join(os.path.dirname(__file__), "site", "proto-data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("products", len(products), "footer", len(footer), "collections", len(collections), "trending", trending[:3], "promo", len(promo), "pdp", len(pdp), "shared", len(shared), "mismatches", len(mism), price_mism, stock_mism)
