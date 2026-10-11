<script>
	import { Threads } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore DePOFVxEe_o,Vx,Ee -->

```svelte live
<Threads post_id="DePOFVxEe_o" />
```

The `post_id` is the end of the post's link. For
`https://www.threads.com/@threads/post/DePOFVxEe_o` it is
`DePOFVxEe_o`.

The embed reports its own height, so the component resizes to fit the
post. It loads in its own way and does not take a `loading` prop.

## Dark and auto themes

Set `theme` to `dark`, or to `auto` to follow the visitor's
preference.

```svelte live
<Threads theme="dark" post_id="DePOFVxEe_o" />
```
