import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CallToAction } from '@/components/CallToAction';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'About Anthem Air Conditioning & Plumbing',
  description: 'Meet Anthem, a locally run plumbing, heating, and cooling team serving Coachella Valley with honest communication and dependable workmanship.',
  path: '/about-us',
});

export default function AboutPage() {
  return <main><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
    <section className="pageHero photoHero"><div className="pageHeroImage"><img src="/assets/group.png" alt="Anthem service team" /></div><div className="shell pageHeroContent"><p className="eyebrow">Our company</p><h1>About Anthem Air Conditioning &amp; Plumbing</h1><p>Local expertise, honest recommendations, and dependable home service throughout Coachella Valley.</p></div></section>
    <section className="section"><div className="shell splitGrid"><div className="photoPanel"><img src="/assets/pages.webp" alt="Anthem professionals ready to serve" /></div><div className="textPanel"><p className="sectionKicker">Our story</p><h2>Built on honest service and strong local relationships</h2><p>Anthem was built around the belief that dependable home service starts with clear communication, careful work, and technicians who care about the people they serve.</p><p>Our mission is simple: show up when you need us, explain the work clearly, protect your home, and provide solutions with the respect we expect in our own homes.</p><Link className="textLink" href="/contact">Contact our team <ArrowRight /></Link></div></div></section>
    <section className="section softSection"><div className="sectionHeading"><p className="sectionKicker">What guides us</p><h2>The Anthem service standard</h2></div><div className="shell valueGrid"><article><MapPin /><h3>Locally Operated</h3><p>We live and work in the communities we serve.</p></article><article><Clock3 /><h3>Responsive Service</h3><p>Help is available when your home needs it.</p></article><article><ShieldCheck /><h3>Licensed &amp; Insured</h3><p>Professional, safety-focused service for your home.</p></article><article><BadgeDollarSign /><h3>Upfront Pricing</h3><p>Clear options and pricing before work begins.</p></article></div></section>
    <section className="section darkSection"><div className="shell narrowShell centered"><p className="sectionKicker">Why Anthem</p><h2>We treat your home like our own</h2><p>Our technicians arrive prepared, protect your space, and focus on lasting repairs rather than temporary fixes.</p><ul className="checkList inlineChecks"><li>Trained technicians</li><li>Quality materials</li><li>Clean, respectful service</li><li>Satisfaction focused</li></ul></div></section><CallToAction />
  </main>;
}
