import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Simpra Docs',
  description: 'Modern Inventory & Warehouse Platform — documentation',
  base: '/',
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Features', link: '/features/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/' },
        { text: 'Architecture', link: '/guide/architecture' },
        { text: 'Deployment', link: '/guide/deployment' },
      ],
      '/features/': [
        { text: 'Overview', link: '/features/' },
        { text: 'Inventory', link: '/features/inventory' },
        { text: 'Warehouses', link: '/features/warehouses' },
        { text: 'Stock & Transactions', link: '/features/stock' },
        { text: 'Purchasing', link: '/features/purchasing' },
        { text: 'Suppliers', link: '/features/suppliers' },
        { text: 'Analytics', link: '/features/analytics' },
      ],
      '/api/': [
        { text: 'API Overview', link: '/api/' },
        { text: 'Authentication', link: '/api/auth' },
        { text: 'Endpoints', link: '/api/endpoints' },
      ],
    },
    footer: {
      message: 'Built by Rynex Studio',
      copyright: 'Copyright © 2026 Rynex Studio',
    },
  },
})
