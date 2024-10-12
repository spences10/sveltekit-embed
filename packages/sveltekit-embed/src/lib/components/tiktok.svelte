<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		tiktokId: string;
		width?: string;
		height?: string;
		controls?: boolean;
		progress_bar?: boolean;
		play_button?: boolean;
		volume_control?: boolean;
		fullscreen_button?: boolean;
		timestamp?: boolean;
		loop?: boolean;
		autoplay?: boolean;
		music_info?: boolean;
		description?: boolean;
		rel?: boolean;
		native_context_menu?: boolean;
		closed_caption?: boolean;
		disable_observer?: boolean;
	}

	let {
		tiktokId,
		width = '100%',
		height = '600px',
		controls = true,
		progress_bar = true,
		play_button = true,
		volume_control = true,
		fullscreen_button = true,
		timestamp = true,
		loop = false,
		autoplay = false,
		music_info = false,
		description = false,
		rel = true,
		native_context_menu = true,
		closed_caption = true,
		disable_observer = false,
	}: Props = $props();

	const query_params = new URLSearchParams({
		controls: controls ? '1' : '0',
		progress_bar: progress_bar ? '1' : '0',
		play_button: play_button ? '1' : '0',
		volume_control: volume_control ? '1' : '0',
		fullscreen_button: fullscreen_button ? '1' : '0',
		timestamp: timestamp ? '1' : '0',
		loop: loop ? '1' : '0',
		autoplay: autoplay ? '1' : '0',
		music_info: music_info ? '1' : '0',
		description: description ? '1' : '0',
		rel: rel ? '1' : '0',
		native_context_menu: native_context_menu ? '1' : '0',
		closed_caption: closed_caption ? '1' : '0',
	});

	const src = `https://www.tiktok.com/player/v1/${tiktokId}?${query_params.toString()}`;
</script>

<GeneralObserver {disable_observer}>
	<div
		class="tiktok-sveltekit-embed"
		style={`
      position: relative;
      width: ${width};
      height: ${height};
    `}
	>
		<iframe
			data-testid="tiktok-embed"
			title={`tiktok-${tiktokId}`}
			{src}
			frameborder="0"
			scrolling="no"
			allow="encrypted-media; picture-in-picture; fullscreen"
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
