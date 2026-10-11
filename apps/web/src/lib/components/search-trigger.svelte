<script lang="ts">
	import { palette } from '#lib/state/palette.svelte.js';
	import SearchIcon from '@lucide/svelte/icons/search';

	// Ctrl on the server and on non-Apple platforms, ⌘ once we know
	let modifier = $state('Ctrl');
	$effect(() => {
		if (/mac|iphone|ipad/i.test(navigator.userAgent)) modifier = '⌘';
	});
</script>

<button
	type="button"
	class="flex h-10 items-center gap-2.5 rounded-field border border-base-300 bg-base-200 px-3 text-left text-[0.9375rem] text-muted transition-colors hover:border-base-content hover:text-base-content sm:w-64"
	aria-label="Search components"
	aria-keyshortcuts="Control+K Meta+K"
	onclick={() => (palette.open = true)}
>
	<SearchIcon class="size-4 shrink-0" aria-hidden="true" />
	<span class="hidden flex-1 sm:inline">Search components</span>
	<kbd
		class="hidden rounded border border-base-300 bg-base-100 px-1.5 py-0.5 font-mono text-xs leading-none sm:inline"
		>{modifier} K</kbd
	>
</button>
