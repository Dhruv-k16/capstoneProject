import React, { useState } from 'react';
import './UpdateDetails.css';
import Navbar from './navbar.tsx';

interface UpdateDetailsProps {
  userRole?: string | null;
  isLoggedIn?: boolean;
}

const UpdateDetails: React.FC<UpdateDetailsProps> = ({ userRole, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleUpdate = () => {
    // Implement your update details logic here
    console.log('Updating details:', { email, contact, userRole, isLoggedIn });
    // You might want to send this data to an API or update your state
  };

  return (
    <div className="update-details-page">
      <Navbar />
      <div className="update-details-container">
        <h1>UPDATE DETAILS</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button className="update-button" onClick={handleUpdate}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UpdateDetails;