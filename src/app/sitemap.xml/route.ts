// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { ALL_COUNTY_SLUGS } from '@/lib/counties';

const BASE = 'https://www.sylviegarbagecollection.co.ke';
const API  = 'https://api.sylviegarbagecollection.co.ke/api';

// ─── Fetch live service slugs from your API ───────────────────
async function getServiceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API}/services`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const services: { slug?: string; id?: number; is_active?: boolean }[] =
      Array.isArray(data) ? data : data.data ?? [];
    return services
      .filter(s => s.is_active !== false && (s.slug || s.id))
      .map(s => s.slug || String(s.id));
  } catch {
    return [];
  }
}

// ─── URL builder ──────────────────────────────────────────────
function url(
  path: string,
  priority: number,
  changefreq: string,
  lastmod?: string
) {
  return `
  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${lastmod ?? new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

// ─── Route groups ─────────────────────────────────────────────
const STATIC_ROUTES = [
  // Core
  { path: '/',               priority: 1.0, changefreq: 'weekly'  },
  { path: '/about',          priority: 0.8, changefreq: 'monthly' },
  { path: '/contact',        priority: 0.8, changefreq: 'monthly' },
  { path: '/quote',          priority: 0.9, changefreq: 'monthly' },

  // Services hub
  { path: '/services',       priority: 0.9, changefreq: 'weekly'  },

  // Waste management county pages
  { path: '/services/nairobi',  priority: 0.8, changefreq: 'monthly' },
  { path: '/services/nakuru',   priority: 0.8, changefreq: 'monthly' },
  { path: '/services/narok',    priority: 0.8, changefreq: 'monthly' },
  { path: '/services/laikipia', priority: 0.8, changefreq: 'monthly' },

  // Shop
  { path: '/shop',           priority: 0.7, changefreq: 'weekly'  },
  { path: '/cart',           priority: 0.4, changefreq: 'monthly' },
  { path: '/wishlist',       priority: 0.4, changefreq: 'monthly' },

  // Sanitary bins hub + quote
  { path: '/sanitary-bins',       priority: 0.9, changefreq: 'weekly'  },
  { path: '/sanitary-bins/quote', priority: 0.8, changefreq: 'monthly' },

  // Legal
  { path: '/privacy-policy',   priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookie-policy',    priority: 0.3, changefreq: 'yearly' },
];

// ─── Handler ─────────────────────────────────────────────────
export async function GET() {
  // Fetch dynamic service slugs in parallel with nothing else blocking
  const serviceSlugs = await getServiceSlugs();

  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${
  // ── Static pages ──────────────────────────────────────────
  STATIC_ROUTES
    .map(r => url(r.path, r.priority, r.changefreq, today))
    .join('')
}
${
  // ── Dynamic service detail pages (from API) ───────────────
  serviceSlugs
    .map(slug => url(`/services/${slug}`, 0.8, 'weekly', today))
    .join('')
}
${
  // ── Sanitary bin county pages — all 47 ───────────────────
  ALL_COUNTY_SLUGS
    .map(slug => url(`/sanitary-bins/${slug}`, 0.8, 'monthly', today))
    .join('')
}
</urlset>`;

  return new NextResponse(sitemap.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}