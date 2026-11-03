# Site-wide design refinement

Request: revisit every page while retaining a simple, consistent personal-lab identity.

Keep the approved ivory, teal and serif design. Improve readable type, restrained
page spacing, direct navigation, complete project artwork, and CV scanning.
Keep all CV data, credentials, project records, existing destinations and assets.
The private map and server configuration are outside this visual refinement.

- [x] Audit the shared shell and all page templates.
- [x] Refine shared type, navigation, spacing, project cards and reading widths.
- [x] Add CV section links, readable competency lists and larger badge figures.
- [x] Put project explanation before supporting imagery and avoid empty sidebars.
- [x] Bring the photo-study route into the shared layout.
- [x] Give unavailable demo views clear, quiet messages; preserve API contracts.
- [x] Verify build, TypeScript and data/asset preservation.
- [x] Review real pages at desktop and phone widths; resolve observed defects.
- [ ] Publish to the existing Cloudflare Pages project and verify public routes,
      credentials, assets and protected-map access without exposing private data.

Validation receipts will be added after execution. No dependencies are added.

## Verification before publication

- Production Pages build passed: `/tmp/sunilsarolkar-refinement-publish-build.log`.
  TypeScript passed independently and during the final production build.
- Local HTTP checks passed for 11 content routes plus two missing routes (404).
  Known project routes have one main, H1, title and footer. The unknown-project
  route uses Next's existing client-rendered fallback locally; its themed 404
  was confirmed in Chrome. The adapter's dynamic fallback warning is unchanged.
- All 118 CV string values, four badge image hashes and captions, 17 image paths,
  section anchors and research disclosures passed rendered-content checks.
  Receipt: `/tmp/sunilsarolkar-refinement-local-verification.json`.
- All data, public assets, API handlers, map source, package and lockfile are
  unchanged relative to `b3b6850c463974248c27b524b7122286a578c121`.
- Chrome visual checks covered desktop (1280px), phones (400px and 320px),
  homepage, project grid/details, CV and badges, about, photo study, demo and 404.
  Fixed narrow schema clipping, Tailwind's base line-height override, short-page
  background gaps, muted about headings and the empty video-list border.
  Model selection and visible focus were checked; full video playback remains
  blocked by the pre-existing catalogue endpoint failure.
- Two independent read-only source reviews found no material regressions.
- Targeted ESLint has 11 existing demo errors (ten explicit-any and one unused
  index), exactly matching HEAD's rule/message multiset, plus image warnings.
  This refinement does not claim a clean repository lint run.
- `git diff --check` passed. No dependency, framework or backend changes.

## Live verification

Pending publication to the existing production Pages project.
