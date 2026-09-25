# Deploying to mousabatarseh.com/sapienceai

The concept is a static site built with Vite for the sub-path `/sapienceai/` (`base` in `vite.config.ts`). It is served as one self-contained folder on the existing host. Nothing else on the domain changes.

## Where the domain lives

| Checked | Finding |
|---|---|
| DNS | `mousabatarseh.com` resolves to 50.6.155.233, a Newfold Digital (Bluehost/HostGator) shared-hosting range |
| Site | WordPress at the root; `robots.txt` shows other installs in sub-folders (`/Larkspur/`, `/reviews/`) |
| Vercel | The domain is not on the Vercel account. `sapience-concept.vercel.app` is only a staging mirror |

So the least disruptive method is a new folder next to the existing ones. There is no DNS change, no WordPress plugin, no change to the root `.htaccess`, and no proxy to another host.

## Build the upload

```
npm ci
node scripts/package-sapienceai.mjs
```

This writes `deploy/sapienceai.zip`. It holds a single `sapienceai/` folder:

```
sapienceai/
├── .htaccess        rules for /sapienceai/* only
├── index.html
├── notes.html
├── 404.html
├── favicon.svg  og.png  llms.txt
└── assets/          CSS, JS and fonts (fingerprinted)
```

## Upload (cPanel File Manager)

1. Open **File Manager** and go to the folder that holds the site's WordPress files: the one with `wp-config.php`, `Larkspur` and `reviews`. Usually that is `public_html`.
2. Click **Upload** and choose `sapienceai.zip`.
3. Back in the folder, right-click `sapienceai.zip` and choose **Extract**. This creates the `sapienceai` folder.
4. Delete `sapienceai.zip` from the server.

FTP works the same way: upload the *contents* of the zip's `sapienceai/` folder into a new `sapienceai` folder next to `wp-config.php`. Include the hidden `.htaccess` file.

**To update later:** rebuild the zip, delete the old `sapienceai` folder, then upload and extract again.
**To undo:** delete the `sapienceai` folder.

## What the folder's `.htaccess` does

- It turns on the rewrite engine for this folder only, so the WordPress rules at the root are not inherited. No concept URL can fall through to WordPress.
- `/sapienceai/notes` serves `notes.html`, and `/sapienceai/notes.html` redirects there.
- Unknown `/sapienceai/*` paths get the concept's own 404 page.
- Apache adds the trailing slash, so `/sapienceai` redirects to `/sapienceai/`.
- Fingerprinted assets are cached for a year, and pages revalidate.
- It sends `X-Robots-Tag: noindex, follow`, so the concept stays out of search and is never mistaken for Sapience AI's site.
- Because it does not inherit the root's rules, it repeats the site's canonical address itself: http → https and www → the bare domain, with a check that avoids a loop on hosts that terminate TLS in front of Apache.
- It declares UTF-8 for text files and shows the concept's page for 403s too.

The page's canonical and `og:url` are `https://mousabatarseh.com/sapienceai`, as specified. Apache serves the folder at `/sapienceai/` and redirects the slashless form there. On a noindex page that one redirect has no effect.

This was tested on a local Apache 2.4 set up like the host: a WordPress-style root `.htaccess`, a neighbouring app folder, and this folder.

## Check after upload

From a terminal:

```
curl -sI http://mousabatarseh.com/sapienceai/          # 301 → https://mousabatarseh.com/sapienceai/
curl -sI https://www.mousabatarseh.com/sapienceai/     # 301 → https://mousabatarseh.com/sapienceai/
curl -sIL --max-redirs 3 https://mousabatarseh.com/sapienceai   # ends in 200, no redirect loop
curl -sI https://mousabatarseh.com/sapienceai/notes    # 200
curl -sI https://mousabatarseh.com/sapienceai/nope     # 404 (the concept's page)
```

If the third check loops, the host terminates TLS without telling Apache: delete the three lines under "https, no www" in `sapienceai/.htaccess`.

In a browser:

- https://mousabatarseh.com/sapienceai loads the title page. Without the slash it should redirect to `/sapienceai/`.
- https://mousabatarseh.com/sapienceai/notes loads the notes page.
- https://mousabatarseh.com/sapienceai/does-not-exist shows the concept's 404, not WordPress.
- https://mousabatarseh.com/ and the other folders look exactly as before.
- Fonts and styles load, the footer shows "Independent design concept by Mousa Batarseh. Not an official Sapience AI website.", and there are no console errors.

## The Vercel mirror

`vercel.json` builds the same files under `/sapienceai/` on `sapience-concept.vercel.app` (the root redirects there). It is for staging only; the production page does not depend on it.
