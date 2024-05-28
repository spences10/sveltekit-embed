<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		episodeUrl: string;
		height?: string;
		width?: string;
		disable_observer?: boolean;
	}

	let {
		episodeUrl,
		height = '100px',
		width = '100%',
		disable_observer = false,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
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
			title={`anchor-fm-${episodeUrl}`}
			src={`https://anchor.fm/${episodeUrl}`}
			frameborder="0"
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
</GeneralObserver>
