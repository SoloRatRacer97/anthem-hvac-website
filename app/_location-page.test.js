import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

import { locationPages, renderLocationHtml } from './_location-page.js';

let template;

beforeAll(async () => {
  template = await readFile(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
});

describe('location page rendering', () => {
  it.each(Object.entries(locationPages))('renders %s with the homepage design and %s wording', (slug, location) => {
    const html = renderLocationHtml(template, slug);

    expect(html).toContain(`data-location-city="${location.city}"`);
    expect(html).toContain(`Company in ${location.city}`);
    expect(html).toContain(`HVAC &amp; Plumbing Services in ${location.city}`);
    expect(html).toContain(location.localCopy);
    expect(html).toContain(`canonical" href="https://anthemplumbing.com/${slug}`);
    expect(html).toContain('class="request-card"');
    expect(html).toContain('class="service-grid"');
    expect(html).toContain('class="why-layout"');
    expect(html).toContain('class="locations-grid"');
    expect(html).toContain('class="faq-layout"');
    expect(html).not.toContain('class="boulder-page"');
    expect(html).not.toContain('Front Range');
  });

  it('uses the requested Coachella Valley footer copy', () => {
    const html = renderLocationHtml(template, 'palm-desert');
    expect(html).toContain('dependable care for Coachella Valley homeowners.');
  });

  it('uses the requested homepage H1 and footer copy', () => {
    expect(template).toContain("Coachella Valley's <span class=\"hero-nowrap\"><span>top-rated HVAC</span> and <span>plumbing</span></span> <span class=\"hero-company-line\">company.</span>");
    expect(template).toContain('dependable care for Coachella Valley homeowners.');
  });

  it('rejects unknown location slugs', () => {
    expect(renderLocationHtml(template, 'unknown')).toBeNull();
  });
});
