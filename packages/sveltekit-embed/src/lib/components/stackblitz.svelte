<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	type Config = {
		[key: string]: string;
	};

	interface Props {
		width?: string;
		height?: string;
		id?: string;
		view?: 'editor' | 'preview' | 'default';
		clickToLoad?: boolean;
		hideNavigation?: boolean;
		hideExplorer?: boolean;
		theme?: string | 'light' | 'dark' | 'default';
		file: string | undefined;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		width = '100%',
		height = '500px',
		id = '',
		view = 'default',
		clickToLoad = true,
		hideNavigation = false,
		hideExplorer = true,
		theme = 'dark',
		file,
		disable_observer = false,
		iframe_styles = `
			height: ${height};
			width: ${width};
		`,
	}: Props = $props();

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
