<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		gist_uri?: string;
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
	}

	let {
		width = '100%',
		height = '320px',
		gist_uri = '',
		loading = 'lazy',
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

<iframe
	title="gist-widget"
	{loading}
	src="https://gist.github.com/{gist_uri}.pibb"
	style={styles}
></iframe>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>
