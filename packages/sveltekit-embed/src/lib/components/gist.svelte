<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		width?: string;
		height?: string;
		gistUri?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		width = '100%',
		height = '320px',
		gistUri = '',
		disable_observer = false,
		iframe_styles = `
			height: ${height};
			width: ${width};
		`,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="gist-widget"
		src="https://gist.github.com/{gistUri}.pibb"
		style={iframe_styles}
	></iframe>
</GeneralObserver>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>
