"""Renders assets/og.png (1200×630) for each review page from its hero headline and brand tokens, with Chromium."""
import json, os, subprocess, sys
from engine import HERE, load_targets, load_index, rank_against_index
DOCS = json.load(open(os.path.join(HERE, "docs.json"), encoding="utf-8")); index = load_index()
for t in load_targets():
    rv = t.get("review")
    if not rv or (sys.argv[1:] and t["slug"] not in sys.argv[1:]): continue
    tok = DOCS[t["slug"]]["tokens"]; rk, n = rank_against_index(t["score"], index)
    html = f"""<!doctype html><html><head><meta charset="utf-8"><link href="{tok['fonts']}" rel="stylesheet"><style>
    body{{margin:0;width:1200px;height:630px;background:#fff;font-family:{tok['sans']};color:#141414;position:relative;overflow:hidden}}
    .k{{position:absolute;left:72px;top:64px;max-width:720px;font-family:{tok['mono']};font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:{tok['accent']}}}
    h1{{position:absolute;left:72px;top:130px;margin:0;font-family:{tok['display']};font-weight:{tok['display_weight']};font-size:92px;line-height:.98;letter-spacing:-.02em;max-width:720px;{tok['display_extra']}}}
    .s{{position:absolute;left:72px;bottom:64px;font-size:26px;color:#444;max-width:760px;line-height:1.3}}
    .d{{position:absolute;right:72px;top:64px;width:250px;border:2px solid #141414;padding:22px 26px;font-family:{tok['display']};{tok['display_extra']}}}
    .d b{{display:block;font-size:92px;line-height:1;font-weight:{tok['display_weight']}}} .d span{{display:block;margin-top:10px;font-family:{tok['sans']};font-size:20px;color:#444;line-height:1.3}}
    .m{{position:absolute;right:72px;bottom:64px;font-family:{tok['mono']};font-size:20px;color:#141414}}
    </style></head><body><div class="k">Independent review · {rv['store_scored']} · {rv['audited_label']}</div><h1>{" ".join(rv['hero']['headline'])}</h1>
    <div class="s">{rv['hero']['stats'][0]['n']} {rv['hero']['stats'][0]['label']} · six findings · {len(rv['prototypes'])} working fixes</div>
    <div class="d"><b>{int(round(t['score']))}</b><span>of 100 · would rank {rk} of {n} on the ShelfMark Michigan index</span></div><div class="m">mousabatarseh.com</div></body></html>"""
    d = os.path.join(HERE, "targets", t["slug"], "site", "assets"); os.makedirs(d, exist_ok=True)
    src = os.path.join(d, "og.html"); open(src, "w", encoding="utf-8").write(html)
    js = f"""import {{ chromium }} from 'playwright';
const b = await chromium.launch({{ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }});
const p = await b.newPage({{ viewport: {{ width: 1200, height: 630 }} }});
await p.goto('file://{src}', {{ waitUntil: 'networkidle' }}); await p.waitForTimeout(500);
await p.screenshot({{ path: '{os.path.join(d, "og.png")}' }}); await b.close();"""
    ogm = os.path.join(HERE, "qa", "og.mjs"); open(ogm, "w").write(js)
    subprocess.run(["node", ogm], check=True, timeout=120)
    os.remove(src); print("og", t["slug"], os.path.getsize(os.path.join(d, "og.png")))
