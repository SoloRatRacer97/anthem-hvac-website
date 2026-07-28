import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ReviewBanner } from '@/components/ReviewBanner';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { isPreviewDeployment, siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionUrl),
  title: { default: `${siteConfig.name} | Coachella Valley`, template: `%s | Anthem` },
  description: 'Trusted plumbing, heating, and cooling service throughout Coachella Valley, California.',
  icons: { icon: '/favicon.ico' },
  robots: isPreviewDeployment ? { index: false, follow: false } : { index: true, follow: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['HVACBusiness', 'Plumber'],
  name: siteConfig.name,
  url: siteConfig.productionUrl,
  telephone: '+1-760-895-2621',
  email: siteConfig.email,
  areaServed: 'Coachella Valley, California',
  image: `${siteConfig.productionUrl}/assets/anthem-logo.png`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <ReviewBanner />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
