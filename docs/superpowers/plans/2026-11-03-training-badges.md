# Retain earlier earned training credentials on the CV

The user requests that the earlier training and earned badges be displayed on
the refreshed CV. This supplements the latest PDF rather than treating its
omissions as instructions to remove earlier credentials.

- [x] Reuse all four existing Deutsche Bank badge names and local images from
  app/_data/badges.json in a compact “Training & earned badges” section.
- [x] Restore the Google Cloud Professional Data Engineer certification (2024)
  from the earlier CV data in commit 073c7ba, without adding validity dates.
- [x] Retain every existing latest-CV data value and the established theme.
- [x] Verify TypeScript, production Pages build and asset presence.
- [x] Check the rendered section at desktop and phone widths.
- [ ] Publish and verify the live credentials, badge images and private map gate.

Badge credentials are presented as internal Deutsche Bank professional development;
the Google Cloud certification remains in education/certifications. No new
achievement dates, grade claims, third-party embed scripts or dependencies.

Verification: all latest CV data remains identical after excluding the restored
certificate. Four original badge files exist and rendered with their names.
Desktop row and 400px two-column layout visually verified. Build logs are in
/tmp/sunilsarolkar-badges-build.log and /tmp/sunilsarolkar-badges-tsc.log.
