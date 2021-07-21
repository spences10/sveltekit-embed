<script>
  import IntersectionObserver from 'svelte-intersection-observer'
  let element
  let intersecting

  $: inView = intersecting.isIntersecting
</script>

<IntersectionObserver {element} bind:intersecting>
  <div bind:this={element} class="element">
    {#if inView}
      <slot />
    {/if}
  </div>
</IntersectionObserver>
