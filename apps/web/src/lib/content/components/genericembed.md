<script>
	import { GenericEmbed } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore Zrzbx -->

```svelte live
<GenericEmbed
	src="https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5"
	title="Syntax on Spotify"
	height="152px"
	allow="encrypted-media"
	style="border-radius: 0.9rem;"
/>
```

Use this when a platform does not have its own component. It renders
an iframe with the same lazy loading as the rest, and passes every
other attribute you give it straight to the iframe.

## Your own markup

Anything inside the component is rendered beside the iframe, for a
caption or a fallback link.

```svelte
<GenericEmbed src="https://example.com/embed/123" title="Example">
	<a href="https://example.com/123">Open on example.com</a>
</GenericEmbed>
```
