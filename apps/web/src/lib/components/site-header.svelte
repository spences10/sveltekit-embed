<script lang="ts">
	import { site } from '#lib/config.js';
	import { GitHub } from '#lib/icons/index.js';
	import * as Fathom from 'fathom-client';
	import SearchTrigger from './search-trigger.svelte';
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header
	class="sticky top-0 z-20 border-b border-base-300 bg-base-100/90 backdrop-blur"
>
	<div class="site-width flex h-16 items-center gap-2">
		<a
			href="/"
			class="mr-auto flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
		>
			<img src="/favicon.svg" alt="" class="size-7" />
			<span>sveltekit-embed</span>
		</a>
		<SearchTrigger />
		<ThemeToggle />
		<a
			class="btn btn-square btn-ghost"
			aria-label="sveltekit-embed on GitHub"
			href={site.repo}
			target="_blank"
			rel="noopener noreferrer"
			onclick={() => Fathom.trackEvent(`GitHub project link click`)}
		>
			<GitHub />
		</a>
	</div>
</header>
