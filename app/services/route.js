import { renderServicePage } from './_render-service.js';

export async function GET() {
  return renderServicePage('services', '/services');
}
