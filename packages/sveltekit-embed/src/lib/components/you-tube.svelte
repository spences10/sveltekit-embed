<script lang="ts">
	import { get_aspect_ratio } from '../utils/index.js';

	interface Props {
		youtube_id?: string;
		list_id?: string;
		index?: number;
		autoplay?: boolean;
		aspect_ratio?: string;
		skip_to?: { h?: number; m?: number; s?: number };
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
		mute?: boolean;
		controls?: boolean;
		loop?: boolean;
		modest_branding?: boolean;
		rel?: boolean;
	}

	let {
		youtube_id = '',
		list_id = '',
		index = 0,
		autoplay = false,
		aspect_ratio = '16:9',
		skip_to = { h: 0, m: 0, s: 0 },
		loading = 'lazy',
		iframe_styles = `
			border-radius: 0.6rem;
		`,
		mute = false,
		controls = true,
		loop = false,
		modest_branding = false,
		rel = false,
	}: Props = $props();

	const startTime = $derived(
		(skip_to.h ?? 0) * 60 * 60 +
			(skip_to.m ?? 0) * 60 +
			(skip_to.s ?? 0),
	);

	// cspell:ignore videoseries

	const baseUrl = `https://www.youtube-nocookie.com/embed/`;
	const src = $derived(
		`${baseUrl}${
			youtube_id.length > 0
				? `${youtube_id}?autoplay=${Number(autoplay)}&start=${startTime}&mute=${Number(mute)}&controls=${Number(controls)}&loop=${Number(loop)}&modestbranding=${Number(modest_branding)}&rel=${Number(rel)}`
				: `?videoseries&list=${list_id}&index=${index}&autoplay=${Number(autoplay)}&start=${startTime}&mute=${Number(mute)}&controls=${Number(controls)}&loop=${Number(loop)}&modestbranding=${Number(modest_branding)}&rel=${Number(rel)}`
		}`,
	);
</script>

<div
	style={`
    	position: relative;
    	width: 100%;
  	  ${get_aspect_ratio(aspect_ratio)}
  `}
>
	<iframe
		data-testid="youTube"
		title={`youTube-${list_id.length > 0 ? list_id : youtube_id}`}
		{loading}
		{src}
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

<style>
	iframe {
		border: 0;
	}
</style>
