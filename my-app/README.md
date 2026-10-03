# Tibet Kitchen

A modern restaurant web application for showcasing authentic Tibetan cuisine, taking table reservations, and processing food orders online.

This project combines a responsive React frontend with an Express + MongoDB backend to deliver a polished dining experience for customers who want to browse the menu, place an order, and reserve a table.

## Overview

Tibet Kitchen is designed as a complete restaurant ordering and reservation platform with a warm, premium visual style inspired by Himalayan culture. The app features:

- Interactive menu browsing with category filtering
- Dish details modal with pricing and ingredients
- Add-to-cart ordering flow for pickup or delivery
- Reservation form for guests
- Stripe-ready payment flow
- Google Maps integration for restaurant location
- MongoDB-powered reservation storage
- Smooth, mobile-responsive UI

## Features

### Customer Experience
- Elegant hero section and story-driven restaurant landing page
- Detailed menu cards for Tibetan dishes and beverages
- Quick filter options such as appetizers, mains, desserts, and drinks
- Cart management with quantity updates and order summary
- Flexible order flow using pickup or delivery style
- Reservation booking form with guest and schedule details

### Business Features
- Payment modal with card and UPI options
- Secure payment intent flow using Stripe test keys
- Restaurant location display via Google Maps
- Data persistence for reservations in MongoDB
- Easy extension point for future login, user accounts, and admin dashboard

## Tech Stack

### Frontend
- React.js
- JavaScript / JSX
- CSS Modules / custom styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS and dotenv support

### Integrations
- Stripe payment processing
- Google Maps JavaScript API
- MongoDB Atlas / local MongoDB connection

## Project Structure

```bash
my-app/
├── public/                  # Static assets and HTML shell
├── src/                    # Frontend React source
│   ├── components/         # Reusable UI components
│   ├── App.js             # Main app logic and restaurant UI
│   ├── App.css            # Styling for the restaurant website
│   ├── index.js           # React entry point
│   └── ...
├── backend/                # Express server and database logic
│   ├── models/             # Mongoose schemas/models
│   ├── server.js           # Backend API server
│   └── package.json
├── .env.example            # Safe frontend environment template
├── package.json            # Frontend dependencies and scripts
├── README.md               # Project documentation
├── SETUP.md                # Setup notes
├── RUN_COMMANDS.md        # Run instructions
└── ...
```

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (v18 or newer recommended)
- npm
- MongoDB running locally or a MongoDB Atlas account
- Google Maps API key
- Stripe test keys for payment simulation

## Installation

### 1) Install frontend dependencies

```bash
cd my-app
npm install
```

### 2) Install backend dependencies

```bash
cd my-app/backend
npm install
```

## Environment Setup

### Frontend `.env`
Copy `my-app/.env.example` to `my-app/.env` and set your public frontend configuration:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Backend `.env`
Copy `my-app/backend/.env.example` to `my-app/backend/.env` and set your local backend configuration:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tibetan-restaurant
PORT=5000
```

Never place private credentials in frontend variables: Create React App embeds all `REACT_APP_*` values in the public browser bundle. Google Maps API keys and Stripe publishable keys are public values and should be restricted through their provider dashboards. Database credentials and Stripe secret keys must remain in backend-only environment variables.

## Running the App

### Start the backend server

```bash
cd my-app/backend
npm start
```

### Start the frontend app

Open a second terminal and run:

```bash
cd my-app
npm start
```

Then visit:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## API Endpoints

The backend provides the following routes for the restaurant application:

```http
GET /api/reservations
POST /api/reservations
```

### Example reservation payload

```json
{
  "date": "2026-10-03",
  "time": "7:30 PM",
  "guests": 2,
  "fullName": "Anmol",
  "email": "anmol@example.com",
  "phone": "9876543210",
  "specialRequest": "Window seat please"
}
```

## Usage

1. Open the restaurant landing page.
2. Browse menu items and filter by category.
3. Click on a dish for more information.
4. Add items to the cart and choose pickup or delivery.
5. Fill in the order details.
6. Complete the payment process using the payment modal.
7. Reserve a table with your preferred date, time, and guest count.
8. Explore the restaurant location via the integrated Google Map.

## Notes

- The project is structured as a demo / portfolio-ready restaurant app.
- The Stripe and Google Maps APIs are intentionally configured for development/test usage.
- The app is a strong starting point for a production-ready restaurant platform with additional features such as authentication, admin management, online ordering history, and user accounts.

## License

This project is intended for educational, portfolio, and demo use. If you plan to deploy it commercially, make sure to review the licensing and configuration of all external services used.
