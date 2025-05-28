import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import Navbar from './navbar.tsx';

interface LoginProps {
  onLoginSuccess: (role: string, name: string, identifier: string, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
const [selectedRole, setSelectedRole] = useState('Login as');
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState('');
const [showOTPInput, setShowOTPInput] = useState(false);
const [otp, setOtp] = useState('');

const roles = ['Customer', 'Homemaker', 'Deliveryman', 'Admin'];

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const name = 'csrftoken';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        let cookieValue = null;
        if (cookie.substring(name.length + 1)) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        }
        return cookieValue;
      }
    }
  }
  return '';
};

const handleClickOutside = (event: MouseEvent) => {
  if (
  dropdownRef.current &&
  event.target instanceof Node &&
  !dropdownRef.current.contains(event.target)
  ) {
    setIsDropdownOpen(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const getHomePageRoute = (role: string) => {
const userType = role.toLowerCase().replace(' ', '-');
switch (userType) {
  case 'customer':
    return '/CustomerHome';
  case 'homemaker':
    return '/HomeMakerHomePage';
  case 'deliveryman':
    return '/DeliveryManHomePage';
  case 'admin':
    return '/AdminHomePage';
  default:
    return '/';
}
};

const handleRoleSelect = (role: string) => {
  setSelectedRole(role);
  setIsDropdownOpen(false);
};

const handleSignIn = async () => {
  if (email && password && selectedRole !== 'Login as') {
    setLoginError('');
    const userType = selectedRole.toLowerCase();
    try {
      const csrfToken = getCSRFToken(); // Get the token
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '', // Use empty string if null
      };

      const response = await fetch(`http://127.0.0.1:8000/api/login/${userType}/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      // ✅ STORE username & email for later use
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      localStorage.setItem('username', data.identifier); // ✅ This line is critical

      onLoginSuccess(userType, data.name, data.identifier, data.token);
      navigate(getHomePageRoute(selectedRole));
    } catch (error: any) {
      setLoginError(error.message || 'Failed to connect to server. Please try again.');
      console.error('Login Error:', error);
    }
  } else {
    setLoginError('Please enter email, password, and select a role.');
  }
};

const handleForgotPassword = async () => {
  if (!email) {
    setLoginError('Please enter your email.');
    return;
  }
  const userType = selectedRole.toLowerCase().replace(' ', '-'); // Replace space with hyphen

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/forgot-password/${userType}/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send OTP.');
    }

    setShowOTPInput(true);
  } catch (error: any) {
    setLoginError(error.message || 'Failed to connect to server. Please try again.');
    console.error('Forgot Password Error:', error);
  }
};

const handleVerifyOTP = async () => {
if (!email || !otp) {
setLoginError('Please enter email and OTP.');
return;
}
const userType = selectedRole.toLowerCase().replace(' ', '-'); // Replace space with hyphen

try {
const csrfToken = getCSRFToken();
const headers: HeadersInit = {
'Content-Type': 'application/json',
'X-CSRFToken': csrfToken || '',
};
const response = await fetch(`http://127.0.0.1:8000/api/verify-otp/${userType}/`, {
method: 'POST',
headers: headers,
body: JSON.stringify({ email, otp }),
});

if (!response.ok) {
const errorData = await response.json();
throw new Error(errorData.message || 'Invalid OTP.');
}

const data = await response.json();
onLoginSuccess(userType, data.name, data.identifier, data.token); // Pass identifier
navigate(getHomePageRoute(selectedRole));
} catch (error: any) {
setLoginError(error.message || 'Failed to verify OTP.');
console.error('Verify OTP Error:', error);
}
};

return (
<div className='login-page'>
<Navbar />
<div className='login-container'>
<div className='content-section'>
<div className='left-section'>
<div className='welcome-text'>
<h1>
Welcome to Lunch Box Initiative - Home-Cooked Goodness, Delivered Fresh!
</h1>
</div>
<div className='login-form'>
<div className='create-account-login-container'>
<div className='create-account'>
<span>
<u>Login Here</u>
</span>
</div>
<div className='login-as-container' ref={dropdownRef}>
<button
className='login-as'
onClick={() => setIsDropdownOpen(!isDropdownOpen)}
>
{selectedRole}
<img
src='/images/icons/user.png'
alt='Login As'
className='login-as-icon'
/>
</button>
{isDropdownOpen && (
<div className='role-dropdown-login'>
{roles.map((role) => (
<button
key={role}
className='role-option-login'
onClick={() => handleRoleSelect(role)}
>
{role}
</button>
))}
</div>
)}
</div>
</div>
{loginError && <p className="error-message">{loginError}</p>}
<label htmlFor='email' className='input-label'>
Email
</label>
<input
type='text'
id='email'
placeholder='abc@gmail.com'
className='input-field-mail' // Added class here
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
{showOTPInput ? (
<>
<label htmlFor='otp' className='input-label'>
Enter OTP
</label>
<input
type='text'
id='otp'
placeholder='Enter OTP'
className='input-field' // Added class here
value={otp}
onChange={(e) => setOtp(e.target.value)}
/>
<button className='sign-in-button' onClick={handleVerifyOTP}>
Verify OTP
</button>
</>
) : (
<>
<label htmlFor='password' className='input-label'>
Password
</label>
<input
type='password'
id='password'
placeholder='156sgjd@BH'
className='input-field same-width-input' // Added class here
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<div className='button-group'>
<button className='sign-in-button' onClick={handleSignIn}>
Sign in
</button>
<Link to='/signup'>
<button className='sign-up-button'>
Sign up
</button>
</Link>
</div>
<button className="forget-button" onClick={handleForgotPassword}>Forgot Password?</button>
</>
)}
</div>
<div className='new-user-text'>
<p>
"New here? Create an account and order your first home-cooked meal
today!"
</p>
</div>
</div>
<div className='right-section'>
<div className='quote-text'>
<p>
"Enjoy delicious, healthy, and affordable home-cooked meals,
prepared with love by homemakers and delivered to individuals,
offices, and organisations. Freshness guaranteed!"
</p>
</div>
<div className='food-images-container'>
<img src='/images/mixed.jpeg' alt='Food 1' />
<img src='/images/Naan.jpeg' alt='Food 2' />
<img src='/images/Idly.jpeg' alt='Food 3' />
<img src='/images/chole_puri.jpeg' alt='Food 4' />
</div>
</div>
</div>
</div>
</div>
);
};

export default Login;
