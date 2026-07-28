export const siteConfig = {
  name: 'Anthem Air Conditioning & Plumbing',
  shortName: 'Anthem',
  productionUrl: process.env.SITE_URL || 'https://anthemcv.com',
  defaultLocation: 'Coachella Valley, CA',
  phone: '(760) 895-2621',
  phoneHref: 'tel:+17608952621',
  email: 'info@anthemplumbing.com',
};

export const isPreviewDeployment = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';
