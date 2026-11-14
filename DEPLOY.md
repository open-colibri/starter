# Colibri Starter: Deploy

Static multi-lang landing page, built with [Astro](https://astro.build).

Live (GitHub Pages, custom domain): [https://starter.opencolibri.org/](https://starter.opencolibri.org/)

## Prerequisites

- Node.js 22.12+ (required by Astro)

## Commands

```bash
npm install     # install dependencies
npm run dev     # http://localhost:4321/
npm run build   # output to dist/
npm run preview # http://localhost:4321/ after build
```

`astro.config.mjs` defaults to `SITE_URL=https://starter.opencolibri.org` and `ASTRO_BASE=/`, so local and CI builds need no extra variables. The dev server serves the site at http://localhost:4321/.

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
[monorepo](https://github.com/opencolibri/colibri-starter)) with the `/docs/` base, copies it to
`dist/docs/` and deploys `dist/` with `actions/deploy-pages`. The documentation is therefore served at
[https://starter.opencolibri.org/docs/](https://starter.opencolibri.org/docs/): never add a
`docs` page or folder to this site.

It deploys on every push to `main`, on the `docs-updated` repository dispatch (sent by the monorepo when its `docs/`
change on `main`) and manually via *Run workflow*. On pull requests, it only builds both sites, so a broken
documentation link fails the check.

In the repository settings, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**. With "Deploy from a branch", GitHub also runs its default Jekyll build on the raw sources, which fails on the `.astro` files.

### Custom domain

The site is served at the root of the `starter.opencolibri.org` custom domain, set in **Settings → Pages → Custom
domain** (with **Enforce HTTPS**). A deployment through `actions/deploy-pages` ignores any `public/CNAME` file, so the
domain lives in that setting only. The DNS zone of `opencolibri.org` points `starter` (`CNAME`) to
`opencolibri.github.io.`, and the domain is verified in the organization settings (**Settings → Pages**), so no other
account can claim it.

GitHub redirects the former project site URLs (`https://opencolibri.github.io/starter/…`) to the custom domain, path
included.
