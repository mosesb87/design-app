/* =====================================================================
   Deals OS — independent concept for LIV Cannabis
   Author: Mousa (Moses) Batarseh
   All deal data below is ILLUSTRATIVE sample data — not live LIV pricing.
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* inject small runtime CSS (summary reset + scroll offset) */
  const st = document.createElement("style");
  st.textContent = `.ev-head{list-style:none;cursor:pointer}.ev-head::-webkit-details-marker{display:none}.ev-head::marker{content:""}
  section[id]{scroll-margin-top:var(--topbar-h,92px)}html{scroll-behavior:${reduce ? "auto" : "smooth"}}`;
  document.head.appendChild(st);

  /* ---------------- DATA ---------------- */
  const STORES = [
    { id: "detroit", name: "LIV Detroit" },
    { id: "ferndale", name: "LIV Ferndale" },
    { id: "grandrapids", name: "LIV Grand Rapids" },
    { id: "lakeorion", name: "LIV Lake Orion" },
    { id: "lansing", name: "LIV Lansing" },
    { id: "pontiac", name: "LIV Pontiac" },
    { id: "westland", name: "LIV Westland" },
  ];
  const ALL = STORES.map((s) => s.id);
  const D = (n) => { const d = new Date(); d.setHours(23, 59, 0, 0); d.setDate(d.getDate() + n); return d; };

  const DEALS = [
    { id: "D-101", mech: "2 for $47.99", name: "Tip Top Crop Flower 3.5g", brand: "Tip Top Crop", cat: "flower", type: "multibuy", strain: "hybrid", stores: ALL, end: D(2), auto: true, elig: "Select 3.5g prepackaged flower", excl: "Can't stack with other flower deals" },
    { id: "D-102", mech: "4 for $39.99", name: "Common Citizen Flower 3.5g", brand: "Common Citizen", cat: "flower", type: "multibuy", strain: "sativa", stores: ALL, end: D(9), auto: true, elig: "Common Citizen 3.5g", excl: "One redemption per visit" },
    { id: "D-103", mech: "The 30% Club", name: "30% off select bulk flower", brand: "Freedom Green & more", cat: "flower", type: "percent", strain: "any", stores: ["detroit", "grandrapids", "lansing"], end: D(14), auto: true, elig: "Tagged bulk-flower collection", excl: "Excludes already-discounted items" },
    { id: "D-104", mech: "Rush Hour · 15% off", name: "Everything, 4–6pm daily", brand: "Storewide", cat: "all", type: "percent", strain: "any", stores: ALL, end: D(30), auto: true, elig: "Entire menu during the window", excl: "In-store & pickup only · not stackable", note: "Daily · 4–6pm" },
    { id: "D-105", mech: "2 for $24.99", name: "Camino & Kiva Gummies 200mg", brand: "Camino · Kiva · Wana", cat: "edibles", type: "multibuy", strain: "any", stores: ALL, end: D(6), auto: true, elig: "Mix & match eligible gummy brands", excl: "200mg SKUs only" },
    { id: "D-106", mech: "2 for $54.99", name: "Legit Labs Live Resin Disposables 1g", brand: "Legit Labs", cat: "vapes", type: "multibuy", strain: "hybrid", stores: ["ferndale", "detroit", "westland", "pontiac"], end: D(4), auto: true, elig: "1g live-resin disposables", excl: "While supplies last" },
    { id: "D-107", mech: "Double points", name: "Highly Loyal Club weekend", brand: "Loyalty", cat: "all", type: "loyalty", strain: "any", stores: ALL, end: D(3), auto: false, elig: "All members, all categories", excl: "Sign in to redeem · points auto-apply", note: "Members only" },
    { id: "D-108", mech: "Free delivery", name: "On orders over $50", brand: "Delivery", cat: "all", type: "loyalty", strain: "any", stores: ALL, end: D(30), auto: true, elig: "Delivery orders ≥ $50", excl: "Delivery orders only" },
    { id: "D-109", mech: "2 for $28.99", name: "Jeeter Pre-Rolls", brand: "Jeeter", cat: "prerolls", type: "multibuy", strain: "sativa", stores: ["ferndale", "pontiac", "westland"], end: D(11), auto: true, elig: "Jeeter infused & classic pre-rolls", excl: "Excludes 5-packs" },
    { id: "D-110", mech: "20% off", name: "Wyld Gummies", brand: "Wyld", cat: "edibles", type: "percent", strain: "hybrid", stores: ["grandrapids", "lakeorion", "lansing"], end: D(2), auto: true, elig: "All Wyld gummy SKUs", excl: "While supplies last" },
    { id: "D-111", mech: "4 for $64.99", name: "Common Citizen Flower 7g", brand: "Common Citizen", cat: "flower", type: "multibuy", strain: "indica", stores: ALL, end: D(9), auto: true, elig: "Common Citizen 7g", excl: "One redemption per visit" },
    { id: "D-112", mech: "2 for $34.99", name: "Party Favors Juicebox Disposable 3g", brand: "Party Favors", cat: "vapes", type: "multibuy", strain: "any", stores: ["detroit", "ferndale", "grandrapids", "lakeorion", "lansing", "pontiac"], end: D(7), auto: true, elig: "3g Juicebox disposables", excl: "Excludes 2g line" },
  ];

  const FILTERS = [
    { id: "all", label: "All deals" },
    { id: "flower", kind: "cat", label: "Flower" },
    { id: "prerolls", kind: "cat", label: "Pre-Rolls" },
    { id: "vapes", kind: "cat", label: "Vapes" },
    { id: "edibles", kind: "cat", label: "Edibles" },
    { id: "percent", kind: "type", label: "% off" },
    { id: "multibuy", kind: "type", label: "Multi-buy" },
    { id: "loyalty", kind: "type", label: "Loyalty & delivery" },
  ];

  const ROUTES = [
    { click: 'Click "DEALS" (top nav)', from: "livcannabis.com", node: "/locations/", cls: "dead", verdict: "Dead end — a locations list, not deals", vcls: "bad" },
    { click: 'Click "Ferndale Deals"', from: "beta.livcannabis.com/ferndale", node: "302 → store home", cls: "dead", verdict: "Lands on the storefront home, not deals", vcls: "bad" },
    { click: "The actual deals page", from: "beta.livcannabis.com", node: "/shop/specials", cls: "good", verdict: "Works — but nothing on the site links here", vcls: "ok" },
  ];

  const EVIDENCE = [
    { id: "F-01", cls: "fact", conf: "High", title: "The public homepage runs WordPress 7.1.2 and still serves unedited placeholder SEO/social text.",
      observed: 'The homepage Open Graph description — the text shown when the site is shared or previewed in search — reads: "LIV Cannabis This is an example page. It\'s different from a blog post because it will stay in one place…", the default WordPress sample-page text. Meta generator: "WordPress 7.1.2". Footer: "LIV Cannabis Company | 2023".',
      url: "https://livcannabis.com/", shot: "home-wp-desktop-fair-full.webp", shotcap: "livcannabis.com homepage, 30 Sep 2026. Footer still reads © 2023.",
      code: '<span class="cm">&lt;!-- livcannabis.com homepage &lt;head&gt; --&gt;</span>\n&lt;meta property="og:description"\n  content="LIV Cannabis <span class="hl">This is an example page. It’s\n  different from a blog post because it will stay in\n  one place and will show up in your site navigation…</span>"&gt;\n&lt;meta name="generator" content="<span class="hl">WordPress 7.1.2</span>"&gt;',
      why: "The site's own share/search preview is boilerplate, not a written description — a weak first impression and a sign the marketing front door was never finished." },
    { id: "F-02", cls: "fact", conf: "High", title: "“Deals” is a dead end — no deals affordance on the site reaches an actual deals view.",
      observed: 'The primary-nav "DEALS" links to livcannabis.com/locations/ (a locations list). Each per-store "[City] Deals" link resolves to that store\'s storefront home (e.g. "GR Deals" → beta.livcannabis.com/grand-rapids → 302 → beta home), which shows a generic hero, not deals.',
      url: "https://livcannabis.com/stores/", shot: "beta-store-desktop.webp", shotcap: 'Where a "Deals" link actually lands: the storefront home, not deals.',
      why: "The single most deal-driven action on the site leads nowhere useful. A shopper who clicks “Deals” never lands on deals.", callout: "Generic home — no deals" },
    { id: "F-03", cls: "fact", conf: "High", title: "A capable, working deals page already exists — but nothing on the public site links to it.",
      observed: 'beta.livcannabis.com/shop/specials renders a real specials experience: e.g. "2/$42.99 Tier Four Prepackaged Flower 3.5g", "4/$79.99…", SALE badges, product cards and add-to-cart. None of the site\'s "Deals" affordances route here.',
      url: "https://beta.livcannabis.com/shop/specials", shot: "beta-specials-desktop.webp", shotcap: "The real, working specials page — reachable only if you already know the URL.",
      why: "This is an orchestration gap, not a capability gap. The value is built and hidden — the cheapest problem to fix and the highest-leverage.", callout: "Real deals live here" },
    { id: "F-04", cls: "fact", conf: "High", title: "The migration is half-finished and inconsistent between locations.",
      observed: "livcannabis.com/grand-rapids-order-online/ returns 301 → the new platform. livcannabis.com/ferndale-order-online/ returns 200 and still shows a stub: “We're excited to be rolling out a new and improved shopping experience! …as we transition to the new site” (footer 2023). Same “Order Online” affordance, two different destinations by store.",
      url: "https://livcannabis.com/ferndale-order-online/", shot: "ferndale-orderonline-transition.webp", shotcap: "The Ferndale “transition” stub — archived online since 2022, still live in 2026.",
      why: "Identical actions behave differently by location. Inconsistent journeys make it effectively impossible to keep promotions and messaging synchronised across stores." },
    { id: "F-05", cls: "fact", conf: "High", title: "Store data is out of sync within the same site: the homepage lists six stores, the nav and Stores page list seven.",
      observed: "The homepage “Locations” block lists Detroit, Ferndale, Grand Rapids, Lake Orion, Lansing and Westland — six, omitting Pontiac. The nav dropdown and /stores page both include Pontiac (45671 Woodward), for seven.",
      url: "https://livcannabis.com/stores/", shot: "stores-wp-desktop-full.webp", shotcap: "The Stores page: seven locations, including Pontiac.",
      why: "If a store can silently go missing on one page while present on another, the same content-drift affects deals, hours and eligibility — the data a promotion depends on." },
    { id: "F-06", cls: "fact", conf: "High", title: "Two front-ends run in parallel, so every promotion must be maintained across multiple surfaces.",
      observed: "livcannabis.com is WordPress (marketing shell). beta.livcannabis.com is a separate commerce platform, with native iOS and Android apps linked from its footer. Deals live on the commerce platform and the apps; the marketing site and its “Deals” links live on WordPress.",
      url: "https://beta.livcannabis.com/", shot: "beta-store-mobile.webp", shotcap: "The commerce platform on mobile — one of four surfaces a deal must stay correct on.",
      why: "A promotion has to be right on the commerce site, the marketing site and two apps at once. Without one source of truth and a publish step, drift is the default, not the exception." },
    { id: "H-01", cls: "hypothesis", conf: "Medium", title: "The dead-end routing plausibly adds friction for deal-driven shoppers and sends some to competitors.",
      observed: "Based on the observable journey only (F-02 / F-03). Ferndale sits within ~1 mile of several dispensaries advertising aggressive storewide discounts on Weedmaps.",
      url: "https://livcannabis.com/", why: "A UX/operational hypothesis based on the observable experience. Internal analytics would be required to quantify its business impact — which is exactly why I've labelled it a hypothesis, not a fact." },
    { id: "H-02", cls: "hypothesis", conf: "Medium", title: "Shoppers who land on a 2022-era “we're transitioning” stub may bounce or lose confidence.",
      observed: "F-04. The Ferndale stub has been archived online since 2022 yet is still live in 2026.",
      url: "https://livcannabis.com/ferndale-order-online/", why: "A UX hypothesis based on the observable experience. Quantifying bounce or lost orders would require LIV's analytics." },
  ];

  /* Deal OS pipeline records */
  const OS = [
    { id: "OS-201", name: "2 for $47.99 — Tip Top Crop Flower 3.5g", type: "Multi-buy", cat: "Flower", brand: "Tip Top Crop", strain: "Hybrid",
      stores: ["Detroit", "Ferndale", "Grand Rapids", "Lake Orion", "Lansing", "Pontiac", "Westland"], start: "30 Sep 2026", end: "07 Oct 2026",
      owner: "Promo Lead", stacking: "Not stackable", excl: ["Excludes other flower deals"], targets: { web: true, ios: true, android: true },
      status: "live", stlabel: "Live",
      qa: [["Start/end window valid", 1], ["≥1 participating store (7)", 1], ["Eligible products resolve (4 SKUs)", 1], ["Exclusions & stacking defined", 1], ["Links to a live menu destination", 1], ["Approver signed off", 1]] },
    { id: "OS-202", name: "The 30% Club — select bulk flower", type: "% off", cat: "Flower", brand: "Freedom Green & more", strain: "Any",
      stores: ["Detroit", "Grand Rapids", "Lansing"], start: "03 Oct 2026", end: "14 Oct 2026",
      owner: "Merchandising", stacking: "Not stackable", excl: ["Excludes already-discounted items"], targets: { web: true, ios: true, android: false },
      status: "scheduled", stlabel: "Scheduled",
      qa: [["Start/end window valid", 1], ["≥1 participating store (3)", 1], ["Eligible products resolve (22 SKUs)", 1], ["Exclusions & stacking defined", 1], ["Links to a live menu destination", 1], ["Approver signed off", 1]] },
    { id: "OS-203", name: "Jeeter Pre-Rolls — 2 for $28.99", type: "Multi-buy", cat: "Pre-Rolls", brand: "Jeeter", strain: "Sativa",
      stores: ["Ferndale", "Pontiac", "Westland"], start: "01 Oct 2026", end: "11 Oct 2026",
      owner: "Promo Lead", stacking: "Not stackable", excl: ["Excludes 5-packs"], targets: { web: false, ios: false, android: false },
      status: "review", stlabel: "In review",
      qa: [["Start/end window valid", 1], ["≥1 participating store (3)", 1], ["Eligible products resolve (9 SKUs)", 1], ["Exclusions & stacking defined", 1], ["Links to a live menu destination", 1], ["Approver signed off", 0]] },
    { id: "OS-204", name: "Wyld Gummies — 20% off", type: "% off", cat: "Edibles", brand: "Wyld", strain: "Hybrid",
      stores: ["Grand Rapids", "Lake Orion", "Lansing"], start: "05 Oct 2026", end: "02 Oct 2026",
      owner: "Merchandising", stacking: "Undefined", excl: [], targets: { web: false, ios: false, android: false },
      status: "blocked", stlabel: "Blocked",
      qa: [["Start/end window valid", 0, "End date (02 Oct) is before start (05 Oct)"], ["≥1 participating store (3)", 1], ["Eligible products resolve (14 SKUs)", 1], ["Exclusions & stacking defined", 0, "No stacking rule — would stack with Rush Hour 15%"], ["Links to a live menu destination", 1], ["Approver signed off", 0]] },
    { id: "OS-205", name: "Rush Hour — 15% off, 4–6pm daily", type: "% off", cat: "Storewide", brand: "Storewide", strain: "Any",
      stores: ["Detroit", "Ferndale", "Grand Rapids", "Lake Orion", "Lansing", "Pontiac", "Westland"], start: "01 Sep 2026", end: "31 Oct 2026",
      owner: "Marketing", stacking: "Not stackable", excl: ["In-store & pickup only"], targets: { web: true, ios: true, android: true },
      status: "live", stlabel: "Live",
      qa: [["Start/end window valid", 1], ["≥1 participating store (7)", 1], ["Eligible products resolve (menu-wide)", 1], ["Exclusions & stacking defined", 1], ["Links to a live menu destination", 1], ["Approver signed off", 1]] },
    { id: "OS-206", name: "Fall Flower Bundle (draft)", type: "Bundle", cat: "Flower", brand: "TBD", strain: "Any",
      stores: [], start: "—", end: "—",
      owner: "Unassigned", stacking: "Undefined", excl: [], targets: { web: false, ios: false, android: false },
      status: "draft", stlabel: "Draft",
      qa: [["Start/end window valid", 0, "No dates set"], ["≥1 participating store", 0, "No store attached — this is a dead-end deal"], ["Eligible products resolve", 0, "0 SKUs match the filter"], ["Exclusions & stacking defined", 0], ["Links to a live menu destination", 0, "Nowhere to send the customer"], ["Approver signed off", 0]] },
    { id: "OS-207", name: "Free delivery over $50", type: "Threshold", cat: "Storewide", brand: "Delivery", strain: "Any",
      stores: ["Detroit", "Ferndale", "Grand Rapids", "Lake Orion", "Lansing", "Pontiac", "Westland"], start: "01 Sep 2026", end: "31 Oct 2026",
      owner: "Ops", stacking: "Stackable", excl: ["Delivery orders only"], targets: { web: true, ios: true, android: true },
      status: "live", stlabel: "Live",
      qa: [["Start/end window valid", 1], ["≥1 participating store (7)", 1], ["Threshold rule resolves ($50)", 1], ["Exclusions & stacking defined", 1], ["Links to a live menu destination", 1], ["Approver signed off", 1]] },
  ];

  /* ---------------- ICONS ---------------- */
  const IC = {
    store: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9l1-5h16l1 5M4 9v10h16V9M4 9h16"/></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    tag: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 12l9-9 9 9-9 9z"/><circle cx="9" cy="9" r="1.4" fill="currentColor"/></svg>',
    ban: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
  };
  const strainLabel = (s) => s === "any" ? "All types" : s.charAt(0).toUpperCase() + s.slice(1);
  const catName = { flower: "Flower", prerolls: "Pre-Rolls", vapes: "Vapes", edibles: "Edibles", all: "Storewide" };

  /* ---------------- RENDER: routes ---------------- */
  function renderRoutes() {
    const el = $("#routeDemo"); if (!el) return;
    el.innerHTML = ROUTES.map((r) => `
      <div class="route">
        <span class="click">${r.click}</span>
        <span class="flow"><span class="node">${r.from}</span><span class="to">→</span><span class="node ${r.cls}">${r.node}</span></span>
        <span class="verdict ${r.vcls}">${r.verdict}</span>
      </div>`).join("");
  }

  /* ---------------- RENDER: evidence ---------------- */
  function renderEvidence() {
    const el = $("#evList"); if (!el) return;
    el.innerHTML = EVIDENCE.map((e) => {
      const figure = e.shot ? `<figure class="shot">${e.callout ? `<span class="callout" style="top:14px;left:14px">${e.callout}</span>` : ""}<img src="evidence/${e.shot}" loading="lazy" alt="${e.shotcap.replace(/"/g, "&quot;")}"><figcaption>${e.shotcap}</figcaption></figure>` : "";
      const code = e.code ? `<div class="code-ex" style="margin-top:16px">${e.code}</div>` : "";
      const right = (figure || code) ? `<div>${figure}${code}</div>` : `<div class="ev-why"><b>Why it matters</b>${e.why}</div>`;
      const left = `<div>
          <div class="ev-field"><div class="k">What was observed</div><div class="v">${e.observed}</div></div>
          <div class="ev-field"><div class="k">Source</div><a class="v" href="${e.url}" target="_blank" rel="noopener">${e.url}</a></div>
          <div class="ev-field"><div class="k">Date checked</div><div class="v">30 Sep 2026 · desktop + mobile</div></div>
          ${(figure || code) ? `<div class="ev-why"><b>Why it matters</b>${e.why}</div>` : ""}
        </div>`;
      return `<details class="ev ${e.cls === "hypothesis" ? "hyp" : ""}">
        <summary class="ev-head">
          <span class="ev-id">${e.id}</span>
          <span><span class="ev-title">${e.title}</span>
            <span class="ev-tags"><span class="tag ${e.cls}">${e.cls === "fact" ? "Fact" : "Hypothesis"}</span><span class="tag conf">Confidence: ${e.conf}</span></span>
          </span>
          <span class="ev-chev" aria-hidden="true">+</span>
        </summary>
        <div class="ev-body"><div class="grid">${left}${right}</div></div>
      </details>`;
    }).join("");
  }

  /* ---------------- RENDER: customer deals ---------------- */
  let curStore = "ferndale", curFilter = "all";
  function availAt(deal, store) { return deal.stores === ALL || deal.stores.includes(store); }
  function matchFilter(deal) {
    const f = FILTERS.find((x) => x.id === curFilter);
    if (!f || f.id === "all") return true;
    if (f.kind === "cat") return deal.cat === f.id;
    if (f.kind === "type") return deal.type === f.id;
    return true;
  }
  function daysLeft(end) { return Math.ceil((end - new Date()) / 86400000); }
  function countdown(deal) {
    if (deal.note && /daily/i.test(deal.note)) return { txt: deal.note, soon: false };
    const d = daysLeft(deal.end);
    if (d <= 0) return { txt: "Ends today", soon: true };
    if (d === 1) return { txt: "Ends tomorrow", soon: true };
    return { txt: `Ends in ${d} days`, soon: d <= 2 };
  }
  function storeName(id) { return (STORES.find((s) => s.id === id) || {}).name || id; }

  function dealCard(deal, off) {
    const badge = deal.strain === "any" ? "any" : deal.strain;
    const cd = countdown(deal);
    const cnt = deal.stores === ALL ? "All 7 stores" : `${deal.stores.length} store${deal.stores.length > 1 ? "s" : ""}`;
    return `<article class="deal${off ? " off" : ""}">
      <div class="deal-top">
        <span class="deal-mech">${deal.mech.replace(/\$[\d.]+/g, (m) => `<b>${m}</b>`)}</span>
        <span class="badge ${badge}">${strainLabel(deal.strain)}</span>
      </div>
      <div>
        <div class="deal-name">${deal.name}</div>
        <div class="deal-brand">${deal.brand}</div>
      </div>
      <div class="deal-meta">
        <div class="dm">${IC.tag}<span><span class="lbl">Eligible:</span> ${deal.elig}</span></div>
        <div class="dm">${IC.store}<span><span class="lbl">Stores:</span> ${off ? `<span style="color:var(--red)">Not running at ${storeName(curStore)}</span>` : cnt}</span></div>
        <div class="dm">${IC.ban}<span><span class="lbl">Exclusions:</span> ${deal.excl || "None"}</span></div>
      </div>
      <div class="deal-foot">
        <span class="countdown ${cd.soon ? "soon" : ""}">${IC.clock ? "" : ""}${cd.txt}</span>
        ${deal.auto ? '<span class="auto"><i></i>Auto-applied</span>' : '<span class="auto" style="color:var(--slate)"><i style="background:var(--slate);animation:none"></i>At checkout</span>'}
      </div>
      ${off ? `<div class="unavail">Unavailable at ${storeName(curStore)}</div>` : `<div class="deal-foot" style="padding-top:2px;border:0"><span class="stores-note">${deal.auto ? "Applies automatically in cart" : "Sign in to redeem"}</span><a class="deal-cta" href="#experience" onclick="return false">View on menu →</a></div>`}
    </article>`;
  }

  function renderDeals() {
    const grid = $("#dealsGrid"); if (!grid) return;
    const matched = DEALS.filter(matchFilter);
    const avail = matched.filter((d) => availAt(d, curStore));
    const off = matched.filter((d) => !availAt(d, curStore));
    $("#sfStore").textContent = storeName(curStore);
    $("#dealCount").textContent = `${avail.length} live · ${off.length} not at this store`;
    let html = avail.map((d) => dealCard(d, false)).join("");
    html += off.map((d) => dealCard(d, true)).join("");
    if (!matched.length) html = `<div class="empty">No deals match this filter. Try “All deals”.</div>`;
    grid.innerHTML = html;
  }
  function renderStoreSel() {
    const sel = $("#storeSel"); if (!sel) return;
    sel.innerHTML = STORES.map((s) => `<option value="${s.id}"${s.id === curStore ? " selected" : ""}>${s.name}</option>`).join("");
    sel.addEventListener("change", (e) => { curStore = e.target.value; renderDeals(); });
  }
  function renderFilters() {
    const el = $("#filters"); if (!el) return;
    el.innerHTML = FILTERS.map((f) => `<button class="chip" data-f="${f.id}" aria-pressed="${f.id === curFilter}">${f.label}</button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      curFilter = b.dataset.f;
      $$(".chip", el).forEach((c) => c.setAttribute("aria-pressed", c.dataset.f === curFilter));
      renderDeals();
    });
  }

  /* ---------------- RENDER: Deal OS ---------------- */
  let osSel = "OS-201";
  function osRow(d) {
    const fails = d.qa.filter((q) => !q[1]).length;
    const qaMini = fails ? `<span class="qa-mini fail">✕ ${fails} check${fails > 1 ? "s" : ""} failed</span>` : `<span class="qa-mini pass">✓ QA passed</span>`;
    return `<button class="os-row" data-id="${d.id}" aria-pressed="${d.id === osSel}" aria-label="${d.name} — ${d.stlabel}">
      <span class="rn">${d.name}</span>
      <span class="rmeta"><span class="st ${d.status}">${d.stlabel}</span>${qaMini}</span>
    </button>`;
  }
  function osDetail(d) {
    const fails = d.qa.filter((q) => !q[1]).length;
    const ready = fails === 0 && (d.status === "live" || d.status === "scheduled" || d.status === "review");
    const targets = ["web", "ios", "android"].map((t) => `<span class="ptarget ${d.targets[t] ? "on" : ""}">${t === "ios" ? "iOS" : t === "android" ? "Android" : "Web"}</span>`).join("");
    const qa = d.qa.map((q) => `<div class="qa-item ${q[1] ? "pass" : "fail"}"><span class="ic">${q[1] ? "✓" : "✕"}</span><span>${q[0]}${q[2] ? ` <span style="opacity:.85">— ${q[2]}</span>` : ""}</span></div>`).join("");
    const storeChips = d.stores.length ? d.stores.map((s) => `<span>${s}</span>`).join("") : `<span style="color:#f0868c">none attached</span>`;
    return `<div class="detail-h">
        <h3>${d.name}</h3>
        <span class="detail-id">${d.id} · <span class="st ${d.status}" style="position:static">${d.stlabel}</span></span>
      </div>
      <p class="detail-mech">${d.type} · ${d.cat} · ${d.brand}</p>
      <div class="fields">
        <div class="field"><span class="k">Deal type</span><span class="v">${d.type}</span></div>
        <div class="field"><span class="k">Category</span><span class="v">${d.cat}</span></div>
        <div class="field"><span class="k">Strain</span><span class="v">${d.strain}</span></div>
        <div class="field"><span class="k">Start</span><span class="v${d.start === "—" ? " warn" : ""}">${d.start}</span></div>
        <div class="field"><span class="k">End</span><span class="v${d.end === "—" ? " warn" : ""}">${d.end}</span></div>
        <div class="field"><span class="k">Owner</span><span class="v${d.owner === "Unassigned" ? " warn" : ""}">${d.owner}</span></div>
        <div class="field"><span class="k">Stacking</span><span class="v${d.stacking === "Undefined" ? " warn" : ""}">${d.stacking}</span></div>
        <div class="field" style="grid-column:span 2"><span class="k">Participating stores</span><div class="chips-mini">${storeChips}</div></div>
        <div class="field" style="grid-column:span 2"><span class="k">Exclusions</span><div class="chips-mini">${d.excl.length ? d.excl.map((x) => `<span>${x}</span>`).join("") : '<span style="color:#f0868c">none defined</span>'}</div></div>
      </div>
      <div class="qa-block">
        <h4>QA checklist — ${fails ? `<span style="color:#f0868c">${fails} failing</span>` : '<span style="color:#c6ca63">all passing</span>'}</h4>
        ${qa}
      </div>
      <div class="publish-row">
        <span class="k" style="font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#8f8b81">Publish to</span>
        <span class="ptargets">${targets}</span>
        <button class="pub-btn ${ready ? "ready" : "blocked"}">${ready ? (d.status === "live" ? "Published — live" : d.status === "scheduled" ? "Scheduled ✓" : "Approve & publish") : "Blocked — fix QA first"}</button>
      </div>`;
  }
  function renderOS() {
    const list = $("#osList"), det = $("#osDetail"); if (!list || !det) return;
    list.querySelectorAll(".os-row").forEach((n) => n.remove());
    list.insertAdjacentHTML("beforeend", OS.map(osRow).join(""));
    det.innerHTML = osDetail(OS.find((d) => d.id === osSel));
    list.addEventListener("click", (e) => {
      const b = e.target.closest(".os-row"); if (!b) return;
      osSel = b.dataset.id;
      $$(".os-row", list).forEach((r) => r.setAttribute("aria-pressed", r.dataset.id === osSel));
      det.innerHTML = osDetail(OS.find((d) => d.id === osSel));
      if (!reduce) { det.style.opacity = 0; requestAnimationFrame(() => { det.style.transition = "opacity .35s"; det.style.opacity = 1; }); }
    }, { once: false });
  }

  /* ---------------- PIPELINE ANIMATION ---------------- */
  const STAGES = [
    { n: "Create", d: "Draft the deal", ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>' },
    { n: "Validate", d: "Check the rules", ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h10"/></svg>' },
    { n: "QA", d: "Run the checklist", ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>' },
    { n: "Approve", d: "Sign off", ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 6L9 17l-5-5"/></svg>' },
    { n: "Publish", d: "Push everywhere", ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' },
  ];
  const SCEN = {
    good: {
      hint: "Clean-deal scenario loaded.",
      log: [
        ["ok", "Create", "Deal drafted — 2 for $47.99 · Tip Top Crop Flower 3.5g"],
        ["ok", "Validate", "Window 30 Sep–07 Oct valid · 7 stores attached · 4 SKUs resolved"],
        ["ok", "QA", "6 / 6 checks passed · links to a live menu destination ✓"],
        ["ok", "Approve", "Approved by promo lead"],
        ["ok", "Publish", "Pushed to Web · iOS · Android — live now"],
      ],
      stopAt: 5, ok: true,
    },
    bad: {
      hint: "Broken-deal scenario — the exact gap documented above.",
      log: [
        ["mk", "Create", "Deal drafted — “Fall Flower Bundle”"],
        ["mk", "Validate", "No dates set · 0 participating stores · 0 SKUs resolved"],
        ["bad", "QA", "FAILED — no store attached, no live menu destination to send the customer to"],
        ["bad", "—", "Blocked at QA. This is the check that catches a dead-end deal. It never reaches a customer."],
      ],
      stopAt: 3, ok: false,
    },
  };
  let scenario = "good", pipeTimers = [];
  function buildTrack() {
    const track = $("#pipeTrack");
    $$(".pipe-stage", track).forEach((n) => n.remove());
    STAGES.forEach((s, i) => {
      const el = document.createElement("div");
      el.className = "pipe-stage"; el.dataset.i = i;
      el.innerHTML = `<div class="pipe-node">${s.ic}</div><div class="pn">${s.n}</div><div class="pd">${s.d}</div>`;
      track.appendChild(el);
    });
  }
  function clearPipe() {
    pipeTimers.forEach(clearTimeout); pipeTimers = [];
    $$(".pipe-stage").forEach((s) => s.className = "pipe-stage");
    $("#pipeFill").style.width = "0";
    const pk = $("#pipePacket"); pk.style.left = "10%"; pk.className = "pipe-packet"; pk.style.opacity = "1";
    $("#pipeLog").innerHTML = "";
    const out = $("#pipeOut"); out.className = "pipe-out-slot"; out.innerHTML = `<div class="pipe-out-empty">Nothing published yet.<br>Run the pipeline to see what a customer receives.</div>`;
    const stx = $("#pipeOutStatus"); stx.className = "st draft"; stx.textContent = "idle";
  }
  function stagePos(i) { return 10 + (i * (80 / 4)); } // % across track (5 nodes over 10%..90%)
  function runPipe() {
    clearPipe();
    const sc = SCEN[scenario];
    const stages = $$(".pipe-stage");
    const fill = $("#pipeFill"), packet = $("#pipePacket"), log = $("#pipeLog"), out = $("#pipeOut"), stx = $("#pipeOutStatus");
    const step = reduce ? 10 : 900;

    if (reduce) {
      // reduced motion: show final state instantly
      sc.log.forEach((l) => { const d = document.createElement("div"); d.className = "ln " + (l[0] === "bad" ? "bad" : l[0] === "ok" ? "ok" : ""); d.innerHTML = `<span class="mk">${l[0] === "bad" ? "✕" : l[0] === "ok" ? "✓" : "›"}</span><span><b>${l[1]}</b> — ${l[2]}</span>`; d.classList.add("show"); log.appendChild(d); });
      for (let i = 0; i < sc.stopAt; i++) stages[i].classList.add(sc.ok || i < sc.stopAt - 1 ? "done" : "failed");
      if (!sc.ok) stages[sc.stopAt - 1].classList.add("failed");
      fill.style.width = (stagePos(sc.stopAt - 1) - 10) + "%";
      finishPipe(sc, out, stx, packet);
      return;
    }

    let t = 300;
    for (let i = 0; i < sc.stopAt; i++) {
      const idx = i;
      pipeTimers.push(setTimeout(() => {
        stages.forEach((s, j) => { if (j < idx) { s.classList.remove("active"); s.classList.add("done"); } });
        const isFailStage = !sc.ok && idx === sc.stopAt - 1;
        stages[idx].classList.add(isFailStage ? "failed" : "active");
        packet.style.left = stagePos(idx) + "%";
        if (isFailStage) packet.classList.add("dead");
        fill.style.width = (stagePos(idx) - 10) + "%";
        // log line for this stage
        const l = sc.log[idx];
        if (l) { const d = document.createElement("div"); d.className = "ln " + (l[0] === "bad" ? "bad" : l[0] === "ok" ? "ok" : ""); d.innerHTML = `<span class="mk">${l[0] === "bad" ? "✕" : l[0] === "ok" ? "✓" : "›"}</span><span><b>${l[1]}</b> — ${l[2]}</span>`; log.appendChild(d); requestAnimationFrame(() => d.classList.add("show")); }
      }, t));
      t += step;
    }
    // final line for bad scenario (the explanatory 4th line) + finish
    pipeTimers.push(setTimeout(() => {
      if (!sc.ok && sc.log[sc.stopAt]) { const l = sc.log[sc.stopAt]; const d = document.createElement("div"); d.className = "ln bad"; d.innerHTML = `<span class="mk">■</span><span>${l[2]}</span>`; log.appendChild(d); requestAnimationFrame(() => d.classList.add("show")); }
      if (sc.ok) { stages[sc.stopAt - 1].classList.remove("active"); stages[sc.stopAt - 1].classList.add("done"); }
      finishPipe(sc, out, stx, packet);
    }, t + 100));
  }
  function finishPipe(sc, out, stx, packet) {
    if (sc.ok) {
      out.className = "pipe-out-slot filled";
      out.innerHTML = dealCard(DEALS[0], false);
      stx.className = "st live"; stx.textContent = "live";
      if (!reduce) packet.style.opacity = "0";
    } else {
      out.className = "pipe-out-slot filled-bad";
      out.innerHTML = `<div class="pipe-out-empty" style="color:var(--red)"><b style="font-family:var(--serif);font-size:1.3rem;display:block;margin-bottom:8px">Nothing published.</b>The broken deal was stopped at QA — a customer never sees a dead end.</div>`;
      stx.className = "st blocked"; stx.textContent = "blocked";
    }
  }
  function setScenario(s) {
    scenario = s;
    $("#scGood").setAttribute("aria-pressed", s === "good");
    $("#scBad").setAttribute("aria-pressed", s === "bad");
    $("#pipeHint").textContent = SCEN[s].hint;
    clearPipe();
  }

  /* ---------------- NAV / UI ---------------- */
  function nav() {
    const nav = $("#nav"), bar = $("#topbar"); let last = 0;
    const measure = () => {
      const h = bar.offsetHeight;
      document.body.style.paddingTop = h + "px";
      document.documentElement.style.setProperty("--topbar-h", (h + 12) + "px");
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("solid", y > 30);
      if (y > 420 && y > last + 5) bar.classList.add("hide");
      else if (y < last - 5 || y < 420) bar.classList.remove("hide");
      last = y;
      $("#jumpTop").classList.toggle("show", y > 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const tog = $("#navToggle");
    tog.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      tog.setAttribute("aria-expanded", open);
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); tog.setAttribute("aria-expanded", false); }));
    $("#jumpTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  }
  function reveals() {
    if (reduce) { $$(".reveal,.reveal-stagger").forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal,.reveal-stagger").forEach((e) => io.observe(e));
  }

  /* ---------------- INIT ---------------- */
  function init() {
    renderRoutes();
    renderEvidence();
    renderStoreSel();
    renderFilters();
    renderDeals();
    renderOS();
    buildTrack();
    clearPipe();
    $("#scGood").addEventListener("click", () => setScenario("good"));
    $("#scBad").addEventListener("click", () => setScenario("bad"));
    $("#pipeReplay").addEventListener("click", runPipe);
    nav();
    reveals();
    // view-only guard on the embedded workbook (belt-and-suspenders; the Google Sheet's own
    // viewer settings do the real no-download/no-copy/no-print enforcement)
    const wbf = document.getElementById("wbFrame");
    if (wbf) ["copy", "cut", "dragstart", "selectstart"].forEach((ev) => wbf.addEventListener(ev, (e) => e.preventDefault()));
    // load the live view-only Google Sheet on demand (viewer mode: Google blocks copy/download/print
    // for viewers on this file). Opens on Deal Desk (gid 101); the tab row jumps to any stage.
    const WB = "https://docs.google.com/spreadsheets/d/1Fqe2HjpmN_YnQZ-srtrdzaxojN2zlJFRnBH6d717wtA/edit?rm=minimal";
    const wbLoad = document.getElementById("wbLoad"), wbStage = document.getElementById("wbStage");
    const wbTabs = [...document.querySelectorAll(".wb-tab[data-gid]")];
    const openWb = (gid) => {
      const tab = wbTabs.find((t) => t.dataset.gid === String(gid));
      const name = tab ? tab.textContent.replace(/^\d+\s·\s/, "") : "Deal Desk";
      wbStage.innerHTML = '<iframe class="wb-iframe" title="LIV Deal Operating System — live workbook (' + name + ')" src="' + WB + "&gid=" + gid + "#gid=" + gid + '"></iframe>';
      wbTabs.forEach((t) => { const on = t === tab; t.classList.toggle("on", on); t.setAttribute("aria-pressed", on ? "true" : "false"); });
      if (wbLoad) wbLoad.style.display = "none";
    };
    if (wbLoad && wbStage) wbLoad.addEventListener("click", () => openWb(101));
    if (wbStage) wbTabs.forEach((t) => t.addEventListener("click", () => openWb(t.dataset.gid)));
    requestAnimationFrame(() => document.body.classList.add("reveal-hero"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
