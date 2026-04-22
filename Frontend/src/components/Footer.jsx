import React from 'react';
import { Music } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import logoImg from '../assets/M4ULOGO.png';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <img src={logoImg} alt="MelodyMadeForYou" className="footer-logo-img" />
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
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
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
