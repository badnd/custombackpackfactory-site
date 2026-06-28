import Link from 'next/link';
import { assetPath, productPath } from '@/lib/paths';
import { siteData } from '@/data/site-data';

export function ProductCard({ slug, product, showLogoZone = false }) {
  return (
    <article className="card product-card">
      <Link className="card-media" href={productPath(slug)}>
        <img src={assetPath(product.hero)} alt={product.title} loading="lazy" decoding="async" />
        {showLogoZone ? <span className="logo-location-pill">Custom Logo Zone</span> : null}
      </Link>
      <div className="card-body">
        <div className="chip-list">
          {product.badges.slice(0, 3).map((badge) => (
            <span className="badge" key={badge}>{badge}</span>
          ))}
        </div>
        <h3 className="card-title">{product.title}</h3>
        <p className="muted">{product.intro}</p>
        <div className="card-price">{siteData.company.priceText}</div>
      </div>
      <div className="card-actions">
        <Link className="btn btn-primary" href={productPath(slug)}>View Details</Link>
        <Link className="btn btn-secondary" href={`/contact?product=${encodeURIComponent(slug)}`}>Get Quote</Link>
      </div>
    </article>
  );
}
