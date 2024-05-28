<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		buzzsproutId: string;
		width?: string;
		height?: string;
		disable_observer?: boolean;
	}

	let {
		buzzsproutId,
		width = '100%',
		height = '200px',
		disable_observer = false,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<div
		class="buzzsprout-sveltekit-embed"
		style={`
      position: relative; 
      height: ${height};
      width: ${width};
    `}
	>
		<iframe
			data-testid="buzzsprout"
			title={`buzzsprout-${buzzsproutId}`}
			src={`https://www.buzzsprout.com/${buzzsproutId}?client_source=admin&amp;iframe=true`}
			frameBorder="0"
			scrolling="no"
			style={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
		></iframe>
	</div>
</GeneralObserver>
