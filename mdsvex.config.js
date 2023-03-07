import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool',
	},

	remarkPlugins: [],
	rehypePlugins: [
		slugPlugin,
		[
			autolinkHeadings,
			{
				behavior: 'wrap',
			},
		],
	],
})

export default config
