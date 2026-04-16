import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Upload, Music, CreditCard, MessageCircle, Info } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    whatsapp: '',
    mood: 'Romantic',
    occasion: '',
    date: '',
    songType: 'Basic Song (₹999)',
    deliveryTime: '24 Hours',
    language: 'Telugu',
    artist: 'Male',
    story: '',
    specialLyrics: false,
    specialLyricsText: ''
  });

  const [addons, setAddons] = useState({
    coverArt: false,
    lyricalVideo: false,
    instrumental: false
  });

  const [totalPrice, setTotalPrice] = useState(999);

  useEffect(() => {
    let price = 0;
    if (formData.songType.includes('999')) price = 999;
    else if (formData.songType.includes('1499')) price = 1499;
    else if (formData.songType.includes('1699')) price = 1699;

    if (addons.coverArt) price += 199;
    if (addons.lyricalVideo) price += 299;
    if (addons.instrumental) price += 299;

    setTotalPrice(price);
  }, [formData.songType, addons]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddonToggle = (addon) => {
    setAddons({ ...addons, [addon]: !addons[addon] });
  };

  const handleFileChange = (e) => {
    // File uploads removed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Create Order in Razorpay via Backend
    try {
        const res = await axios.post('http://localhost:5000/api/create-order', { amount: totalPrice });
        const { id: order_id, currency, amount } = res.data;

        // 2. Open Razorpay Popup
        const options = {
            key: "rzp_test_Sdiu91cqm55ZCe", // Razorpay Key ID from user
            amount: amount,
            currency: currency,
            name: "MelodyMadeForYou",
            description: "Personalized Song Order",
            order_id: order_id,
            handler: async (response) => {
                // 3. Verify Payment and Send Data
                const data = new FormData();
                data.append('razorpay_order_id', response.razorpay_order_id);
                data.append('razorpay_payment_id', response.razorpay_payment_id);
                data.append('razorpay_signature', response.razorpay_signature);
                data.append('whatsappNumber', formData.whatsapp);
                data.append('mood', formData.mood);
                data.append('occasion', formData.occasion);
                data.append('date', formData.date);
                data.append('songType', formData.songType);
                data.append('deliveryTime', formData.deliveryTime);
                data.append('language', formData.language);
                data.append('preferredArtist', formData.artist);
                data.append('story', formData.story);
                data.append('specialLyrics', formData.specialLyricsText);
                data.append('totalPrice', totalPrice);
                
                const selectedAddons = [];
                if (addons.coverArt) selectedAddons.push({ name: 'Custom Cover Art', price: 199 });
                if (addons.lyricalVideo) selectedAddons.push({ name: 'Lyrical Video', price: 299 });
                if (addons.instrumental) selectedAddons.push({ name: 'Instrumental', price: 299 });
                data.append('addons', JSON.stringify(selectedAddons));

                // File uploads removed

                try {
                    const verifyRes = await axios.post('http://localhost:5000/api/verify-payment', data);
                    if (verifyRes.status === 201) {
                        navigate('/success');
                    } else {
                        navigate('/failed');
                    }
                } catch (err) {
                    console.error("Verification error:", err);
                    navigate('/failed');
                }
            },
            prefill: {
                contact: formData.whatsapp,
            },
            theme: {
                color: "#FF4E50",
            },
        };

        const rzp1 = new window.Razorpay(options);
        
        rzp1.on('payment.failed', function (response){
            console.error(response.error);
            navigate('/failed');
        });

        rzp1.open();

    } catch (err) {
        console.error(err);
        navigate('/failed');
    }
  };

  return (
    <div className="order-page container">
      <div className="order-header">
        <h1>Create Your <span>Masterpiece</span></h1>
        <p>Tell us your story, and we'll turn it into a song that lasts forever.</p>
      </div>

      <form className="order-form glass-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label><MessageCircle size={18} /> WhatsApp Number *</label>
              <input 
                type="text" 
                name="whatsapp" 
                placeholder="Enter your WhatsApp number" 
                required 
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Choose Mood</label>
              <select name="mood" value={formData.mood} onChange={handleInputChange}>
                <option>Romantic</option>
                <option>Melancholic</option>
                <option>Upbeat & Happy</option>
                <option>Emotional</option>
                <option>Funny</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Occasion (Optional)</label>
                <input 
                  type="text" 
                  name="occasion" 
                  placeholder="e.g. Birthday" 
                  value={formData.occasion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Song Type & Pricing</label>
              <select name="songType" value={formData.songType} onChange={handleInputChange}>
                <option>Basic Song (₹999)</option>
                <option>Song + Plus Slide Show (₹1499)</option>
                <option>Song + Slideshow + Lyrics PDF (₹1699)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tell Us Your Story *</label>
              <textarea 
                name="story" 
                rows="5" 
                placeholder="Share the details, memories, or names you want in the song..."
                required
                value={formData.story}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-row">
              <div className="form-group">
                <label>Delivery Time</label>
                <select name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange}>
                  <option>24 Hours</option>
                  <option>48 Hours</option>
                  <option>7 Days (Standard)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange}>
                  <option>Telugu</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Kannada</option>
                  <option>Tamil</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Artist</label>
              <div className="radio-group">
                <label className={`radio-label ${formData.artist === 'Male' ? 'active' : ''}`}>
                  <input type="radio" name="artist" value="Male" checked={formData.artist === 'Male'} onChange={handleInputChange} />
                  Male Vocalist
                </label>
                <label className={`radio-label ${formData.artist === 'Female' ? 'active' : ''}`}>
                  <input type="radio" name="artist" value="Female" checked={formData.artist === 'Female'} onChange={handleInputChange} />
                  Female Vocalist
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="specialLyrics" 
                  checked={formData.specialLyrics}
                  onChange={handleInputChange}
                />
                Include specific phrases/lyrics?
              </label>
              {formData.specialLyrics && (
                <textarea 
                  name="specialLyricsText" 
                  rows="2" 
                  placeholder="Enter specific lines..."
                  value={formData.specialLyricsText}
                  onChange={handleInputChange}
                ></textarea>
              )}
            </div>

            <div className="addons-section">
              <label>Add-ons</label>
              <div className={`addon-item ${addons.coverArt ? 'active' : ''}`} onClick={() => handleAddonToggle('coverArt')}>
                <span>Custom Cover Art</span>
                <span>+₹199</span>
              </div>
              <div className={`addon-item ${addons.lyricalVideo ? 'active' : ''}`} onClick={() => handleAddonToggle('lyricalVideo')}>
                <span>Lyrical Video</span>
                <span>+₹299</span>
              </div>
              <div className={`addon-item ${addons.instrumental ? 'active' : ''}`} onClick={() => handleAddonToggle('instrumental')}>
                <span>Instrumental Version</span>
                <span>+₹299</span>
              </div>
            </div>

            {/* File uploads removed */}
          </div>
        </div>

        <div className="order-summary">
            <div className="total">
                <span>Total Amount:</span>
                <h2>₹{totalPrice}</h2>
            </div>
            <button type="submit" className="btn-primary btn-large">
                Get Your Song Now
            </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
