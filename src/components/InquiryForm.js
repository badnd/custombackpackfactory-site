'use client';

import { useState } from 'react';
import { siteData } from '@/data/site-data';
import { whatsappUrl } from '@/lib/paths';

export function InquiryForm({ productTitle = 'Custom Bag Project', productOptions = [], compact = false }) {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_honey')) return;

    const details = [
      formData.get('message') ? `Message: ${formData.get('message')}` : '',
      formData.get('material') ? `Material / Finish: ${formData.get('material')}` : '',
      formData.get('logo') ? `Logo / Branding: ${formData.get('logo')}` : '',
      formData.get('dimensions') ? `Size / Dimensions: ${formData.get('dimensions')}` : ''
    ].filter(Boolean).join('\n');

    const payload = new FormData();
    payload.set('name', formData.get('name') || '');
    payload.set('email', formData.get('email') || '');
    payload.set('company', formData.get('company') || '');
    payload.set('product', formData.get('product') || productTitle);
    payload.set('quantity', formData.get('qty') || '');
    payload.set('material', formData.get('material') || '');
    payload.set('logo', formData.get('logo') || '');
    payload.set('dimensions', formData.get('dimensions') || '');
    payload.set('message', details);
    payload.set('_subject', `[Website Inquiry] ${productTitle}`);
    payload.set('_template', 'table');
    payload.set('_captcha', 'false');
    payload.set('_honey', '');

    setSending(true);
    setStatus('Sending your inquiry...');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteData.company.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== 'true') throw new Error('Submission failed');
      form.reset();
      setStatus('Thank you. Your inquiry has been sent successfully.');
    } catch (error) {
      setStatus('The form could not be sent. Please use WhatsApp or email us directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form inquiry-form" onSubmit={onSubmit}>
      <input className="form-honey" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className={compact ? '' : 'form-two'}>
        <input name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Business Email" required />
      </div>
      <input name="company" placeholder="Company Name" />
      {productOptions.length ? (
        <div className="form-two">
          <select name="product" required defaultValue="">
            <option value="">Interested Product</option>
            {productOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
            <option value="Multiple Types / Other">Multiple Types / Other</option>
          </select>
          <select name="qty" required defaultValue="">
            <option value="">Estimated Quantity</option>
            <option value="100-300 pcs">100-300 pcs</option>
            <option value="300-500 pcs">300-500 pcs</option>
            <option value="500-1000 pcs">500-1000 pcs</option>
            <option value="1000+ pcs">1000+ pcs</option>
          </select>
        </div>
      ) : (
        <input name="qty" placeholder="Quantity / MOQ target" />
      )}
      <div className="form-two">
        <select name="material" defaultValue="">
          <option value="">Material / Fabric</option>
          <option value="Oxford / Polyester">Oxford / Polyester</option>
          <option value="Nylon / Waterproof Fabric">Nylon / Waterproof Fabric</option>
          <option value="Canvas / Cotton">Canvas / Cotton</option>
          <option value="Need suggestion">Need suggestion</option>
        </select>
        <select name="logo" defaultValue="">
          <option value="">Logo Method</option>
          <option value="Screen print">Screen print</option>
          <option value="Embroidery">Embroidery</option>
          <option value="Rubber / Woven Patch">Rubber / Woven Patch</option>
          <option value="Private label">Private label</option>
        </select>
      </div>
      <input name="dimensions" placeholder="Target Size / Reference Style" />
      <textarea name="message" placeholder="Tell us color, packing, delivery market or any special requirements" />
      <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send My Request'}
      </button>
      <a className="btn btn-secondary btn-block" href={whatsappUrl(siteData)} target="_blank" rel="noopener">Chat on WhatsApp</a>
      <p className={status.includes('successfully') ? 'form-status success' : status.includes('could not') ? 'form-status error' : 'form-status'}>{status}</p>
      <p className="form-privacy">By contacting us, you acknowledge our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </form>
  );
}
