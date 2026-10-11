<script>
	import { Spotify } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore Zrzbx -->

```svelte live
<Spotify spotify_link="show/4XPl3uEEL9hvqMkoZrzbx5" />
```

`spotify_link` is the type of content and its ID, the part of the
Spotify URL after `open.spotify.com/`. It works for a `show`,
`episode`, `album`, `playlist` or `track`.

## A taller player

At `352px` Spotify shows the track list as well as the player.

```svelte
<Spotify spotify_link="show/4XPl3uEEL9hvqMkoZrzbx5" height="352px" />
```
