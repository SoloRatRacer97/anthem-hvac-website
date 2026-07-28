import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, Phone, ShieldCheck, UsersRound } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { LocationCards } from '@/components/LocationCards';
import { ServiceCards } from '@/components/ServiceCards';
import { locations } from '@/data/locations';
import { serviceBySlug } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Plumbing, Heating & Cooling in Coachella Valley | Anthem',
  description: 'Anthem provides trusted plumbing, AC, heating, drain, and water heater service throughout Coachella Valley. Request dependable local service today.',
  path: '/',
});

export default function HomePage() {
  return (
    <main>
      <section className="homeHero">
        <div className="heroBackdrop"><img src="/assets/background.webp" alt="Anthem service vehicle at a California home" /></div>
        <div className="shell heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Your local neighborhood experts</p>
            <h1>Coachella Valley&apos;s Trusted <span>Plumbing, Heating &amp; Cooling</span> Company</h1>
            <p>From burst pipes to no-cooling emergencies, Anthem helps local homeowners with honest pricing, dependable repairs, and responsive support.</p>
            <div className="trustRow"><span><ShieldCheck /> Licensed &amp; Insured</span><span><UsersRound /> Family-Owned</span><span><Clock3 /> 24/7 Emergency</span></div>
            <div className="buttonRow"><a className="button primary" href="tel:+17608952621"><Phone /> Call (760) 895-2621</a><Link className="button outlineLight" href="/contact">Schedule Online <ArrowRight /></Link></div>
          </div>
          <div className="heroFormCard">
            <p className="sectionKicker">Fast local response</p>
            <h2>Request Your Service</h2>
            <p>Tell us what you need and prepare an email for our team.</p>
            <ContactForm compact />
          </div>
        </div>
      </section>

      <section className="section softSection">
        <div className="sectionHeading"><p className="sectionKicker">How we can help</p><h2>Plumbing and HVAC services for your whole home</h2><p>Experienced local help for urgent repairs, routine maintenance, and planned improvements.</p></div>
        <div className="shell"><ServiceCards items={['residential-plumbing', 'commercial-plumbing', 'drain-cleaning', 'water-heaters', 'ac-repair', 'heating'].map((slug) => serviceBySlug[slug])} /></div>
        <div className="centerAction"><Link className="button outline" href="/services">Explore all services <ArrowRight /></Link></div>
      </section>

      <section className="section splitSection">
        <div className="shell splitGrid">
          <div className="photoPanel"><img src="/assets/group.png" alt="Anthem local service team" /></div>
          <div className="textPanel"><p className="sectionKicker">The Anthem difference</p><h2>Locally run. Clear answers. Work done with care.</h2><p>We believe dependable home service starts with communication, respect, and practical recommendations. Our team protects your home, explains the work, and gives you clear options before moving forward.</p><ul className="checkList"><li>Honest, upfront pricing</li><li>Licensed and insured technicians</li><li>Respectful service at your home</li><li>Solutions built for long-term reliability</li></ul><Link className="textLink" href="/about-us">Meet Anthem <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="section darkSection">
        <div className="sectionHeading lightHeading"><p className="sectionKicker">Service areas</p><h2>Local help across Coachella Valley</h2><p>Choose your community to explore plumbing, heating, and cooling service near you.</p></div>
        <div className="shell"><LocationCards items={locations.slice(0, 8)} /></div>
      </section>

      <section className="section faqSection">
        <div className="shell narrowShell"><div className="sectionHeading"><p className="sectionKicker">Frequently asked questions</p><h2>Helpful answers before your appointment</h2></div><div className="faqList">
          <details><summary>Do you offer emergency plumbing and HVAC service?</summary><p>Yes. Anthem provides 24/7 emergency support for urgent plumbing, heating, and cooling problems throughout the service area.</p></details>
          <details><summary>Will I know the price before work begins?</summary><p>Our team diagnoses the issue, explains the available options, and provides clear pricing before approved work starts.</p></details>
          <details><summary>Which communities do you serve?</summary><p>We serve Palm Springs, Palm Desert, Indio, Cathedral City, La Quinta, Coachella, Desert Hot Springs, Rancho Mirage, and nearby communities.</p></details>
        </div></div>
      </section>
    </main>
  );
}
