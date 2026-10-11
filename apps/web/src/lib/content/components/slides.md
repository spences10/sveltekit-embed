<script>
	import { Slides } from 'sveltekit-embed';
</script>

```svelte live
<Slides
	username="spences10"
	title="building-with-sveltekit-and-graphql"
/>
```

For a deck at
`slides.com/spences10/building-with-sveltekit-and-graphql`, `username`
is the first part and `title` the second.

## Show the byline and share button

Both are hidden by default.

```svelte
<Slides
	username="spences10"
	title="building-with-sveltekit-and-graphql"
	byline="visible"
	share="visible"
	style="light"
/>
```
