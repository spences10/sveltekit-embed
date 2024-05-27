<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	export let src: string = '';
	export let title: string = '';
	export let height: string = '152px';
	export let width: string = '100%';
	export let disable_observer: boolean = false;
</script>

<GeneralObserver {disable_observer}>
	<iframe {src} {width} {height} {title} {...$$restProps}></iframe>
	<slot />
</GeneralObserver>
