import { serveStaticHtml } from '../_html-response.js';
import { locationPages, renderLocationPage } from '../_location-page.js';
import { renderServicePage } from '../services/_render-service.js';

const staticPages = {
  'about-us': 'about.html',
  contact: 'contact.html',
  locations: 'locations.html',
  'privacy-policy': 'privacy-policy.html',
  'terms-of-service': 'terms-of-service.html',
  'coachella-valley': 'anthem-ac-plumbing.html',
  'anthem-branded-location-lp': 'Anthem Branded Location LP.html',
  'boiler-repair-boulder-co': 'boiler-repair-boulder-co.html',
};

export async function GET(_request, { params }) {
  const { page } = await params;
  if (page === 'plumbing' || page === 'hvac') return renderServicePage(page, `/${page}`);
  if (locationPages[page]) return renderLocationPage(page);
  const fileName = staticPages[page];
  if (!fileName) return new Response('Not found', { status: 404 });
  return serveStaticHtml(fileName, `/${page}`);
}
