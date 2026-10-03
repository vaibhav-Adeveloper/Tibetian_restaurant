# Frontend Environment Variables Setup

## 📁 Frontend .env File Location
**Create this file:** `my-app/.env` (in the root of my-app, NOT in src folder)

## 🔑 Required Environment Variable

### Google Maps API Key
**Variable Name:** `REACT_APP_GOOGLE_MAPS_API_KEY`

**How to get it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Maps JavaScript API" and "Places API"
   - Go to "APIs & Services" → "Library"
   - Search for "Maps JavaScript API" → Click "Enable"
   - Search for "Places API" → Click "Enable"
4. Go to "APIs & Services" → "Credentials"
5. Click "Create Credentials" → "API Key"
6. Copy the API key
7. (Optional) Restrict the API key for security

**Example:**
```env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuv
```

**Important:** 
- Must start with `REACT_APP_` to work in React
- Restart React dev server after creating/updating

## 📝 Complete .env File Example

Create `my-app/.env` with this content:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

