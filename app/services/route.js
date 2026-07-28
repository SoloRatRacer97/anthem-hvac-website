import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const html = await readFile(path.join(process.cwd(), 'public', 'services.html'), 'utf8');

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
