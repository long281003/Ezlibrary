import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  server:{
    proxy:{
      '^/auth':{
        target: 'http://localhost:8080', 
        changeOrigin: true,
        pathRewrite: { '^/auth': '/auth' },
      },
      '^/member': {
          target: 'http://localhost:8080/',
          changeOrigin: true,
          pathRewrite: { '^/member': '/member' },
      },
      '^/otp': {
          target: 'http://localhost:8080/',
          changeOrigin: true,
           pathRewrite: { '^/otp': '/otp' },
      },
       '^/book': {
          target: 'http://localhost:8080/',
          changeOrigin: true,
           pathRewrite: { '^/book': '/book' },
      }
    }
  },   
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
