<script lang="ts">
	import { Check, Copy } from 'lucide';
	import { MorphIcon } from 'morphicons/svelte';
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
	class={[
		'btn btn-square btn-ghost btn-sm hover:text-base-content',
		status === 'Copied' ? 'text-success' : 'text-muted',
	]}
	aria-label={label}
	title={status || label}
	onclick={copy}
>
	<MorphIcon
		icon={status === 'Copied' ? Check : Copy}
		size={16}
		spring="snappy"
		reducedMotion="user"
	/>
</button>
<span class="sr-only" role="status">{status}</span>
