# Environment Variables Setup Guide

## 📁 Backend .env File Location
**Create this file:** `my-app/backend/.env`

## 🔑 Required Environment Variables

### 1. MongoDB Connection String
**Variable Name:** `MONGODB_URI`

**How to get it:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose free tier)
4. Create a database user (username/password)
5. Click "Connect" → "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your actual password
8. Replace `<dbname>` with `tibetan-restaurant` (or any name you want)

**Example:**
```env
MONGODB_URI=mongodb+srv://myusername:mypassword123@cluster0.xxxxx.mongodb.net/tibetan-restaurant?retryWrites=true&w=majority
```

### 2. Server Port (Optional)
**Variable Name:** `PORT`
**Default:** 5000 (if not set)

```env
PORT=5000
```

### 3. Stripe Secret Key (Optional - for payments)
**Variable Name:** `STRIPE_SECRET_KEY`

**What is Stripe?**
- Stripe is a payment processing service (like PayPal, Razorpay)
- It allows you to accept online payments
- For testing, you can use test keys (free)
- You can skip this if you don't want payment processing yet

**How to get Stripe keys:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create a free account
3. Go to "Developers" → "API keys"
4. Copy the "Secret key" (starts with `sk_test_` for testing)
5. Copy the "Publishable key" (starts with `pk_test_` for testing)

**Test keys look like:**
- Secret: `sk_test_51AbCdEf...` (long string)
- Publishable: `pk_test_51AbCdEf...` (long string)

**Example:**
```env
STRIPE_SECRET_KEY=sk_test_51234567890abcdefghijklmnopqrstuvwxyz
```

**Note:** If you don't set Stripe keys, the app will use a default test key (but payments won't work properly). You can add this later.

## 📝 Complete .env File Example

Create `my-app/backend/.env` with this content:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/tibetan-restaurant?retryWrites=true&w=majority

# Server Port
PORT=5000

# Stripe Secret Key (optional - for payment processing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

## 🚫 Important Notes

1. **Never commit .env files to Git!** They contain sensitive information
2. The `.env` file should be in `my-app/backend/` folder (backend root)
3. Replace the example values with your actual credentials
4. Restart the backend server after creating/updating `.env`

## ✅ Quick Setup Checklist

- [ ] Create `my-app/backend/.env` file
- [ ] Add `MONGODB_URI` with your MongoDB connection string
- [ ] Add `PORT=5000` (optional)
- [ ] Add `STRIPE_SECRET_KEY` (optional - can add later)
- [ ] Restart backend server

