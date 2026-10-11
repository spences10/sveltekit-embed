// @ts-nocheck
import { defineMDSveXConfig } from 'mdsvex';
import autolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import slugPlugin from 'rehype-slug';

export default defineMDSveXConfig({
	extensions: ['.md'],
	smartypants: true,
	rehypePlugins: [
		slugPlugin,
		[autolinkHeadings, { behavior: 'wrap' }],
		[
			rehypeExternalLinks,
			{ target: '_blank', rel: 'noopener noreferrer' },
		],
	],
});
