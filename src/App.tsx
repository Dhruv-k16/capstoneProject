import React from 'react';
import SignUp from './components/SignUp';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          {     }
          {     }
          <h1>LunchWala</h1>
        </div>
        <nav className="nav">
          <button>HOME</button>
          <button>ADD KITCHEN</button>
          <button>HELP</button>
          <button>ABOUT US</button>
        </nav>
      </header>
      <main className="main-content">
        <h2>Welcome to Lunch Box Initiative - Home-Cooked Goodness. Delivered Fresh!</h2>
        <p>
          "Enjoy delicious, healthy, and affordable home-cooked meals, prepared with love by homemakers and delivered to individuals, offices, and organizations. Freshness guaranteed!"
        </p>
        <SignUp />
      </main>
    </div>
  );
};

export default App;