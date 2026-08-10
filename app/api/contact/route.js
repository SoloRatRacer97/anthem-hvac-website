import { EmailConfigurationError, sendContactEmail } from '../../../lib/contact-email.js';

function text(value, maximumLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maximumLength) : '';
}

function isIntentionalTest(body) {
  return body.demoMode === true || body.testMode === true || text(body.submissionMode, 20) === 'demo';
}

function safePagePath(value) {
  const path = text(value, 200);
  return path.startsWith('/') && !path.startsWith('//') ? path : '/';
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (text(body.company_website, 200)) {
      return Response.json({ ok: true, emailSkipped: true });
    }

    const firstName = text(body.name, 100);
    const lastName = text(body.last_name, 100);
    const email = text(body.email, 254);
    const service = text(body.service || body.serviceType, 100);
    const phone = text(body.phone, 50);
    const pagePath = safePagePath(body.pagePath);
    const lead = {
      name: [firstName, lastName].filter(Boolean).join(' '),
      phone,
      email,
      address: text(body.address, 200),
      city: text(body.city, 100),
      zip: text(body.zip, 20),
      service,
      message: text(body.message, 5000),
      source: text(body.source, 100) || (pagePath === '/contact' ? 'contact_page_form' : 'homepage_form'),
      pageType: pagePath === '/contact' ? 'Contact Page' : 'Homepage',
      pageTitle: text(body.pageTitle, 200) || 'Anthem website form',
      pageUrl: new URL(pagePath, request.url).toString(),
      submittedAt: new Date().toISOString(),
      ipAddress: (request.headers.get('x-forwarded-for') || '').split(',')[0].trim(),
    };

    if (!lead.name || !lead.phone || !lead.service) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    if (isIntentionalTest(body)) {
      return Response.json({ ok: true, emailSkipped: true, mode: 'demo', preview: lead });
    }

    await sendContactEmail(lead);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return Response.json({ error: 'Email delivery is not configured.' }, { status: 500 });
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    console.error('Contact email delivery failed.', error);
    return Response.json({ error: 'Email delivery failed.' }, { status: 502 });
  }
}
