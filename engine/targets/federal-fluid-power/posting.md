# Job posting capture — Federal Fluid Power, Inc.

## Retrieval note
The Indeed page `https://www.indeed.com/viewjob?jk=2f539b8a6bbf3400` could not be captured on 2026-09-28: WebFetch of that URL returned a different, expired listing ("E-Commerce Manager", Eccalon LLC, Detroit), and the Indeed MCP tool answered "Rate limit exceeded" on five attempts spread over ~10 minutes. The posting details below are therefore taken from the target brief supplied for this audit, not from a live copy of the page. Re-verify title, pay and duties against Indeed before quoting them in the review.

## Role
- **Title:** Full Stack IT Specialist, E-Commerce Developer & Content Editor
- **Employer:** Federal Fluid Power, Inc.
- **Location / mode:** On-site, Plymouth, MI 48170 (14940 Cleat St per the site footer and BBB)
- **Pay:** up to $65,000 / year (per brief)
- **Posted:** September 16, 2026 on Indeed (per brief)
- **Apply URL:** https://www.indeed.com/viewjob?jk=2f539b8a6bbf3400
- **Company careers page:** https://federalfp.com/career-at-federal-fluid-power-inc/ — exists but shows only the generic "Services" paragraph, no openings (captures/career.html)

## Responsibilities (as summarised in the brief; not verbatim from Indeed)
- Create and maintain product listings — copy, attributes, images and catalog content — for the B2B store (federalfp.com, Magento 2)
- Oversee the Magento 2 integration with the ERP; keep product and inventory data accurate
- Build EDI / API connections
- Internal IT and network support (secondary duty)
- Report progress to management

## Requirements (as summarised in the brief)
- Magento 2 plus WordPress/HTML skills
- CRM/ERP familiarity; inventory management
- Content editing for product listings

## Observed context that the posting implies
- The store is a Magento 2 / Hyvä multi-store install shared with sister site patriothyd.com (same `static/version1789741354`, identical robots.txt listing both sitemaps) — the hire will own both store views.
- Catalog scale: 3 of 9 sitemap files hold 51,918 product URLs and 2,484 categories; product `lastmod` dates cluster in Aug 2026 (48,233) and Sep 2026 (3,749), consistent with a bulk ERP resync.
- Existing tooling seen in the HTML: Amasty Shop By (layered navigation), Amasty Product Attachments (datasheets), Amasty WebP/lazy-load, Magezon page builder, Hyvä theme, reCAPTCHA on the contact form.

## People (public sources only — verify before use)
| Name | Title (source wording) | Source |
|---|---|---|
| Ryan Barringer | "President" (BBB principal contact); "Applications Engineer" / "Sales and Applications Engineer" (LinkedIn headline, ZoomInfo, RocketReach) | https://www.bbb.org/us/mi/plymouth/profile/hydraulic-equipment/federal-fluid-power-inc-0372-46000341 ; https://www.linkedin.com/in/ryan-barringer-7b71a37/ ; https://www.zoominfo.com/p/Ryan-Barringer/1367124678 |
| Mark Barringer | "General Manager" | https://www.linkedin.com/in/mark-barringer-b1560229/ ; https://rocketreach.co/mark-barringer-email_58546456 ; ZoomInfo company page |
| Bill Barringer | listed at "federal fluid power inc" (no title in the search result) | https://www.linkedin.com/in/bill-barringer-65861229/ |
| Jordan Martin | "Web Administrator" — the closest thing to an incumbent for this role | https://www.zoominfo.com/p/Jordan-Martin/11991975017 |
| Stephen Weber | "Branch Manager, Internal Sales Manager" | ZoomInfo company page https://www.zoominfo.com/c/federal-fluid-power-inc/14106690 |
| Alan Baumann | "Controller" | ZoomInfo / RocketReach company pages |
| Tom Heintz | "Hydraulic Engineer" | https://rocketreach.co/federal-fluid-power-profile_b5e77a42f42e5a88 |

No operations/e-commerce/marketing lead other than the Web Administrator was found on LinkedIn via search; the LinkedIn company page itself is blocked to fetchers (robots), so headcount comes from third parties (ZoomInfo "11-50 employees"; RocketReach "16 total employees"; brief: ~16 LinkedIn employees).
