import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Play, Star, Heart, Cake, Gift, Clock, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />

            {/* Trending Songs Section */}
            <section id="trending" className="trending">
                <div className="container">
                    <div className="section-title">
                        <h2>Trending Creations</h2>
                        <p>Hear what others have created with their stories.</p>
                    </div>
                    <div className="trending-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="song-card glass-card">
                                <div className="song-img">
                                    <div className="play-btn"><Play fill="currentColor" /></div>
                                </div>
                                <h3>Memory of Us</h3>
                                <p>Romantic Pop • 3:24</p>
                                <div className="song-footer">
                                    <span className="views">1.2k Creations</span>
                                    <div className="tags">#Love #Anniversary</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Magic (Creations) */}
            <section className="ai-creations">
                <div className="container">
                    <div className="split-section">
                        <div className="split-text">
                            <h2>AI Magic, <br />Human Soul.</h2>
                            <p>Our advanced AI analyzes your story, identifies emotional peaks, and composes a unique melody that perfectly captures the essence of your message. Then, our studio artists refine the vocals for that premium professional sound.</p>
                            <ul className="feature-list">
                                <li><CheckCircle size={20} color="#FF4E50" /> Unique Melodies for every story</li>
                                <li><CheckCircle size={20} color="#FF4E50" /> Emotional Intelligence processing</li>
                                <li><CheckCircle size={20} color="#FF4E50" /> Studio Grade Vocal layering</li>
                            </ul>
                        </div>
                        <div className="split-visual">
                            <div className="wave-animation">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories">
                <div className="container">
                    <div className="section-title">
                        <h2>Songs for Every Occasion</h2>
                        <p>No matter the moment, we have the perfect vibe.</p>
                    </div>
                    <div className="cat-grid">
                        <div className="cat-card">
                            <Heart size={40} color="#FF4E50" />
                            <h3>Love & Romance</h3>
                            <p>Proposals, Anniversaries, Weddings</p>
                        </div>
                        <div className="cat-card">
                            <Cake size={40} color="#FF4E50" />
                            <h3>Birthdays</h3>
                            <p>Personalized birthday wishes in song</p>
                        </div>
                        <div className="cat-card">
                            <Gift size={40} color="#FF4E50" />
                            <h3>Surprises</h3>
                            <p>Farewells, Apologies, Thank You's</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <div className="section-title">
                        <h2>How It Works</h2>
                        <p>Three simple steps to your personalized anthem.</p>
                    </div>
                    <div className="steps-container">
                        <div className="step">
                            <div className="step-num">01</div>
                            <h3>Tell Your Story</h3>
                            <p>Fill out our simple form with your memories, names, and the mood you want.</p>
                        </div>
                        <div className="step">
                            <div className="step-num">02</div>
                            <h3>AI & Artist Synergy</h3>
                            <p>Our AI generates the soul, and our artists bring the voice to life.</p>
                        </div>
                        <div className="step">
                            <div className="step-num">03</div>
                            <h3>Celebrate</h3>
                            <p>Receive your studio-quality song via WhatsApp and email in as little as 24 hours.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="pricing">
                <div className="container">
                    <div className="section-title">
                        <h2>Choose Your Plan</h2>
                        <p>High-quality personalized music for every budget.</p>
                    </div>
                    <div className="pricing-grid">
                        <div className="price-card glass-card">
                            <h3>Basic</h3>
                            <div className="price">₹999</div>
                            <ul>
                                <li>1:30 Min Song</li>
                                <li>AI Vocals</li>
                                <li>48hr Delivery</li>
                                <li>Standard Lyrics</li>
                            </ul>
                            <Link to="/order" className="btn-outline">Choose Basic</Link>
                        </div>
                        <div className="price-card glass-card featured">
                            <div className="popular-tag">Most Popular</div>
                            <h3>Song + Slideshow</h3>
                            <div className="price">₹1,499</div>
                            <ul>
                                <li>2:30 Min Song</li>
                                <li>Custom Slideshow</li>
                                <li>24hr Delivery</li>
                                <li>HQ Audio</li>
                                <li>Shareable Video</li>
                            </ul>
                            <Link to="/order" className="btn-primary">Get Started</Link>
                        </div>
                        <div className="price-card glass-card">
                            <h3>Complete Kit</h3>
                            <div className="price">₹1,699</div>
                            <ul>
                                <li>Full Song</li>
                                <li>Slideshow Video</li>
                                <li>Lyrics PDF</li>
                                <li>12hr Priority Delivery</li>
                                <li>Social Media Ready</li>
                            </ul>
                            <Link to="/order" className="btn-outline">Go Premium</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-title">
                        <h2>What They Say</h2>
                    </div>
                    <div className="testimonial-slider">
                        <div className="testimonial-card glass-card">
                            <div className="stars">
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                            </div>
                            <p>"I made a song for my wife's 30th birthday and she was in tears. Most emotional gift ever!"</p>
                            <h4>— Rahul Sharma</h4>
                        </div>
                        <div className="testimonial-card glass-card">
                            <div className="stars">
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                                <Star fill="#FF4E50" size={16} />
                            </div>
                            <p>"The quality is insane. It sounds like a real song you'd hear on Spotify."</p>
                            <h4>— Priya Malik</h4>
                        </div>
                    </div>
                </div>
            </section>

             {/* App Download */}
             <section className="app-download">
                <div className="container">
                    <div className="app-card glass-card">
                        <div className="app-text">
                            <h2>Melody in Your Pocket</h2>
                            <p>Download our app to track your orders, chat with artists, and listen to your songs anywhere.</p>
                            <div className="app-btns">
                                <button className="btn-dark">App Store</button>
                                <button className="btn-dark">Google Play</button>
                            </div>
                        </div>
                        <div className="app-img">
                            {/* Visual representation of phone */}
                            <div className="phone-mock"></div>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default LandingPage;
