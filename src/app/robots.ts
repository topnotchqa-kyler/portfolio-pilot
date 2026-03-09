import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/checkout/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
