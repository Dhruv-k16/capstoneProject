import React, { useState, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import '@mui/x-date-pickers/themeAugmentation'; // Important for type augmentation
import '@mui/material/styles'; // Necessary for theme augmentation to work
import './HomeMakerHomepage.css';
import Navbar from './navbar.tsx';
import { useNavigate } from 'react-router-dom';

interface Order {
  customerName: string;
  mealQuantity: number;
  location: string;
  paymentStatus: 'Paid' | 'Cash on Delivery';
  mealStatus?: string;
}

interface Feedback {
  customerName: string;
  feedbackText: string;
}

const HomeMakerHomepage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Use Dayjs type
  const [isEditingMenu, setIsEditingMenu] = useState<boolean>(false);
  const [foodItems, setFoodItems] = useState<string[]>(['Meal/menu', 'Meal/menu', 'Meal/menu', 'Meal/menu']);
  const [foodImages, setFoodImages] = useState<(string | null)[]>([null, null, null, null]);
  const [mealPrice, setMealPrice] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([
    { customerName: 'Alice', mealQuantity: 2, location: '123 Main St', paymentStatus: 'Paid' },
    { customerName: 'Bob', mealQuantity: 1, location: '456 Oak Ave', paymentStatus: 'Cash on Delivery' },
    { customerName: 'Charlie', mealQuantity: 3, location: '789 Pine Ln', paymentStatus: 'Paid' },
  ]);
  const [selectedFunction, setSelectedFunction] = useState<string>('Add Menu');
  const [homeMakerDropdown, setHomeMakerDropdown] = useState(false);
  const homeMakerDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(5);
  const [isChangingQuantity, setIsChangingQuantity] = useState(false);
  const [mealStatus, setMealStatus] = useState<string | null>(null);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([
    {
      customerName: 'Customer A',
      feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
    },
    {
      customerName: 'Customer B',
      feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
    },
    {
      customerName: 'Customer C',
      feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
    },
  ]);
  const [addressDropdown, setAddressDropdown] = useState(false);
  const addressDropdownRef = useRef<HTMLDivElement>(null);

  const [addressFields, setAddressFields] = useState({
    houseNumber: '',
    landmark: '',
    pincode: '',
  });

  const [addressUpdatedMessage, setAddressUpdatedMessage] = useState<string | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isAfter(dayjs())) {
      setSelectedDate(date);
    } else {
      alert('Please select a future date.');
    }
  };

  const handleEditSaveMenu = () => {
    if (isEditingMenu) {
      alert('Meal updated.');
    }
    setIsEditingMenu(!isEditingMenu);
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...foodImages];
        newImages[index] = e.target?.result as string;
        setFoodImages(newImages);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleFoodItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = [...foodItems];
    newItems[index] = event.target.value;
    setFoodItems(newItems);
  };

  const handleIncrement = () => {
    if (isChangingQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (isChangingQuantity && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleSaveQuantity = () => {
    if (isChangingQuantity) {
      alert('Quantity updated.');
    }
    setIsChangingQuantity(!isChangingQuantity);
  };

  const handleUpdateStatus = (status: string) => {
    setMealStatus(status);
    setOrders(orders.map(order => ({ ...order, mealStatus: status })));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFields({
      ...addressFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAddress = () => {
    // Add your logic to update the address (e.g., API call) here
    console.log('Address updated:', addressFields);

    // Show success message
    setAddressUpdatedMessage('Address updated successfully');

    // Optionally, clear the message after a few seconds
    setTimeout(() => {
      setAddressUpdatedMessage(null);
    }, 3000);
  };

  const renderMiddlePanel = () => {
    switch (selectedFunction) {
      case 'Add Menu':
        return (
          <div className="add-menu-panel">
            <div className="day-change-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  /*label="Select Date"*/
                  value={selectedDate}
                  onChange={handleDateChange}
                  minDate={dayjs()} // Use dayjs() for current date
                  format="DD/MM/YYYY" // Format date
                />
              </LocalizationProvider>
              <button className="date-button" onClick={handleEditSaveMenu}>{isEditingMenu ? 'Save' : 'Change Menu'}</button>
            </div>
            <text>Enter the Price : </text>
            <input className='input-section'
              type="text"
              placeholder="enter the price : eg 80"
              value={mealPrice}
              onChange={(e) => setMealPrice(Number(e.target.value))}
            />
            <div className="food-items-container">
              {foodItems.map((item, index) => (
                <div key={index} className="food-item">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(index, event)}
                  />
                  {foodImages[index] && <img src={foodImages[index]} alt={`Food ${index}`} />}
                  <input
                    type="text"
                    value={item}
                    onChange={(event) => handleFoodItemChange(index, event)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'Update Quantity':
        return (
          <div className="update-quantity-panel">
            <div className="day-change-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  minDate={dayjs()}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <button onClick={handleSaveQuantity}>
                {isChangingQuantity ? 'Save' : 'Change Quantity'}
              </button>
            </div>
            <p className="meals-text">Meals can be prepared</p>
            <div className="quantity-controls">
              <button onClick={handleDecrement} className="quantity-button">-</button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={handleIncrement} className="quantity-button">+</button>
            </div>
          </div>
        );
      case 'Update Status':
        return (
          <div className="update-status-panel">
            <h2>UPDATE THE MEAL STATUS</h2>
            <button
              className={`status-button ${mealStatus === 'Preparing the Meal' ? 'active' : ''}`}
              onClick={() => handleUpdateStatus('Preparing the Meal')}
            >
              Preparing the Meal
            </button>
            <button
              className={`status-button ${mealStatus === 'Packing the Meal' ? 'active' : ''}`}
              onClick={() => handleUpdateStatus('Packing the Meal')}
            >
              Packing the Meal
            </button>
            <button
              className={`status-button ${mealStatus === 'Meal Out for Delivery' ? 'active' : ''}`}
              onClick={() => handleUpdateStatus('Meal Out for Delivery')}
            >
              Meal Out for Delivery
            </button>
          </div>
        );
      case 'View Feedback':
        return (
          <div className="view-feedback-panel">
            <h2>VIEW FEEDBACK</h2>
            {feedbackList.map((feedback, index) => (
              <div key={index} className="feedback-item">
                <div className="feedback-icon">
                  <img src="./images/icons/user.png"></img>
                </div>
                <div className="feedback-content">
                  <p className="customer-name">{feedback.customerName}</p>
                  <p className="feedback-text">{feedback.feedbackText}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'Change Address':
        return (
          <div className="change-address-panel">
            <h2>ADDRESS</h2>
            <input
              type="text"
              name="houseNumber"
              placeholder="House number/Street name"
              value={addressFields.houseNumber}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark/City/state"
              value={addressFields.landmark}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={addressFields.pincode}
              onChange={handleAddressChange}
            />
            <button onClick={handleUpdateAddress}>UPDATE</button>
            {addressUpdatedMessage && <p className="success-message">{addressUpdatedMessage}</p>}
          </div>
        );
      default:
        return <div>Default Content</div>;
    }
  };

  const handleIncome = () => {
    navigate('/income');
    setHomeMakerDropdown(false);
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    setHomeMakerDropdown(false);
  };

  const handleLogout = () => {
    navigate('/ '); // Navigate to the login page
    setHomeMakerDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (homeMakerDropdownRef.current && event.target instanceof Node && !homeMakerDropdownRef.current.contains(event.target)) {
      setHomeMakerDropdown(false);
    }
  };

  const handleChangeAddress = () => {
    console.log('Change Address clicked');
    setSelectedFunction('Change Address');
    setAddressDropdown(false);
  };

  const handleClickOutsideAddress = (event: MouseEvent) => {
    if (addressDropdownRef.current && event.target instanceof Node && !addressDropdownRef.current.contains(event.target)) {
      setAddressDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideAddress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideAddress);
    };
  }, []);

  return (
    <div className="homemaker-homepage">
      <Navbar />
      <div className='top-panel'>
        <div className="home-maker-dropdown-container" ref={homeMakerDropdownRef}>
          <button className="home-maker-button" onClick={() => setHomeMakerDropdown(!homeMakerDropdown)}>
            <img src="./images/icons/user.png" alt="Profile" className="button-icon" />
            Home-maker
          </button>
          {homeMakerDropdown && (
            <div className="home-maker-dropdown">
              <button onClick={handleIncome}>Income</button>
              <button onClick={handleChangePassword}>Change Password</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <div className="address-dropdown-container" ref={addressDropdownRef}>
          <button className="address-button" onClick={() => setAddressDropdown(!addressDropdown)}>
            <img src="./images/icons/location.png" alt="Location" className="button-icon" />
            Address
          </button>
          {addressDropdown && (
            <div className="address-dropdown">
              <button onClick={handleChangeAddress}>Change Address</button>
            </div>
          )}
        </div>
      </div>
      <div className="left-panel-maker">
        <h2>ORDER RECEIVED</h2>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <p>Customer: {order.customerName}</p>
            <p>Quantity: {order.mealQuantity}</p>
            <p>Location: {order.location}</p>
            <p>Payment: {order.paymentStatus}</p>
            {order.mealStatus && <p>Meal Status: {order.mealStatus}</p>}
          </div>
        ))}
      </div>
      <div className="middle-panel-maker">
        {renderMiddlePanel()}
      </div>
      <div className="right-panel-maker">
        <button
          className={selectedFunction === 'Add Menu' ? 'active' : ''}
          onClick={() => setSelectedFunction('Add Menu')}
        >
          ADD MENU
        </button>
        <button
          className={selectedFunction === 'Update Quantity' ? 'active' : ''}
          onClick={() => setSelectedFunction('Update Quantity')}
        >
          UPDATE QUANTITY
        </button>
        <button
          className={selectedFunction === 'Update Status' ? 'active' : ''}
          onClick={() => setSelectedFunction('Update Status')}
        >
          UPDATE STATUS
        </button>
        <button
          className={selectedFunction === 'View Feedback' ? 'active' : ''}
          onClick={() => setSelectedFunction('View Feedback')}
        >
          VIEW FEEDBACK
        </button>
      </div>
    </div>
  );
};

export default HomeMakerHomepage;