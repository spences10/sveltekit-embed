<script lang="ts">
  export let theme = 'auto'
  export let frameSrc = ''
  export let height = '300'
  export let width = '100%'
</script>

<iframe
  title="deezer-widget"
  src={`https://widget.deezer.com/widget/${theme}/${frameSrc}`}
  {width}
  {height}
  frameborder="0"
  allowtransparency="true"
  allow="encrypted-media; clipboard-write"
/>
