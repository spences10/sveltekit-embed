<script lang="ts">
	import { getPadding } from '../utils/index.js';

	interface Props {
		vimeo_id?: string;
		autoplay?: boolean;
		aspect_ratio?: string;
		skip_to?: { h?: number; m?: number; s?: number };
		loading?: 'lazy' | 'eager';
	}

	let {
		vimeo_id = '',
		autoplay = false,
		aspect_ratio = '16:9',
		skip_to = { h: 0, m: 0, s: 0 },
		loading = 'lazy',
	}: Props = $props();

	const src = $derived(
		`https://player.vimeo.com/video/${vimeo_id}?autoplay=${autoplay}#t=${skip_to.h ?? 0}h${skip_to.m ?? 0}m${skip_to.s ?? 0}s`,
	);
</script>

<div
	data-testid="vimeo"
	class="vimeo-svelte-embed"
	style={`
    	position: relative;
    	width: 100%;
   		${getPadding(aspect_ratio)}
  `}
>
	<iframe
		title={`vimeo-${vimeo_id}`}
		{loading}
		{src}
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
