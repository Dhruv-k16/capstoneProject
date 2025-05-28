import React, { useState } from 'react';
import './ChangePassword.css';
import Navbar from './navbar.tsx';

interface ChangePasswordProps {
  userRole?: string | null;
  isLoggedIn?: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ userRole, isLoggedIn }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    // Implement your change password logic here
    console.log('Changing password:', { currentPassword, newPassword, confirmNewPassword, userRole, isLoggedIn });
    // You might want to send this data to an API or update your state
  };

  return (
    <div className="change-password-page">
      <Navbar />
      <div className="change-password-container">
        <h1>Change Password</h1>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Re-enter new password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <p className="forgot-password">Forgot password ?</p>
        <button className="change-button" onClick={handleChangePassword}>
          Change
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;