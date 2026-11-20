# Restore automatically updated Credly badges

> Execution: continue the user's delegated design and implementation choices.

**Goal:** Restore the earned Credly collection on both profiles and make future
nightly badge updates visible without rebuilding either site.

**Design:** Keep each site's existing simple theme. A compact homepage preview
links to the complete, visible CV gallery. Cards show badge artwork, title,
issuer and available issue dates, linking to the original credential. Both
galleries start with the saved collection and refresh from the existing public
GitHub JSON output. Failed or malformed requests preserve the saved collection.
The professional updater retains verified certification metadata and existing
records if a scrape is empty or incomplete. Nightly schedule: 02:00 IST.

**Stack:** Existing Next.js/React, Jekyll/JavaScript, Python standard library and GitHub
Actions. No framework, application dependency or hosting migration.

## Tasks

- [x] Trace source, missing displays, scheduled job and current deployments.
- [x] Restore personal homepage preview and full CV gallery with live refresh.
- [x] Restore professional homepage/CV gallery using the same public feed.
- [x] Repair updater, retain last good records, correct nightly schedule and
      verify GitHub reactivates it after the schedule change.
- [x] Test fresh-feed replacement, malformed/failed feed retention, URL safety,
      duplicate credentials and scraper failure/partial-result preservation.
- [x] Build and review both sites; publish and check actual live galleries.

Logs and receipts belong under /private/tmp/sunil-credly-*.

## Verified delivery, 20 November 2026

- Personal deployment source: `4dddaa5b84bbce22d182af9594d6378535db58a8`.
  Production: https://9b477eb9.profile-sunilsarolkar-in.pages.dev and
  https://sunilsarolkar.in/cv#credly-badges. Existing data API still returns200.
- Browser preview check confirmed six homepage cards,20 unique CV credentials,
  working artwork and issuer labels, no unavailable warning, and readable layout
  at desktop and375px. Same artifact was promoted to production.
- Personal production build and16 tests pass, including emitted gallery HTML and
  preservation of dedicated project pages. Professional production build,
 3584 local references across100 HTML files, CSS cache check, five gallery tests
  and pinned PurgeCSS pass. Dependency inputs remain unchanged.
- Both live CVs contain20 visible saved cards; both gallery implementations also
  accept all20 freshly updated records and readable issue-date labels.

The first Selenium refresh did not load Credly's large interactive application.
The final updater uses the public JSON request observed in Credly's own current
application bundle, with Accept:application/json. It verifies complete pagination
before writing and retains prior credentials and verified certification metadata.
Thirteen backend tests pass; independent reviews found no blocking defects.

Successful end-to-end refresh:
https://github.com/spsarolkar/spsarolkar.github.io/actions/runs/44676539596

GitHub workflow161382964 is active, scheduled daily at20:30UTC /02:00IST.
The successful run committed `92f9465` automatically after reading18 public skill
badges and retaining both verified certifications (20 total). Its receipt records
`checked_at:2026-11-20T04:45:49Z`. All20 original credential IDs and the two verified
certification images/dates were checked against the published feed. A small
successful-sync receipt is committed on each successful refresh, including when
the earned-badge collection itself is unchanged.

The original dirty main checkout is preserved. The clean personal-theme checkout
and professional master checkout are updated with the verified restoration. The
existing repository-wide professional Prettier check remains unrelated to this
repair; archived prose and dependency inputs were not reformatted or migrated.
