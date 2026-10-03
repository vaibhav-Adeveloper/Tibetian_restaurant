# Tibetan Restaurant - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google Maps API key
- Stripe account (for payments - optional for testing)

### Step 1: Install Dependencies

#### Frontend (React App)
```bash
cd my-app
npm install
```

#### Backend (Node.js Server)
```bash
cd my-app/backend
npm install
```

### Step 2: Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tibetan-restaurant?retryWrites=true&w=majority
PORT=5000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

#### Frontend Configuration
Create a `.env` file in the `my-app` folder:
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Step 3: Get API Keys

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Maps JavaScript API** and **Places API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key and add it to your `.env` file

#### Stripe API Keys (Optional - for payment processing)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Test Secret Key** and **Test Publishable Key**
3. Add them to your `.env` files

#### MongoDB Atlas Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string from **Connect** → **Connect your application**
5. Replace `<password>` with your database password
6. Add the connection string to your `.env` file

### Step 4: Run the Application

#### Start Backend Server
```bash
cd my-app/backend
npm start
```
The server will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd my-app
npm start
```
The app will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
my-app/
├── public/              # Static files
├── src/
│   ├── components/     # React components
│   │   ├── FoodModal.js
│   │   ├── GoogleMap.js
│   │   └── PaymentModal.js
│   ├── App.js          # Main app component
│   ├── App.css         # Main styles
│   └── index.js        # Entry point
├── backend/
│   ├── server.js       # Express server
│   └── .env            # Backend environment variables
└── .env                # Frontend environment variables
```

## 🎨 Features Implemented

### ✅ Core Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Reddish/Light Reddish Tibetan Theme** - Beautiful color scheme reflecting Tibetan culture
- **Smooth Animations** - Hover effects, transitions, and scroll animations
- **Box Shadows** - Enhanced depth and visual appeal
- **Interactive Menu** - Click on dishes to view detailed information
- **Shopping Cart** - Add items, update quantities, remove items
- **Order Management** - Place orders for pickup or delivery
- **Table Reservations** - Book tables with date, time, and guest count
- **Google Maps Integration** - Interactive map showing restaurant location
- **MongoDB Integration** - Store orders, reservations, and user data
- **Payment Processing** - Stripe integration for secure payments

### 🍽️ Tibetan Cuisine Menu Items
- Steamed Momos
- Fried Momos
- Chicken Thukpa
- Vegetable Thukpa
- Tibetan Butter Tea
- Tibetan Bread
- Chicken Shapta
- Tingmo
- Tibetan Hot Pot
- Sidpa (Beef Stew)
- Lhasa Beer
- Khapse (Tibetan Cookies)
- Tibetan Noodles (Thenthuk)
- Yak Butter
- Churpi

## 🔧 API Endpoints

### Reservations
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations` - Get all reservations

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/confirm-payment` - Confirm payment

### Health Check
- `GET /api/health` - Check if API is running

## 🎯 Usage

1. **View Menu**: Browse the menu with category filters
2. **View Dish Details**: Click on any dish image to see detailed information
3. **Add to Cart**: Click "Add to Cart" button on any dish
4. **Manage Cart**: Update quantities or remove items from cart
5. **Place Order**: Fill out the order form and submit
6. **Make Reservation**: Fill out the reservation form with date, time, and guest count
7. **View Location**: Check the Google Map for restaurant location

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB Atlas IP whitelist includes your IP (use `0.0.0.0/0` for testing)
- Verify your connection string is correct
- Make sure your database user has proper permissions

### Google Maps Not Loading
- Verify your API key is correct
- Check if Maps JavaScript API is enabled in Google Cloud Console
- Ensure billing is enabled (free tier works but requires billing account)

### Stripe Payment Issues
- Use test keys for development
- Check Stripe Dashboard for payment logs
- Verify your Stripe account is active

### Port Already in Use
- Change PORT in backend `.env` file
- Update frontend API calls to use new port

## 📝 Notes

- The app uses **MongoDB** to store all user data, orders, and reservations
- User data is automatically created when placing orders or making reservations
- All form validations are implemented both on frontend and backend
- The design follows a reddish/light reddish theme to reflect Tibetan culture
- All animations and transitions use CSS for smooth performance

## 🚢 Deployment

For production deployment:
1. Set `NODE_ENV=production` in backend `.env`
2. Use production Stripe keys
3. Configure production MongoDB URI
4. Build React app: `npm run build`
5. Serve the `build` folder with a web server (nginx, Apache, etc.)
6. Deploy backend to a cloud service (Heroku, AWS, DigitalOcean, etc.)

## 📄 License

This project is created for Tibetan Restaurant.
