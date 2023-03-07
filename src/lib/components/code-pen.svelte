<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let width: string = '100'
	export let height: string = '500'
	export let codePenId: string = ''
	export let tabs:
		| string[]
		| 'js'
		| 'css'
		| 'scss'
		| 'less'
		| 'result' = 'result'
	export let clickToLoad: boolean = true
	export let editable: boolean = true
	export let theme: string | 'light' | 'dark' | 'default' = 'default'

	const baseUrl = `https://codepen.io/team/codepen/embed`
	const src = `${baseUrl}/${
		clickToLoad ? '/preview' : ''
	}/${codePenId}/?height=${height}&theme-id=${theme}&default-tab=${tabs}&editable=${editable}`
</script>

<GeneralObserver {height} {width}>
	<iframe
		{height}
		class="code-pen-sveltekit-embed"
		title={`codepen-${codePenId}`}
		{src}
		frameborder="no"
		allowfullscreen
		style={`
      width: 100%;
    `}
	/>
</GeneralObserver>
