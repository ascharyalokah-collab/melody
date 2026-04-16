import React from 'react';
import { Music } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <Music size={32} color="#FF4E50" fill="#FF4E50" />
              <span>MelodyMade<span>ForYou</span></span>
            </div>
            <p>The world's first AI-powered personalized music platform. Crafting emotions into melodies.</p>
            <div className="social-links">
              <FaInstagram />
              <FaTwitter />
              <FaFacebook />
              <FaYoutube />
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>How It Works</li>
              <li>Price Plans</li>
              <li>Artists</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Get music tips and platform updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button className="btn-primary">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 MelodyMadeForYou. All rights reserved. Created with Love & AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
