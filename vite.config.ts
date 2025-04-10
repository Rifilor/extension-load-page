// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// import { crx } from '@crxjs/vite-plugin'
// import manifest from './manifest.json'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//     crx({ manifest }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
// })

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' }
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    process.env.NODE_ENV === 'development' ? vueDevTools() : null, // DevTools тільки для розробки
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    }),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'src/assets/**/*',
    //       dest: 'assets/image',
    //     },
    //   ],
    // }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        popup: 'index.html',
        content: 'src/content.ts',
        'sw-throttle': 'src/sw-throttle.ts',
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        chunkFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  define: {
    'process.env': {},
    global: {},
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
})
