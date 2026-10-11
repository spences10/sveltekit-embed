<script lang="ts">
	import CommandPalette from '#lib/components/command-palette.svelte';
	import SiteFooter from '#lib/components/site-footer.svelte';
	import SiteHeader from '#lib/components/site-header.svelte';
	import { read_stored_mode } from '#lib/state/theme.svelte.js';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$app/env/public';
	import { page } from '$app/state';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		read_stored_mode();
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	$effect(() => {
		// read the pathname so this re-runs on every navigation
		void page.url.pathname;
		Fathom.trackPageview();
	});
</script>

<a
	href="#main"
	class="btn sr-only btn-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30"
>
	Skip to content
</a>

<SiteHeader />

<main id="main">
	{@render children?.()}
</main>

<SiteFooter />

<CommandPalette />
