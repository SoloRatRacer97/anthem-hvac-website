import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CallToAction } from '@/components/CallToAction';
import { LocationCards } from '@/components/LocationCards';
import { ServiceCards } from '@/components/ServiceCards';
import { locations } from '@/data/locations';
import { serviceBySlug } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Plumbing & HVAC Service Areas in Coachella Valley',
  description: 'Find Anthem plumbing, heating, and cooling service in Palm Springs, Palm Desert, Indio, La Quinta, Coachella, and nearby California communities.',
  path: '/locations',
});

export default function LocationsPage() {
  return <main><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Service Areas' }]} />
    <section className="pageHero locationHero"><div className="shell pageHeroContent"><p className="eyebrow">Local service areas</p><h1>Anthem Service Locations Near You</h1><p>Responsive plumbing, heating, cooling, water heater, and emergency service throughout Coachella Valley.</p></div></section>
    <section className="section"><div className="sectionHeading"><p className="sectionKicker">Choose your community</p><h2>Serving homeowners across the valley</h2><p>Every location page connects directly to the services available in your area.</p></div><div className="shell"><LocationCards items={locations} /></div></section>
    <section className="section softSection"><div className="sectionHeading"><p className="sectionKicker">Popular services</p><h2>Local help for your property</h2></div><div className="shell"><ServiceCards items={['residential-plumbing', 'commercial-plumbing', 'drain-cleaning', 'water-heaters', 'ac-repair', 'heating'].map((slug) => serviceBySlug[slug])} /></div></section><CallToAction />
  </main>;
}
