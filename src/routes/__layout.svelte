<script>
  import '../app.css'
  import '../prism.css'
</script>

<header class="text-right">
  <span
    class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] m-4"
    data-tip="GitHub"
    ><div class="flex-none items-center">
      <a
        aria-label="Github"
        target="_blank"
        href="https://github.com/spences10/sveltekit-embed"
        rel="noopener"
        class="btn btn-ghost drawer-button btn-square normal-case"
        ><svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="inline-block h-10 w-10 fill-current"
          ><path
            d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"
          /></svg
        ></a
      >
    </div></span
  >
</header>

<main class="prose prose-xl container max-w-3xl mx-auto px-4 mb-20">
  <slot />
</main>

<footer
  class="p-10 footer bg-primary text-primary-content footer-center"
>
  <div class="text-xl">
    <img
      src="https://res.cloudinary.com/defkmsrpw/image/upload/q_auto,f_auto/v1622648685/ezgif.com-gif-maker.gif"
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
      <a aria-label="Twitter" href="https://twitter.com/spences10">
        <svg
          role="img"
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="25"
          width="25"
          class="fill-current text-primary-content transition hover:text-primary-focus"
        >
          <path
            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          />
        </svg>
      </a>
      <a aria-label="GitHub" href="https://github.com/spences10">
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="https://www.w3.org/2000/svg"
          height="25"
          width="25"
          class="fill-current text-primary-content transition hover:text-primary-focus"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      </a>
      <a aria-label="YouTube" href="https://ss10/yt">
        <svg
          role="img"
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="25"
          width="25"
          class="fill-current text-primary-content transition hover:text-primary-focus"
        >
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
      </a>
    </div>
  </div>
</footer>
