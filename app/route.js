import { serveStaticHtml } from './_html-response.js';

export async function GET() {
  return serveStaticHtml('index.html', '/');
}
