// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51234567890abcdefghijklmnopqrstuvwxyz'); // Use env variable for security
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection - Using MongoDB Atlas (cloud) or local MongoDB
// const MONGODB_URI = process.env.MONGODB_URI 

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected successfully'))
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err);
//   console.log('💡 Please check your MongoDB connection string in .env file');
// });

// // Models
// const ReservationSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   time: { type: Date, required: true },
//   guests: { type: Number, required: true, min: 1, max: 20 },
//   fullName: { type: String, required: true, trim: true },
//   email: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
//   },
//   phone: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number']
//   },
//   specialRequest: { type: String, trim: true },
//   status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// const OrderSchema = new mongoose.Schema({
//   orderType: { type: String, required: true, enum: ['pickup', 'delivery'] },
//   name: { type: String, required: true, trim: true },
//   phone: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number']
//   },
//   address: { type: String, required: true, trim: true },
//   email: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
//   },
//   specialInstructions: { type: String, trim: true },
//   items: [{
//     name: { type: String, required: true },
//     price: { type: String, required: true },
//     quantity: { type: Number, default: 1, min: 1 }
//   }],
//   totalAmount: { type: Number, required: true, min: 0 },
//   status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] },
//   paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'refunded'] },
//   paymentIntentId: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// // User Schema for storing customer data
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
//   },
//   phone: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number']
//   },
//   address: { type: String, trim: true },
//   orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
//   reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// // Update timestamps before saving
// ReservationSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// OrderSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// UserSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Reservation = mongoose.model('Reservation', ReservationSchema);
// const Order = mongoose.model('Order', OrderSchema);
// const User = mongoose.model('User', UserSchema);

// // Routes

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ message: 'Tibetan Restaurant API is running!' });
// });

// // Reservation routes
// app.post('/api/reservations', async (req, res) => {
//   try {
//     // Find or create user
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       user = new User({
//         name: req.body.fullName,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address || ''
//       });
//       await user.save();
//     }

//     // Create reservation
//     const reservation = new Reservation(req.body);
//     await reservation.save();

//     // Link reservation to user
//     user.reservations.push(reservation._id);
//     await user.save();

//     res.status(201).json({ 
//       success: true, 
//       message: 'Reservation submitted successfully! We will confirm your booking soon.',
//       reservationId: reservation._id 
//     });
//   } catch (error) {
//     console.error('Reservation error:', error);
//     res.status(400).json({ 
//       success: false, 
//       message: 'Failed to submit reservation',
//       error: error.message 
//     });
//   }
// });

// app.get('/api/reservations', async (req, res) => {
//   try {
//     const reservations = await Reservation.find().sort({ createdAt: -1 });
//     res.json({ success: true, reservations });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
//   }
// });

// // Order routes
// app.post('/api/orders', async (req, res) => {
//   try {
//     // Find or create user
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address
//       });
//       await user.save();
//     } else {
//       // Update user info if provided
//       if (req.body.address) user.address = req.body.address;
//       if (req.body.phone) user.phone = req.body.phone;
//       await user.save();
//     }

//     // Create order
//     const order = new Order(req.body);
//     await order.save();

//     // Link order to user
//     user.orders.push(order._id);
//     await user.save();

//     res.status(201).json({ 
//       success: true, 
//       message: 'Order submitted successfully!',
//       orderId: order._id 
//     });
//   } catch (error) {
//     console.error('Order error:', error);
//     res.status(400).json({ 
//       success: false, 
//       message: 'Failed to submit order',
//       error: error.message 
//     });
//   }
// });

// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch orders' });
//   }
// });

// // Payment routes
// app.post('/api/create-payment-intent', async (req, res) => {
//   try {
//     const { amount, currency = 'inr' } = req.body;
    
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert to paise
//       currency: currency,
//       payment_method_types: ['card', 'upi'],
//       metadata: {
//         orderId: req.body.orderId || 'temp'
//       }
//     });

//     res.json({
//       success: true,
//       clientSecret: paymentIntent.client_secret
//     });
//   } catch (error) {
//     console.error('Payment intent error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create payment intent',
//       error: error.message
//     });
//   }
// });

// app.post('/api/confirm-payment', async (req, res) => {
//   try {
//     const { paymentIntentId, orderId } = req.body;
    
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
//     if (paymentIntent.status === 'succeeded') {
//       // Update order status
//       await Order.findByIdAndUpdate(orderId, { 
//         status: 'paid',
//         paymentIntentId: paymentIntentId
//       });
      
//       res.json({
//         success: true,
//         message: 'Payment confirmed successfully!'
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: 'Payment not completed'
//       });
//     }
//   } catch (error) {
//     console.error('Payment confirmation error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to confirm payment',
//       error: error.message
//     });
//   }
// });

// // User routes
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find().populate('orders').populate('reservations').sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch users' });
//   }
// });

// app.get('/api/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate('orders').populate('reservations');
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch user' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
//   console.log(`📝 API available at http://localhost:${PORT}/api`);
//   console.log(`💾 MongoDB URI: ${MONGODB_URI.replace(/:[^:]+@/, ':****@')}`);
// });
