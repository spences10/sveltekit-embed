<script lang="ts">
  import GeneralObserver from './general-observer.svelte'
  export let soundcloudLink: string = ''
  export let width: string = '100%'
  export let showVisual: boolean = true
  export let height: string = '300'
</script>

<GeneralObserver {height} {width}>
  <iframe
    {width}
    {height}
    title={`spotify-${soundcloudLink}`}
    scrolling="false"
    frameborder="0"
    allow="autoplay"
    src="https://w.soundcloud.com/player/?url={soundcloudLink}&visual={showVisual}"
  />
</GeneralObserver>
