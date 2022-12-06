<script lang="ts">
	import viewport from '$lib/utils/use-viewport-action'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher();

  export let height: string = '100'
  export let width: string = '100'

  let intersecting: boolean
</script>

<div
  use:viewport
  on:enterViewport={() => {
    intersecting = true
    dispatch("enterViewport")
  }}
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
