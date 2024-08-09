import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Toggling menu. Current state:', isOpen); // Log current state before toggling
    setIsOpen(!isOpen);
    console.log('Menu state after toggling:', !isOpen); // Log new state after toggling
  };

  console.log('Navbar component rendered. Menu state:', isOpen); // Log state when component renders

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CitiBike Route Planner</Link>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        <Link to="/faq" onClick={toggleMenu}>FAQ</Link>
        <Link to="/map" onClick={toggleMenu}>Map</Link>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
}

export default Navbar;