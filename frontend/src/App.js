// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage.js';
import Footer from './components/Footer';
import Signup from './components/SignUp';

const App = () => {
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
  }, []);

  const location = useLocation(); // Get the current location

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {location.pathname !== '/signup' && <Footer />} {/* Conditionally render the Footer */}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
