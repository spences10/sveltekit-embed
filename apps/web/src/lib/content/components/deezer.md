<script>
	import { Deezer } from 'sveltekit-embed';
</script>

```svelte live
<Deezer frame_src="show/496882" />
```

`frame_src` is the type of content and its ID, as they appear in the
Deezer URL: `show/496882`, `album/302127` or `playlist/1479458365`.

## Match your theme

The player follows the visitor's preference with `theme="auto"`. Set
`light` or `dark` to fix it.

```svelte
<Deezer frame_src="show/496882" theme="dark" height="200px" />
```
