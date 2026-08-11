import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

import { applyHeadMetadata, htmlResponse } from './_html-response.js';

export const locationPages = {
  'palm-springs': {
    city: 'Palm Springs',
    localCopy: 'Palm Springs homes need dependable cooling through intense desert summers, along with plumbing systems that can handle hard water and year-round household use. Anthem provides responsive local service for established neighborhoods, seasonal residences, and growing communities throughout the city.',
  },
  'palm-desert': {
    city: 'Palm Desert',
    localCopy: 'Palm Desert homeowners depend on efficient cooling, reliable water heaters, and durable plumbing through hot summers and year-round use. Anthem helps protect local homes with practical repairs, clear recommendations, and responsive service built for desert conditions.',
  },
  indio: {
    city: 'Indio',
    localCopy: 'Indio combines fast-growing neighborhoods with long-established homes, all facing demanding summer heat and hard-water wear. Anthem provides local HVAC and plumbing service designed to keep cooling, drains, fixtures, and water heaters working reliably.',
  },
  'cathedral-city': {
    city: 'Cathedral City',
    localCopy: 'Cathedral City homes rely on strong air conditioning, balanced airflow, and dependable plumbing during long stretches of desert heat. Anthem helps local homeowners address cooling problems, leaks, drains, water heaters, and preventive maintenance with straightforward service.',
  },
  'la-quinta': {
    city: 'La Quinta',
    localCopy: 'La Quinta homeowners expect year-round comfort in residences ranging from established neighborhoods to newer desert communities. Anthem delivers HVAC and plumbing support for cooling performance, hard-water concerns, water heaters, drains, and urgent repairs.',
  },
  coachella: {
    city: 'Coachella',
    localCopy: 'Coachella families need cooling and plumbing systems that perform through extreme summer temperatures and everyday household demand. Anthem supports local homes with dependable AC service, plumbing repairs, drain solutions, water heater help, and emergency response.',
  },
  'desert-hot-springs': {
    city: 'Desert Hot Springs',
    localCopy: 'Desert Hot Springs homes face intense heat and mineral-rich water that can put extra strain on cooling equipment, fixtures, and water heaters. Anthem provides practical HVAC and plumbing solutions tailored to local conditions and year-round comfort needs.',
  },
  'rancho-mirage': {
    city: 'Rancho Mirage',
    localCopy: 'Rancho Mirage homeowners rely on precise cooling, dependable plumbing, and responsive service to protect comfort and property. Anthem provides experienced HVAC and plumbing care for repairs, maintenance, water heaters, drains, and urgent home-service needs.',
  },
};

const footerDescription = 'Trusted plumbing, heating, and cooling solutions built on honest service, quality workmanship, and dependable care for Coachella Valley homeowners.';

export function renderLocationHtml(template, slug) {
  const location = locationPages[slug];
  if (!location) return null;

  const { city, localCopy } = location;
  const $ = load(template, { decodeEntities: false });
  const reviewUrl = `https://www.google.com/search?q=${encodeURIComponent(`Anthem plumbing heating cooling ${city} reviews`)}`;

  $('body').attr('data-location-city', city).attr('data-location-slug', slug);
  $('.brand-logo').attr('alt', `Anthem Cooling, Heating & Plumbing serving ${city}`);
  $('.hero-content .eyebrow').text(`Serving ${city} & the Coachella Valley · Since 2002`);
  $('.hero-content h1').html(`Top-Rated <span class="hero-nowrap"><span>HVAC</span> and <span>Plumbing</span></span> <span class="hero-company-line">Company in ${city}</span>`);
  $('.hero-content .hero-copy').text(`From no-cooling emergencies to leaks and drain problems, Anthem helps ${city} homeowners with honest pricing, dependable HVAC and plumbing repairs, and same-day emergency support.`);
  $('.service-address-field input').attr('placeholder', `Street, ${city}, CA`);
  $('.services .section-heading h2').text(`HVAC & Plumbing Services in ${city}`);
  $('.why-card h2').text(`Local HVAC & Plumbing Experts in ${city}`);
  $('.why-card > p').text(localCopy);
  $('.value-grid > div').eq(1).find('p').text(`Proudly serving ${city} and the Coachella Valley since 2002. We're your neighbors.`);
  $('.trust-note').html(`<i data-lucide="shield-star"></i> Trusted by homeowners in ${city} and across the Coachella Valley since 2002.`);
  $('.why-photo-card img').attr('alt', `Anthem HVAC and plumbing team serving ${city}`);
  $('.reviews-heading h2').html(`See What ${city} <span>Customers</span> Are Saying`);
  $('.review-card, .google-review-button').attr('href', reviewUrl);
  $('.faq-intro > p:not(.section-kicker)').text(`Answers to common HVAC and plumbing questions from ${city} homeowners.`);
  $('.faq-accordion details').eq(0).find('p').text(`Yes. We provide emergency plumbing, heating, and cooling support throughout ${city} and the Coachella Valley. When you call, we'll respond as quickly as possible.`);
  $('.faq-accordion details').eq(4).find('p').text(`We serve ${city}, Palm Springs, Palm Desert, Indio, Cathedral City, La Quinta, Coachella, Desert Hot Springs, Rancho Mirage, and nearby Coachella Valley communities.`);
  $('.footer-company > p').text(footerDescription);
  $('.footer-contact span').first().html(`<i data-lucide="map-pin"></i> ${city}, CA &amp; Coachella Valley`);
  $('.footer-bottom span').last().text(`Serving ${city} and the Coachella Valley Since 2002`);

  return applyHeadMetadata($.html(), {
    canonicalPath: `/${slug}`,
    title: `HVAC & Plumbing Services in ${city}, CA | Anthem`,
    description: `Anthem provides top-rated HVAC, plumbing, heating, cooling, water heater, and emergency services for homeowners in ${city}, CA.`,
  });
}

export async function renderLocationPage(slug) {
  const template = await readFile(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  const html = renderLocationHtml(template, slug);
  return html ? htmlResponse(html) : new Response('Not found', { status: 404 });
}
