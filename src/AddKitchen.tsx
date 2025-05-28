import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import '@mui/x-date-pickers/themeAugmentation';
import '@mui/material/styles';
import './AddKitchen.css';
import Navbar from './navbar.tsx';

interface FormFields {
  cookName: string;
  gender: string;
  address: string;
  landmark: string;
  pincode: string;
  contactNo: string;
  email: string;
  selectedDate: Dayjs | null;
}

const AddKitchen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [cookName, setCookName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [contactNo, setContactNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mealsPrepared, setMealsPrepared] = useState<number>(2);

  const [submissionMessage, setSubmissionMessage] = useState<string>('');
  const [surveyStatus, setSurveyStatus] = useState<string>('');
  const [showSurveyDateRequiredError, setShowSurveyDateRequiredError] = useState<boolean>(false);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setShowSurveyDateRequiredError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let hasEmptyFields = false;
    const fields: FormFields = { cookName, gender, address, landmark, pincode, contactNo, email, selectedDate };
    for (const key in fields) {
      if (!fields[key as keyof FormFields]) { // Type assertion here
        hasEmptyFields = true;
        break;
      }
    }

    if (hasEmptyFields) {
      alert('Please fill in all the details.');
      setShowSurveyDateRequiredError(!selectedDate);
      return;
    }

    const formData = {
      home_maker_name: cookName,
      gender: gender,
      address: address,
      landmark_city_state: `${landmark} / ${pincode}`,
      pincode: pincode,
      contact_no: contactNo,
      email: email,
      no_of_meals_per_day: mealsPrepared,
      survey_date: selectedDate ? selectedDate.format('YYYY-MM-DD') : null,
    };

    try {
      const response = await fetch('http://localhost:8000/api/submit-kitchen-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      

      if (response.ok) {
        const data = await response.json();
        setSubmissionMessage(data.message);
        setSurveyStatus(data.survey_status);
        setShowThankYou(true);

        setCookName('');
        setGender('');
        setAddress('');
        setLandmark('');
        setPincode('');
        setContactNo('');
        setEmail('');
        setMealsPrepared(2);
        setSelectedDate(null);
        setShowSurveyDateRequiredError(false);
      } else {
        const errorData = await response.json();
        setSubmissionMessage(errorData.message || 'Failed to submit details.');
        setShowThankYou(true);
        console.error('Submission error:', errorData);
      }
    } catch (error) {
      setSubmissionMessage('Network error occurred.');
      setShowThankYou(true);
      console.error('Network error:', error);
    }
  };

  return (
    <div className='addkitchen-page'>
      <Navbar />
      <div className="add-kitchen-container">
        <h1 className='title'>ADD KITCHEN DETAILS</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Cook Name */}
          <div className="input-group">
            <label htmlFor="cookName">HOME-MAKER NAME</label>
            <input type="text" id="cookName" value={cookName} onChange={(e) => setCookName(e.target.value)} required className='input-field' />
          </div>

          {/* Gender */}
          <div className="input-group">
            <label>GENDER</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} required /> MALE
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} required /> FEMALE
              </label>
              <label>
                <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={() => setGender('Other')} required /> OTHER
              </label>
            </div>
          </div>

          {/* Address */}
          <div className="input-group">
            <label htmlFor="address">ADDRESS</label>
            <input type="text" id="address" placeholder="House number/Street name" value={address} onChange={(e) => setAddress(e.target.value)} required className='input-field' /><br/>
            <input type="text" placeholder="Landmark/City/state" value={landmark} onChange={(e) => setLandmark(e.target.value)} required className='input-field' /><br></br>
            <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required className='input-field' />
          </div>

          {/* Contact Number */}
          <div className="input-group">
            <label htmlFor="contactNo">CONTACT No.</label>
            <div className="contact-input">
              <span>+91</span>
              <input type="text" id="contactNo" maxLength={10} value={contactNo} onChange={(e) => setContactNo(e.target.value)} required className='input-field' />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required className='input-field' />
          </div>

          {/* Meals Prepared */}
          <div className="input-group">
            <label htmlFor="mealsPrepared">No. OF MEALS CAN BE PREPARED IN A DAY</label>
            <div className="meals-input">
              <input type="number" id="mealsPrepared" min={2} value={mealsPrepared} onChange={(e) => setMealsPrepared(parseInt(e.target.value))} required className='input-field' />
            </div>
          </div>

          {/* Survey Date */}
          <div className="input-group">
            <label htmlFor="surveyDate">SELECT DATE FOR SURVEY</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className='date-picker'
                label="Survey Date"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            {showSurveyDateRequiredError && <p className="error-message">Survey Date is required</p>}
          </div>

          {/* Submit Button */}
          <button className="submit-button" type="submit">SUBMIT</button>

        </form>

        {showThankYou && (
          <div className="thank-you-message">
            {submissionMessage}
            {surveyStatus && <p>Survey Status: {surveyStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddKitchen;