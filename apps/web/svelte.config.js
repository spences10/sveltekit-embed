import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import autolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import slugPlugin from 'rehype-slug';

const config = {
	preprocess: [
		vitePreprocess({}),
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			rehypePlugins: [
				slugPlugin,
				[
					autolinkHeadings,
					{
						behavior: 'wrap',
					},
				],
				[
					rehypeExternalLinks,
					{ target: '_blank', rel: 'noopener noreferrer' },
				],
			],
		}),
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md'],
};

export default config;
