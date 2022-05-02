<script>
  import AnchorFm from '$lib/components/anchor-fm.svelte'
  import Buzzsprout from '$lib/components/buzzsprout.svelte'
  import Deezer from '$lib/components/deezer.svelte'
  import SimpleCast from '$lib/components/simple-cast.svelte'
  import Spotify from '$lib/components/spotify.svelte'
  import Tweet from '$lib/components/tweet.svelte'
  import Vimeo from '$lib/components/vimeo.svelte'
  import YouTube from '$lib/components/you-tube.svelte'
</script>

<main>
  <h1>SvekteKit Embed</h1>

  <p>
    This is a collection of embed components I use on a regular basis
    packaged up for use.
  </p>

  <h2>AnchorFm</h2>
  <p>Props:</p>
  <pre>
  episodeUrl: string
  height: string = '100'
  width: string = '100'
  </pre>
  <AnchorFm
    height="200"
    episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
  />

  <h2>Buzzsprout</h2>
  <p>Props:</p>
  <pre>
  buzzsproutId: string
  width: string = '100'
  height: string = '200'
  </pre>
  <Buzzsprout
    buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
  />

  <h2>Deezer</h2>
  <p>Props:</p>
  <pre>
  theme: string = 'auto'
  frameSrc: string = ''
  height: string = '300px'
  width: string = '100%'
  </pre>
  <Deezer frameSrc="show/496882" />

  <h2>SimpleCast</h2>
  <p>Props:</p>
  <pre>
  episodeId: string = ''
  theme: string = `dark`
  </pre>
  <SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />

  <h2>Spotify</h2>
  <p>Props:</p>
  <pre>
  spotifyLink: string = ''
  width: string = '320'
  height: string = '380'
  </pre>
  <Spotify
    spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5"
    width="100%"
    height="180px"
  />

  <h2>Tweet</h2>
  <p>Props:</p>
  <pre>
  tweetLink: string = ''
  </pre>
  <Tweet tweetLink="adamwathan/status/959078631434731521" />

  <h2>Vimeo</h2>
  <p>Props:</p>
  <pre>
  vimeoId: string = ''
  autoPlay: boolean = false
  aspectRatio: string = '16:9'
  skipTo =  &#123; h: 0, m: 0, s: 0 &#125;
  </pre>
  <Vimeo vimeoId="246846978" />

  <h2>YouTube</h2>
  <p>Props:</p>
  <pre>
  width: string = '560'
  height: string = '315'
  youTubeId: string = ''
  listId: string = ''
  autoPlay: boolean = false
  aspectRatio: string = '16:9'
  skipTo =  &#123; h: 0, m: 0, s: 0 &#125;
  </pre>
  <YouTube youTubeId="L7_z8rcbFPg" />
</main>
