<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import {
		AnchorFm,
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
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
  import BackToTop from './back-to-top.svelte'

	// Head variables
	let title = 'This is SvelteKit embed'
	let description =
		'Embed 3rd part media in your SvelteKit projects with SvelteKit Embed.'
	let image = `https://og.tailgraph.com/og?fontFamily=Roboto&title=SvelteKit%20Embed&titleTailwind=text-gray-800+font-bold+text-6xl&text=Embed%203rd%20part%20media%20in%20your%20SvelteKit%20projects%20with%20SvelteKit%20Embed.&textTailwind=text-gray-700+text-2xl+mt-4&logoTailwind=h-8&bgTailwind=bg-white&footer=sveltekit-embed.vercel.app&footerTailwind=text-teal-600`
	let website = 'https://sveltekit-embed.vercel.app'
	let url = $page.url.toString()

	const default_value = true
	const stored_value = browser
		? window.localStorage.getItem('disable_observer')
		: null
	const disable_observer_store = writable(
		stored_value !== null ? JSON.parse(stored_value) : default_value
	)

	disable_observer_store.subscribe(value => {
		if (browser) {
			window.localStorage.setItem(
				'disable_observer',
				JSON.stringify(value)
			)
		}
	})

	let disable_observer: boolean = true
	disable_observer_store.subscribe(value => {
		disable_observer = value
	})

	onMount(() => {
		disable_observer_store.update(() => {
			return disable_observer
		})
	})
	$: enabled_state = $disable_observer_store
		? 'enabled so all the components are loaded on page load'
		: 'disabled so components are only loaded when they scroll into viewport'
</script>

<Head {title} {description} {image} {url} {website} />

<!-- cSpell:ignore yyoood,Zokm,Zrzbx -->

<BackToTop />

# SvelteKit Embed

This is a collection of embed components I use on a regular basis
packaged up for use.

Each component (except `Tweet`, `Toot` and `Zencastr`) is wrapped in
an intersection observer `GeneralObserver` which will load up the
component when it scrolls into the viewport.

**Currently the GeneralObserver is {enabled_state}.**

You can toggle the GeneralObserver on and off from here, just bear in
mind that if this is the first time you've loaded this page then the
default is to load all the components.

If you want to see the intersection observer in action then you'll
need to toggle it off, reload the page and scroll down the page.

<div class="flex items-center">
  <label for="general-observer-toggle" class="mr-2">
    Toggle the GeneralObserver:
  </label>
  <input
    id="general-observer-toggle"
    class="toggle toggle-sm"
    type="checkbox"
    bind:checked={$disable_observer_store}
  />
</div>

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
	episodeUrl="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```

## Available Components List

Your embed not here? Start a
[discussion](https://github.com/spences10/sveltekit-embed/discussions)
or open a [PR](https://github.com/spences10/sveltekit-embed/pulls).

- [AnchorFm](#anchorfm)
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
episodeUrl: string;
height: string = '100px';
width: string = '100%';
disable_observer: boolean = false;
```

Usage:

```html
<AnchorFm
	episodeUrl="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>
```

Output:

<AnchorFm
  disable_observer={$disable_observer_store}
  episodeUrl="purrfect-dev/embed/episodes/3-6---Effective-Testing-using-Cypress-io-e1vbg9m"
/>

## Buzzsprout

Props:

```ts
buzzsproutId: string;
width: string = '100%';
height: string = '200px';
disable_observer: boolean = false;
```

Usage:

```html
<Buzzsprout
	buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>
```

Output:

<Buzzsprout
  disable_observer={$disable_observer_store}
  buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>

## CodePen

Props:

```ts
height: string = '500px'
width: string = '100%'
codePenId: string = ''
tabs:
  | string[]
  | 'js'
  | 'css'
  | 'scss'
  | 'less'
  | 'result' = 'result'
clickToLoad: boolean = true
editable: boolean = true
theme: string | 'light' | 'dark' | 'default' = 'default'
disable_observer: boolean = false
iframe_styles: string = `
  height: ${height};
  width: ${width};
`
```

Usage:

For a CodePen URL like this: https://codepen.io/spences10/pen/WNMvXpa
take the `codePenId` this `WNMvXpa` and add it to the component.

```html
<CodePen codePenId="WNMvXpa" />
```

Output:

<CodePen
  disable_observer={$disable_observer_store}
  codePenId="WNMvXpa"
/>

## Deezer

Props:

```ts
theme: string = 'auto';
frameSrc: string = '';
height: string = '300px';
width: string = '100%';
disable_observer: boolean = false;
iframe_styles: string = `
  border-radius: 0.6rem;
  height: ${height};
  width: ${width};	
`;
```

Usage:

```html
<Deezer frameSrc="show/496882" />
```

Output:

<Deezer
  disable_observer={$disable_observer_store}
  frameSrc="show/496882"
/>

## GenericEmbed

This component passes all provided props to the iframe This component
also provides a slot, to bring your own markup besides the iframe

Props:

```ts
src: string = '';
title: string = '';
height: string = '152px';
width: string = '100%';
disable_observer: boolean = false;
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
  frameBorder="0"
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
  frameBorder="0"
  allow="encrypted-media"
  style="border-radius: 0.9rem;"
/>

## Gist

Props:

```ts
width = '100%';
height = '320px';
gistUri = '';
disable_observer: boolean = false;
iframe_styles: string = `
  height: ${height};
  width: ${width};
`;
```

Usage:

```html
<Gist gistUri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77" />
```

Output:

<Gist
  disable_observer={$disable_observer_store}
  gistUri="Ennoriel/8c89dc3615292f0a40b04f4f876afd77" 
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
disable_observer: boolean = false
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
  disable_observer={$disable_observer_store}
  type="guild"
  card_id="svelte-society-london"
  display_type="card"
/>

## Relive

Props:

```ts
reliveId: string = '';
width: string = '100%';
disable_observer: boolean = false;
```

Usage:

```html
<Relive reliveId="vAOZokmYVo6" />
```

Output:

<Relive
  disable_observer={$disable_observer_store}
  reliveId="vAOZokmYVo6" 
/>

## SimpleCast

Props:

```ts
episodeId: string = '';
theme: string = `dark`;
disable_observer: boolean = false;
```

Usage:

```html
<SimpleCast episodeId="1c254f66-5d75-48ef-b960-4cfec94baa0b" />
```

Output:

<SimpleCast 
  disable_observer={$disable_observer_store}
  episodeId="1c254f66-5d75-48ef-b960-4cfec94baa0b" 
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
disable_observer: boolean = false
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
  disable_observer={$disable_observer_store}
  username="spences10"
  title="building-with-sveltekit-and-graphql"
/>

## SoundCloud

Props:

```ts
soundcloudLink: string = '';
width: string = '100%';
height: string = '300px';
showVisual: boolean = true;
disable_observer: boolean = false;
iframe_styles: string = '';
```

Usage:

```html
<SoundCloud
	soundcloudLink="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>
```

Output:

<SoundCloud
  disable_observer={$disable_observer_store}
  soundcloudLink="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>

## Spotify

Props:

```ts
spotifyLink: string = '';
height: string = '100%';
width: string = '152px';
disable_observer: boolean = false;
iframe_styles: string = `
  border-radius: 0.8rem;
  height: ${height};
  width: ${width};
`;
```

Usage:

```html
<Spotify spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5" />
```

Output:

<Spotify
  disable_observer={$disable_observer_store}
  spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5" 
/>

## StackBlitz

Props:

```ts
width: string = '100%'
height: string = '500px'
id: string = ''
view: 'editor' | 'preview' | 'default' = 'default'
clickToLoad: boolean = true //ctl
hideNavigation: boolean = false //hideNavigation
hideExplorer: boolean = true
theme: string | 'light' | 'dark' | 'default' = 'dark'
file: string | undefined
disable_observer: boolean = false
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
  disable_observer={$disable_observer_store}
  id="vitejs-vite-yyoood"
  hideNavigation
/>

## TikTok

Props:

```ts
tiktokId: string;
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
disable_observer?: boolean = false;
```

Usage:

```html
<TikTok
	tiktokId="6718335390845095173"
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
  disable_observer={$disable_observer_store}
  tiktokId="6718335390845095173"
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
tootId: string = '';
```

Usage:

```html
<Toot
	instance="mas.to"
	username="@spences10"
	tootId="109252587760962553"
/>
```

Output:

<Toot 
  instance="mas.to" 
  username="@spences10" 
  tootId="109252587760962553"
/>

## Tweet

Props:

```ts
tweetLink: string = '';
theme: string = 'dark' | 'light' = 'light';
```

Usage:

```html
<Tweet
	tweetLink="adamwathan/status/959078631434731521"
	theme="dark"
/>
```

Output:

<Tweet 
  tweetLink="adamwathan/status/959078631434731521" 
  theme="dark"
/>

## Vimeo

Props:

```ts
vimeoId: string = ''
autoPlay: boolean = false
aspectRatio: string = '16:9'
skipTo: { h: 0, m: 0, s: 0 }
disable_observer: boolean = false
```

Usage:

```html
<Vimeo vimeoId="246846978" />
```

Output:

<Vimeo
  disable_observer={$disable_observer_store}
  vimeoId="246846978" 
/>

## YouTube

Props:

```ts
youTubeId: string = ''
listId: string = ''
autoPlay: boolean = false
aspectRatio: string = '16:9'
skipTo: { h: 0, m: 0, s: 0 }
disable_observer: boolean = false
export let iframe_styles: string = `
  border-radius: 0.6rem;
`
```

Usage:

```html
<YouTube youTubeId="L7_z8rcbFPg" />
```

Output:

<YouTube
  disable_observer={$disable_observer_store}
  youTubeId="L7_z8rcbFPg"
/>

## Zencastr

Props:

```ts
zencastrId: string = '';
```

Usage:

```html
<Zencastr zencastrId="TARGseQu" />
```

Output:

<Zencastr 
  zencastrId="TARGseQu" 
/>
