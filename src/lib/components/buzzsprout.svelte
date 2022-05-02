<script lang="ts">
  import GeneralObserver from './general-observer.svelte'

  export let buzzsproutId: string
  export let width = 100
  export let height = 200
</script>

<GeneralObserver>
  <div
    class="buzzsprout-mdx-embed"
    style={`
      position: relative; 
      height: ${height}px;
      width: ${width}%;
    `}
  >
    <iframe
      data-testid="buzzsprout"
      title={`buzzsprout-${buzzsproutId}`}
      src={`https://www.buzzsprout.com/${buzzsproutId}?client_source=admin&amp;iframe=true`}
      {width}
      {height}
      frameBorder="0"
      scrolling="no"
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
