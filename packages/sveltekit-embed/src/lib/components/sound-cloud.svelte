<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	export let soundcloudLink: string = '';
	export let width: string = '100%';
	export let height: string = '300px';
	export let showVisual: boolean = true;
	export let disable_observer: boolean = false;
	export let iframe_styles: string = '';
</script>

<GeneralObserver {disable_observer}>
	<iframe
		{width}
		{height}
		title={`soundcloud-${soundcloudLink}`}
		scrolling="false"
		frameborder="0"
		allow="autoplay"
		src="https://w.soundcloud.com/player/?url={soundcloudLink}&visual={showVisual}"
		style={iframe_styles}
	></iframe>
</GeneralObserver>
