<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let theme: string = 'auto'
	export let frameSrc: string = ''
	export let height: string = '300px'
	export let width: string = '100%'
	export let disable_observer: boolean = false
	export let iframe_styles: string = `
		border-radius: 0.6rem;
		height: ${height};
		width: ${width};	
	`
</script>

<GeneralObserver {disable_observer}>
	<iframe
		title="deezer-widget"
		src={`https://widget.deezer.com/widget/${theme}/${frameSrc}`}
		frameborder="0"
		allowtransparency
		allow="encrypted-media; clipboard-write"
		style={iframe_styles}
	/>
</GeneralObserver>
