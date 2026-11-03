# Project media and data exploration implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Restore telemetry media and make the ISL count snapshot understandable and explorable.
**Architecture:** A dedicated server-rendered telemetry page uses existing media. A client-side ISL explorer consumes the unchanged CSV through pure typed aggregation and query functions, with HTML/SVG views and no new dependency.
**Tech stack:** Existing Next.js 15, React 19, TypeScript, D3 CSV parsing, Cloudflare Pages.
**Spec:** `docs/superpowers/specs/2026-11-03-project-media-data-design.md`; user approved overview + explorer on 3 November 2026.

## Global constraints

- Preserve the approved simple theme, data, CV, badges, API and protected map.
- Missing split rows stay distinct from explicit zero counts.
- Keep recorded split sum separate from declared total; disclose inconsistencies.
- Label the 167-expression snapshot separately from the documented full corpus.
- No new dependencies, hosting migration, model results or dataset corrections.

## Review focus

- Sparse and zero-valued records: present missing text, never silently zero-fill.
- Inconsistent or partial totals: flag discrepancies without assuming split disjointness.
- Search/filter/sort/page transitions: maintain predictable results and reset/clamp pages.
- Narrow screens and keyboard use: readable counts, labels, controls and focus without hover.
- External video availability: responsive embed, original direct link and source artwork fallback.

### Task 1: Restore telemetry page (independent)

Create `app/projects/vehicle-telemetry/page.tsx` and scoped `telemetry.css`.
Use exact historical video X3aA26rKwIs, source repository Tesla, retained architecture
PNG and screenshots. Add demo, architecture and dashboard sections; clearly mark
implemented versus planned. Keep every media asset unchanged. The original media
omission is reproduced in current source; verify restored rendered media and links.

- [x] Restore media and explanations within shared layout.
- [x] Check desktop/phone page, embed/fallback, architecture, source and image responses.

### Task 2: Typed snapshot model and meaningful arithmetic tests

Create `expressionData.ts` alongside chart components and `tests/expression-data.test.mjs`.
Expose `buildExpressionDataset(rows)`, `queryExpressions(dataset.expressions, options)`
and `paginateExpressions(rows, page, pageSize)` with typed row/query/result contracts.
Dataset includes split totals/coverage, declared total, per-expression split values,
sum, missing flags, discrepancy and count-distribution bins. Reject invalid count,
unknown split, duplicate pair and blank expression inputs with a readable error.
Queries support name search, all/missing/inconsistent/low-training filters, a user-set
threshold, name/count sorting and direction; pagination clamps out-of-range pages.

- [x] Write and run tests first for known fixture totals, missing-vs-zero,
      reconciliation, input validation, query behavior and pagination.
- [x] Implement pure helpers; pass tests against fixtures and real CSV (167 expressions,
      1,293/412/336 split counts, 1,986 declared total, 23 mismatches, 45 missing rows).

### Task 3: Replace chart wall with approved explorer

Rewrite `ExpressionsPlot.tsx`; add scoped `expression-explorer.css`. Keep the page
anchor and unchanged CSV URL. Add a snapshot notice, recorded count overview, split
coverage, training-count distribution, searchable/sortable/filterable paginated
expression rows, bars/bubbles toggle and a native details section for totals/audit.
Use 12 expressions per page, one shared raw-count scale and visible exact counts.
Show loading, source errors, no matches and a clear reset. Retain obsolete chart
files unless removal is necessary. Add a short explanation of further analysis
and data required; do not imply the single pose demo describes the whole dataset.

- [x] Implement overview, explorer, integrity disclosure and source download.
- [x] Verify keyboard controls, modes, search, filters, sorting, page boundaries,
      loading/error behavior and responsive layouts in actual React.

### Task 4: Validate and publish

- [x] Run meaningful helper tests, TypeScript and production Pages build.
- [x] Independent review of math, state transitions, content and regressions.
- [x] Browser checks at desktop and phone widths; correct observed failures.
- [x] Commit scoped changes; deploy using documented existing Pages workflow.
- [x] Verify all public routes, 118 CV values, four badge hashes, restored media,
      unchanged CSV, existing API statuses and protected map gate; record receipts.

## Execution evidence

- Media root cause: the earlier generic project template omitted the historical
  dedicated page. Restored original video X3aA26rKwIs and architecture recovered
  from commit 54dc5320a03f600fbe3a36cd16703ce767c3fe5e. Original assets remain intact.
- Chart root cause: split records created duplicate bubble groups, and missing
  rows were substituted with zero. Replaced this rendering with one expression
  record, shared raw-count scale, exact labels and explicit missing values.
- Model tests were written first and failed because the model was absent:
  `/tmp/sunilsarolkar-explorer-tests-red.log`. After implementation, all 8 pass:
  `node --test tests/expression-data.test.mjs`; log
  `/tmp/sunilsarolkar-project-media-tests.log`. Node 24 reports its module-type
  detection warning; the package configuration was not changed to silence it.
- Standalone TypeScript and final Pages production build pass. Final build log:
  `/tmp/sunilsarolkar-project-media-final-build.log`. Existing adapter dynamic
  fallback warnings remain; no dependency/framework migration was performed.
- Fresh independent review found no actionable current-snapshot defect. Its
  optional absent-declared-total clarification was applied, together with
  singular result wording. No data, asset, API, CV, badge or package changes.
- Actual Chrome checks: responsive telemetry player, playback advanced to 0:12
  of 1:34 and was paused; full original diagram, fallback link and screenshots.
  Explorer overview, coverage, distribution, bars/bubbles, Hello exact counts
  14/5/6 and total discrepancy 25 vs21, Today missing rows, empty results,
  pagination, missing-row filter, sort and keyboard threshold input all checked.
  Phone viewport 400px and full desktop rendering inspected.
- A local-only fault proxy injected one CSV 503. The explorer displayed its
  error/fallback state; clicking Try again recovered the complete overview.
  Receipt: `/tmp/sunilsarolkar-explorer-recovery.log`. No production test hook.
- Local media check confirms original embed/source URLs, four image hashes and
  unchanged CSV: `/tmp/sunilsarolkar-project-media-local.json`.
- Regression check passes 11 content routes, two missing routes, all 118 CV
  values, four badges and 21 image paths:
  `/tmp/sunilsarolkar-project-media-regression-local.json`.
- `git diff --check` and protected-path comparisons against 0b4bdc9 pass.

## Publication

Published source `1eb19e67a14bf3371952a243f9b0ba350b7521e6` to the existing
Cloudflare Pages production project with the documented Wrangler 3.99.0 workflow,
retaining dashboard bindings and the separate protected map Worker.

- Deployment: https://ddb5cca4.profile-sunilsarolkar-in.pages.dev
- Telemetry: https://sunilsarolkar.in/projects/vehicle-telemetry
- Explorer: https://sunilsarolkar.in/projects/ISL-IndianSignLanguageTranslation#visuals
- Production regression passes 11 public content routes, two styled missing
  routes, 118 CV values, four badge hashes and 21 public image paths.
- Restored original video embed, direct fallback, full-size diagram/source links
  and four media hashes pass on the live domain. The CSV matches source exactly.
- Actual production telemetry player and loaded explorer inspected in Chrome;
  counts 167 / 2,041 / 128 and the discrepancy notice render correctly.
- `/api/hello` and `/api/getTestData` remain 200. The existing catalogue endpoint
  remains 500; this task does not repair that backend. The map landing retains
  its password gate and direct map HTML remains 401.
- Receipts: `/tmp/sunilsarolkar-project-media-regression-production.json`,
  `/tmp/sunilsarolkar-project-media-production.json`, and
  `/tmp/sunilsarolkar-project-media-deploy.log`.

No dependencies, datasets, private data, CV credentials, existing API handlers or
hosting configuration were changed. Source is committed on the retained isolated
`codex/personal-lab-theme` branch; the original dirty checkout remains untouched.
