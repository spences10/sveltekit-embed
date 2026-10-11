<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLIframeAttributes } from 'svelte/elements';

	interface Props extends HTMLIframeAttributes {
		src?: string;
		title?: string;
		height?: string;
		width?: string;
		loading?: 'lazy' | 'eager';
		children?: Snippet;
	}

	let {
		src = '',
		title = '',
		height = '152px',
		width = '100%',
		loading = 'lazy',
		children,
		...rest
	}: Props = $props();
</script>

<iframe {loading} {src} {width} {height} {title} {...rest}></iframe>
{@render children?.()}
