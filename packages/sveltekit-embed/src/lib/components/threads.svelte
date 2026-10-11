<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	interface Props {
		post_id?: string;
		theme?: 'light' | 'dark' | 'auto';
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
	const iframe_id = `threads-iframe-${uid}`;

	const trusted_origins = [
		'https://www.threads.com',
		'https://www.threads.net',
	];

	let wrapper_height = $state('400px');

	// Threads only reads the theme param for dark and auto, light is
	// the embed's default.
	const src = $derived(
		`https://www.threads.com/t/${post_id}/embed/${
			theme === 'light' ? '' : `?theme=${theme}`
		}`,
	);

	const resize_to_post: Attachment<HTMLIFrameElement> = (node) => {
		const handle_message = (event: MessageEvent) => {
			if (!trusted_origins.includes(event.origin)) return;

			// Threads embeds don't say which post they are, so match the
			// message to this iframe by its window.
			if (event.source !== node.contentWindow) return;

			// The embed posts its height as a bare number.
			const height = Number(event.data);
			if (!Number.isFinite(height) || height <= 0) return;

			wrapper_height = `${height}px`;
		};

		window.addEventListener('message', handle_message);
		return () =>
			window.removeEventListener('message', handle_message);
	};
</script>

<div class="threads-wrapper-container">
	<div class="threads-wrapper" style={`height: ${wrapper_height}`}>
		<iframe
			{@attach resize_to_post}
			id={iframe_id}
			data-testid="threads-embed"
			title="Threads Post Embed"
			{src}
			{width}
			scrolling="no"
			allowfullscreen
			style={`
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 0px;
				border-radius: 12px;
				${iframe_styles}
			`}
		></iframe>
	</div>
</div>

<style>
	.threads-wrapper-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.threads-wrapper {
		position: relative;
		margin-bottom: 12px;
		max-width: 658px;
		min-width: 270px;
		width: 100%;
	}
</style>
