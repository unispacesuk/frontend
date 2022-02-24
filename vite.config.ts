import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueClassStoresPlugin } from 'vite-plugin-vue-class-stores';

const vueClassStores = viteVueClassStoresPlugin({
    usingTypescript     : true,
    shortVueDeclaration : true,
    pluginDirectory     : './src/Stores/Plugin',
    storesDirectory     : './src/Stores',
  });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
  },
  plugins: [vue(), vueClassStores]
})
