import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaBars } from 'react-icons/fa';
import './css/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false); // Close menu on link click

  return (
    <header className="header">
      <div className="logo">
        <img src="https://logowik.com/content/uploads/images/todo-group3144.logowik.com.webp" alt="Logo" />
      </div>
      <nav>
        {/* Hamburger Icon for small screens */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </div>
        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}  // Close menu on click
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-task"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}  // Close menu on click
            >
              <FaPlus />
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/edit-task"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}  // Close menu on click
            >
              <FaEdit />
              Edit Task
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
