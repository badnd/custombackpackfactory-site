export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Custom Backpack Factory custom backpack website inquiry forms and buyer contact information.',
  alternates: { canonical: '/privacy-policy' }
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container article-container">
        <span className="badge">Privacy Policy</span>
        <h1>Privacy Policy</h1>
        <p className="article-lead">We respect buyer privacy and use submitted information only to respond to custom backpack inquiries, quotes and business communication.</p>
        <div className="article-content">
          <section><h2>Information we collect</h2><p>Inquiry forms may collect your name, business email, company name, product interest, quantity target and project requirements.</p></section>
          <section><h2>How we use information</h2><p>We use this information to reply to your inquiry, prepare product suggestions, discuss samples, confirm customization details and provide quotation support.</p></section>
          <section><h2>Data sharing</h2><p>We do not sell buyer information. We may use trusted email or analytics tools only to operate the website and communicate with buyers.</p></section>
          <section><h2>Contact</h2><p>For privacy questions, please contact annawei@nameerbag.com.</p></section>
        </div>
      </div>
    </section>
  );
}
