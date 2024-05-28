<script lang="ts">
	import { getPadding } from '$lib/utils/index.js';
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		vimeoId?: string;
		autoPlay?: boolean;
		aspectRatio?: string;
		skipTo?: any;
		disable_observer?: boolean;
	}

	let {
		vimeoId = '',
		autoPlay = false,
		aspectRatio = '16:9',
		skipTo = { h: 0, m: 0, s: 0 },
		disable_observer = false,
	}: Props = $props();

	const { h, m, s } = skipTo;
</script>

<GeneralObserver {disable_observer}>
	<div
		data-testid="vimeo"
		class="vimeo-svelte-embed"
		style={`
    	position: relative;
    	width: 100%;
   		${getPadding(aspectRatio)}
  `}
	>
		<iframe
			title={`vimeo-${vimeoId}`}
			src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay}#t=${h}h${m}m${s}s`}
			frameBorder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowFullScreen
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
