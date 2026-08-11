const createAnthemIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
  }
};

createAnthemIcons();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

const locationMenuItems = [
  ['Palm Springs', 'palm-springs', '/palm-springs'],
  ['Palm Desert', 'palm-desert', '/palm-desert'],
  ['Indio', 'indio', '/indio'],
  ['Cathedral City', 'cathedral-city', '/cathedral-city'],
  ['La Quinta', 'la-quinta', '/la-quinta'],
  ['Coachella', 'coachella', '/coachella'],
  ['Desert Hot Springs', 'desert-hot-springs', '/desert-hot-springs'],
  ['Rancho Mirage', 'rancho-mirage', '/rancho-mirage'],
];

const mapPackLocations = [
  {
    title: 'Anthem Air Conditioning & Plumbing Palm Desert',
    slug: 'palm-desert-office',
    shortLabel: 'Palm Desert, CA',
    copy: 'Anthem Air Conditioning & Plumbing Palm Desert serves local homeowners with plumbing, heating, cooling, water heater, and emergency service support.',
    response: 'Same-day appointments may be available',
    services: 'Plumbing, heating, cooling, HVAC, water heaters',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106192.11715733845!2d-116.52661168359377!3d33.72178999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daff53f41139d5%3A0x15faa6d51cc79841!2sAnthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert!5e0!3m2!1sen!2sph!4v1784064067357!5m2!1sen!2sph',
    link: 'https://www.google.com/maps/search/?api=1&query=Anthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert',
  },
  {
    title: 'Anthem Air Conditioning & Plumbing',
    slug: 'anthem-main-office',
    shortLabel: 'Coachella Valley, CA',
    copy: 'Anthem Air Conditioning & Plumbing serves Coachella Valley homeowners with plumbing, heating, cooling, water heater, and emergency service support.',
    response: 'Same-day appointments may be available',
    services: 'Plumbing, heating, cooling, HVAC, water heaters',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.9879413526473!2d-116.14851082366374!3d33.6574743384711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80da588fac1fb185%3A0x6a1b0c0c6f0c386d!2sAnthem%20Air%20Conditioning%20%26%20Plumbing!5e0!3m2!1sen!2sph!4v1784064104596!5m2!1sen!2sph',
    link: 'https://www.google.com/maps/search/?api=1&query=Anthem%20Air%20Conditioning%20%26%20Plumbing',
  },
];

const normalizeAnthemChrome = () => {
  document.querySelectorAll('.brand-logo').forEach((logo) => {
    logo.src = '/assets/anthem-logo.png';
  });

  document.querySelectorAll('.main-nav').forEach((nav) => {
    nav.innerHTML = `
      <a href="/">Home</a>
      <div class="nav-dropdown">
        <a class="nav-trigger" href="/plumbing" data-direct-nav>Plumbing</a>
          <div class="nav-menu" aria-label="Plumbing menu">
          <a href="/services/residential-plumbing">Residential Plumbing</a>
          <a href="/services/commercial-plumbing">Commercial Plumbing</a>
          <a href="/services/drain-cleaning">Drain Cleaning</a>
          <a href="/services/sewer-line-repair-and-replacement">Sewer Line Repair and Replacement</a>
          <a href="/services/water-heater-repair-and-replacement">Water Heater Repair and Replacement</a>
          <a href="/services/hydro-jetting">Hydro Jetting</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <a class="nav-trigger" href="/hvac" data-direct-nav>HVAC</a>
        <div class="nav-menu" aria-label="HVAC menu">
          <a href="/services/ac-repair">AC Repair</a>
          <a href="/services/ac-replacement">AC Replacement</a>
          <a href="/services/ac-installation">AC Installation</a>
          <a href="/services/furnace-repair">Furnace Repair</a>
          <a href="/services/furnace-replacement">Furnace Replacement</a>
          <a href="/services/insulation">Insulation</a>
          <a href="/services/air-duct-cleaning">Air Duct Cleaning</a>
        </div>
      </div>
      <a href="/about-us">About Us</a>
      <div class="nav-dropdown">
        <a class="nav-trigger" href="/locations">Locations</a>
        <div class="nav-menu" aria-label="Locations menu">
          ${locationMenuItems.map(([label, , href]) => `<a href="${href}">${label}</a>`).join('')}
        </div>
      </div>
      <a href="/contact">Contact</a>
    `;
  });

  document.querySelectorAll('.nav-menu[aria-label="Locations menu"]').forEach((menu) => {
    menu.innerHTML = locationMenuItems.map(([label, , href]) => `<a href="${href}">${label}</a>`).join('');
  });

  document.querySelectorAll('.footer-services').forEach((footerServices) => {
    footerServices.innerHTML = `
      <h2>Services</h2>
      <a href="/plumbing"><i data-lucide="wrench"></i> Plumbing</a>
      <a href="/services/cooling"><i data-lucide="snowflake"></i> AC</a>
      <a href="/services/heating"><i data-lucide="flame"></i> Heater</a>
    `;
  });

  document.querySelectorAll('.footer-company > p').forEach((description) => {
    description.textContent = 'Trusted plumbing, heating, and cooling solutions built on honest service, quality workmanship, and dependable care for Coachella Valley homeowners.';
  });

  createAnthemIcons();
};

normalizeAnthemChrome();

const ensureGoogleReviewBanner = () => {
  const main = document.querySelector('main');
  if (!main) return;

  const bannerStyles = 'display:flex;align-items:center;justify-content:center;gap:28px;min-height:64px;padding:12px 18px;background:#061b3a;color:#fff;font-weight:900;position:fixed;top:calc(var(--sticky-review-top, 90px) + var(--review-banner-gap, 12px));left:0;right:0;z-index:49;';
  const existingBanner = document.querySelector('.google-review-banner') || document.querySelector('.hero-review-strip');
  if (existingBanner) {
    existingBanner.classList.add('google-review-banner');
    existingBanner.style.cssText = bannerStyles;
    main.insertBefore(existingBanner, main.firstElementChild);
    document.querySelectorAll('.hero-review-strip').forEach((banner) => {
      if (banner !== existingBanner) banner.remove();
    });
    return;
  }

  const banner = document.createElement('section');
  banner.className = 'review-strip hero-review-strip google-review-banner';
  banner.setAttribute('aria-label', 'Google review summary');
  banner.style.cssText = bannerStyles;
  banner.innerHTML = `
    <span class="google-dot" aria-hidden="true"><img class="google-logo" src="/assets/google-g-logo.svg" alt="" /></span>
    <strong class="review-score">4.9</strong>
    <span class="stars" aria-label="5 stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></span>
    <span>Based on 1,000+ Google reviews</span>
  `;
  main.insertBefore(banner, main.firstElementChild);
  createAnthemIcons();
};

ensureGoogleReviewBanner();

menuButton?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

const setDropdownOpen = (dropdown, isOpen) => {
  const menu = dropdown?.querySelector('.nav-menu');
  if (!dropdown || !menu) return;

  dropdown.classList.toggle('is-open', isOpen);
  const isMobileNav = window.matchMedia('(max-width: 1120px)').matches;
  menu.style.display = isOpen ? 'grid' : '';
  menu.style.opacity = isOpen ? '1' : '';
  menu.style.pointerEvents = isOpen ? 'auto' : '';
  menu.style.transform = isOpen && !isMobileNav ? 'translate(-50%, 0)' : '';
  menu.style.visibility = isOpen ? 'visible' : '';
};

const closeDropdowns = () => {
  document.querySelectorAll('.nav-dropdown.is-open').forEach((item) => setDropdownOpen(item, false));
};

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('.nav-trigger');
  const dropdown = trigger?.closest('.nav-dropdown');
  const isMobileNavOpen = header?.classList.contains('is-open') && window.matchMedia('(max-width: 1120px)').matches;

  if (trigger && !trigger.hasAttribute('data-direct-nav') && dropdown?.querySelector('.nav-menu') && (trigger.tagName !== 'A' || isMobileNavOpen)) {
    event.preventDefault();
    const isOpen = dropdown.classList.contains('is-open');
    closeDropdowns();
    setDropdownOpen(dropdown, !isOpen);
    return;
  }

  const link = event.target.closest('.main-nav a, .header-actions a');
  if (link) {
    header.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');

    if (link.closest('.main-nav')) {
      document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  }

  if (event.target.closest('.nav-dropdown')) return;
  closeDropdowns();
});

const makeLocationDetail = (title) => ({
  title,
  shortLabel: `${title}, CA`,
  copy: `Anthem Air Conditioning & Plumbing serves ${title} with plumbing, cooling, heating, water heater, and emergency service support.`,
  response: 'Same-day appointments may be available',
  services: 'Plumbing, cooling, heating, water heaters, emergency service',
  map: `https://www.google.com/maps?q=${encodeURIComponent(`${title}, CA`)}&output=embed`,
  link: `https://www.google.com/maps?q=${encodeURIComponent(`${title}, CA`)}`,
});

const locationDetails = Object.fromEntries(locationMenuItems.map(([title, slug]) => [slug, makeLocationDetail(title)]));
mapPackLocations.forEach((location) => {
  locationDetails[location.slug] = location;
});
locationDetails['palm-desert'] = {
  title: 'Palm Desert',
  shortLabel: 'Palm Desert, CA',
  heroTitle: 'Palm Desert',
  heroCopy: 'Anthem Air Conditioning & Plumbing Palm Desert provides trusted plumbing, cooling, heating, and water heater service in Palm Desert.',
  copy: 'Anthem Air Conditioning & Plumbing Palm Desert provides plumbing, heating, cooling, water heater, and emergency service support.',
  response: 'Same-day appointments available',
  services: 'Plumbing, heating, cooling, HVAC, water heaters',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.503489710579!2d-116.38911062391955!3d33.72179443510616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80daff53f41139d5%3A0x15faa6d51cc79841!2sAnthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert!5e0!3m2!1sen!2sph!4v1783697148030!5m2!1sen!2sph',
  link: 'https://www.google.com/maps/search/?api=1&query=Anthem%20Air%20Conditioning%20%26%20Plumbing%20Palm%20Desert',
};

const pageLocationDefaults = {
  '/palm-desert': 'palm-desert',
};

const getCurrentLocationSlug = () => {
  const requested = new URLSearchParams(window.location.search).get('location');
  const currentPage = window.location.pathname.split('/').pop() || '';
  const pageDefault = document.body.dataset.locationDefault || pageLocationDefaults[currentPage];
  if (locationDetails[requested]) return requested;
  return locationDetails[pageDefault] ? pageDefault : 'palm-springs';
};

const setLocationDisplay = (slug) => {
  const detail = locationDetails[slug];
  if (!detail) return;

  document.querySelectorAll('[data-location-button], .location-hero-chips [data-location]').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.location === slug);
  });

  const title = document.querySelector('[data-location-title]');
  const copy = document.querySelector('[data-location-copy]');
  const response = document.querySelector('[data-location-response]');
  const services = document.querySelector('[data-location-services]');
  const map = document.querySelector('[data-location-map]');
  const link = document.querySelector('[data-location-link]');
  const heroMap = document.querySelector('[data-hero-location-map]');
  const heroTitle = document.querySelector('[data-hero-location-title]');
  const heroCopy = document.querySelector('[data-hero-location-copy]');
  const heroResponse = document.querySelector('[data-hero-location-response]');
  const heroServices = document.querySelector('[data-hero-location-services]');

  if (title) title.textContent = detail.title;
  if (copy) copy.textContent = detail.copy;
  if (response) response.textContent = detail.response;
  if (services) services.textContent = detail.services;
  if (map) map.src = detail.map;
  if (link) link.href = detail.link;
  if (heroMap) {
    heroMap.src = detail.map;
    heroMap.title = `${detail.title} service area map`;
  }
  if (heroTitle) heroTitle.textContent = detail.heroTitle || detail.title;
  if (heroCopy) heroCopy.textContent = detail.heroCopy || `Anthem provides trusted plumbing, cooling, heating, and water heater service in ${detail.title}. Local experts. Fast response. Here when you need us.`;
  if (heroResponse) heroResponse.textContent = detail.response;
  if (heroServices) heroServices.textContent = detail.services;
};

const normalizeLocationInterfaces = (root = document) => {
  const locationButtons = mapPackLocations.map(({ title, slug, shortLabel }) => `
    <button class="location-button" type="button" data-location-button data-location="${slug}">
      <i data-lucide="map-pin"></i>
      <span><strong>${title}</strong><small>${shortLabel}</small></span>
    </button>
  `).join('');

  const locationChips = locationMenuItems.map(([title, slug]) => `
    <button type="button" data-location="${slug}">${title}</button>
  `).join('');

  const hasMapPack = Boolean(root.querySelector('.location-list'));

  root.querySelectorAll('.locations-section .locations-heading').forEach((heading) => {
    const title = heading.querySelector('h2');
    const copy = heading.querySelector('p:not(.section-kicker)');
    const city = document.body.dataset.locationCity;
    if (title) title.textContent = city ? `Serving ${city} and the Coachella Valley` : 'Anthem Plumbing, Heating and Cooling Locations Near You';
    if (copy) copy.textContent = city ? `Choose an Anthem location for HVAC and plumbing service near ${city}.` : 'Choose one of our two Anthem Air Conditioning & Plumbing locations serving local homeowners.';
  });

  root.querySelectorAll('.location-list').forEach((list) => {
    list.innerHTML = locationButtons;
  });
  root.querySelectorAll('.location-hero-chips').forEach((chips) => {
    chips.innerHTML = locationChips;
  });
  setLocationDisplay(hasMapPack ? mapPackLocations[0].slug : getCurrentLocationSlug());
  createAnthemIcons();
};

const bindAnthemContent = (root = document) => {
  createAnthemIcons();
  if (document.body.classList.contains('locations-reference-page') || root.querySelector('.locations-section')) {
    normalizeLocationInterfaces(root);
  }

  root.querySelectorAll('[data-service]:not([data-anthem-bound])').forEach((link) => {
    link.dataset.anthemBound = 'true';
    link.addEventListener('click', () => {
      const service = link.getAttribute('data-service');
      const input = document.querySelector(`input[name="service"][value="${service}"]`);
      const select = document.querySelector('select[name="service"]');
      if (input) input.checked = true;
      if (select) select.value = service;
    });
  });

  root.querySelectorAll('[data-review-toggle]:not([data-anthem-bound])').forEach((button) => {
    button.dataset.anthemBound = 'true';
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
    });
  });

  root.querySelectorAll('[data-location-button]:not([data-anthem-bound])').forEach((button) => {
    button.dataset.anthemBound = 'true';
    button.addEventListener('click', () => {
      setLocationDisplay(button.dataset.location);
    });
  });

  root.querySelectorAll('.location-hero-chips [data-location]:not([data-anthem-bound])').forEach((chip) => {
    chip.dataset.anthemBound = 'true';
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      setLocationDisplay(chip.dataset.location);
    });
  });

  root.querySelectorAll('.faq-accordion details:not([data-anthem-bound])').forEach((details) => {
    details.dataset.anthemBound = 'true';
    details.addEventListener('toggle', () => {
      if (!details.open) return;

      details.closest('.faq-accordion')?.querySelectorAll('details').forEach((item) => {
        if (item !== details) item.open = false;
      });
    });
  });

  root.querySelectorAll('[data-lead-form]:not([data-anthem-bound])').forEach((leadForm) => {
    leadForm.dataset.anthemBound = 'true';
    leadForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim().split(' ')[0];
      const service = String(data.get('service') || 'service').toLowerCase();
      const message = form.querySelector('.form-message');
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton?.innerHTML;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...Object.fromEntries(data.entries()),
            pagePath: window.location.pathname,
            pageTitle: document.title,
            source: window.location.pathname === '/contact' ? 'contact_page_form' : 'homepage_form',
          }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) throw new Error(result.error || 'Unable to send your request.');

        message.textContent = `${name ? `Thanks, ${name}.` : 'Thanks.'} Your ${service} request was sent. Anthem will follow up shortly.`;
        message.classList.remove('is-error');
        message.classList.add('is-visible');
        form.reset();
      } catch (error) {
        message.textContent = error.message || 'Unable to send your request. Please call Anthem for assistance.';
        message.classList.add('is-error', 'is-visible');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
          createAnthemIcons();
        }
      }
    });
  });
};

bindAnthemContent();
document.addEventListener('anthem:content-loaded', () => {
  normalizeAnthemChrome();
  ensureGoogleReviewBanner();
  bindAnthemContent();
});
