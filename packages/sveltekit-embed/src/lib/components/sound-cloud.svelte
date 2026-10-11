<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		soundcloud_link?: string;
		width?: string;
		height?: string;
		show_visual?: boolean;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		soundcloud_link = '',
		width = '100%',
		height = '300px',
		show_visual = true,
		disable_observer = false,
		iframe_styles = '',
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe
		{width}
		{height}
		title={`soundcloud-${soundcloud_link}`}
		scrolling="false"
		frameborder="0"
		allow="autoplay"
		src="https://w.soundcloud.com/player/?url={soundcloud_link}&visual={show_visual}"
		style={iframe_styles}
	></iframe>
</GeneralObserver>
