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

**Stack:** Existing Next.js/React, Jekyll/JavaScript, Python/Selenium and GitHub
Actions. No framework, application dependency or hosting migration.

## Tasks

- [x] Trace source, missing displays, scheduled job and current deployments.
- [x] Restore personal homepage preview and full CV gallery with live refresh.
- [x] Restore professional homepage/CV gallery using the same public feed.
- [ ] Repair updater, retain last good records, correct nightly schedule and
      verify GitHub reactivates it after the schedule change.
- [x] Test fresh-feed replacement, malformed/failed feed retention, URL safety,
      duplicate credentials and scraper failure/partial-result preservation.
- [ ] Build and review both sites; publish and check actual live galleries.

Logs and receipts belong under /private/tmp/sunil-credly-*.
