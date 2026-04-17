const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const razorpay = require('./config/razorpay');
const Order = require('./models/Order');
const Admin = require('./models/Admin');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5174', 'https://melody-five-omega.vercel.app'], credentials: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('MongoDB Connected to Atlas');
        await seedAdmin();
    })
    .catch(async (err) => {
        console.error('Atlas Connection Failed, trying local MongoDB...');
        mongoose.connect('mongodb://127.0.0.1:27017/melody_made', { serverSelectionTimeoutMS: 5000 })
            .then(async () => {
                console.log('MongoDB Connected to Local');
                await seedAdmin();
            })
            .catch(e => console.error('All MongoDB connections failed.'));
    });

async function seedAdmin() {
    try {
        const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await Admin.create({ username: process.env.ADMIN_USERNAME, password: hashedPassword });
            console.log('Admin user seeded');
        }
    } catch (err) {
        console.error('Admin seeding failed:', err.message);
    }
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Create uploads folder if not exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// --- API ROUTES ---

// 1. Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body; 
        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// 2. Verify Payment and Save Order
app.post('/api/verify-payment', upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'voiceNote', maxCount: 1 }
]), async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            whatsappNumber,
            mood,
            occasion,
            date,
            songType,
            deliveryTime,
            language,
            preferredArtist,
            story,
            specialLyrics,
            addons,
            totalPrice
        } = req.body;

        // Verify Signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // Process Files
        const photoPaths = req.files['photos'] ? req.files['photos'].map(f => f.path.replace(/\\/g, '/')) : [];
        const voiceNotePath = req.files['voiceNote'] ? req.files['voiceNote'][0].path.replace(/\\/g, '/') : null;

        // Save Order
        const newOrder = new Order({
            whatsappNumber,
            mood,
            occasion,
            date,
            songType,
            deliveryTime,
            language,
            preferredArtist,
            story,
            specialLyrics,
            addons: JSON.parse(addons || '[]'),
            photos: photoPaths,
            voiceNote: voiceNotePath,
            totalPrice: Number(totalPrice),
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            paymentStatus: 'paid'
        });

        await newOrder.save();
        res.status(201).json({ message: "Payment verified and order saved", order: newOrder });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

// Admin Auth (With Manual Bypass)
app.post('/api/admin/login', async (req, res) => {
    try {
        const username = (req.body.username || "").trim();
        const password = (req.body.password || "").trim();
        
        const envUser = (process.env.ADMIN_USERNAME || "").trim();
        const envPass = (process.env.ADMIN_PASSWORD || "").trim();

        console.log('--- Login Debug ---');
        console.log('Input:', { username, password });
        console.log('Env:', { envUser, envPass });
        
        // DB Bypass Fallback
        if (username === envUser && password === envPass) {
            console.log('Bypass Success!');
            return res.json({ message: "Login successful", token: "bypass_token" });
        }
        
        console.log('Bypass failed, checking DB...');
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful", token: "placeholder_token" });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// Admin: Get Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({ paymentStatus: 'paid' });
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending', paymentStatus: 'paid' });

        res.json({ totalOrders, revenue, pendingOrders });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Get All Orders
app.get('/api/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Admin: Update Order Status
app.put('/api/admin/orders/:id', async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
