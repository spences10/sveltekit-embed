<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let episodeId: string = ''
	export let theme: string = `dark`
</script>

<GeneralObserver>
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
		/>
	</div>
</GeneralObserver>
