<script lang="ts">
  import GeneralObserver from './general-observer.svelte'

  export let reliveId: string
  export let width: string = '100%'
</script>

<GeneralObserver>
  <iframe
    title={`relive-${reliveId}`}
    src={`https://www.relive.cc/view/${reliveId}/widget`}
  />
</GeneralObserver>

<style>
  iframe {
    /* 2 from margin + 1 from box-shadow */
    aspect-ratio: 1000 / calc(782.5 + 3);
    overflow: clip;
    width: 100%;
  }
</style>
