# Personal Lab Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the selected personal-lab design consistently to the homepage and public internal pages.

**Architecture:** Shared site navigation, footer and CSS tokens surround existing Next.js routes. Reuse existing content and preserve demo/data behavior; add scoped page classes for responsive layouts rather than a new UI framework.

**Tech Stack:** Existing Next.js 15, React 19, TypeScript, Tailwind, Cloudflare Pages.

**Spec:** docs/superpowers/specs/2026-11-03-personal-lab-design.md

## Global Constraints

- Warm ivory, dark ink, deep teal, restrained terracotta; serif headings and readable sans-serif text.
- No new packages, accounts, backend changes, hosting migration, private map links or geometry.
- Preserve existing source content and demo functionality; distinguish earlier web demo from current research.
- Original dirty checkout remains intact; implement in /Volumes/SunilSProjects/repos/github/sunilsarolkar.in-theme on codex/personal-lab-theme.
- Native implementation in this session is a routine execution choice for this cohesive visual update; no additional implementation-choice approval is needed.

## Review Focus

- Narrow screens: wrapped navigation, readable content, no page overflow; scroll bounded legacy diagrams locally.
- Existing routes: project links, CV and old demo remain reachable under their existing URLs.
- Data-backed demo: retain selectors, plots, playback and API contract; distinguish missing local R2 configuration from a theme regression.
- Content integrity: retain project/CV data, images and links, without adding scientific success claims.
- Shared shell: one navigation, main landmark and footer per page; visible keyboard focus and reduced-motion handling.

### Task 1: Preserve baseline and establish the shared theme

**Files:** app/layout.tsx, app/globals.css, app/header.tsx, app/footer.tsx; new app/SiteNavigation.tsx.
**Interfaces:** global lab CSS tokens/utilities; Header({title, subtitle?, eyebrow?}) and site navigation rendered once from root layout.

- [x] Copy pre-existing website edits/assets into isolated branch; preserve hashes and source snapshot in /tmp/sunilsarolkar-theme-baseline-20261103.
- [x] Record baseline TypeScript/build checks. Commit only necessary existing website content as its own baseline commit, excluding the map Worker and existing lockfile change.
- [x] Implement shared shell, metadata, theme tokens and responsive styles.
- [x] Verify TypeScript and a local rendered page before proceeding.

### Task 2: Home and internal content pages

**Files:** app/page.tsx, app/projects/page.tsx, app/projects/[slug]/ProjectDetailClient.tsx, app/cv/page.tsx, app/about/page.tsx, app/not-found.tsx; new app/LabIllustrations.tsx and app/components/FormattedText.tsx if needed for existing Markdown emphasis.
**Interfaces:** consume Task 1 shell/tokens and existing app/_data JSON; retain route names and external destinations.

- [x] Implement the reviewed homepage, using existing images and source links.
- [x] Restyle project index/details with consistent introductions, tags, images and back links.
- [x] Restyle CV, about and missing-page state without altering career data.
- [x] Render homepage, project index, two project details, CV, about and an unknown route; verify titles, navigation, images and links.

### Task 3: Demo integration and verification

**Files:** app/projects/ISL-IndianSignLanguageTranslation/page.tsx, components/SignLanguageTranslationDiagram.tsx, loadtestvideodata.tsx; shared stylesheet.
**Interfaces:** preserve existing React handlers, state, data/API URLs and canvas/plot colors; change presentation and accessible labels only.

- [x] Replace duplicate fixed navigation with the shared shell; use simple section navigation and unique IDs.
- [x] Restyle surrounding controls/panels and diagram surfaces with theme variables; preserve chart/pose semantic colors.
- [x] Check browser desktop and phone views and exercise navigation, model selector and demo entry points.
- [x] Run TypeScript, Next production build, Cloudflare Pages packaging and existing map authentication tests as applicable. Record pre-existing blockers rather than migrate tooling.
- [x] Run a fresh whole-change review, fix material regressions, and commit cohesive visual changes.
- [ ] Show working local preview; publish only the verified website source set through its existing Cloudflare setup when packaging permits.

## Verification policy

This is a reversible presentation change. Do not add a UI test framework or tests
that mirror class names. Use compiler/build checks, real rendered HTTP responses,
browser inspection and existing behavior tests. Logs and screenshots stay outside
the source checkout. Record task receipts in this plan as the work completes.

## Verification receipts — 3 November 2026

- Baseline TypeScript and Next production build passed before theme changes.
- Final TypeScript and Next/Cloudflare Pages build passed. The old adapter warns
  about the generic dynamic prerender fallback; all six known project paths are
  emitted, and their HTTP responses are checked separately.
- Ten content routes returned 200, with one title/main/footer, unique IDs and all
  referenced local assets available. Unknown route returned 404; /api/hello 200.
- Browser inspection: desktop project index/detail; 400px CV and historical demo.
  OpenPose to BlazePose selector change succeeded.
- Separate map authentication regression suite: 14 passed, zero failures.
- All 59 original source/asset hashes match the preserved baseline.
- Existing local dependency lock copied byte-identically from original checkout
  (SHA-256 0d5367f1fa1104fc18bbeff947ea4b85fa2f343baa4d4ea640b1b13ba312ea1b).
  Clean npm ci passed; package.json is unchanged. The initial build's older HEAD
  lock pruned a native workerd package from linked dependencies; isolated native
  dependencies now work, and the original checkout runtime was repaired/verified.
- Original npm dev uses Turbopack, which cannot follow the temporary cross-root
  dependency symlink. The webpack preview worked; the final checkout now has its
  own dependencies, and no dev-script or framework migration was needed.
- Read-only review by a fresh reviewer: no Critical, Important or Minor findings.
  Review confirmed unchanged authored data and demo handlers/API/playback logic.
- Review scope limits: complete R2 playback and existing modal focus behavior were
  not reimplemented; authored historical claims retained; dependency audit/migration
  deferred. Production route/map checks follow publication.
- Before publication: live /api/listCategories already returns 500; /api/getTestData
  returns 200. Map sign-in returns 200, direct map HTML returns 401. Keep those
  pre-existing backend limitations distinct from theme verification.
