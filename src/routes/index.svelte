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

<AnchorFm
  height="200"
  episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>

<Buzzsprout
  buzzsproutId="190346/9866589-185-scott-spence-from-vba-analyst-to-webdev"
/>

<Deezer frameSrc="show/496882" />

<SimpleCast episodeId="46aaf483-8567-451a-aa7c-4c92fbb13f28" />

<Spotify
  spotifyLink="show/4XPl3uEEL9hvqMkoZrzbx5"
  width="100%"
  height="180px"
/>

<Tweet tweetLink="adamwathan/status/959078631434731521" />

<Vimeo vimeoId="246846978" />

<YouTube youTubeId="L7_z8rcbFPg" />
