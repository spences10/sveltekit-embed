<script>
  import {
    AnchorFm,
    Buzzsprout,
    Deezer,
    Generic,
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

<h1>SvelteKit Embed</h1>

<p>
  This is a collection of embed components I use on a regular basis
  packaged up for use.
</p>

<p>
  Each component is wrapped in an intersection observer <code>
    GeneralObserver
  </code> which will load up the component when it scrolls into the viewport.
</p>

<h2>AnchorFm</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>episodeUrl: </code><code class="text-secondary"
      >string</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '100'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '100'</code
    ></pre>
</div>

<AnchorFm
  episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>

<h2>Buzzsprout</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>buzzsproutId: </code><code class="text-secondary"
      >string</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '100'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '200'</code
    ></pre>
</div>

<Buzzsprout
  buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>

<h2>Deezer</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>theme: </code><code class="text-secondary"
      >string = 'auto'</code
    ></pre>
  <pre><code>frameSrc: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '300px'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '100%'</code
    ></pre>
</div>

<Deezer frameSrc="show/496882" />

<h2>Generic</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code
      >// This component passes all provided props to the iframe</code
    ></pre>
  <pre><code>// This component also provides a slot,</code></pre>
  <pre><code>// to bring your own markup besides the iframe</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '100%'</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '180px'</code
    ></pre>
  <pre><code>data-testid: </code><code class="text-secondary"
      >string = 'spotify'</code
    ></pre>
  <pre><code>title: </code><code class="text-secondary"
      >string = 'spotify-generic'</code
    ></pre>
  <pre><code>src: </code><code class="text-secondary"
      >string = 'https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5'</code
    ></pre>
  <pre><code>frameBorder: </code><code class="text-secondary"
      >string = '0'</code
    ></pre>
  <pre><code>allow: </code><code class="text-secondary"
      >string = 'encrypted-media'</code
    ></pre>
</div>

<Generic
  width="100%"
  height="180px"
  data-testid="spotify"
  title="spotify-generic"
  src={`https://open.spotify.com/embed/show/4XPl3uEEL9hvqMkoZrzbx5`}
  frameBorder="0"
  allow="encrypted-media"
/>

<h2>SimpleCast</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>episodeId: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>theme: </code><code class="text-secondary"
      >string = `dark`</code
    ></pre>
</div>

<SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />

<h2>SoundCloud</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>soundcloudLink: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '300'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '100%'</code
    ></pre>
  <pre><code>showVisual: </code><code class="text-secondary"
      >boolean = true</code
    ></pre>
</div>

<SoundCloud
  soundcloudLink="https://soundcloud.com/dimension_uk/sets/prospa-want-need-love"
/>

<h2>Spotify</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>spotifyLink: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>height: </code><code class="text-secondary"
      >string = '320'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '380'</code
    ></pre>
</div>

<Spotify
  spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5"
  width="100%"
  height="180px"
/>

<h2>Tweet</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>tweetLink: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
</div>

<Tweet tweetLink="adamwathan/status/959078631434731521" />

<h2>Vimeo</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>vimeoId: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>autoPlay: </code><code class="text-secondary"
      >boolean = false</code
    ></pre>
  <pre><code>aspectRatio: </code><code class="text-secondary"
      >string = '16:9'</code
    ></pre>
  <pre><code>skipTo: </code><code class="text-secondary"
      >&#123; h: 0, m: 0, s: 0 &#125</code
    ></pre>
</div>

<Vimeo vimeoId="246846978" />

<h2>YouTube</h2>
<p>Props:</p>
<div class="mockup-code mb-8 not-prose">
  <pre><code>height: </code><code class="text-secondary"
      >string = '560'</code
    ></pre>
  <pre><code>width: </code><code class="text-secondary"
      >string = '315'</code
    ></pre>
  <pre><code>youTubeId: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>listId: </code><code class="text-secondary"
      >string = ''</code
    ></pre>
  <pre><code>autoPlay: </code><code class="text-secondary"
      >boolean = false</code
    ></pre>
  <pre><code>aspectRatio: </code><code class="text-secondary"
      >string = '16:9'</code
    ></pre>
  <pre><code>skipTo: </code><code class="text-secondary"
      >&#123; h: 0, m: 0, s: 0 &#125</code
    ></pre>
</div>

<YouTube youTubeId="L7_z8rcbFPg" />
