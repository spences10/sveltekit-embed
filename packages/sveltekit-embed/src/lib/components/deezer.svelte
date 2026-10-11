<script lang="ts">
	interface Props {
		theme?: string;
		frame_src?: string;
		height?: string;
		width?: string;
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
	}

	let {
		theme = 'auto',
		frame_src = '',
		height = '300px',
		width = '100%',
		loading = 'lazy',
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

<iframe
	title="deezer-widget"
	{loading}
	src={`https://widget.deezer.com/widget/${theme}/${frame_src}`}
	frameborder="0"
	allowtransparency
	allow="encrypted-media; clipboard-write"
	style={styles}
></iframe>
