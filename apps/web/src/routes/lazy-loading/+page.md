<script>
	import ShareCardMeta from '#lib/components/share-card-meta.svelte';
	import { share_card_url, site } from '#lib/config.js';
	import { in_view } from 'sveltekit-embed';
	import { Head } from 'svead';

	let visible = $state(false);
	const status = $derived(
		visible
			? 'rendered when you scrolled it into view'
			: 'not in view yet',
	);
</script>

<Head
	seo_config={{
		title: 'Lazy loading | SvelteKit Embed',
		description:
			'How sveltekit-embed components lazy load, how to load one eagerly, and how to lazy load your own markup with the in_view attachment.',
		url: `${site.url}/lazy-loading`,
		website: site.url,
		open_graph_image: share_card_url('lazy-loading'),
		open_graph_image_alt:
			'Lazy loading. How embeds load, and the in_view attachment.',
		twitter_card_type: 'summary_large_image',
	}}
/>
<ShareCardMeta />

<article class="site-width py-10 lg:py-14">
<div class="doc prose mx-auto max-w-3xl">

# Lazy loading

Every iframe embed sets `loading="lazy"`, so the browser only loads it
when it is close to the viewport. The iframe is still in the page from
the first render, so it holds its space while you scroll and nothing
jumps as embeds arrive.

## Load one straight away

Pass `loading="eager"` to any iframe embed. Do this for an embed at
the top of a page, where waiting for the browser to decide only delays
it.

```svelte
<YouTube youtube_id="dQw4w9WgXcQ" loading="eager" />
```

## Embeds without a `loading` prop

[Bluesky](/components/bluesky), [Threads](/components/threads),
[Tweet](/components/tweet), [Toot](/components/toot) and
[Zencastr](/components/zencastr) load in their own way, through the
platform's script or a frame that sizes itself, and do not take a
`loading` prop.

## Lazy load your own markup

The package also exports `in_view`, the attachment to reach for when
you want the same behaviour for something that is not an iframe. It
calls `on_enter` when the element reaches the viewport.

```svelte {4,7}
<script>
	import { in_view } from 'sveltekit-embed';

	let visible = $state(false);
</script>

<div {@attach in_view({ on_enter: () => (visible = true) })}>
	{#if visible}
		<!-- your content -->
	{/if}
</div>
```

This box uses it. It was {status}.

<div
	class="not-prose rounded-box border border-base-300 bg-base-200 p-6 font-mono text-sm"
	{@attach in_view({ on_enter: () => (visible = true) })}
>
	visible = {visible}
</div>

## Options

```ts
interface InViewOptions {
	/** Called when the element enters the viewport. */
	on_enter: (entry: IntersectionObserverEntry) => void;
	/** Called when the element leaves the viewport. */
	on_leave?: (entry: IntersectionObserverEntry) => void;
	/** How much of the element must be visible, from 0 to 1. */
	threshold?: number;
	/** Margin around the viewport, as a CSS margin string. */
	root_margin?: string;
	/** Stop observing after the first `on_enter`. */
	once?: boolean;
}
```

`threshold` defaults to `0`, `root_margin` to `'0px'` and `once` to
`true`. Set `once` to `false` with an `on_leave` to track an element
going in and out of view, and a `root_margin` such as `'200px'` to
start loading a little before it arrives.

</div>
</article>
