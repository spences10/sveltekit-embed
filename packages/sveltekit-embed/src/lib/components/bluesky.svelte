<script lang="ts">
	interface Props {
		post_id?: string;
		theme?: 'light' | 'dark' | 'system';
		width?: string;
		iframe_styles?: string;
	}

	let {
		post_id = '',
		theme = 'light',
		width = '100%',
		iframe_styles = '',
	}: Props = $props();

	const uid = $props.id();
	const iframe_id = `bluesky-iframe-${uid}`;

	let wrapper_height = $state('174.5px');
	let iframe = $state<HTMLIFrameElement>();

	const src = $derived(
		`https://embed.bsky.app/embed/${post_id}?colorMode=${theme}`,
	);

	const handle_message = (event: MessageEvent) => {
		if (event.origin !== 'https://embed.bsky.app') return;
		if (typeof event.data !== 'object' || event.data === null) return;

		// Bluesky embeds don't say which post they are, so match the
		// message to this iframe by its window.
		if (event.source !== iframe?.contentWindow) return;

		wrapper_height = `${event.data.height || event.data.h || 500}px`;
	};
</script>

<svelte:window onmessage={handle_message} />

<div class="bluesky-wrapper-container">
	<div class="bluesky-wrapper" style={`height: ${wrapper_height}`}>
		<iframe
			bind:this={iframe}
			id={iframe_id}
			data-testid="bluesky-embed"
			title="Bluesky Post Embed"
			{src}
			{width}
			scrolling="no"
			style={`
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 0px;
				color-scheme: light;
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
