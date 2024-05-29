<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		height?: string;
		width?: string;
		codePenId?: string;
		tabs?: string[] | 'js' | 'css' | 'scss' | 'less' | 'result';
		clickToLoad?: boolean;
		editable?: boolean;
		theme?: string | 'light' | 'dark' | 'default';
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		height = '500px',
		width = '100%',
		codePenId = '',
		tabs = 'result',
		clickToLoad = true,
		editable = true,
		theme = 'default',
		disable_observer = false,
		iframe_styles = `
			height: ${height};
			width: ${width};	
		`,
	}: Props = $props();

	const baseUrl = `https://codepen.io/team/codepen/embed`;
	const src = `${baseUrl}/${
		clickToLoad ? '/preview' : ''
	}/${codePenId}/?height=${height}&theme-id=${theme}&default-tab=${tabs}&editable=${editable}`;
</script>

<GeneralObserver {disable_observer}>
	<iframe
		class="code-pen-sveltekit-embed"
		title={`codepen-${codePenId}`}
		{src}
		frameborder="no"
		allowfullscreen
		style={iframe_styles}
	></iframe>
</GeneralObserver>
