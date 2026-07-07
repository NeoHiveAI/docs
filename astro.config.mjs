// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTelescope from 'starlight-telescope';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightContextualMenu from 'starlight-contextual-menu';

// https://astro.build/config
export default defineConfig({
	// Public URL of the deployed site. Used for sitemap + canonical URLs.
	// Custom domain (see public/CNAME) means the site is served at the root.
	// If you instead deploy to the project page https://neohiveai.github.io/docs,
	// set `site: 'https://neohiveai.github.io'` and add `base: '/docs'`.
	site: 'https://docs.neohive.ai',
	integrations: [
		starlight({
			title: 'NeoHive',
			// Matches the NeoHive dashboard's top-left brand mark (the three-hexagon
			// "hive" icon). Title text is kept alongside the icon, as in the app.
			logo: {
				src: './src/assets/neohive-logo.svg',
			},
			// NeoHive design language (see src/styles/neohive.css).
			customCss: ['./src/styles/neohive.css'],
			// Match the dashboard's typefaces: Instrument Sans + IBM Plex Mono.
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
					},
				},
				// Click-to-expand for videos (see public/js/video-zoom.js + the
				// .neo-zoom-* rules in src/styles/neohive.css).
				{ tag: 'script', attrs: { src: '/js/video-zoom.js', defer: true } },
			],
			// Code blocks on the elevated card surface with the app's radius.
			expressiveCode: {
				styleOverrides: {
					borderRadius: '0.625rem',
					borderColor: 'var(--sl-color-hairline)',
					codeBackground: 'var(--sl-color-gray-6)',
				},
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/NeoHiveAI' }],
			plugins: [
				// Ctrl+/ fuzzy-search command palette (complements Starlight's Cmd+K).
				starlightTelescope(),
				// Per-page "Copy / View as Markdown / Open in ChatGPT/Claude" actions (great for LLMs).
				starlightContextualMenu({ actions: ['copy', 'view', 'chatgpt', 'claude'] }),
				// Generates /llms.txt, /llms-full.txt, /llms-small.txt for LLMs.
				starlightLlmsTxt({
					projectName: 'NeoHive',
					description:
						'NeoHive is a local semantic-memory server that connects coding agents (Claude Code, Cursor, Codex, and any MCP client) to your team’s codebase and knowledge over the Model Context Protocol.',
				}),
			],
			// Mirrors the previous GitBook SUMMARY.md table of contents.
			sidebar: [
				{ label: 'Welcome', link: '/' },
				{ label: 'Getting Started', slug: 'getting-started' },
				{ label: 'Core Concepts', slug: 'concepts' },
				{ label: 'Using NeoHive', slug: 'usage' },
				{ label: 'Getting the Most', slug: 'getting-the-most' },
				{ label: 'Migrating away from Markdown', slug: 'migration' },
				{ label: 'Indexing Your Codebase', slug: 'codebase' },
				{ label: 'Reference', slug: 'reference' },
				{
					label: 'Configuration',
					items: [
						{ label: 'Licensing', slug: 'config/licensing' },
						{ label: 'Updating', slug: 'config/updating' },
						{ label: 'GPU vs CPU', slug: 'config/gpu' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: "Agent Can't Connect", slug: 'troubleshooting/connection' },
						{ label: "Recall Isn't Finding What I Need", slug: 'troubleshooting/recall' },
						{ label: 'Repository Sync Issues', slug: 'troubleshooting/sync' },
						{ label: 'Uninstalling', slug: 'troubleshooting/uninstalling' },
					],
				},
			],
		}),
	],
});
