# Agent guidelines — docs

This folder only builds the documentation website. The pages are in the `docs/` folder of the
opencolibri/colibri-starter monorepo (`../../colibri-starter/docs` by default, or `DOCS_DIR`): edit them there, never in
`src/content/docs/` or `public/images/`, which are copies regenerated on every `dev` and `build`.

The pages must keep reading on GitHub: relative `.md` links and `../images/` paths, a Starlight frontmatter (`title`,
`description`, `sidebar.order`) and no H1 in the body.

Run `npm run build` to check a change: it fails on a broken link. See `README.md`.
