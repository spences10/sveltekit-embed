<script lang="ts">
	import { page } from '$app/state'
	import {
		AnchorFm,
		Bluesky,
		Buzzsprout,
		CodePen,
		Deezer,
		GenericEmbed,
		Gist,
		Guild,
		Relive,
		SimpleCast,
		Slides,
		SoundCloud,
		Spotify,
		StackBlitz,
		TikTok,
		Toot,
		Tweet,
		Vimeo,
		YouTube,
		Zencastr,
	} from 'sveltekit-embed'
	import { Head } from 'svead'
  import BackToTop from './back-to-top.svelte'

	// Head variables
	let title = 'This is SvelteKit embed'
	let description =
		'Embed 3rd part media in your SvelteKit projects with SvelteKit Embed.'
	let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=SvelteKit%20Embed&titleTailwind=text-gray-800+font-bold+text-6xl&text=Embed%203rd%20part%20media%20in%20your%20SvelteKit%20projects%20with%20SvelteKit%20Embed.&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=sveltekit-embed.vercel.app&footerTailwind=text-teal-600`
	let website = 'https://sveltekit-embed.vercel.app'
	let url = page.url.toString()
</script>

<Head
  seo_config={{
    title,
    description,
    url,
    website,
    open_graph_image: image,
  }}
/>

<!-- cSpell:ignore yyoood,Zokm,Zrzbx -->

<BackToTop />

# SvelteKit Embed

This is a collection of embed components I use on a regular basis
packaged up for use.

Every iframe embed sets `loading="lazy"`, so the browser only loads it
when it is close to the viewport. The iframe is still in the page from
the first render, so it holds its space while you scroll. Pass
`loading="eager"` to any of them to load it straight away.

`Bluesky`, `Tweet`, `Toot` and `Zencastr` load in their own way and do
not take a `loading` prop.

To lazy load your own markup, use the `in_view` attachment:

```svelte
<script>
	import { in_view } from 'sveltekit-embed';

	let visible = $state(false);
</script>

<div {@attach in_view({ on_enter: () => (visible = true) })}>
	{#if visible}
		<!-- your content -->
	{/if}
</div>
```

All props listed are the defaults for the component.

## Install it

```bash
pnpm i -D sveltekit-embed # npm or yarn even
```

## Use it

```svelte
<!-- +page.svelte -->
<script>
	import { AnchorFm } from 'sveltekit-embed';
</script>

<AnchorFm
	episode_url="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```

## Available Components List

Your embed not here? Start a
[discussion](https://github.com/spences10/sveltekit-embed/discussions)
or open a [PR](https://github.com/spences10/sveltekit-embed/pulls).

- [AnchorFm](#anchorfm)
- [Bluesky](#bluesky)
- [Buzzsprout](#buzzsprout)
- [CodePen](#codepen)
- [Deezer](#deezer)
- [GenericEmbed](#genericembed)
- [Gist](#gist)
- [Guild](#guild)
- [Relive](#relive)
- [SimpleCast](#simplecast)
- [Slides](#slides)
- [SoundCloud](#soundcloud)
- [Spotify](#spotify)
- [StackBlitz](#stackblitz)
- [TikTok](#tiktok)
- [Toot](#toot)
- [Tweet](#tweet)
- [Vimeo](#vimeo)
- [YouTube](#youtube)
- [Zencastr](#zencastr)

## AnchorFm

Props:

```ts
episode_url: string;
height: string = '100px';
width: string = '100%';
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

```html
<AnchorFm
	episode_url="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```

Output:

<AnchorFm
  episode_url="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>

## Bluesky

Get the `did:plc` identifier from the embed post option on Bluesky.

Props:

```ts
post_id = '',
theme: 'light' | 'dark' | 'system' = 'light',
width = '100%',
iframe_styles = '',
```

Usage:

<!-- cSpell:ignore nlvjelw,pddq,qoglleko,bsky,tnwn2k,bluesky,rgba,tiktok -->

```html
<Bluesky
	post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>
```

Output:

<Bluesky
  post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>

Set `theme` to `dark`, or to `system` to follow the visitor's
preference:

```html
<Bluesky
	theme="dark"
	post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>
```

Output:

<Bluesky
  theme="dark"
  post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>

## Buzzsprout

Props:

```ts
buzzsprout_id: string;
width: string = '100%';
height: string = '200px';
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

```html
<Buzzsprout
	buzzsprout_id="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>
```

Output:

<Buzzsprout
  buzzsprout_id="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>

## CodePen

Props:

```ts
height: string = '500px'
width: string = '100%'
codepen_id: string = ''
tabs:
  | string[]
  | 'js'
  | 'css'
  | 'scss'
  | 'less'
  | 'result' = 'result'
click_to_load: boolean = true
editable: boolean = true
theme: string | 'light' | 'dark' | 'default' = 'default'
loading: 'lazy' | 'eager' = 'lazy'
iframe_styles: string = `
  height: ${height};
  width: ${width};
`
```

Usage:

For a CodePen URL like this: https://codepen.io/spences10/pen/WNMvXpa
take the `codepen_id` this `WNMvXpa` and add it to the component.

```html
<CodePen codepen_id="WNMvXpa" />
```

Output:

<CodePen
  codepen_id="WNMvXpa"
/>

## Deezer

Props:

```ts
theme: string = 'auto';
frame_src: string = '';
height: string = '300px';
width: string = '100%';
loading: 'lazy' | 'eager' = 'lazy';
iframe_styles: string = `
  border-radius: 0.6rem;
  height: ${height};
  width: ${width};
`;
```

Usage:

```html
<Deezer frame_src="show/496882" />
```

Output:

<Deezer
  frame_src="show/496882"
/>

## GenericEmbed

This component passes all provided props to the iframe. It also
renders any children you pass, to bring your own markup besides the
iframe.

Props:

```ts
src: string = '';
title: string = '';
height: string = '152px';
width: string = '100%';
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

<!-- prettier-ignore -->
```html
<GenericEmbed
  width="100%"
  height="152px"
  data-testid="spotify"
  title="spotify-generic"
  src={`https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5`}
  frameborder="0"
  allow="encrypted-media"
  style="border-radius: 0.9rem;"
/>
```

Output:

<!-- prettier-ignore -->
<GenericEmbed
  width="100%"
  height="152px"
  data-testid="spotify"
  title="spotify-generic"
  src={`https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5`}
  frameborder="0"
  allow="encrypted-media"
  style="border-radius: 0.9rem;"
/>

## Gist

Props:

```ts
width = '100%';
height = '320px';
gist_uri = '';
loading: 'lazy' | 'eager' = 'lazy';
iframe_styles: string = `
  height: ${height};
  width: ${width};
`;
```

Usage:

```html
<Gist gist_uri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77" />
```

Output:

<Gist
  gist_uri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77" 
/>

## Guild

Props:

```ts
height: string = '380px'
width: string = '100%'
card_id: string
type: 'guild' | 'user' | 'event' | 'presentation' =
  'guild'
display_type:
  | 'card'
  | 'item'
  | 'events/latest'
  | 'events/upcoming'
  | 'events/past'
  | 'presentations/latest'
  | 'presentations/upcoming'
  | 'presentations/other' = 'card'
loading: 'lazy' | 'eager' = 'lazy'
```

Usage:

```html
<Guild
	type="guild"
	card_id="svelte-society-london"
	display_type="events/latest"
/>
```

Output:

<Guild
  type="guild"
  card_id="svelte-society-london"
  display_type="card"
/>

## Relive

Props:

```ts
relive_id: string = '';
width: string = '100%';
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

```html
<Relive relive_id="vAOZokmYVo6" />
```

Output:

<Relive
  relive_id="vAOZokmYVo6" 
/>

## SimpleCast

Props:

```ts
episode_id: string = '';
theme: string = `dark`;
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

```html
<SimpleCast episode_id="1c254f66-5d75-48ef-b960-4cfec94baa0b" />
```

Output:

<SimpleCast 
  episode_id="1c254f66-5d75-48ef-b960-4cfec94baa0b" 
/>

## Slides

Props:

```ts
width: string = '100%'
height: string = '420px'
username: string = ''
title: string = ''
byline: 'hidden' | 'visible' | 'default' = 'hidden'
share: 'hidden' | 'visible' | 'default' = 'hidden'
style:
  | 'light'
  | 'dark'
  | 'hidden'
  | 'transparent'
  | 'default' = 'dark'
loading: 'lazy' | 'eager' = 'lazy'
```

Usage:

```html
<Slides
	username="spences10"
	title="building-with-sveltekit-and-graphql"
/>
```

Output:

<Slides 
  username="spences10"
  title="building-with-sveltekit-and-graphql"
/>

## SoundCloud

Props:

```ts
soundcloud_link: string = '';
width: string = '100%';
height: string = '300px';
show_visual: boolean = true;
loading: 'lazy' | 'eager' = 'lazy';
iframe_styles: string = '';
```

Usage:

```html
<SoundCloud
	soundcloud_link="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>
```

Output:

<SoundCloud
  soundcloud_link="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>

## Spotify

Props:

```ts
spotify_link: string = '';
width: string = '100%';
height: string = '152px';
loading: 'lazy' | 'eager' = 'lazy';
iframe_styles: string = `
  border-radius: 0.8rem;
  height: ${height};
  width: ${width};
`;
```

Usage:

```html
<Spotify spotify_link="show/4XPl3uEEL9hvqMkoZrzbx5" />
```

Output:

<Spotify
  spotify_link="show/4XPl3uEEL9hvqMkoZrzbx5" 
/>

## StackBlitz

Props:

```ts
width: string = '100%'
height: string = '500px'
id: string = ''
view: 'editor' | 'preview' | 'default' = 'default'
click_to_load: boolean = true //ctl
hide_navigation: boolean = false //hideNavigation
hide_explorer: boolean = true
theme: string | 'light' | 'dark' | 'default' = 'dark'
file: string | undefined
loading: 'lazy' | 'eager' = 'lazy'
iframe_styles: string = `
  height: ${height};
  width: ${width};
```

Usage:

```html
<StackBlitz id="vitejs-vite-yyoood" theme="light" />
```

Output:

<StackBlitz
  id="vitejs-vite-yyoood"
  hide_navigation
/>

## TikTok

Props:

```ts
tiktok_id: string;
width?: string = '100%';
height?: string = '600px';
controls?: boolean = true;
progress_bar?: boolean = true;
play_button?: boolean = true;
volume_control?: boolean = true;
fullscreen_button?: boolean = true;
timestamp?: boolean = true;
loop?: boolean = false;
autoplay?: boolean = false;
music_info?: boolean = false;
description?: boolean = false;
rel?: boolean = true;
native_context_menu?: boolean = true;
closed_caption?: boolean = true;
loading: 'lazy' | 'eager' = 'lazy';
```

Usage:

```html
<TikTok
	tiktok_id="6718335390845095173"
	width="100%"
	height="600px"
	autoplay="{false}"
	loop="{true}"
	music_info="{true}"
	description="{true}"
/>
```

Output:

<TikTok
  tiktok_id="6718335390845095173"
  width="100%"
  height="600px"
  autoplay={false}
  loop={true}
  music_info={true}
  description={true}
/>

## Toot

Props:

```ts
instance: string = '';
username: string = '';
toot_id: string = '';
```

Usage:

```html
<Toot
	instance="mas.to"
	username="@spences10"
	toot_id="109252587760962553"
/>
```

Output:

<Toot 
  instance="mas.to" 
  username="@spences10" 
  toot_id="109252587760962553"
/>

## Tweet

Props:

```ts
tweet_link: string = '';
theme: string = 'dark' | 'light' = 'light';
```

Usage:

```html
<Tweet
	tweet_link="adamwathan/status/959078631434731521"
	theme="dark"
/>
```

Output:

<Tweet 
  tweet_link="adamwathan/status/959078631434731521" 
  theme="dark"
/>

## Vimeo

Props:

```ts
vimeo_id: string = ''
autoplay: boolean = false
aspect_ratio: string = '16:9'
skip_to: { h: 0, m: 0, s: 0 }
loading: 'lazy' | 'eager' = 'lazy'
```

Usage:

```html
<Vimeo vimeo_id="246846978" />
```

Output:

<Vimeo
  vimeo_id="246846978" 
/>

## YouTube

Props:

```ts
youtube_id?: string;
list_id?: string;
index?: number = 0;
autoplay?: boolean = false;
aspect_ratio?: string = '16:9';
skip_to?: { h: number; m: number; s: number } = { h: 0, m: 0, s: 0 };
loading?: 'lazy' | 'eager' = 'lazy';
iframe_styles?: string = '';
mute?: boolean = false;
controls?: boolean = true;
loop?: boolean = false;
modest_branding?: boolean = false;
rel?: boolean = false;
```

Usage with video ID:

```html
<YouTube youtube_id="dQw4w9WgXcQ" />
```

Usage with playlist:

```html
<YouTube
	list_id="PLlrxD0HtieHhS8VzuMCfQD4uJ9yne1mE6"
	index="{2}"
	autoplay="{true}"
	mute="{true}"
	controls="{true}"
	modest_branding="{true}"
/>
```

Usage with timestamp:

```html
<YouTube
  youtube_id="dQw4w9WgXcQ"
  skip_to={{ h: 0, m: 1, s: 30 }}
  loop={true}
  rel={false}
/>
```

Output:

<YouTube
  youtube_id="dQw4w9WgXcQ"
  aspect_ratio="16:9"
/>

### YouTube Props Explained

- `youtube_id`: The ID of the YouTube video
- `list_id`: The ID of a YouTube playlist
- `index`: Starting index for playlist playback (default: 0)
- `autoplay`: Automatically start playing (default: false)
- `mute`: Start video muted (default: false)
- `controls`: Show player controls (default: true)
- `loop`: Loop the video/playlist (default: false)
- `modest_branding`: Use minimal YouTube branding (default: false)
- `rel`: Show related videos at the end (default: false)
- `aspect_ratio`: Set the aspect ratio (default: '16:9')
- `skip_to`: Start at specific timestamp (default:
  `{ h: 0, m: 0, s: 0 }`)
- `loading`: `'lazy'` defers loading until the video is near the
  viewport, `'eager'` loads it straight away (default: 'lazy')
- `iframe_styles`: Custom CSS styles for the iframe

## Zencastr

Props:

```ts
zencastr_id: string = '';
```

Usage:

```html
<Zencastr zencastr_id="TARGseQu" />
```

Output:

<Zencastr 
  zencastr_id="TARGseQu" 
/>
