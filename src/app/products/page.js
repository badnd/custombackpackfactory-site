import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { ProductCard } from '@/components/ProductCard';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Custom Bag Product Catalog',
  description: 'Browse Custom Backpack Factory custom backpacks, laptop backpacks, school backpacks and outdoor bags for OEM/ODM, low MOQ and private label projects.',
  alternates: { canonical: '/products' }
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category || '';
  const activeCategoryName = siteData.categories.find((category) => category.slug === activeCategory)?.name;
  const products = Object.entries(siteData.products).filter(([, product]) => (
    activeCategory ? product.categorySlug === activeCategory : true
  ));

  return (
    <>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Product Catalog</span>
              <h1>{activeCategoryName || 'Custom backpack categories for B2B buyers'}</h1>
              <p>Each product page is rendered from one product data layer, so future uploads can be added cleanly without mixing product posters with factory or service images.</p>
            </div>
            <Link className="btn btn-primary" href="/contact">Request Quote</Link>
          </div>
          <div className="filter-row">
            <Link className={`filter-pill ${!activeCategory ? 'is-active' : ''}`} href="/products">All Products</Link>
            {siteData.categories.map((category) => (
              <Link className={`filter-pill ${activeCategory === category.slug ? 'is-active' : ''}`} href={category.link || `/products?category=${category.slug}`} key={category.slug}>{category.name}</Link>
            ))}
          </div>
          <div className="grid grid-4">
            {siteData.categories.map((category) => (
              <Link className="card category-mini" href={category.link || `/products?category=${category.slug}`} key={category.slug}>
                <img src={assetPath(category.image)} alt={category.name} />
                <strong>{category.name}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">All Items</span>
              <h2>{activeCategoryName ? `${activeCategoryName} products` : 'Available custom backpack products'}</h2>
              <p>Designed for importers, wholesalers, corporate buyers and private label brands.</p>
            </div>
          </div>
          <div className="grid grid-3">
            {products.map(([slug, product]) => <ProductCard key={slug} slug={slug} product={product} showLogoZone />)}
          </div>
        </div>
      </section>
    </>
  );
}
