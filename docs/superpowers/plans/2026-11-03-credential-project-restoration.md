# Credential and project-detail restoration plan

Goal: restore verified GCP badge artwork/links and four complete project stories
within the already-approved personal-lab design.

- [x] Audit missing badge and original project sources, links and images.
- [x] Verify issuer ownership, dates and artwork directly; keep existing CV data.
- [x] Prepare typed project stories, examples and conceptual diagram steps.
- [x] Render restored content with shared styles, responsive diagrams and media.
- [x] Enrich the two existing verified GCP education entries; retain four DB
      badges and the Professional Data Engineer CV entry.
- [x] Restore the supplied Deutsche Bank AI Engineer image as the fifth training
      badge; preserve the original file hash and all four prior records.
- [x] Independently review source claims, credential records and rendering.
- [x] Build/TypeScript, existing arithmetic tests and whitespace checks.
- [x] Inspect real pages at desktop/phone sizes, anchors, code regions and images.
- [ ] Commit, publish through the existing Pages workflow and verify live routes,
      CV values, original badges, credential/image hashes and existing protections.

No new behavior requires a new test suite: use meaningful rendered-content,
source-preservation, media and responsive checks for these static changes.


## Production-route regression found during verification

The generic project's generateStaticParams included both literal project pages.
In the production build this overwrote their HTML with generic summaries. The
dedicated pages and data are unchanged; generic static generation now excludes
those two exact slugs. Two post-build tests first failed with srcRoute equal to
/projects/[slug], then passed after rebuilding. Both Cloudflare HTML artifacts
were independently compared with the corrected Next output.

Pre-publish checks on 3 November 2026: Pages build/TypeScript pass; all 10 Node
tests pass; whitespace check passes. Local HTTP checks cover 11 public pages,
two missing routes, all 118 existing CV strings, five training badges, two GCP
credential records and their image hashes, four restored stories and examples,
27 image paths, seven unchanged protected files and the intentionally appended
fifth badge record. The user upload matches SHA256
74f3c3124af5f6d048a9da461297628fda96c9cb86988f87af05d4f8d4a3425d.
All original four badge records are unchanged. Telemetry's original video and
four images, and the exact expression CSV, pass separate checks. Chrome review
covered desktop and 400px layouts, credential dates/links, the five-badge grid,
four project pages, step diagrams, historical images and code overflow. The
sign-language overview loads its recorded counts in the browser after the fix.

Receipts and logs are under /tmp/sunilsarolkar-restoration-*; they are not
committed. Existing Node package-type and old adapter deprecation notices remain.
