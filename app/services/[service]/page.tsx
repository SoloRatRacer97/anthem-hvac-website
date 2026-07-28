import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ClipboardCheck, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CallToAction } from '@/components/CallToAction';
import { LocationCards } from '@/components/LocationCards';
import { ServiceCards } from '@/components/ServiceCards';
import { locations } from '@/data/locations';
import { serviceBySlug, services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};
  return createMetadata({
    title: `${service.shortTitle} in Coachella Valley, CA`,
    description: `${service.summary} Choose Anthem for ${service.shortTitle.toLowerCase()} in Coachella Valley and request an estimate today.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service', name: service.title,
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.productionUrl },
    areaServed: 'Coachella Valley, California', url: `${siteConfig.productionUrl}/services/${service.slug}`,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.productionUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.productionUrl}/services` },
      { '@type': 'ListItem', position: 3, name: service.shortTitle, item: `${siteConfig.productionUrl}/services/${service.slug}` },
    ],
  };

  return <main><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.shortTitle }]} />
    <section className="serviceHero"><div className="serviceHeroImage"><img src={service.image} alt={`${service.shortTitle} from Anthem`} /></div><div className="shell serviceHeroGrid"><div><p className="eyebrow">{service.category} services</p><h1>{service.shortTitle} in Coachella Valley, CA</h1><p>{service.description}</p><div className="buttonRow"><Link className="button primary" href="/contact">Request an Estimate <ArrowRight /></Link><a className="button outlineLight" href="tel:+17608952621"><Phone /> (760) 895-2621</a></div></div></div></section>
    <section className="section"><div className="shell splitGrid"><div className="textPanel"><p className="sectionKicker">Professional solutions</p><h2>Dependable {service.shortTitle.toLowerCase()} from a local team</h2><p>{service.description}</p><p>Our technicians assess the situation, explain the available options, and provide clear pricing before approved work begins.</p></div><div className="featurePanel"><Wrench /><h2>What we can help with</h2><ul className="checkList">{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div></div></section>
    <section className="section softSection"><div className="sectionHeading"><p className="sectionKicker">When to call</p><h2>Signs you may need {service.shortTitle.toLowerCase()}</h2></div><div className="shell valueGrid threeColumns"><article><ClipboardCheck /><h3>Performance changes</h3><p>Changes in flow, temperature, sound, odor, or system performance deserve professional attention.</p></article><article><ShieldCheck /><h3>Recurring problems</h3><p>A problem that keeps returning may point to a larger issue that needs a complete diagnosis.</p></article><article><CheckCircle2 /><h3>Planning ahead</h3><p>Expert guidance helps you compare repair, maintenance, and replacement options with confidence.</p></article></div></section>
    <section className="section processSection"><div className="sectionHeading"><p className="sectionKicker">Our process</p><h2>What to expect during your service</h2></div><div className="shell processGrid"><div><span>01</span><h3>Listen and inspect</h3><p>We learn what you are experiencing and carefully assess the system.</p></div><div><span>02</span><h3>Explain the options</h3><p>You receive clear recommendations and pricing before work begins.</p></div><div><span>03</span><h3>Complete the work</h3><p>Our team works carefully and tests the completed repair or installation.</p></div><div><span>04</span><h3>Review the result</h3><p>We explain the completed work and answer your questions.</p></div></div></section>
    <section className="section darkSection"><div className="sectionHeading lightHeading"><p className="sectionKicker">Areas we serve</p><h2>{service.shortTitle} service near you</h2><p>Anthem serves homeowners throughout Coachella Valley.</p></div><div className="shell"><LocationCards items={locations.slice(0, 6)} /></div></section>
    {related.length > 0 && <section className="section"><div className="sectionHeading"><p className="sectionKicker">Related services</p><h2>More ways Anthem can help</h2></div><div className="shell"><ServiceCards items={related} /></div></section>}
    <section className="section faqSection"><div className="shell narrowShell"><div className="sectionHeading"><p className="sectionKicker">Frequently asked questions</p><h2>{service.shortTitle} questions</h2></div><div className="faqList"><details><summary>How do I schedule {service.shortTitle.toLowerCase()}?</summary><p>Call Anthem at (760) 895-2621 or use the contact form to prepare your service request.</p></details><details><summary>Do you provide upfront pricing?</summary><p>Yes. We explain the diagnosis, options, and pricing before approved work begins.</p></details><details><summary>Which areas do you serve?</summary><p>Anthem serves Palm Springs, Palm Desert, Indio, Cathedral City, La Quinta, Coachella, Desert Hot Springs, Rancho Mirage, and nearby communities.</p></details></div></div></section>
    <CallToAction title={`Need ${service.shortTitle.toLowerCase()}?`} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
  </main>;
}
