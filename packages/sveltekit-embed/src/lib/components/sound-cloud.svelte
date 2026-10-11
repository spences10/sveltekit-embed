<script lang="ts">
	interface Props {
		soundcloud_link?: string;
		width?: string;
		height?: string;
		show_visual?: boolean;
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
	}

	let {
		soundcloud_link = '',
		width = '100%',
		height = '300px',
		show_visual = true,
		loading = 'lazy',
		iframe_styles = '',
	}: Props = $props();
</script>

<iframe
	{width}
	{height}
	title={`soundcloud-${soundcloud_link}`}
	scrolling="false"
	frameborder="0"
	allow="autoplay"
	{loading}
	src="https://w.soundcloud.com/player/?url={soundcloud_link}&visual={show_visual}"
	style={iframe_styles}
></iframe>
