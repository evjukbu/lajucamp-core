// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@kevinmarrec/nuxt-pwa', '@nuxtjs/device'],
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
  pwa: {
    manifest: {
      name: "Jugendfestival 2023",
      short_name: "Festival",
      lang: "de",
      description: "Die offizielle Begleitapp zum Festival der Kirchenkreise Burgdorf und Burgwedel-Langenhagen."
    },
    icon: {
      purpose: 'maskable'
    }
  }
})
