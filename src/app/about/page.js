import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'About Custom Backpack Factory | Custom Bag Manufacturer',
  description: 'Learn about Tianjin Junyi Premium Trading Co., Ltd., a custom backpack supplier for OEM/ODM, low MOQ and private label projects.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <section className="section bg-soft">
        <div className="container about-grid">
          <div>
            <span className="badge">About Custom Backpack Factory</span>
            <h1>{siteData.company.name}</h1>
            <p className="muted">{siteData.company.tagline}. We support importers, wholesalers, promotional buyers and private label brands with practical custom backpack development.</p>
            <div className="stats">
              <div><strong>OEM/ODM</strong><span>Custom service</span></div>
              <div><strong>Low MOQ</strong><span>Flexible trial orders</span></div>
              <div><strong>24h</strong><span>Fast reply</span></div>
              <div><strong>Global</strong><span>B2B buyers</span></div>
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Contact Sales</Link><Link className="btn btn-secondary" href="/products">View Products</Link></div>
          </div>
          <div className="media-panel"><img src={assetPath('/assets/img/factory/junyi-bag-factory-exterior.webp')} alt="Tianjin Junyi factory exterior" /></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Our Focus</span><h2>Built for B2B custom backpack projects</h2></div></div>
          <div className="grid grid-3">
            {[
              ['Product Development', 'Turn reference images, sketches and buyer requirements into sample-ready bag plans.'],
              ['Brand Customization', 'Support logo printing, embroidery, patch labels, custom colors and packaging.'],
              ['Order Communication', 'Clarify MOQ, sample timing, material options and production steps before bulk order.']
            ].map(([title, text]) => <article className="card info-card" key={title}><div className="card-body"><h3>{title}</h3><p className="muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>
    </>
  );
}
