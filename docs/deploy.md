# Replacing the live home page — only after approval

Nothing here has been done. The live site at mousabatarseh.com is untouched; the new portfolio exists only on this branch and on the private Vercel preview. These steps are for **after** Mousa explicitly approves the replacement.

## What changes on the domain

The live root is a static site (the current home page, not WordPress), surrounded by folders that must keep working: `/v2/`, `/reviews/`, `/blog/` (WordPress in its own folder), `/changeatlas/`, `/csv-mapper/`, `/deals-os/`, `/dealproof/`, `/SEO-Tools/`, `/diamedical*/`, `/Larkspur/`, `/sapienceai/`, `/jobs/`, every review and proposal folder, plus `robots.txt` and `sitemap.xml`.

The package **adds** `/work/`, `/about/`, `/_assets/`, `/media/`, `/og/` and `sitemap-portfolio.xml`, and **replaces** `index.html` and the icons. It deliberately does not contain a root `.htaccess`, `robots.txt` or `sitemap.xml`, so no routing, blocking or listing rule on the domain is overwritten. `/work/` and `/about/` both returned 404 on the live domain on 2026-09-26, so no existing page is shadowed. `deploy/MANIFEST.txt` lists every top-level entry the upload writes and what each one does.

## 1. Build the package

```bash
npm ci
npm run package:root
```

This runs a production build (indexable, canonical URLs on mousabatarseh.com) into `deploy/build/`. It refuses to package if any page is `noindex`, has a canonical URL off the main domain or mentions a `vercel.app` host. It then writes `deploy/mousabatarseh-root.zip` and `deploy/MANIFEST.txt`.

## 2. Back up first (cPanel)

1. **Full backup:** cPanel → *Backup* (or *Backup Wizard*) → *Download a Home Directory Backup*. Keep the `.tar.gz` somewhere off the server.
2. **Quick copies of what gets replaced:** cPanel → *File Manager* → `public_html`. Download `index.html` (or whichever `index.*` file serves the home page today), `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` and `llms.txt` if they exist. These are the only existing files the upload overwrites.
3. **Check for name clashes:** make sure `public_html` does not already contain folders called `work`, `about`, `_assets`, `media` or `og`. If one exists, stop and rename the new one in `astro.config.mjs` before packaging.
4. **Check the index order:** if the home page is served by `index.php` rather than `index.html`, the server's `DirectoryIndex` decides which one wins. Rename the old `index.php` to `index.php.bak` (only if it is not WordPress — WordPress lives in `/blog/`), or ask the host which order applies.

## 3. Upload

1. File Manager → `public_html` → *Upload* → `mousabatarseh-root.zip`.
2. Select the zip → *Extract* → into `/public_html`. Confirm overwriting `index.html` and the icons.
3. Delete the zip from the server.
4. Add this line to the existing `robots.txt` (keep everything already in it):
   ```
   Sitemap: https://mousabatarseh.com/sitemap-portfolio.xml
   ```
5. Optional, for the designed 404 page: add `ErrorDocument 404 /404.html` to the root `.htaccess`. Leave this out if the root `.htaccess` already has an `ErrorDocument` line or rewrite rules you are unsure about.

## 4. Verify (fresh private window, desktop and phone)

- `/`, `/work/`, `/about/` and every `/work/<case>/` load with styles, fonts, images and recordings.
- The footer shows "This page: … KB" and the build date.
- `/v2/`, `/reviews/`, `/blog/`, `/changeatlas/`, `/csv-mapper/`, `/deals-os/`, `/dealproof/`, `/SEO-Tools/`, `/diamedical/`, one review (for example `/reworked-review/`) and one proposal all still load exactly as before.
- `view-source:` of the home page has no `noindex` and has `<link rel="canonical" href="https://mousabatarseh.com/">`.
- `https://mousabatarseh.com/sitemap-portfolio.xml` and `https://mousabatarseh.com/robots.txt` load.
- Google Search Console → *Sitemaps* → submit `sitemap-portfolio.xml`; *URL Inspection* → request indexing for `/`, `/work/` and `/about/`.

## Rollback (about two minutes)

1. File Manager → `public_html`: delete the folders `work`, `about`, `_assets`, `media`, `og` and the files `404.html` and `sitemap-portfolio.xml`.
2. Upload the `index.html` and icons saved in step 2.2.
3. Remove the `Sitemap: …/sitemap-portfolio.xml` line from `robots.txt`, and the `ErrorDocument` line if you added it.
4. If anything else looks wrong, restore the full backup from step 2.1 (cPanel → *Backup* → *Restore a Home Directory Backup*).

## Why not Vercel for the main domain

The preview project on Vercel could serve the new site, but pointing mousabatarseh.com at it would take `/v2/`, `/reviews/`, `/blog/`, the tools and every review and proposal off the domain unless each one were proxied. The upload above keeps all of them exactly where they are.
