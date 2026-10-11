// @ts-nocheck
import { defineMDSveXConfig } from 'mdsvex';
import autolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import slugPlugin from 'rehype-slug';
import { highlight_code } from './src/lib/markdown/highlighter.ts';

export default defineMDSveXConfig({
	extensions: ['.md'],
	smartypants: true,
	highlight: {
		highlighter: highlight_code,
	},
	remarkPlugins: [code_block_import],
	rehypePlugins: [
		slugPlugin,
		[autolinkHeadings, { behavior: 'wrap' }],
		[
			rehypeExternalLinks,
			{ target: '_blank', rel: 'noopener noreferrer' },
		],
	],
});

function find(node, type, test = () => true) {
	if (node.type === type && test(node)) return node;
	for (const child of node.children ?? []) {
		const found = find(child, type, test);
		if (found) return found;
	}
}

/**
 * The highlighter emits <CodeBlock>, import it into any file with
 * fenced code, reusing the instance script if the file has one
 */
function code_block_import() {
	const code_block_import =
		"import CodeBlock from '#lib/components/code-block.svelte';";
	const instance_script =
		/^\s*<script(?![^>]*\bcontext=)(?![^>]*\bmodule\b)[^>]*>/;

	return function transformer(tree) {
		if (!find(tree, 'code')) return;

		const script = find(tree, 'html', (node) =>
			instance_script.test(node.value),
		);

		if (script) {
			script.value = script.value.replace(
				instance_script,
				(tag) => `${tag}\n\t${code_block_import}`,
			);
		} else {
			tree.children.unshift({
				type: 'html',
				value: `<script>\n\t${code_block_import}\n</script>`,
			});
		}
	};
}
