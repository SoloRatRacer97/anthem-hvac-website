import type { Metadata } from 'next';
import { isPreviewDeployment, siteConfig } from '@/config/site';

export function createMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonical = new URL(path, siteConfig.productionUrl).toString();

  return {
    title,
    description,
    alternates: { canonical },
    robots: isPreviewDeployment ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}
