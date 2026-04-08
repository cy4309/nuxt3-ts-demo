// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.cjs'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/works': { swr: 60 },
    '/works/**': { swr: 60 }
  },
  hooks: {
    'pages:extend'(pages) {
      const setMeta = (path: string, name: string, title: string) => {
        const page = pages.find((item: NuxtPage) => item.path === path)
        if (!page) return
        page.name = name
        page.meta = { ...(page.meta || {}), sectionTitle: title }
      }

      setMeta('/', 'home', 'Home')
      setMeta('/about', 'about', 'About')
      setMeta('/works', 'works', 'Works')
      setMeta('/works/:slug()', 'work-slug', 'Work Detail')
    }
  }
})
