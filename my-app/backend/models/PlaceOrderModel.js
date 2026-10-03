// backend/models/PlaceOrderModel.js
const mongoose = require("mongoose");

const PlaceOrderSchema = new mongoose.Schema({
  orderType: {
    type: String,
    enum: ["Pickup", "Delivery"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: function () {
      return this.orderType === "Delivery"; // address required only for delivery
    },
  },
  email: {
    type: String,
  },
  specialInstructions: {
    type: String,
  },
  orderSummary: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PlaceOrder = mongoose.model("PlaceOrder", PlaceOrderSchema);
module.exports = PlaceOrder;
