<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		post_id?: string;
		width?: string;
		iframe_styles?: string;
	}

	let {
		post_id = '',
		width = '100%',
		iframe_styles = '',
	}: Props = $props();

	let wrapper_height = $state('174.5px');

	const get_embed_url = (post_id: string) => {
		return `https://embed.bsky.app/embed/${post_id}`;
	};

	onMount(() => {
		const handle_message = (event: MessageEvent) => {
			if (event.origin !== 'https://embed.bsky.app') return;

			if (typeof event.data === 'object') {
				wrapper_height = `${event.data.height || event.data.h || 500}px`;
			}
		};

		window.addEventListener('message', handle_message);
		return () => {
			window.removeEventListener('message', handle_message);
		};
	});
</script>

<div class="bluesky-wrapper-container">
	<div class="bluesky-wrapper" style={`height: ${wrapper_height}`}>
		<iframe
			data-testid="bluesky-embed"
			title="Bluesky Post Embed"
			src={get_embed_url(post_id)}
			{width}
			frameborder="0"
			scrolling="no"
			style={`
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 0px;
				${iframe_styles}
			`}
		></iframe>
	</div>
</div>

<style>
	.bluesky-wrapper-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.bluesky-wrapper {
		position: relative;
		margin-bottom: 12px;
		max-width: 600px;
		min-width: 300px;
		width: 100%;
	}
</style>
