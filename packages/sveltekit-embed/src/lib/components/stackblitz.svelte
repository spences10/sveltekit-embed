<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	type Config = {
		[key: string]: string;
	};

	export let width: string = '100%';
	export let height: string = '500px';
	export let id: string = '';
	export let view: 'editor' | 'preview' | 'default' = 'default';
	export let clickToLoad: boolean = true;
	export let hideNavigation: boolean = false;
	export let hideExplorer: boolean = true;
	export let theme: string | 'light' | 'dark' | 'default' = 'dark';
	export let file: string | undefined;
	export let disable_observer: boolean = false;
	export let iframe_styles: string = `
		height: ${height};
		width: ${width};
	`;

	let baseUrl = `https://stackblitz.com/edit/${id}?embed=1`;
	const config: Config = {
		ctl: `${clickToLoad ? 1 : 0}`,
		hideExplorer: `${hideExplorer ? 1 : 0}`,
		hideNavigation: `${hideNavigation ? 1 : 0}`,
		theme,
	};
	if (view !== 'default') {
		config['view'] = view;
	}
	if (file) {
		config['file'] = file;
	}
	const queryString = new URLSearchParams(config);
	const src = `${baseUrl}&${queryString.toString()}`;
</script>

<GeneralObserver {disable_observer}>
	<iframe
		class="stackblitz-sveltekit-embed"
		title={`stackblitz-${id}`}
		{src}
		frameborder="no"
		allowfullscreen
		style={iframe_styles}
	></iframe>
</GeneralObserver>
