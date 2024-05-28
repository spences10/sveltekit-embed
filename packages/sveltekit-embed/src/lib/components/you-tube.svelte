<script lang="ts">
	import { getPadding } from '$lib/utils/index.js';
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		youTubeId?: string;
		listId?: string;
		autoPlay?: boolean;
		aspectRatio?: string;
		skipTo?: any;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		youTubeId = '',
		listId = '',
		autoPlay = false,
		aspectRatio = '16:9',
		skipTo = { h: 0, m: 0, s: 0 },
		disable_observer = false,
		iframe_styles = `
			border-radius: 0.6rem;
		`,
	}: Props = $props();

	const { h, m, s } = skipTo;

	const tH = h * 60 * 60;
	const tM = m * 60;

	const startTime = tH + tM + s;

	// cspell:ignore videoseries

	const baseUrl = `https://www.youtube-nocookie.com/embed/`;
	const src = `${baseUrl}${
		youTubeId.length > 0
			? `${youTubeId}?autoplay=${autoPlay}&start=${startTime}`
			: `?videoseries?list=${listId}`
	}`;
</script>

<GeneralObserver {disable_observer}>
	<div
		style={`
    	position: relative;
    	width: 100%;
  	  ${getPadding(aspectRatio)}
  `}
	>
		<iframe
			data-testid="youTube"
			title={`youTube-${listId.length > 0 ? listId : youTubeId}`}
			{src}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			style={`
	      position: absolute;
  	    top: 0;
    	  left: 0;
      	width: 100%;
      	height: 100%;
				${iframe_styles}
    `}
		></iframe>
	</div>
</GeneralObserver>
