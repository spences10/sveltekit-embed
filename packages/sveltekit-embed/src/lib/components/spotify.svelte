<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		spotifyLink?: string;
		width?: string;
		height?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		spotifyLink = '',
		width = '100%',
		height = '152px',
		disable_observer = false,
		iframe_styles = `
			border-radius: 0.8rem;
			height: ${height};
			width: ${width};
		`,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe
		data-testid="spotify"
		title={`spotify-${spotifyLink}`}
		class="spotify-sveltekit-embed"
		src={`https://open.spotify.com/embed/${spotifyLink}`}
		frameBorder="0"
		allow="encrypted-media"
		style={iframe_styles}
	></iframe>
</GeneralObserver>
