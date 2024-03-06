// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@kevinmarrec/nuxt-pwa', '@nuxtjs/device', 'nuxt-vitest', 'nuxt-swiper'],
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
              "error": "#dc2626",
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
              "error": "#dc2626",
            },
            lajucamp24: {
              "primary": "#163e9c",
              "secondary": "#ffbc57",
              "accent": "#42288f",
              "neutral": "#212121",
              "base-100": "#f3f4f6",
              "info": "#14b8a6",
              "success": "#74bb20",
              "warning": "#CE7E00",
              "error": "#e70000",
            },
            lajucamp24Dark: {
              "primary": "#638be9",
              "secondary": "#a86500",
              "accent": "#8970d7",
              "neutral": "#eae9fc",
              "base-100": "#181f25",
              "info": "#14b8a6",
              "success": "#74bb20",
              "warning": "#CE7E00",
              "error": "#e70000",
            },
            kjd: {
              "primary": "#00aca8",
              "secondary": "#d24b09",
              "accent": "#42288f",
              "neutral": "#212121",
              "base-100": "#f3f4f6",
              "info": "#14b8a6",
              "success": "#74bb20",
              "warning": "#CE7E00",
              "error": "#e70000",
            },
            kjdDark: {
              "primary": "#00aca8",
              "secondary": "#d24b09",
              "accent": "#8970d7",
              "neutral": "#eae9fc",
              "base-100": "#181f25",
              "info": "#14b8a6",
              "success": "#74bb20",
              "warning": "#CE7E00",
              "error": "#e70000",
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
      description: '',
      hds: true,
      disableEvents: false,
      iosLink: '',
      androidLink: '',
      theme: 'lajucamp24'
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
