import React, { useState } from 'react';
import './EmergencyDetails.css'; // Create this CSS file

interface EmergencyDetailsProps {
  // Add any props if needed
}

const EmergencyDetails: React.FC<EmergencyDetailsProps> = () => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [saveStatus, setSaveStatus] = useState<'not saved' | 'saved' | 'saving'>('not saved');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => {
    if (!contactName || !contactNumber) {
      setErrorMessage('Please enter both contact name and number.');
      return;
    }

    setErrorMessage('');
    setSaveStatus('saving');

    // Simulate API call (replace with your actual API call)
    setTimeout(() => {
      console.log('Emergency Details:', { contactName, contactNumber });
      setSaveStatus('saved');
    }, 1000);
  };

  return (
    <div className="emergency-details-container">
      <h2 className="emergency-details-title">EMERGENCY DETAILS</h2>

      <div className="emergency-details-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>Contact Name:</label>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />

        <label>Contact Number:</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <button onClick={handleSave} disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save'}
        </button>
        {saveStatus === 'saved' && <p className="save-message">Saved!</p>}
      </div>
    </div>
  );

  return (
    <div className="emergency-details-container">
      <h2 className="emergency-details-title">EMERGENCY DETAILS</h2>

      <div className="emergency-details-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>Contact Name:</label>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />

        <label>Contact Number:</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <button onClick={handleSave} disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save'}
        </button>
        {saveStatus === 'saved' && <p className="save-message">Saved!</p>}
      </div>
    </div>
  );
};

export default EmergencyDetails;