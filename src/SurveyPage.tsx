import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './SurveyPage.css';

interface Survey {
    _id: string | {$oid : string};
    id?: string;
    home_maker_name: string;
    gender: string;
    contact_no: string;
    email: string;
    address: string;
    landmark_city_state?: string;
    pincode?: string;
    no_of_meals_per_day?: number;
    survey_status: 'Pending' | 'Approved' | 'Rejected' | undefined;
    surveyDetails?: {
        doneBy: string;
        hygiene: number;
        kitchenImages: string[];
        foodTaste: number;
        foodImages: string[];
        maxMeals: number;
        mealType: 'Veg Only' | 'Non-Veg Only' | 'Both';
        approvedDate?: string;
    };
}

interface Homemaker {
    home_maker_name: string;
    gender: string;
    contact_no: string;
    email: string;
    address: string;
    landmark_city_state?: string;
    pincode?: string;
    no_of_meals_per_day?: number;
    password?: string;
    survey_status: 'Approved';
}

const SurveyPage = () => {
const [surveys, setSurveys] = useState<Survey[]>([]);
const [filterStatus, setFilterStatus] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All');
const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>([]);
const [expandedSurveyId, setExpandedSurveyId] = useState<string | null>(null);
const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // For the main filter dropdown
const [currentSurveyForApproval, setCurrentSurveyForApproval] = useState<Survey | null>(null);
const [isApprovalFormOpen, setIsApprovalFormOpen] = useState(false);
const [approvalFormData, setApprovalFormData] = useState({
    doneBy: '',
    hygiene: 3,
    kitchenImages: [] as (File | string)[], // Allow both File and string
    foodTaste: 3,
    foodImages: [] as (File | string)[], // Allow both File and string
    maxMeals: 50,
    mealType: 'Both' as 'Veg Only' | 'Non-Veg Only' | 'Both',
    landmark_city_state: '',
    pincode: '',
    no_of_meals_per_day: 0,
});
const [approvalSuccessMessage, setApprovalSuccessMessage] = useState<string | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchSurveys = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/survey/');
            if (!response.ok) {
            throw new Error(`Failed to fetch surveys: ${response.status}`);
            }
            const data: Survey[] = await response.json();
            setSurveys(data);
            setFilteredSurveys(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchSurveys();
}, []);

useEffect(() => {
    let filtered = surveys;
    if (filterStatus !== 'All') {
        filtered = surveys.filter(survey => survey.survey_status === filterStatus);
    }
    setFilteredSurveys(filtered);
}, [filterStatus, surveys]);

const toggleSurveyDetails = (surveyId: string) => {
    console.log("🔍 Toggling survey with ID:", surveyId);
    setExpandedSurveyId(prevId => (prevId === surveyId ? null : surveyId));
    const foundSurvey = surveys.find(s => {
        const id = s._id as string;
        return id === surveyId;
    });

    if(!foundSurvey){
        console.error("No survey found for ID :",surveyId);
        return;
    }
    setCurrentSurveyForApproval(foundSurvey);
    setIsApprovalFormOpen(foundSurvey.survey_status === 'Pending')
  
    if (foundSurvey.survey_status === 'Pending') {
        setApprovalFormData({
          doneBy: foundSurvey.surveyDetails?.doneBy || '',
          hygiene: foundSurvey.surveyDetails?.hygiene || 3,
          kitchenImages: foundSurvey.surveyDetails?.kitchenImages || [],
          foodTaste: foundSurvey.surveyDetails?.foodTaste || 3,
          foodImages: foundSurvey.surveyDetails?.foodImages || [],
          maxMeals: foundSurvey.surveyDetails?.maxMeals || 50,
          mealType: foundSurvey.surveyDetails?.mealType || 'Both',
          landmark_city_state: foundSurvey.landmark_city_state || '',
          pincode: foundSurvey.pincode || '',
          no_of_meals_per_day: foundSurvey.no_of_meals_per_day || 0,
        });
    }
};
  

const toggleFilterDropdown = () => {
    setDropdownOpen(prev => !prev);
};

const handleFilterChange = (status: 'All' | 'Approved' | 'Pending' | 'Rejected') => {
    setFilterStatus(status);
    setDropdownOpen(false);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    if (name === 'no_of_meals_per_day') {
        parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
    }
    setApprovalFormData(prevData => ({ ...prevData, [name]: parsedValue }));
};

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'kitchenImages' | 'foodImages') => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        setApprovalFormData(prevData => ({
            ...prevData,
            [fieldName]: [...prevData[fieldName], ...files], // Append new files
        }));
    }
};

  
const handleApproveAndSave = async () => {
    try {
      console.log("📥 Inside handleApproveAndSave", currentSurveyForApproval);
  
      if (!currentSurveyForApproval) {
        setError("❌ No current survey selected");
        return;
      }
  
      const surveyId = currentSurveyForApproval._id as string;
      if (!surveyId) {
        setError("❌ Survey ID is missing or invalid");
        return;
      }
  
      setLoading(true);
      setError(null);
  
      // ✅ Convert files to base64
      const convertImagesToBase64 = async (files: (File | string)[]) => {
        const promises = files.map(file =>
          file instanceof File
            ? new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
            : Promise.resolve(file)
        );
        return Promise.all(promises);
      };
  
      const kitchenImageUrls = await convertImagesToBase64(approvalFormData.kitchenImages);
      const foodImageUrls = await convertImagesToBase64(approvalFormData.foodImages);
  
      // ✅ Survey Update Payload
      const formData = {
        doneBy: approvalFormData.doneBy,
        hygiene: approvalFormData.hygiene,
        kitchenImages: kitchenImageUrls,
        foodTaste: approvalFormData.foodTaste,
        foodImages: foodImageUrls,
        maxMeals: approvalFormData.maxMeals,
        mealType: approvalFormData.mealType,
        landmark_city_state: approvalFormData.landmark_city_state,
        pincode: approvalFormData.pincode,
        no_of_meals_per_day: approvalFormData.no_of_meals_per_day,
        survey_status: 'Approved',
      };
  
      console.log("📦 Updating Survey:", formData);
  
      const updateRes = await fetch(`http://localhost:8000/api/survey/update/${surveyId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const updateResBody = await updateRes.json();
  
      if (!updateRes.ok) {
        throw new Error(updateResBody?.error || "Survey update failed");
      }
  
      console.log("✅ Survey updated:", updateResBody);
  
      // ✅ Homemaker Payload
      const homemakerPayload = {
        home_maker_name: currentSurveyForApproval.home_maker_name,
        gender: currentSurveyForApproval.gender,
        contact_no: currentSurveyForApproval.contact_no,
        email: currentSurveyForApproval.email,
        address: currentSurveyForApproval.address,
        landmark_city_state: currentSurveyForApproval.landmark_city_state,
        pincode: currentSurveyForApproval.pincode,
        no_of_meals_per_day: currentSurveyForApproval.no_of_meals_per_day,
        survey_status: 'Approved',
        password: 'PassHome@123',
        username: currentSurveyForApproval.email, // ✅ ensure unique username field
      };
  
      console.log("📦 Creating Homemaker:", homemakerPayload);
  
      const homemakerRes = await fetch('http://localhost:8000/api/homemaker/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homemakerPayload),
      });
  
      const homemakerText = await homemakerRes.text();
      let homemakerJson;
  
      try {
        homemakerJson = JSON.parse(homemakerText);
      } catch (parseError) {
        throw new Error('Server did not return valid JSON:\n' + homemakerText);
      }
  
      if (!homemakerRes.ok) {
        throw new Error(homemakerJson?.error || "Failed to create homemaker");
      }
  
      console.log("✅ Homemaker created:", homemakerJson);
  
      // ✅ Final Success Notification
      setApprovalSuccessMessage("🎉 Survey approved & homemaker added successfully!");
      setTimeout(() => setApprovalSuccessMessage(null), 3000);
  
      // ✅ Optionally reset or close form
      setIsApprovalFormOpen(false);
    } catch (err: any) {
      console.error("❌ Error during approval flow:", err.message);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  
  

const handleRejectAndSave = async () => {
    if (!currentSurveyForApproval) return;

    setLoading(true);
    setError(null);
    
    try {
        const response = await fetch(`http://localhost:8000/api/survey/update/${currentSurveyForApproval.id}/`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ survey_status: 'Rejected' }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to reject survey: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
        const updatedSurvey: Survey = await response.json();

        setSurveys(prevSurveys =>
        prevSurveys.map(survey =>
        survey.id === currentSurveyForApproval.id ? { ...updatedSurvey, survey_status: 'Rejected' } : survey
        )
        );
        setFilteredSurveys(prevFiltered =>
        prevFiltered.map(survey =>
        survey.id === currentSurveyForApproval.id ? { ...updatedSurvey, survey_status: 'Rejected' } : survey
        )
        );

        setIsApprovalFormOpen(false);
        setApprovalSuccessMessage('Survey Rejected Successfully!');
        setTimeout(() => setApprovalSuccessMessage(null), 3000);

    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

const handleSave = async () => {
    if (!currentSurveyForApproval) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('doneBy', approvalFormData.doneBy);
    formData.append('hygiene', approvalFormData.hygiene.toString());
    formData.append('foodTaste', approvalFormData.foodTaste.toString());
    formData.append('maxMeals', approvalFormData.maxMeals.toString());
    formData.append('mealType', approvalFormData.mealType);
    formData.append('landmark_city_state', approvalFormData.landmark_city_state);
    formData.append('pincode', approvalFormData.pincode);
    formData.append('no_of_meals_per_day', approvalFormData.no_of_meals_per_day.toString());

    // Declare sendData here to avoid the "used before declaration" error
    const sendData = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/survey/update/${currentSurveyForApproval.id}/`, {
        method: 'PUT',
        body: formData,
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update survey: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
        const updatedSurvey: Survey = await response.json();

        setSurveys(prevSurveys =>
        prevSurveys.map(survey =>
        survey.id === currentSurveyForApproval.id
        ? {
        ...updatedSurvey, surveyDetails: {
        doneBy: updatedSurvey.surveyDetails?.doneBy || '',
        hygiene: updatedSurvey.surveyDetails?.hygiene || 0,
        kitchenImages: kitchenImageUrls,
        foodTaste: updatedSurvey.surveyDetails?.foodTaste || 0,
        foodImages: foodImageUrls,
        maxMeals: updatedSurvey.surveyDetails?.maxMeals || 0,
        mealType: updatedSurvey.surveyDetails?.mealType || 'Both',
        approvedDate: updatedSurvey.surveyDetails?.approvedDate || new Date().toISOString(),
        }
        }
        : survey
        )
        );
        setFilteredSurveys(prevFiltered =>
        prevFiltered.map(survey =>
        survey.id === currentSurveyForApproval.id
        ? {
        ...updatedSurvey, surveyDetails: {
        doneBy: updatedSurvey.surveyDetails?.doneBy || '',
        hygiene: updatedSurvey.surveyDetails?.hygiene || 0,
        kitchenImages: kitchenImageUrls,
        foodTaste: updatedSurvey.surveyDetails?.foodTaste || 0,
        foodImages: foodImageUrls,
        maxMeals: updatedSurvey.surveyDetails?.maxMeals || 0,
        mealType: updatedSurvey.surveyDetails?.mealType || 'Both',
        approvedDate: updatedSurvey.surveyDetails?.approvedDate || new Date().toISOString(),
        }
        }
        : survey
        )
        );

        setIsApprovalFormOpen(false);
        setApprovalSuccessMessage('Survey Data Saved!');
        setTimeout(() => setApprovalSuccessMessage(null), 3000);
    } catch (error: any) {
    setError(error.message);
    } finally {
    setLoading(false);
    }
    }

    // Handle kitchenImages and foodImages - ensure URLs, not files
    const kitchenImageUrls: string[] = [];
    for (const file of approvalFormData.kitchenImages) {
    if (file instanceof File) {
    // convert file to URL. This assumes you want to upload separately.
    // If you want to send the file directly, you'd handle this differently (outside this function, likely).
    const reader = new FileReader();
    reader.onload = () => {
    kitchenImageUrls.push(reader.result as string);
    if (kitchenImageUrls.length + approvalFormData.kitchenImages.filter(f => !(f instanceof File)).length === approvalFormData.kitchenImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    };
    reader.readAsDataURL(file); // Start reading the file
    }
    else if (typeof file === 'string') {
    kitchenImageUrls.push(file)
    if (kitchenImageUrls.length + approvalFormData.kitchenImages.filter(f => !(f instanceof File)).length === approvalFormData.kitchenImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    }
    else {
    //Its already a string
    kitchenImageUrls.push(file);
    if (kitchenImageUrls.length + approvalFormData.kitchenImages.filter(f => !(f instanceof File)).length === approvalFormData.kitchenImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    }
    }
    const foodImageUrls: string[] = [];
    for (const file of approvalFormData.foodImages) {
    if (file instanceof File) {
    // convert file to URL.
    const reader = new FileReader();
    reader.onload = () => {
    foodImageUrls.push(reader.result as string);
    if (foodImageUrls.length + approvalFormData.foodImages.filter(f => !(f instanceof File)).length === approvalFormData.foodImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    };
    reader.readAsDataURL(file); // Start reading the file
    }
    else if (typeof file === 'string') {
    foodImageUrls.push(file);
    if (foodImageUrls.length + approvalFormData.foodImages.filter(f => !(f instanceof File)).length === approvalFormData.foodImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    }
    else {
    foodImageUrls.push(file);
    if (foodImageUrls.length + approvalFormData.foodImages.filter(f => !(f instanceof File)).length === approvalFormData.foodImages.length) {
    // Call the next part of the process here, after all images are ready
    sendData();
    }
    }
    }

    if (approvalFormData.kitchenImages.length === 0 && approvalFormData.foodImages.length === 0) {
    sendData();
    }
};

if (loading) {
return <div className="loading-indicator">Loading Surveys...</div>;
}

if (error) {
return <div className="error-message">Error: {error}</div>;
}

return (
<div className="survey-page">
<div className="top-panel-survey">
<div className="survey-select-wrapper">
<button className="survey-select-button" onClick={toggleFilterDropdown}>
{filterStatus}
<ChevronDown className="w-4 h-4" />
</button>
{dropdownOpen && (
<div className="survey-select-content">
<div className="survey-select-item" onClick={() => handleFilterChange('All')}>
All
</div>
<div className="survey-select-item" onClick={() => handleFilterChange('Approved')}>
Approved
</div>
<div className="survey-select-item" onClick={() => handleFilterChange('Pending')}>
Pending
</div>
<div className="survey-select-item" onClick={() => handleFilterChange('Rejected')}>
Rejected
</div>
</div>
)}
</div>
<h1 className="survey">
<u>SURVEYS</u>
</h1>
</div>

<div className="middle-panel-survey">
{filteredSurveys.map((survey) => {
    const surveyId = survey._id as string;

    if(!surveyId){
        console.error("Survey id is missing or invalid",survey);
        return null;
    }

    return( 
        <div key={surveyId} className="survey-card-wrapper mb-4">
                <div
                className={`survey-card ${expandedSurveyId === surveyId ? 'expanded' : ''}`}
                onClick={() => toggleSurveyDetails(surveyId)}
                >
                    <div className="survey-info">
                        <span className="info-label">Home-maker:</span> {survey.home_maker_name}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Gender:</span> {survey.gender}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Contact:</span> {survey.contact_no}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Email:</span> {survey.email}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Address:</span> {survey.address}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Landmark/City/State:</span>{survey.landmark_city_state}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">Pincode:</span> {survey.pincode}
                    </div>
                    <div className="survey-info">
                        <span className="info-label">No. of Meals/Day:</span> {survey.no_of_meals_per_day}
                    </div>
                    <button className={`status-button ${survey.survey_status?.toLowerCase() || ''}`}>
                        {survey.survey_status || 'Unknown'}
                    </button>
                    <div className="expand-icon">
                        <ChevronDown className="w-5 h-5" />
                    </div>
            </div>
            {expandedSurveyId === surveyId && (
                <div className="survey-details-dropdown">
                    {survey.survey_status === 'Pending' && expandedSurveyId === surveyId ? (
                        <div className="approval-form">
                            
                                    <h3>Survey Approval Form</h3>
                                    <div className="form-group">
                                        <label htmlFor="doneBy">Survey Done By:</label>
                                        <input
                                        type="text"
                                        id="doneBy"
                                        name="doneBy"
                                        value={approvalFormData.doneBy}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="hygiene">Hygiene (1-5):</label>
                                        <input
                                        type="number"
                                        id="hygiene"
                                        name="hygiene"
                                        min="1"
                                        max="5"
                                        value={approvalFormData.hygiene}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kitchenImages">Kitchen Images:</label>
                                        <input
                                        type="file"
                                        id="kitchenImages"
                                        multiple
                                        onChange={(e) => handleImageUpload(e, 'kitchenImages')}
                                        />
                                        <div className="uploaded-images">
                                            {approvalFormData.kitchenImages.map((file, index) =>
                                            file instanceof File ? (
                                            <span key={index}>{file.name}</span>
                                            ) : (
                                            <span key={index}>Uploaded</span>
                                            )
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="foodTaste">Taste of Food (1-5):</label>
                                        <input
                                        type="number"
                                        id="foodTaste"
                                        name="foodTaste"
                                        min="1"
                                        max="5"
                                        value={approvalFormData.foodTaste}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                            <div className="form-group">
                                <label htmlFor="foodImages">Food Images:</label>
                                <input
                                type="file"
                                id="foodImages"
                                multiple
                                onChange={(e) => handleImageUpload(e, 'foodImages')}
                                />
                                <div className="uploaded-images">
                                    {approvalFormData.foodImages.map((file, index) =>
                                    file instanceof File ? (
                                    <span key={index}>{file.name}</span>
                                    ) : (
                                    <span key={index}>Uploaded</span>
                                    )
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="landmark_city_state">Landmark/City/State:</label>
                                <input
                                type="text"
                                id="landmark_city_state"
                                name="landmark_city_state"
                                value={approvalFormData.landmark_city_state}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode:</label>
                                <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={approvalFormData.pincode}
                                onChange={handleInputChange}
                                />
                            </div>
                                <div className="form-group">
                                <label htmlFor="no_of_meals_per_day">No. of Meals per Day:</label>
                                <input
                                type="number"
                                id="no_of_meals_per_day"
                                name="no_of_meals_per_day"
                                value={approvalFormData.no_of_meals_per_day}
                                onChange={handleInputChange}
                                />
                            </div>
                                <div className="form-group">
                                <label htmlFor="maxMeals">Max Meals per Day:</label>
                                <input
                                type="number"
                                id="maxMeals"
                                name="maxMeals"
                                value={approvalFormData.maxMeals}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mealType">Meal Type:</label>
                                <select
                                    id="mealType"
                                    name="mealType"
                                    value={approvalFormData.mealType}
                                    onChange={handleInputChange}
                                >
                                    <option value="Veg Only">Veg Only</option>
                                    <option value="Non-Veg Only">Non-Veg Only</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                            
                                <button type="button" className="approve-button" onClick={(e) => {
                                    console.log('Clicked approve');
                                    e.preventDefault();
                                    handleApproveAndSave();
                                }}>
                                    Approve and Save
                                </button>
                                <button type="button" className="save-button" onClick={(e)=>{                                   
                                    e.stopPropagation();
                                    handleSave();
                                }} >
                                    Save
                                </button>
                                <button type="button" className="reject-button"onClick={(e)=>{
                                    e.stopPropagation();
                                    handleRejectAndSave();
                                }}>
                                    Reject
                                </button>
                                <button onClick={() => console.log('Clicked test approve')}>
                                    Test Approve Button
                                </button>

                           
                        {approvalSuccessMessage && <div className="success-message">{approvalSuccessMessage}</div>}
                    </div>
                    ) : (
                    <div className="approved-details">
                    <h3>
                    {survey.survey_status === 'Approved' ? 'Approved' : 'Rejected'} Survey Details
                    </h3>
                    <p>
                    <span className="detail-label">Approved Date:</span> {survey.surveyDetails?.approvedDate}
                    </p>
                    <p>
                    <span className="detail-label">Survey Done By:</span> {survey.surveyDetails?.doneBy}
                    </p>
                    <p>
                    <span className="detail-label">Hygiene:</span> {survey.surveyDetails?.hygiene}/5
                    </p>
                    <div className="image-preview">
                    <span className="detail-label">Kitchen Images:</span>
                    {survey.surveyDetails?.kitchenImages?.map((image, index) => (
                    <img
                    key={index}
                    src={image}
                    alt={`Kitchen ${index + 1}`}
                    style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                    />
                    ))}
                    </div>
                    <p>
                    <span className="detail-label">Taste of Food:</span> {survey.surveyDetails?.foodTaste}/5
                    </p>
                    <div className="image-preview">
                    <span className="detail-label">Food Images:</span>
                    {survey.surveyDetails?.foodImages?.map((image, index) => (
                    <img
                    key={index}
                    src={image}
                    alt={`Food ${index + 1}`}
                    style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                    />
                    ))}
                    </div>
                    <p>
                    <span className="detail-label">Landmark/City/State:</span> {survey.landmark_city_state}
                    </p>
                    <p>
                    <span className="detail-label">Pincode:</span> {survey.pincode}
                    </p>
                    <p>
                    <span className="detail-label">No. of Meals/Day:</span> {survey.no_of_meals_per_day}
                    </p>
                    <p>
                    <span className="detail-label">Max Meals per Day:</span> {survey.surveyDetails?.maxMeals}
                    </p>
                    <p>
                    <span className="detail-label">Meal Type:</span> {survey.surveyDetails?.mealType}
                    </p>
                    </div>
                )}
            </div>
            )}
        </div>
    )})}
    </div>
    {approvalSuccessMessage && <div className="success-message">{approvalSuccessMessage}</div>}
    </div>
);
};

export default SurveyPage;

