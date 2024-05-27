<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let spotifyLink: string = ''
	export let width: string = '100%'
	export let height: string = '152px'
	export let disable_observer: boolean = false
	export let iframe_styles: string = `
		border-radius: 0.8rem;
		height: ${height};
		width: ${width};
	`
</script>

<GeneralObserver {disable_observer}>
	<iframe
		data-testid="spotify"
		title={`spotify-${spotifyLink}`}
		class="spotify-sveltekit-embed"
		src={`https://open.spotify.com/embed/${spotifyLink}`}
		frameBorder="0"
		allow="encrypted-media"
		style={iframe_styles}
	/>
</GeneralObserver>
