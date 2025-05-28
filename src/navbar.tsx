import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

interface NavbarProps {
  userRole?: string | null; // Made optional
  isLoggedIn?: boolean;      // Made optional
}

const Navbar: React.FC<NavbarProps> = ({ userRole, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (isLoggedIn) {
      switch (userRole) {
        case 'customer':
          navigate('/CustomerHome.tsx');
          break;
        case 'admin':
          navigate('/AdminHomePage.tsx'); // Replace with your admin home route
          break;
        case 'home-maker':
          navigate('/HomeMakerHomepage.tsx'); // Replace with your home-maker home route
          break;
        case 'deliveryman':
          navigate('/DeliveryManHomePage.tsx'); // Replace with your deliveryman home route
          break;
        default:
          navigate('/'); // Navigate to login if role is unknown or not logged in
      }
    } else {
      navigate('/'); // Navigate to login if not logged in
    }
  };

  return (
    <nav className='nav-bar'>
      <div className="logo-area">
        <img src="/images/logo.png" alt="LunchWala Logo" className="logo" />
        <span className="logo-text">LunchWala</span>
      </div>
      <div className="header-section">
        <div className="header">
          <button onClick={handleHomeClick} className="header-button-home"><u>HOME</u></button>
          <Link to="/add-kitchen" className="header-button">ADD KITCHEN</Link>
          <Link to="/help" className="header-button">HELP</Link>
          <Link to="/about-us" className="header-button">ABOUT US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;