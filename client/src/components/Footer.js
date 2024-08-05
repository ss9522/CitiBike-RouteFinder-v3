// client/src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CitiBike Route Planner. Released under MIT licensing terms.</p>
    </footer>
  );
}

export default Footer;