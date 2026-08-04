// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/

Sitemap: https://www.sylviegarbagecollection.co.ke/sitemap.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}