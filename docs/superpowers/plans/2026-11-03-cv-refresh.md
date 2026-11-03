# Latest CV content refresh

Source: the user-supplied two-page Sunil_Sarolkar_AI_Solutions_Architect.pdf,
read and visually inspected on 3 November 2026. The request is to update the
website CV from this latest document while retaining the selected lab theme.

- [x] Inspect both PDF pages and compare the existing CV data/template.
- [x] Replace the professional summary, role/dates, competencies, projects and
  education with the document's details, retaining its qualified measurements.
- [x] Group the two Deutsche Bank bullets continuing on PDF page 2 under that role.
- [x] Use the PDF's exact LinkedIn, GitHub and capstone links; do not republish
  the source PDF or introduce the phone number into the public page.
- [x] Validate data coverage against PDF text, TypeScript and production packaging.
- [x] Inspect the real CV page in a browser at desktop and phone widths.
- [x] Publish the verified package using the existing Pages workflow and verify
  the live CV and unchanged private map gate.

Files: app/_data/cv.json, app/cv/page.tsx. The general project list, research
homepage, professional GitHub Pages site and private map are outside this update.
Earlier awards/interests and obsolete employment copy are removed from the CV
because the latest supplied document does not include them. Personal interests
remain on the site's existing home/about pages.

Verification: every employment title/employer/date and description, competency,
project description and education entry was compared with normalized PDF text.
Five roles, seven Deutsche Bank bullets, six competency groups, three projects
and five education/certification entries verified. TypeScript and the Pages
production build passed. Desktop and 400px browser inspection passed, including
the new current role and the ended Deutsche Bank employment. Independent read-only
review found no material omissions or template regressions.

Source PDF SHA-256:
84387eefac6462bc7b2caa29a770e85807c2b1f5f49a4bbea8e650f26f7a9f8e

Published: https://sunilsarolkar.in/cv
Deployment: https://e20c034e.profile-sunilsarolkar-in.pages.dev
Source commit: 17cce342c197cdfbb42bddbb7463432c0ec6728d.
Final verification found all 104 checked source-backed CV values in visible SSR
content, with correct project links and a single title/main/footer. The live CV
was visually inspected. Homepage and API smoke checks passed; private map sign-in
and direct-file denial remain intact. Receipt: /tmp/sunilsarolkar-cv-verification.json.
