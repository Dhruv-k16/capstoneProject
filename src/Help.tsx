import React from 'react';
import './Help.css';
import Navbar from './navbar.tsx';
const Help: React.FC = () => {
  return (
    <div className='page'>
      <Navbar />
      <div className="help-container">
        <div className="help-content">
          <div className="support-section">
            <div className="support-title"><u>SUPPORT</u></div>
            <ul style={{ listStyleType: 'square' }}>
              <li>Contacting our support team</li>
              <li>Email support options</li>
              <li>Reporting a technical issue</li>
              <p>
                If you have any questions or need help with your account,
                please contact our support team. 
                Youcan reach us by email at 
                <a href="LunchWala@gmail.com"><u>LunchWala@gmail.com</u></a> support
              </p>
            </ul>
          </div>
          <div className="help-section">
            <div className="help-title"><u>HELP</u></div>
            <ul style={{ listStyleType: 'square' }}>
              <li>How to sign up and create an account</li>
              <li>How to log in and reset your password</li>
              <li>Updating profile details</li>
              <li>Adding items to your cart</li>
              <li>Tracking your order in real-time</li>
              <li>How to add/remove payment options</li>
              <li>Understanding service charges and taxes</li>
              <li>How to request a refund for canceled/incorrect orders</li>
              <li>Reporting missing or incorrect items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;