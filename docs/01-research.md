# Sapience AI — Research & Audit

> **Project:** speculative, motion-first website concept for Sapience AI (sapienceai.co), made as a proof of skill for the Web Designer contract role. It is not affiliated with or endorsed by Sapience AI.
> **Research date:** 2026-09-24. This document merges four parallel research streams: a deep read of the site, the company's external footprint, the competitive landscape, and craft and platform requirements.
> **Readers:** the concept design team first. Later, possibly, Sapience AI's Head of Marketing Communications, brand team and engineering.

**Labels used throughout**

- **FACT**: checked against the cited URL. Text in quotation marks is verbatim.
- **OBSERVATION**: something we saw (crawl structure, a screenshot, a count, a comparison). It can be checked, but it involves some judgment or a tool limitation.
- **INTERPRETATION**: our inference or recommendation. It is not a claim about Sapience AI.

Unlabelled bullets and table rows in §1, §2 and §9 are FACTS.

---

## 0. Method & limits

### Tools used
| Tool | Used for |
|---|---|
| Exa server-side fetch and search | Every sapienceai.co page, LinkedIn company, people and posts pages, Greenhouse postings, competitor sites, Google/HubSpot/GSAP/W3C documentation, industry reports |
| HTML/CSS-to-Image connector | 7 screenshots of competitor home pages at 1440×900 (Higher Logic, Hivebrite, Betty, Glean, Guru ×2, Momentive), taken 2026-09-24 |
| Earlier screenshots of sapienceai.co | Visual identity notes in §4.3. Colors were sampled from pixels, not from CSS. |
| One DNS lookup from the research container | `getent hosts www.sapienceai.co`, 2026-09-24 |
| Public registries and aggregators | SEC EDGAR (Form D), PitchBook, Caplight, BuiltWith, GetLatka, Dealroom, Chrome Web Store, GitHub, npm |

### What could not be accessed, and why
| Target | What happened | Consequence |
|---|---|---|
| sapienceai.co via curl/WebFetch | The container's egress proxy blocks it (403) | We never saw raw HTML. **Heading levels in this document come from Exa's HTML-to-Markdown extraction.** `<title>`, meta, JSON-LD, alt text and ARIA were not checked at source. |
| web.archive.org | Blocked by the proxy | No site history. For example, we cannot tell whether a "Solutions" nav item ever existed (see §4.1). |
| linkedin.com, direct | Blocked by the proxy | LinkedIn was read through Exa. Some of that data is third-party "enrichment", flagged where used (§9 shows it contains a proven funding error). |
| sapienceai.co/sitemap.xml | The file exists, but Exa could not parse it | The page inventory comes from crawling plus guessed URLs. |
| Guessed URLs | All returned CRAWL_NOT_FOUND: /solutions, /solutions/associations, /about, /terms, /privacy, /blog, /resources, /security, /get-started, /demo, /agents, /sage, /affinity, /news, /press, /pricing, /partners, /case-studies, /team, /login, /notebouncer, /chrome, /waitlist, /openclaw, /about-us, /llms.txt | Treat these as absent on the live site |
| Home `<title>` | The Exa search result shows "Sapience AI \| Knowledge Platform for Membership Organizations". One Exa fetch returned "(no title)". | **Check in a real browser before raising it** |
| Exa cache timing | Cached Platform, Company and Developers pages carry "published: Jun 3, 2026" | Nav differences between pages may be stale cache, not the live site |
| Image content | Logos, the Sage phone mock and product UI are images, so text extraction cannot see them | There may be customer logos we could not see. Affinity and Corporate descriptions may sit in collapsed accordions. |
| Reference videos supplied for the concept | The research tools could not open them | §7 comes from the live reference sites, gallery write-ups (Awwwards, CSS Winner, A1 Gallery, One Page Love, landing.love) and, for EVR, a public prompt spec. **The design team should re-check §7 against the videos.** |
| Competitor visuals | Only 7 screenshots were taken, to save connector credits. The Guru capture rendered partly (loading skeletons). | Personify, Nimble, Fonteva, GrowthZone, Bloomfire, Notion and Microsoft were reviewed from text only |

### Confidence notes
- Aggregator data (LinkedIn enrichment, VCBacked, GetLatka) is used only where something else corroborates it, and is labelled when used.
- Headcount estimates across sources vary by 3×. Titles for the founder vary across sources (§1.3).
- The research team did not create any account, form submission or contact with Sapience AI.

---

## 1. Verified company facts

### 1.1 Identity & legal
| Fact | Detail | Source |
|---|---|---|
| Legal entity | "Sapience AI Corp" in the SEC filing and the Chrome Web Store; "Sapience AI Corporation" in the ToS, the Greenhouse board and the npm scope | https://www.sec.gov/Archives/edgar/data/2140753/000214075326000001/primary_doc.xml ; https://sapienceai.co/tos |
| Incorporation | Delaware, 2024 (SEC CIK 0002140753) | https://efts.sec.gov/LATEST/search-index?q=%22Sapience%20AI%22&forms=D ; SEC primary_doc (above) |
| Founded | 2024 | https://www.linkedin.com/company/sapience-ai-corp ; SEC (above) |
| Legal and mailing address | "1420 NW Gilman Blvd, Ste 2 #6014, Issaquah, WA 98027" | https://sapienceai.co/tos ; SEC (above) |
| Brand HQ | Seattle HQ, with an office in San Francisco | https://www.linkedin.com/company/sapience-ai-corp |
| Second address | Chrome Web Store developer address: "2994 Northeast Marquette Way Issaquah, WA 98029-3632" | https://chromewebstore.google.com/detail/sapience-ai-%E2%80%94-humans-in-p/dmibiijpccagnjjnfggmohcceihjbeol |
| Governing law | "laws of the State of Washington ... King County, Washington" | https://sapienceai.co/tos |
| Contact | "contact@sapienceai.co" | https://sapienceai.co/contact |
| Policy dates | ToS: "Effective Date: May 2026". Privacy Policy: "Effective Date: May 2026". Data Privacy & Governance Policy: "Effective Date: September 1, 2025 \| Version 3.0 ... Last Reviewed: December 8, 2025" | https://sapienceai.co/tos ; https://sapienceai.co/privacy-policy ; https://sapienceai.co/data-privacy |

### 1.2 How the company describes itself
| Descriptor | Verbatim | Source |
|---|---|---|
| Home hero | "The collective intelligence platform for professional communities" | https://sapienceai.co/ |
| Home sub-headline | "Today's most forward-thinking membership organizations trust Sapience AI to unlock their community's collective knowledge, strengthen member connections, and turn shared insights into lasting impact." | https://sapienceai.co/ |
| Indexed title | "Sapience AI \| Knowledge Platform for Membership Organizations" | https://sapienceai.co/ (Exa search result) |
| Legal descriptor | "Sapience AI provides Institutional Knowledge Infrastructure for professional associations and membership organizations. Our services may include software applications, APIs, browser extensions, data analytics tools, and related documentation" | https://sapienceai.co/tos |
| LinkedIn tagline | "We provide every person, at every level, meaningful access to the insights, guidance and expertise that already live inside their network." | https://www.linkedin.com/company/sapience-ai-corp |
| LinkedIn "layer" line | "Sapience AI is the layer that changes everything. We sit above your existing systems to organize, connect, and activate relevant knowledge..." | https://www.linkedin.com/company/sapience-ai-corp |
| Mission | "Our mission is to make every member's intelligence and expertise searchable, actionable, and available at scale, so the right insight reaches the right person at the right moment. When that happens, retention grows, engagement deepens, and the community becomes indispensable." | https://www.linkedin.com/company/sapience-ai-corp |
| Recruiting boilerplate | "Sapience AI is the collective intelligence platform for professional communities. The expertise inside an organization already exists. It lives in scattered documents, disconnected systems, and the people who have done the work before. We bring that expertise together into one place so it can be searched, shared, and acted on." | https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4393679009 |
| Product maturity (policy) | Defines "Design Partner" (pre-release phase) and "Minimum Viable Product" or "MVP" ("the initial version of Sapience AI's platform released to Design Partners"). Also: "Note: This policy describes our current and planned capabilities. Some features described herein may not yet be fully implemented." | https://sapienceai.co/data-privacy |
| Product maturity (extension) | "Sapience AI is in early access. Features evolve quickly." | Chrome Web Store listing (above) |

### 1.3 Leadership (public professional titles only)
Listed only so that terminology and reporting lines in the posting can be understood. No personal details are recorded, and none of this appears on the concept site.

| Role | Public title | Source |
|---|---|---|
| Chief Executive Officer | Appointed, per a company post of 2026-08-13 | https://www.linkedin.com/posts/sapience-ai-corp_leadership-saas-ceo-activity-7493767845105807360-TB1f |
| Founder | "Founder, AI & Product Officer" (LinkedIn headline). Titles vary across sources. | https://www.linkedin.com/in/montegibbs ; SEC primary_doc (above) |
| Brand & communications lead | "Head of Brand & Communications" (since Mar 2026); remit covers the visual identity system across core and developer products, plus naming and taxonomy | https://www.linkedin.com/in/maureengibbs |
| Operations & finance lead | Head of Operations and Finance | https://www.linkedin.com/in/akilmer |
| Sales lead | Head of Sales, "partnering with professional associations, leadership networks, and expert communities" | https://www.linkedin.com/in/kjbrent |

### 1.4 Funding (verified only)
| Fact | Detail | Source |
|---|---|---|
| SEC Form D | Rule 506(b). Total offering $2,500,000: $1,500,000 sold, $1,000,000 remaining. First sale 2026-06-04. 3 investors. Filed 2026-06-22. Revenue "Decline to Disclose". | https://www.sec.gov/Archives/edgar/data/2140753/000214075326000001/primary_doc.xml |
| Seed round | "Seed Round \| 18-Jun-2026 \| $1.5M". Investors: Mighty Capital, Mu Ventures, NW Angel. | https://pitchbook.com/profiles/company/1002334-87 |
| Investor confirmed by the company | "We're proud to have Mighty Capital as an investor, and thrilled to have SC Moatti and team as partners as we build Sapience AI." | https://www.linkedin.com/posts/sapience-ai-corp_americas-top-venture-capital-firms-of-2026-activity-7496325203866578944-v1WY |
| Investor lists Sapience AI | "...Moonshot AI, Wand AI, Sapience AI, Sorcero and Angle Health" | https://mighty.capital/ai-info/ |
| **Not this company** | The widely repeated "$8.8M" belongs to the Slovak GPU-cloud company (§9) | See §9 |

### 1.5 Size (OBSERVATION: estimates conflict)
- 9 employees (GetLatka estimate, https://getlatka.com/companies/sapienceai.co). 19 (https://pitchbook.com/profiles/company/1002334-87). 29 with a US 12 / Pakistan 7 / Germany 1 split, and 756 followers (LinkedIn enrichment, https://www.linkedin.com/company/sapience-ai-corp). A contractor-to-W2 transition is underway (https://www.linkedin.com/in/akilmer). Do not publish any headcount.

### 1.6 Products and shipped work
| Product | Verified detail | Source |
|---|---|---|
| Platform | Three pillars (Private Intelligence Core, Governance You Control, No Migration Required), agents (Sage, Affinity, Corporate) and 8 security controls. Verbatim text in §2. | https://sapienceai.co/platform |
| Sapience AI for Chrome | Store name "Sapience AI — Humans In Partnership". Version 1.0.3, "Updated June 5, 2026", "No ratings". Behaviors: "Reads search queries on Google and Bing to find peers working on similar things - After three messages on ChatGPT, Claude, or Gemini, looks for someone who's been there before - Detects when you're working through a long form (5+ fields)". The listing also says: "Optional waitlist signup so you're first when peer-matching launches publicly" | Chrome Web Store listing (above) |
| OpenClaw Middleware Suite | Open source. GitHub org "Sapience-AI". npm package `@sapience-ai-corporation/openclaw-middleware-suite`. CLI `sai init`. "Six in-process middlewares for OpenClaw: HITL approvals, prompt-injection guardrails, PII redaction, tool-call budgets, context compaction, and complexity-aware model routing. Zero telemetry, all state local." v1.0.0 is dated 2026-04-27. The HITL module derives from Pegasi's Reins (Apache 2.0). The repo has about 10 stars. | https://github.com/Sapience-AI/openclaw-middleware-suite ; https://github.com/Sapience-AI/openclaw-middleware-suite/releases/tag/v1.0.0 |
| NoteBouncer | "Sapience AI is bringing NoteBouncer to the Zoom Marketplace. NoteBouncer helps meeting hosts take back control of their Zoom calls by detecting AI notetakers when they join..." The live listing was not verified. | https://www.linkedin.com/posts/nw-angel_sapience-ai-is-bringing-notebouncer-to-the-activity-7497684163861303296-XqNH |

### 1.7 Current web stack
| Fact | Detail | Source |
|---|---|---|
| Site builder | Framer. `www.sapienceai.co` resolves as an alias of `sites.framer.app`. | DNS lookup from the research container, 2026-09-24 ; https://builtwith.com/sapienceai.co |
| Analytics and infrastructure signals | Google Analytics 4, Google Tag Manager, Google Cloud CDN, Google Cloud DNS, Let's Encrypt. "Last technology detected on Wednesday, September 23, 2026." | https://builtwith.com/sapienceai.co |
| History | "Churned from Unbounce · October 2025". Framer detected from Dec 2025 to Sep 2026. | https://builtwith.com/detailed/sapienceai.co |
| HubSpot | Not listed in BuiltWith's free profile | https://builtwith.com/sapienceai.co |
| robots.txt | "User-agent: * Allow: / Sitemap: https://sapienceai.co/sitemap.xml" | https://sapienceai.co/robots.txt |
| Careers feed | Jobs load client-side from Greenhouse ("Loading jobs...") | https://sapienceai.co/careers |

### 1.8 Public voice and events
- SXSW27 PanelPicker proposal: "It's called The Organization That Never Forgets ... When board members or committee chairs move on, so does the knowledge they carried." (https://www.linkedin.com/posts/sapience-ai-corp_sxsw27-ai-sxsw-activity-7495619443419537409-NrHQ)
- Founder quote from the Keiretsu Forum Investor Capital Expo (Apr 2, 2026): "We build collective intelligence through a self-enclosed ecosystem where AI and human beings work in true partnership." (https://www.linkedin.com/posts/sapience-ai-corp_sapienceai-investorcapitalexpo-nextgenai-activity-7445562744759619584-cNb7). Other appearances in the same source: TiE Seattle (Feb 5, 2026) and PitchForce (Dec 4, 2025).
- Founding principle and sign-off: "good things come from individuals, great things occur from communities united by a shared interest, and remarkable things happen from intentional AI empowering both toward a common purpose. ... Let's achieve more, together." (https://www.linkedin.com/posts/sapience-ai-corp_sapienceai-meetthefounder-founderstory-activity-7444832148316082176-AlX2)
- Sapience AI is a member of NC TECH (https://ourmembers.nctech.org/directory/Details/sapience-ai-4631018).
- We found no ASAE 2026 exhibitor listing or session. This is absence of evidence only (OBSERVATION).

---

## 2. Product & terminology glossary

Verbatim names and descriptions. Use this spelling and capitalization.

### 2.1 Category and positioning phrases
| Term | Verbatim usage | Source |
|---|---|---|
| Collective intelligence platform for professional communities | Home hero; Greenhouse boilerplate | https://sapienceai.co/ |
| Knowledge Platform for Membership Organizations | Title tags | https://sapienceai.co/ (indexed) |
| Institutional Knowledge Infrastructure | ToS service description | https://sapienceai.co/tos |
| Intelligence layer for professional communities | "Build on the intelligence layer for professional communities" | https://sapienceai.co/developers |
| Community Intelligence System | "A Community Intelligence System designed to help professional communities capture, connect, and activate their collective expertise while maintaining trust, governance, and control. Not generic intelligence. Trusted intelligence. ... Not to automate humanity. To elevate it." | https://www.linkedin.com/company/sapience-ai-corp |
| Humans in Partnership | Company value; Chrome store name; hashtag #HumansInPartnership | https://sapienceai.co/company ; Chrome listing |
| Human Mode | "We call our philosophy: Human Mode. Humans in partnership with AI. Not humans competing against it. Humans Being, Empowered by AI." (Monte Gibbs, 2026-06-18) | https://www.linkedin.com/in/montegibbs |
| The Organization That Never Forgets | Title of the proposed SXSW27 session | LinkedIn SXSW post (§1.8) |

### 2.2 Platform pillars (https://sapienceai.co/platform)
| Pillar | Verbatim |
|---|---|
| Private Intelligence Core | "Your data trains your model only. No third-party vendor processes your member records. Your organization builds its own foundational AI — and it gets smarter every year." |
| Governance You Control | "Every AI recommendation comes with a full audit trail. You set the permissions. You own the model. Governance-ready for your board and your regulators." |
| No Migration Required | "We plug into your existing AMS, CRM, LMS, and content systems. No rip and replace. Secure, private, and live in days — not months." |

The site names no specific AMS, CRM or LMS product (OBSERVATION).

### 2.3 Agents (https://sapienceai.co/platform)
| Agent | Verbatim |
|---|---|
| Section intro | "Purpose-built AI agents for your community ... One platform engineered to elevate your entire community. Navigate every challenge with purpose-built intelligence tools. Deploy specialized agents that reflect how your organization works —tailored to your team's priorities and your members' needs." |
| 01. Sage — AI Assistant | "Your command center. Routes every question to the right agent automatically so your team always gets the right answer without knowing which tool to use." |
| 02. Affinity — AI Agent | **Title only. No public description.** |
| 03. Corporate — AI Agent | **Title only. No public description.** |

### 2.4 Security controls (https://sapienceai.co/ and https://sapienceai.co/platform)
- H2: "Enterprise-grade security and controls"
- Body: "Sapience AI runs on Google Cloud with the controls enterprise teams expect — private per-tenant data models, envelope encryption with per-tenant keys, SAML SSO, audit logging, and OWASP WAF protection."
- Badges, verbatim: PER-TENANT ENCRYPTION KEYS · SAML SSO · CLOUD AUDIT LOGS · OWASP WAF · PER-TENANT ISOLATION · MANAGED DATA LIFECYCLE · TLS 1.2+ IN TRANSIT · POINT-IN-TIME RESTORE
- Services named in the policy (not on the marketing pages): Google Cloud Armor, IAM, VPC Service Controls, Cloud KMS (HSM-backed keys), Binary Authorization, "Vertex AI and Gemini Model Controls", Customer-Managed Encryption Keys (CMEK), Dedicated GCP Projects, BigQuery Dataset Isolation, Firestore Security Rules, Chronicle Security Operations (https://sapienceai.co/data-privacy)

### 2.5 Values (https://sapienceai.co/company)
| Value | Verbatim |
|---|---|
| Humans in Partnership | "The most powerful intelligence in a professional community already lives within its people. Technology will never replace that. Our work is to elevate it, so every voice carries further and every contribution matters more." |
| Collective Intelligence | "Professional organizations sit on decades of member built knowledge. That knowledge belongs to the people who created it. We unlock it, making it searchable, actionable, and built to compound for the community it came from." |
| Built on Trust | "Members entrust their organizations with their expertise, their data, and their professional identities. We hold that responsibility with the same care. Safety and privacy are not features. They are how we build." |
| Purpose-Driven Innovation | "Technology should be shaped to serve. We own what we build so we can shape it around the people and organizations it serves. Every deployment is purpose built. Every decision is grounded in the community on the other side of it." |

### 2.6 Labs and developer products (https://sapienceai.co/labs ; https://sapienceai.co/developers)
| Name | Verbatim |
|---|---|
| Sapience AI Labs | "A look inside how our team thinks & builds. Sapience AI Labs is where our team explores ideas unrestrained by commercial expectation, before they become anything else." |
| NoteBouncer Zoom Extension | "Your meetings. Your control. See who's recording. Choose who stays. Recording bots join silently. NoteBouncer shows you instantly when they're there, then you decide what happens next. One click. Your meeting, your rules." CTA "Activate Your Control" |
| OpenClaw Middleware Suite | "Safety guardrails for AI agents. Your AI agent is one bad reasoning loop away from deleting your production database at 3am. Sapience AI Middleware puts a human in the loop before every file write, API call, and shell command. You see what it wants to do, approve or deny it, and sleep at night." README tagline: "Because 'Autonomous' shouldn't mean 'Uncontrolled.'" (followed by a lobster emoji; https://github.com/Sapience-AI/openclaw-middleware-suite) |
| Sapience AI for Chrome | "Find the person who knows. Every time you've typed the same question into three different AI chatbots and still weren't sure, you needed a person, not a prompt. Sapience AI for Chrome detects those moments in real time and connects you with someone who's already navigated exactly what you're facing. Unlock the expertise already in your network." |

### 2.7 Audience vocabulary Sapience uses
- On the site: "professional communities", "membership organizations", "professional associations", "member orgs", "the world's best teams" (https://sapienceai.co/, /company, /tos).
- Earlier segment list: "CEO networks, professional associations, and leadership groups"; "professional, executive, and affinity-based communities" (https://ourmembers.nctech.org/directory/Details/sapience-ai-4631018).

### 2.8 Legacy vocabulary to retire (do not use)
- "Vertical Agentic AI", "Collaborative General Intelligence", "Vertical Foundation Models" (NC TECH, link above).
- "genius collective 'hive mind'", "safe, superintelligent AI" (https://getlatka.com/companies/sapienceai.co).
- INTERPRETATION: the 2026 site and job postings have moved away from these terms and now ask for "human benefits-led copy" (https://www.mediabistro.com/jobs/3542935070-marketing-manager-campaigns-and-operations).

---

## 3. The hiring context — what the job posting signals they value

### 3.1 Posting facts (FACT)
Sources: LinkedIn job 4471445588, posted through "Sundayy" (https://www.linkedin.com/jobs/view/4471445588), and the Greenhouse original, published 2026-09-02 (https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4393679009).

- Web Designer, 1099 contract. "Pay: $65 - $70 per hour". 40 hrs/week. "Contract term: September 2026 through December 18, 2026, with the site live date on December 9". Seattle or Pacific time preferred. Weekly in-person design reviews in Seattle.
- "This is not a build-only role."
- The designer owns website strategy "from audit to live deployment and maintenance", runs competitive design audits, and produces creative concepts for stakeholder reviews. The role works with the Head of Marketing Communications, the brand team, content contributors and engineering.
- Verbatim requirements: "Implement SEO and AIO foundations into the site structure and pages" · "Partner with our engineering team on the HubSpot connection, which they own" · "Run customer testing with current customers" · "Skilled in HTML5, with experience hosted on Google infrastructure" · "An excellent creative, with a strong point of view on design and the instincts to defend it". The posting also asks the designer to track traffic after launch.
- OBSERVATION: the Greenhouse board index (https://job-boards.greenhouse.io/sapienceaicorporation) was cached showing only an older Social Media Manager role, which is now closed (…/jobs/4257283009). The September postings are live at their direct URLs.

### 3.2 The launch team being assembled (FACT)
- **Brand Graphic Designer** (Sep 14–Oct 12, 2026). Scope: "design and refresh our icon and the supporting brand assets ... Update brand guidelines ... Develop partner guidelines ... Produce supporting website assets ... in partnership with our website designer, who owns the overall design and creative direction" (https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4393646009).
- **Marketing Manager, Campaigns & Operations**: "run the marketing engine behind our fall product launch ... works alongside our website designer, video editor, brand graphic designer, and copywriter". It asks for "clear, human benefits-led copy" and reports to the Head of Marketing Communications (https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4393683009). A syndicated copy of the same posting also mentions a "Head of Brand & Marketing" (https://www.mediabistro.com/jobs/3542935070-marketing-manager-campaigns-and-operations).
- An earlier (May 2026) posting said: "We are a small, fast- moving team building toward our global product Launch." Channels: "LinkedIn, X, YouTube, and developer channels" (https://bebee.com/us/jobs/social-media-marketing-manager-sapience-ai-bellevue-wa--theirstack-693326935).

### 3.3 Who is likely in the review room (INTERPRETATION, by role)
- **Marketing communications and brand leadership.** The posting says the designer works with the Head of Marketing Communications and the brand team. The company's public brand remit covers a visual identity system across core and developer products, plus naming and taxonomy architecture. Expect the concept to be judged on how coherent the system is, how the launch is choreographed, and how deliberate the craft is, rather than on AI spectacle.
- **Executive leadership (go-to-market focus).** A clear conversion path and outcomes that can be measured.
- **Product leadership.** Motion that helps people understand the product. A company post says the winners will be those "that make complexity disappear ... remove friction" (https://www.linkedin.com/company/sapience-ai-corp).
- **Engineering** (runs GCP and owns HubSpot). Plain HTML5 that deploys to Google infrastructure, is maintainable and secure, and has clean integration seams.

### 3.4 Responsibility-to-demonstration map
| # | Responsibility (source) | What it signals (INTERPRETATION) | How the concept demonstrates it |
|---|---|---|---|
| 1 | Own strategy "from audit to live deployment and maintenance"; "This is not a build-only role." | They want an owner and strategist, not a pixel executor | This document; an "Audit findings → what the new site fixes" page; an IA proposal; a maintenance runbook covering deploy, rollback and content edits |
| 2 | Competitive design audits | Standing out in a crowded association-AI field matters | A one-page category map drawn from §5; visible avoidance of category clichés |
| 3 | Creative concepts and stakeholder reviews; "a strong point of view on design and the instincts to defend it" | Taste plus argument | One committed concept with a written rationale, each decision traced to this research |
| 4 | Weekly in-person reviews in Seattle | Live walkthroughs on a big screen | Chaptered narrative; a section index; a motion toggle; a Firebase preview URL for every PR |
| 5 | "Skilled in HTML5, with experience hosted on Google infrastructure" | A move off Framer onto Google Cloud (INTERPRETATION; §1.7) | A static multi-page Vite build deployed to Firebase Hosting, with firebase.json caching and security headers and no framework lock-in |
| 6 | "Implement SEO and AIO foundations into the site structure and pages" | AI answers matter, and the company name collides with others (§9) | One H1 per page, semantic outline, unique titles and meta, Organization and WebSite JSON-LD with `sameAs`, an AI-crawler policy in robots.txt, sitemap, llms.txt plus `.md` twins, every word present in static HTML |
| 7 | "HubSpot connection, which they own" | Respect ownership and leave clean seams | A semantic "Book a conversation" form with documented HubSpot hooks (hutk, consent, events, CSP entries), labelled as engineering-owned |
| 8 | "Run customer testing with current customers" | They iterate on evidence | A test-plan appendix (tasks such as "find how data is protected", "explain what Sage does", "book a conversation") and proof modules ready to fill after testing |
| 9 | Track traffic after launch | Outcomes are measured | A measurement plan: GA4 events on the CTA and on chapter progress, Search Console's generative-AI report, HubSpot AEO prompts (§8.10) |
| 10 | Work with brand, content contributors and engineering | Other people will edit and extend the site | A token-based system; the logo as a swappable slot (the icon refresh runs in parallel, §3.2); content in editable partials; a component inventory |
| 11 | Live Dec 9, 2026; contract ends Dec 18 | The plan has to fit the deadline | A phased plan in the pitch: concept → build → test → launch → hardening |
| 12 | "fall product launch" landing in December | The site has to carry a launch story | A launch hero slot and an announcement module that are not locked to current product names, because naming and taxonomy work is in progress |

---

## 4. Current site audit (all OBSERVATION unless marked)

### 4.1 Information architecture (as crawled)
```
Header:  Company(/company; labelled "About" on some pages) | Platform | Customers | Labs | [Get Started → destination unverified, probably /contact]
Footer:  Platform | Developers | About(/company) | Customers | Contact | Careers | Terms of Service(/tos) | Privacy Policy(/privacy-policy) | Data Privacy & Governance Policy(/data-privacy)
Off-site: Chrome Web Store · GitHub (Sapience-AI/openclaw-middleware-suite) · Zoom/NoteBouncer (buff.ly) · Greenhouse
Missing: blog/resources/news, pricing, case studies, solutions, security page, docs
```
- **Discrepancy with the brief.** The earlier-known nav included "Solutions". No crawl shows it, and /solutions returns not-found.
- **Nav varies by page.** Platform, Company and Developers use "About" in place of "Company" and have no Labs link (possibly the stale Jun 3 cache). The Labs footer lists "Company" in place of "About" and has no "Developers" (https://sapienceai.co/labs).

### 4.2 Page-by-page structure (heading levels from Exa extraction)
| Page | Section order |
|---|---|
| Home (/) | H3 hero + Get Started → rotating line "Top communities use Sapience AI for [Growing Revenue]" (only one value was captured) → H2 "We're helping the world's most purpose-driven professional communities transform the way they work" → 3-stat band → Security grid → footer |
| Platform | H1 "Give your community its competitive edge" → a second H1, "Built around your organization", with 3 pillars → H2 "Professional communities are sitting on untapped intelligence." with 5 stats → agents 01–03 → Security grid |
| Customers | H3 hero "Built for communities that can't afford to leave knowledge on the table" → H2 "Real results from real communities." → 57% statement and 4 stats → H2 "The world's most ambitious professional communities choose Sapience AI." No names appear in the text. |
| Labs | H1 → intro → 3 product cards |
| Company | H1 "We're helping the world's best teams transform the way they work" → Our values (4) → Our team (2 paragraphs, no names) |
| Developers | H1 → Get Started → a second H1, "Developer products", with 2 cards (a copy of the Labs content) |
| Contact | H1 "Let's explore what your community's collective intelligence can look like when it's truly connected." → H2 "Book a conversation with our team." → email. No form or scheduler visible in text. |
| Careers | H1 "We are building a new way forward" → copy → "Loading jobs..." |

### 4.3 Visual identity (OBSERVATION from screenshots; colors approximate)
- Warm cream/off-white background (~#F2EFEA). Deep purple CTA (~#5A2D82). Dark charcoal (~#1C1C1E) stats band with large serif numerals.
- Serif headlines (Libre Baskerville-like), Inter-like sans body.
- Lowercase serif wordmark "sapience ai", with "ai" in muted purple. The Greenhouse logo asset is named "Sapience_AI_(SAI)_Logo_Master_10.png" (https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4257283009).
- Stock photography of smiling professionals in offices and at conferences.
- A phone-framed "Sage" UI mock showing "engagement score 92/100" and "Most discussed topic was Sustainable Tech with 34 active threads". A security badge grid.

### 4.4 Strengths
1. A clear, ownable-with-qualifier category line: "collective intelligence platform for professional communities".
2. A distinctive human-centric philosophy: "you needed a person, not a prompt"; "Technology will never replace that."
3. A concrete security grid that names real controls rather than saying "enterprise-grade" in the abstract.
4. Labs shows shipped work: a public GitHub repo with releases, a live Chrome Web Store item, a Zoom app in progress.
5. Short, confident copy. Well-written, quotable values. Clean, flat URLs.
6. An editorial cream, serif and purple identity that no association-vertical competitor shares (§5.2).

### 4.5 Weaknesses
1. **No proof.** No customer names, testimonials or case studies on a page titled "Customer Stories - Sapience AI".
2. **No explanation of how it works.** Nothing covers connectors, what a user sees, who the users are (staff or members), how "your data trains your model only" works, or what "live in days" involves. The only technical depth is in the legal policy.
3. **Two of three agents have no description.**
4. **Stats conflict with each other and cite no source** (§4.6).
5. **One generic CTA** ("Get Started") and no secondary path (such as "See how it works" or a security overview).
6. **Duplicate content.** The Labs and Developers cards are identical. The Security block repeats on Home and Platform. The Company H1 nearly repeats the Home H2.
7. **Developers promises a platform but offers no docs.** Labs and Developers overlap.
8. **Legal pages contradict marketing claims** (§4.6).
9. **Stock photography** of the kind the category over-uses (§5.5).

### 4.6 Inconsistencies

**Stats across pages**
| Claim | Home | Platform | Customers | Probable origin (INTERPRETATION) |
|---|---|---|---|---|
| Orgs that can't easily reach their data | "57%" "Of member orgs can't easily access their own performance data" | — | "57% of organizations are struggling to reach the data they already own" | iMIS/ASI 2026: "Only 43% can easily access and understand the data they need to monitor and improve performance" (https://www.membershipworld.com/assets/reports/2026-imis-membership-performance-benchmark-report.pdf) |
| Annual impact per mid-size association | "$150K–$ 300K" "Conservative annual impact per mid-size association" | "250k+" "Conservative annual impact per mid-size association" | "150k+" "Annual impact per mid-size association" | No source cited; probably one ROI model edited over time |
| Staff hours per week | — | "20+" "Hours freed per staff member per week through automated data workflows" | "15+" "Labor hours recovered per week per staff member" | No source cited |
| Recovered labor capacity | — | "70k+" (no unit given) | — | No source cited |
| AI investment | "29%" "Of associations are already investing in AI tools" | "29%" | — | iMIS/ASI 2026 lists "AI (Artificial Intelligence) tools 29%" as a current or planned tech investment (same PDF) |
| Median renewal | — | "84%" | "84%" | MGI 2025 median of 84% (https://www.memberjungle.com/blog/the-5-lessons-we-learnt-from-the-2025-membership-marketing-benchmarking-report). **MGI 2026 reports 82%** (https://www.memberjungle.com/blog/2026-membership-marketing-benchmarking-report-lessons) |
| Acquisition vs retention cost | — | — | "5x+" | Source not found |

Sources for the site figures: https://sapienceai.co/ , https://sapienceai.co/platform , https://sapienceai.co/customers

**Trust claims: marketing vs policy**
| Marketing | Policy (https://sapienceai.co/data-privacy) | Note |
|---|---|---|
| "You own the model." (Platform) | "Sapience AI retains ownership of: AI models and their parameters" | Direct conflict |
| "No third-party vendor processes your member records." (Platform) | "AI Model Provider: Name: Google LLC Service: Google Gemini API (via Vertex AI) ... Data Shared: User prompts and interaction data (not used for Google model training)" | Tension. Prompts are not the same as "member records", but boards and IT reviewers will spot it. |
| "TLS 1.2+ IN TRANSIT" | "TLS 1.3 for data in transit" | Not a true conflict (1.3 falls within "1.2+"), but inconsistent. The badge is the safer superset. |
| No certification claims on marketing pages | §3.4.2: "Our GCP implementation maintains compliance with: SOC 2 Type II certification ISO 27001, 27017, and 27018 standards". §10.2: "Pursuing ISO 27001 and ISO 27701 certifications" | Contradictory. INTERPRETATION: 3.4.2 probably describes Google Cloud's own certifications, not Sapience's. Show no certification badges. |
| "Today's most forward-thinking membership organizations trust Sapience AI" (Home) | Pre-Release, Design Partner and MVP framing. Founder profile: "currently in stealth mode conducting customer pilot and beta programs ahead of our GA release later this year" (https://www.linkedin.com/in/montegibbs) | Maturity is framed differently in different places |
| The Chrome extension "connects you with someone who's already navigated exactly what you're facing" (Labs) | Store: "Optional waitlist signup so you're first when peer-matching launches publicly" | The site overstates the extension's live capability |

**Terminology sprawl.** Five or more category phrases are in use (§2.1), and the audience is named at least five ways (§2.7).

### 4.7 Copy and QA defects (each checkable at the cited page)
- "$150K–$ 300K" has a stray space (https://sapienceai.co/).
- "works —tailored" is missing a space (https://sapienceai.co/platform).
- ToS numbering repeats "1." and has "3. . Limitation of Liability ... 4. . Indemnification" (https://sapienceai.co/tos).
- The ZIP code is "98207" in the Data Privacy policy but 98027 in the ToS and Privacy Policy. The same policy contains the live placeholder "[URL to be provided]" for sub-processors and a "© 2025" footer (https://sapienceai.co/data-privacy).
- CTA capitalization varies: "View On Chrome Web Store" and "View on Chrome Web Store" (https://sapienceai.co/labs ; https://sapienceai.co/developers).
- One indexed Labs title has a double space ("how  our team").

### 4.8 SEO and AI-search observations
| Issue | Detail | Source |
|---|---|---|
| H1 discipline | Home has no H1 (the hero extracts as H3). Customers has no H1. Platform and Developers have two H1s each. | Exa extraction of /, /customers, /platform, /developers |
| Noisy outline | Stat labels are H2 while the numerals are H3. The eight security badges are each an all-caps H2. | https://sapienceai.co/ |
| Titles | Home "Sapience AI \| Knowledge Platform for Membership Organizations". Platform "The Sapience AI Platform \| Built for Membership Organizations". Customers "Customer Stories - Sapience AI". Labs "Sapience AI Labs \| Experimental Tools and Research". Careers and Contact share the same title, "Knowledge Platform for Membership Organizations - Sapience AI". Company and Developers expose only the generic "Sapience AI" / "Collective intelligence for professional communities". Separators mix " \| " and " - ". | Exa index of each page |
| Link previews | The founder's hiring post URL slug shows the Careers link preview uses the generic title | https://www.linkedin.com/posts/montegibbs_sapience-ai-knowledge-platform-for-membership-activity-7506467232630214656-Sq_h |
| Client-side content | The Careers list renders only in JavaScript ("Loading jobs..."). Batch AI crawlers do not execute JS (§8.3). | https://sapienceai.co/careers |
| Image-only meaning | The product UI (Sage mock) and any logos are images | Screenshots |
| No AI-ready files | No /llms.txt. robots.txt has no AI-specific rules. | https://sapienceai.co/robots.txt |
| No content hub | No FAQ, glossary, comparison or long-form pages. Thought leadership lives only on LinkedIn (e.g. "Every professional community has the same hidden asset." and "Humans In Partnership Is The Only AI Future Worth Building"). | https://www.linkedin.com/company/sapience-ai-corp |
| Entity collision | At least eight unrelated "Sapience" entities are active in 2026 (§9). Aggregators already attach the wrong funding figure to this company. | §9 |

INTERPRETATION: together these give search engines and LLMs weak, inconsistent signals about what Sapience AI is, which is exactly the "SEO and AIO foundations" the posting asks for.

---

## 5. Market landscape & clichés to avoid; whitespace opportunity

### 5.1 Competitive and adjacent set (FACT: verbatim positioning)
| Company | How it presents itself | Source |
|---|---|---|
| Higher Logic | "Higher Logic connects your community, communications, data, and AI into one intelligent ecosystem". AI Assistant: "Trusted answers for members. More time for the people who serve them ... No migration needed ... nothing is ever used to train AI models." | https://www.higherlogic.com/ ; https://www.higherlogic.com/thrive/ai-assistant/ |
| Hivebrite | "The community platform built for impact. A flexible and deep engagement engine + purpose-built AI agents..." Agents are job-titled "Specialists" (including a "Matching Specialist") with Assisted, Supervised and Fully autonomous modes. | https://hivebrite.com/ ; https://hivebrite.io/features/ai-agents/ |
| Betty (Blue Cypress) | "Betty is a [rotating role] ... trained on your own content ... Trusted by 150+ associations". Named customers include ISA, ASCE, NSTA, SWE and MRAA. "most going live in 12–16 weeks." | https://www.meetbetty.ai/ ; https://meetbetty.ai/product |
| Momentive (formerly Community Brands) | "One AI-powered platform to run your organization ... Trusted By Over 37,000 Nonprofits and Associations". Its "MomentiveIQ Agentic Workers" keep staff "in control of every action". | https://momentivesoftware.com/ ; https://www.communitybrands.com/ |
| Personify | "Over 30,000 organizations trust Personify ... 25% of the U.S. population interacts with Personify" | https://www.personifycorp.com/ |
| Nimble AMS | "Boost your ROI with a smarter AMS ... 97% Customer Retention" | https://www.nimbleams.com/ |
| Fonteva | "$1.8B Transacted annually ... 90M Members & customers served" | https://www.fonteva.com/ |
| GrowthZone | "We Power Your Mission ... Renewals That Run Themselves" | https://www.growthzone.com/ |
| Novi AMS | "Built for Associations by Associations", with first-name customer stories | https://www.noviams.com/ |
| Rhythm | "What if your association could love its AMS?" | https://www.rhythmsoftware.com/ |
| Glue Up | "using the most advanced NVIDIA Enterprise AI". Lists "Sage" (accounting) among its integrations. | https://www.glueup.com/ |
| ReadyIntelligence | "Source-cited, personalised to each member ... live in weeks, not months — no data migration" | https://readyintelligence.com/solutions/member-ai-assistant.html |
| CustomGPT.ai | "The problem isn't a lack of content. It's access to the content." | https://customgpt.ai/industries/membership-organizations/ |
| KITABOO K.AI | "No internet fallback. No hallucinations... Live in days, not quarters." | https://kitaboo.com/k-ai-for-associations/ |
| Member Lounge MELO | "your content trains only your association's instance" | https://memberlounge.app/melo-virtual-assistant/ |
| Experts.app | "Instantly answer 'who in our association knows about X?'" (people-finding, as an add-on) | https://www.experts.app/associations/ |
| MemberJunction | "The AI Data Platform Built for Associations". Ships a "Sage Orchestration Agent". | https://memberjunction.org/ ; https://memberjunction.org/ai-agents |
| Glean | "Glean connects knowledge, systems, and context so AI can actually work". Certification row; "110 hours saved per user/year". | https://www.glean.com/ |
| Guru | "Stop running your business on confidently wr[prohibition emoji]ng AI ... Citations on every answer ... Full audit trails" | https://www.getguru.com/ |
| Bloomfire | "Enterprise Intelligence ... Q&A Collective Knowledge Engine ... expertise (tacit knowledge)" | https://bloomfire.com/ |
| Notion AI | "Meet your 24/7 AI team ... No training on your data" | https://www.notion.com/product/ai |
| Microsoft 365 Copilot | "Work IQ is a workplace intelligence layer ... never used to train the models" | https://www.microsoft.com/en-us/microsoft-365-copilot |
| Starmind | "Human Intelligence, Powered by AI ... Connects you to someone who knows, even if there's no written answer available." | https://www.starmind.com/ ; https://www.starmind.com/expert-finder |
| PlusPlus | "Everyone has the same AI. Nobody has your knowledge ... Your Knowledge Graph is the moat." | https://plusplus.co/ |

### 5.2 Two visual families (OBSERVATION from 1440×900 screenshots, 2026-09-24)
- **(a) AMS and community incumbents.** Light backgrounds, warm accents (orange, teal, red), floating dashboard and KPI cards, stock headshots on dotted orbits, logo walls, G2 badges, big customer counts.
  - Higher Logic: https://hcti.io/v1/image/01a0d4e2-6efe-7f53-87bc-81052cc5c520.jpg
  - Momentive, with its hand-drawn underline under "AI-powered": https://hcti.io/v1/image/01a0d4e3-3612-75d6-80d0-e7fdad0dae60.jpg
  - Betty, with emoji feature icons and "Old Way ✕ / Betty Way ✓": https://hcti.io/v1/image/01a0d4e2-b780-7aca-9123-88c072ee11ba.jpg
- **(b) AI-native and enterprise knowledge.** Near-black backgrounds, network and node motifs, 3D liquid-glass gradients, neon accents, prompt-box heroes.
  - Hivebrite: https://hcti.io/v1/image/01a0d4e2-8a11-73cb-ac92-1d16ec493dcd.jpg
  - Glean, with the prompt "Which renewal is slipping…": https://hcti.io/v1/image/01a0d4e2-eb8d-7b84-b0c3-1da34490fc50.jpg
  - Guru: https://hcti.io/v1/image/01a0d4e3-6edd-7855-afa8-0b4af1f0a588.jpg
- **Sapience's identity sits in neither family.** Its cream, serif and purple is closest to the "calm, editorial, almost invisible" school (Perplexity, Anthropic, Apple Intelligence, Notion) named at https://d1s1.com/blog/ai-branding-invisible-vs-magical. None of the association competitors we captured uses a serif-led editorial register.

### 5.3 Converged claims, now table stakes (OBSERVATION)
| Claim | Who says it |
|---|---|
| "No migration" | Betty, Higher Logic, ReadyIntelligence, Experts.app, Sapience |
| "Live in days/weeks, not months/quarters" | ReadyIntelligence, KITABOO, Sapience ("live in days — not months") |
| "Never trains on your data / trains only your instance" | Betty, Higher Logic, MELO, Notion, Microsoft, Sapience |
| Cited, grounded answers | Betty, Higher Logic, CustomGPT, ReadyIntelligence, KITABOO, Guru |
| Human approves agent actions | Momentive, Hivebrite, Sapience OpenClaw |
| AI amplifies human connection | Higher Logic ("amplify human connection"), Hivebrite ("strengthen—not replace"), Starmind, Sapience ("Humans in Partnership") |
| Named AI persona or agent team | Betty, MELO, K.AI, Hivebrite "Specialists", Momentive "Agentic Workers", Notion "AI team", Sapience (Sage, Affinity, Corporate) |
| Rotating-word hero | Betty ("Betty is a [role]"), Sapience ("use Sapience AI for [Growing Revenue]") |

INTERPRETATION: these belong low on the page as calm reassurance, not in the hero.

### 5.4 Industry context: association pains (FACT; cite the publisher if used)
| Finding | Source |
|---|---|
| "Only 43% can easily access and understand the data they need..." Top operational challenges are integration, "Incorrect or incomplete data", and "Multiple databases and silos". "46% credit member-to member outreach for winning back members" | https://www.membershipworld.com/assets/reports/2026-imis-membership-performance-benchmark-report.pdf |
| Median renewal 84% and first-year 74% (MGI 2025). Associations are "challenged with how to articulate the value they offer" | https://www.memberjungle.com/blog/the-5-lessons-we-learnt-from-the-2025-membership-marketing-benchmarking-report |
| MGI 2026: "the average renewal rate dropping from 84% to 82% ... first-year members dropping from 74% to 72%"; "23% of organisations are now using AI" | https://www.memberjungle.com/blog/2026-membership-marketing-benchmarking-report-lessons ; http://membershipmarketing.blogspot.com/2026/07/just-released-2026-membership-marketing.html |
| ASAE State of Associations (Mar 2026): "nearly 39% of CEOs reporting decline versus 10% reporting improvement ... AI use is widespread ... but readiness lags ... Retention and engagement remain the top challenge" | https://www.asaecenter.org/about-us/news_releases/2026/asae-releases-first-ever-state-of-associations-report-offering-data-driven-view-of-industry-present-and-future |
| "92% of association executives are using AI, but only 6% to 13% have an AI policy". Heaviest use is in "marketing/communications, knowledge management, and member services" | https://www.asaecenter.org/resources/articles/an_plus/2026/09-september/writing-an-ai-policy-for-your-association |
| "85 percent of association executives felt either somewhat or not very prepared"; "Nearly 65 percent ... lack of internal expertise" | https://www.asaecenter.org/resources/articles/an_plus/2026/03-march/ai-as-strategic-enabler-how-association-leaders-can-catch-up |
| Naylor 2026: non-dues revenue is the No. 1 challenge (51.9%), "leveraging data for strategic decisions" is in the top three (47.7%), heavy AI use rose from 12.5% to 33.5%, and data and strategy is the most understaffed function (38.5%) | https://www.naylor.com/associationadviser/2026-association-benchmarking-report-ai-adoption-surges-as-revenue-strategy-gets-more-complicated/ |
| ASAE Annual 2026 recap: "members can now get answers from AI faster than most associations can deliver them ... The sessions that landed hardest weren't the ones demonstrating an association chatbot ... 82% ... inefficient or disconnected technology is contributing to burnout" | https://momentivesoftware.com/blog/the-state-of-associations-what-we-heard-at-asae-annual-2026/ |
| Officer turnover: "they often take years of institutional knowledge with them" | https://www.asaecenter.org/resources/articles/an_plus/2026/09-september/a-guide-to-seamless-officer-handovers-for-associations |
| "a decision may be documented, but the reasoning behind the decision is not" | https://www.asaecenter.org/resources/articles/an_plus/2026/07-july/leadership-transitions-dont-create-problems-they-expose-them |
| Staff turnover: "a terrifying amount" of knowledge walks out | https://www.associationsonline.com/leadership/association-succession-planning-why-your-technology-should-outlast-your-staff/ |
| Conference recordings: "80% of attendees never watched"; content died "within 3 months" | https://www.buzzsprout.com/2522852/episodes/18867893-if-you-build-it-they-won-t-come-how-nass-turned-80-unwatched-content-into-a-netflix-style-revenue-engine-with-2x-roi |
| "Only eleven percent of associations describe their value proposition as very compelling ... Peer trust with skin in the game" | https://myassociationjourney.com/2026/08/19/if-a-chatbot-can-replace-your-value-it-was-never-your-value/ |
| Privacy and data security is the top AI barrier; 13% have an AI policy (SAE survey, Nov 2024) | https://assets.noviams.com/novi-file-uploads/fsae/images/reports/AI-in-Associations-Report.pdf |
| "designing for trust across generations" | https://www.mdg.agency/news/association-of-the-future/ |

### 5.5 Clichés to avoid (evidence-backed)
- In a study of sixty AI homepages: "94% used the same purple-to-cyan gradient ... 81% opened with the words AI-powered, next-generation, mission-critical or intelligent in the H1. 71% used stock photography ... 0 of the sixty made the underlying model legible to a non-technical decision-maker." (https://www.everything.design/blog/branding-for-ai-companies)
- The "AI uniform": "a near-black rectangle, a purple glow in one corner, a sparkle icon, and a sentence about a copilot." (https://www.setproduct.com/blog/why-every-ai-startup-looks-the-same)
- "A brand whose palette genuinely is purple keeps it. The rule is against unchosen purple ... Pill badge, centred headline, subhead, two buttons, orb behind: the hero every model builds ... No sparkle badge on AI features." (https://www.stellae.design/en/ai/unslop-pass)
- Studios now brief against "abstract gradients and glowing orbs" (https://d1s1.com/blog/ai-brands-designing-around-the-cliche).
- **Do not use:** purple-to-cyan or magenta gradients; orbs and radial glows; sparkle badges; particle or neural-net backgrounds; 3D liquid glass; near-black with neon; glassmorphism; "AI-powered" in the H1; chat-window, prompt-box or phone-assistant heroes; floating KPI widgets around a laptop; stock headshots on orbit lines; emoji as icons; "Old way ✕ / New way ✓"; three equal feature cards; rotating or typewriter headlines (Sapience's own rotator included); unsourced stat bands; G2 pills; anonymous logo walls; "no migration / live in days / never trains on your data" as the headline promise.

### 5.6 Conventions to respect (INTERPRETATION, grounded in §5.1 and §5.4)
- Name the audience ("professional associations and membership organizations") in the first viewport.
- Make "Book a conversation / Get started" unmistakable and repeat it.
- Surface privacy and governance early. It is the top AI barrier.
- Show that the product integrates with "existing AMS, CRM, LMS, and content systems" without naming unverified vendors.
- Use association vocabulary: members, renewal, chapters, committees, volunteers, certification, annual meeting, non-dues revenue.
- Design for multi-generational, non-technical executive readers: legible sizes, plain language, reduced motion.

### 5.7 Whitespace (INTERPRETATION)
1. **"A person, not a prompt."** The vertical has converged on "content → branded chatbot → cited answers". The only players touching people-routing are Starmind (enterprise) and, as secondary features, Experts.app and Hivebrite. Sapience can make peer expertise, routed at the moment of need, the hero idea, grounded in its own Labs copy and its value "already lives within its people".
2. **Intelligence that compounds.** "it gets smarter every year" and "built to compound for the community it came from". No competitor shows the association's AI as an asset that grows in value. A motion metaphor of accrual (strata, rings, an archive that thickens) fits.
3. **Knowledge that survives turnover.** "The Organization That Never Forgets", backed by the ASAE officer-handover and leadership-continuity pieces and the NASS "80% unwatched" figure used as industry context.
4. **An editorial, scholarly register.** The cream, serif and purple identity as a "proceedings" aesthetic: footnotes, marginalia, citation superscripts, purple as ink. It mirrors the journals and standards associations themselves publish.
5. **Sourced data as the trust signal.** Sapience cannot win the logo-wall game honestly (founded 2024, no public customers). Transparency about method (footnoted benchmarks, specific controls) is the credible substitute.
6. **Governance made visible.** Animate an audit trail (question → sources → people consulted → recommendation → approver) and per-tenant keys in place of certification badges.
7. **Qualify the category.** "Collective intelligence platform" alone is used by Mindhive, Beeshake, PlusPlus, bRAINdrop, Nuclave and Cognihive (§9). The qualifier "for professional communities" plus association vocabulary does the differentiating and the disambiguating.
8. **Optional revenue chapter.** Non-dues revenue is the top industry pain (Naylor), and the Home rotator says "Growing Revenue". A revenue chapter could work, but only if Sapience confirms what Affinity and Corporate do.

---

## 6. Audience model (INTERPRETATION throughout)

Evidence anchors are cited FACTS. The personas and needs are our inference.

| Segment | Context (evidence) | What they need to see | Fears and objections | Site implications |
|---|---|---|---|---|
| **Association executives** (CEO or ED, COO, CMO) | Financial headwinds ("nearly 39% of CEOs reporting decline", ASAE). Retention and engagement is the top challenge (ASAE). Non-dues revenue is the No. 1 challenge (Naylor). 85% feel unprepared for AI (ASAE). Disintermediation anxiety (Momentive recap; myassociationjourney). | A strategic story they can repeat to their board. Impact figures with provenance. Evidence the product protects the association's authority, and doesn't replace it. | Hype. Vendor lock-in. Reputational risk. "Another chatbot." | Audience and category in the first viewport; "The Organization That Never Forgets" chapter; one reconciled, footnoted impact figure; the governance chapter on the main path; "Book a conversation" |
| **Member-services, marketing and programs staff** | 82% say disconnected tech contributes to burnout (Momentive recap). Marketing and comms, knowledge management and member services are the top AI-using functions (ASAE/Avenue M). Silos and bad data are top operational challenges (iMIS). Data and strategy is the most understaffed function (Naylor). | Concrete before-and-after of their day. "No Migration Required". Sage routing the question so they don't need to know "which tool to use". | Yet another system. Being replaced. | The Sage routing set piece; the integration layer drawn over "existing AMS, CRM, LMS, and content systems" with no vendor names; "Humans in Partnership" framed as their ally |
| **IT, security and data governance** (often a small team, or outsourced) | Privacy and data security is the top AI barrier (SAE survey). Only 6–13% have an AI policy (ASAE/Avenue M). | Specific controls, an architecture diagram, data ownership, SSO, sub-processors, links to policies | Contradictions between marketing and policy (§4.6); vague "enterprise-grade" claims; unverifiable badges | A dedicated Security & Governance page built on the 8 published controls; a diagram of per-tenant isolation and envelope encryption; policy links; no certification badges; claim wording that matches the policy |
| **Board and volunteer leaders** | Knowledge is lost at officer handover (ASAE Sep 2026). "the reasoning behind the decision is not [documented]" (ASAE Jul 2026). Platform promises "Governance-ready for your board and your regulators". | Short, calm, printable answers on ownership, audit and continuity | Fiduciary and privacy exposure; technology they cannot evaluate | Legible type and reduced motion ("designing for trust across generations", mdg); a one-page summary; the institutional-memory story |
| *Secondary:* **Developers and AI power users** | Labs and Developers pages; OpenClaw on npm; the Chrome extension; NoteBouncer | Working code, accurate status, a punchier tone | Overclaiming (the Chrome waitlist) | A Labs sub-register with mono accents and code; honest "early access" labels; Developers stays in the footer until docs exist |
| *Secondary:* **The hiring panel** | §3 | Proof of strategy, craft, SEO/AIO and integration judgment | A pretty concept that ignores constraints | Rationale page, audit appendix, measurement plan, clearly labelled speculative concept |

---

## 7. Craft principles extracted from the references (principles, not assets)

These were studied through live sites and gallery write-ups. The original reference videos could not be opened (§0). **Nothing from these references (code, imagery, type, copy) is to be copied.**

### 7.1 Cappen (https://cappen.com)
- **FACT:** Awwwards Site of the Day on Nov 11, 2025, score 7.33. Palette "HEX #FCFCFC ... HEX #000000" only. Tagged HTML5, WebGL, Storytelling and Scrolling. In the dev scores, Animations scored 8.40 and Accessibility 6.80 (https://www.awwwards.com/sites/cappen-4). CSS Winner SOTD Nov 18, 2025 (https://www.csswinner.com/details/cappen/18944). Tagged "Big type" and "Scroll animation" (https://www.a1.gallery/website/cappen). The contact section is a conversational bot with a budget selector.
- **OBSERVATION (screenshot):** a giant, tightly set grotesk; a media window set inside the headline line; a 5-column hairline nav; mono microtype.
- **Principle (INTERPRETATION):** *type as container.* Media sits inside the headline, so image and message read as one unit. Two-color discipline pushes all hierarchy onto scale, rhythm and rules.
- **Translation:** a live window inside the serif hero line (for example between "collective" and "intelligence") showing illustrative or approved imagery; a strict palette of cream, purple and charcoal; hairline rules; mono microtype.
- **Don't copy:** the weak accessibility.

### 7.2 The Content Architecture (https://www.contentarchitecture.dev)
- **FACT:** an agent-ready Next.js/Astro plus Sanity kit by Edoardo Lunardi. It itemizes setup cost ("ESTIMATED TIME LOST: ~24 HOURS PER PROJECT"). Sites built on it ship "an editable llms.txt ... and a token-light Markdown version of every page ... served on the same URL to any agent that sends Accept: text/markdown". Gallery write-ups: Geist and Geist Mono; "light-and-dark split layout with monospaced typography, animated text spirals, ticker-style messaging, dotted textures, and terminal-inspired interface elements" (https://onepagelove.com/the-content-architecture ; https://www.a1.gallery/website/the-content-architecture). Described as "a developer's manifesto turned sales page" (https://www.landing.love/sites/contentarchitecture/).
- **Principle (INTERPRETATION):** *specification as ornament.* Mono readouts, tickers and itemized numbers serve as both texture and evidence. Spectacle always sits next to a readable claim. Split-screen pacing pairs a calm reading column with an expressive canvas.
- **Translation:** the 8 verified security controls as mono spec readouts that tick on as they reveal. Concentric SVG `<textPath>` rings of Sapience's verified vocabulary as decorative "collective" imagery (aria-hidden, with the real text elsewhere). Editorial copy on cream beside an expressive panel on charcoal. The llms.txt and `.md` twin pattern (§8.3).

### 7.3 Framer (https://www.framer.com)
- **FACT:** H1 "Framer is the AI design agent for every step from idea to launch". First section: "Agents that work alongside you, not instead of you". The redesign shipped with Framer 3.0 on June 16, 2026 (https://www.framer.com/updates/framer-3). The agent makes "many small edits that add up to the final design", and every message can be rolled back (https://www.framer.com/blog/building-framer-agents/).
- **OBSERVATION:** the homepage proves the product with dense, real UI fragments (a CMS table, SEO fields, Core Web Vitals tiles) rather than illustration.
- **Principle (INTERPRETATION):** *the product narrates itself.* Motion shows the process step by step. "Alongside you, not instead of you" parallels Sapience's "Humans in Partnership".
- **Translation:** a Sage routing panel that streams small, visible steps: question received → routed → specialist lane → a person surfaced. It is labelled "Illustrative concept". It uses only verified names, and invents no member data beyond Sapience's own mock values.
- **Context:** Sapience's current site runs on Framer. The concept argues for HTML5 on Google infrastructure (§8).

### 7.4 "EVR Ventures" hero
- **FACT:** this is a spec in a third-party prompt collection, not a live company site (https://github.com/nomaan5541/motionsites-prompt-collection/blob/main/prompts/evr-ventures-hero.md). Details: Geist plus Gilda Display, with the third headline line in serif ("Each line: text-[clamp(2rem,6vw,5rem)], first two lines font-light, third line font-display (Gilda Display serif)"). A full-screen video background (the "prism" is video, not WebGL). A 75% SVG progress ring animated on mount. A 20-second infinite partner marquee with placeholder brands. A clip-path circle menu reveal (0.7 s, ease [0.76,0,0.24,1]).
- **Principle (INTERPRETATION):** *a register shift carries meaning.* Switching typeface on the key word is itself the emphasis. A single animated gauge turns one number into a moment.
- **Translation:** the serif and sans switch on key words (Sapience is already serif-led, so the switch can run in reverse). SVG ring gauges fit percentage stats only (57%, 29%, 84%); ranges and counts need a different treatment.
- **Don't copy:** the unpausable marquee (it fails WCAG 2.2.2) and the fake social proof.

### 7.5 Cross-cutting principles (INTERPRETATION)
1. Motion reveals **provenance and connection**, such as lines linking a question to people and sources, or citations that resolve. It never signals "magic" (shimmer, glow, particles).
2. Every spectacle settles into a **readable static claim**.
3. Motion is **slow, deliberate and typographic**, fitting the editorial register, and **reversible on scroll**.
4. **Accessibility is the differentiator.** Award-winning reference sites score lowest on accessibility (Cappen 6.80). Award-level motion plus measurable accessibility (§8.8) sets the concept apart from its own references.

---

## 8. Technical platform decisions implied

### 8.1 Hosting on Google infrastructure
- **FACT:** Firebase Hosting "is optimized for static and single-page web apps". Every file is cached at CDN edges and served with gzip or Brotli, with free SSL (https://firebase.google.com/docs/hosting). Google recommends classic Hosting over App Hosting for static sites, and it has a no-cost tier (https://firebase.google.com/docs/app-hosting/product-comparison). Redeploying clears the CDN cache (https://firebase.google.com/docs/hosting/manage-cache).
- **FACT:** preview channels give shareable URLs, "they are public" to anyone with the link, a GitHub Action can create one per PR, and `firebase hosting:clone` promotes a tested build (https://firebase.google.com/docs/hosting/test-preview-deploy).
- **FACT:** the alternative, Cloud Storage, "doesn't support custom domains with HTTPS on its own", so it needs an external Application Load Balancer and, optionally, Cloud CDN (https://cloud.google.com/storage/docs/hosting-static-website). Cloud CDN does not cache HTML by default (https://cloud.google.com/cdn/docs/caching).
- **FACT, config behavior:** `cleanUrls: true` drops `.html` with a 301. The default browser cache is 1 hour. Header globs are matched before rewrites and in the order they are defined. HSTS is overwritten on `*.web.app` but honored on custom domains (https://firebase.google.com/docs/hosting/full-config). Fingerprinted assets should get `max-age=31536000` (https://web.dev/articles/http-cache).
- **INTERPRETATION / recommendation:** Firebase Hosting as the default. Preview channels answer the weekly Seattle reviews, but put nothing confidential on them because they are public.

### 8.2 Repo status (OBSERVATION of this repo, 2026-09-24)
- `package.json` pins `gsap ^3.15.0`, `lenis ^1.3.26` and `vite ^8.3.1`.
- `firebase.json` already sets `public: dist`, `cleanUrls: true`, `trailingSlash: false`, immutable caching on `/assets/**` and fonts, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`, and `must-revalidate` on the index.
- **Gaps against this research:**
  - No HSTS (custom domain).
  - No CSP (it needs HubSpot and GA domains, §8.6).
  - No custom `404.html`.
  - Revalidation is set on the index only, so other HTML routes fall back to the 1-hour default.
  - No font CORS header.
  - No `Link: </llms.txt>; rel="describedby"` header.

### 8.3 SEO and GEO / AEO
- **FACT:** AI Overviews and AI Mode need nothing beyond normal indexing and snippet eligibility: "There are no additional technical requirements" (https://developers.google.com/search/docs/appearance/ai-features). "optimizing for generative AI search is optimizing for the search experience, and thus still SEO" (https://developers.google.cn/search/docs/fundamentals/ai-optimization-guide).
- **FACT:** Google Search ignores llms.txt, and keeping one "will neither harm nor help" (same guide). A site must be included in "Search generative AI features" in Search Console to be eligible (https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- **FACT:** FAQ rich results stopped showing "starting May 7, 2026" (https://developers.google.com/search/updates).
- **FACT:** "none of the major AI crawlers currently render JavaScript" (https://vercel.com/blog/the-rise-of-the-ai-crawler). Google still recommends pre-rendering and real `<a href>` links (https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- **FACT:** llms.txt v2 needs only an H1 and supports optional summaries, link lists and `.md` twins (https://llmstxt.org/). Its claim that Lighthouse audits for llms.txt is **unconfirmed**: the Chrome announcement names only accessibility, CLS and WebMCP (https://developer.chrome.com/blog/agent-ready-toolkit).
- **Recommendation (INTERPRETATION):**
  - Pre-rendered multi-page HTML with every word present before JS runs.
  - One H1 per page and a sequential outline; badges as a `<ul>`, not as H2s.
  - A unique `<title>`, meta description and canonical per page.
  - Full Open Graph tags: og:title, og:type, og:image and og:url are required, and og:image:alt is expected (https://ogp.me/).
  - A sitemap with absolute URLs and accurate lastmod (https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
  - A visible FAQ as plain HTML, with no expectation of rich results.
  - `/llms.txt` plus `.md` twins, described honestly as serving non-Google agents.

### 8.4 Structured data
- **FACT:** Organization markup "can help Google ... disambiguate your organization in search results" (https://developers.google.com/search/docs/appearance/structured-data/organization). The site name comes from WebSite `name` and `alternateName` (https://developers.google.com/search/docs/appearance/site-names). A SoftwareApplication rich result needs a rating or review (https://developers.google.com/search/docs/appearance/structured-data/software-app).
- **Recommendation (INTERPRETATION):**
  - Organization: name "Sapience AI", legalName "Sapience AI Corp", url, logo, foundingDate 2024, address, and `sameAs` pointing to https://www.linkedin.com/company/sapience-ai-corp , https://github.com/Sapience-AI and the Chrome Web Store listing.
  - WebSite with name and alternateName.
  - Plain SoftwareApplication semantics with no ratings. Do not claim rich-result eligibility.
  - Structured data must match the visible text.
  - Include no funding data.

### 8.5 Crawler policy (robots.txt)
- **FACT:** "OAI-SearchBot" controls visibility in ChatGPT search. GPTBot is for training. ChatGPT-User fetches on a user's behalf (https://platform.openai.com/docs/bots). Anthropic runs ClaudeBot (training), Claude-User and Claude-SearchBot, all of which honor robots.txt (https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler). PerplexityBot "is not used to crawl content for AI foundation models" (https://docs.perplexity.ai/guides/bots). Google-Extended "does not impact a site's inclusion in Google Search" (https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers).
- **Recommendation (INTERPRETATION):** allow the search and user-fetch agents. Present the training crawlers (GPTBot, ClaudeBot, Google-Extended) as an **explicit, commented policy decision for Sapience to make**. This fits its "your data trains your model only" governance stance.

### 8.6 HubSpot integration options
| Option | Pros | Cons | Sources |
|---|---|---|---|
| **A. Custom semantic form → v3 unauthenticated submit** (`/submissions/v3/integration/submit/{portalId}/{formGuid}`, with `context.hutk`, pageUri, pageName and legal consent) | Full design and motion control; native labels and buttons; can carry WebMCP attributes | You own validation, consent text and spam handling. It returns `FORM_HAS_RECAPTCHA_ENABLED` if the form uses reCAPTCHA. HubSpot files the endpoint under "legacy". | https://developers.hubspot.com/docs/api-reference/legacy/marketing/forms/v3-legacy/submit-data-unauthenticated |
| **B. New-editor embed** (`hs-form-frame`, iframe) | Fastest; stays HubSpot-managed | "The new forms use a pure iframe implementation". Styling only through `--hsf-*` variables. Lenis "smooth scroll will stop working over iframe". WebMCP is disabled in cross-origin iframes. | https://community.hubspot.com/t/onsubmit-function-in-multistep-beta-forms/115367/5 ; https://developers.hubspot.com/docs/cms/start-building/features/forms/forms ; https://www.npmjs.com/package/lenis ; https://developer.chrome.com/docs/ai/webmcp |
| **C. Developer embed** (`.hs-form-html`, not an iframe) | Styleable | Requires Marketing Hub or Content Hub Professional or Enterprise | https://knowledge.hubspot.com/forms/set-up-and-style-your-form-on-an-external-site |
| **D. Legacy v2** (`hbspt.forms.create`) | Well known | Legacy editor only. "Setting your form as a raw HTML form is not available in the updated form editor." | same KB ; https://developers.hubspot.com/docs/cms/start-building/building-blocks/modules/forms |

- **Always:**
  - Load the tracking code once per page ("Non-HubSpot form submissions will not be captured without the tracking code", https://knowledge.hubspot.com/reports/install-the-hubspot-tracking-code).
  - Do not self-host HubSpot's scripts.
  - Add the embedding domain in HubSpot's tracking settings, or submissions may be marked as spam.
  - Register `hs-form-event:*` listeners before the embed runs (https://developers.hubspot.com/docs/api-reference/latest/marketing/forms/global-form-events).
- **Recommendation (INTERPRETATION):** the concept ships Option A with documented seams and the Option B fallback. Engineering makes the final choice.

### 8.7 Motion stack: GSAP and Lenis status
- **FACT:** GSAP, including SplitText, MorphSVG and all former Club plugins, has been free for commercial use since the Standard License of Apr 30, 2025. The only prohibition is building a visual no-code animation tool that competes with Webflow (https://gsap.com/community/standard-license/ ; https://gsap.com/pricing/). The current version is **3.15.0 (2026-04-13)**, which adds `easeReverse` (https://gsap.com/blog/3-15/ ; https://www.npmjs.com/package/gsap). ScrollTrigger's docs still call ScrollSmoother "members-only", which is stale (OBSERVATION).
- **FACT:** SplitText 3.13+ adds `mask`, `autoSplit` and `onSplit` (for re-splitting after fonts load) and an `aria` option (https://gsap.com/docs/v3/Plugins/SplitText/). `gsap.matchMedia()` accepts a `reduceMotion` condition and reverts automatically. `gsap.matchMediaRefresh()` supports an on-page toggle (https://gsap.com/docs/v3/GSAP/gsap.matchMedia()). ScrollTrigger: "don't animate the pinned element itself" (https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- **FACT:** Lenis now ships as the `lenis` package (1.3.26 on npm; the GitHub README snippets say 1.3.23). `respectReducedMotion` defaults to true per the npm README (verify in the installed version). Smooth scroll stops over iframes, and Safari is capped at 60 fps (https://www.npmjs.com/package/lenis). The documented sync:
  ```js
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **FACT:** CSS scroll-driven animations (`animation-timeline`) are still "not Baseline" (https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline). Use GSAP for scroll-linked motion.

### 8.8 Reduced motion and accessibility
- **FACT:** WCAG 2.3.3 says "Motion animation triggered by interaction can be disabled, unless the animation is essential" and names parallax as typically non-essential (https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). WCAG 2.2.2: moving content that starts automatically, runs over 5 s and sits alongside other content needs pause, stop or hide, and scrolling an element into view counts as starting automatically (https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). `prefers-reduced-motion` has been available "across browsers since January 2020" (https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- **FACT:** SplitText's aria-label approach failed in JAWS/Chrome, Narrator/Edge, VoiceOver (macOS and iPadOS) and Orca. It is also prohibited on generic `div`/`span` (https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html ; https://github.com/greensock/GSAP/issues/642).
- **FACT:** "fluid motion ... is functionally broken for agents". Recommendations: stable layout, no transparent overlays, native controls, labels tied to inputs (https://web.dev/articles/ai-agent-site-ux). Lighthouse M150 adds an "Agentic browsing" category covering accessibility-tree checks, CLS stability and WebMCP (https://developer.chrome.com/blog/agent-ready-toolkit). WebMCP's declarative `toolname` and `tooldescription` form attributes are "safe to use in all browsers" (https://developer.chrome.com/docs/ai/webmcp/declarative-api).
- **Rules for the build (INTERPRETATION):**
  - Put all motion setup inside one `gsap.matchMedia()` with `isDesktop`, `isMobile` and `reduceMotion` conditions.
  - Set start states only from JS, never as default CSS `opacity: 0`.
  - Under reduced motion: no pinning, scrubbing or parallax. Stats render at their final values. Text stays unsplit. Tickers are static.
  - Add a visible site-wide "Reduce motion" toggle that calls `matchMediaRefresh()`.
  - Any loop over 5 s gets a pause control.
  - Split only headings (h1–h3), by lines or words with `mask: 'lines'`, never by characters. Revert after the animation, or use a visually hidden duplicate plus an aria-hidden animated copy.
  - Nothing may trap or hide the primary CTA after a reveal.

### 8.9 Performance budget
- **FACT:** "good" at p75 means LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 (https://web.dev/articles/vitals). Vercel's WebGL hero drops to low quality on low-tier GPUs, low battery or unstable frame rates (https://tympanus.net/codrops/2026/09/03/from-rays-to-meshes-building-vercels-prism-with-vgpu/). SVG `<textPath>` has been Baseline since 2015 (https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath).
- **Recommendation (INTERPRETATION):** the LCP element is real text or a static poster, never a canvas. Prefer SVG and CSS over WebGL. If any WebGL ships, it gets adaptive quality and pauses when off-screen.

### 8.10 Measurement
- **FACT:** GA4 and GTM are already on the site (https://builtwith.com/sapienceai.co). Search Console has a generative-AI performance report (https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). HubSpot AEO, launched April 22, 2026, tracks brand visibility, citations and share of voice across ChatGPT, Gemini and Perplexity. It is $50/mo standalone or included in Marketing Hub Pro/Enterprise (https://ir.hubspot.com/news-releases/news-release-details/introducing-hubspot-aeo-answer-showing-ai-search-engines ; https://knowledge.hubspot.com/seo/set-up-and-analyze-ai-visibility).
- **Recommendation (INTERPRETATION):**
  - GA4 events for CTA clicks, chapter progress and use of the motion toggle.
  - HubSpot AEO prompts such as "AI platform for associations", including name-collision monitoring.
  - Turn on Search Console's "Search generative AI features" inclusion.

---

## 9. Do-not-confuse list (unrelated same-name entities)

| Entity | Domain or handle | What it is | Why it is not Sapience AI (sapienceai.co) | Sources |
|---|---|---|---|---|
| **Sapience AI Inc / Sapience AI s.r.o. (Slovakia)** | sapienceai.eu; LinkedIn `sapience-ai-s-r-o`; the TipRanks "Sapience AI Inc" page | "EU-first GPU-as-a-Service". President Corey Maynard. Majority shareholder Ascendance Group Limited. **Received the $8.8M minority investment from Society Pass (Nasdaq: SOPA), announced 2026-01-22** ("10,234 Sapience AI shares at $860 per share, including $600,000 in cash"). 4 employees as of May 2026. | Different country, product and leadership | https://sapienceai.eu/ ; https://sk.linkedin.com/company/sapience-ai-s-r-o ; https://www.globenewswire.com/news-release/2026/01/22/3223645/0/en/Society-Pass-Incorporated-Nasdaq-SOPA-Enters-US-371-Billion-Global-AI-Data-Centre-Market-with-US-8-8-Million-Investment-in-Sapience-AI-Inc.html ; https://www.datacenterdynamics.com/en/news/slovakia-based-sapience-ai-secures-88m-in-funding/ ; https://app.dealroom.co/news/feed/society-pass-invests-8-8m-in-ai-data-centre-startup-to-tap-371b-market-1 ; https://baxtel.com/news/sapience-ai-secures-8-8m-in-funding ; https://www.tipranks.com/private-companies/sapience-ai-inc |
| **Sapience Labs + CoreTx** | spnc.ai | A continual-learning memory product; founder Oliver Zahn. "Sapience turns what we each know into what we all know. Owned, never taken." | Different founders and product. **Messaging overlaps closely, so confusion risk is high.** | https://spnc.ai/ ; https://www.linkedin.com/in/cosmologist |
| **sapienceai.org** | sapienceai.org | "This website is a placeholder for a nonprofit that I hope to found in the coming year." (Adam Safron, PhD) | A placeholder page for a planned nonprofit | https://sapienceai.org/ |
| **Sapience Analytics / Sapience Workforce Intelligence** | sapienceanalytics.com | Workforce-analytics SaaS (SapienceIQ), McKinney, Texas; CEO Brad Killinger | Different category and HQ | https://sapienceanalytics.com/ |
| **Sapience Cloud** | sapiencecloud.ai | "Operating System for AI Agents". Founded 2021; Ken Shaw (Sydney). Ships a notetaker, "Sapience Meetings", which is the opposite of NoteBouncer. | Different company, and a product that directly contradicts NoteBouncer | https://linkedin.com/company/sapience-cloud-ai ; https://www.sapiencecloud.ai/product/meetings |
| **New Sapience** | newsapience.com | "Synthetic intelligence"; founder Bryant Cruse | Different company | https://www.newsapience.com/ |
| **Sapience Communications Ltd** | — | A London PR consultancy | Different industry | https://uk.linkedin.com/in/louisa-n-557a341a |
| **Other "collective intelligence platforms"** | Mindhive, Beeshake, PlusPlus, bRAINdrop, Nuclave, Cognihive | The same category phrase, used outside associations | The phrase is not ownable alone | https://mindhive.ai/ ; https://beeshake.com/en/ ; https://plusplus.co/ ; https://trybraindrop.com/ ; https://nuclave.com/ ; https://www.cognihive.ai/ |
| **"Sage" (MemberJunction)** | memberjunction.org | An association-sector "Sage Orchestration Agent" with the same routing role | A naming collision within the same vertical | https://memberjunction.org/ai-agents |
| **"Sage" (accounting software)** | — | A common accounting brand in association tech stacks, listed as a Glue Up integration | A naming collision in search | https://www.glueup.com/ |

**Known data contamination (FACT):**
- The LinkedIn enrichment for sapience-ai-corp shows "Total Funding: USD 8,800,000 – Corporate round (2026-01-01)" (https://www.linkedin.com/company/sapience-ai-corp).
- VCBacked says "Seattle ... Last funding $8.8M Corporate Round Jan 2026 ... investors include Society Pass" (https://www.vcbacked.co/company/sapience-ai). Both are wrong. The Seattle company's verified raise is the $1.5M in §1.4.
- GetLatka's "CEO" label for Monte Gibbs is out of date. Its revenue figure is its own estimate (https://getlatka.com/companies/sapienceai.co).

---

## 10. Design implications — statements the creative concept must honor

1. **Trace every claim.** Every fact, figure and product name on the concept site traces to sapienceai.co or a cited third-party source. New copy is labelled as concept copy. Customers, logos, quotes, metrics and agent capabilities are never invented.
2. **People before prompts.** The hero idea is Sapience's own: intelligence "already lives within its people", and sometimes "you needed a person, not a prompt." No chat-box, prompt-box or phone-assistant hero.
3. **Motion explains a mechanism.** Each set piece shows something Sapience says it does:
   - knowledge "scattered across inboxes, drives, and disconnected tools";
   - a layer that will "organize, connect, and activate";
   - "the right insight reaches the right person at the right moment";
   - Sage "routes every question to the right agent";
   - knowledge that survives turnover.

   No motion exists only as decoration.
4. **Keep the chosen identity and go editorial.** Cream, deep purple as ink and accent (never glow or gradient), serif display, sans body, charcoal for contrast. A proceedings register that no competitor uses. Strictly none of the §5.5 clichés.
5. **Trust through provenance.** Stats are real text with footnotes giving source, year and sample. There is one reconciled figure per claim, flagged "to be confirmed by Sapience AI". Industry benchmarks are attributed to their publishers and never presented as Sapience results.
6. **Governance on the main path.** Security and governance is a chapter in the main scroll and a page of its own. It is shown as architecture (per-tenant isolation, envelope encryption, audit trail) using only the 8 published controls. No certification badges.
7. **Honest proof slots.** Customer-story and logo modules look finished with zero names and can take real, approved stories later.
8. **Describe only what's described.** Affinity and Corporate appear as names only until Sapience supplies descriptions. Labs products carry their true status ("early access", waitlist).
9. **The document comes first.** All content exists in static, semantic HTML before any script runs: one H1 per page, a logical outline, real links. Motion is progressive enhancement, and start states are set only by JS.
10. **The visitor controls the motion.** Motion is scroll-linked and reversible. No loop runs over 5 s without a pause control. `prefers-reduced-motion` is honored, plus a visible site-wide toggle: "Your meetings. Your control." applied to the site itself.
11. **Stable for people and agents.** CLS ≤ 0.1, LCP ≤ 2.5 s with text as the LCP element, native buttons and labelled fields, no overlays left over CTAs, SplitText on headings only (by lines or words).
12. **Built for their stack.** Static HTML5 on Firebase Hosting (Google infrastructure). GA4 stays. The form leaves documented seams for the HubSpot connection engineering owns.
13. **Disambiguate the entity.** Organization and WebSite structured data, `sameAs` links and precise copy ("collective intelligence platform for professional communities", plus association vocabulary) separate Sapience AI from sapienceai.eu, Sapience Labs, Sapience Cloud and the rest.
14. **A system, not a page.** Tokens and components flex between the core association register and a punchier Labs/Developer register. The logo and icon are a swappable slot, because the icon refresh runs in parallel.
15. **Reviewable in a room, and clearly unofficial.** Chaptered and presentable on a big screen for weekly Seattle reviews, with a rationale page and an audit appendix. It is marked everywhere as a speculative, unaffiliated concept, with no mock domain and no official-looking claims.

---

## 11. Content that is SAFE to use vs content that must NOT be used

### 11.1 SAFE: verbatim from sapienceai.co (attribute as Sapience AI's own copy)
| Content | Source |
|---|---|
| Hero "The collective intelligence platform for professional communities"; its sub-headline; CTA "Get Started" | https://sapienceai.co/ |
| "We're helping the world's most purpose-driven professional communities transform the way they work" | https://sapienceai.co/ |
| "Give your community its competitive edge" plus its sub-copy; "Built around your organization" plus its sub-copy | https://sapienceai.co/platform |
| Pillar names and copy for Private Intelligence Core and No Migration Required; Governance You Control **except the flagged sentence in §11.4** | https://sapienceai.co/platform |
| "Professional communities are sitting on untapped intelligence. Across the industry, organizations are bleeding time, labor, and retained members because their collective knowledge isn't accessible." | https://sapienceai.co/platform |
| The agents section intro; "01. Sage — AI Assistant" and its full description; the **names** "Affinity — AI Agent" and "Corporate — AI Agent" | https://sapienceai.co/platform |
| Security H2, body and all 8 control labels (§2.4) | https://sapienceai.co/ ; https://sapienceai.co/platform |
| "Built for communities that can't afford to leave knowledge on the table" plus its sub-copy | https://sapienceai.co/customers |
| "Insights sit scattered across inboxes, drives, and disconnected tools, leaving teams to make decisions without the full picture." | https://sapienceai.co/customers |
| All four values, verbatim (§2.5); the "Our team" paragraph | https://sapienceai.co/company |
| Labs H1 and intro; NoteBouncer copy; OpenClaw copy; Chrome copy **with an "early access / waitlist" qualifier** (§11.4) | https://sapienceai.co/labs |
| "Build on the intelligence layer for professional communities" | https://sapienceai.co/developers |
| Contact H1, "Book a conversation with our team." plus its body ("We'll show you how Sapience AI works with your existing systems and what your community's data can do."); contact@sapienceai.co | https://sapienceai.co/contact |
| "We are building a new way forward ... Come build with us." | https://sapienceai.co/careers |
| "Institutional Knowledge Infrastructure for professional associations and membership organizations" | https://sapienceai.co/tos |

### 11.2 SAFE with attribution: company-authored, off-site
| Content | Source |
|---|---|
| Mission ("...so the right insight reaches the right person at the right moment...") | https://www.linkedin.com/company/sapience-ai-corp |
| Tagline and the "layer ... organize, connect, and activate" line | https://www.linkedin.com/company/sapience-ai-corp |
| "Not generic intelligence. Trusted intelligence." / "Not to automate humanity. To elevate it." | https://www.linkedin.com/company/sapience-ai-corp |
| "The Organization That Never Forgets" (describe it as Sapience's *proposed* SXSW27 session) | https://www.linkedin.com/posts/sapience-ai-corp_sxsw27-ai-sxsw-activity-7495619443419537409-NrHQ |
| "Let's achieve more, together." | https://www.linkedin.com/posts/sapience-ai-corp_sapienceai-meetthefounder-founderstory-activity-7444832148316082176-AlX2 |
| "Human Mode ... Humans in partnership with AI." (attribute to the founder) | https://www.linkedin.com/in/montegibbs |
| "Because 'Autonomous' shouldn't mean 'Uncontrolled.'" | https://github.com/Sapience-AI/openclaw-middleware-suite |
| The recruiting "About Sapience AI" paragraph | https://job-boards.greenhouse.io/sapienceaicorporation/jobs/4393679009 |
| "Sapience AI — Humans In Partnership" (store name) and "Sapience AI is in early access." | Chrome Web Store listing (§1.6) |

### 11.3 SAFE as cited industry context, never presented as Sapience results
The §5.4 findings (iMIS/ASI 2026, MGI 2025/2026, ASAE, Naylor, the Momentive ASAE Annual recap, the officer-handover and leadership-transition articles, NASS). Each needs an on-page citation naming the publisher and year.

### 11.4 USE ONLY WITH A VISIBLE FLAG
| Content | Why | How to use |
|---|---|---|
| Stats: 57%, $150K–$300K / 250k+ / 150k+, 20+ / 15+, 70k+, 84%, 29%, 5x+ | Conflicting and unsourced (§4.6) | One figure per claim, set as real text with a footnote slot reading "Source: to be confirmed by Sapience AI". Suggested set: 57% / $150K–$300K / 29% / 84% (attribute 84% to MGI 2025 or note MGI 2026's 82%). Record the reconciliation in the audit appendix. |
| "You own the model." | Conflicts with the policy ("Sapience AI retains ownership of: AI models and their parameters") | Avoid in hero or trust copy. If shown, flag it for legal alignment. |
| "No third-party vendor processes your member records." | In tension with Gemini/Vertex as named processor of prompts | Same as above. Prefer policy-supported wording, marked as concept copy. |
| "Today's most forward-thinking membership organizations trust Sapience AI" | Framed as pre-release, Design Partner, MVP elsewhere | Usable verbatim, but not next to invented proof |
| Chrome "connects you with someone..." | The store says peer-matching is waitlisted | Always pair it with "early access" and the waitlist |
| "live in days — not months" | Common across the category; no public detail behind it | Low on the page, verbatim only |
| Sage mock values ("92/100", "Sustainable Tech with 34 active threads") | Illustrative data inside Sapience's own image | Only inside a mock labelled as illustrative, and only these values |
| Sapience's real product screenshots and wordmark | Permission unknown; the icon is mid-refresh | Redraw the product UI as illustrative. Use the wordmark only as a labelled placeholder slot. |

### 11.5 DO NOT USE
- **Any "$8.8M" funding figure**, TipRanks items, or anything else about the Slovak GPU company (§9).
- **Any funding figure by default.** The SEC's $1.5M is verified, but disclosing it is Sapience's decision.
- **Content from other "Sapience" entities**: spnc.ai, sapienceai.org, Sapience Analytics, Sapience Cloud, New Sapience, Sapience Communications.
- **Invented customers, logos, testimonials, case studies, quotes or outcome metrics.** None are public.
- **Descriptions of what Affinity or Corporate do.**
- **Named AMS, CRM or LMS vendors as integrations.** Enrichment mentions of MemberClicks and Nimble AMS are unverified.
- **SOC 2, ISO or other certification badges or claims.** The policy contradicts itself (§4.6).
- **Legacy vocabulary**: "hive mind", "superintelligent", "Collaborative General Intelligence", "Vertical Agentic AI".
- **Headcount, revenue estimates (GetLatka), investor lists beyond the company-confirmed Mighty Capital, and any personal details or speculation about staff** beyond public job titles.
- **The "Solutions" nav item**, which does not exist on the live site.
- **Competitor names, logos or screenshots on the concept site.** Comparisons stay in the research docs.
- **Anything that could pass as the official site**: a lookalike domain, official-sounding announcements, or legal or pricing claims.

### 11.6 Labelling rules for the concept
- A persistent notice on every page: "Speculative design concept. Not affiliated with or endorsed by Sapience AI."
- New copy is marked in the source (for example `data-copy="concept"`) and listed in a copy deck, separate from verbatim copy.
- Scenarios (for example "a certification question routed to a past committee chair") carry an "Illustrative" label.
- Each stat and industry figure carries a footnote with its source, or "to be confirmed".

---

## Appendix A — Open questions to confirm with Sapience AI

1. What do the **Affinity** and **Corporate** agents do? Is their copy in collapsed accordions, or not yet written?
2. Which impact figure is canonical ($150K–$300K, 250k+ or 150k+), and which hours figure (20+ or 15+)? What are the sources and method for 57%, 29%, 84%, 70k+ (and its unit) and 5x+?
3. Can any customers or design partners be named? Does /customers show logo images the crawl missed?
4. Which AMS, CRM and LMS systems are supported today?
5. Is the platform GA, or still in the Pre-Release/Design Partner phase? What is the December "fall product launch": GA, a new product name, or a rebrand? Will Sage, Affinity and Corporate keep their names after the naming and taxonomy work?
6. Model ownership: is "You own the model" (Platform) or "Sapience AI retains ownership" (policy) correct? Does the company hold any certifications itself?
7. Where does "Get Started" go, and what powers "Book a conversation"? Which HubSpot tier is in use (it decides between embed options C and AEO), and do its forms use reCAPTCHA?
8. Which Google hosting target does engineering prefer (Firebase Hosting, Cloud Storage + LB + CDN, or Cloud Run)? Are there CSP or analytics constraints?
9. What is the policy on AI training crawlers (GPTBot, ClaudeBot, Google-Extended) versus AI search crawlers?
10. Will the icon refresh (Sep 14–Oct 12) change the wordmark, palette or typography before Dec 9?
11. Does the live home page ship a `<title>`, meta, OG and JSON-LD? This needs a real-browser check.
12. Are the nav differences (About vs Company, Labs present or absent) live, or stale cache? Did a Solutions page ever exist?
13. Is NoteBouncer live on the Zoom Marketplace? Is Chrome peer-matching live, or still waitlisted?
14. Will Labs and Developer products stay in the main IA after launch?
15. Is "Head of Marketing Communications" (the posting) the same role as the public "Head of Brand & Communications" title?
16. May the concept show real product screenshots under a speculative-concept disclaimer, or must all UI be redrawn?
