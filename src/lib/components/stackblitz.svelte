<script lang="ts">
  import GeneralObserver from './general-observer.svelte'

  export let width: string = '100'
  export let height: string = '500'
  export let id: string = ''
  export let view: 'editor' | 'preview' | 'default' = 'default'
  export let clickToLoad: boolean = true //ctl
  export let hideNavigation: boolean = false //hideNavigation
  export let hideExplorer: boolean = true
  export let theme: string | 'light' | 'dark' | 'default' = 'dark'
  export let file: string | undefined

  let baseUrl = `https://stackblitz.com/edit/${id}?embed=1`
  const config = {
    ctl: `${clickToLoad ? 1 : 0}`,
    hideExplorer: `${hideExplorer ? 1 : 0}`,
    hideNavigation: `${hideNavigation ? 1 : 0}`,
    theme,
  }
  if (view !== 'default') {
    config['view'] = view
  }
  if (file) {
    config['file'] = file
  }
  const queryString = new URLSearchParams(config)
  const src = `${baseUrl}&${queryString.toString()}`
</script>

<GeneralObserver {height} {width}>
  <iframe
    {height}
    class="stackblitz-sveltekit-embed"
    title={`stackblitz-${id}`}
    {src}
    frameborder="no"
    allowfullscreen
    style={`
      width: 100%;
    `}
  />
</GeneralObserver>
