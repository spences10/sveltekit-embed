<script>
	import { Zencastr } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore TARGseQu,TARGse -->

```svelte live
<Zencastr zencastr_id="TARGseQu" />
```

`zencastr_id` is the ID in the embed code Zencastr gives you for an
episode. The player is rendered by Zencastr's own script, so it does
not take a `loading` prop.
