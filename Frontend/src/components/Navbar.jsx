import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Music size={32} color="#FF4E50" fill="#FF4E50" />
          <span>MelodyMade<span>ForYou</span></span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a>
          <a href="#trending" onClick={() => setIsMenuOpen(false)}>Trending</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <Link to="/order" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Get Your Song</Link>
        </div>

        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
