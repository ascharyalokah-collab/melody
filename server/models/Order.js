const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    whatsappNumber: { type: String, required: true },
    mood: { type: String, required: true },
    occasion: { type: String },
    date: { type: Date },
    songType: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    language: { type: String, required: true },
    preferredArtist: { type: String, required: true },
    story: { type: String, required: true },
    specialLyrics: { type: String },
    addons: [{
        name: String,
        price: Number
    }],
    photos: [String],
    voiceNote: String,
    totalPrice: { type: Number, required: true },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid', 'failed'], 
        default: 'pending' 
    },
    orderStatus: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
