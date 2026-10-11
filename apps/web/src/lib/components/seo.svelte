<script lang="ts">
	import { site } from '#lib/config.js';
	import { seo_config, type PageSeo } from '#lib/seo.js';
	import { Head, SchemaOrg, type SchemaOrgProps } from 'svead';

	// Every page's head goes through here: svead's meta tags, the
	// share card's size and the page's structured data
	let {
		page,
		schema,
	}: { page: PageSeo; schema: SchemaOrgProps['schema'] } = $props();
</script>

<Head seo_config={seo_config(page)} />
<SchemaOrg {schema} />

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
