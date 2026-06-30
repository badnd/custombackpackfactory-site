'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { whatsappUrl } from '@/lib/paths';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Custom Logo', '/custom-service'],
    ['Factory', '/factory'],
    ['About Us', '/about'],
    ['Blog', '/blog'],
    ['Contact', '/contact']
  ];

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-items">
            <span>Email: {siteData.company.email}</span>
            <span>WhatsApp: {siteData.company.whatsapp}</span>
            <span>WeChat: {siteData.company.wechat}</span>
          </div>
          <div className="topbar-actions">
            <span>OEM / ODM Custom Bag Manufacturer</span>
            <span>Low MOQ - Fast Response</span>
          </div>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <Link href="/" className="brand brand-text-logo" aria-label="Custom Backpack Factory home">
            <span className="brand-icon" aria-hidden="true">CBF</span>
            <span className="brand-wordmark">Custom Backpack Factory</span>
          </Link>
          <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">Menu</button>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map(([label, href]) => (
              <li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
            ))}
          </ul>
          <div className="nav-actions">
            <a className="btn btn-secondary" href={`mailto:${siteData.company.email}`}>Email Us</a>
            <a className="btn btn-primary" href={whatsappUrl(siteData)} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>
    </>
  );
}
