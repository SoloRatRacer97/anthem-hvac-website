/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/about-us', destination: '/about.html' },
        { source: '/contact', destination: '/contact.html' },
        { source: '/locations', destination: '/locations.html' },
        { source: '/anthem-branded-location-lp', destination: '/Anthem Branded Location LP.html' },
        { source: '/privacy-policy', destination: '/privacy-policy.html' },
        { source: '/terms-of-service', destination: '/terms-of-service.html' },
        { source: '/anthem', destination: '/boulder.html' },
        { source: '/phoenix', destination: '/longmont.html' },
        { source: '/glendale', destination: '/broomfield.html' },
        { source: '/peoria', destination: '/thornton.html' },
        { source: '/scottsdale', destination: '/commerce-city.html' },
        { source: '/cave-creek', destination: '/lakewood.html' },
        { source: '/new-river', destination: '/arvada.html' },
        { source: '/deer-valley', destination: '/lafayette.html' },
        { source: '/boulder', destination: '/boulder.html' },
        { source: '/longmont', destination: '/longmont.html' },
        { source: '/broomfield', destination: '/broomfield.html' },
        { source: '/thornton', destination: '/thornton.html' },
        { source: '/commerce-city', destination: '/commerce-city.html' },
        { source: '/lakewood', destination: '/lakewood.html' },
        { source: '/arvada', destination: '/arvada.html' },
        { source: '/lafayette', destination: '/lafayette.html' },
        { source: '/boiler-repair-boulder-co', destination: '/boiler-repair-boulder-co.html' },
      ],
    };
  },
  async redirects() {
    return [
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/about.html', destination: '/about-us', permanent: true },
      { source: '/aboutus', destination: '/about-us', permanent: true },
      { source: '/drain-cleaning', destination: '/services/drain-cleaning', permanent: true },
      { source: '/water-heaters', destination: '/services/water-heaters', permanent: true },
      { source: '/ac-repair', destination: '/services/ac-repair', permanent: true },
    ];
  },
};

module.exports = nextConfig;
