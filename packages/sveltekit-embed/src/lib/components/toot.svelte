<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	export let instance: string = ''
	export let username: string = ''
	export let tootId: string = ''

	let mastodon_embed_script: HTMLScriptElement | null = null

	const load_mastodon_embed_script = () => {
		if (mastodon_embed_script) return
		mastodon_embed_script = document.createElement('script')
		mastodon_embed_script.src = `https://${instance}/embed.js`
		mastodon_embed_script.async = true
		document.head.appendChild(mastodon_embed_script)
	}

	const remove_mastodon_embed_script = () => {
		if (mastodon_embed_script) {
			document.head.removeChild(mastodon_embed_script)
			mastodon_embed_script = null
		}
	}

	onMount(load_mastodon_embed_script)
	onDestroy(remove_mastodon_embed_script)

	$: trimmedUsername = username.trim()
	$: atUsername = trimmedUsername.startsWith('@')
		? trimmedUsername
		: `@${trimmedUsername}`
</script>

<div>
	<iframe
		title=""
		src={`https://${instance}/${atUsername}/${tootId}/embed`}
		class="mastodon-embed"
		width="400"
		allowfullscreen
	/>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		margin-bottom: 12px;
	}

	iframe {
		max-width: 100%;
		border: 0;
	}
</style>
