<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		width?: string;
		height?: string;
		username?: string;
		title?: string;
		byline?: 'hidden' | 'visible' | 'default';
		share?: 'hidden' | 'visible' | 'default';
		style?: 'light' | 'dark' | 'hidden' | 'transparent' | 'default';
		disable_observer?: boolean;
	}

	let {
		width = '100%',
		height = '420px',
		username = '',
		title = '',
		byline = 'hidden',
		share = 'hidden',
		style = 'dark',
		disable_observer = false,
	}: Props = $props();

	let baseUrl = `https://slides.com/${username}/${title}/embed?`;
	const config = {
		style,
		byline,
		share,
	};

	const queryString = new URLSearchParams(config);
	const src = `${baseUrl}&${queryString.toString()}`;
</script>

<GeneralObserver {disable_observer}>
	<iframe
		{src}
		{width}
		{height}
		{title}
		scrolling="no"
		frameborder="0"
		allowfullscreen
		style="width: 100%;"
	></iframe>
</GeneralObserver>
