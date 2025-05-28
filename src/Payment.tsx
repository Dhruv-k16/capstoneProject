import React, { useState } from 'react';
import './Payment.css';
import Navbar from './navbar.tsx';

interface PaymentProps {
  totalPrice: number;
  userRole?: string | null;
  isLoggedIn?: boolean;
}

const Payment: React.FC<PaymentProps> = ({ totalPrice, userRole, isLoggedIn }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [upiId, setUpiId] = useState<string>('');
  const [showUpiInput, setShowUpiInput] = useState<boolean>(false);

  const handlePaymentClick = (payment: string) => {
    setSelectedPayment(payment);
    setShowUpiInput(payment === 'UPI');
  };

  const handlePay = () => {
    if (selectedPayment === 'Cash on Delivery') {
      alert(`Order confirmed. Total amount to be paid: Rs. ${totalPrice}`);
    } else if (selectedPayment === 'UPI') {
      if (upiId) {
        alert(`Order confirmed. Total amount paid: Rs. ${totalPrice}`);
      } else {
        alert('Please enter your UPI ID.');
      }
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="payment-page">
      <Navbar />
      <div className="payment-container">
        <div className="payment-method">
          <h1>PAYMENT METHOD</h1>
          <button
            className={`payment-option ${selectedPayment === 'Cash on Delivery' ? 'selected' : ''}`}
            onClick={() => handlePaymentClick('Cash on Delivery')}
          >
            CASH ON DELIVERY
            <span className="arrow">
              <img src="./images/icons/arrow.png" alt="arrow" />
            </span>
          </button>
          <button
            className={`payment-option ${selectedPayment === 'UPI' ? 'selected' : ''}`}
            onClick={() => handlePaymentClick('UPI')}
          >
            UPI
            <span className="arrow">
              <img src="./images/icons/arrow.png" alt="arrow" />
            </span>
          </button>
          {showUpiInput && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="upi-input"
            />
          )}
        </div>
        <div className="total-price">Total to be paid: Rs. {totalPrice}</div>
        <button className="pay-button" onClick={handlePay}>PAY</button>
      </div>
    </div>
  );
};

export default Payment;