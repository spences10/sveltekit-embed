<script lang="ts">
	interface Props {
		relive_id?: string;
		width?: string;
		loading?: 'lazy' | 'eager';
	}

	let {
		relive_id = '',
		width = '100%',
		loading = 'lazy',
	}: Props = $props();

	const defaultMargin: number = 2;
</script>

<div
	style={`
      position: relative;
      width: ${width};
      aspect-ratio: 1 / 0.7825;
      overflow: hidden;
    `}
>
	<iframe
		title={`relive-${relive_id}`}
		{loading}
		src={`https://www.relive.cc/view/${relive_id}/widget`}
		scrolling="no"
		allowfullscreen
		style={`
        position: absolute;
        top: -${defaultMargin}px;
        left: -${defaultMargin}px;
        width: calc(100% + ${defaultMargin * 2}px);
        height: calc(100% + ${defaultMargin * 2}px);
      `}
	></iframe>
</div>

<style>
	iframe {
		border: 0;
	}
</style>
