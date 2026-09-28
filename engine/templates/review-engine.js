/* Review Engine — renders the data-driven sections of a review page from window.REVIEW (injected by build_review.py).
   Sections: stats, why, strengths, findings, also, prototypes list, plan, scorecard, files. Each page keeps its own hero art
   and prototypes. No dependencies. */
(function () {
  const D = window.REVIEW; if (!D) return;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- hero stats
  const stats = $('[data-re="stats"]');
  if (stats) {
    stats.innerHTML = D.review.hero.stats.map((s) => {
      const raw = String(s.n).replace(/,/g, ""); const isNum = /^[0-9.]+$/.test(raw);
      return `<div role="listitem"><b>${isNum ? `<span class="count" data-to="${raw}" data-sep="${String(s.n).includes(",") ? 1 : 0}" data-dec="${(raw.split(".")[1] || "").length}">0</span>` : esc(s.n)}${s.suffix ? `<span class="suffix">${esc(s.suffix)}</span>` : ""}</b><span>${esc(s.label)}</span></div>`;
    }).join("");
  }
  // ---- why
  const why = $('[data-re="why"]');
  if (why) {
    const w = D.review.why;
    why.innerHTML = `<div class="h" role="row"><span role="columnheader">The posting asks for</span><span role="columnheader">Where this review answers it</span></div>` +
      w.rows.map((r) => `<div role="row"><b role="cell">${esc(r[0])}</b><span role="cell">${esc(r[1])}</span></div>`).join("");
  }
  // ---- strengths
  const st = $('[data-re="strengths"]');
  if (st) st.innerHTML = D.review.strengths.map((s) => `<article class="rv"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join("");
  // ---- findings
  const fd = $('[data-re="findings"]');
  if (fd) {
    fd.innerHTML = D.review.findings.map((f, i) => `
      <article class="finding rv" id="f${i + 1}">
        <div class="num">${String(i + 1).padStart(2, "0")}<small>${esc(f.duty)}</small></div>
        <div>
          <h3>${esc(f.title)}</h3>
          <p class="count">${esc(f.count)}</p>
          <div class="row"><span class="lab">Observed</span><p>${esc(f.observed)}</p></div>
          <div class="row"><span class="lab">Why it matters</span><p>${esc(f.why)}</p></div>
          <div class="row fix"><span class="lab">The fix</span><p>${esc(f.fix)}</p></div>
          <div class="row"><span class="lab">Evidence</span><div class="chips">${f.prototype ? `<a class="chip proto" href="#${esc(f.prototype)}">Working fix ↓</a>` : ""}${f.evidence.map((e) => `<span class="chip" title="captured page, ${esc(D.review.audited_label)}">${esc(e)}</span>`).join("")}</div></div>
        </div>
      </article>`).join("");
  }
  const also = $('[data-re="also"]');
  if (also) also.innerHTML = (D.review.also || []).map((a) => `<li>${esc(a)}</li>`).join("");
  // ---- plan
  const plan = $('[data-re="plan"]');
  if (plan) plan.innerHTML = ["30", "60", "90"].map((k) => `<div class="rv"><h3>First ${k} days</h3><ul>${D.review.plan[k].map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
  // ---- files
  const files = $('[data-re="files"]');
  if (files) {
    const F = D.review.files; const rows = [["Résumé", F.resume, "PDF"], ["Cover letter", F.cover, "PDF"], ["One-page summary of this review", F.summary, "PDF"], ["The workbook behind this page", F.workbook, "XLSX"]];
    files.innerHTML = rows.map((r) => `<a href="${esc(r[1])}" ${r[2] === "PDF" ? "" : "download"}><span>${esc(r[0])}</span><small>${r[2]}</small></a>`).join("");
  }
  // ---- scorecard
  const sc = $('[data-re="scorecard"]');
  if (sc) {
    const S = D.scorecard;
    const pill = S.pillars.map((p) => `<div class="pillar"><span class="n">${esc(p.name)} <span class="v">· weight ${p.weight}</span></span><span class="v">${p.pct == null ? "—" : Math.round(p.pct * 100) + "%"} · ${p.pts}/${p.max}</span><span class="bar"><i data-w="${p.pct == null ? 0 : Math.round(p.pct * 100)}"></i></span></div>`).join("");
    const groups = S.pillars.map((p) => {
      const rows = S.checks.filter((c) => c.pillar === p.id).map((c) => `<tr><td class="id">${c.id}</td><td class="s"><span class="sdot s${c.s}" aria-label="score ${c.s}">${c.s}</span></td><td><b>${esc(c.name)}</b><br><span style="color:var(--ink-2)">${esc(c.e)}</span></td></tr>`).join("");
      return `<details ${p.id === S.weakest ? "open" : ""}><summary><span>${esc(p.name)} <span class="m">${p.pts}/${p.max} points · ${p.verified} verified</span></span><span class="m">${esc(p.question)}</span></summary><table><tbody>${rows}</tbody></table></details>`;
    }).join("");
    sc.innerHTML = `
      <div class="dial rv">
        <p class="kicker">ShelfMark score · ${esc(D.review.store_scored)}</p>
        <div class="big">${S.score}<small>/100</small></div>
        <div class="grade">Grade <b>${S.grade}</b> · ${esc(S.band)}</div>
        <dl><dt>Would rank</dt><dd>${S.rank} of ${S.index_n} on the Michigan index</dd><dt>Index average</dt><dd>${S.index_mean}</dd><dt>Verified</dt><dd>${S.verified} of 29 checks</dd><dt>Weakest pillar</dt><dd>${esc(S.weakest_name)}</dd><dt>Read on</dt><dd>${esc(D.review.audited_label)}</dd></dl>
        <p style="margin:6px 0 0;font-size:.85rem;color:var(--muted)">Same 29 public-page checks as <a href="https://mousabatarseh.com/shelfmark/">ShelfMark</a>, the Michigan Storefront Benchmark. 2 = meets, 1 = partly, 0 = fails, U = not observable.</p>
      </div>
      <div><div class="pillars rv">${pill}</div><div class="checks rv">${groups}</div></div>`;
  }
  // ---- header nav + menu + progress + active section
  const nav = $("#nav"), tog = $(".menu-toggle");
  if (tog && nav) { tog.addEventListener("click", () => { const o = nav.classList.toggle("open"); tog.setAttribute("aria-expanded", o); }); nav.addEventListener("click", (e) => { if (e.target.tagName === "A") { nav.classList.remove("open"); tog.setAttribute("aria-expanded", "false"); } }); }
  const prog = $(".progress");
  const onScroll = () => { if (prog) { const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%"; } };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const secs = [...document.querySelectorAll("main section[id]")];
  if (secs.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id)); } }), { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach((s) => io.observe(s));
  }
  // ---- reveal + counters + bars
  const rv = [...document.querySelectorAll(".rv")];
  const counters = [...document.querySelectorAll(".count[data-to]")];
  const bars = [...document.querySelectorAll(".pillar .bar i")];
  const fmt = (n, sep, dec) => { const s = n.toFixed(dec); return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : s; };
  const run = (el) => { const to = parseFloat(el.dataset.to), dec = +el.dataset.dec || 0, sep = el.dataset.sep === "1"; if (reduce) { el.textContent = fmt(to, sep, dec); return; } const t0 = performance.now(), dur = 1400; const tick = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * e, sep, dec); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  if ("IntersectionObserver" in window && !reduce) {
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; const el = e.target; if (el.classList.contains("rv")) el.classList.add("in"); if (el.matches(".count[data-to]")) run(el); if (el.matches(".pillar .bar i")) el.style.width = el.dataset.w + "%"; io2.unobserve(el); }), { rootMargin: "0px 0px -5% 0px", threshold: 0 });
    [...rv, ...counters, ...bars].forEach((el) => io2.observe(el));
    // safety net: anything already on screen at load, and anything still hidden after a while, is revealed
    const sweep = () => rv.forEach((el) => { if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); });
    setTimeout(sweep, 300); setTimeout(sweep, 2000); addEventListener("scroll", sweep, { passive: true });
  } else { rv.forEach((el) => el.classList.add("in")); counters.forEach(run); bars.forEach((el) => (el.style.width = el.dataset.w + "%")); }
  // ---- marquee
  const mq = $("#mq");
  if (mq && D.review.marquee) { const items = D.review.marquee; mq.innerHTML = (items.concat(items)).map((t) => `<span>${esc(t)}</span>`).join(""); }
})();
