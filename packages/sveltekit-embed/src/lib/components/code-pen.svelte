<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		height?: string;
		width?: string;
		codepen_id?: string;
		tabs?: string[] | 'js' | 'css' | 'scss' | 'less' | 'result';
		click_to_load?: boolean;
		editable?: boolean;
		theme?: string | 'light' | 'dark' | 'default';
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		height = '500px',
		width = '100%',
		codepen_id = '',
		tabs = 'result',
		click_to_load = true,
		editable = true,
		theme = 'default',
		disable_observer = false,
		iframe_styles,
	}: Props = $props();

	const styles = $derived(
		iframe_styles ??
			`
			height: ${height};
			width: ${width};	
		`,
	);

	const baseUrl = `https://codepen.io/team/codepen/embed`;
	const src = $derived(
		`${baseUrl}/${
			click_to_load ? '/preview' : ''
		}/${codepen_id}/?height=${height}&theme-id=${theme}&default-tab=${tabs}&editable=${editable}`,
	);
</script>

<GeneralObserver {disable_observer}>
	<iframe
		class="code-pen-sveltekit-embed"
		title={`codepen-${codepen_id}`}
		{src}
		frameborder="no"
		allowfullscreen
		style={styles}
	></iframe>
</GeneralObserver>
