<script lang="ts">
	import { fly } from 'svelte/transition'

	let showScrollButton = false

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	function handleScroll() {
		showScrollButton = window.pageYOffset > 0
	}
</script>

<svelte:window on:scroll={handleScroll} />

{#if showScrollButton}
	<button
		on:click={scrollToTop}
		transition:fly={{ y: 200, duration: 300 }}
		class="fixed bottom-8 right-8 btn btn-primary normal-case"
	>
		Back to top
	</button>
{/if}
