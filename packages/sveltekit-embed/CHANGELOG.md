# sveltekit-embed

## 0.1.0

### Minor Changes

- c8146b4: Breaking: all component props are now snake_case, iframe
  embeds use native lazy loading instead of `GeneralObserver`, and
  Svelte 5.29 or later is required.

  **Svelte 5.29+ only.** The peer dependency is now `svelte@^5.29.0`.
  Every release since 0.0.15 has shipped runes, so Svelte 4 never
  worked with them. If you are on Svelte 4, stay on
  `sveltekit-embed@0.0.14`. If you are on an earlier Svelte 5, update
  Svelte first.

  **Native lazy loading.** Every iframe embed now renders its iframe
  directly with `loading="lazy"`:

  - `disable_observer` is replaced by `loading` (`'lazy' | 'eager'`,
    default `'lazy'`). Replace `disable_observer={true}` with
    `loading="eager"`.
  - The iframe is in the server-rendered HTML and holds its space, so
    the page no longer jumps as embeds load.
  - The wrapping `div` (`data-testid="general-observer"`) and the
    fade-in are gone.
  - The `GeneralObserver` component is no longer exported. To lazy
    load your own markup, use the new `in_view` attachment:
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
  - Tweet removes its widget script when the component is destroyed,
    and a tweet mounted after the script has already run now renders
    instead of staying as a link.
  - Bluesky's iframe `id` is now stable between server and client
    (`bluesky-iframe-` plus a Svelte-generated id).
  - Zencastr removes its player script when the component is
    destroyed.
  - YouTube and Vimeo size themselves with CSS `aspect-ratio`, so
    `aspect_ratio` accepts any `width:height` value (for example
    `21:9`). A value that can't be read falls back to `16:9`.
  - The deprecated `frameborder` attribute is replaced by a CSS border
    reset on every embed.
  - GenericEmbed types the extra props it passes to the iframe, and
    `skip_to` is typed on Vimeo and YouTube.

- 6680474: Add a `Threads` component for embedding Threads posts. Pass
  the post's ID as `post_id`, with an optional `theme`
  (`'light' | 'dark' | 'auto'`).

## 0.0.22

### Patch Changes

- 851f998: feat: Enhance Bluesky component with unique iframe IDs and
  height adjustment logic

  - Implemented unique ID generation for each iframe instance to
    ensure proper height updates.
  - Updated message handling to only adjust height for the specific
    iframe that sent the message.
  - Added comprehensive tests to verify functionality for multiple
    instances and edge cases, ensuring robustness in height
    adjustments and iframe identification.

## 0.0.21

### Patch Changes

- update testing approach on components

## 0.0.20

### Patch Changes

- update youtube for playlists

## 0.0.19

### Patch Changes

- init changeset
