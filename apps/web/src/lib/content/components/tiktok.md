<script>
	import { TikTok } from 'sveltekit-embed';
</script>

```svelte live
<TikTok tiktok_id="6718335390845095173" loop music_info description />
```

`tiktok_id` is the number at the end of the video's URL, after
`/video/`.

## A bare player

Every part of the player's interface has its own prop. This leaves
only the video and a play button.

```svelte
<TikTok
	tiktok_id="6718335390845095173"
	progress_bar={false}
	volume_control={false}
	fullscreen_button={false}
	timestamp={false}
	rel={false}
/>
```
