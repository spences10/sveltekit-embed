<script lang="ts">
	import type { Snippet } from 'svelte';
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		src: string;
		title: string;
		height: string;
		width: string;
		disable_observer: boolean;
		children: Snippet;
	}

	let {
		src = '',
		title = '',
		height = '152px',
		width = '100%',
		disable_observer = false,
		children,
		...rest
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<iframe {src} {width} {height} {title} {...rest}></iframe>
	{@render children?.()}
</GeneralObserver>
