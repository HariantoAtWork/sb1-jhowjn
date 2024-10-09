// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api'
    },
    mongodbUri: process.env.MONGODB_URI || 'mongodb://mongo:27017/accountmanager'
  },
  plugins: [
    '~/plugins/error-handler.client.js'
  ],
  srcDir: './',
  serverDir: './server'  // Add this line to specify the new server directory
})