<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let width = '100%'
	export let height = '320px'
	export let gistUri = ''
	export let disable_observer: boolean = false
	export let iframe_styles: string = `
		height: ${height};
		width: ${width};
	`
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="gist-widget"
		src="https://gist.github.com/{gistUri}.pibb"
		style={iframe_styles}
	/>
</GeneralObserver>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
	}
</style>
