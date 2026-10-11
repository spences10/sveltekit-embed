<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		relive_id?: string;
		width?: string;
		disable_observer?: boolean;
	}

	let {
		relive_id = '',
		width = '100%',
		disable_observer = false,
	}: Props = $props();

	const defaultMargin: number = 2;
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
			title={`relive-${relive_id}`}
			src={`https://www.relive.cc/view/${relive_id}/widget`}
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
		></iframe>
	</div>
</GeneralObserver>
