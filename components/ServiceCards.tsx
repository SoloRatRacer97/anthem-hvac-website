import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';

export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <div className="cardGrid serviceCardGrid">
      {items.map((service) => (
        <article className="contentCard" key={service.slug}>
          <div className="cardImage"><img src={service.image} alt="" /></div>
          <div className="cardBody">
            <span className="cardLabel">{service.category}</span>
            <h3>{service.shortTitle}</h3>
            <p>{service.summary}</p>
            <Link href={`/services/${service.slug}`}>{service.shortTitle} services <ArrowRight aria-hidden="true" /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
