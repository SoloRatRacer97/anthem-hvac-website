import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CallToAction } from '@/components/CallToAction';
import { ServiceCards } from '@/components/ServiceCards';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'HVAC & Plumbing Services in Coachella Valley',
  description: 'Explore Anthem plumbing, drain, water heater, AC, heating, furnace, insulation, and air-duct services throughout Coachella Valley, CA.',
  path: '/services',
});

export default function ServicesPage() {
  const plumbing = services.filter((service) => service.category === 'Plumbing');
  const cooling = services.filter((service) => service.category === 'Cooling');
  const heating = services.filter((service) => service.category === 'Heating');

  return <main><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
    <section className="pageHero serviceHubHero"><div className="shell pageHeroContent"><p className="eyebrow">Complete home service</p><h1>Plumbing, Heating &amp; Cooling Services</h1><p>Local expertise for repairs, maintenance, replacements, and home-comfort improvements across Coachella Valley.</p></div></section>
    <section className="section"><div className="sectionHeading"><p className="sectionKicker">Plumbing</p><h2>Professional plumbing solutions</h2><p>Support for drains, pipes, water heaters, sewer lines, fixtures, and urgent plumbing problems.</p></div><div className="shell"><ServiceCards items={plumbing} /></div></section>
    <section className="section softSection"><div className="sectionHeading"><p className="sectionKicker">Air conditioning</p><h2>Cooling services for California heat</h2><p>Responsive AC repairs and thoughtful system recommendations for dependable comfort.</p></div><div className="shell"><ServiceCards items={cooling} /></div></section>
    <section className="section"><div className="sectionHeading"><p className="sectionKicker">Heating</p><h2>Reliable heating and furnace service</h2><p>Diagnostics, repairs, and replacement options that help keep your home comfortable.</p></div><div className="shell"><ServiceCards items={heating} /></div></section><CallToAction />
  </main>;
}
