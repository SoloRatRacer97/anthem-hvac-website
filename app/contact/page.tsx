import type { Metadata } from 'next';
import { CalendarDays, CircleDollarSign, Clock3, Mail, Phone, TriangleAlert } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Contact Anthem Plumbing & HVAC',
  description: 'Contact Anthem to request plumbing, heating, cooling, drain, or water heater service in Coachella Valley, California.',
  path: '/contact',
});

export default function ContactPage() {
  return <main className="contactMain"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
    <section className="contactSection shell"><div className="contactShell"><aside className="contactIntro"><img src="/assets/anthem-logo.png" alt="Anthem Plumbing and HVAC" /><p className="sectionKicker">We&apos;re ready to help</p><h1>Request HVAC or Plumbing Service</h1><p>Tell us what is happening and our local team will follow up quickly with clear next steps.</p><div className="contactBenefits"><div><CalendarDays /><span><strong>Service bookings</strong><small>Schedule service at your convenience.</small></span></div><div><TriangleAlert /><span><strong>Emergency assistance</strong><small>Fast help when you need it most.</small></span></div><div><CircleDollarSign /><span><strong>Financing available</strong><small>Ask about flexible payment options.</small></span></div></div></aside><div className="contactFormPanel"><p className="sectionKicker">Contact Anthem</p><h2>Submit a General Inquiry</h2><p>Complete the form and your email app will prepare the request for our team.</p><ContactForm /></div></div>
      <div className="contactInfo"><a href="tel:+17608952621"><Phone /><span><small>Call anytime</small><strong>(760) 895-2621</strong></span></a><a href="mailto:info@anthemplumbing.com"><Mail /><span><small>Email us</small><strong>info@anthemplumbing.com</strong></span></a><div><Clock3 /><span><small>Emergency help</small><strong>Available 24/7</strong></span></div></div>
    </section>
  </main>;
}
