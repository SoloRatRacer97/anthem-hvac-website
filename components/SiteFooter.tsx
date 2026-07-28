import Link from 'next/link';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerGrid shell">
        <div className="footerCompany">
          <Link href="/" aria-label="Anthem home"><img src="/assets/anthem-logo.png" alt="Anthem Plumbing and HVAC" /></Link>
          <p>Trusted plumbing, heating, and cooling solutions built on honest service and dependable care for California homeowners.</p>
        </div>
        <nav className="footerColumn" aria-label="Company links">
          <h2>Company</h2>
          <Link href="/about-us">About Us</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </nav>
        <nav className="footerColumn" aria-label="Service links">
          <h2>Services</h2>
          <Link href="/services/plumbing">Plumbing</Link>
          <Link href="/services/drain-cleaning">Drain Cleaning</Link>
          <Link href="/services/water-heaters">Water Heaters</Link>
          <Link href="/services/ac-repair">AC Repair</Link>
          <Link href="/services/heating">Heating</Link>
        </nav>
        <div className="footerColumn footerContact">
          <h2>Contact</h2>
          <a href="tel:+17608952621"><Phone aria-hidden="true" /> (760) 895-2621</a>
          <a href="mailto:info@anthemplumbing.com"><Mail aria-hidden="true" /> info@anthemplumbing.com</a>
          <span><MapPin aria-hidden="true" /> Coachella Valley, California</span>
          <span><Clock3 aria-hidden="true" /> 24/7 Emergency Service</span>
        </div>
      </div>
      <div className="footerBottom shell">
        <span>&copy; 2026 Anthem Plumbing, Heating &amp; Cooling.</span>
        <Link href="/terms-of-service">Terms of Service</Link>
        <span>Licensed &amp; Insured</span>
      </div>
    </footer>
  );
}
