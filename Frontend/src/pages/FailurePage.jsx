import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
    return (
        <div className="failure-page" style={{ 
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
                    maxWidth: '500px',
                    padding: '40px',
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
                    <XCircle size={80} color="#f43f5e" style={{ margin: '0 auto' }} />
                </motion.div>
                
                <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '800', 
                    marginBottom: '15px',
                    background: 'linear-gradient(to right, #f43f5e, #fb7185)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Payment Failed
                </h1>
                
                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
                    Oops! Something went wrong with your transaction. Don't worry, no money was deducted from your account. 
                </p>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px', 
                    width: '100%' 
                }}>
                    <Link to="/order" className="btn-primary" style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #FF4E50 0%, #F9D423 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <RefreshCw size={18} /> Try Again
                    </Link>
                    
                    <a href="https://wa.me/your_number" className="btn-outline" style={{
                        padding: '12px 24px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        background: '#f8f9fa',
                        color: '#333',
                        borderRadius: '12px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <MessageCircle size={18} /> Contact Support
                    </a>
                    
                    <Link to="/" style={{ 
                        color: '#888', 
                        textDecoration: 'none', 
                        fontSize: '0.9rem',
                        marginTop: '10px'
                    }}>
                        Return to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default FailurePage;
