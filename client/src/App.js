import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import MapPage from './pages/MapPage';
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/map" element={<MapPage />} /> {/* Updated route for MapPage */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
