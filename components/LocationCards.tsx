import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { ServiceLocation } from '@/data/locations';

export function LocationCards({ items }: { items: ServiceLocation[] }) {
  return (
    <div className="locationGrid">
      {items.map((location) => (
        <Link className="locationCard" href={`/${location.slug}`} key={location.slug}>
          <MapPin aria-hidden="true" />
          <span><strong>{location.city}</strong><small>{location.description}</small></span>
          <ArrowRight aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
