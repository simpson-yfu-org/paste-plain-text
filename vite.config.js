import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.js',
      name: 'PastePlainText',
      fileName: `paste-plain-text.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      // input: {
      //   main: path.resolve(__dirname, "src/components/main.ts")
      // },
      external: ['vue'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
