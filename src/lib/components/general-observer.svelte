<!-- 
  https://www.reddit.com/r/sveltejs/comments/le28vg/whats_your_svelte_way_to_detect_if_an_element_is/
  https://svelte.dev/repl/4b8ccdf1d01545baa0ab6a858bc05abb?version=3.32.1
-->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let threshold: number = 0.5
	export let disable_observer: boolean = false

	let loaded = disable_observer
	let root: HTMLElement

	const hasIntersectionObserver =
		typeof IntersectionObserver !== 'undefined'
	let observer =
		hasIntersectionObserver && !disable_observer
			? new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (entry.intersectionRatio >= threshold) {
								loaded = true
								observer.disconnect()
							}
						})
					},
					{
						rootMargin: '0px',
						threshold,
					}
			  )
			: null

	onMount(() => {
		if (observer) {
			observer.observe(root)
		}
	})

	onDestroy(() => {
		if (observer) {
			observer.disconnect()
		}
	})
</script>

<div bind:this={root} data-testid="general-observer">
	{#if disable_observer}
		<div transition:fade>
			<slot />
		</div>
	{:else if loaded}
		<div transition:fade>
			<slot />
		</div>
	{/if}
</div>
