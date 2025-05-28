import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Navbar from './navbar.tsx';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [role, setRole] = useState('Create account as');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const roles = ['Customer', 'Deliveryman'];

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (!name || !email || !contact || !password || password !== rePassword || role === 'Create account as' || !username) {
      setMessage('Please fill in all fields correctly.');
      return;
    }
  
    try {
      let apiUrl = '';
      if (role === 'Customer') {
        apiUrl = 'http://127.0.0.1:8000/api/customer/';
      } else if (role === 'Deliveryman') {
        apiUrl = 'http://127.0.0.1:8000/api/deliverymen/';
      } else {
        setMessage('Please select a valid role.');
        return;
      }
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: name,
          contact,
        }),
      });
  
      const text = await response.text();
  
      if (!response.ok) {
        console.error('Signup response text (error):', text);
  
        try {
          const errorData = JSON.parse(text);
          setMessage(errorData.error || 'Signup failed. Please try again.');
        } catch {
          setMessage('Signup failed. Server returned unexpected HTML or error page.');
        }
        return;
      }
  
      const data = JSON.parse(text);
      console.log('Signup successful:', data);
      setMessage('Account Created Successfully!');
      navigate('/');
  
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred during signup. Please try again.');
    }
  };
  

  return (
    <div className='Signup-page'>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <h2><u>Create Account</u></h2>

          <div className="role-select" ref={dropdownRef}>
            <button className="role-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {role}
            </button>
            {isDropdownOpen && (
              <div className="role-dropdown">
                {roles.map((optionRole) => (
                  <button
                    key={optionRole}
                    className="role-option-signup"
                    onClick={() => handleRoleSelect(optionRole)}
                  >
                    {optionRole}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="name">Enter Your Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="contact">Contact</label>
          <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />

          <label htmlFor="password">Create Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="rePassword">Re-enter Password</label>
          <input type="password" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />

          <button onClick={handleSignup}>Sign Up</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;