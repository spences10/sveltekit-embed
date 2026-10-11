<script>
	import { Gist } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore Ennoriel -->

```svelte live
<Gist gist_uri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77" />
```

`gist_uri` is the username and the gist ID, the part of the gist's URL
after `gist.github.com/`.

The gist scrolls inside the frame. Set `height` to show more or less
of it.

```svelte
<Gist
	gist_uri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77"
	height="480px"
/>
```
