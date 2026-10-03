# Frontend Environment Variables Setup

## 📁 Frontend .env File Location
**Create this file:** `my-app/.env` (in the root of my-app, NOT in src folder)

## Environment Variables

Copy `.env.example` to `.env` in the `my-app` folder and set the public configuration values you use:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

`REACT_APP_*` variables are embedded in the frontend JavaScript bundle and are visible to anyone using the site. Never put passwords, database connection strings, Stripe secret keys, or other private credentials in frontend variables. Google Maps keys and Stripe publishable keys are intended for public use; restrict them in their provider dashboards (for example, restrict the Maps key by website referrer and enabled APIs).

For a Google Maps key, enable the Maps JavaScript API and any other APIs the app uses in [Google Cloud Console](https://console.cloud.google.com/), then restrict the key to your site and required APIs. Restart the React development server after changing `.env`.
