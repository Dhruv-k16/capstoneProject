import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './UploadPage.css';

import VehicleDetails from './VehicleDetails.tsx';
import BankAccountDetails from './BankAccountDetails.tsx';
import EmergencyDetails from './EmergencyDetails.tsx';

import UploadDocument from './UploadDocument.tsx';
import {
  isValidAadhaar,
  isValidPAN,
  isValidLicense
} from './validators.ts';

const UploadPage: React.FC = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState<string>('personal');

  useEffect(() => {
    if (location.state?.section) {
      setCurrentSection(location.state.section);
    }
  }, [location.state]);

  const renderSection = () => {
    switch (currentSection) {
      case 'personal':
        return (
          <>
            <UploadDocument title="AADHAR CARD" validator={isValidAadhaar} fieldName="aadhaarCard" />
            <UploadDocument title="PAN CARD" validator={isValidPAN} fieldName="panCard" />
            <UploadDocument title="DRIVING LICENSE" validator={isValidLicense} fieldName="drivingLicense" />
          </>
        );
      case 'vehicle':
        return <VehicleDetails />;
      case 'bank':
        return <BankAccountDetails />;
      case 'emergency':
        return <EmergencyDetails />;
      default:
        return (
          <>
            <UploadDocument title="AADHAR CARD" validator={isValidAadhaar} fieldName="aadhaarCard" />
            <UploadDocument title="PAN CARD" validator={isValidPAN} fieldName="panCard" />
            <UploadDocument title="DRIVING LICENSE" validator={isValidLicense} fieldName="drivingLicense" />
          </>
        );
    }
  };

  return (
    <div className="upload-page-container">
      <h2 className="title-upload">UPLOAD DOCUMENTS</h2>
      <div className="upload-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default UploadPage;
