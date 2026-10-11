<script lang="ts">
	interface Props {
		buzzsprout_id: string;
		width?: string;
		height?: string;
		loading?: 'lazy' | 'eager';
	}

	let {
		buzzsprout_id,
		width = '100%',
		height = '200px',
		loading = 'lazy',
	}: Props = $props();
</script>

<div
	class="buzzsprout-sveltekit-embed"
	style={`
      position: relative; 
      height: ${height};
      width: ${width};
    `}
>
	<iframe
		data-testid="buzzsprout"
		title={`buzzsprout-${buzzsprout_id}`}
		{loading}
		src={`https://www.buzzsprout.com/${buzzsprout_id}?client_source=admin&iframe=true`}
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
