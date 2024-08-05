import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import MapPage from './pages/MapPage';
import SavedRoutesPage from './pages/SavedRoutesPage';

function App() {
  console.log('App component rendered');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/saved-routes" element={<SavedRoutesPage />} />
      </Routes>
    </Router>
  );
}

export default App;