import React from 'react';
import './LegalPages.css';

const TermsConditions = () => {
  return (
    <div className="legal-container">
      <header className="legal-header">
        <h1>Terms & Conditions</h1>
        <p>Effective Date: 01-04-2026</p>
      </header>

      <section className="legal-content">
        <p>By accessing and using https://melodymadeforyou.in/, you agree to the following terms:</p>

        <h2>1. Service Description</h2>
        <p>We provide AI-generated personalized music services for occasions such as weddings, birthdays, anniversaries, and special events.</p>

        <h2>2. User Responsibilities</h2>
        <p>You agree to provide accurate information and not use our services for illegal or harmful purposes.</p>

        <h2>3. Order Process</h2>
        <ul>
          <li>Customers select a service/package</li>
          <li>Provide customization details</li>
          <li>Make payment online</li>
          <li>Music is delivered digitally</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>All music created remains the intellectual property of Melody Made For You. Customers receive personal usage rights only.</p>

        <h2>5. Delivery</h2>
        <p>Delivery timelines are typically 2–5 business days but may vary depending on complexity.</p>

        <h2>6. Limitation of Liability</h2>
        <p>We are not liable for indirect or incidental damages arising from use of our services.</p>

        <h2>7. Modifications</h2>
        <p>We reserve the right to update these terms at any time.</p>

        <div className="contact-info">
          <h2>8. Contact</h2>
          <p><strong>Email:</strong> support@melodymadeforyou.in</p>
          <p><strong>Phone:</strong> +91 91101 27807</p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
