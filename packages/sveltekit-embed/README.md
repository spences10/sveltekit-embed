# SvelteKit Embed 🌱

[![npm version](https://badge.fury.io/js/sveltekit-embed.svg)](https://badge.fury.io/js/sveltekit-embed)
[![npm downloads](https://img.shields.io/npm/dm/sveltekit-embed.svg)](https://www.npmjs.com/package/sveltekit-embed)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests: Unit](https://github.com/spences10/sveltekit-embed/actions/workflows/unit-test.yml/badge.svg)](https://github.com/spences10/sveltekit-embed/actions/workflows/unit-test.yml)

A collection of embed components for SvelteKit applications. Easily
embed content from popular platforms like YouTube, Spotify, Vimeo,
CodePen, and many more with performant, lazy-loaded components.

## ✨ Features

- 🚀 **Lazy Loading**: Every iframe embed uses the browser's native
  `loading="lazy"`
- 📱 **Responsive**: Mobile-friendly designs that adapt to different
  screen sizes
- 🎨 **Customizable**: Flexible props to customize appearance and
  behaviour
- 🔒 **TypeScript**: Full TypeScript support with proper type
  definitions
- ⚡ **SvelteKit Optimized**: Built specifically for SvelteKit
  applications
- 🌐 **19 Platforms Supported**: Wide range of supported embed
  platforms

## 📦 Installation

```bash
npm install sveltekit-embed
```

```bash
pnpm add sveltekit-embed
```

```bash
yarn add sveltekit-embed
```

## 🚀 Quick Start

Import and use any component in your Svelte/SvelteKit application:

```svelte
<script>
	import { YouTube, Spotify, CodePen } from 'sveltekit-embed';
</script>

<!-- YouTube Video -->
<YouTube youtube_id="dQw4w9WgXcQ" />

<!-- Spotify Track -->
<Spotify
	spotify_link="track/4iV5W9uYEdYUVa79Axb7Rh"
	width="100%"
	height="152"
/>

<!-- CodePen -->
<CodePen codepen_id="xxGYWQG" height="300px" tabs="result" />
```

## 🌟 Supported Platforms

| Platform         | Component          | Description                         |
| ---------------- | ------------------ | ----------------------------------- |
| **AnchorFm**     | `<AnchorFm />`     | Podcast episodes from Anchor.fm     |
| **Buzzsprout**   | `<Buzzsprout />`   | Podcast episodes from Buzzsprout    |
| **CodePen**      | `<CodePen />`      | Interactive code examples           |
| **Deezer**       | `<Deezer />`       | Music tracks and playlists          |
| **GenericEmbed** | `<GenericEmbed />` | Generic iframe embed for any URL    |
| **Gist**         | `<Gist />`         | GitHub Gists                        |
| **Guild**        | `<Guild />`        | Guild.xyz embeds                    |
| **Relive**       | `<Relive />`       | Relive activity summaries           |
| **SimpleCast**   | `<SimpleCast />`   | SimpleCast podcast episodes         |
| **Slides**       | `<Slides />`       | Slide presentations                 |
| **SoundCloud**   | `<SoundCloud />`   | Audio tracks from SoundCloud        |
| **Spotify**      | `<Spotify />`      | Music tracks, albums, and playlists |
| **StackBlitz**   | `<StackBlitz />`   | Live coding environments            |
| **Threads**      | `<Threads />`      | Threads posts                       |
| **Toot**         | `<Toot />`         | Mastodon posts                      |
| **Tweet**        | `<Tweet />`        | Twitter/X posts                     |
| **Vimeo**        | `<Vimeo />`        | Vimeo videos                        |
| **YouTube**      | `<YouTube />`      | YouTube videos                      |
| **Zencastr**     | `<Zencastr />`     | Zencastr podcast episodes           |

## 📖 Usage Examples

### YouTube

```svelte
<script>
	import { YouTube } from 'sveltekit-embed';
</script>

<YouTube youtube_id="dQw4w9WgXcQ" aspect_ratio="16:9" />
```

### Spotify

```svelte
<script>
	import { Spotify } from 'sveltekit-embed';
</script>

<!-- Track -->
<Spotify spotify_link="track/4iV5W9uYEdYUVa79Axb7Rh" />

<!-- Album -->
<Spotify spotify_link="album/1DFixLWuPkv3KT3TnV35m3" />

<!-- Playlist -->
<Spotify spotify_link="playlist/37i9dQZF1DXcBWIGoYBM5M" />
```

### CodePen

```svelte
<script>
	import { CodePen } from 'sveltekit-embed';
</script>

<CodePen
	codepen_id="xxGYWQG"
	height="400px"
	tabs="result"
	theme="dark"
/>
```

### Anchor.fm

```svelte
<script>
	import { AnchorFm } from 'sveltekit-embed';
</script>

<AnchorFm
	height="165"
	episode_url="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>
```

## ⚡ Performance Features

Every iframe embed sets `loading="lazy"`, so the browser:

- Only loads the embed when it's about to enter the viewport
- Renders the iframe on the server, so it holds its space and the page
  doesn't jump as embeds load
- Reduces initial page load time and saves bandwidth for users

Pass `loading="eager"` to load an embed straight away. `Bluesky`,
`Threads`, `Tweet`, `Toot` and `Zencastr` load in their own way and do
not take a `loading` prop.

To lazy load your own markup, the package also exports an `in_view`
attachment:

```svelte
<div {@attach in_view({ on_enter: () => (visible = true) })}>
```

## 🔧 TypeScript Support

Full TypeScript support is included with proper type definitions for
all components and their props.

```typescript
import type { YouTubeProps, SpotifyProps } from 'sveltekit-embed';
```

## 🤝 Contributing

Contributions are welcome! Please read our
[contributing guidelines](https://github.com/spences10/sveltekit-embed/blob/main/CONTRIBUTING.md)
and
[code of conduct](https://github.com/spences10/sveltekit-embed/blob/main/CODE_OF_CONDUCT.md).

## 📝 License

MIT © [Scott Spence](https://scottspence.com)

## 🙏 Credits

This project was inspired by
[@pauliescanlon](https://github.com/pauliescanlon)'s
[MDX Embed](https://github.com/pauliescanlon/mdx-embed).

## 📋 Links

- [Documentation](https://github.com/spences10/sveltekit-embed#readme)
- [GitHub Repository](https://github.com/spences10/sveltekit-embed)
- [Issues](https://github.com/spences10/sveltekit-embed/issues)
- [Discussions](https://github.com/spences10/sveltekit-embed/discussions)

---

Made with ❤️ for the Svelte community
