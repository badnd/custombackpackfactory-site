import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-sm">
      <div className="container legal-page">
        <span className="badge">404</span>
        <h1>Page not found</h1>
        <p>The page may have moved during the website upgrade. Please return to the product catalog or contact us directly.</p>
        <Link className="btn btn-primary" href="/products">View Products</Link>
      </div>
    </section>
  );
}
