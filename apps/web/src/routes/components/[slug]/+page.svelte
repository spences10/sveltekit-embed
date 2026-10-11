<script lang="ts">
	import CopyButton from '#lib/components/copy-button.svelte';
	import PropsTable from '#lib/components/props-table.svelte';
	import { site } from '#lib/config.js';
	import {
		categories,
		href_of,
		slug_of,
	} from '#lib/docs/components.js';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { Head } from 'svead';

	let { data } = $props();

	const component = $derived(data.component);
	const category = $derived(
		categories.find(({ id }) => id === component.category)!,
	);
	const import_line = $derived(
		`import { ${component.name} } from '${site.package}';`,
	);
</script>

<Head
	seo_config={{
		title: `${component.name} | SvelteKit Embed`,
		description: `${component.description} Props, defaults and a live example of the ${component.name} component from sveltekit-embed.`,
		url: `${site.url}${href_of(component.name)}`,
		website: site.url,
	}}
/>

<article class="site-width py-10 lg:py-14">
	<div class="mx-auto max-w-3xl">
		<header>
			<a
				class="inline-flex items-center gap-1.5 text-muted hover:text-base-content"
				href="/#{category.id}"
			>
				<ArrowLeftIcon class="size-4" aria-hidden="true" />
				{category.label}
			</a>
			<h1 class="mt-3 text-5xl font-extrabold sm:text-6xl">
				{component.name}
			</h1>
			<p class="mt-4 text-xl text-muted">{component.description}</p>
			<div
				class="mt-6 flex items-center justify-between gap-2 rounded-field border border-base-300 bg-base-200 py-1 pr-1.5 pl-4"
			>
				<code
					class="overflow-x-auto font-mono text-sm whitespace-nowrap"
					>{import_line}</code
				>
				<CopyButton text={import_line} label="Copy import" />
			</div>
		</header>

		<div class="doc prose mt-2 max-w-none">
			<data.content />
		</div>

		<section aria-labelledby="props-heading" class="mt-12">
			<h2 id="props-heading" class="mb-4 text-[1.6rem] font-semibold">
				Props
			</h2>
			<PropsTable props={component.props} />
		</section>

		<nav
			aria-label="More components"
			class="mt-16 grid gap-4 border-t border-base-300 pt-6 sm:grid-cols-2"
		>
			{#if data.previous}
				<a class="pager" href={href_of(data.previous.name)}>
					<ArrowLeftIcon
						class="size-5 text-muted"
						aria-hidden="true"
					/>
					<span>
						<span class="block text-sm text-muted">Previous</span>
						<span class="font-display text-xl font-semibold"
							>{data.previous.name}</span
						>
					</span>
				</a>
			{/if}
			{#if data.next}
				<a
					class="pager justify-end text-right sm:col-start-2"
					href={href_of(data.next.name)}
				>
					<span>
						<span class="block text-sm text-muted">Next</span>
						<span class="font-display text-xl font-semibold"
							>{data.next.name}</span
						>
					</span>
					<ArrowRightIcon
						class="size-5 text-muted"
						aria-hidden="true"
					/>
				</a>
			{/if}
		</nav>

		<p class="mt-8 text-sm text-muted">
			Something wrong on this page?
			<a
				class="link"
				href="{site.repo}/edit/main/apps/web/src/lib/content/components/{slug_of(
					component.name,
				)}.md"
				target="_blank"
				rel="noopener noreferrer">Edit it on GitHub</a
			>.
		</p>
	</div>
</article>

<style>
	.pager {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-base-300);
		border-radius: var(--radius-box);
		transition: border-color 150ms;
	}

	.pager:hover {
		border-color: var(--color-base-content);
	}
</style>
