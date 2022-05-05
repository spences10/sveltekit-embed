<script>
  import {
    AnchorFm,
    Buzzsprout,
    Deezer,
    GenericEmbed,
    SimpleCast,
    SoundCloud,
    Spotify,
    Tweet,
    Vimeo,
    YouTube,
  } from 'sveltekit-embed'
</script>

<svelte:head>

  <title>SvelteKit Embed</title>
  <link rel="canonical" href="https://sveltekit-embed.vercel.app" />
  <meta
    name="description"
    content="Embed 3rd part media in your SvelteKit projects with SvelteKit Embed."
  />
  <meta name="author" content="Scott Spence" />
</svelte:head>

# SvelteKit Embed

This is a collection of embed components I use on a regular basis
packaged up for use.

Each component is wrapped in an intersection observer
`GeneralObserver` which will load up the component when it scrolls
into the viewport.

## AnchorFm

Props:

```ts
episodeUrl: string
height: string = '100'
width: string = '100'
```

Usage:

```html
<AnchorFm
  episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>
```

Output:

<AnchorFm
  episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>

## Buzzsprout

Props:

```ts
buzzsproutId: string
height: string = '100'
width: string = '200'
```

Usage:

```html
<Buzzsprout
  buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>
```

Output:

<Buzzsprout
  buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>

## Deezer

Props:

```ts
theme: string = 'auto'
frameSrc: string = ''
height: string = '300px'
width: string = '100%'
```

Usage:

```html
<Deezer frameSrc="show/496882" />
```

Output:

<Deezer frameSrc="show/496882" />

## GenericEmbed

This component passes all provided props to the iframe This component
also provides a slot, to bring your own markup besides the iframe

Props:

```ts
src: string = ''
title: string = ''
height: string = '300'
width: string = '100%'
```

Usage:

```ts
width: string = '100%'
height: string = '180px'
data-testid: string = 'spotify'
title: string = 'spotify-generic'
src: string = 'https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5'
frameBorder: string = '0'
allow: string = 'encrypted-media'
```

<!-- prettier-ignore -->
```html
<GenericEmbed
  width="100%"
  height="180px"
  data-testid="spotify"
  title="spotify-generic"
  src={`https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5`}
  frameBorder="0"
  allow="encrypted-media"
/>
```

Output:

<!-- prettier-ignore -->
<GenericEmbed
  width="100%"
  height="180px"
  data-testid="spotify"
  title="spotify-generic"
  src={`https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5`}
  frameBorder="0"
  allow="encrypted-media"
/>

## SimpleCast

Props:

```ts
episodeId: string = ''
theme: string = `dark`
```

Usage:

```html
<SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />
```

Output:

<SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />

## SoundCloud

Props:

```ts
soundcloudLink: string = ''
height: string = '300'
width: string = '100%'
showVisual: boolean = true
```

Usage:

```html
<SoundCloud
  soundcloudLink="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>
```

Output:

<SoundCloud
  soundcloudLink="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>

## Spotify

Props:

```ts
spotifyLink: string = ''
height: string = '320'
width: string = '380'
```

Usage:

```html
<Spotify
  spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5"
  width="100%"
  height="180px"
/>
```

Output:

<Spotify
  spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5"
  width="100%"
  height="180px"
/>

## Tweet

Props:

```ts
tweetLink: string = ''
```

Usage:

```html
<Tweet tweetLink="adamwathan/status/959078631434731521" />
```

Output:

<Tweet tweetLink="adamwathan/status/959078631434731521" />

## Vimeo

Props:

```ts
vimeoId: string = ''
autoPlay: boolean = false
aspectRatio: string = '16:9'
skipTo: { h: 0, m: 0, s: 0 }
```

Usage:

```html
<Vimeo vimeoId="246846978" />
```

Output:

<Vimeo vimeoId="246846978" />

## YouTube

Props:

```ts
height: string = '560'
width: string = '315'
youTubeId: string = ''
listId: string = ''
autoPlay: boolean = false
aspectRatio: string = '16:9'
skipTo: { h: 0, m: 0, s: 0 }
```

Usage:

```html
<YouTube youTubeId="L7_z8rcbFPg" />
```

Output:

<YouTube youTubeId="L7_z8rcbFPg" />
