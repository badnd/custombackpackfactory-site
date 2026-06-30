import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { whatsappUrl } from '@/lib/paths';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="footer-logo-panel footer-text-logo">
                <span className="brand-icon" aria-hidden="true">CBF</span>
                <span className="brand-wordmark">Custom Backpack Factory</span>
              </span>
              <small>{siteData.company.tagline}</small>
            </div>
            <p>{siteData.company.name} supplies custom backpack solutions for global B2B buyers, including custom backpacks, laptop backpacks, school backpacks and outdoor bags.</p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>{siteData.categories.slice(0, 7).map((category) => <li key={category.slug}><Link href={category.link || `/products?category=${category.slug}`}>{category.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Buyer Service</h4>
            <ul>
              <li><Link href="/custom-service">OEM / ODM Service</Link></li>
              <li><Link href="/factory">Factory Strength</Link></li>
              <li><Link href="/products">Product Catalog</Link></li>
              <li><Link href="/blog">Buying Guides</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: <a href={`mailto:${siteData.company.email}`}>{siteData.company.email}</a></li>
              <li>WhatsApp: <a href={whatsappUrl(siteData)} target="_blank" rel="noopener">{siteData.company.whatsapp}</a></li>
              <li>WeChat: {siteData.company.wechat}</li>
              <li>{siteData.company.priceText}</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom"><span>&copy; {year} {siteData.company.name}. All rights reserved.</span></div>
      </footer>
      <a className="floating-wa" href={whatsappUrl(siteData)} target="_blank" rel="noopener" aria-label="WhatsApp inquiry">WA</a>
      <div className="floating-label">WhatsApp Inquiry</div>
      <div className="mobile-contact-bar">
        <a className="btn btn-secondary" href={`mailto:${siteData.company.email}`}>Email</a>
        <a className="btn btn-primary" href={whatsappUrl(siteData)} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </>
  );
}
