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
      safelist: [
        "bg-orange-400",
        "bg-secondary",
        "bg-red-400",
        "bg-purple-400"
      ]

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
    },
    workbox: {
      templatePath: '@/public/sw.js'
    }
  }
})
