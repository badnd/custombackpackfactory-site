const productRedirects = [
  'yqjy2977-compact-business-backpack',
  'yqjy2989-travel-ready-business-backpack',
  'yqjy616-17-inch-business-travel-backpack',
  'yqjy2286-business-laptop-travel-backpack',
  'yqjy0014-custom-all-over-print-backpack',
  'custom-laptop-backpack',
  'business-travel-backpack',
  'mini-crossbody-bag',
  'kids-school-backpack',
  'foldable-lightweight-backpack',
  'tactical-travel-backpack',
  'custom-hydration-vest'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    const baseRedirects = [
      { source: '/pages/products.html', destination: '/products', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/pages/about.html', destination: '/about', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/pages/factory.html', destination: '/factory', permanent: true },
      { source: '/factory.html', destination: '/factory', permanent: true },
      { source: '/pages/contact.html', destination: '/contact', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/pages/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/custom-logo.html', destination: '/custom-service', permanent: true },
      { source: '/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/customization', destination: '/custom-service', permanent: true },
      { source: '/customization.html', destination: '/custom-service', permanent: true },
      { source: '/pages/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/pages/blog.html', destination: '/blog', permanent: true },
      { source: '/blog.html', destination: '/blog', permanent: true }
    ];

    return [
      ...baseRedirects,
      ...productRedirects.flatMap((slug) => [
        { source: `/pages/${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/${slug}`, destination: `/products/${slug}`, permanent: true }
      ])
    ];
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};

export default nextConfig;
