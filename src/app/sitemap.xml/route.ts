// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://sylviegarbagecollection.co.ke';
  
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/quote', priority: 0.9, changefreq: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
    { path: '/cookie-policy', priority: 0.3, changefreq: 'yearly' },
    { path: '/services/nairobi', priority: 0.7, changefreq: 'monthly' },
    { path: '/services/nakuru', priority: 0.7, changefreq: 'monthly' },
    { path: '/services/narok', priority: 0.7, changefreq: 'monthly' },
    { path: '/services/laikipia', priority: 0.7, changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}