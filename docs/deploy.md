# Replacing the live site — only after approval

Nothing here has been done. The live site at mousabatarseh.com is untouched; the new portfolio exists only on this branch and on the private Vercel preview. These steps are for **after** Mousa explicitly approves the replacement.

## What the live domain looks like today (checked 2026-09-26)

- The root is a **static site**, not WordPress: `/wp-json/`, `/feed/` and `/wp-sitemap.xml` return 404 (`capture/content/blog/probe.json`).
- `/blog/` is a static index page. Every post link on it, `mousabatarseh.com/<post>/`, **redirects to `/blog/`** — including the 16 posts whose text exists on work.mousabatarseh.com. The other 20 listed posts have no published text anywhere.
- `/reviews/` is its own static site: an index, a summary page per review at `/reviews/reviews/<review>/`, plus `/reviews/builds/` and `/reviews/method/`.
- The full reviews live in their own folders, `/<name>-review/` (for example `/vanguard-review/`), several with more than one sheet.
- Around them are folders that must keep working: `/v2/`, `/changeatlas/`, `/csv-mapper/`, `/deals-os/`, `/dealproof/`, `/SEO-Tools/`, `/diamedical*/`, `/Larkspur/`, `/sapienceai/`, `/jobs/`, the proposals, `robots.txt` and `sitemap.xml`.

## What the upload changes

| Path | Effect |
|---|---|
| `index.html`, icons, `llms.txt` | **Replaced** by the new home page and icons. |
| `/work/`, `/about/` | New. Both return 404 on the live domain today, so nothing is shadowed. |
| `/blog/` | **`index.html` replaced**; a folder per post added (`/blog/<post>/`). |
| `/reviews/` | **`index.html` replaced**; a folder per review added (`/reviews/<review>/`). The old `/reviews/reviews/`, `/builds/`, `/method/`, `/img/` and `/assets/` folders stay on the server; nothing in the new site links to them. |
| `/_assets/`, `/media/`, `/og/` | New: CSS/JS/fonts, captures and recordings, share images. |
| `404.html`, `sitemap-portfolio.xml` | New. The existing `sitemap.xml` is untouched. |

The package contains **no root `.htaccess`, `robots.txt` or `sitemap.xml`**, so no existing routing, blocking or listing rule is overwritten. `deploy/MANIFEST.txt` lists every top-level entry and its size.

## 1. Build the package

```bash
npm ci
npm run package:root
```

This runs a production build (indexable, canonical URLs on mousabatarseh.com) into `deploy/build/`. It refuses to package if any page is `noindex`, has a canonical URL off the main domain or mentions a `vercel.app` host. It writes `deploy/mousabatarseh-root.zip`, `deploy/MANIFEST.txt` and `deploy/redirects.htaccess`.

## 2. Back up first (cPanel)

1. **Full backup:** cPanel → *Backup* → *Download a Home Directory Backup*. Keep the `.tar.gz` off the server.
2. **Quick copies of what gets replaced:** cPanel → *File Manager* → `public_html`:
   - download `index.html` (or whichever `index.*` serves the home page), `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `llms.txt` and the root `.htaccess`;
   - select the `blog` and `reviews` folders → *Compress* → download the two zips.
3. **Check for name clashes:** `public_html` must not already contain `work`, `about`, `_assets`, `media` or `og`. If one exists, stop.
4. **Check the index order:** if the home page is served by `index.php` rather than `index.html`, rename the old `index.php` to `index.php.bak` or ask the host which one `DirectoryIndex` prefers.

## 3. Upload

1. File Manager → `public_html` → *Upload* → `mousabatarseh-root.zip`.
2. Select the zip → *Extract* → into `/public_html`. Confirm overwriting `index.html`, `blog/index.html`, `reviews/index.html` and the icons.
3. Delete the zip from the server.
4. Add this line to the existing `robots.txt` (keep everything already in it):
   ```
   Sitemap: https://mousabatarseh.com/sitemap-portfolio.xml
   ```

## 4. Redirects (recommended — needs a change to the root `.htaccess`)

Old links still point at `/<post>/` and `/reviews/reviews/<review>/`. `deploy/redirects.htaccess` holds the rules, generated from the site's data:

- each of the 16 posts: `/<post>/` → `/blog/<post>/` (301);
- every review summary page: `/reviews/reviews/<review>/` → `/reviews/<review>/` (301);
- commented out, **optional**: each full-review folder `/<name>-review/` → `/reviews/<review>/`. These are the original work samples (some were sent with job applications), so they stay as they are unless Mousa decides otherwise.

Open the root `.htaccess` (the copy from step 2.2 is the backup), paste the rules **directly after `RewriteEngine On`** so they run before whatever currently sends post links to `/blog/`, and save. Then test three URLs in a private window: one post, one review summary, and `/blog/` itself.

Optional, for the designed 404 page: add `ErrorDocument 404 /404.html` — only if the `.htaccess` has no `ErrorDocument` line already.

## 5. Verify (fresh private window, desktop and phone)

- `/`, `/work/`, `/about/`, `/blog/`, `/reviews/`, one case study, one post and one review load with styles, fonts, images and recordings.
- The footer shows "This page: … KB" and the build date.
- `/v2/`, `/changeatlas/`, `/csv-mapper/`, `/deals-os/`, `/dealproof/`, `/SEO-Tools/`, `/diamedical/`, one full review (for example `/vanguard-review/`) and one proposal still load exactly as before.
- `view-source:` of the home page has no `noindex` and has `<link rel="canonical" href="https://mousabatarseh.com/">`.
- `https://mousabatarseh.com/sitemap-portfolio.xml` and `https://mousabatarseh.com/robots.txt` load.
- Google Search Console → *Sitemaps* → submit `sitemap-portfolio.xml`; *URL Inspection* → request indexing for `/`, `/work/`, `/blog/` and `/reviews/`.

## Rollback (about five minutes)

1. File Manager → `public_html`: delete the folders `work`, `about`, `_assets`, `media`, `og` and the files `404.html` and `sitemap-portfolio.xml`.
2. Delete the `blog` and `reviews` folders, then upload and extract the two folder zips from step 2.2.
3. Upload the `index.html`, icons, `llms.txt` and root `.htaccess` saved in step 2.2 (this also removes the redirects).
4. Remove the `Sitemap: …/sitemap-portfolio.xml` line from `robots.txt`.
5. If anything else looks wrong, restore the full backup from step 2.1.

## Why not Vercel for the main domain

The preview project on Vercel could serve the new site, but pointing mousabatarseh.com at it would take `/v2/`, the tools, the full reviews and the proposals off the domain unless each one were proxied. The upload above keeps all of them where they are.
