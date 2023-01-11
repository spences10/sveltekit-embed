<script lang="ts">
  import GeneralObserver from './general-observer.svelte'

  export let reliveId: string
</script>

<GeneralObserver>
  <iframe
    title={`relive-${reliveId}`}
    src={`https://www.relive.cc/view/${reliveId}/widget`}
  />
</GeneralObserver>
