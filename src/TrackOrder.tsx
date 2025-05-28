// TrackOrder.tsx
import React from 'react';
import './TrackOrder.css';
import Navbar from './navbar.tsx';

interface TrackOrderProps {
  orderId: number;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ orderId }) => {
  return (
    <div className="track-order-page">
      <Navbar />
      <div className="track-details">
        <div className="delivery-info">
          <img src="/public/images/delivery.jpeg" alt="Delivery" className="delivery-icon" />
          <p>Delivery agent: AABC</p>
          <p>Contact no.: XXXXXXXXXX</p>
          <p>Your meal will be at your place in __ time</p>
        </div>
        <div className="order-status">
          <p className="status-label">ORDER STATUS</p>
          <div className="status-item preparing">Preparing Meal</div>
          <div className="status-item packing">Packing the Meal</div>
          <div className="status-item delivery">Out for Delivery</div>
        </div>
      </div>
      <div className="track-order-container">
        <div className="order-summary">
          <h1>Order Summary</h1>
          <p>HOMEMAKER:</p>
          <p>Meal: panner, jeera rice, Ghee roti, daal fry</p>
          <p>Rs. 100</p>
          <p>Others: Rs. 10</p>
          <p>Total: Rs. 110</p>
          <p>12/10/2025</p>
        </div>
        <div className="map-container">
          <img src="./images/map.png" alt="Map" className="map-image" />
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;