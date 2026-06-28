import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteData } from '@/data/site-data';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { InquiryForm } from '@/components/InquiryForm';
import { assetPath, assetUrl, productPath, productSchema, siteUrl, whatsappUrl } from '@/lib/paths';

export function generateStaticParams() {
  return Object.keys(siteData.products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = siteData.products[slug];
  if (!product) return {};

  return {
    title: `${product.title} | ${product.model}`,
    description: `${product.intro} OEM/ODM custom bag manufacturer with low MOQ, logo options and factory quotation support.`,
    alternates: { canonical: productPath(slug) },
    openGraph: {
      title: product.title,
      description: product.intro,
      url: `${siteUrl}${productPath(slug)}`,
      images: [{ url: assetUrl(product.gallery[0] || product.hero), width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.intro,
      images: [assetUrl(product.gallery[0] || product.hero)]
    }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = siteData.products[slug];
  if (!product) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.title, item: `${siteUrl}${productPath(slug)}` }
    ]
  };

  return (
    <>
      <JsonLd data={[productSchema(siteData, slug, product), breadcrumbSchema]} />
      <section className="section bg-soft">
        <div className="container detail-grid">
          <ProductGallery product={product} />
          <article className="detail-main">
            <span className="badge">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="muted">{product.intro}</p>
            <div className="chip-list">
              {product.badges.map((badge) => <span className="badge" key={badge}>{badge}</span>)}
            </div>
            <div className="contact-big">
              <strong>{siteData.company.priceText}</strong>
              <div>Model: {product.model}</div>
            </div>
            <table className="spec-table">
              <tbody>
                {product.specs.map(([name, value]) => (
                  <tr key={name}><td>{name}</td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="hero-cta">
              <a className="btn btn-primary" href={whatsappUrl(siteData, product)} target="_blank" rel="noopener">WhatsApp Quote</a>
              <a className="btn btn-secondary" href={`mailto:${siteData.company.email}?subject=${encodeURIComponent(product.model + ' inquiry')}`}>Email Us</a>
            </div>
          </article>
          <aside className="quote-card">
            <h3>Request a Factory Quote</h3>
            <p className="muted">Send quantity, logo and material details. We will reply with MOQ, sample and bulk pricing suggestions.</p>
            <InquiryForm productTitle={`${product.title} (${product.model})`} compact />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Product Advantages</span>
              <h2>Why buyers choose this style</h2>
            </div>
          </div>
          <div className="spec-grid">
            {product.features.map((feature) => (
              <div className="spec-card" key={feature}>
                <strong>{feature}</strong>
                <p className="muted">Suitable for logo customization, private label projects and wholesale orders.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Available Variants</span>
              <h2>Color, scene and detail displays</h2>
              <p>Use these images as reference for quotation, color selection and logo placement discussion.</p>
            </div>
          </div>
          <div className="grid grid-3 variant-grid">
            {product.variants.map((variant) => (
              <article className="card variant-card" key={variant.sku}>
                <Link className="variant-media" href={`/contact?product=${encodeURIComponent(product.model)}`}>
                  <img src={assetPath(variant.image)} alt={variant.name} />
                  <span className="variant-zoom-hint">Quote this style</span>
                </Link>
                <div className="card-body">
                  <h3 className="card-title">{variant.name}</h3>
                  <p className="muted">SKU: {variant.sku}</p>
                  <div className="card-price">{siteData.company.priceText}</div>
                </div>
                <div className="card-actions">
                  <a className="btn btn-primary" href={whatsappUrl(siteData, product, variant.name)} target="_blank" rel="noopener">Request Quote</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
