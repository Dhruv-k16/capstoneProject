import React, { useState } from 'react';
import './VehicleDetails.css'; // Import the CSS file

interface VehicleDetailsProps {
// Add any props if needed
}

const VehicleDetails: React.FC<VehicleDetailsProps> = () => {
const [registrationOpen, setRegistrationOpen] = useState(false);
const [registrationNumber, setRegistrationNumber] = useState('');
const [registrationSaveStatus, setRegistrationSaveStatus] = useState<'not saved' | 'saved' | 'saving'>('not saved');
const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

const [photoOpen, setPhotoOpen] = useState(false);
const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
const [photoSaveStatus, setPhotoSaveStatus] = useState<'not saved' | 'saved' | 'saving'>('not saved');
const [photoErrorMessage, setPhotoErrorMessage] = useState('');

const handleRegistrationSave = () => {
if (!registrationNumber) {
setRegistrationErrorMessage('Please enter the registration number.');
return;
}

setRegistrationErrorMessage('');
setRegistrationSaveStatus('saving');

// Simulate API call (replace with your actual API call)
setTimeout(() => {
  console.log('Vehicle Registration Number:', registrationNumber);
  setRegistrationSaveStatus('saved');
}, 1000);


};

const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files[0]) {
setVehiclePhoto(e.target.files[0]);
}
};

const handlePhotoSave = () => {
if (!vehiclePhoto) {
setPhotoErrorMessage('Please upload a vehicle photograph.');
return;
}

setPhotoErrorMessage('');
setPhotoSaveStatus('saving');

// Simulate API call (replace with your actual API call)
setTimeout(() => {
  console.log('Vehicle Photograph:', vehiclePhoto);
  setPhotoSaveStatus('saved');
}, 1000);


};

return ( <div className="vehicle-details-container"> <h2 className="vehicle-title">VEHICLE DETAILS</h2>

<div className="vehicle-option">
    <button className="vehicle-option-title" onClick={() => setRegistrationOpen(!registrationOpen)}>
      VEHICLE REGISTRATION
      <span className="arrow-icon">&gt;</span>
    </button>

    {registrationOpen && (
      <div className="vehicle-option-details">
        {registrationErrorMessage && <p className="error-message">{registrationErrorMessage}</p>}
        <label>Registration Number:</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

        <button onClick={handleRegistrationSave} disabled={registrationSaveStatus === 'saving'}>
          {registrationSaveStatus === 'saving' ? 'Saving...' : 'Save'}
        </button>
        {registrationSaveStatus === 'saved' && <p className="save-message">Saved!</p>}
      </div>
    )}
  </div>

  <div className="vehicle-option">
    <button className="vehicle-option-title" onClick={() => setPhotoOpen(!photoOpen)}>
      VEHICLE PHOTOGRAPH
      <span className="arrow-icon">&gt;</span>
    </button>

    {photoOpen && (
      <div className="vehicle-option-details">
        {photoErrorMessage && <p className="error-message">{photoErrorMessage}</p>}
        <label>Vehicle Photograph:</label>
        <input type="file" onChange={handlePhotoChange} />

        <button onClick={handlePhotoSave} disabled={photoSaveStatus === 'saving'}>
          {photoSaveStatus === 'saving' ? 'Saving...' : 'Save'}
        </button>
        {photoSaveStatus === 'saved' && <p className="save-message">Saved!</p>}
      </div>
    )}
  </div>
</div>


);
};

export default VehicleDetails;