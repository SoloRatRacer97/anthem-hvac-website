import { readFile } from 'fs/promises';
import path from 'path';
import { load } from 'cheerio';
import { applyHeadMetadata, htmlResponse } from '../_html-response.js';
import { getServicePage } from './_service-data.js';

const escapeAttribute = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function renderCard(card) {
  return `
    <article class="service-page-card" id="${escapeAttribute(card.id)}">
      <div class="service-page-photo ${escapeAttribute(card.photo)}"></div>
      <div class="service-page-body">
        <div class="service-page-title"><i data-lucide="${escapeAttribute(card.icon)}"></i><h3>${card.title}</h3></div>
        <p>${card.summary}</p>
        <ul>${card.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>
        <a href="${escapeAttribute(card.href)}" data-service="${escapeAttribute(card.service)}">${card.action} <i data-lucide="arrow-right"></i></a>
      </div>
    </article>`;
}

export async function renderServicePage(slug = 'services', canonicalPath) {
  const service = getServicePage(slug);
  const sourceHtml = await readFile(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  const $ = load(sourceHtml, { decodeEntities: false });

  $('body').attr('class', 'services-page');
  $('link[rel="stylesheet"]').attr('href', '/styles.css?v=mobile-form-footer-0715');
  $('script[src^="script.js"]').attr('src', '/script.js?v=mobile-form-footer-0715');
  $('img[src^="assets/"]').each((_, image) => $(image).attr('src', `/${$(image).attr('src')}`));

  const hero = $('.hero');
  hero.addClass('service-hero-reference');
  hero.toggleClass('plumbing-service-hero', service.heroImage.includes('/van.png'));
  hero.toggleClass('hvac-service-hero', service.heroImage.includes('hvac'));
  hero.toggleClass('heating-service-hero', service.slug === 'heating');
  hero.toggleClass('spaced-service-hero', service.slug === 'plumbing' || service.slug === 'heating');
  hero.find('.hero-bg-photo').attr('src', service.heroImage);
  hero.find('.hero-service-highlights').remove();
  hero.find('.hero-content').html(`
    <p class="eyebrow">${service.eyebrow}</p>
    <h1>${service.heading}</h1>
    <p class="hero-copy">${service.summary}</p>
    <div class="hero-buttons">
      <a class="button button-red" href="tel:+17608952621"><i data-lucide="phone"></i> Call (760) 895-2621</a>
    </div>
  `);
  hero.find('.request-card-top h2').text('Request Service');
  hero.find('.request-card-top p').text('Tell us what you need and Anthem will follow up to schedule your service.');

  $('.why-review-divider').remove();
  const whySection = $('.why-choose');
  whySection.find('.section-kicker').remove();
  whySection.find('h2').text('Locally Run, Not Private Equity');
  whySection.find('.why-card > p:not(.section-kicker)').text(service.bodyCopy);
  whySection.find('.why-photo-card img').attr({ src: '/assets/group.png', alt: 'Anthem local service team' });

  const visibleCards = service.cards.filter((card) => card.slug !== service.currentServiceSlug);
  const gridClass = visibleCards.length === 8 ? ' is-eight-card-grid' : visibleCards.length === 7 ? ' is-seven-card-grid' : visibleCards.length === 5 ? ' is-five-card-grid' : visibleCards.length === 4 ? ' is-four-card-grid' : '';
  const servicesSection = $('#services');
  servicesSection.attr('class', 'section services service-section-reference').html(`
    <div class="services-page-shell">
      <div class="section-heading">
        <p class="section-kicker">${service.kicker}</p>
        <h2>${service.sectionTitle}</h2>
        <p>${service.sectionCopy}</p>
      </div>
      <div class="service-page-grid${gridClass}">${visibleCards.map(renderCard).join('')}</div>
    </div>
  `);
  const divider = servicesSection.next();
  if (divider.hasClass('section-divider')) {
    divider.attr('class', 'service-core-divider').html('<span></span><i data-lucide="wrench"></i><span></span>');
  }

  const html = applyHeadMetadata($.html(), {
    canonicalPath: canonicalPath || service.canonicalPath,
    title: service.title,
    description: service.description,
  });
  return htmlResponse(html);
}
