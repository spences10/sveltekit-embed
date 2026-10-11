<script lang="ts">
	import type { PropDoc } from '#lib/docs/components.js';

	let { props }: { props: PropDoc[] } = $props();

	// Descriptions mark code with backticks, odd segments are code
	const segments = (text: string) => text.split('`');
</script>

<div class="overflow-x-auto rounded-box border border-base-300">
	<table class="w-full border-collapse text-left text-[0.9375rem]">
		<thead>
			<tr class="border-b border-base-300 bg-base-200 text-sm">
				<th scope="col" class="w-1/2 px-4 py-2.5 font-semibold"
					>Prop</th
				>
				<th scope="col" class="px-4 py-2.5 font-semibold">Type</th>
				<th scope="col" class="px-4 py-2.5 font-semibold">Default</th>
			</tr>
		</thead>
		<tbody>
			{#each props as prop (prop.name)}
				<tr class="border-b border-base-300 align-top last:border-0">
					<th scope="row" class="px-4 py-3 font-normal">
						<code
							class="font-mono text-sm font-semibold whitespace-nowrap"
							>{prop.name}</code
						>
						{#if prop.required}
							<span
								class="ml-1 rounded bg-secondary px-1.5 py-0.5 text-xs font-semibold text-secondary-content"
								>required</span
							>
						{/if}
						<p class="mt-1 min-w-48 text-sm text-muted">
							{#each segments(prop.description) as segment, index (index)}
								{#if index % 2}<code
										class="rounded bg-base-200 px-1 py-0.5 font-mono text-[0.8125rem] text-base-content"
										>{segment}</code
									>{:else}{segment}{/if}
							{/each}
						</p>
					</th>
					<td class="px-4 py-3">
						<code class="type font-mono text-sm">{prop.type}</code>
					</td>
					<td class="px-4 py-3">
						{#if prop.default}
							<code class="font-mono text-sm whitespace-nowrap"
								>{prop.default}</code
							>
						{:else}
							<span class="text-muted" aria-label="No default">–</span
							>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.type {
		display: block;
		max-width: 22rem;
		min-width: 9rem;
		color: var(--twp-type);
	}
</style>
