import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';

export default function NotFound() {
  return <main className="notFound"><Wrench aria-hidden="true" /><p className="sectionKicker">404 error</p><h1>This page went down the drain</h1><p>The page you requested could not be found. Our main service and location pages can help you get back on track.</p><div className="buttonRow"><Link className="button primary" href="/"><ArrowLeft /> Return Home</Link><Link className="button outline" href="/services">Browse Services</Link></div><section><h2>Need help now?</h2><p>Call Anthem at <a href="tel:+17608952621">(760) 895-2621</a> for local plumbing and HVAC support.</p></section></main>;
}
