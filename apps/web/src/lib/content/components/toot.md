<script>
	import { Toot } from 'sveltekit-embed';
</script>

```svelte live
<Toot
	instance="mas.to"
	username="@spences10"
	toot_id="109252587760962553"
/>
```

For a post at `https://mas.to/@spences10/109252587760962553`,
`instance` is the domain, `username` the account and `toot_id` the
number at the end. The `@` on the username is optional.

The embed uses the instance's own script to size itself, so it does
not take a `loading` prop.
