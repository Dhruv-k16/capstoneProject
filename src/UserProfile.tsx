import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Navbar from './navbar.tsx';
import { useLocation } from 'react-router-dom';

interface Address {
  street: string;
  city: string;
  stateProvince: string;
  phone: string;
  zipCode: string;
  inUse?: boolean;
}

interface UserProfileProps {
  userRole?: string | null;
  isLoggedIn?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userRole, isLoggedIn }) => {
  const location = useLocation();
  const initialSection = location.state?.section || 'change-address';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const username = localStorage.getItem('username');
  const apiRole = userRole === 'deliveryman' ? 'deliveryman' : 'customer';

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/${apiRole}/${username}/addresses/`);
        const data = await res.json();
        setAddresses(data.addresses || []);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      }
    };

    if (username) {
      fetchAddresses();
    }
  }, [username, apiRole]);

  const handleUseThis = (index: number) => {
    setAddresses((prev) => {
      const updated = prev.map((a, i) => ({ ...a, inUse: i === index }));
      const selected = updated.splice(index, 1)[0];
      updated.unshift(selected);
      return updated;
    });
  };

  const handleAddAddress = async () => {
    if (!addressLine1 || !addressLine2 || !zipCode || !contactNumber) {
      setErrorMessage('Please fill in all fields');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const [city, stateProvince] = addressLine2.split(',').map(s => s.trim());
    const newAddress = {
      street: addressLine1,
      city: city || '',
      stateProvince: stateProvince || '',
      phone: contactNumber,
      zipCode,
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${apiRole}/${username}/addresses/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: newAddress }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Backend error:', data);
        throw new Error(data?.error || 'Failed to add address');
      }

      setAddresses(data.addresses || []);
      setSuccessMessage('Address added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);

      setAddressLine1('');
      setAddressLine2('');
      setZipCode('');
      setContactNumber('');
    } catch (err: any) {
      console.error('Error adding address:', err);
      setErrorMessage(err.message || 'Something went wrong');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDeleteAddress = async (index: number) => {
    const addressToDelete = addresses[index];

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${apiRole}/${username}/delete-address/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: addressToDelete }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete address');
      }

      setAddresses(data.addresses);
    } catch (err: any) {
      console.error('Error deleting address:', err.message);
      alert(err.message || 'Error occurred while deleting address');
    }
  };

  const getPageContent = () => {
    switch (activeSection) {
      case 'change-address':
        return (
          <div className="user-profile-content">
            <h1 className="tag">Change Address</h1>
            {addresses.length === 0 ? (
              <p className="no-address-msg">No address found! Add an address.</p>
            ) : (
              <div className="addresses">
                {addresses.map((address, index) => (
                  <div key={index} className="address-card">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.stateProvince}</p>
                    <p>Phone: {address.phone}</p>
                    <p>Zip code: {address.zipCode}</p>
                    {address.inUse ? (
                      <div className="in-use">in use</div>
                    ) : (
                      <button className="use-this-button" onClick={() => handleUseThis(index)}>
                        use this
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'add-new-address':
        return (
          <div className="user-profile-content">
            <h1 className="tag">Add Address</h1>
            {successMessage && <p className="success-msg">{successMessage}</p>}
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
            <div className="add-address-form">
              <div className="form-group">
                <label>ADDRESS</label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City, State"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="+91"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <button className="add-button" onClick={handleAddAddress}>
                ADD
              </button>
            </div>
          </div>
        );
      case 'delete-address':
        return (
          <div className="user-profile-content">
            <h1 className="tag">Delete Address</h1>
            {addresses.length === 0 ? (
              <p className="no-address-msg">No address found! Add an address.</p>
            ) : (
              <div className="addresses">
                {addresses.map((address, index) => (
                  <div key={index} className="address-card">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.stateProvince}</p>
                    <p>Phone: {address.phone}</p>
                    <p>Zip code: {address.zipCode}</p>
                    <button className="remove-button" onClick={() => handleDeleteAddress(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="user-profile-content">
            <h1>User Profile</h1>
            <p>Select an option from the menu.</p>
          </div>
        );
    }
  };

  return (
    <div className="user-profile">
      <Navbar />
      <div className="user-profile-content-wrapper">
        <div className="user-profile-sidebar">
          <button onClick={() => setActiveSection('change-address')}>Change Address</button>
          <button onClick={() => setActiveSection('add-new-address')}>Add New Address</button>
          <button onClick={() => setActiveSection('delete-address')}>Delete Address</button>
        </div>
        {getPageContent()}
      </div>
    </div>
  );
};

export default UserProfile;
