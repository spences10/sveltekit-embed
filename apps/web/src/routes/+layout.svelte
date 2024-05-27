<script>
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
	import '../app.pcss';
	import '../prism.css';

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

<main class="container prose prose-xl mx-auto mb-20 max-w-3xl px-4">
	<slot />
</main>

<footer
	class="footer footer-center bg-primary p-10 text-primary-content"
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
