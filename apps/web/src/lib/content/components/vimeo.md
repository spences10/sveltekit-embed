<script>
	import { Vimeo } from 'sveltekit-embed';
</script>

```svelte live
<Vimeo vimeo_id="246846978" />
```

`vimeo_id` is the number at the end of the video's URL.

## Aspect ratio and start time

The player keeps a `16:9` shape at any width. Change it with
`aspect_ratio`, and start part way through with `skip_to`.

```svelte
<Vimeo
	vimeo_id="246846978"
	aspect_ratio="4:3"
	skip_to={{ m: 1, s: 30 }}
/>
```
