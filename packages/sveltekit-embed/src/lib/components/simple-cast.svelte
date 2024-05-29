<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		episodeId?: string;
		theme?: string;
		disable_observer?: boolean;
	}

	let {
		episodeId = '',
		theme = `dark`,
		disable_observer = false,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
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
			title={`simplecast-${episodeId}`}
			src={`https://player.simplecast.com/${episodeId}${
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
</GeneralObserver>
