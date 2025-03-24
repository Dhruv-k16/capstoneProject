import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    
  };

  const handleSignUp = () => {
   
  };

  return (
    <div className="sign-up">
      <h3>Create Account</h3>
      <label>
        Email / Phone
        <input 
          type="text" 
          value={emailPhone} 
          onChange={(e) => setEmailPhone(e.target.value)} 
          placeholder="Enter Email or Phone" 
        />
      </label>
      <label>
        Password
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter Password" 
        />
      </label>
      <div className="buttons">
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <p>
        "New here? Create an account and order your first home-cooked meal today!"
      </p>
    </div>
  );
};

export default SignUp;