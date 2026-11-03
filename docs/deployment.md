# Personal lab deployment

The site uses the existing Cloudflare Pages project `profile-sunilsarolkar-in`.
Its production branch is named **production**, not main. The private plot map is
a separate Worker and must not be included in a portfolio deployment.

## Verified toolchain

Use the checkout's existing lockfile and local Wrangler **3.99.0**, which matches
the installed `@cloudflare/next-on-pages` 1.13.7 adapter. Wrangler 4, used by the
separate map package, fails to bundle this older adapter's dynamic binary glob.
No framework or dependency migration was performed for this visual update.

Run `npm ci` in the intended checkout, without sharing node_modules through a
symlink with another checkout. This matters for the native workerd binary on
Apple silicon. Then build:

```sh
CI=1 npm run pages:build
```

Inspect the build output and browser preview before publishing. The adapter emits
all known project paths; its generic dynamic fallback warning is pre-existing.
Verify an unknown path returns the styled 404 rather than assuming fallback support.

## Preserve production bindings

The Pages CLI reads dashboard environment settings when no local Wrangler config
is selected. This is deliberate for publication: the existing wrangler.toml does
not declare the server's existing R2 credentials. In Wrangler 3's Pages uploader,
an absent config omits binding metadata and keeps the project's settings.

Publish from a new empty temporary directory, using absolute paths to the
checkout's Wrangler executable and its `.vercel/output/static` directory. Supply
the project, branch and verified Git commit explicitly. Do not copy credentials
into this directory, a command argument, source, or a build log.

For preview, use a nonproduction branch such as `codex-personal-lab-theme`.
For production, use `--branch production`. The required command shape is:

```text
<checkout>/node_modules/.bin/wrangler pages deploy <checkout>/.vercel/output/static
  --project-name profile-sunilsarolkar-in --branch production
  --commit-hash <verified-full-sha> --commit-dirty=false
```

The deployment context must remain outside the checkout so the incomplete local
Wrangler config is not selected. A saved preview deployment does not change the
production site's environment.

## Check after publishing

- Home, projects, all six known project paths, about and CV: HTTP 200, correct
  content, one main/title/footer, working images and shared navigation.
- Inspect the actual React homepage in a browser at desktop and phone widths.
  The homepage class is `.lab-hero`; generic `.hero` collides with DaisyUI.
- About-page primary button retains a visible white label inside prose content.
- Unknown path: styled HTTP 404. `/api/hello`: HTTP 200.
- `/api/getTestData`: HTTP 200 without printing its signed URL.
- `/maps/khodad/`: password form, no map payload. Direct map HTML: HTTP 401.

On 3 November 2026, `/api/listCategories` returned HTTP 500 both before and after
this visual update. Full video playback could not be verified through that
catalogue. This is an existing backend issue, not a new theme feature.

The implementation and verification receipts are in
`docs/superpowers/plans/2026-11-03-personal-lab-theme.md`. The original dirty
checkout was preserved; the refresh lives on `codex/personal-lab-theme`.


## Credential and project restoration, 3 November 2026

Source af71b2b5fae789b1305caaccceb0b764840eafb4 was published at
https://c2055225.profile-sunilsarolkar-in.pages.dev and verified on the custom
domain. The receipt is in
`docs/superpowers/plans/2026-11-03-credential-project-restoration.md`.

After building, run `node --test tests/*.test.mjs`. In addition to the eight data
checks, two tests inspect the actual prerender manifest and HTML. Keep literal
ISL and telemetry paths out of the generic route's generateStaticParams: duplicate
generation overwrote their dedicated output in the production build. Validate the
Cloudflare HTML output as well as the Next preview, then check live content.
