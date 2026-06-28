import { siteData } from '@/data/site-data';
import { blogPosts } from '@/data/blog-posts';
import { productPath, siteUrl } from '@/lib/paths';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['/', '/products', '/custom-service', '/factory', '/about', '/contact', '/privacy-policy', '/blog'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route === '/' ? '' : route}`, lastModified: now })),
    ...Object.keys(siteData.products).map((slug) => ({ url: `${siteUrl}${productPath(slug)}`, lastModified: now })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date }))
  ];
}
