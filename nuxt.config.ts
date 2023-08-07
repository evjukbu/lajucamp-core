// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@kevinmarrec/nuxt-pwa'],
  tailwindcss: {
    config: {
      plugins: [
        require("daisyui"),
        require('@tailwindcss/typography'),
      ],
      daisyui: {
        themes: [
          "light",
          "fantasy",
          "pastel",
          "forest",
          "dark",
        ],        
      },
      theme: {
        container: {
          margin: '1rem',
        },
      },
      
    }
  },
  runtimeConfig: {
    public: {
      pocketbaseUrl: '',
    }
  },
})
