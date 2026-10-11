import { compile as compile_markdown } from 'mdsvex';
import { compile } from 'svelte/compiler';
import { describe, expect, it } from 'vite-plus/test';
import mdsvex_config from '../../../mdsvex.config.js';
import { highlight_code } from './highlighter.js';

describe('highlight_code', () => {
	it('highlights with twinkleplop token classes', () => {
		const output = highlight_code('const value = 42;', 'ts');

		expect(output).toContain('<CodeBlock ');
		expect(output).toContain('twinkleplop language-ts');
		expect(output).toContain('tok keyword');
		expect(output).toContain('label={"TypeScript"}');
	});

	it('names the grammar an alias resolves to', () => {
		expect(highlight_code('a', 'ts')).toContain(
			'language={"typescript"}',
		);
		expect(highlight_code('a', 'html')).toContain(
			'language={"svelte"}',
		);
		expect(highlight_code('a', 'powershell')).not.toContain(
			' language={',
		);
	});

	it('numbers every line for the toggle to reveal', () => {
		const output = highlight_code('const a = 1;\nconst b = 2;', 'ts');

		expect(output.match(/class=\\"ln\\"/g)).toHaveLength(2);
	});

	it('highlights every language the docs fence', () => {
		for (const language of ['bash', 'svelte', 'ts', 'html']) {
			expect(highlight_code('a', language)).toContain(
				`language-${language}`,
			);
		}
	});

	it('falls back to escaped plain text for unknown languages', () => {
		const output = highlight_code(
			'<script>alert("no")</script>',
			'powershell',
		);

		expect(output).toContain('language-powershell');
		expect(output).toContain('&lt;script&gt;');
		expect(output).not.toContain('<script>');
	});

	it('renders fences without a language as unlabelled plain text', () => {
		const output = highlight_code('just text', undefined);

		expect(output).toContain('language-text');
		expect(output).not.toContain('label=');
	});

	it('highlights lines from fence meta', () => {
		const output = highlight_code(
			'const a = 1;\nconst b = 2;',
			'ts',
			'{2}',
		);

		expect(output).toContain('l highlight');
	});

	it('shows a title in place of the language', () => {
		const output = highlight_code(
			'<p>hi</p>',
			'svelte',
			'title="+page.svelte" {1}',
		);

		expect(output).toContain('label={"+page.svelte"}');
		expect(output).toContain('l highlight');
		expect(output).not.toContain('figcaption');
	});

	it('renders a live fence as well as highlighting it', () => {
		const code = '<YouTube youtube_id="dQw4w9WgXcQ" />';
		const live = highlight_code(code, 'svelte', 'live');

		expect(live).toContain(`>\n${code}\n</CodeBlock>`);
		expect(highlight_code(code, 'svelte')).not.toContain(
			'</CodeBlock>',
		);
	});

	it('only reads live as a whole word', () => {
		const output = highlight_code('a', 'svelte', 'title="alive"');

		expect(output).not.toContain('</CodeBlock>');
	});
});

describe('mdsvex pipeline', () => {
	async function preprocess(source: string) {
		const result = await compile_markdown(source, {
			...mdsvex_config,
			filename: 'page.md',
		});
		return result!.code;
	}

	it('imports CodeBlock into a file with no script', async () => {
		const code = await preprocess('```bash\npnpm add thing\n```');

		expect(code).toContain(
			"import CodeBlock from '#lib/components/code-block.svelte';",
		);
	});

	it('reuses the script a file already has', async () => {
		const code = await preprocess(
			[
				'<script>',
				"\timport { YouTube } from 'sveltekit-embed';",
				'</script>',
				'',
				'```svelte live',
				'<YouTube youtube_id="dQw4w9WgXcQ" skip_to={{ m: 1 }} />',
				'```',
			].join('\n'),
		);

		expect(code.match(/<script>/g)).toHaveLength(1);
		expect(code).toContain('import CodeBlock');

		// The live markup has to survive as real Svelte, braces and all
		const { warnings } = compile(code, { filename: 'page.svelte' });
		expect(warnings).toEqual([]);
		expect(code).toContain('skip_to={{ m: 1 }} />\n</CodeBlock>');
	});

	it('leaves files without code alone', async () => {
		const code = await preprocess('Just a paragraph.');

		expect(code).not.toContain('CodeBlock');
	});
});
