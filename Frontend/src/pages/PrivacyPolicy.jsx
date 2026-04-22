import React from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <header className="legal-header">
        <h1>Privacy Policy</h1>
        <p>Effective Date: 01-04-2026</p>
      </header>

      <section className="legal-content">
        <p>Welcome to Melody Made For You (https://melodymadeforyou.in/).</p>
        <p>We value your privacy and are committed to protecting your personal information.</p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Order details and customization inputs (lyrics, preferences, occasion details)</li>
          <li>Payment details (processed securely via Razorpay; we do not store card details)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and deliver your custom music orders</li>
          <li>Communicate updates regarding your order</li>
          <li>Improve our services and customer experience</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>We implement reasonable security measures to protect your data. However, no online platform is 100% secure.</p>

        <h2>4. Third-Party Services</h2>
        <p>Payments are processed via Razorpay. We are not responsible for third-party privacy practices.</p>

        <h2>5. Cookies</h2>
        <p>We may use cookies to enhance user experience.</p>

        <h2>6. Your Rights</h2>
        <p>You can request access, update, or deletion of your data by contacting us.</p>

        <div className="contact-info">
          <h2>7. Contact Us</h2>
          <p><strong>Email:</strong> support@melodymadeforyou.in</p>
          <p><strong>Phone:</strong> +91 91101 27807</p>
        </div>

        <p style={{ marginTop: '40px', fontSize: '0.9rem', color: '#888' }}>
          By using our website, you consent to this Privacy Policy.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
