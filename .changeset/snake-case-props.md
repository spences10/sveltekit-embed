---
'sveltekit-embed': minor
---

Breaking: all component props are now snake_case, iframe embeds use
native lazy loading instead of `GeneralObserver`, and Svelte 5.29 or
later is required.

**Svelte 5.29+ only.** The peer dependency is now `svelte@^5.29.0`.
Every release since 0.0.15 has shipped runes, so Svelte 4 never worked
with them. If you are on Svelte 4, stay on `sveltekit-embed@0.0.14`.
If you are on an earlier Svelte 5, update Svelte first.

**Native lazy loading.** Every iframe embed now renders its iframe
directly with `loading="lazy"`:

- `disable_observer` is replaced by `loading` (`'lazy' | 'eager'`,
  default `'lazy'`). Replace `disable_observer={true}` with
  `loading="eager"`.
- The iframe is in the server-rendered HTML and holds its space, so
  the page no longer jumps as embeds load.
- The wrapping `div` (`data-testid="general-observer"`) and the
  fade-in are gone.
- The `GeneralObserver` component is no longer exported. To lazy load
  your own markup, use the new `in_view` attachment:
  `<div {@attach in_view({ on_enter: () => (visible = true) })}>`.

**Renamed props.** Update your usage as follows:

| Component  | Before           | After             |
| ---------- | ---------------- | ----------------- |
| AnchorFm   | `episodeUrl`     | `episode_url`     |
| Buzzsprout | `buzzsproutId`   | `buzzsprout_id`   |
| CodePen    | `codePenId`      | `codepen_id`      |
| CodePen    | `clickToLoad`    | `click_to_load`   |
| Deezer     | `frameSrc`       | `frame_src`       |
| Gist       | `gistUri`        | `gist_uri`        |
| Relive     | `reliveId`       | `relive_id`       |
| SimpleCast | `episodeId`      | `episode_id`      |
| SoundCloud | `soundcloudLink` | `soundcloud_link` |
| SoundCloud | `showVisual`     | `show_visual`     |
| Spotify    | `spotifyLink`    | `spotify_link`    |
| StackBlitz | `clickToLoad`    | `click_to_load`   |
| StackBlitz | `hideNavigation` | `hide_navigation` |
| StackBlitz | `hideExplorer`   | `hide_explorer`   |
| TikTok     | `tiktokId`       | `tiktok_id`       |
| Toot       | `tootId`         | `toot_id`         |
| Tweet      | `tweetLink`      | `tweet_link`      |
| Vimeo      | `vimeoId`        | `vimeo_id`        |
| Vimeo      | `autoPlay`       | `autoplay`        |
| Vimeo      | `aspectRatio`    | `aspect_ratio`    |
| Vimeo      | `skipTo`         | `skip_to`         |
| YouTube    | `youTubeId`      | `youtube_id`      |
| YouTube    | `listId`         | `list_id`         |
| YouTube    | `autoPlay`       | `autoplay`        |
| YouTube    | `aspectRatio`    | `aspect_ratio`    |
| YouTube    | `skipTo`         | `skip_to`         |
| YouTube    | `modestBranding` | `modest_branding` |

**Fixes and additions**

- CodePen, Slides, StackBlitz, TikTok, Vimeo and YouTube now update
  the embed when props change after mount (#584).
- Buzzsprout renders the player again instead of the full episode
  page.
- Bluesky has a `theme` prop (`'light' | 'dark' | 'system'`) and no
  longer shows white corners on dark pages.
- Tweet removes its widget script when the component is destroyed.
- GenericEmbed types the extra props it passes to the iframe, and
  `skip_to` is typed on Vimeo and YouTube.
