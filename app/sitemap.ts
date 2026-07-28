import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { locations } from '@/data/locations';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ['', '/about-us', '/contact', '/services', '/locations', '/privacy-policy', '/terms-of-service'];
  return [
    ...core.map((path) => ({ url: `${siteConfig.productionUrl}${path}`, lastModified: new Date('2026-07-29'), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .7 })),
    ...services.map(({ slug }) => ({ url: `${siteConfig.productionUrl}/services/${slug}`, lastModified: new Date('2026-07-29'), changeFrequency: 'monthly' as const, priority: .8 })),
    ...locations.map(({ slug }) => ({ url: `${siteConfig.productionUrl}/${slug}`, lastModified: new Date('2026-07-29'), changeFrequency: 'monthly' as const, priority: .8 })),
  ];
}
