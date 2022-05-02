<script lang="ts">
  import { getPadding } from '$lib/utils'
  import GeneralObserver from './general-observer.svelte'

  export let vimeoId: string = ''
  export let autoPlay: boolean = false
  export let aspectRatio: string = '16:9'
  export let skipTo = { h: 0, m: 0, s: 0 }
  const { h, m, s } = skipTo
</script>

<GeneralObserver>
  <div
    data-testid="vimeo"
    class="vimeo-svelte-embed"
    style={`
    position: relative;
    width: 100%;
   ${getPadding(aspectRatio)}
  `}
  >
    <iframe
      title={`vimeo-${vimeoId}`}
      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay}#t=${h}h${m}m${s}s`}
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
      style={`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
    />
  </div>
</GeneralObserver>
