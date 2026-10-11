<script lang="ts">
	interface Props {
		episode_url: string;
		height?: string;
		width?: string;
		loading?: 'lazy' | 'eager';
	}

	let {
		episode_url,
		height = '100px',
		width = '100%',
		loading = 'lazy',
	}: Props = $props();
</script>

<div
	class="anchor-fm-episode-svelte-embed"
	style={`
      position: relative;
      height: ${height};
      width: ${width};
    `}
>
	<iframe
		data-testid="anchor-fm-episode"
		title={`anchor-fm-${episode_url}`}
		{loading}
		src={`https://anchor.fm/${episode_url}`}
		scrolling="no"
		style={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
	></iframe>
</div>

<style>
	iframe {
		border: 0;
	}
</style>
