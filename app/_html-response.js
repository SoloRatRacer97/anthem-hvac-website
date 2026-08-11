import { readFile } from 'fs/promises';
import path from 'path';
import { load } from 'cheerio';

export const siteUrl = process.env.SITE_URL || 'https://anthemplumbing.com';

export function canonicalUrl(routePath) {
  return new URL(routePath, siteUrl).toString();
}

export function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export function applyHeadMetadata(html, { canonicalPath, title, description }) {
  const $ = load(html, { decodeEntities: false });
  $('link[rel="canonical"]').remove();
  $('head').append(`<link rel="canonical" href="${canonicalUrl(canonicalPath)}" />`);
  if (title) $('title').text(title);
  if (description) {
    const meta = $('meta[name="description"]');
    if (meta.length) meta.attr('content', description);
    else $('head').append(`<meta name="description" content="${description.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" />`);
  }
  return $.html();
}

export async function serveStaticHtml(fileName, canonicalPath, metadata = {}) {
  const html = await readFile(path.join(process.cwd(), 'public', fileName), 'utf8');
  return htmlResponse(applyHeadMetadata(html, { canonicalPath, ...metadata }));
}
