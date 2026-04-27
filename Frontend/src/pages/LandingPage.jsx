import React, { useState, useRef } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Play, Pause, Star, Heart, Cake, Gift, Clock, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Audio Imports
import audioOne from '../assets/audio-one.mpeg';
import audioTwo from '../assets/audio-two.mpeg';
import audioThree from '../assets/audio-three.mpeg';
import audioFour from '../assets/audio-four.mpeg';
import audioFive from '../assets/audio-five.mpeg';
import audioSix from '../assets/audio-six.mpeg';

// Image Imports
import songTwoImg from '../assets/song-two.png';
import songThreeImg from '../assets/song-three.png';
import songFourImg from '../assets/song-four.png';
import songFiveImg from '../assets/song-five.png';
import songSixImg from '../assets/song-six.png';
import sonBirthdayImg from '../assets/son-birthday.png';

const LandingPage = () => {
    const [playingId, setPlayingId] = useState(null);
    const audioRef = useRef(null);

    const trendingSongs = [
        { id: 1, title: 'Birthday Special for My Son', genre: 'Upbeat Celebration', audio: audioOne, image: sonBirthdayImg, stats: '3.2k Creations', tags: '#Birthday #Son' },
        { id: 2, title: 'Forever Together', genre: 'Soulful Melody', audio: audioTwo, image: songTwoImg, stats: '840 Creations', tags: '#Wedding #Forever' },
        { id: 3, title: 'Sweet Memories', genre: 'Acoustic Folk', audio: audioThree, image: songThreeImg, stats: '2.1k Creations', tags: '#Nostalgia #Family' },
        { id: 4, title: 'Modern Soul', genre: 'Modern R&B', audio: audioFour, image: songFourImg, stats: '1.5k Creations', tags: '#Birthday #Fun' },
        { id: 5, title: 'Wedding Waltz', genre: 'Classical Fusion', audio: audioFive, image: songFiveImg, stats: '900 Creations', tags: '#Marriage #Dance' },
        { id: 6, title: 'Life Journey', genre: 'Inspirational Pop', audio: audioSix, image: songSixImg, stats: '1.7k Creations', tags: '#Success #Path' },
    ];

    const togglePlay = (song) => {
        if (playingId === song.id) {
            audioRef.current.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.src = song.audio;
                audioRef.current.play();
            }
            setPlayingId(song.id);
        }
    };

    return (
        <div className="landing-page">
            <Hero />

            <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

            {/* Trending Songs Section */}
            <section id="trending" className="trending">
                <div className="container">
                    <div className="section-title">
                        <h2>Trending Creations</h2>
                        <p>Hear what others have created with their stories.</p>
                    </div>
                    <div className="trending-grid">
                        {trendingSongs.map((song) => (
                            <div key={song.id} className="song-card glass-card">
                                <div className="song-img" onClick={() => togglePlay(song)}>
                                    <img src={song.image} alt={song.title} className="song-cover-img" />
                                    <div className="overlay-dark"></div>
                                    <div className={`play-btn ${playingId === song.id ? 'playing' : ''}`}>
                                        {playingId === song.id ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                                    </div>
                                    <div className="visualizer">
                                        {playingId === song.id && (
                                            <div className="bars">
                                                <span></span><span></span><span></span><span></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3>{song.title}</h3>
                                <p>{song.genre}</p>
                                <div className="song-footer">
                                    <span className="views">{song.stats}</span>
                                    <div className="tags">{song.tags}</div>
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
                                <li><CheckCircle size={20} color="#e9619a" /> Unique Melodies for every story</li>
                                <li><CheckCircle size={20} color="#e9619a" /> Emotional Intelligence processing</li>
                                <li><CheckCircle size={20} color="#e9619a" /> Studio Grade Vocal layering</li>
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
                            <Heart size={40} />
                            <h3>Love & Romance</h3>
                            <p>Proposals, Anniversaries, Weddings</p>
                        </div>
                        <div className="cat-card">
                            <Cake size={40} />
                            <h3>Birthdays</h3>
                            <p>Personalized birthday wishes in song</p>
                        </div>
                        <div className="cat-card">
                            <Gift size={40} />
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


            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-title">
                        <h2>What They Say</h2>
                    </div>
                    <div className="testimonial-slider">
                        <div className="testimonial-card glass-card">
                            <div className="stars">
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                            </div>
                            <p>"I made a song for my wife's 30th birthday and she was in tears. Most emotional gift ever!"</p>
                            <h4>— Rahul Sharma</h4>
                        </div>
                        <div className="testimonial-card glass-card">
                            <div className="stars">
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                                <Star fill="#e9619a" size={16} />
                            </div>
                            <p>"The quality is insane. It sounds like a real song you'd hear on Spotify."</p>
                            <h4>— Priya Malik</h4>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default LandingPage;
