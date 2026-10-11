<script lang="ts">
	import { GitHub, Twitter, YouTube } from '#lib/icons/index.js';
	import spencee_img from '#lib/images/spencee.png';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$app/env/public';
	import { page } from '$app/state';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';
	import '../prism.css';

	let { children } = $props();

	onMount(() => {
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

<header class="text-right">
	<span
		class="tooltip tooltip-bottom m-4 before:text-xs before:content-[attr(data-tip)]"
		data-tip="GitHub"
	>
		<div class="flex-none items-center">
			<a
				aria-label="Github"
				onclick={() => Fathom.trackEvent(`GitHub project link click`)}
				target="_blank"
				href="https://github.com/spences10/sveltekit-embed"
				rel="noopener noreferrer"
				class="drawer-button btn btn-square normal-case btn-ghost"
			>
				<GitHub
					height="30"
					width="30"
					fill="fill-white fill-primary"
				/>
			</a>
		</div>
	</span>
</header>

<main class="container mx-auto prose prose-xl mb-20 max-w-3xl px-4">
	{@render children?.()}
</main>

<footer
	class="footer-center footer footer-horizontal bg-primary p-10 text-primary-content"
>
	<div class="text-xl">
		<img
			src={spencee_img}
			alt="Scott avatar"
			class="h-20 rounded-full"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link transition hover:text-secondary"
				onclick={() => Fathom.trackEvent(`scottspence.com click`)}
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
		</p>
		<p>
			Copyright © 2021-{`${new Date().getFullYear()}`}. All rights
			reserved
			<span role="img" aria-label="shrugging emoji">🤷</span>
		</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				aria-label="Twitter"
				onclick={() => Fathom.trackEvent(`spences10 Twitter click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitter.com/spences10"
			>
				<Twitter />
			</a>
			<a
				aria-label="GitHub"
				onclick={() =>
					Fathom.trackEvent(`spences10 GitHub link click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/spences10"
			>
				<GitHub />
			</a>
			<a
				aria-label="YouTube"
				onclick={() => Fathom.trackEvent(`spences10 YouTube click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10/yt"
			>
				<YouTube />
			</a>
		</div>
	</div>
</footer>
