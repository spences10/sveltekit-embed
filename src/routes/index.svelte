<script>
  import {
    AnchorFm,
    Buzzsprout,
    Deezer,
    SimpleCast,
    Spotify,
    Tweet,
    Vimeo,
    YouTube,
  } from 'sveltekit-embed'
  import '../global.css'
</script>

<main>
  <h1>SvekteKit Embed</h1>

  <p>
    This is a collection of embed components I use on a regular basis
    packaged up for use.
  </p>

  <p>
    Each component is wrapped in an intersection observer <code>
      GeneralObserver
    </code> which will load up the component when it scrolls into the viewport.
  </p>

  <h3>AnchorFm</h3>
  <p>Props:</p>
  <pre>
    episodeUrl: string
    height: string = '100'
    width: string = '100'
  </pre>

  <AnchorFm
    height="165"
    episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
  />

  <h3>Buzzsprout</h3>
  <p>Props:</p>
  <pre>
    buzzsproutId: string
    width: string = '100'
    height: string = '200'
  </pre>

  <Buzzsprout
    buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
  />

  <h3>Deezer</h3>
  <p>Props:</p>
  <pre>
    theme: string = 'auto'
    frameSrc: string = ''
    height: string = '300px'
    width: string = '100%'
  </pre>

  <Deezer frameSrc="show/496882" />

  <h3>SimpleCast</h3>
  <p>Props:</p>
  <pre>
    episodeId: string = ''
    theme: string = `dark`
  </pre>

  <SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />

  <h3>Spotify</h3>
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

  <h3>Tweet</h3>
  <p>Props:</p>
  <pre>
    tweetLink: string = ''
  </pre>

  <Tweet tweetLink="adamwathan/status/959078631434731521" />

  <h3>Vimeo</h3>
  <p>Props:</p>
  <pre>
    vimeoId: string = ''
    autoPlay: boolean = false
    aspectRatio: string = '16:9'
    skipTo =  &#123; h: 0, m: 0, s: 0 &#125;
  </pre>

  <Vimeo vimeoId="246846978" />

  <h3>YouTube</h3>
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

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 5em;
  }
  pre {
    padding-top: 1.6em;
    font-family: 'Courier New', Courier, monospace;
    background-color: rgb(51, 18, 73);
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: rgb(51, 18, 73);
    border-radius: 8px;
    padding: 0.2em 0.4em;
  }
</style>
