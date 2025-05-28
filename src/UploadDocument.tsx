import React, { useState } from 'react';
import './UploadPage.css';

interface DocumentUploadProps {
  title: string;
  validator: (input: string) => boolean;
  fieldName: string;
}

const UploadDocument: React.FC<DocumentUploadProps> = ({ title, validator, fieldName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [saveStatus, setSaveStatus] = useState<'not saved' | 'saved' | 'saving'>('not saved');
  const [errorMessage, setErrorMessage] = useState('');

  const username = localStorage.getItem('username'); // Used as identifier

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFrontImage(e.target.files[0]);
    }
  };

  const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!number || !frontImage || !backImage) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    if (!validator(number)) {
      setErrorMessage(`Invalid ${title} number`);
      return;
    }

    setErrorMessage('');
    setSaveStatus('saving');

    const formData = new FormData();
    formData.append('username', username || '');
    formData.append('fieldName', fieldName);
    formData.append('number', number);
    formData.append('frontImage', frontImage);
    formData.append('backImage', backImage);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/deliveryman/upload-document/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload document');
      }

      setSaveStatus('saved');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'Error uploading document');
    }
  };

  return (
    <div className="document-upload">
      <button className="document-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>

      {isOpen && (
        <div className="document-details">
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label>{title} Number:</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={`Enter ${title} number`}
          />

          <label>Front Image:</label>
          <input type="file" onChange={handleFrontImageChange} />

          <label>Back Image:</label>
          <input type="file" onChange={handleBackImageChange} />

          <button onClick={handleSave} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save'}
          </button>
          {saveStatus === 'saved' && <p className="save-message">Saved!</p>}
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
