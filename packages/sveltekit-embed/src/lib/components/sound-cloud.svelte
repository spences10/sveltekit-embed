<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		soundcloudLink?: string;
		width?: string;
		height?: string;
		showVisual?: boolean;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		soundcloudLink = '',
		width = '100%',
		height = '300px',
		showVisual = true,
		disable_observer = false,
		iframe_styles = '',
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe
		{width}
		{height}
		title={`soundcloud-${soundcloudLink}`}
		scrolling="false"
		frameborder="0"
		allow="autoplay"
		src="https://w.soundcloud.com/player/?url={soundcloudLink}&visual={showVisual}"
		style={iframe_styles}
	></iframe>
</GeneralObserver>
