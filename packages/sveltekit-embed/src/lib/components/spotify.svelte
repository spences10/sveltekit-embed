<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		spotify_link?: string;
		width?: string;
		height?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		spotify_link = '',
		width = '100%',
		height = '152px',
		disable_observer = false,
		iframe_styles,
	}: Props = $props();

	const styles = $derived(
		iframe_styles ??
			`
			border-radius: 0.8rem;
			height: ${height};
			width: ${width};
		`,
	);
</script>

<GeneralObserver {disable_observer}>
	<iframe
		data-testid="spotify"
		title={`spotify-${spotify_link}`}
		class="spotify-sveltekit-embed"
		src={`https://open.spotify.com/embed/${spotify_link}`}
		frameBorder="0"
		allow="encrypted-media"
		style={styles}
	></iframe>
</GeneralObserver>
