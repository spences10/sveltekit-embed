<script>
	import { YouTube } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore nocookie -->

```svelte live
<YouTube youtube_id="dQw4w9WgXcQ" />
```

`youtube_id` is the `v` parameter of the video's URL. Videos are
served from `youtube-nocookie.com`, so YouTube does not set cookies
until the visitor presses play.

## Playlists

Pass `list_id` instead of `youtube_id`, and `index` to start on a
particular video.

```svelte
<YouTube
	list_id="PLlrxD0HtieHhS8VzuMCfQD4uJ9yne1mE6"
	index={2}
	modest_branding
/>
```

## Start at a timestamp

`skip_to` takes hours, minutes and seconds. Leave out the ones you do
not need.

```svelte
<YouTube youtube_id="dQw4w9WgXcQ" skip_to={{ m: 1, s: 30 }} loop />
```

## Aspect ratio

The player keeps a `16:9` shape at any width. Use `aspect_ratio` for
vertical or older footage.

```svelte
<YouTube youtube_id="dQw4w9WgXcQ" aspect_ratio="4:3" />
```
