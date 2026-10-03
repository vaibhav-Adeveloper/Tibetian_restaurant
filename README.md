# Tibetian Restaurant Project

This repository contains a full-stack restaurant website for a Tibetan food business, built with a React frontend and an Express + MongoDB backend.

## Project Structure

```bash
Tibetian_restaurant/
├── my-app/                 # Main restaurant application
│   ├── src/                # React frontend source
│   ├── backend/            # Node.js/API backend
│   ├── public/             # Static assets
│   ├── package.json
│   └── README.md           # Project-specific documentation
├── features.txt            # Feature checklist / requirements
└── README.md               # Repository overview
```

## Main App

The main application is located in the `my-app/` folder and includes:

- Restaurant landing page with Tibetan-inspired design
- Interactive food menu and category filtering
- Cart and order flow
- Reservation booking system
- Stripe-ready payment flow
- Google Maps integration
- MongoDB-based reservation storage

## Quick Start

For detailed setup and run instructions, see the project README in:

- [my-app/README.md](./my-app/README.md)

## GitHub and secrets

Local `.env` files and private-key files are ignored by Git. Copy the committed `.env.example` templates to `.env` and add your own local values; never commit real credentials. Values prefixed with `REACT_APP_` are included in the public frontend bundle, so use them only for public keys/configuration and restrict those keys with their provider. Keep database credentials and other secrets in backend-only environment variables.

## Notes

This project is currently structured as a demo/portfolio restaurant app and is a strong base for future expansion, including authentication, admin features, and production deployment.
