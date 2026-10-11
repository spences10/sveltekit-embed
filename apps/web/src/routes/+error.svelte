<script lang="ts">
	import { palette } from '#lib/state/palette.svelte.js';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | SvelteKit Embed</title>
</svelte:head>

<section class="site-width py-24">
	<p class="font-mono text-muted">{page.status}</p>
	<h1 class="mt-2 text-5xl font-bold">
		{page.status === 404 ? 'There’s no page here' : 'Something broke'}
	</h1>
	<p class="mt-4 max-w-prose text-lg text-muted">
		{page.status === 404
			? 'The link may be old: every component has its own page now.'
			: page.error?.message}
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		<button
			type="button"
			class="btn btn-primary"
			onclick={() => (palette.open = true)}
		>
			Search components
		</button>
		<a class="btn btn-ghost" href="/">Go to the home page</a>
	</div>
</section>
