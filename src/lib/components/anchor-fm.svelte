<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let episodeUrl: string
	export let height: string = '100px'
	export let width: string = '100%'
	export let disable_observer: boolean = false
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
		/>
	</div>
</GeneralObserver>
