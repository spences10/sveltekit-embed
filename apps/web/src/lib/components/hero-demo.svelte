<script lang="ts">
	import { href_of } from '#lib/docs/components.js';
	import '#lib/markdown/twinkleplop.css';
	import { onMount } from 'svelte';
	import { CodePen, Spotify, YouTube } from 'sveltekit-embed';

	// cSpell:ignore Zrzbx
	const demos = [
		{ name: 'YouTube', prop: 'youtube_id', value: 'dQw4w9WgXcQ' },
		{
			name: 'Spotify',
			prop: 'spotify_link',
			value: 'show/4XPl3uEEL9hvqMkoZrzbx5',
		},
		{ name: 'CodePen', prop: 'codepen_id', value: 'WNMvXpa' },
	] as const;

	type Demo = (typeof demos)[number];

	let demo = $state.raw<Demo>(demos[0]);
	// What's in the field, and what the embed is showing. The embed
	// follows once typing pauses so it doesn't reload on every key
	let value = $state<string>(demos[0].value);
	let embedded = $state<string>(demos[0].value);
	let settle_timer: ReturnType<typeof setTimeout> | undefined;

	onMount(() => () => clearTimeout(settle_timer));

	function pick(next: Demo) {
		clearTimeout(settle_timer);
		demo = next;
		value = embedded = next.value;
	}

	function handle_input() {
		clearTimeout(settle_timer);
		settle_timer = setTimeout(() => (embedded = value.trim()), 500);
	}
</script>

<div class="demo">
	<div
		class="flex items-center gap-1 border-b-[1.5px] border-base-content p-1.5"
	>
		{#each demos as option (option.name)}
			<button
				type="button"
				class={[
					'rounded-field px-3 py-1 font-mono text-sm transition-colors',
					option === demo
						? 'bg-base-content text-base-100'
						: 'hover:bg-base-200',
				]}
				aria-pressed={option === demo}
				onclick={() => pick(option)}
			>
				{option.name}
			</button>
		{/each}
	</div>

	<label class="twinkleplop line">
		<span class="sr-only">{demo.prop} for the {demo.name} embed</span>
		<span aria-hidden="true"
			><span class="punctuation">&lt;</span><span class="tag_name"
				>{demo.name}</span
			>
			<span class="attr_name">{demo.prop}</span><span
				class="punctuation">=</span
			><span class="string">"</span></span
		><input
			bind:value
			class="string"
			type="text"
			size={Math.max(value.length, 4)}
			style:width="{Math.max(value.length, 4)}ch"
			autocomplete="off"
			autocapitalize="off"
			spellcheck="false"
			oninput={handle_input}
		/><span aria-hidden="true"
			><span class="string">"</span>
			<span class="punctuation">/&gt;</span></span
		>
	</label>

	<div class="stage">
		{#if !embedded}
			<p class="py-16 text-center text-muted">
				Paste an ID above to load the embed.
			</p>
		{:else if demo.name === 'YouTube'}
			<YouTube youtube_id={embedded} />
		{:else if demo.name === 'Spotify'}
			<Spotify spotify_link={embedded} />
		{:else}
			<CodePen codepen_id={embedded} height="300px" />
		{/if}
	</div>

	<p
		class="border-t-[1.5px] border-base-content px-4 py-2 text-sm text-muted"
	>
		Edit the ID, the embed follows.
		<a class="link text-base-content" href={href_of(demo.name)}
			>All {demo.name} props</a
		>
	</p>
</div>

<style>
	.demo {
		overflow: hidden;
		border: 1.5px solid var(--color-base-content);
		border-radius: var(--radius-box);
		background: var(--color-base-100);
		box-shadow: 8px 8px 0 var(--color-secondary);
	}

	.line {
		display: flex;
		align-items: center;
		overflow-x: auto;
		padding: 0.875rem 1rem;
		border-bottom: 1.5px solid var(--color-base-content);
		white-space: pre;
		cursor: text;
	}

	.line input {
		/* Reads as part of the code until it's focused */
		box-sizing: content-box;
		padding: 0.125rem 0;
		border-radius: 0.25rem;
		background: var(--twp-highlight);
		font: inherit;
		outline-offset: 1px;
	}

	.stage {
		padding: clamp(0.75rem, 3vw, 1.25rem);
		background-image: radial-gradient(
			var(--color-base-300) 1px,
			transparent 1px
		);
		background-size: 1rem 1rem;
	}

	/* Beside the headline the frame keeps one height as the tabs
	   change. Stacked, it just fits whatever it's showing */
	@media (min-width: 64rem) {
		.stage {
			min-height: 19rem;
		}
	}
</style>
