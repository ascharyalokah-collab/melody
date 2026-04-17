import React from 'react';
import { motion } from 'framer-motion';
import { Play, Mic2, Star, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">
            <Star size={14} fill="#FF4E50" /> 
            <span>#1 AI Music Personalization Platform</span>
          </div>
          <h1>Your Story, <br /><span>Our Melody.</span></h1>
          <p>
            Transform your most precious memories, feelings, and stories into premium, 
            personalized songs crafted by AI and refined by world-class artists.
          </p>
          <div className="hero-btns">
            <Link to="/order" className="btn-primary">Create Your Song Now</Link>
            <button className="btn-outline">
              <Play size={20} />
              <span>Hear Samples</span>
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h4>10k+</h4>
              <p>Songs Made</p>
            </div>
            <div className="stat">
              <h4>4.9/5</h4>
              <p>User Rating</p>
            </div>
            <div className="stat">
              <h4>24hr</h4>
              <p>Delivery</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="image-wrapper">
             <div className="ai-overlay"></div>
             <div className="glow-sphere"></div>
             <div className="hero-symbol-container">
                <Music size={120} color="white" fill="white" className="hero-song-symbol" />
             </div>
          </div>
          <div className="floating-card glass-card">
            <Mic2 size={24} color="#FF4E50" />
            <div>
              <h5>Personalized for You</h5>
              <p>Studio Quality AI Vocals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
