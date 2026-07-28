export type ServiceLocation = {
  slug: string;
  city: string;
  region: string;
  description: string;
};

export const locations: ServiceLocation[] = [
  { slug: 'palm-springs', city: 'Palm Springs', region: 'Coachella Valley', description: 'Plumbing, heating, and cooling service for Palm Springs homeowners.' },
  { slug: 'palm-desert', city: 'Palm Desert', region: 'Coachella Valley', description: 'Local plumbing and HVAC support throughout Palm Desert.' },
  { slug: 'indio', city: 'Indio', region: 'Coachella Valley', description: 'Responsive home-comfort and plumbing service in Indio.' },
  { slug: 'cathedral-city', city: 'Cathedral City', region: 'Coachella Valley', description: 'Dependable plumbing, heating, and cooling help in Cathedral City.' },
  { slug: 'la-quinta', city: 'La Quinta', region: 'Coachella Valley', description: 'Professional home-service solutions for La Quinta residents.' },
  { slug: 'coachella', city: 'Coachella', region: 'Coachella Valley', description: 'Trusted plumbing and HVAC service for homes in Coachella.' },
  { slug: 'desert-hot-springs', city: 'Desert Hot Springs', region: 'Coachella Valley', description: 'Local service for plumbing, cooling, and heating needs.' },
  { slug: 'rancho-mirage', city: 'Rancho Mirage', region: 'Coachella Valley', description: 'Careful, responsive home service across Rancho Mirage.' },
  { slug: 'coachella-valley', city: 'Coachella Valley', region: 'California', description: 'Anthem serves communities across the Coachella Valley.' },
];

export const locationBySlug = Object.fromEntries(locations.map((location) => [location.slug, location])) as Record<string, ServiceLocation>;
