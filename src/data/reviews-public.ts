// What each review's card says in public — on the home page, /reviews/ and the index. The full reviews (each
// its own noindex site, sent as a private link to the person it was written for) keep every finding; the public
// card leads with what was READ and what was BUILT, not with the brand's defect count. A company should be able
// to find its name here and see a piece of work, not a headline against it. Decided 2026-09-28 (see
// docs/research/recruiter-strategy.md).
export type PublicStat = { value: string; of: string; label: string };
export const publicStats: Record<string, PublicStat> = {
  reworked: { value: '3,545', of: '', label: 'listings read, with four working fixes built on the day’s catalog' },
  bran: { value: '4', of: '', label: 'sites read as one pattern, with a filterable line card built as the fix' },
  petsafe: { value: '1', of: '', label: 'working Meta Description Repair Bench, built for the product pages' },
  highprofile: { value: '7', of: '', label: 'state deals pages checked for promo readiness' },
  jars: { value: '3', of: '', label: 'data sources reconciled: menus, store records and pages' },
  lume: { value: '2', of: '', label: 'promotion rollouts traced from hero to landing page to cart rule' },
  dutchie: { value: '1', of: '', label: 'shipped feature traced across every public launch surface' },
  salt: { value: '720', of: '', label: 'sitemap URLs checked, with the FAQPage markup written' },
  vanguard: { value: '443', of: '', label: 'products covered by one template fix' },
  oakwood: { value: '300+', of: '', label: 'species, with a working species-faceted browser built as the fix' },
  moment: { value: '2', of: '', label: 'offer surfaces reconciled: the promise and the price' },
  jbtools: { value: '104,348', of: '', label: 'products in the index, with a supplier-price SOP' },
  dunhams: { value: '275', of: '', label: 'stores, with a store-page generator built as the fix' },
  biotrust: { value: '1', of: '', label: 'clickable go-live gate, built for the relaunch' },
  bestlife: { value: '800', of: '', label: 'franchise location pages, with a location-health scanner' },
  behealth: { value: '1', of: '', label: 'client-audit template, built from the review' },
  aedit: { value: '10', of: '', label: 'days to launch, with a launch checklist' },
  dehanche: { value: '164', of: '', label: 'live products run through a catalog scanner' },
  hayhouse: { value: '874', of: '', label: 'products checked, with worked examples for reporting and SOPs' },
  carhartt: { value: '13', of: '', label: 'findings with captured evidence, prototypes and a 90-day plan' },
  icr: { value: '59', of: '', label: 'live listings run through a title linter' },
  diamedical: { value: '2', of: '', label: 'parts: an experience review and a working commerce lab' },
  blueroot: { value: '397', of: '', label: 'products read across four Shopify stores, with a weekly QA workbook' },
  'royal-apparel': { value: '1,063', of: '', label: 'sitemap URLs classified, with five working fixes' },
  'federal-fluid-power': { value: '54,496', of: '', label: 'sitemap URLs read, with an attribute parser built on the catalog' },
};
// Headlines that name a defect against the brand are replaced on the public card by the review's own scope line.
export const publicHeadlines: Record<string, string> = {
  reworked: 'Recommerce, read listing by listing.',
  bran: 'One pattern across four sites.',
  petsafe: 'A DTC stack, read signal by signal.',
  highprofile: 'Seven states, one promo calendar.',
  jars: 'Menus, store records and pages, reconciled.',
  lume: 'What the deal says and what the rule does, matched.',
  dutchie: 'Shipping is done. Ready is the other half.',
  salt: 'Found by people. Quoted by machines.',
  vanguard: 'Fix one template. Fix 443 products.',
  oakwood: 'Three hundred species, one browser.',
  moment: 'Every number a shopper sees should be true.',
  jbtools: 'A 104,000-product catalog, record by record.',
  dunhams: '275 stores. A page for every one.',
  biotrust: 'Before the relaunch, a go-live gate.',
  bestlife: 'Nearly 800 front doors. Every one should open.',
  behealth: 'Technical SEO, audited the way they’d audit a client.',
  aedit: 'Ten days to launch, with a checklist.',
  'royal-apparel': 'Made in USA, read field by field.',
  'federal-fluid-power': 'The parts are here.',
};
