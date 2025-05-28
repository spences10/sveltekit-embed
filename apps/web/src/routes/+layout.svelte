<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public';
	import { GitHub, Twitter, YouTube } from '$lib/icons';
	import spencee_img from '$lib/images/spencee.png';
	import * as Fathom from 'fathom-client';
	import { onMount } from 'svelte';
	import '../app.css';
	import '../prism.css';

	export let data;

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<header class="text-right">
	<span
		class="tooltip tooltip-bottom m-4 before:text-xs before:content-[attr(data-tip)]"
		data-tip="GitHub"
	>
		<div class="flex-none items-center">
			<a
				aria-label="Github"
				on:click={() =>
					Fathom.trackEvent(`GitHub project link click`)}
				target="_blank"
				href="https://github.com/spences10/sveltekit-embed"
				rel="noopener noreferrer"
				class="btn btn-square btn-ghost drawer-button normal-case"
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

{#if !data.is_cloudflare}
	<div
		role="banner"
		class="rounded-box prose-a:text-info-content bg-primary relative mb-8 text-center shadow-lg lg:mx-20"
	>
		<h2
			class="text-primary-content p-4 text-3xl font-bold tracking-wide"
		>
			We've moved to Cloudflare!
		</h2>
		<p class="text-primary-content px-4 pb-6 text-xl">
			This is now being hosted on Cloudflare Pages. You can check it
			out on <a
				href="https://sveltekit-embed.pages.dev"
				class="link link-secondary"
			>
				https://sveltekit-embed.pages.dev
			</a>
		</p>
	</div>
{/if}

<main class="prose prose-xl container mx-auto mb-20 max-w-3xl px-4">
	<slot />
</main>

<footer
	class="footer footer-center bg-primary text-primary-content p-10"
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
				class="link hover:text-secondary transition"
				on:click={() => Fathom.trackEvent(`scottspence.com click`)}
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
				on:click={() => Fathom.trackEvent(`spences10 Twitter click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitter.com/spences10"
			>
				<Twitter />
			</a>
			<a
				aria-label="GitHub"
				on:click={() =>
					Fathom.trackEvent(`spences10 GitHub link click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/spences10"
			>
				<GitHub />
			</a>
			<a
				aria-label="YouTube"
				on:click={() => Fathom.trackEvent(`spences10 YouTube click`)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10/yt"
			>
				<YouTube />
			</a>
		</div>
	</div>
</footer>
