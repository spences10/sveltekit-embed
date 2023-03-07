<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let width: string = '576'
	export let height: string = '420'
	export let username: string = ''
	export let title: string = ''
	export let byline: 'hidden' | 'visible' | 'default' = 'hidden'
	export let share: 'hidden' | 'visible' | 'default' = 'hidden'
	export let style:
		| 'light'
		| 'dark'
		| 'hidden'
		| 'transparent'
		| 'default' = 'dark'

	let baseUrl = `https://slides.com/${username}/${title}/embed?`
	const config = {
		style,
		byline,
		share,
	}

	const queryString = new URLSearchParams(config)
	const src = `${baseUrl}&${queryString.toString()}`
</script>

<GeneralObserver {height} {width}>
	<iframe
		{src}
		{width}
		{height}
		{title}
		scrolling="no"
		frameborder="0"
		allowfullscreen
		style="width: 100%;"
	/>
</GeneralObserver>
