# Colibri Starter: Deploy

Static multi-lang landing page, built with [Astro](https://astro.build).

Live (GitHub Pages project site): [https://opencolibri.github.io/starter/](https://opencolibri.github.io/starter/)

## Prerequisites

- Node.js 22.12+ (required by Astro)

## Commands

```bash
npm install     # install dependencies
npm run dev     # http://localhost:4321/starter/
npm run build   # output to dist/
npm run preview # http://localhost:4321/starter/ after build
```

`astro.config.mjs` defaults to `SITE_URL=https://opencolibri.github.io` and `ASTRO_BASE=/starter/`, so local and CI builds need no extra variables. The dev server serves the site at http://localhost:4321/starter/.

## Editing content

| What | Where |
|------|--------|
| Copy and locale metadata | `src/i18n/<code>.json` |
| Layout / sections | `src/components/Landing.astro` |
| Styles | `src/styles/global.css` |
| Fonts, `<head>` | `src/layouts/Layout.astro` |
| Locale discovery and language switcher | `src/i18n/locales.ts` + `src/components/LangSwitcher.astro` |

To add a language, create `src/i18n/<code>.json` with its `locale` metadata (`label`, `hreflang`, and browser-language `match` prefixes) and translated copy. The build discovers the file and generates `/<code>/`; no shared registry or page file needs to be edited.

The root `/` page redirects to the visitor's browser language (English by default).

## GitHub Pages

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site, builds the documentation
website of [`docs-site/`](docs-site/README.md) (Astro Starlight, with the pages of the `docs/` folder of the
[monorepo](https://github.com/opencolibri/colibri-starter)) with the `/starter/docs/` base, copies it to
`dist/docs/` and deploys `dist/` with `actions/deploy-pages`. The documentation is therefore served at
[https://opencolibri.github.io/starter/docs/](https://opencolibri.github.io/starter/docs/): never add a
`docs` page or folder to this site.

It deploys on every push to `main`, on the `docs-updated` repository dispatch (sent by the monorepo when its `docs/`
change on `main`) and manually via *Run workflow*. On pull requests, it only builds both sites, so a broken
documentation link fails the check.

In the repository settings, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**. With "Deploy from a branch", GitHub also runs its default Jekyll build on the raw sources, which fails on the `.astro` files.

The repository is not named `opencolibri.github.io`, so GitHub Pages serves it as a project site, under the `/starter/` sub-path. There is no `public/CNAME`.

### Custom domain (later)

To serve the site from a custom domain at the root:

1. Create `public/CNAME` with the domain name
2. Change the `site` default in `astro.config.mjs` to the new URL and the `base` default to `/` (or set `SITE_URL` and `ASTRO_BASE` in the workflow), so canonical and `hreflang` links are correct
3. Configure DNS and the custom domain in GitHub Pages settings
