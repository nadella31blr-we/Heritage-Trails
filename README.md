# Heritage-Trails

Mobile-friendly heritage walk website for Bhubaneswar (Project 10, Group 1 / Team 3).
Product goal: mapped trails, site stories, visitor tips and feedback for at least two self-guided walks.

## Run it
Open `index.html` in a browser. No build step and no server needed.

## Design
App-style layout: searchable site cards with type filters, walk cards, a full-width photo on each site page, quick-fact chips, a visit info list, an Open in Google Maps button and a trail progress bar with a Next stop button.

## Files
- `data/sites.js`: site data from the team research sheet (hours, entry, photography, dress code, trail, photo link). Add `story`, `imageCredit` per site as content is ready.
- `site.html`: the reusable site page template (APDG3-28), one site per `?site=<id>`. Add `&trail=<trail-id>` to follow a walk, or `?check=1` to see missing content.
- `assets/img/`: placeholder illustrations, used if a photo link fails to load.

## Photos
Photo links come from the research sheet. Record each photo's credit and licence in `imageCredit` before publishing (US05 criteria).

## Sprint 1 progress
- Mon 16 to Tue 17 Nov (APDG3-28): reusable site page template with photo, story, hours, entry rules and previous/next links, redesigned with an app-style layout.
