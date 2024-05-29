<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		theme?: string;
		frameSrc?: string;
		height?: string;
		width?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		theme = 'auto',
		frameSrc = '',
		height = '300px',
		width = '100%',
		disable_observer = false,
		iframe_styles = `
			border-radius: 0.6rem;
			height: ${height};
			width: ${width};	
		`,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="deezer-widget"
		src={`https://widget.deezer.com/widget/${theme}/${frameSrc}`}
		frameborder="0"
		allowtransparency
		allow="encrypted-media; clipboard-write"
		style={iframe_styles}
	></iframe>
</GeneralObserver>
