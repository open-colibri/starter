import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import monorepoDocs from './src/integrations/monorepo-docs.mjs';
import rehypeDocsLinks from './src/integrations/rehype-docs-links.mjs';
import { themesSidebar } from './src/integrations/themes-sidebar.mjs';

// Served under the website, at https://starter.opencolibri.org/docs/: the deployment workflow of the
// repository builds this folder with this base and copies dist/ to the docs/ folder of the website.
const site = process.env.SITE_URL ?? 'https://starter.opencolibri.org';
const base = process.env.ASTRO_BASE ?? '/docs/';
// The docs/ folder of the opencolibri/colibri-starter monorepo, checked out next to the repository by default.
const docsDir = process.env.DOCS_DIR ?? '../../colibri-starter/docs';
const repository = 'opencolibri/colibri-starter';

export default defineConfig({
  site,
  base,
  outDir: 'dist',
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeDocsLinks, { contentDir: fileURLToPath(new URL('./src/content/docs/', import.meta.url)), base }],
      ],
    }),
  },
  integrations: [
    monorepoDocs({ source: docsDir, repository }),
    starlight({
      title: 'Colibri Starter',
      logo: { src: './src/assets/logo.png' },
      favicon: '/favicon.ico',
      description: 'Castor packages to build, configure and operate a Sylius application.',
      customCss: ['./src/styles/docs.css'],
      components: { MarkdownContent: './src/components/MarkdownContent.astro' },
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: `${base}favicon.png`, type: 'image/png', sizes: '96x96' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
          },
        },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${repository}` }],
      sidebar: [
        { label: 'Introduction', slug: 'index' },
        { label: 'Getting started', items: [{ autogenerate: { directory: 'getting-started' } }] },
        { label: 'Commands', items: [{ autogenerate: { directory: 'commands' } }] },
        { label: 'Themes', items: themesSidebar(resolve(fileURLToPath(new URL('.', import.meta.url)), docsDir)) },
        { label: 'E-commerce import', items: [{ autogenerate: { directory: 'import' } }] },
        { label: 'Extending', items: [{ autogenerate: { directory: 'extending' } }] },
        { label: 'Storefront slots', items: [{ autogenerate: { directory: 'storefront' } }] },
        { label: 'Contributing', items: [{ autogenerate: { directory: 'contributing' } }] },
        { label: 'Colibri Starter website', link: 'https://starter.opencolibri.org/', attrs: { target: '_blank' } },
      ],
      plugins: [starlightLinksValidator(), starlightLlmsTxt()],
    }),
  ],
});
