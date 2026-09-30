# LIV Deals OS — independent concept

An independent proof-of-concept for LIV Cannabis by Mousa Batarseh.
Not affiliated with, produced by, or endorsed by LIV Cannabis.

## What's in here
- `index.html` — the full case-study + interactive concept (self-contained markup + CSS)
- `app.js` — data + interactions (deals grid, Deal OS, pipeline animation)
- `evidence/` — optimized screenshots captured from LIV's live site on 30 Sep 2026

## Deploy (any static host)
This is a plain static site — no build step. Options:
- **Netlify drop:** drag this folder onto https://app.netlify.com/drop
- **Vercel:** `vercel deploy` from this folder, or import as a static project
- **Your own host / subdomain (e.g. liv.mousabatarseh.com):** upload the folder as-is
- **Local preview:** `python3 -m http.server` then open http://localhost:8000

Keep `index.html`, `app.js`, and the `evidence/` folder together — paths are relative.

## Notes
- All deal pricing/data is illustrative sample data, not live LIV pricing.
- Fonts load from Google Fonts (Fraunces, Hanken Grotesk, Space Mono).
- Respects `prefers-reduced-motion`.

© 2026 Mousa Batarseh · All rights reserved.
