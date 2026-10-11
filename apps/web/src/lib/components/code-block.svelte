<script lang="ts">
	import { embed_loading } from '#lib/attachments/embed-loading.js';
	import '#lib/markdown/twinkleplop.css';
	import {
		code,
		toggle_line_numbers,
	} from '#lib/state/code.svelte.js';
	import ListOrderedIcon from '@lucide/svelte/icons/list-ordered';
	import type { Snippet } from 'svelte';
	import CopyButton from './copy-button.svelte';
	import LanguageIcon from './language-icon.svelte';

	// Emitted by the mdsvex highlighter. `html` is twinkleplop output,
	// `language` what it was highlighted as, `label` the language name
	// or the fence's title (absent for plain text) and `children` the
	// rendered example when the fence is marked `live`
	let {
		html,
		language,
		label,
		children,
	}: {
		html: string;
		language?: string;
		label?: string;
		children?: Snippet;
	} = $props();

	let block: HTMLDivElement | undefined;

	// Line numbers are in the markup either way, so leave them out
	function code_text() {
		const copy = block?.querySelector('pre code')?.cloneNode(true);
		if (!(copy instanceof HTMLElement)) return '';
		for (const number of copy.querySelectorAll('.ln'))
			number.remove();
		return copy.textContent ?? '';
	}
</script>

<div class="not-prose example" class:live={children}>
	{#if children}
		<div class="stage" {@attach embed_loading}>
			{@render children()}
		</div>
	{/if}
	<div
		class="code"
		data-line-numbers={code.line_numbers ? '' : undefined}
		bind:this={block}
	>
		<div class="bar">
			<span
				class="flex items-center gap-2 font-mono text-xs text-muted"
			>
				{#if label}
					<LanguageIcon {language} />
					{label}
				{/if}
			</span>
			<span class="flex items-center">
				<button
					type="button"
					class={[
						'btn btn-square btn-ghost btn-sm hover:text-base-content',
						code.line_numbers ? 'text-primary' : 'text-muted',
					]}
					aria-label="Line numbers"
					aria-pressed={code.line_numbers}
					title={code.line_numbers
						? 'Hide line numbers'
						: 'Show line numbers'}
					onclick={toggle_line_numbers}
				>
					<ListOrderedIcon class="size-4" aria-hidden="true" />
				</button>
				<CopyButton text={code_text} />
			</span>
		</div>
		{@html html}
	</div>
</div>

<style>
	.example {
		/* Shared by the bar and each code line (twinkleplop.css) */
		--code-gutter: clamp(1rem, 3vw, 1.25rem);
		margin-block: 1.75rem;
	}

	.code {
		overflow: hidden;
		border: 1px solid var(--color-base-300);
		border-radius: var(--radius-box);
		background: var(--twp-background);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.25rem 0.375rem 0.25rem var(--code-gutter);
		border-bottom: 1px solid var(--color-base-300);
	}

	.code :global(pre:focus-visible) {
		outline-offset: -2px;
	}

	/* A live example is the site's one loud moment: the embed sits in
	   a framed stage with its source attached underneath */
	.live {
		margin-block: 2.25rem 2.75rem;
		border: 1.5px solid var(--color-base-content);
		border-radius: var(--radius-box);
		box-shadow: 6px 6px 0 var(--color-secondary);
	}

	.live .stage {
		padding: clamp(0.75rem, 3vw, 1.5rem);
		border-bottom: 1.5px solid var(--color-base-content);
		border-radius: calc(var(--radius-box) - 1.5px)
			calc(var(--radius-box) - 1.5px) 0 0;
		background-color: var(--color-base-100);
		/* Graph paper, so the embed's own edges read against the stage */
		background-image: radial-gradient(
			var(--color-base-300) 1px,
			transparent 1px
		);
		background-size: 1rem 1rem;
	}

	.live .code {
		border: 0;
		border-radius: 0 0 calc(var(--radius-box) - 1.5px)
			calc(var(--radius-box) - 1.5px);
	}
</style>
