import { renderServicePage } from '../_render-service.js';

export async function GET(_request, { params }) {
  const { service } = await params;
  return renderServicePage(service, `/services/${service}`);
}
