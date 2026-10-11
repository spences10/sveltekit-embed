<script lang="ts">
	interface Props {
		episode_id?: string;
		theme?: string;
		loading?: 'lazy' | 'eager';
	}

	let {
		episode_id = '',
		theme = `dark`,
		loading = 'lazy',
	}: Props = $props();
</script>

<div
	class="simplecast-episode-svelte-embed"
	style={`
      position: relative;
      height: 200px;
      width: 100%;
    `}
>
	<iframe
		data-testid="simplecast-episode"
		title={`simplecast-${episode_id}`}
		{loading}
		src={`https://player.simplecast.com/${episode_id}${
			theme === `dark` ? `?dark=true` : ``
		}`}
		frameBorder="no"
		scrolling="no"
		seamless
		style={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
	></iframe>
</div>
