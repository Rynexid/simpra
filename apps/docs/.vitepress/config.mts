import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Simpra',
  description: 'Modern Inventory & Warehouse Platform',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Features', link: '/features/' },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/' },
        { text: 'Architecture', link: '/guide/architecture' },
      ],
      '/features/': [
        { text: 'Inventory', link: '/features/inventory' },
        { text: 'Warehouses', link: '/features/warehouses' },
      ],
    },
  },
})
