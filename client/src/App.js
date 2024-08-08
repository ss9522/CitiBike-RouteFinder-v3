import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import MapPage from './pages/MapPage';
import SavedRoutesPage from './pages/SavedRoutesPage';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground'; // Adjust the path as needed

function App() {
  return (
    <Router>
      <VideoBackground />
      <div className="content-overlay">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/map" element={<MapPage />} /> {/* Updated route for MapPage */}
          <Route path="/saved-routes" element={<SavedRoutesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
