// -----------------------------
// server.js
// -----------------------------
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const Reservation = require("./models/reservationModel");
const PlaceOrder = require("./models/PlaceOrderModel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------
// Middleware
// -----------------------------
app.use(express.static(path.join(__dirname, "build")));
// -----------------------------
// CORS FIX
// -----------------------------
const allowedOrigins = [
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "https://sizeable-shoshana-wedgier.ngrok-free.dev"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------
// MongoDB Connection
// -----------------------------
// Make sure your MongoDB Compass connection string is correct
// Example: mongodb://127.0.0.1:27017/restaurant
const MONGODB_URI = process.env.MONGODB_URI;

connectToMongoDB();

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// -----------------------------
// Schema & Model
// -----------------------------
// const reservationSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   guests: { type: Number, required: true, min: 1 },
//   fullName: { type: String, required: true, trim: true },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
//   },
//   phone: {
//     type: String,
//     required: true,
//     trim: true,
//     match: [/^[0-9]{10,14}$/, "Invalid phone number"],
//   },
//   specialRequest: { type: String, trim: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Reservation = mongoose.model("Reservation", reservationSchema);


// -----------------------------
// Routes
// -----------------------------

// Health check
// app.get("/", (req, res) => {
//   res.json({ message: "🍜 Tibetan Restaurant API is running fine!" });
// });

// Serve React app for all routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Save reservation of the tables
app.post("/api/reservations", async (req, res) => {
  try {
    console.log("📩 Incoming data:", req.body);

    // Convert date if needed (if frontend sends '11-11-2025' format)
    const parsedDate = new Date(req.body.date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    const newReservation = new Reservation({
      date: req.body.date,
      time: req.body.time,
      guests: req.body.guests,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      specialRequest: req.body.specialRequest || "",
    });
    

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation saved successfully!",
      data: newReservation,
    });
  } catch (error) {
    console.error("❌ Error saving reservation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save reservation",
      error: error.message,
    });
  }
});

// Fetch all reservations (for admin panel)
app.get("/api/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch reservations" });
  }
});

// -----------------------------
// Start Server
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
