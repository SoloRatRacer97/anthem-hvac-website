import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EmailConfigurationError, getSendGridConfig, sendContactEmail } from './contact-email.js';

const lead = {
  address: '123 Main St',
  city: 'Palm Desert',
  email: 'customer@example.com',
  ipAddress: '192.0.2.1',
  message: 'The <water heater> is leaking.',
  name: 'Pat Customer',
  pageType: 'Contact Page',
  pageTitle: 'Contact Anthem',
  pageUrl: 'https://example.com/contact',
  phone: '760-555-0100',
  service: 'Plumbing Repair',
  source: 'contact_page_form',
  submittedAt: '2026-08-10T12:00:00.000Z',
  zip: '92260',
};

describe('SendGrid contact email', () => {
  beforeEach(() => {
    vi.stubEnv('SENDGRID_API_KEY', 'test-api-key');
    vi.stubEnv('SENDGRID_FROM_EMAIL', 'verified@example.com');
    vi.stubEnv('SENDGRID_FROM_NAME', 'Anthem Test');
    vi.stubEnv('CONTACT_TO_EMAIL', 'leads@example.com');
    vi.stubEnv('CONTACT_TO_NAME', 'Lead Desk');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('requires an API key', () => {
    vi.stubEnv('SENDGRID_API_KEY', '');
    expect(() => getSendGridConfig()).toThrow(EmailConfigurationError);
  });

  it('uses the verified Anthem sender and Cascade recipient by default', () => {
    vi.stubEnv('SENDGRID_FROM_EMAIL', '');
    vi.stubEnv('CONTACT_TO_EMAIL', '');

    expect(getSendGridConfig()).toMatchObject({
      fromEmail: 'contact@anthemcv.com',
      toEmail: 'info@cascadewebsolutions.co',
    });
  });

  it('sends text and escaped HTML content to SendGrid', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 202 }));

    await sendContactEmail(lead);

    const [url, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(String(options.body));
    expect(url).toBe('https://api.sendgrid.com/v3/mail/send');
    expect(options.headers).toMatchObject({ Authorization: 'Bearer test-api-key' });
    expect(body.personalizations[0].to[0].email).toBe('leads@example.com');
    expect(body.from.email).toBe('verified@example.com');
    expect(body.reply_to.email).toBe(lead.email);
    expect(body.subject).toBe('[Contact Page] New Plumbing Repair lead - Pat Customer');
    expect(body.content[0].value).toContain('Submitted from: Contact Page');
    expect(body.content[1].value).toContain('src="cid:anthem-logo"');
    expect(body.content[1].value).toContain('alt="Anthem Cooling, Heating &amp; Plumbing"');
    expect(body.content[1].value).toContain('bgcolor="#07101f"');
    expect(body.content[1].value).toContain('background-color:#07101f');
    expect(body.content[1].value).toContain('width="310"');
    expect(body.content[1].value).toContain('align="center" bgcolor="#07101f"');
    expect(body.content[1].value).not.toContain('New Website Lead');
    expect(body.content[1].value).toContain('Name</div>');
    expect(body.content[1].value).toContain('Phone</div>');
    expect(body.content[1].value).toContain('Email</div>');
    expect(body.content[1].value).toContain('Service</div>');
    expect(body.content[1].value).toContain('Customer Message');
    expect(body.content[1].value).toContain('Contact Page Lead');
    expect(body.content[1].value).toContain('&lt;water heater&gt;');
    expect(body.content[1].value).not.toContain('<water heater>');
    expect(body.attachments).toEqual([
      expect.objectContaining({
        content: expect.any(String),
        content_id: 'anthem-logo',
        disposition: 'inline',
        filename: 'anthem-logo.png',
        type: 'image/png',
      }),
    ]);
    expect(body.attachments[0].content.length).toBeGreaterThan(100);
  });

  it('omits reply-to when the short homepage form has no email', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 202 }));

    await sendContactEmail({ ...lead, email: '' });

    const body = JSON.parse(String(fetchMock.mock.calls[0][1].body));
    expect(body).not.toHaveProperty('reply_to');
  });

  it('rejects failed SendGrid responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 401 }));
    await expect(sendContactEmail(lead)).rejects.toThrow('status 401');
  });
});
