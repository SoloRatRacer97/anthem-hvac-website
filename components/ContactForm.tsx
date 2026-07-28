'use client';

import { ArrowRight, LockKeyhole } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Anthem ${String(form.get('service') || 'service')} inquiry`);
    const body = encodeURIComponent([
      `Name: ${form.get('name') || ''} ${form.get('lastName') || ''}`.trim(),
      `Phone: ${form.get('phone') || ''}`,
      `Email: ${form.get('email') || ''}`,
      `City / ZIP: ${form.get('city') || ''} ${form.get('zip') || ''}`.trim(),
      '',
      String(form.get('details') || ''),
    ].join('\n'));
    setMessage('Your email app is opening with your request ready to send.');
    window.location.href = `mailto:info@anthemplumbing.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className={`contactForm ${compact ? 'compactForm' : ''}`} onSubmit={submit}>
      <label className="wide">Service Needed
        <select name="service" required defaultValue="">
          <option value="" disabled>Select a service</option>
          <option>Plumbing</option><option>Drain Cleaning</option><option>Water Heater</option>
          <option>Air Conditioning</option><option>Heating</option><option>Emergency Service</option>
        </select>
      </label>
      <label>First Name<input name="name" autoComplete="given-name" required placeholder="First name" /></label>
      {!compact && <label>Last Name<input name="lastName" autoComplete="family-name" required placeholder="Last name" /></label>}
      <label>Email<input name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" required placeholder="(760) 555-0123" /></label>
      {!compact && <label>City<input name="city" autoComplete="address-level2" required placeholder="Your city" /></label>}
      {!compact && <label>ZIP<input name="zip" inputMode="numeric" autoComplete="postal-code" required placeholder="92262" /></label>}
      <label className="wide">How can we help?<textarea name="details" required placeholder="Tell us what is happening." /></label>
      <div className="formSubmit wide">
        <button className="button primary" type="submit">Submit Inquiry <ArrowRight aria-hidden="true" /></button>
        <small><LockKeyhole aria-hidden="true" /> Your information is used only to respond to your request.</small>
        {message && <p role="status">{message}</p>}
      </div>
    </form>
  );
}
