<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let reliveId: string = ''
	export let width: string = '100%'
	export let disable_observer: boolean = false

	const defaultMargin: number = 2
</script>

<GeneralObserver {disable_observer}>
	<div
		style={`
      position: relative;
      width: ${width};
      aspect-ratio: 1 / 0.7825;
      overflow: hidden;
    `}
	>
		<iframe
			title={`relive-${reliveId}`}
			src={`https://www.relive.cc/view/${reliveId}/widget`}
			scrolling="no"
			frameborder="0"
			allowfullscreen
			style={`
        position: absolute;
        top: -${defaultMargin}px;
        left: -${defaultMargin}px;
        width: calc(100% + ${defaultMargin * 2}px);
        height: calc(100% + ${defaultMargin * 2}px);
      `}
		/>
	</div>
</GeneralObserver>
