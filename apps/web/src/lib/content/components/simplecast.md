<script>
	import { SimpleCast } from 'sveltekit-embed';
</script>

```svelte live
<SimpleCast episode_id="1c254f66-5d75-48ef-b960-4cfec94baa0b" />
```

In Simplecast, open the episode's **Share** options and copy the ID
from the embed code.

## Light player

```svelte
<SimpleCast
	theme="light"
	episode_id="1c254f66-5d75-48ef-b960-4cfec94baa0b"
/>
```
