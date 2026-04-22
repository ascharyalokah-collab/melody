import React from 'react';
import './LegalPages.css';

const RefundPolicy = () => {
  return (
    <div className="legal-container">
      <header className="legal-header">
        <h1>Refund Policy</h1>
        <p>Effective Date: 01-04-2026</p>
      </header>

      <section className="legal-content">
        <p>At Melody Made For You, we provide customized digital music services. Due to the personalized nature of our services, the following refund policy applies:</p>

        <h2>1. No Refund After Work Starts</h2>
        <p>Once the order is confirmed and work has begun, no refunds will be provided.</p>

        <h2>2. Refund Eligibility</h2>
        <p>Refunds may be considered only if:</p>
        <ul>
          <li>The service was not delivered within the promised time</li>
          <li>There is a complete failure to deliver the service</li>
        </ul>

        <h2>3. Revisions Instead of Refunds</h2>
        <p>We offer revisions to ensure customer satisfaction. Minor changes can be requested after delivery.</p>

        <h2>4. Cancellation</h2>
        <p>Orders can be canceled only before work begins. Once processing starts, cancellation is not allowed.</p>

        <h2>5. Digital Product Policy</h2>
        <p>As this is a digital service, no physical product is shipped.</p>

        <div className="contact-info">
          <h2>6. Contact for Support</h2>
          <p><strong>Email:</strong> support@melodymadeforyou.in</p>
          <p><strong>Phone:</strong> +91 91101 27807</p>
        </div>

        <p style={{ marginTop: '40px', fontSize: '0.9rem', color: '#888', fontStyle: 'italic' }}>
          We aim to provide the best experience and will work with you to resolve any concerns.
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
