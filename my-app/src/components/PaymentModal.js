import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './PaymentModal.css';

const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz'); // Test publishable key

const PaymentModal = ({ isOpen, onClose, orderData, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen) return null;

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Create payment intent
      const response = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount: orderData.totalAmount,
        currency: 'inr',
        orderId: orderData.orderId
      });

      const { clientSecret } = response.data;

      if (paymentMethod === 'upi') {
        // Handle UPI payment
        const stripe = await stripePromise;
        const { error } = await stripe.confirmUpiPayment(clientSecret, {
          payment_method_options: {
            upi: {
              preferred_networks: ['google_pay', 'phonepe', 'paytm']
            }
          }
        });

        if (error) {
          console.error('UPI Payment failed:', error);
          alert('Payment failed: ' + error.message);
        } else {
          // Confirm payment
          await axios.post('http://localhost:5000/api/confirm-payment', {
            paymentIntentId: clientSecret.split('_secret_')[0],
            orderId: orderData.orderId
          });
          
          onPaymentSuccess();
          onClose();
        }
      } else {
        // Handle card payment
        const stripe = await stripePromise;
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: {
              // Card details will be collected by Stripe Elements
            }
          }
        });

        if (error) {
          console.error('Card Payment failed:', error);
          alert('Payment failed: ' + error.message);
        } else {
          // Confirm payment
          await axios.post('http://localhost:5000/api/confirm-payment', {
            paymentIntentId: clientSecret.split('_secret_')[0],
            orderId: orderData.orderId
          });
          
          onPaymentSuccess();
          onClose();
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-content" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose}>×</button>
        
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Total Amount: ₹{orderData.totalAmount.toFixed(2)}</p>
        </div>
        
        <div className="payment-methods">
          <h3>Choose Payment Method</h3>
          
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="payment-option-content">
                <span className="payment-icon">💳</span>
                <span>Credit/Debit Card</span>
              </div>
            </label>
            
            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="payment-option-content">
                <span className="payment-icon">📱</span>
                <span>UPI (Google Pay, PhonePe, Paytm)</span>
              </div>
            </label>
          </div>
        </div>
        
        <div className="payment-actions">
          <button 
            className="btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${orderData.totalAmount.toFixed(2)}`}
          </button>
        </div>
        
        <div className="payment-security">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
