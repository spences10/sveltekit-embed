<script lang="ts">
  export let instance: string = ''
  export let username: string = ''
  export let tootId: string = ''
  
  $: trimmedUsername = username.trim()
  $: atUsername = trimmedUsername.startsWith('@') ? trimmedUsername : `@${trimmedUsername}`
</script>

<svelte:head>
  <script
    async
    src="https://{instance}/embed.js"
    charset="utf-8"
  ></script>
</svelte:head>

<div class="flex justify-center mb-12">
  <iframe
    title=""
    src="https://{instance}/{atUsername}/{tootId}/embed"
    class="mastodon-embed"
    style="max-width: 100%; border: 0"
    width="400"
    allowfullscreen
  />
</div>
