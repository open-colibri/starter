import { defineConfig } from 'astro/config';

// Served by GitHub Pages at the root of its custom domain, https://starter.opencolibri.org/.
const site = process.env.SITE_URL ?? 'https://starter.opencolibri.org';
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
  outDir: 'dist',
});
