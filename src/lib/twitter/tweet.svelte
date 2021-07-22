<script>
  export let tweetLink = ''
  export let theme = 'light'
  export let align = 'left'
  export let hideConversation = false
</script>

<div
  data-testid="twitter-tweet"
  class="twitter-tweet-sveltekit-embed"
  style={` overflow: auto; `}
>
  <blockquote
    class="twitter-tweet"
    data-theme={theme}
    data-align={align}
    data-conversation={hideConversation ? 'none' : ''}
  >
    <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>
      {#if typeof window !== 'undefined' && !(// @ts-ignore
          window.twttr)}
        Loading...
      {/if}
    </a>
  </blockquote>
</div>
