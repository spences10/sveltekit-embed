<script lang="ts">
	import { load_script } from '../attachments/load-script.js';

	interface Props {
		instance?: string;
		username?: string;
		toot_id?: string;
	}

	let {
		instance = '',
		username = '',
		toot_id = '',
	}: Props = $props();

	let trimmedUsername = $derived(username.trim());
	let atUsername = $derived(
		trimmedUsername.startsWith('@')
			? trimmedUsername
			: `@${trimmedUsername}`,
	);
</script>

<div {@attach load_script(`https://${instance}/embed.js`)}>
	<iframe
		title=""
		src={`https://${instance}/${atUsername}/${toot_id}/embed`}
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
