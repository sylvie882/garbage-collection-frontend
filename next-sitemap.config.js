// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sylviegarbagecollection.co.ke',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  
  // Exclude old WordPress paths and admin routes
  exclude: [
    '/wp-admin*',
    '/wp-content*',
    '/wp-includes*',
    '/wp-json*',
    '/api*',
    '/admin*',
    '/dashboard*',
    '/404',
    '/500'
  ],
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin',
          '/wp-content',
          '/wp-includes',
          '/wp-json',
          '/api',
          '/admin',
          '/dashboard'
        ],
      },
    ],
    additionalSitemaps: [
      'https://sylviegarbagecollection.co.ke/sitemap.xml',
    ],
  },

  // Custom transformation for your specific routes
  transform: async (config, path) => {
    // Custom priority for your pages
    const customPriority = {
      '/': 1.0,
      '/services': 0.9,
      '/quote': 0.9,
      '/about': 0.8,
      '/contact': 0.8,
      '/privacy-policy': 0.3,
      '/terms-of-service': 0.3,
    };

    // Custom change frequency
    const customChangefreq = {
      '/': 'weekly',
      '/services': 'monthly',
      '/quote': 'monthly',
      '/about': 'monthly',
      '/contact': 'monthly',
      '/privacy-policy': 'yearly',
      '/terms-of-service': 'yearly',
    };

    return {
      loc: path,
      changefreq: customChangefreq[path] || config.changefreq,
      priority: customPriority[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};