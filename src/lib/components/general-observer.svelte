<script lang="ts">
  import viewport from '$lib/utils/use-viewport-action'

  export let height: string = '100'
  export let width: string = '100'

  let intersecting: boolean
</script>

<div
  use:viewport
  on:enterViewport={() => (intersecting = true)}
  on:exitViewport={() => (intersecting = false)}
>
  {#if intersecting}
    <div class="flex justify-center mb-12" style={`width: ${width}`}>
      <slot />
    </div>
  {:else}
    <div
      class="flex justify-center mb-12"
      style={`height:${height}px;width: 100%`}
    />
  {/if}
</div>
