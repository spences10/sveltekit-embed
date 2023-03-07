<!-- 
  https://www.reddit.com/r/sveltejs/comments/le28vg/whats_your_svelte_way_to_detect_if_an_element_is/
  https://svelte.dev/repl/4b8ccdf1d01545baa0ab6a858bc05abb?version=3.32.1
-->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let loaded = false
  let root: HTMLElement

  // check if IntersectionObserver is available
  const hasIntersectionObserver =
    typeof IntersectionObserver !== 'undefined'
  let observer = hasIntersectionObserver
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loaded = true
            observer.disconnect()
          }
        })
      })
    : null

  onMount(() => {
    if (observer) {
      observer.observe(root)
    }
  })

  onDestroy(() => {
    if (observer) {
      observer.disconnect()
    }
  })
</script>

<div bind:this={root}>
  {#if loaded}
    <div transition:fade>
      <slot />
    </div>
  {/if}
</div>
