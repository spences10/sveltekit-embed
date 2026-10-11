<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		username?: string;
		title?: string;
		byline?: 'hidden' | 'visible' | 'default';
		share?: 'hidden' | 'visible' | 'default';
		style?: 'light' | 'dark' | 'hidden' | 'transparent' | 'default';
		loading?: 'lazy' | 'eager';
	}

	let {
		width = '100%',
		height = '420px',
		username = '',
		title = '',
		byline = 'hidden',
		share = 'hidden',
		style = 'dark',
		loading = 'lazy',
	}: Props = $props();

	const src = $derived.by(() => {
		const queryString = new URLSearchParams({ style, byline, share });
		return `https://slides.com/${username}/${title}/embed?&${queryString.toString()}`;
	});
</script>

<iframe
	{loading}
	{src}
	{width}
	{height}
	{title}
	scrolling="no"
	allowfullscreen
	style="width: 100%;"
></iframe>

<style>
	iframe {
		border: 0;
	}
</style>
