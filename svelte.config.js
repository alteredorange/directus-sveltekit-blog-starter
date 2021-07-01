import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
// import adapter from '@sveltejs/adapter-node'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      // pages: 'build',
      // assets: 'build',
      // fallback: null
    }),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // hydrate: false,
    vite: {
      plugins: [WindiCSS.default()]
    }
  }
}

export default config
