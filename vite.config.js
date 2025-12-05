import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (/[\\/]node_modules[\\/](vue|vue-router|pinia)[\\/]/.test(id)) {
            return 'vendor-vue';
          }
          if (/[\\/]node_modules[\\/]naive-ui[\\/]/.test(id) || id.includes('@motionone')) {
            return 'vendor-ui';
          }
          if (id.includes('@aws-sdk')) {
            return 'vendor-aws';
          }
          return 'vendor';
        },
      },
    },
  },
})
