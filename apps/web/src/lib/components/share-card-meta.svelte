<script lang="ts">
	import { site } from '#lib/config.js';
</script>

<!-- svead sets og:image. These tell platforms its size up front, so
     they can lay the card out before fetching it -->
<svelte:head>
	<meta property="og:image:type" content="image/png" />
	<meta
		property="og:image:width"
		content={String(site.share_card.width)}
	/>
	<meta
		property="og:image:height"
		content={String(site.share_card.height)}
	/>
</svelte:head>
