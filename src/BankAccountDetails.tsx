import React, { useState } from 'react';
import './BankAccountDetails.css'; // Create this CSS file

interface BankAccountDetailsProps {
// Add any props if needed
}

const BankAccountDetails: React.FC<BankAccountDetailsProps> = () => {
const [accountNumber, setAccountNumber] = useState('');
const [ifscCode, setIfscCode] = useState('');
const [saveStatus, setSaveStatus] = useState<'not saved' | 'saved' | 'saving'>('not saved');
const [errorMessage, setErrorMessage] = useState('');

const handleSave = () => {
if (!accountNumber || !ifscCode) {
setErrorMessage('Please enter both account number and IFSC code.');
return;
}

setErrorMessage('');
setSaveStatus('saving');

// Simulate API call (replace with your actual API call)
setTimeout(() => {
  console.log('Bank Account Details:', { accountNumber, ifscCode });
  setSaveStatus('saved');
}, 1000);


};

return ( <div className="bank-account-details-container"> <h2 className="bank-account-title">BANK ACCOUNT DETAILS</h2>

<div className="bank-account-form">
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <label>Account Number:</label>
    <input
      type="text"
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
    />

    <label>IFSC Code:</label>
    <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />

    <button onClick={handleSave} disabled={saveStatus === 'saving'}>
      {saveStatus === 'saving' ? 'Saving...' : 'Save'}
    </button>
    {saveStatus === 'saved' && <p className="save-message">Saved!</p>}
  </div>
</div>


);
};

export default BankAccountDetails;
