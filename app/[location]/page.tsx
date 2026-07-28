import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CallToAction } from '@/components/CallToAction';
import { ServiceCards } from '@/components/ServiceCards';
import { locationBySlug, locations } from '@/data/locations';
import { serviceBySlug } from '@/data/services';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ location: string }> };

export function generateStaticParams() { return locations.map(({ slug }) => ({ location: slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  const location = locationBySlug[slug];
  if (!location) return {};
  return createMetadata({ title: `Plumbing & HVAC Services in ${location.city}, CA`, description: `Choose Anthem for plumbing, AC, heating, drain, and water heater service in ${location.city}, CA. Request local service today.`, path: `/${location.slug}` });
}

export default async function LocationPage({ params }: Props) {
  const { location: slug } = await params;
  const location = locationBySlug[slug];
  if (!location) notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: `Plumbing and HVAC service in ${location.city}`, provider: { '@type': 'LocalBusiness', name: siteConfig.name }, areaServed: `${location.city}, California`, url: `${siteConfig.productionUrl}/${location.slug}` };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.productionUrl },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteConfig.productionUrl}/locations` },
    { '@type': 'ListItem', position: 3, name: location.city, item: `${siteConfig.productionUrl}/${location.slug}` },
  ] };
  return <main><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Service Areas', href: '/locations' }, { label: location.city }]} />
    <section className="locationDetailHero"><div className="locationHeroBackdrop"><img src="/assets/anthem-hero.webp" alt={`Anthem service in ${location.city}`} /></div><div className="shell pageHeroContent"><p className="eyebrow">Local service in {location.region}</p><h1>Plumbing, Heating &amp; Cooling in {location.city}, CA</h1><p>{location.description} Local experts, clear options, and responsive help when you need it.</p><div className="buttonRow"><Link className="button primary" href="/contact">Schedule Service <ArrowRight /></Link><a className="button outlineLight" href="tel:+17608952621">Call (760) 895-2621</a></div></div></section>
    <section className="section"><div className="sectionHeading"><p className="sectionKicker">Services in {location.city}</p><h2>Professional property service from a local team</h2><p>Anthem provides practical solutions for the systems that keep homes and businesses safe and comfortable.</p></div><div className="shell"><ServiceCards items={['residential-plumbing', 'commercial-plumbing', 'drain-cleaning', 'water-heaters', 'ac-repair', 'heating'].map((serviceSlug) => serviceBySlug[serviceSlug])} /></div></section>
    <section className="section softSection"><div className="shell splitGrid"><div className="textPanel"><p className="sectionKicker">Why local homeowners call Anthem</p><h2>Dependable service in {location.city}</h2><p>Our team understands the demands local homes place on plumbing and HVAC systems. We arrive prepared, communicate clearly, and focus on reliable results.</p><ul className="checkList"><li><ShieldCheck /> Licensed and insured service</li><li><Clock3 /> Emergency help available 24/7</li><li><MapPin /> Local Coachella Valley team</li></ul></div><div className="mapPanel"><iframe title={`${location.city} service area map`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${location.city}, CA`)}&output=embed`} loading="lazy" /></div></div></section>
    <section className="section faqSection"><div className="shell narrowShell"><div className="sectionHeading"><p className="sectionKicker">Local service questions</p><h2>Serving {location.city} homeowners</h2></div><div className="faqList"><details><summary>Does Anthem provide emergency service in {location.city}?</summary><p>Yes. Emergency plumbing, heating, and cooling support is available by calling (760) 895-2621.</p></details><details><summary>What services are available?</summary><p>Anthem offers plumbing, drain cleaning, water heater, air-conditioning, heating, furnace, insulation, and air-duct services.</p></details></div></div></section><CallToAction title={`Need service in ${location.city}?`} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
  </main>;
}
