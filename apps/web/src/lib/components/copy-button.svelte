<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import { onMount } from 'svelte';

	// `text` is read on click, so it can be a function for content
	// that only exists in the DOM
	let {
		text,
		label = 'Copy code',
	}: { text: string | (() => string); label?: string } = $props();

	let status = $state('');
	let reset_timer: ReturnType<typeof setTimeout> | undefined;

	onMount(() => () => clearTimeout(reset_timer));

	async function copy() {
		try {
			await navigator.clipboard.writeText(
				typeof text === 'function' ? text() : text,
			);
			status = 'Copied';
		} catch {
			status = 'Copy failed';
		}

		clearTimeout(reset_timer);
		reset_timer = setTimeout(() => (status = ''), 2000);
	}
</script>

<button
	type="button"
	class="btn btn-square text-muted btn-ghost btn-sm hover:text-base-content"
	aria-label={label}
	title={status || label}
	onclick={copy}
>
	{#if status === 'Copied'}
		<CheckIcon class="size-4 text-success" aria-hidden="true" />
	{:else}
		<CopyIcon class="size-4" aria-hidden="true" />
	{/if}
</button>
<span class="sr-only" role="status">{status}</span>
