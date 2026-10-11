<script>
	import { AnchorFm } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore purrfect -->

```svelte live
<AnchorFm
	episode_url="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```

Open the episode on Anchor, choose **Embed** and copy the part of the
`src` after `anchor.fm/`.

## A taller player

The player is `100px` tall by default. Pass any CSS height.

```svelte
<AnchorFm
	height="165px"
	episode_url="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```
