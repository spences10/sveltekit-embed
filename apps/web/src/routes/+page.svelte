<script lang="ts">
	import HeroDemo from '#lib/components/hero-demo.svelte';
	import Seo from '#lib/components/seo.svelte';
	import { site } from '#lib/config.js';
	import Install from '#lib/content/install.md';
	import {
		categories,
		components,
		components_in,
		find_component,
		href_of,
	} from '#lib/docs/components.js';
	import { home_schema } from '#lib/seo.js';
	import { palette } from '#lib/state/palette.svelte.js';
	import { goto } from '$app/navigation';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { onMount } from 'svelte';

	// The docs used to be one page with a heading per component, so
	// links like `/#youtube` are out there. Send them to the new page
	onMount(() => {
		const component = find_component(location.hash.slice(1));
		if (component) {
			void goto(href_of(component.name), { replaceState: true });
		}
	});
</script>

<Seo
	page={{
		title: site.name,
		description: site.description,
		path: '/',
		card: 'home',
		card_alt:
			'Paste an ID. Get the player. Svelte components for videos, podcasts, posts and pens.',
	}}
	schema={home_schema()}
/>

<section
	class="site-width grid items-center gap-x-12 gap-y-10 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:py-20"
>
	<div>
		<h1
			class="text-5xl leading-[0.95] font-extrabold sm:text-6xl xl:text-7xl"
		>
			Paste an ID.<br />Get the player.
		</h1>
		<p class="mt-6 max-w-136 text-xl text-muted">
			{components.length} Svelte components for the videos, podcasts, posts
			and pens you embed in SvelteKit pages. Each one takes an ID or a link,
			and lazy loads by default.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<button
				type="button"
				class="btn btn-lg btn-primary"
				onclick={() => (palette.open = true)}
			>
				<SearchIcon class="size-5" aria-hidden="true" />
				Search components
			</button>
			<a class="btn btn-ghost btn-lg" href="#install">Install it</a>
		</div>
	</div>
	<HeroDemo />
</section>

<section
	id="install"
	class="border-y border-base-300 bg-base-200/60 py-14"
	aria-labelledby="install-heading"
>
	<div
		class="site-width grid gap-x-12 gap-y-4 lg:grid-cols-[14rem_minmax(0,1fr)]"
	>
		<h2 id="install-heading" class="text-3xl font-bold">
			Install and use
		</h2>
		<div class="doc prose max-w-3xl min-w-0 *:first:mt-0">
			<Install />
			<p>
				Embeds load when they get close to the viewport. To change
				that, or to lazy load your own markup, read
				<a href="/lazy-loading">how lazy loading works</a>.
			</p>
		</div>
	</div>
</section>

<section
	id="components"
	class="site-width py-14"
	aria-labelledby="components-heading"
>
	<div class="flex flex-wrap items-end justify-between gap-4">
		<h2 id="components-heading" class="text-3xl font-bold">
			Components
		</h2>
		<p class="text-muted">
			Missing one?
			<a
				class="link text-base-content"
				href={site.discussions}
				target="_blank"
				rel="noopener noreferrer">Request an embed</a
			>
			or use
			<a class="link text-base-content" href={href_of('GenericEmbed')}
				>GenericEmbed</a
			>.
		</p>
	</div>

	{#each categories as category (category.id)}
		{@const entries = components_in(category.id)}
		<div
			id={category.id}
			class="mt-10 grid gap-x-12 gap-y-3 border-t-[1.5px] border-base-content pt-4 lg:grid-cols-[14rem_minmax(0,1fr)]"
		>
			<h3 class="text-xl font-semibold">
				{category.label}
				<span class="ml-1 font-sans text-base font-normal text-muted"
					>{entries.length}</span
				>
			</h3>
			<ul>
				{#each entries as component (component.name)}
					<li class="border-b border-base-300 last:border-0">
						<a
							href={href_of(component.name)}
							class="entry group grid items-baseline gap-x-6 py-3 sm:grid-cols-[11rem_minmax(0,1fr)_auto]"
						>
							<span class="name font-display text-2xl font-semibold"
								>{component.name}</span
							>
							<span class="text-muted">{component.description}</span>
							<ArrowRightIcon
								class="hidden size-5 self-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
								aria-hidden="true"
							/>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>

<style>
	.entry .name {
		width: fit-content;
		background: linear-gradient(
				var(--color-secondary),
				var(--color-secondary)
			)
			no-repeat 0 90% / 0 0.35em;
		transition: background-size 150ms ease-out;
	}

	.entry:hover .name,
	.entry:focus-visible .name {
		background-size: 100% 0.35em;
	}

	@media (prefers-reduced-motion: reduce) {
		.entry .name {
			transition: none;
		}
	}
</style>
