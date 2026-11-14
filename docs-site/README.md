# Colibri Starter documentation

The website of the [Colibri Starter](https://github.com/opencolibri/colibri-starter) documentation, built with
[Astro Starlight](https://starlight.astro.build): [https://opencolibri.github.io/starter/docs/](https://opencolibri.github.io/starter/docs/).

The pages are **not** in this folder: they live in the `docs/` folder of the
[opencolibri/colibri-starter](https://github.com/opencolibri/colibri-starter/tree/main/docs) monorepo, next to the
code they describe, and read on GitHub too. Open documentation issues and pull requests there.

## Prerequisites

- Node.js 22.12+
- The monorepo cloned next to this repository (`../../colibri-starter` from this folder), or `DOCS_DIR` pointing to its
  `docs/` folder

## Commands

```bash
npm install     # install dependencies
npm run dev     # http://localhost:4321/starter/docs/, follows the changes of the monorepo docs/
npm run build   # output to dist/
npm run preview # http://localhost:4321/starter/docs/ after build
```

## How it works

| What | Where |
|------|-------|
| Pages | `docs/` of the monorepo |
| Sidebar | `starlight.sidebar` in `astro.config.mjs` |
| Styles | `src/styles/docs.css` (palette of the [landing](https://opencolibri.github.io/starter/)) |
| Copy of the pages | `src/integrations/monorepo-docs.mjs` |
| Links rewriting | `src/integrations/rehype-docs-links.mjs` |

On `dev` and `build`, `src/integrations/monorepo-docs.mjs` copies the monorepo pages to `src/content/docs/`
(git-ignored) and adds an `editUrl` pointing back to the monorepo to each page; in dev, it follows the changes. The
images are also copied to `public/images/` for the raw HTML `<img>` tags.

`src/integrations/rehype-docs-links.mjs` turns the relative GitHub links (`../commands/themes.md#anchor`) into site URLs
(`/starter/docs/commands/themes/#anchor`), and `starlight-links-validator` fails the build on a broken link.
`starlight-llms-txt` publishes `llms.txt`, `llms-full.txt` and `llms-small.txt` for AI agents.

A new folder of the monorepo `docs/` needs a sidebar group in `astro.config.mjs`. The order of the pages in a group
comes from their `sidebar.order` frontmatter.

## Deployment

This folder is not deployed on its own: the deployment workflow of the website
([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)) builds it with the `/starter/docs/` base, with the
pages of the `docs/` folder of the monorepo, and copies its `dist/` to the `docs/` folder of the website. See
[`DEPLOY.md`](../DEPLOY.md).

## License

[MIT](../LICENSE)
