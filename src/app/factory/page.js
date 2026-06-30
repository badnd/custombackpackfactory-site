import Link from 'next/link';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Factory Strength | Custom Bag OEM/ODM',
  description: 'Factory workflow for custom backpack sampling, logo confirmation, bulk production and quality control for B2B orders.',
  alternates: { canonical: '/factory' }
};

export default function FactoryPage() {
  const productionVideos = [
    ['Business Backpack Showcase', '/assets/videos/products/product-business-backpack-13s.mp4', 'Live product handling shows structure, profile and business backpack details for OEM programs.'],
    ['Specialty Bag Showcase', '/assets/videos/products/product-cpr-bag-showcase-24s.mp4', 'Specialty custom projects demonstrate our ability to support demanding product requirements.'],
    ['Specialty Capability', '/assets/videos/factory/factory-cpr-medical-bag-26s.mp4', 'We also support specialty projects beyond standard backpacks, including precision-built equipment cases for healthcare and technical industries.']
  ];

  return (
    <>
      <section className="section bg-soft">
        <div className="container process-grid">
          <div>
            <span className="badge">Factory Workflow</span>
            <h1>Clear custom backpack production process</h1>
            <p className="muted">From product idea to sampling and bulk order, we keep the workflow practical for overseas buyers.</p>
            <div className="feature-list">
              {['Requirement review', 'Material and logo confirmation', 'Sample development', 'Bulk production and packing'].map((item, index) => (
                <div className="feature-item" key={item}><div className="icon-bubble">{index + 1}</div><div><strong>{item}</strong><div className="muted">Step {index + 1} for transparent production communication.</div></div></div>
              ))}
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Discuss Your Order</Link></div>
          </div>
          <div className="media-stack">
            <img src={assetPath('/assets/img/media/production-process.webp')} alt="custom backpack factory process" />
            <img src={assetPath('/assets/img/factory/junyi-bag-factory-exterior.webp')} alt="custom backpack factory exterior" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Quality Points</span><h2>What we confirm before shipment</h2></div></div>
          <div className="grid grid-4">
            {['Material and color', 'Logo placement', 'Stitching and zipper', 'Packing and labels'].map((item) => <article className="card info-card" key={item}><div className="card-body"><h3>{item}</h3><p className="muted">Checked according to order details and approved sample direction.</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Live Production</span>
              <h2>Backpack and specialty custom production</h2>
              <p>These videos show real backpack handling and specialty manufacturing capability, helping buyers understand what we can support beyond standard catalog styles.</p>
            </div>
          </div>
          <div className="video-grid">
            {productionVideos.map(([title, src, text]) => (
              <article className="video-card" key={title}>
                <video src={assetPath(src)} controls preload="metadata" playsInline />
                <div><h3>{title}</h3><p className="muted">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
