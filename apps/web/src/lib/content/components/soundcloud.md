<script>
	import { SoundCloud } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore prospa -->

```svelte live
<SoundCloud
	soundcloud_link="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>
```

`soundcloud_link` is the full URL of a track or a set.

## Compact player

Turn off the artwork for the classic waveform player, which works well
at a lower height.

```svelte
<SoundCloud
	soundcloud_link="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
	show_visual={false}
	height="166px"
/>
```
