export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/profile/', '/my-list/'],
    },
    sitemap: 'https://netflix-clone.vercel.app/sitemap.xml',
  }
}