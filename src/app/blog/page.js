import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Custom Bag Buying Guides',
  description: 'Custom bag sourcing guides for importers and wholesale buyers, including MOQ, logo methods, backpack features and OEM/ODM planning.',
  alternates: { canonical: '/blog' }
};

export default function BlogPage() {
  return (
    <section className="section bg-soft">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="badge">Buying Guides</span>
            <h1>Custom bag sourcing blog</h1>
            <p>Practical articles for B2B buyers, built to support Google traffic and future content updates.</p>
          </div>
        </div>
        <div className="grid grid-3">
          {blogPosts.map((post) => (
            <article className="card blog-card" key={post.slug}>
              <Link className="card-media" href={`/blog/${post.slug}`}><img src={assetPath(post.hero)} alt={post.title} /></Link>
              <div className="card-body">
                <div className="blog-meta"><span>{post.category}</span><span>{post.date}</span></div>
                <h2 className="card-title">{post.title}</h2>
                <p className="muted">{post.description}</p>
              </div>
              <div className="card-actions"><Link className="btn btn-primary" href={`/blog/${post.slug}`}>Read Guide</Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
