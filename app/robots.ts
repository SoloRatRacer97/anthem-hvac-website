import type { MetadataRoute } from 'next';
import { isPreviewDeployment, siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return isPreviewDeployment
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteConfig.productionUrl}/sitemap.xml` };
}
