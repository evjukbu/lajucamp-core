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
        themes: ["fantasy", "night"],
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
  }
})
