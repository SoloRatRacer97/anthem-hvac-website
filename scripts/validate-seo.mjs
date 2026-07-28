import { spawn } from 'node:child_process';

const port = 3417;
const origin = `http://127.0.0.1:${port}`;
const productionOrigin = 'https://anthemcv.com';
const services = [
  'plumbing', 'residential-plumbing', 'commercial-plumbing', 'drain-cleaning',
  'sewer-line-repair-and-replacement', 'hydro-jetting', 'water-heaters',
  'water-heater-repair-and-replacement', 'cooling', 'hvac', 'ac-repair',
  'ac-replacement', 'ac-installation', 'heating', 'furnace-repair',
  'furnace-replacement', 'boiler-repair', 'insulation', 'air-duct-cleaning',
];
const locations = ['palm-springs', 'palm-desert', 'indio', 'cathedral-city', 'la-quinta', 'coachella', 'desert-hot-springs', 'rancho-mirage', 'coachella-valley'];
const routes = ['/', '/about-us', '/contact', '/services', '/locations', '/privacy-policy', '/terms-of-service', ...services.map((slug) => `/services/${slug}`), ...locations.map((slug) => `/${slug}`)];
const legacySlugs = ['longmont', 'arvada', 'thornton', 'broomfield', 'lafayette', 'lakewood', 'commerce-city'];
const failures = [];
const titles = new Map();
const descriptions = new Map();

const server = spawn(process.platform === 'win32' ? 'node_modules/.bin/next.cmd' : 'node_modules/.bin/next', ['start', '-p', String(port)], { stdio: 'ignore' });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { if ((await fetch(origin)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Production server did not start. Run npm run build first.');
}

function match(html, expression) { return html.match(expression)?.[1]?.trim() || ''; }

try {
  await waitForServer();
  const linkedRoutes = new Set();

  for (const route of routes) {
    const response = await fetch(`${origin}${route}`, { redirect: 'manual' });
    if (response.status !== 200) { failures.push(`${route}: expected 200, received ${response.status}`); continue; }
    const html = await response.text();
    const title = match(html, /<title>([^<]+)<\/title>/i);
    const description = match(html, /<meta name="description" content="([^"]+)"/i);
    const canonical = match(html, /<link rel="canonical" href="([^"]+)"/i);
    const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
    const h2Count = (html.match(/<h2(?:\s|>)/gi) || []).length;
    const internalLinks = [...html.matchAll(/href="(\/[^"]*)"/g)].map((item) => item[1].split('#')[0]).filter((href) => href && !href.startsWith('/_next') && !href.startsWith('/assets'));

    if (!title) failures.push(`${route}: missing title`);
    if (!description) failures.push(`${route}: missing meta description`);
    if (canonical !== `${productionOrigin}${route === '/' ? '' : route}` && !(route === '/' && canonical === `${productionOrigin}/`)) failures.push(`${route}: incorrect canonical ${canonical}`);
    if (h1Count !== 1) failures.push(`${route}: expected one H1, found ${h1Count}`);
    if (h2Count < 1) failures.push(`${route}: missing meaningful H2`);
    if (internalLinks.length === 0) failures.push(`${route}: no internal links`);
    if (legacySlugs.some((slug) => html.toLowerCase().includes(slug))) failures.push(`${route}: contains an old Colorado slug`);
    if (titles.has(title)) failures.push(`${route}: duplicate title also used by ${titles.get(title)}`); else titles.set(title, route);
    if (descriptions.has(description)) failures.push(`${route}: duplicate description also used by ${descriptions.get(description)}`); else descriptions.set(description, route);
    internalLinks.forEach((link) => linkedRoutes.add(link || '/'));
  }

  for (const link of linkedRoutes) {
    if (link.includes('.') || link.startsWith('//')) continue;
    const response = await fetch(`${origin}${link}`, { redirect: 'manual' });
    if (response.status !== 200) failures.push(`Internal link ${link}: received ${response.status}`);
  }

  const redirects = [['/longmont.html', '/palm-springs'], ['/arvada.html', '/coachella'], ['/thornton.html', '/indio'], ['/broomfield.html', '/cathedral-city'], ['/lafayette.html', '/la-quinta'], ['/lakewood.html', '/desert-hot-springs'], ['/commerce-city.html', '/rancho-mirage'], ['/about.html', '/about-us']];
  for (const [source, destination] of redirects) {
    const response = await fetch(`${origin}${source}`, { redirect: 'manual' });
    const location = response.headers.get('location');
    if (![301, 308].includes(response.status) || location !== destination) failures.push(`${source}: expected direct redirect to ${destination}, received ${response.status} ${location}`);
  }

  console.log(`Pages checked: ${routes.length}`);
  console.log(`Critical SEO failures: ${failures.length}`);
  if (failures.length) { failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; }
  else console.log('SEO validation passed.');
} finally {
  server.kill('SIGTERM');
}
