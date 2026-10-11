<script lang="ts">
	import { site } from '#lib/config.js';
	import { GitHub, Twitter } from '#lib/icons/index.js';
	import spencee_img from '#lib/images/spencee.png';
	import * as Fathom from 'fathom-client';
</script>

<footer class="mt-24 border-t border-base-300 bg-base-200">
	<div
		class="site-width flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"
	>
		<div class="flex items-center gap-4">
			<img
				src={spencee_img}
				alt=""
				class="size-12 rounded-full"
				loading="lazy"
			/>
			<p>
				Made by
				<a
					class="link font-semibold"
					href="https://scottspence.com"
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => Fathom.trackEvent(`scottspence.com click`)}
				>
					Scott Spence
				</a>
				and
				<a
					class="link"
					href="{site.repo}#contributors-"
					target="_blank"
					rel="noopener noreferrer">contributors</a
				>.
				<span class="block text-sm text-muted">
					MIT licensed. Copyright © 2021-{new Date().getFullYear()}.
				</span>
			</p>
		</div>
		<nav aria-label="Elsewhere" class="flex items-center gap-1">
			<a
				class="btn btn-ghost btn-sm"
				href={site.npm}
				target="_blank"
				rel="noopener noreferrer">npm</a
			>
			<a
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Scott on GitHub"
				href="https://github.com/spences10"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() =>
					Fathom.trackEvent(`spences10 GitHub link click`)}
			>
				<GitHub size={18} />
			</a>
			<a
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Scott on Twitter"
				href="https://twitter.com/spences10"
				target="_blank"
				rel="noopener noreferrer"
				onclick={() => Fathom.trackEvent(`spences10 Twitter click`)}
			>
				<Twitter size={18} />
			</a>
		</nav>
	</div>
</footer>
