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
          {
            bulabu: {
              "primary": "#b70f65",
              "secondary": "#fdc334",
              "accent": "#38bdf8",
              "neutral": "#2a323c",
              "base-100": "#1d232a",
              "info": "#eb5c9d",
              "success": "#fccb83",
              "warning": "#f29277",
              "error": "#e94273",
            },
            bulabulight: {
              "primary": "#b70f65",
              "secondary": "#fdc334",
              "accent": "#38bdf8",
              "neutral": "#6b7280",
              "base-100": "#f3f4f6",
              "info": "#eb5c9d",
              "success": "#fccb83",
              "warning": "#f29277",
              "error": "#e94273",
            },
          },
          "pastel",
          "forest",
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
      saDomain: '',
      title: '',
      short_title: '',
      description: ''
    }
  },
  pwa: {
    manifest: {
      name: process.env.NUXT_PUBLIC_TITLE,
      short_name: process.env.NUXT_PUBLIC_SHORT_TITLE,
      lang: "de",
      description: process.env.NUXT_PUBLIC_DESCRIPTION
    },
    icon: {
      purpose: 'maskable'
    },
    workbox: {
      templatePath: '@/public/sw.js',
      offlinePage: '/404.html',
      globPatterns: ['**/*.{js,css}'],
      offline: true,
      preCaching: ["/", "/misc", "/misc/about", "/misc/settings/appearance", "/misc/settings/keys", "/misc/settings/keys/add", "/search", "/events", "/posts", "/misc/install"]
    }
  }
})
