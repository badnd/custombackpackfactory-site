import Link from 'next/link';
import { HomeInquiry } from '@/components/HomeInquiry';

export const metadata = {
  title: 'OEM/ODM Custom Bag Service',
  description: 'Custom backpack OEM/ODM service for logo, fabric, color, packaging and private label projects with flexible MOQ support.',
  alternates: { canonical: '/custom-service' }
};

export default function CustomServicePage() {
  return (
    <>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Customization</span>
              <h1>OEM/ODM custom backpack service</h1>
              <p>Choose logo method, fabric, color, size, packaging and private label details for your target market.</p>
              <p className="mockup-note">Free backpack design mockup within 24 hours - see your logo and branding on the actual bag structure before sampling.</p>
            </div>
            <Link className="btn btn-primary" href="/contact">Start a Project</Link>
          </div>
          <div className="grid grid-4">
            {[
              ['Logo Methods', 'Screen print, embroidery, patch, woven label and private label options.'],
              ['Materials', 'Oxford, polyester, nylon, canvas, RPET and buyer-specific materials.'],
              ['Color and Size', 'Standard styles or adjusted sizes and colors based on MOQ and fabric availability.'],
              ['Packaging', 'Hang tags, polybags, inserts and export carton packing support.']
            ].map(([title, text]) => <article className="card info-card" key={title}><div className="card-body"><h3>{title}</h3><p className="muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container"><HomeInquiry /></div>
      </section>
    </>
  );
}
