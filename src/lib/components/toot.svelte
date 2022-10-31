<script lang="ts">
  export let instance: string = ''
  export let username: string = ''
  export let tootId: string = ''
</script>

<svelte:head>
  <script
    async
    src="https://mas.to/embed.js"
    charset="utf-8"
  ></script>
</svelte:head>

<div class="flex justify-center mb-12">
  <iframe
    title=""
    src={`https://${instance}/${
      username.slice(0, 1) === `@` ? username : `@` + username
    }/${tootId}/embed`}
    class="mastodon-embed"
    style="max-width: 100%; border: 0"
    width="400"
    allowfullscreen
  />
</div>
