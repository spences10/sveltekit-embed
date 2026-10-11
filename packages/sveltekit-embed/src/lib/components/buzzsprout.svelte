<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		buzzsprout_id: string;
		width?: string;
		height?: string;
		disable_observer?: boolean;
	}

	let {
		buzzsprout_id,
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
			title={`buzzsprout-${buzzsprout_id}`}
			src={`https://www.buzzsprout.com/${buzzsprout_id}?client_source=admin&iframe=true`}
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
