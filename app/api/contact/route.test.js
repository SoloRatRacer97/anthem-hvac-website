import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route.js';

const homepageBody = {
  address: '123 Main St',
  name: 'Pat Customer',
  phone: '760-555-0100',
  service: 'Plumbing',
};

function contactRequest(body) {
  return new Request('https://anthem.example/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.stubEnv('SENDGRID_API_KEY', 'test-api-key');
    vi.stubEnv('SENDGRID_FROM_EMAIL', 'verified@example.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('rejects incomplete submissions without calling SendGrid', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const response = await POST(contactRequest({ ...homepageBody, phone: '' }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Missing required fields.' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects malformed optional email addresses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const response = await POST(contactRequest({ ...homepageBody, email: 'not-an-email' }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Enter a valid email address.' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('silently skips honeypot submissions', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const response = await POST(contactRequest({ ...homepageBody, company_website: 'spam.example' }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, emailSkipped: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a no-send preview for explicit demos', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const response = await POST(contactRequest({ ...homepageBody, submissionMode: 'demo' }));
    const result = await response.json();

    expect(result).toMatchObject({ ok: true, emailSkipped: true, mode: 'demo' });
    expect(result.preview).toMatchObject({
      name: homepageBody.name,
      pageType: 'Homepage',
      service: homepageBody.service,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('delivers the short homepage form through SendGrid', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 202 }));
    const response = await POST(contactRequest(homepageBody));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    const payload = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(payload.subject).toContain('[Homepage] New Plumbing lead');
    expect(payload.content[1].value).toContain('Homepage Lead');
    expect(payload).not.toHaveProperty('reply_to');
  });

  it('delivers and combines the detailed contact form fields', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 202 }));
    const response = await POST(
      contactRequest({
        ...homepageBody,
        email: 'pat@example.com',
        last_name: 'Anderson',
        message: 'Water heater leak',
        pagePath: '/contact',
      }),
    );

    expect(response.status).toBe(200);
    const payload = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(payload.subject).toContain('[Contact Page]');
    expect(payload.content[1].value).toContain('Contact Page Lead');
    expect(payload.reply_to).toMatchObject({ email: 'pat@example.com', name: 'Pat Customer Anderson' });
    expect(payload.content[0].value).toContain('Water heater leak');
  });

  it('reports missing SendGrid configuration', async () => {
    vi.stubEnv('SENDGRID_API_KEY', '');
    const response = await POST(contactRequest(homepageBody));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'Email delivery is not configured.' });
  });

  it('reports SendGrid delivery failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = await POST(contactRequest(homepageBody));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ error: 'Email delivery failed.' });
  });
});
