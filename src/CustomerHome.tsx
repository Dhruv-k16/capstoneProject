import React, { useState, useRef, useEffect } from 'react';
import './CustomerHome.css';
import Navbar from './navbar.tsx';
import { useNavigate, Routes, Route } from 'react-router-dom';
import UpdateDetails from './UpdateDetails.tsx';
import ChangePassword from './ChangePassword.tsx';
import Payment from './Payment.tsx';

interface HomeMaker {
  id: number;
  name: string;
  location: string;
  rating: number;
}

interface MenuItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface CartItem {
  meal: MenuItem;
  quantity: number;
}

interface CustomerHomeProps {
  customerName?: string | null;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ customerName }) => {
  const [customerDropdown, setCustomerDropdown] = useState(false);
  const [addressDropdown, setAddressDropdown] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [homeMakers, setHomeMakers] = useState<HomeMaker[]>([
    { id: 1, name: 'Home-maker A', location: '3 km Away', rating: 5 },
    { id: 2, name: 'Home-maker B', location: '5 km Away', rating: 4.8 },
  ]);
  const [homeMakerMenu, setHomeMakerMenu] = useState<MenuItem[]>([
    { id: 101, name: 'Matar Paneer', imageUrl: './images/Matar Paneer.jpeg', price: 80 },
    { id: 102, name: 'Daal Fry', imageUrl: './images/daal.jpeg', price: 60 },
    { id: 103, name: 'Jeera Rice', imageUrl: './images/Jeera Rice.jpeg', price: 50 },
    { id: 104, name: 'Ghee Roti', imageUrl: './images/chapati.jpeg', price: 30 },
  ]);
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);
  const [mealQuantity, setMealQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const customerDropdownRef = useRef<HTMLDivElement>(null);
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (customerDropdownRef.current && event.target instanceof Node && !customerDropdownRef.current.contains(event.target)) {
      setCustomerDropdown(false);
    }
    if (addressDropdownRef.current && event.target instanceof Node && !addressDropdownRef.current.contains(event.target)) {
      setAddressDropdown(false);
    }
    if (openDropdownId !== null && event.target instanceof Node) {
      const dropdownElement = document.querySelector(`.meal-dropdown-container-${openDropdownId}`);
      const selectButton = document.querySelector(`.select-button-${openDropdownId}`);
      if (dropdownElement && !dropdownElement.contains(event.target) && selectButton && !selectButton.contains(event.target)) {
        setOpenDropdownId(null);
        setSelectedButtonId(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  useEffect(() => {
    setCartItems([]);
    setTotalPrice(0);
  }, []);

  const toggleMealDropdown = (homeMakerId: number) => {
    if (openDropdownId === homeMakerId) {
      setOpenDropdownId(null);
      setSelectedButtonId(null);
    } else {
      setOpenDropdownId(homeMakerId);
      setSelectedButtonId(homeMakerId);
    }
  };

  const getSelectButtonStyle = (homeMakerId: number) => {
    return openDropdownId === homeMakerId ? { backgroundColor: '#d0bba5' } : {};
  };

  const handleIncrement = () => {
    setMealQuantity(mealQuantity + 1);
  };

  const handleDecrement = () => {
    setMealQuantity(Math.max(mealQuantity - 1, 1));
  };

  const addToCart = (meals: MenuItem[], quantity: number) => {
    const newCartItems: CartItem[] = [];
    let newTotalPrice = 0;

    meals.forEach(meal => {
      newCartItems.push({ meal, quantity });
      newTotalPrice += meal.price * quantity;
    });

    setCartItems(prevCartItems => [...prevCartItems, ...newCartItems]);
    setTotalPrice(prevTotalPrice => prevTotalPrice + newTotalPrice);
  };

  const removeFromCart = (index: number) => {
    const updatedCartItems = [...cartItems];
    const removedItem = updatedCartItems.splice(index, 1)[0];
    setCartItems(updatedCartItems);
    setTotalPrice(prevTotal => prevTotal - removedItem.meal.price * removedItem.quantity);
  };

  const handlePay = () => {
    navigate('/payment', { state: { totalPrice: totalPrice } });
  };

  const handleUpdateDetails = () => {
    navigate('/update-details');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleChangeAddress = () => {
    navigate('/UserProfile', { state: { section: 'change-address' } });
  };
  
  const handleAddNewAddress = () => {
    navigate('/UserProfile', { state: { section: 'add-new-address' } });
  };
  
  const handleDeleteAddress = () => {
    navigate('/UserProfile', { state: { section: 'delete-address' } });
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  return (
    <div className="customer-home-page">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <div className="top-area">
              <div className="customer-dropdown-container" ref={customerDropdownRef}>
                <button className="customer-button" onClick={() => setCustomerDropdown(!customerDropdown)}>
                  <img src="./images/icons/user.png" alt="Profile" className="button-icon" />
                  {customerName || 'Customer'}
                </button>
                {customerDropdown && (
                  <div className="customer-dropdown">
                    <button onClick={handleUpdateDetails}>Update Details</button>
                    <button onClick={handleChangePassword}>Change Password</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button>
                  <img src="./images/icons/search.png" alt="Search" className="search-icon" />
                </button>
              </div>
              <div className="address-dropdown-cust-container" ref={addressDropdownRef}>
                <button className="address-button-cust" onClick={() => setAddressDropdown(!addressDropdown)}>
                  <img src="./images/icons/location.png" alt="Location" className="button-icon" />
                  Address
                </button>
                {addressDropdown && (
                  <div className="address-dropdown-cust">
                    <button onClick={handleChangeAddress}>Change Address</button>
                    <button onClick={handleAddNewAddress}>Add New Address</button>
                    <button onClick={handleDeleteAddress}>Delete Address</button>
                  </div>
                )}
              </div>
            </div>
            <div className="offers-runner">Offers runner (Optional)</div>
            <div className="content-area">
              <div className="left-panel-cust">
                <div className="orders-section">
                  <button className="orders-button" onClick={handleOrdersClick}>
                    ORDERS
                  </button>
                  <button className="subscription-button">SUBSCRIPTION</button>
                </div>
                <div className="cart-section">
                  <div className="cart-title">CART</div>
                  <div className="cart-items">
                    {cartItems.map((item, index) => (
                      <div key={index} className="cart-item">
                        <p>
                          {item.meal.name} x{item.quantity} : Rs. {item.meal.price * item.quantity}
                        </p>
                        <button onClick={() => removeFromCart(index)} className="remove-button">Remove</button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <button className="pay-button" onClick={handlePay}>PAY</button>
                    <p>Total Rs. {totalPrice}</p>
                  </div>
                </div>
              </div>
              <div className="cust-middle-panel">
                {homeMakers.map(homeMaker => (
                  <div key={homeMaker.id} className="cook-info">
                    <div className="cook-details">
                      <img src="./images/chef.jpeg" alt={homeMaker.name} />
                      <div className="cook-text">
                        <p>Home-maker : {homeMaker.name}</p>
                        <p>Distance : {homeMaker.location}</p>
                        <p>Orders Left : n/n</p>
                        <div className="rating">
                          {Array.from({ length: homeMaker.rating }).map((_, index) => (
                            <span key={index}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`select-button select-button-${homeMaker.id}`}
                      onClick={() => toggleMealDropdown(homeMaker.id)}
                      style={getSelectButtonStyle(homeMaker.id)}
                    >
                      {openDropdownId === homeMaker.id ? 'close' : 'select'}
                    </button>
                    <div className={`meal-dropdown-container meal-dropdown-container-${homeMaker.id}`} >
                      {openDropdownId === homeMaker.id && (
                        <div className="meal-dropdown">
                          <div className="meal-grid">
                            {homeMakerMenu.map(meal => (
                              <div key={meal.id} className="meal-card">
                                <img src={meal.imageUrl} alt={meal.name} />
                                <p>{meal.name}</p>
                              </div>
                            ))}
                          </div>
                          <div className="add-meal-quantity">
                            <button
                              className="add-meal-button"
                              onClick={() => addToCart(homeMakerMenu, mealQuantity)}
                            >
                              ADD MEAL
                            </button>
                            <div className="quantity-control">
                              <button onClick={handleDecrement}>-</button>
                              <span>{mealQuantity}</span>
                              <button onClick={handleIncrement}>+</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        } />
        <Route path="/update-details" element={<UpdateDetails />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/payment" element={<Payment totalPrice={totalPrice} />} />
      </Routes>
    </div>
  );
};

export default CustomerHome;