<script>
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public'
	import { GitHub, Twitter, YouTube } from '$lib/icons'
	import spencee_img from '$lib/images/spencee.png'
	import * as Fathom from 'fathom-client'
	import { onMount } from 'svelte'
	import '../app.css'
	import '../prism.css'

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		})
	})

	$: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<header class="text-right">
	<span
		class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] m-4"
		data-tip="GitHub"
	>
		<div class="flex-none items-center">
			<a
				aria-label="Github"
				on:click={() => Fathom.trackGoal(`AVHDQHY5`, 1)}
				target="_blank"
				href="https://github.com/spences10/sveltekit-embed"
				rel="noopener noreferrer"
				class="btn btn-ghost drawer-button btn-square normal-case"
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

<main class="prose prose-xl container max-w-3xl mx-auto px-4 mb-20">
	<slot />
</main>

<footer
	class="p-10 footer bg-primary text-primary-content footer-center"
>
	<div class="text-xl">
		<img
			src={spencee_img}
			alt="Scott avatar"
			class="rounded-full h-20"
		/>
		<p class="font-bold">
			Made with <span role="img" aria-label="red heart">❤️</span> by
			<a
				class="link transition hover:text-secondary"
				on:click={() => Fathom.trackGoal(`I2QEP6J7`, 1)}
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				Scott Spence
			</a>
		</p>
		<p>
			Copyright © {`${new Date().getFullYear()}`} - All rights reserved
			<span role="img" aria-label="shruggin emoji">🤷</span>
		</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				aria-label="Twitter"
				on:click={() => Fathom.trackGoal(`TDFSFLH6`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitter.com/spences10"
			>
				<Twitter />
			</a>
			<a
				aria-label="GitHub"
				on:click={() => Fathom.trackGoal(`SFTCEHDU`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/spences10"
			>
				<GitHub />
			</a>
			<a
				aria-label="YouTube"
				on:click={() => Fathom.trackGoal(`PBZ3XFUF`, 1)}
				target="_blank"
				rel="noopener noreferrer"
				href="https://ss10/yt"
			>
				<YouTube />
			</a>
		</div>
	</div>
</footer>
