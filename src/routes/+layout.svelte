<script>
  import GitHub from '$lib/icons/git-hub.svelte'
  import Twitter from '$lib/icons/twitter.svelte'
  import YouTube from '$lib/icons/you-tube.svelte'
  import '../app.css'
  import '../prism.css'
</script>

<header class="text-right">
  <span
    class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] m-4"
    data-tip="GitHub"
  >
    <div class="flex-none items-center">
      <a
        aria-label="Github"
        target="_blank"
        href="https://github.com/spences10/sveltekit-embed"
        rel="noopener"
        class="btn btn-ghost drawer-button btn-square normal-case"
      >
        <GitHub height="30" width="30" fill="fill-white fill-primary" />
      </a>
    </div>
  </span>
</header>

<main class="prose prose-xl container max-w-3xl mx-auto px-4 mb-20">
  <slot />
</main>

<footer
  class="p-10 footer bg-primary text-primary-content footer-center"
>
  <div class="text-xl">
    <img
      src="spencee.png"
      alt="Scott avatar"
      class="rounded-full h-20"
    />
    <p class="font-bold">
      Made with <span role="img" aria-label="red heart">❤️</span> by
      <a
        class="link transition hover:text-secondary"
        href="https://scottspence.com"
        target="_blank"
        rel="noopener"
      >
        Scott Spence
      </a>
    </p>
    <p>
      Copyright © {`${new Date().getFullYear()}`} - All rights reserved
      <span role="img" aria-label="shruggin emoji">🤷</span>
    </p>
  </div>
  <div>
    <div class="grid grid-flow-col gap-4">
      <a
        aria-label="Twitter"
        target="_blank"
        rel="noopener"
        href="https://twitter.com/spences10"
      >
        <Twitter />
      </a>
      <a
        aria-label="GitHub"
        target="_blank"
        rel="noopener"
        href="https://github.com/spences10"
      >
        <GitHub />
      </a>
      <a
        aria-label="YouTube"
        target="_blank"
        rel="noopener"
        href="https://ss10/yt"
      >
        <YouTube />
      </a>
    </div>
  </div>
</footer>
