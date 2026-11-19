# Heritage-Trails

Mobile-friendly heritage walk website for Bhubaneswar (Project 10, Group 1 / Team 3).
Product goal: mapped trails, site stories, visitor tips and feedback for at least two self-guided walks.

## Run it
Open `index.html` (the sign-in page) in a browser. No build step and no server needed.

## Sign-in (demo)
First page is the Heritage Trails sign-in: mobile number, 6-digit code, profile name (new users) and a short intro. By default it is a front-end demo: no SMS is sent and the code is shown on screen. To send real SMS, put your Firebase web app config in `assets/firebase-config.js` (Phone sign-in enabled, `nadella31blr-we.github.io` added as an authorized domain). The name and session are kept in the browser only.

## Design
App-style layout: searchable site cards with type filters, walk cards, a full-width photo on each site page, quick-fact chips, a visit info list, an Open in Google Maps button and a trail progress bar with a Next stop button.

## Files
- `data/sites.js`: site data from the team research sheet (hours, entry, photography, dress code, trail, photo link). Add `story`, `imageCredit` per site as content is ready.
- `home.html`: Explore and Profile tabs after sign-in.
- `assets/auth.js`, `assets/login.js`, `assets/firebase-config.js`: session handling and the sign-in flow.
- `site.html`: the reusable site page template (APDG3-28), one site per `?site=<id>`. Add `&trail=<trail-id>` to follow a walk, or `?check=1` to see missing content.
- `assets/img/`: placeholder illustrations, used if a photo link fails to load.

## Banners (US05)
Style guide from the team: forest green #223B30, sandstone #B58443, warm ivory #F6F1E5, ink #232722. Each site page shows a banner with an uppercase eyebrow, bold title and one description line. Banner files are WebP in `assets/img/banners/` (about 40 to 57 KB each). Alt text and credits are in `data/sites.js`. Brahmeswar and Bindu Sagar banners are saved but have no site data yet.

## Photos
Photo links come from the research sheet. Record each photo's credit and licence in `imageCredit` before publishing (US05 criteria).

## Sprint 1 progress
- Mon 16 to Tue 17 Nov (APDG3-28): reusable site page template with photo, story, hours, entry rules and previous/next links, redesigned with an app-style layout.
