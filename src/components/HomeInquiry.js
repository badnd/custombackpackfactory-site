import { InquiryForm } from '@/components/InquiryForm';
import { siteData } from '@/data/site-data';

export function HomeInquiry() {
  return (
    <div className="home-inquiry">
      <div className="home-inquiry-copy">
        <span className="badge">Factory Quote</span>
        <h2>Send a custom backpack request in one minute</h2>
        <p>Tell us the bag type, quantity, logo method and size target. We will reply with practical MOQ, sample and production suggestions within 24 hours.</p>
        <div className="home-inquiry-points">
          <span>Free requirement review</span>
          <span>Logo and material suggestions</span>
          <span>Sample before bulk order</span>
        </div>
      </div>
      <div className="quote-card home-quote-card">
        <h3>Get a Factory Quote</h3>
        <InquiryForm productTitle="Homepage Factory Quote" productOptions={siteData.categories.map((category) => category.name)} />
      </div>
    </div>
  );
}
