# 🚀 Commands to Run Tibetan Restaurant Application

## 📋 Prerequisites Checklist
Before running, make sure you have:
- [ ] Created `my-app/backend/.env` with MongoDB connection string
- [ ] Created `my-app/.env` with Google Maps API key
- [ ] Node.js installed (v14 or higher)

---

## 🔧 Step 1: Install Dependencies

### Install Frontend Dependencies
```bash
cd my-app
npm install
```

### Install Backend Dependencies
```bash
cd my-app/backend
npm install
```

**Note:** Only needed once or when `package.json` changes.

---

## ▶️ Step 2: Start the Application

You need **TWO terminal windows** - one for backend, one for frontend.

### Terminal 1: Start Backend Server

```bash
cd my-app/backend
npm start
```

**Expected output:**
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📝 API available at http://localhost:5000/api
💾 MongoDB URI: mongodb+srv://****@cluster...
```

**If MongoDB connection fails:**
- Check your `MONGODB_URI` in `backend/.env`
- Make sure MongoDB Atlas has your IP whitelisted (or use `0.0.0.0/0`)

---

### Terminal 2: Start Frontend React App

**Open a NEW terminal window**, then:

```bash
cd my-app
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

The browser should automatically open at `http://localhost:3000`

**If Google Maps doesn't load:**
- Check your `REACT_APP_GOOGLE_MAPS_API_KEY` in `my-app/.env`
- Make sure the API key is enabled in Google Cloud Console

---

## 🎯 Quick Start (All-in-One)

If you want to run both in one go, you can use these commands:

### Windows (PowerShell)
```powershell
# Terminal 1
cd my-app\backend
npm start

# Terminal 2 (new window)
cd my-app
npm start
```

### Windows (CMD)
```cmd
# Terminal 1
cd my-app\backend
npm start

# Terminal 2 (new window)
cd my-app
npm start
```

### Mac/Linux
```bash
# Terminal 1
cd my-app/backend
npm start

# Terminal 2 (new window)
cd my-app
npm start
```

---

## 🛑 How to Stop the Application

### Stop Backend
- Go to Terminal 1
- Press `Ctrl + C` (or `Cmd + C` on Mac)

### Stop Frontend
- Go to Terminal 2
- Press `Ctrl + C` (or `Cmd + C` on Mac)

---

## ✅ Verification Steps

After starting both servers, verify:

1. **Backend is running:**
   - Open browser: `http://localhost:5000/api/health`
   - Should see: `{"message":"Tibetan Restaurant API is running!"}`

2. **Frontend is running:**
   - Should automatically open: `http://localhost:3000`
   - You should see the Tibetan Restaurant website

3. **Test the application:**
   - Click on menu items to see dish details
   - Add items to cart
   - Try making a reservation
   - Check if Google Map loads

---

## 🐛 Troubleshooting

### Port 5000 already in use
```bash
# Change PORT in backend/.env to another port (e.g., 5001)
PORT=5001
```
Then update frontend API calls if needed.

### Port 3000 already in use
```bash
# React will ask to use another port (e.g., 3001)
# Or set PORT environment variable:
PORT=3001 npm start
```

### MongoDB connection fails
- Verify connection string in `backend/.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user credentials are correct

### Google Maps not loading
- Verify API key in `my-app/.env`
- Ensure Maps JavaScript API is enabled
- Check browser console for errors

---

## 📝 Notes

- **Backend runs on:** `http://localhost:5000`
- **Frontend runs on:** `http://localhost:3000`
- **API endpoints:** `http://localhost:5000/api/*`
- Both servers need to be running for full functionality
- Hot reload: Both servers auto-reload when you save code changes

---

## 🎉 You're All Set!

Once both terminals show the servers are running, your Tibetan Restaurant application is live! 🎊

