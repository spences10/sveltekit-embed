import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      // https://vitejs.dev/config/#server-fs-allow
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          // posts, copy
          allow: ['..'],
        },
      },
    },
  },
}

export default config
