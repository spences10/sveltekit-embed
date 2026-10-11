<script lang="ts">
	type Config = {
		[key: string]: string;
	};

	interface Props {
		width?: string;
		height?: string;
		id?: string;
		view?: 'editor' | 'preview' | 'default';
		click_to_load?: boolean;
		hide_navigation?: boolean;
		hide_explorer?: boolean;
		theme?: string | 'light' | 'dark' | 'default';
		file?: string;
		loading?: 'lazy' | 'eager';
		iframe_styles?: string;
	}

	let {
		width = '100%',
		height = '500px',
		id = '',
		view = 'default',
		click_to_load = true,
		hide_navigation = false,
		hide_explorer = true,
		theme = 'dark',
		file,
		loading = 'lazy',
		iframe_styles,
	}: Props = $props();

	const styles = $derived(
		iframe_styles ??
			`
			height: ${height};
			width: ${width};
		`,
	);

	const src = $derived.by(() => {
		const config: Config = {
			ctl: `${click_to_load ? 1 : 0}`,
			hideExplorer: `${hide_explorer ? 1 : 0}`,
			hideNavigation: `${hide_navigation ? 1 : 0}`,
			theme,
		};
		if (view !== 'default') {
			config['view'] = view;
		}
		if (file) {
			config['file'] = file;
		}
		const queryString = new URLSearchParams(config);
		return `https://stackblitz.com/edit/${id}?embed=1&${queryString.toString()}`;
	});
</script>

<iframe
	class="stackblitz-sveltekit-embed"
	title={`stackblitz-${id}`}
	{loading}
	{src}
	allowfullscreen
	style={styles}
></iframe>

<style>
	iframe {
		border: 0;
	}
</style>
