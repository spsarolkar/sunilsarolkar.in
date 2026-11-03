# Personal lab homepage — 3 November 2026

Status: proposed; awaiting review of the browser mockup and this short design.

## Intent

Sunil chose a personal lab: lead with experiments, projects and interests, and
link to the professional profile at https://spsarolkar.github.io/.
The homepage should feel thoughtful, approachable and personal. It should help
another curious builder find something to explore or get in touch.

## Approaches considered

- Personal lab: experiments and personal interests come first; career history
  lives behind the professional-profile link. Sunil selected this approach.
- Balanced portfolio: a career introduction followed by experiments. This gives
  more immediate employment context but duplicates the existing professional site.

## Proposed homepage

1. Simple navigation: Sunil Sarolkar / Experiments / Projects / Outside the lab /
   Professional profile. Navigation wraps or adapts on narrow screens.
2. Introduction: “Following curiosity. Building along the way.” Supporting copy:
   “I'm Sunil, a software engineer in Pune. This is where I explore machine
   learning, build useful things, and follow the occasional trail into the hills.”
   Primary link scrolls to experiments; secondary link opens the professional site.
3. Featured experiment: “Can an iPad learn to recognise signs?” Describe the
   on-device Indian Sign Language project with Swift, Vision and MLX. Introduce
   connectome-inspired motion learning as a research question. State that the
   motion experiments have not yet established robust recognition. Link to the
   project source and label the existing web demo as an earlier OpenPose/LSTM demo.
   A simple illustration explains the pipeline; it is labeled conceptual.
4. Selected projects: StructFormer and Raspberry Pi vehicle telemetry, using
   existing descriptions and valid existing detail links. Status wording says
   project or exploration unless source evidence establishes something stronger.
5. Small tools: direct links to the existing GCP ML mock exam, Rouge theme preview,
   and Findbugs resource-tracking plugin. Short descriptions, no invented usage
   figures, dates, endorsements or claims about production deployment.
6. Outside the lab: existing Kuari Pass trekking photograph plus a few lines on
   trekking, reading, swimming and an interest in astrophysics. This supplies the
   casual touch without a continuously moving filmstrip.
7. Contact: email, GitHub and professional profile; compact footer.

## Visual proposal (builder's choice, subject to review)

Warm ivory background, dark ink text, deep teal for the featured experiment and
restrained terracotta accents. Editorial serif headings with a readable system
sans-serif body and small monospace labels. Generous space, thin rules, restrained
corners. The feature is visually distinct from the project list. Existing personal
photography supplies the human element. No new image service or dependency.

The mockup is a disposable HTML concept outside the website checkout. Its local
path and session URL are review artifacts, not production pages. Approval covers
the homepage direction, content and layout; implementation still uses Next.js.

## Scope and constraints

Retain the existing Next.js 15 / React 19 / Tailwind / Cloudflare Pages setup.
Use scoped homepage styling and replace the generated title and description.
Keep existing project, CV and API routes working, and keep their local changes.
Do not change the professional GitHub Pages site or deploy unrelated edits.
The separate password-protected map Worker and its routes stay protected.
Do not include private plot geometry or link the private map from the homepage.
No new accounts, CMS, database, packages or hosting migration.

The checkout has pre-existing edits in app/page.tsx, app/layout.tsx, app/Badges.tsx,
app/projects/page.tsx and package-lock.json, and untracked project data/detail/CV
and asset files. Capture a baseline before implementation and integrate narrowly.
Only commit this design at the design stage. Publication must package an explicitly
reviewed source set rather than blindly deploying the dirty checkout.

## Content evidence

- Existing website app/_data/projects.json, current app/page.tsx and public assets:
  project identities, links, interests and trekking photography.
- SignLanguageTranslate/docs/status.md, read on 3 November 2026: ongoing iPad
  project and negative/inconclusive motion results. No established connectome
  advantage, robust sign-recognition accuracy or physical neuromorphic result.
- Existing cloudflare/khodad-map/README.md and earlier map chat: route isolation.

## Acceptance and verification

Homepage has an obvious experiment entry point and professional-profile link;
content matches the reviewed copy and uses valid destinations. It works at phone,
tablet and desktop sizes with no horizontal overflow. Keyboard focus is visible,
links have descriptive names, images have alt text, and reduced-motion preferences
are respected. Build and TypeScript checks pass or existing blockers are reported
with evidence. Verify the homepage, selected existing project/API routes and the
private map's unauthenticated gate after a Cloudflare preview/deployment.

## Left to implementation

Exact spacing, type scale, responsive breakpoints and asset cropping may be
settled by the builder within the approved direction. Preview in the browser
before publishing. Record meaningful existing build/deployment blockers rather
than expanding into a dependency or hosting migration without discussion.
