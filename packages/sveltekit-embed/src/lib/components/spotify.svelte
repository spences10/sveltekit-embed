<script lang="ts">
	interface Props {
		spotify_link?: string;
		width?: string;
		height?: string;
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
	}

	let {
		spotify_link = '',
		width = '100%',
		height = '152px',
		loading = 'lazy',
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

<iframe
	data-testid="spotify"
	title={`spotify-${spotify_link}`}
	class="spotify-sveltekit-embed"
	{loading}
	src={`https://open.spotify.com/embed/${spotify_link}`}
	frameBorder="0"
	allow="encrypted-media"
	style={styles}
></iframe>
