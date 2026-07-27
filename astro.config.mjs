// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://decisionnerd.github.io',
	base: '/dev-skills',
	outDir: 'site',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'DecisionNerd Skills',
			favicon: '/favicon.svg',
			description:
				'Personal agent skills for Cursor, Claude Code, Codex, and other agents compatible with npx skills.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/DecisionNerd/dev-skills',
				},
			],
			sidebar: [
				{
					label: 'Start',
					items: [
						{ label: 'Overview', slug: 'index' },
						{ label: 'Install', slug: 'install' },
						{ label: 'Authoring', slug: 'authoring' },
					],
				},
				{
					label: "The 'This is Fine' Guide",
					items: [
						{ label: 'Handbook home', slug: 'handbook' },
						{
							label: 'Project paths',
							items: [{ autogenerate: { directory: 'handbook/paths' } }],
						},
						{ label: 'Why it works', slug: 'handbook/why-it-works' },
						{
							label: 'Orientation',
							items: [{ autogenerate: { directory: 'handbook/orientation' } }],
						},
						{
							label: 'Concepts',
							items: [{ autogenerate: { directory: 'handbook/concepts' } }],
						},
						{
							label: 'Strategies',
							items: [{ autogenerate: { directory: 'handbook/strategies' } }],
						},
						{
							label: 'Practices',
							items: [{ autogenerate: { directory: 'handbook/practices' } }],
						},
						{ label: 'Continue learning', slug: 'handbook/continue-learning' },
					],
				},
				{
					label: 'GitHub & Code Review',
					items: [{ autogenerate: { directory: 'skills/github' } }],
				},
				{
					label: 'Craft',
					items: [{ autogenerate: { directory: 'skills/craft' } }],
				},
				{
					label: 'Agents',
					items: [{ autogenerate: { directory: 'skills/agents' } }],
				},
				{
					label: 'Ops & Ship',
					items: [{ autogenerate: { directory: 'skills/ops' } }],
				},
			],
		}),
	],
});
