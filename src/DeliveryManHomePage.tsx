import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryManHomePage.css';

interface DeliveryManHomePageProps {
  deliveryManName: string | null;
}

const DeliveryManHomePage: React.FC<DeliveryManHomePageProps> = ({ deliveryManName }) => {
  const navigate = useNavigate();
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = (uploadType: string) => {
    navigate('/upload', { state: { section: uploadType } });
  };

  const handleAddressOptionClick = (section: string) => {
    setIsAddressDropdownOpen(false); // close dropdown
    navigate('/DeliveryProfile', {
      state: { section },
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsAddressDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="delivery-man-page">
      <div className="del-top-panel">
        <button className="delivery-man-button">
          <img src="./images/icons/user.png" alt="Delivery Man Icon" className="button-icon" />
          Delivery Man: {deliveryManName || "Delivery Man"}
        </button>
        <div className='options-panel'>
          <button className="view-order-button">VIEW ORDER</button>
          <button className="income-button">INCOME</button>
        </div>
        
        <div className="address-dropdown-wrapper" ref={dropdownRef}>
          <button className="address-button" onClick={() => setIsAddressDropdownOpen(prev => !prev)}>
            <img src="./images/icons/location.png" alt="Address Icon" className="button-icon" />
            ADDRESS
          </button>
          {isAddressDropdownOpen && (
            <div className="address-dropdown">
              <button onClick={() => handleAddressOptionClick('add-new-address')}>
                Add New Address
              </button>
              <button onClick={() => handleAddressOptionClick('change-address')}>
                Change Address
              </button>
              <button onClick={() => handleAddressOptionClick('delete-address')}>
                Delete Address
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="upload-section">
        <h2 className="upload-title">UPLOAD DOCUMENTS</h2>
        <div className="upload-options">
          <button className="upload-option" onClick={() => handleUploadClick('personal')}>
            PERSONAL DOCUMENTS <span className="arrow-icon">&gt;</span>
          </button>
          <button className="upload-option" onClick={() => handleUploadClick('vehicle')}>
            VEHICLE DETAILS <span className="arrow-icon">&gt;</span>
          </button>
          <button className="upload-option" onClick={() => handleUploadClick('bank')}>
            BANK ACCOUNT DETAILS <span className="arrow-icon">&gt;</span>
          </button>
          <button className="upload-option" onClick={() => handleUploadClick('emergency')}>
            EMERGENCY DETAILS <span className="arrow-icon">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManHomePage;
