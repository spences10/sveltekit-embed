<!-- 
  https://www.reddit.com/r/sveltejs/comments/le28vg/whats_your_svelte_way_to_detect_if_an_element_is/
  https://svelte.dev/repl/4b8ccdf1d01545baa0ab6a858bc05abb?version=3.32.1
-->
<script lang="ts">
	import { type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		threshold?: number;
		disable_observer: boolean;
		children: Snippet;
	}

	let {
		threshold = 0.5,
		disable_observer = false,
		children,
	}: Props = $props();

	let loaded = $state(disable_observer);
	let root: HTMLElement;

	const hasIntersectionObserver =
		typeof IntersectionObserver !== 'undefined';
	let observer: IntersectionObserver | null =
		hasIntersectionObserver && !disable_observer
			? new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (entry.intersectionRatio >= threshold) {
								loaded = true;
								observer!.disconnect();
							}
						});
					},
					{
						rootMargin: '0px',
						threshold,
					},
				)
			: null;

	$effect(() => {
		if (observer) {
			observer.observe(root);
		}
		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<div bind:this={root} data-testid="general-observer">
	{#if disable_observer}
		<div transition:fade>
			{@render children()}
		</div>
	{:else if loaded}
		<div transition:fade>
			{@render children()}
		</div>
	{/if}
</div>
