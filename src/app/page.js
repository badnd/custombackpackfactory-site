import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { blogPosts } from '@/data/blog-posts';
import { ProductCard } from '@/components/ProductCard';
import { HomeInquiry } from '@/components/HomeInquiry';
import { JsonLd } from '@/components/JsonLd';
import { HeroCarousel } from '@/components/HeroCarousel';
import { assetPath } from '@/lib/paths';

export default function HomePage() {
  const featured = siteData.homeFeaturedProducts.map((slug) => [slug, siteData.products[slug]]).filter(([, product]) => product);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteData.faq.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HeroCarousel slides={siteData.heroSlides} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">What We Offer</span>
              <h2>Custom backpack categories for your B2B business</h2>
              <p>We organize each bag type into clear product groups, richer style options and buyer-friendly pages for smoother desktop and mobile browsing.</p>
            </div>
            <Link className="btn btn-secondary" href="/products">View all products</Link>
          </div>
          <div className="grid grid-3">
            {siteData.categories.slice(0, 9).map((category) => (
              <article className="card category-card" key={category.slug}>
                <Link className="card-media" href={category.link || `/products?category=${category.slug}`}><img src={assetPath(category.image)} alt={category.name} /></Link>
                <div className="card-body"><h3 className="card-title">{category.name}</h3><p className="muted">{category.desc}</p><div className="card-price">{siteData.company.priceText}</div></div>
                <div className="card-actions"><Link className="btn btn-primary" href={category.link || `/products?category=${category.slug}`}>View Products</Link><Link className="btn btn-secondary" href={`/contact?product=${category.slug}`}>Request Quote</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head"><div><span className="badge">Why Choose Us</span><h2>Designed for wholesale buyers and private label projects</h2></div></div>
          <div className="grid grid-4">
            {[
              ['01', 'Backpack OEM Programs', 'Business backpacks, laptop backpacks, school bags and outdoor styles are grouped clearly for OEM/ODM custom projects.'],
              ['02', 'Low MOQ Options', 'MOQ can be discussed around 300 / 500 / 1000 pcs depending on style, material and logo details.'],
              ['03', 'Fast Sampling', 'Sample development usually takes 7-15 days after artwork and material details are confirmed.'],
              ['04', 'Reliable Production', 'Bulk production usually takes 15-30 days after sample approval, subject to actual order schedule.']
            ].map(([num, title, text]) => (
              <article className="card info-card" key={title}><div className="card-body"><div className="icon-bubble">{num}</div><h3 className="card-title">{title}</h3><p className="muted">{text}</p></div></article>
            ))}
          </div>
          <p className="price-guidance">Reference MOQ price ranges: business backpacks from about USD 6.80-18.50, laptop backpacks from about USD 7.50-21.00, and outdoor or specialty backpacks from about USD 8.80-26.00 depending on material, padding, logo method and order quantity.</p>
          <div className="trust-showcase">
            <div className="media-panel"><img src={assetPath('/assets/img/media/factory-capability-overview.webp')} alt="Custom Backpack Factory trade show and buyer service" /></div>
            <div className="media-panel"><img src={assetPath('/assets/img/media/why-choose-us.webp')} alt="buyer reviews for custom backpacks" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Featured Products</span><h2>Popular custom backpack collections and new additions</h2><p>Each product page includes unified price wording: "Contact us for best price".</p></div></div>
          <div className="grid grid-3">
            {featured.map(([slug, product]) => <ProductCard key={slug} slug={slug} product={product} showLogoZone />)}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="process-grid">
            <div>
              <div className="section-head"><div><span className="badge">Buyer Workflow</span><h2>Simple custom backpack order process</h2><p>Built for importers, wholesalers and brands that need clear communication before sampling and bulk production.</p></div></div>
              <div className="feature-list">
                {['Send Requirements', 'Confirm Details', 'Sample & Approve', 'Bulk Production'].map((title, index) => (
                  <div className="feature-item" key={title}><div className="icon-bubble">{index + 1}</div><div><strong>{title}</strong><div className="muted">{['Product type, quantity, logo, material, color, packaging and target market.', 'We review practical production options and help align the custom direction.', 'Typical sample time is 7-15 days after key details are confirmed.', 'Production usually takes 15-30 days after sample approval, based on actual scheduling.'][index]}</div></div></div>
                ))}
              </div>
            </div>
            <div className="media-panel trust-media"><img src={assetPath('/assets/img/media/production-process.webp')} alt="custom backpack manufacturing workflow" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <HomeInquiry />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div><span className="badge">Buying Guides</span><h2>SEO blog system for future traffic</h2><p>These articles help buyers find us through material, MOQ, logo and sourcing questions.</p></div>
            <Link className="btn btn-secondary" href="/blog">View all guides</Link>
          </div>
          <div className="grid grid-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article className="card" key={post.slug}>
                <Link className="card-media" href={`/blog/${post.slug}`}><img src={assetPath(post.hero)} alt={post.title} /></Link>
                <div className="card-body"><span className="badge">{post.category}</span><h3 className="card-title">{post.title}</h3><p className="muted">{post.description}</p></div>
                <div className="card-actions"><Link className="btn btn-primary" href={`/blog/${post.slug}`}>Read Guide</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
