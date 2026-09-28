"""Builds the tailored résumé, cover letter and one-page review summary for each target, from the same review.json.

  python3 build_docs.py [<slug> ...]
Résumé and cover letter are built from the reference .docx files (his existing format — fonts, numbering, section rules
are cloned, only the text changes), then converted to PDF with LibreOffice. The one-page summary is an HTML page in the
target's brand tokens printed to Letter with Chromium (qa/print.mjs).
"""
import copy, json, os, subprocess, sys, datetime
from docx import Document
from engine import HERE, load_targets, load_index, rank_against_index, BANDS

DOCS = json.load(open(os.path.join(HERE, "docs.json"), encoding="utf-8"))
index = load_index()


def clone_para(src, text):
    """Deep-copy a template paragraph, keep the first run's formatting, replace the text (\\t becomes a real tab)."""
    p = copy.deepcopy(src._p)
    runs = p.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r")
    for r in runs[1:]:
        p.remove(r)
    from docx.text.paragraph import Paragraph
    para = Paragraph(p, src._parent)
    if para.runs:
        run = para.runs[0]
        # clear existing text/tab children of the run, then set text (python-docx turns \t into <w:tab/>)
        for child in list(run._r):
            if child.tag.endswith("}t") or child.tag.endswith("}tab") or child.tag.endswith("}br"):
                run._r.remove(child)
        run.text = text
    else:
        para.add_run(text)
    return p


def build_from_template(template, kinds, spec, out):
    """kinds: {kind: paragraph index in the template}; spec: [(kind, text), ...]. Body paragraphs are rebuilt in order."""
    d = Document(template)
    body = d.element.body
    paras = list(d.paragraphs)
    tmpl = {k: paras[i] for k, i in kinds.items()}
    sect = body.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sectPr")
    for p in paras:
        body.remove(p._p)
    for kind, text in spec:
        body.insert(list(body).index(sect) if sect is not None else len(body), clone_para(tmpl[kind], text))
    d.save(out)


RES_KINDS = {"name": 0, "headline": 1, "contact": 2, "section": 3, "summary": 4, "skill": 6, "employer": 10, "bullet": 11, "other": 20, "edu": 22, "cert": 23}
CL_KINDS = {"name": 0, "contact": 1, "date": 2, "company": 3, "re": 4, "greeting": 5, "body": 6, "closing": 10, "sig": 12, "small": 13}
CONTACT = "Warren, MI 48093  |  (248) 810-1816  |  hireme@mousabatarseh.com  |  mousabatarseh.com  |  linkedin.com/in/mousabatarseh"
EDU = "B.S., Accounting Information Systems — Al-Balqa Applied University, Amman, 2016  ·  AI Engineering — Maestro AI Engineering, 2025 – present"
CERT = "Advanced Digital Marketing & Growth Strategies (Wharton) · Google Digital Marketing & E-Commerce certificates (Coursera) · Shopify & WordPress/Elementor (Udemy) · Web Development Fundamentals (NuCamp, Detroit) · Generative AI for business (Coursera)"
OTHER = "Other experience: Route Driver (part-time, on-call), non-emergency medical transportation, Metro Detroit, 2024 – Sep 2026 — alongside the roles above. · Earlier roles (2013 – 2019): Edwardian Hotel (San Francisco) · Shababjobs.com · Omar & Khaled Bulos Zumot Co. (Amman) — night audit, account management, sales reporting. Bilingual Arabic/English."


def resume_spec(r):
    s = [("name", "MOUSA BATARSEH"), ("headline", r["headline"]), ("contact", CONTACT), ("section", "SUMMARY"), ("summary", r["summary"]), ("section", "CORE SKILLS")]
    s += [("skill", x) for x in r["skills"]]
    s += [("section", "PROFESSIONAL EXPERIENCE")]
    for job in r["jobs"]:
        s.append(("employer", f"{job['title']}  |  {job['org']}\t{job['dates']}"))
        s += [("bullet", b) for b in job["bullets"]]
    s += [("other", OTHER), ("section", "EDUCATION & CERTIFICATIONS"), ("edu", EDU), ("cert", CERT)]
    return s


def cover_spec(c):
    s = [("name", "MOUSA BATARSEH"), ("contact", CONTACT), ("date", c["date"]), ("company", c["company_line"]), ("re", c["re"]), ("greeting", c["greeting"])]
    s += [("body", b) for b in c["body"]]
    s += [("closing", c["closing"]), ("closing", "Thank you,"), ("sig", "Mousa Batarseh"), ("small", "(248) 810-1816 · hireme@mousabatarseh.com")]
    return s


def to_pdf(docx_path):
    outdir = os.path.dirname(docx_path)
    subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", outdir, docx_path], check=True, capture_output=True, timeout=180)


def summary_html(t, d):
    rv = t["review"]; rk, n = rank_against_index(t["score"], index)
    tok = d["tokens"]
    strengths = "".join(f"<li><b>{s['title']}.</b> {s['text']}</li>" for s in rv["strengths"])
    findings = "".join(f"<li><b>{f['title']}</b><span>{f['count']}</span></li>" for f in rv["findings"])
    fixes = "".join(f"<li>{p['title']}</li>" for p in rv["prototypes"])
    plan = "".join(f"<li>{x}</li>" for x in rv["plan"]["30"][:3])
    pillars = "".join(f"<div class='p'><span>{p[1]}</span><i><b style='width:{round(100*(t['pillars'][p[0]]['pct'] or 0))}%'></b></i><em>{round(100*(t['pillars'][p[0]]['pct'] or 0))}%</em></div>" for p in [("F","Findability"),("C","Catalog"),("B","Buy"),("T","Trust"),("N","Content")])
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{rv['company']} — review summary</title>
<link href="{tok['fonts']}" rel="stylesheet">
<style>
@page {{ size: Letter; margin: 0; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; width: 8.5in; height: 11in; padding: .55in .6in .5in; font: 11px/1.45 {tok['sans']}; color: #141414; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.top {{ display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 14px; }}
.kick {{ font-family: {tok['mono']}; font-size: 8.2px; letter-spacing: .12em; text-transform: uppercase; color: {tok['accent']}; margin: 0 0 6px; }}
h1 {{ font-family: {tok['display']}; font-size: 34px; line-height: .98; margin: 0 0 8px; letter-spacing: -.01em; font-weight: {tok['display_weight']}; {tok['display_extra']} }}
.lede {{ margin: 0; font-size: 11.4px; max-width: 5.1in; color: #333; }}
.dial {{ flex: 0 0 1.55in; border: 1px solid #d9d9d9; padding: 10px 12px; text-align: left; }}
.dial .big {{ font-family: {tok['display']}; font-size: 34px; line-height: 1; font-weight: {tok['display_weight']}; }}
.dial .big small {{ font-size: 12px; color: #777; }}
.dial p {{ margin: 3px 0 0; font-size: 8.6px; color: #444; }}
.p {{ display: grid; grid-template-columns: 58px 1fr 30px; gap: 5px; align-items: center; font-size: 8px; margin-top: 3px; }}
.p i {{ display: block; height: 5px; background: #eee; }} .p i b {{ display: block; height: 100%; background: {tok['accent']}; }} .p em {{ font-style: normal; text-align: right; font-family: {tok['mono']}; }}
.cols {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
h2 {{ font-family: {tok['mono']}; font-size: 8.2px; letter-spacing: .12em; text-transform: uppercase; color: {tok['accent']}; margin: 12px 0 5px; }}
ul {{ margin: 0; padding-left: 13px; }} li {{ margin-bottom: 4px; }}
.f li {{ display: grid; gap: 1px; margin-bottom: 5px; }} .f li span {{ font-family: {tok['mono']}; font-size: 8px; color: #555; }}
.foot {{ position: absolute; left: .6in; right: .6in; bottom: .42in; display: flex; justify-content: space-between; gap: 16px; font-size: 8.4px; color: #555; border-top: 1px solid #ddd; padding-top: 8px; }}
.foot b {{ color: #141414; }}
.links {{ margin-top: 10px; font-size: 9.2px; }} .links a {{ color: {tok['accent']}; text-decoration: none; }}
</style></head><body>
<div class="top"><div><p class="kick">Independent review · {rv['store_scored']} · read {rv['audited_label']} · for the {rv['role']['title']} role</p><h1>{" ".join(rv['hero']['headline'])}</h1><p class="lede">{d['summary_lede']}</p>
<p class="links">Full review with working fixes (private link): <a href="https://mousabatarseh.com/{rv['path']}/">mousabatarseh.com/{rv['path']}/</a> · workbook and résumé at the same address</p></div>
<div class="dial"><div class="big">{t['score']}<small>/100</small></div><p><b>Grade {t['grade']}</b> · {BANDS[t['grade']]} · would rank {rk} of {n} on the ShelfMark Michigan index (avg {round(sum(r['score'] for r in index)/n,1)})</p>{pillars}<p style="margin-top:6px">29 public-page checks, same rubric as mousabatarseh.com/shelfmark</p></div></div>
<div class="cols"><div><h2>What works</h2><ul>{strengths}</ul><h2>Working fixes on the page</h2><ul>{fixes}</ul><h2>First 30 days</h2><ul>{plan}</ul></div><div><h2>Six findings, with counts</h2><ul class="f">{findings}</ul></div></div>
<div class="foot"><span><b>Mousa Batarseh</b> · Webmaster / E-Commerce Specialist · Warren, MI · (248) 810-1816 · hireme@mousabatarseh.com</span><span>Public pages only. No logins, carts or claims language. Unsolicited and independent.</span></div>
</body></html>"""


def build(t):
    d = DOCS[t["slug"]]; rv = t["review"]
    outdir = os.path.join(HERE, "targets", t["slug"], "site", "files"); os.makedirs(outdir, exist_ok=True)
    res = os.path.join(outdir, os.path.basename(rv["files"]["resume"]).replace(".pdf", ".docx"))
    build_from_template(os.path.join(HERE, "reference-resume-tailored.docx"), RES_KINDS, resume_spec(d["resume"]), res); to_pdf(res)
    cl = os.path.join(outdir, os.path.basename(rv["files"]["cover"]).replace(".pdf", ".docx"))
    build_from_template(os.path.join(HERE, "reference-cover-letter.docx"), CL_KINDS, cover_spec(d["cover"]), cl); to_pdf(cl)
    sh = os.path.join(outdir, "summary.html"); open(sh, "w", encoding="utf-8").write(summary_html(t, d))
    pdf = os.path.join(outdir, os.path.basename(rv["files"]["summary"]))
    subprocess.run(["node", os.path.join(HERE, "qa", "print.mjs"), sh, pdf], check=True, capture_output=True, timeout=180)
    os.remove(sh)
    print("docs:", t["slug"], os.listdir(outdir))


if __name__ == "__main__":
    want = sys.argv[1:]
    for t in load_targets():
        if t.get("review") and (not want or t["slug"] in want):
            build(t)
