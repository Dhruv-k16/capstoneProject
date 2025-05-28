import React from 'react';
import './AboutUs.css'; 
import Navbar from './navbar.tsx';

const AboutUs: React.FC = () => {
  return (
    <div className='page'>
      <Navbar />
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-title">About Us</div>
          <p>
            At LunchWala, we connect talented homemakers with people seeking
            affordable, nutritious, home-cooked meals. Our platform empowers
            home chefs, promotes sustainability, and offers a healthy alternative
            to expensive restaurant food. We combine technology with community.
          </p>
          <p>
            Unlike typical food delivery apps, we focus on home-cooked meals,
            offering a structured, scalable, and digital-first solution that
            supports local kitchens and fosters community-driven food systems.
          </p>
          <p>
            Join us in reimagining how homemade food is shared and delivered—fresh
            from local homes to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;