import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://opencolibri.github.io';
// Served as a GitHub Pages project site at
// https://opencolibri.github.io/starter/.
// Set ASTRO_BASE=/ when the site moves to a custom domain or an organization site.
const base = process.env.ASTRO_BASE ?? '/starter/';

export default defineConfig({
  site,
  base,
  outDir: 'dist',
});
