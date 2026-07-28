import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function CallToAction({ title = 'Ready for reliable home service?', copy = 'Tell Anthem what you need and our local team will help you plan the next step.' }: { title?: string; copy?: string }) {
  return (
    <section className="ctaBand">
      <div className="shell ctaInner">
        <div><h2>{title}</h2><p>{copy}</p></div>
        <a className="button light" href="tel:+17608952621"><Phone aria-hidden="true" /> Call (760) 895-2621</a>
        <Link className="button dark" href="/contact">Request Service <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
