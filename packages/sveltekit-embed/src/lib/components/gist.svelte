<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		width?: string;
		height?: string;
		gist_uri?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		width = '100%',
		height = '320px',
		gist_uri = '',
		disable_observer = false,
		iframe_styles,
	}: Props = $props();

	const styles = $derived(
		iframe_styles ??
			`
			height: ${height};
			width: ${width};
		`,
	);
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="gist-widget"
		src="https://gist.github.com/{gist_uri}.pibb"
		style={styles}
	></iframe>
</GeneralObserver>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>
