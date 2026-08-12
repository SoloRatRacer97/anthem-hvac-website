import { readFile } from 'node:fs/promises';
import path from 'node:path';

export class EmailConfigurationError extends Error {}

function requiredEnvironmentValue(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new EmailConfigurationError(`${name} is not configured.`);
  }

  return value;
}

export function getSendGridConfig() {
  return {
    apiKey: requiredEnvironmentValue('SENDGRID_API_KEY'),
    fromEmail: process.env.SENDGRID_FROM_EMAIL?.trim() || 'contact@anthemcv.com',
    fromName: process.env.SENDGRID_FROM_NAME?.trim() || 'Anthem Website',
    toEmail: process.env.CONTACT_TO_EMAIL?.trim() || 'info@cascadewebsolutions.co',
    toName: process.env.CONTACT_TO_NAME?.trim() || 'Anthem Leads',
  };
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function display(value) {
  return value || 'Not provided';
}

function createTextContent(lead) {
  return [
    `New ${lead.service} lead from ${lead.name}`,
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${display(lead.email)}`,
    `Address: ${display(lead.address)}`,
    `City: ${display(lead.city)}`,
    `ZIP: ${display(lead.zip)}`,
    `Service: ${lead.service}`,
    '',
    'Message:',
    display(lead.message),
    '',
    `Submitted from: ${lead.pageType}`,
    `Form source: ${lead.source}`,
    `Page title: ${lead.pageTitle}`,
    `Page URL: ${lead.pageUrl}`,
    `Submitted: ${lead.submittedAt}`,
    `IP address: ${display(lead.ipAddress)}`,
  ].join('\n');
}

function createHtmlContent(lead) {
  const name = escapeHtml(lead.name);
  const phone = escapeHtml(lead.phone);
  const email = escapeHtml(display(lead.email));
  const service = escapeHtml(lead.service);
  const message = escapeHtml(display(lead.message));
  const pageType = escapeHtml(lead.pageType);
  const pageTitle = escapeHtml(lead.pageTitle);
  const pageUrl = escapeHtml(lead.pageUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Anthem website lead</title>
  </head>
  <body bgcolor="#f4f6f8" style="margin:0;padding:0;background-color:#f4f6f8;color:#07101f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New ${service} request from ${name} via the ${pageType}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f6f8" style="background-color:#f4f6f8;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:640px;background-color:#ffffff;border-collapse:separate;border-spacing:0;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(7,16,31,.12);">
            <tr><td bgcolor="#07101f" style="height:7px;background-color:#07101f;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr>
              <td align="center" bgcolor="#f0162d" style="padding:28px 24px 24px;background-color:#f0162d;color:#ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f0162d" style="background-color:#f0162d;">
                  <tr>
                    <td align="center" bgcolor="#f0162d" style="background-color:#f0162d;">
                      <img src="cid:anthem-logo" width="310" alt="Anthem Cooling, Heating &amp; Plumbing" style="display:block;width:310px;max-width:100%;height:auto;margin:0 auto;border:0;outline:none;text-decoration:none;color:#ffffff;font-size:20px;font-weight:bold;">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#f0162d" style="padding:0 24px 25px;background-color:#f0162d;color:#ffffff;">
                <span style="display:inline-block;padding:7px 12px;border:1px solid #07101f;border-radius:999px;background-color:#07101f;color:#ffffff;font-size:11px;line-height:14px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">${pageType} Lead</span>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="padding:30px 32px 12px;background-color:#ffffff;">
                <h1 style="margin:0;color:#07101f;font-size:27px;line-height:34px;font-weight:800;">New ${service} request</h1>
                <p style="margin:8px 0 0;color:#69717c;font-size:15px;line-height:23px;">A customer submitted a request through the Anthem website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e6e8eb;border-radius:10px;overflow:hidden;">
                  <tr>
                    <td width="50%" valign="top" style="padding:18px;border-right:1px solid #e6e8eb;border-bottom:1px solid #e6e8eb;">
                      <div style="color:#69717c;font-size:11px;line-height:15px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Name</div>
                      <div style="margin-top:5px;color:#07101f;font-size:17px;line-height:23px;font-weight:800;">${name}</div>
                    </td>
                    <td width="50%" valign="top" style="padding:18px;border-bottom:1px solid #e6e8eb;">
                      <div style="color:#69717c;font-size:11px;line-height:15px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Phone</div>
                      <div style="margin-top:5px;font-size:17px;line-height:23px;font-weight:800;"><a href="tel:${phone}" style="color:#0545a7;text-decoration:none;">${phone}</a></div>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding:18px;border-right:1px solid #e6e8eb;">
                      <div style="color:#69717c;font-size:11px;line-height:15px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Email</div>
                      <div style="margin-top:5px;color:#07101f;font-size:15px;line-height:22px;font-weight:700;word-break:break-word;">${lead.email ? `<a href="mailto:${email}" style="color:#0545a7;text-decoration:none;">${email}</a>` : email}</div>
                    </td>
                    <td width="50%" valign="top" style="padding:18px;">
                      <div style="color:#69717c;font-size:11px;line-height:15px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Service</div>
                      <div style="margin-top:5px;color:#07101f;font-size:17px;line-height:23px;font-weight:800;">${service}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f7f9" style="background-color:#f6f7f9;border-left:5px solid #f0162d;border-radius:8px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <div style="color:#07101f;font-size:12px;line-height:16px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Customer Message</div>
                      <div style="margin-top:9px;color:#374151;font-size:15px;line-height:24px;white-space:pre-wrap;">${message}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:5px 0;color:#69717c;font-size:13px;line-height:20px;"><strong style="color:#07101f;">Address:</strong> ${escapeHtml(display(lead.address))}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#69717c;font-size:13px;line-height:20px;"><strong style="color:#07101f;">City / ZIP:</strong> ${escapeHtml(display([lead.city, lead.zip].filter(Boolean).join(' ')))}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#69717c;font-size:13px;line-height:20px;"><strong style="color:#07101f;">Submitted from:</strong> ${pageType}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#69717c;font-size:13px;line-height:20px;"><strong style="color:#07101f;">Page:</strong> <a href="${pageUrl}" style="color:#0545a7;text-decoration:underline;">${pageTitle}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;color:#69717c;font-size:13px;line-height:20px;"><strong style="color:#07101f;">Submitted:</strong> ${escapeHtml(lead.submittedAt)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#07101f" style="padding:18px 32px;background-color:#07101f;color:#cbd5e1;font-size:11px;line-height:18px;text-align:center;">
                Anthem Air Conditioning &amp; Plumbing &nbsp;|&nbsp; Website lead notification<br>
                Form source: ${escapeHtml(lead.source)} &nbsp;|&nbsp; IP: ${escapeHtml(display(lead.ipAddress))}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactEmail(lead) {
  const config = getSendGridConfig();
  const logo = await readFile(path.join(process.cwd(), 'public', 'assets', 'anthem-logo.png'), 'base64');
  const payload = {
    personalizations: [{ to: [{ email: config.toEmail, name: config.toName }] }],
    from: { email: config.fromEmail, name: config.fromName },
    subject: `[${lead.pageType}] New ${lead.service} lead - ${lead.name}`,
    content: [
      { type: 'text/plain', value: createTextContent(lead) },
      { type: 'text/html', value: createHtmlContent(lead) },
    ],
    attachments: [
      {
        content: logo,
        filename: 'anthem-logo.png',
        type: 'image/png',
        disposition: 'inline',
        content_id: 'anthem-logo',
      },
    ],
  };

  if (lead.email) {
    payload.reply_to = { email: lead.email, name: lead.name };
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`SendGrid rejected the email with status ${response.status}.`);
  }
}
