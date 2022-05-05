<script lang="ts">
  import GeneralObserver from './general-observer.svelte'
  export let src: string = ''
  export let title: string = ''
  export let height: string = '300'
  export let width: string = '100%'
</script>

<GeneralObserver {height} {width}>
  <iframe {src} {width} {height} {title} {...$$restProps} />
  <slot />
</GeneralObserver>
