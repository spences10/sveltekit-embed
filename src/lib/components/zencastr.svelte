<script lang="ts">
  import { onMount } from 'svelte'

  export let zencastrId: string = ''

  // TODO: want to do this the Svelte way, but using <svelte:head> doesn't work
  onMount(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://zencastr.com/static/js/embed-player.js'
    document.body.appendChild(script)
  })
</script>

<section style="display:flex; justify-content: center;">
  <blockquote
    class="zenplayer"
    data-episode-href={`https://zencastr.com/embed/${zencastrId}`}
    style="background: black; border-radius: 12px; font-family: system-ui; width: 480px; height: 480px; position: relative; color: white; margin: 0;"
  >
    <img
      alt=""
      style="width: 120px; display: inline-block; position: absolute; top: calc(50%); left: calc(50%); transform: translate(-50%, -50%);"
    />
    <a
      href={`https://zencastr.com/embed/${zencastrId}`}
      target="_blank"
      rel="noopener noreferrer"
      style="color: white; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); text-decoration: none;"
    >
      View on Zencastr
    </a>
  </blockquote>
</section>
