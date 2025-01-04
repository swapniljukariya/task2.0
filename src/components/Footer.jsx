// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './css/Footer.css'

const Footer = () => (
  <footer className="footer">
    
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
    </div>
    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
  </footer>
);

export default Footer;
