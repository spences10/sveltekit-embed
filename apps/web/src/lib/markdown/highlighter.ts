import { language as bash } from '@twinkleplop/bash';
import { create_renderer } from '@twinkleplop/markdown-core';
import { language as svelte } from '@twinkleplop/svelte';
import { language as typescript } from '@twinkleplop/typescript';

// Only the grammars the docs fence. Anything else renders as escaped
// plain text in the same block markup
const renderer = create_renderer({
	languages: {
		bash: bash(),
		svelte: svelte(),
		typescript: typescript(),
		// Component examples written as plain markup are still Svelte
		html: 'svelte',
		sh: 'bash',
		shell: 'bash',
		ts: 'typescript',
	},
	on_unknown_language: 'plain',
	// Lets keyboard users scroll wide code blocks
	render: { attributes: { tabindex: 0 } },
});

const labels: Record<string, string> = {
	bash: 'Terminal',
	html: 'Svelte',
	sh: 'Terminal',
	shell: 'Terminal',
	svelte: 'Svelte',
	ts: 'TypeScript',
	typescript: 'TypeScript',
};

function normalise_language(language?: string | null) {
	return (
		language?.toLowerCase().replaceAll(/[^a-z0-9_-]/g, '-') || 'text'
	);
}

// `live` is this site's own flag, the rest of the meta is twinkleplop's
const live_flag = /(^|\s)live(?=\s|$)/;
// Twinkleplop would render a title as a <figcaption>. CodeBlock has a
// bar of its own, so the title goes there in place of the language
const title_attribute = /(^|\s)title="([^"]*)"/;

/**
 * mdsvex highlighter. Fence meta supports the Shiki/VitePress
 * conventions twinkleplop reads, e.g. `{1,3-4}` line highlights and
 * `:line-numbers`, plus `title="file.ts"` and `live`:
 *
 * ````md
 * ```svelte live
 * <YouTube youtube_id="dQw4w9WgXcQ" />
 * ```
 * ````
 *
 * A `live` fence is rendered as well as highlighted, so an example
 * and its output can't drift apart. Emits a CodeBlock, the import is
 * added by the remark plugin in mdsvex.config.js.
 */
export function highlight_code(
	code: string,
	language?: string | null,
	meta?: string | null,
) {
	const normalised = normalise_language(language);
	const live = live_flag.test(meta ?? '');
	const title = title_attribute.exec(meta ?? '')?.[2];
	const twinkleplop_meta = (meta ?? '')
		.replace(live_flag, '')
		.replace(title_attribute, '')
		.trim();

	// Only null for a fence with no language, normalise_language rules that out
	const html =
		renderer.fence(normalised, twinkleplop_meta || undefined, code) ??
		'';
	const label =
		title ||
		(normalised === 'text' ? '' : (labels[normalised] ?? normalised));

	// Pass as string expressions so Svelte doesn't parse `{` or `<`
	// in the highlighted source as template syntax
	const props = [
		`html={${JSON.stringify(html)}}`,
		label && `label={${JSON.stringify(label)}}`,
	]
		.filter(Boolean)
		.join(' ');

	// The fence body goes in as-is: it's the markup to render
	return live
		? `<CodeBlock ${props}>\n${code}\n</CodeBlock>`
		: `<CodeBlock ${props} />`;
}
