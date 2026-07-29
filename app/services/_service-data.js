const card = ({ slug, id = slug, photo, icon, title, summary, bullets, href = `/services/${slug}` }) => ({
  slug,
  id,
  photo,
  icon,
  title,
  summary,
  bullets,
  href,
  action: `View ${title}`,
  service: title,
});

export const plumbingCards = [
  card({ slug: 'residential-plumbing', photo: 'service-photo-plumbing', icon: 'house', title: 'Residential Plumbing', summary: 'Residential plumbing service for leaks, fixtures, pipe repairs, clogs, water lines, and everyday plumbing needs throughout your home.', bullets: ['Home plumbing repairs', 'Kitchen and bathroom fixtures', 'Leak and pipe diagnostics'] }),
  card({ slug: 'commercial-plumbing', photo: 'service-photo-plumbing', icon: 'building-2', title: 'Commercial Plumbing', summary: 'Commercial plumbing support for offices, retail spaces, managed properties, and local facilities that need responsive, professional service.', bullets: ['Commercial fixture service', 'Drain and water-line support', 'Property plumbing maintenance'] }),
  card({ slug: 'drain-cleaning', photo: 'service-photo-drain', icon: 'waves', title: 'Drain Cleaning', summary: 'Drain cleaning for clogged sinks, tubs, toilets, kitchen drains, bathroom drains, and main-line backups that need fast attention.', bullets: ['Clog removal', 'Slow drain diagnostics', 'Kitchen, bath, and main drains'] }),
  card({ slug: 'sewer-line-repair-and-replacement', id: 'sewer-repair', photo: 'service-photo-pipe', icon: 'construction', title: 'Sewer Line Repair and Replacement', summary: 'Sewer line diagnostics, repair, and replacement guidance for backups, odors, damaged lines, root intrusion, and recurring drain issues.', bullets: ['Sewer line diagnostics', 'Repair and replacement options', 'Backup and odor support'] }),
  card({ slug: 'water-heater-repair-and-replacement', id: 'water-heater-repair', photo: 'service-photo-water-heater-repair', icon: 'heater', title: 'Water Heater Repair and Replacement', summary: 'Water heater repair and replacement support for no hot water, leaking tanks, inconsistent temperatures, aging units, and tank or tankless upgrades.', bullets: ['No-hot-water diagnostics', 'Leak and temperature checks', 'Repair and replacement planning'] }),
  card({ slug: 'hydro-jetting', photo: 'service-photo-hydro', icon: 'waves', title: 'Hydro Jetting', summary: 'High-pressure hydro jetting for stubborn buildup, grease, sludge, roots, and recurring clogs that need a deeper line cleaning.', bullets: ['Heavy buildup removal', 'Grease and sludge clearing', 'Drain flow restoration'] }),
];

export const coolingCards = [
  card({ slug: 'ac-repair', photo: 'service-photo-hvac', icon: 'snowflake', title: 'AC Repair', summary: 'AC repair for weak airflow, warm air, short cycling, unusual noises, and cooling systems that stop keeping up.', bullets: ['AC diagnostics', 'Cooling repairs', 'System troubleshooting'] }),
  card({ slug: 'ac-replacement', photo: 'service-photo-ac-replacement', icon: 'refresh-cw', title: 'AC Replacement', summary: 'AC replacement planning for older, inefficient, or unreliable systems when repair is no longer the best long-term choice.', bullets: ['Replacement options', 'Efficiency guidance', 'Comfort planning'] }),
  card({ slug: 'ac-installation', photo: 'service-photo-ac-installation', icon: 'settings', title: 'AC Installation', summary: 'AC installation for new systems, correctly sized equipment, clean setup, and dependable cooling performance.', bullets: ['New AC installs', 'System sizing', 'Clean installation'] }),
  card({ slug: 'insulation', photo: 'service-photo-insulation', icon: 'home', title: 'Insulation', summary: 'Insulation service to reduce heat gain, improve home comfort, and help your heating and cooling system perform more efficiently.', bullets: ['Comfort improvements', 'Efficiency support', 'Home performance guidance'] }),
  card({ slug: 'air-duct-cleaning', photo: 'service-photo-air-duct-cleaning', icon: 'wind', title: 'Air Duct Cleaning', summary: 'Air duct cleaning for dusty vents, airflow concerns, indoor air quality issues, and cleaner whole-home comfort.', bullets: ['Duct cleaning', 'Airflow support', 'Cleaner comfort'] }),
];

export const heatingCards = [
  card({ slug: 'furnace-repair', photo: 'service-photo-furnace-repair', icon: 'flame', title: 'Furnace Repair', summary: 'Furnace repair for unreliable heat, ignition issues, airflow problems, unusual smells, and systems that will not start correctly.', bullets: ['Furnace diagnostics', 'Heating repairs', 'Safety checks'] }),
  card({ slug: 'furnace-replacement', photo: 'service-photo-furnace-replacement', icon: 'replace', title: 'Furnace Replacement', summary: 'Furnace replacement guidance for older, inefficient, or unreliable heating systems that need a better long-term solution.', bullets: ['Replacement options', 'Efficiency guidance', 'Comfort planning'] }),
];

const overviewCards = [
  card({ slug: 'plumbing', id: 'plumbing-service', photo: 'service-photo-plumbing', icon: 'wrench', title: 'Plumbing', summary: 'Leaks, fixtures, pipe repairs, clogs, and whole-home plumbing help.', bullets: ['Leak detection and repair', 'Kitchen and bathroom plumbing', 'Fixture installs and replacements'], href: '/plumbing' }),
  card({ slug: 'water-heaters', id: 'water-heater-service', photo: 'service-photo-water', icon: 'droplets', title: 'Water Heaters', summary: 'Water heater repairs, replacements, and hot water troubleshooting.', bullets: ['Tank and tankless installs', 'No-hot-water diagnostics', 'Flush and maintenance service'] }),
  card({ slug: 'hvac', id: 'hvac-service', photo: 'service-photo-hvac', icon: 'thermometer-sun', title: 'HVAC', summary: 'Heating and cooling diagnostics, repairs, tune-ups, and comfort troubleshooting.', bullets: ['Heating and cooling diagnostics', 'AC and heater repairs', 'Seasonal tune-ups and maintenance'], href: '/hvac' }),
];

const waterHeaterCard = card({ slug: 'water-heaters', photo: 'service-photo-water-heater-repair', icon: 'heater', title: 'Water Heaters', summary: 'Water heater repairs, replacements, and hot water troubleshooting for tank and tankless systems.', bullets: ['Tank and tankless installs', 'No-hot-water diagnostics', 'Flush and maintenance service'] });
const allHvacCards = [...coolingCards.slice(0, 3), ...heatingCards, ...coolingCards.slice(3)];

const auditedSeo = {
  services: {
    title: 'HVAC & Plumbing in Coachella Valley, CA | Anthem',
    description: 'Explore Anthem HVAC and plumbing services in Coachella Valley, CA, including AC, heating, drains, water heaters, and repair options for local homes.',
    name: 'HVAC & Plumbing Services',
    bodyCopy: 'TODO_COPY: HVAC & Plumbing Services',
  },
  heating: {
    title: 'Heating in Coachella Valley, CA | Anthem',
    description: 'Choose Anthem for heating service in Coachella Valley, CA. We diagnose comfort problems, explain repair options, and help restore dependable warmth.',
    name: 'Heating',
    bodyCopy: 'TODO_COPY: Heating',
  },
  insulation: {
    title: 'Insulation in Coachella Valley, CA | Anthem',
    description: 'Improve indoor comfort with Anthem insulation services in Coachella Valley, CA. Reduce heat gain and support more efficient HVAC performance at home.',
    name: 'Insulation',
    bodyCopy: 'TODO_COPY: Insulation',
  },
  'ac-installation': {
    title: 'AC Installation in Coachella Valley, CA | Anthem',
    description: 'Plan AC installation in Coachella Valley, CA with Anthem. Get system sizing guidance, careful setup, and dependable cooling for your local home.',
    name: 'AC Installation',
    bodyCopy: 'TODO_COPY: AC Installation',
  },
  'ac-repair': {
    title: 'AC Repair in Coachella Valley, CA | Anthem',
    description: 'Get reliable AC repair in Coachella Valley, CA from Anthem. We diagnose warm air, weak airflow, cycling, and cooling problems. Request service today.',
    name: 'AC Repair',
    bodyCopy: 'TODO_COPY: AC Repair',
  },
  'ac-replacement': {
    title: 'AC Replacement in Coachella Valley, CA | Anthem',
    description: 'Explore AC replacement in Coachella Valley, CA with Anthem. Compare efficient equipment options and plan reliable comfort for your local home.',
    name: 'AC Replacement',
    bodyCopy: 'TODO_COPY: AC Replacement',
  },
  'furnace-repair': {
    title: 'Furnace Repair in Coachella Valley, CA | Anthem',
    description: 'Schedule furnace repair in Coachella Valley, CA with Anthem. We diagnose ignition, airflow, heating, and safety concerns with clear service options.',
    name: 'Furnace Repair',
    bodyCopy: 'TODO_COPY: Furnace Repair',
  },
  'furnace-replacement': {
    title: 'Furnace Replacement in Coachella Valley | Anthem',
    description: 'Plan furnace replacement in Coachella Valley, CA with Anthem. Review efficient heating options, installation needs, and comfort improvements for home.',
    name: 'Furnace Replacement',
    bodyCopy: 'TODO_COPY: Furnace Replacement',
  },
  'air-duct-cleaning': {
    title: 'Air Duct Cleaning in Coachella Valley, CA | Anthem',
    description: 'Request air duct cleaning in Coachella Valley, CA from Anthem. Address visible dust, debris, airflow concerns, and cleaner whole-home comfort today.',
    name: 'Air Duct Cleaning',
    bodyCopy: 'TODO_COPY: Air Duct Cleaning',
  },
  'drain-cleaning': {
    title: 'Drain Cleaning in Coachella Valley, CA | Anthem',
    description: 'Choose Anthem for drain cleaning in Coachella Valley, CA. We clear stubborn clogs, diagnose slow drains, and help restore reliable flow in your home.',
    name: 'Drain Cleaning',
    bodyCopy: 'TODO_COPY: Drain Cleaning',
  },
  'hydro-jetting': {
    title: 'Hydro Jetting in Coachella Valley, CA | Anthem',
    description: 'Schedule hydro jetting in Coachella Valley, CA with Anthem. Clear grease, sludge, roots, and stubborn buildup to restore dependable drain flow.',
    name: 'Hydro Jetting',
    bodyCopy: 'TODO_COPY: Hydro Jetting',
  },
  'water-heaters': {
    title: 'Water Heaters in Coachella Valley, CA | Anthem',
    description: 'Get water heater service in Coachella Valley, CA from Anthem. We handle hot-water problems, tank and tankless options, maintenance, and replacement.',
    name: 'Water Heaters',
    bodyCopy: 'TODO_COPY: Water Heaters',
  },
  'water-heater-repair-and-replacement': {
    title: 'Water Heater Repair in Coachella Valley | Anthem',
    description: 'Choose Anthem for water heater repair in Coachella Valley, CA. We diagnose leaks, temperature problems, aging tanks, and replacement needs today.',
    name: 'Water Heater Repair and Replacement',
    bodyCopy: 'TODO_COPY: Water Heater Repair and Replacement',
  },
  'sewer-line-repair-and-replacement': {
    title: 'Sewer Line Repair in Coachella Valley | Anthem',
    description: 'Request sewer line repair in Coachella Valley, CA from Anthem. We assess backups, odors, root intrusion, damaged lines, and replacement options.',
    name: 'Sewer Line Repair and Replacement',
    bodyCopy: 'TODO_COPY: Sewer Line Repair and Replacement',
  },
};

const page = ({ slug, name, title, description, heroImage, eyebrow, summary, cards, bodyCopy, sectionTitle = 'Explore More Anthem Services', sectionCopy = 'More services from Anthem Air Conditioning & Plumbing.' }) => ({
  slug,
  name,
  title,
  description,
  canonicalPath: slug === 'services' ? '/services' : `/services/${slug}`,
  heroImage,
  eyebrow,
  heading: `${name} <span>Done Right.</span>`,
  summary,
  kicker: name,
  sectionTitle,
  sectionCopy,
  cards,
  currentServiceSlug: slug,
  bodyCopy,
});

const auditedPage = (slug, options) => page({
  slug,
  ...auditedSeo[slug],
  bodyCopy: auditedSeo[slug].bodyCopy,
  ...options,
});

export const servicePages = {
  services: auditedPage('services', {
    heroImage: '/assets/anthem-reference.jpeg',
    eyebrow: 'Your local plumbing, HVAC and water heater experts',
    summary: 'From plumbing repairs and no-hot-water calls to heating and cooling issues, Anthem keeps homes comfortable with honest pricing, clear communication, and dependable workmanship.',
    cards: overviewCards,
    sectionTitle: 'Explore More Anthem Services',
    sectionCopy: 'One trusted team for plumbing, HVAC, and water heater service across Coachella Valley.',
  }),
  heating: auditedPage('heating', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'Heating service and repair', summary: 'Anthem helps restore dependable heat with furnace repair and furnace replacement support.', cards: heatingCards }),
  insulation: auditedPage('insulation', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: coolingCards.find(({ slug }) => slug === 'insulation').summary, cards: allHvacCards }),
  'ac-installation': auditedPage('ac-installation', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: coolingCards.find(({ slug }) => slug === 'ac-installation').summary, cards: allHvacCards }),
  'ac-repair': auditedPage('ac-repair', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: coolingCards.find(({ slug }) => slug === 'ac-repair').summary, cards: allHvacCards }),
  'ac-replacement': auditedPage('ac-replacement', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: coolingCards.find(({ slug }) => slug === 'ac-replacement').summary, cards: allHvacCards }),
  'furnace-repair': auditedPage('furnace-repair', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: heatingCards.find(({ slug }) => slug === 'furnace-repair').summary, cards: allHvacCards }),
  'furnace-replacement': auditedPage('furnace-replacement', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: heatingCards.find(({ slug }) => slug === 'furnace-replacement').summary, cards: allHvacCards }),
  'air-duct-cleaning': auditedPage('air-duct-cleaning', { heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'HVAC service', summary: coolingCards.find(({ slug }) => slug === 'air-duct-cleaning').summary, cards: allHvacCards }),
  'drain-cleaning': auditedPage('drain-cleaning', { heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: plumbingCards.find(({ slug }) => slug === 'drain-cleaning').summary, cards: plumbingCards }),
  'hydro-jetting': auditedPage('hydro-jetting', { heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: plumbingCards.find(({ slug }) => slug === 'hydro-jetting').summary, cards: plumbingCards }),
  'water-heaters': auditedPage('water-heaters', { heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: waterHeaterCard.summary, cards: plumbingCards }),
  'water-heater-repair-and-replacement': auditedPage('water-heater-repair-and-replacement', { heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: plumbingCards.find(({ slug }) => slug === 'water-heater-repair-and-replacement').summary, cards: plumbingCards }),
  'sewer-line-repair-and-replacement': auditedPage('sewer-line-repair-and-replacement', { heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: plumbingCards.find(({ slug }) => slug === 'sewer-line-repair-and-replacement').summary, cards: plumbingCards }),
};

servicePages.plumbing = page({
  slug: 'plumbing',
  name: 'Plumbing Service',
  title: 'Plumbing Service in Coachella Valley, CA | Anthem',
  description: 'Explore Anthem plumbing services in Coachella Valley, CA for leaks, fixtures, clogs, drains, pipes, water heaters, and property plumbing needs.',
  heroImage: '/assets/van.png?v=plumbing-van-0710',
  eyebrow: 'Plumbing repair and service since 2002',
  summary: 'Anthem helps with leaks, fixtures, pipe repairs, clogs, and everyday plumbing issues with clean workmanship and clear communication.',
  cards: plumbingCards,
  bodyCopy: 'Anthem provides residential and commercial plumbing support across Coachella Valley with clear communication and dependable workmanship.',
});
servicePages.plumbing.canonicalPath = '/plumbing';

servicePages.hvac = page({
  slug: 'hvac',
  name: 'HVAC Service',
  title: 'HVAC Service in Coachella Valley, CA | Anthem',
  description: 'Explore Anthem HVAC services in Coachella Valley, CA for AC repair, installation, heating, furnaces, insulation, ducts, and comfort concerns.',
  heroImage: '/assets/anthem-hvac-hero.jpg',
  eyebrow: 'Heating and cooling service',
  summary: 'When your home is not heating or cooling the way it should, Anthem provides practical HVAC diagnostics, repair support, and tune-ups for year-round comfort.',
  cards: allHvacCards,
  bodyCopy: 'Anthem provides heating and cooling diagnostics, repairs, tune-ups, and replacement guidance throughout Coachella Valley.',
});
servicePages.hvac.canonicalPath = '/hvac';

servicePages.cooling = page({
  slug: 'cooling', name: 'Cooling Services', title: 'Cooling Services in Coachella Valley, CA | Anthem',
  description: 'Explore Anthem cooling services in Coachella Valley, CA, including AC repair, replacement, installation, insulation, and air duct cleaning.',
  heroImage: '/assets/anthem-hvac-hero.jpg', eyebrow: 'Cooling service and AC help',
  summary: 'Anthem helps keep homes cool with AC repair, replacement, installation, insulation support, and air duct cleaning across the valley.',
  cards: coolingCards, bodyCopy: 'Anthem provides practical cooling diagnostics and service options for homes across Coachella Valley.',
});

for (const plumbingCard of plumbingCards) {
  if (!servicePages[plumbingCard.slug]) {
    servicePages[plumbingCard.slug] = page({ slug: plumbingCard.slug, name: plumbingCard.title, title: `${plumbingCard.title} in Coachella Valley | Anthem`, description: `${plumbingCard.summary} Contact Anthem for professional service throughout Coachella Valley, California.`, heroImage: '/assets/van.png?v=plumbing-van-0710', eyebrow: 'Plumbing service', summary: plumbingCard.summary, cards: plumbingCards, bodyCopy: plumbingCard.summary });
  }
}

export const auditedServiceSlugs = Object.keys(auditedSeo);

export function getServicePage(slug = 'services') {
  return servicePages[slug] || servicePages.services;
}
