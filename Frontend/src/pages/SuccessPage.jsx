import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Music, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="success-page" style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            background: '#ffffff'
        }}>
            <motion.div 
                className="glass-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                    maxWidth: '550px',
                    padding: '50px 40px',
                    borderRadius: '24px',
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
                }}
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                    style={{ marginBottom: '30px' }}
                >
                    <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        background: 'rgba(34, 197, 94, 0.1)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto' 
                    }}>
                        <CheckCircle size={60} color="#22c55e" />
                    </div>
                </motion.div>

                <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '800', 
                    marginBottom: '15px',
                    background: 'linear-gradient(to right, #22c55e, #4ade80)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Payment Successful!
                </h1>
                
                <h3 style={{ 
                    color: '#FF4E50', 
                    marginBottom: '20px', 
                    fontSize: '1.4rem', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    Your song is being created <Music size={24} className="pulse-animation" />
                </h3>

                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
                    Our AI and world-class artists are now hard at work crafting your personalized melody. 
                    You will receive a WhatsApp message with the first draft within 24-48 hours.
                </p>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px', 
                    width: '100%' 
                }}>
                    <Link to="/" className="btn-primary" style={{
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #FF4E50 0%, #F9D423 100%)',
                        color: 'white',
                        borderRadius: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '1.1rem'
                    }}>
                        Back to Home <ArrowRight size={18} />
                    </Link>
                    
                    <button className="btn-outline" style={{
                        padding: '12px 24px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        background: '#f8f9fa',
                        color: '#333',
                        borderRadius: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <Share2 size={18} /> Share Your Excitement
                    </button>
                </div>

                <div style={{ marginTop: '30px', color: '#888', fontSize: '0.85rem' }}>
                    Order ID: <span style={{ color: '#333' }}>#ORD-{Math.floor(Math.random() * 1000000)}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
