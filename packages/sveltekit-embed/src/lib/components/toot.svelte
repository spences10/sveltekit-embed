<script lang="ts">
	interface Props {
		instance?: string;
		username?: string;
		tootId?: string;
	}

	let { instance = '', username = '', tootId = '' }: Props = $props();

	let mastodon_embed_script: HTMLScriptElement | null = null;

	const load_mastodon_embed_script = () => {
		if (mastodon_embed_script) return;
		mastodon_embed_script = document.createElement('script');
		mastodon_embed_script.src = `https://${instance}/embed.js`;
		mastodon_embed_script.async = true;
		document.head.appendChild(mastodon_embed_script);
	};

	const remove_mastodon_embed_script = () => {
		if (mastodon_embed_script && mastodon_embed_script.parentNode) {
			mastodon_embed_script.parentNode.removeChild(mastodon_embed_script);
			mastodon_embed_script = null;
		}
	};

	$effect(() => {
		load_mastodon_embed_script();
		return () => {
			remove_mastodon_embed_script();
		};
	});

	let trimmedUsername = $derived(username.trim());
	let atUsername = $derived(
		trimmedUsername.startsWith('@')
			? trimmedUsername
			: `@${trimmedUsername}`,
	);
</script>

<div>
	<iframe
		title=""
		src={`https://${instance}/${atUsername}/${tootId}/embed`}
		class="mastodon-embed"
		width="400"
		allowfullscreen
	></iframe>
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
