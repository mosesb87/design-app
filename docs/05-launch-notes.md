# From concept to launch

What turns this concept into Sapience AI's production site by the posting's live date (December 9, 2026). Everything below is a proposal for Sapience AI's marketing, brand and engineering teams to decide on together.

## 1. Before the switch-over

| Item | Concept state | Production |
|---|---|---|
| Indexing | `noindex, nofollow` on every page; `robots.txt` disallows everything | Remove `noindex`, and publish the crawler policy below |
| Entity markup | Organization and WebSite JSON-LD in `index.html` | Keep. Add `logo` once the icon refresh lands. Structured data must match the visible text |
| Titles and meta | Concept titles | One unique `<title>` and meta description per page, using a single separator (` · `) across the site |
| Canonicals | None | `<link rel="canonical">` on every page (apex domain) |
| Sitemap | None | `sitemap.xml` with absolute URLs and a real `lastmod` value, submitted in Search Console |
| AI search | `llms.txt` describes the concept | `llms.txt` describes Sapience AI and links `.md` twins of the key pages. In Search Console, turn on the setting that includes the site in "Search generative AI features" |
| Copy | Verbatim copy is tagged `data-copy="verbatim"`; open items are tagged `tbc` | Close every `tbc` item with Sapience AI (see the open questions in [`../notes.html`](../notes.html)) |
| Wordmark | Text slot (`data-slot="wordmark"`) | Drop in the refreshed logo. It is one element, so nothing else changes |

### Proposed `robots.txt` (a policy decision for Sapience AI)

```txt
# Search and assistant retrieval — allow, so Sapience AI can be found and cited
User-agent: Googlebot
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
Allow: /

# Model training — Sapience AI's call. Its own promise is "your data trains your model only";
# many companies apply the same principle to their public site. Uncomment to opt out.
# User-agent: GPTBot
# User-agent: ClaudeBot
# User-agent: Google-Extended
# Disallow: /

Sitemap: https://sapienceai.co/sitemap.xml
```

## 2. HubSpot (the connection is owned by engineering)

The booking form in the concept is native HTML with labels and validation. It never pretends to send. The hand-off has two options:

- **Option A: the concept's own form, submitted to the HubSpot Forms API.** This gives full design control, native fields, and consent text written by Sapience AI. It posts to `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` with:
  - the `hubspotutk` cookie as `context.hutk`;
  - `pageUri` and `pageName`;
  - `legalConsentOptions`.

  Engineering owns the portal ID, the form GUID, spam handling, and reCAPTCHA settings. The endpoint rejects forms that have reCAPTCHA turned on.
- **Option B: HubSpot's embedded form.** This is the fastest to ship, but the new editor renders the form in an iframe. Styling is then limited to HubSpot's variables, and Lenis smooth scrolling stops while the pointer is over the iframe.

Whichever option is chosen:
- Load the HubSpot tracking code once per page, and add the domain to HubSpot's tracking settings.
- Keep the WebMCP `toolname` / `tooldescription` attributes on the form, so AI agents can use it properly.

## 3. Hosting on Google infrastructure

`firebase.json` is included. It provides:
- clean URLs;
- immutable caching for fingerprinted assets and fonts;
- revalidation for HTML;
- `nosniff`, `Referrer-Policy` and `Permissions-Policy` headers.

```bash
npm ci
npm run build                      # tsc --noEmit && vite build → dist/
firebase deploy --only hosting     # production
firebase hosting:channel:deploy review-$(date +%m%d) --expires 7d   # a preview URL for the weekly design review
```

Before launch:
- Add HSTS on the custom domain.
- Add a Content-Security-Policy that allowlists only GA4/GTM and HubSpot.
- Add a `Link: </llms.txt>; rel="describedby"` header.

Preview channel URLs are public to anyone who has the link, so keep confidential drafts off them.

## 4. Measurement

The site already uses GA4 and GTM (per BuiltWith). Proposed events:

| Event | When |
|---|---|
| `cta_click` (label: location) | Any "Book a conversation" |
| `chapter_view` (label: I–IX) | A chapter becomes current in the running head |
| `motion_toggle` / `provenance_toggle` | The reader changes a setting |
| `form_start` / `form_submit_attempt` | The booking form |

Also use:
- Search Console's generative-AI performance report;
- HubSpot AEO prompts that track visibility for "AI platform for associations". Include a name-collision check, because several unrelated companies use "Sapience" in their names.

## 5. Customer testing (with current customers, per the posting)

Run five 30-minute sessions: think-aloud, on their own device, with motion at the tester's normal setting. Tasks:

1. In your own words, what does Sapience AI do, and for whom? (Asked after 20 seconds on the page.)
2. Find out how your members' data is protected.
3. Explain what Sage does.
4. Find where an answer's information came from.
5. Book a conversation.

Measure task success, time to answer, and misread moments. The expected revisions are copy and pacing. The long pinned sequence is the first candidate to shorten if testers stall in it.

## 6. Phased plan to December 9

| Weeks | Output | Review |
|---|---|---|
| 1–2 | Audit sign-off, IA, content model, and alignment with the brand refresh (type and icon) | Seattle design review |
| 3–4 | Vertical slice: title page, the single take, the answer. Tested on real hardware and a projector | Review, plus the first customer sessions |
| 5–7 | All templates (Platform, Security & Governance, Company, Customers, Labs, Developers, Contact, Careers, legal) and final copy | Weekly review |
| 8 | HubSpot connection with engineering, analytics, SEO and AIO, and accessibility audit | Engineering sign-off |
| 9 | Launch December 9, then monitoring and fixes through December 18 | Launch retro |
