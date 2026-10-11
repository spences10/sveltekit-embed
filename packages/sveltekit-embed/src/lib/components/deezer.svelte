<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		theme?: string;
		frame_src?: string;
		height?: string;
		width?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		theme = 'auto',
		frame_src = '',
		height = '300px',
		width = '100%',
		disable_observer = false,
		iframe_styles,
	}: Props = $props();

	const styles = $derived(
		iframe_styles ??
			`
			border-radius: 0.6rem;
			height: ${height};
			width: ${width};
		`,
	);
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="deezer-widget"
		src={`https://widget.deezer.com/widget/${theme}/${frame_src}`}
		frameborder="0"
		allowtransparency
		allow="encrypted-media; clipboard-write"
		style={styles}
	></iframe>
</GeneralObserver>
