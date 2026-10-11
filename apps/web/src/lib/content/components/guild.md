<script>
	import { Guild } from 'sveltekit-embed';
</script>

```svelte live
<Guild
	type="guild"
	card_id="svelte-society-london"
	display_type="events/latest"
/>
```

`card_id` is the slug from the Guild URL. `type` says what the slug
belongs to, and `display_type` picks the view: a `card`, a single
`item`, or a list of events or presentations.

## A community card

```svelte
<Guild card_id="svelte-society-london" />
```
