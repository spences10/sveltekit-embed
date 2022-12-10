<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let gistUri = '';
    
	let frame: HTMLIFrameElement;
    let height = 500;
	let initialized = false;

	function t() {
		setTimeout(() => {
			if (!initialized && frame) {
			frame.srcdoc = `<script src='https://gist.github.com/${gistUri}.js'><${''}/script>`;
			frame.onload = () => {
				initialized = true;
                height = (frame.contentWindow?.document?.body?.scrollHeight || 0) + 25;
				frame.style.height = height + 'px';
			};
		}
		})
	};
</script>

<GeneralObserver height="{height.toFixed()}" on:enterViewport={t}>
    <iframe bind:this={frame} title="gist-widget" />
</GeneralObserver>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>