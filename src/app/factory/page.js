import Link from 'next/link';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Factory Strength | Custom Bag OEM/ODM',
  description: 'Factory workflow for custom backpack sampling, logo confirmation, bulk production and quality control for B2B orders.',
  alternates: { canonical: '/factory' }
};

export default function FactoryPage() {
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
    </>
  );
}
