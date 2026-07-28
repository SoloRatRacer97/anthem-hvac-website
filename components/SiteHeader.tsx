'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { type MouseEvent, useState } from 'react';

const plumbingLinks = [
  ['Residential Plumbing', '/services/residential-plumbing'],
  ['Commercial Plumbing', '/services/commercial-plumbing'],
  ['Drain Cleaning', '/services/drain-cleaning'],
  ['Sewer Line Repair', '/services/sewer-line-repair-and-replacement'],
  ['Water Heaters', '/services/water-heaters'],
  ['Hydro Jetting', '/services/hydro-jetting'],
];

const hvacLinks = [
  ['AC Repair', '/services/ac-repair'],
  ['AC Replacement', '/services/ac-replacement'],
  ['AC Installation', '/services/ac-installation'],
  ['Furnace Repair', '/services/furnace-repair'],
  ['Furnace Replacement', '/services/furnace-replacement'],
  ['Insulation', '/services/insulation'],
  ['Air Duct Cleaning', '/services/air-duct-cleaning'],
];

function NavGroup({ label, href, links }: { label: string; href: string; links: string[][] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`navGroup ${expanded ? 'isExpanded' : ''}`}>
      <div className="navGroupTrigger">
        <Link href={href}>{label}</Link>
        <button type="button" aria-label={`Toggle ${label} menu`} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}><ChevronDown aria-hidden="true" /></button>
      </div>
      <div className="navDropdown">
        {links.map(([name, route]) => <Link href={route} key={route}>{name}</Link>)}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentPath = pathname || '/';
  const active = (route: string) => currentPath === route || (route !== '/' && currentPath.startsWith(route));
  const closeAfterNavigation = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  };

  return (
    <header className="siteHeader">
      <div className="headerTop shell">
        <Link className="siteLogo" href="/" aria-label="Anthem home">
          <img src="/assets/anthem-logo.png" alt="Anthem Plumbing and HVAC" />
        </Link>
        <a className="headerPhone" href="tel:+17608952621"><Phone aria-hidden="true" /> Call (760) 895-2621</a>
        <button className="menuToggle" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav className={`mainNavigation ${open ? 'isOpen' : ''}`} aria-label="Primary navigation" onClick={closeAfterNavigation}>
        <div className="navShell shell">
          <Link className={active('/') ? 'active' : ''} href="/">Home</Link>
          <NavGroup label="Plumbing" href="/services/plumbing" links={plumbingLinks} />
          <NavGroup label="HVAC" href="/services/hvac" links={hvacLinks} />
          <Link className={active('/about-us') ? 'active' : ''} href="/about-us">About Us</Link>
          <Link className={active('/locations') ? 'active' : ''} href="/locations">Locations</Link>
          <Link className={active('/contact') ? 'active' : ''} href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
