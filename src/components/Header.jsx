import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaBars } from 'react-icons/fa';
import '../components/css/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">
        {/* logo */}
        <NavLink to="/" onClick={closeMenu}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gB-8DV5lSgeCZVAoRzPEWenpddafAJRUIiSl5aS8-FU2t9Y6HdBGi3EaqVVVrrRXkaA&usqp=CAU" 
            alt="Logo" 
          />
        </NavLink>
      </div>
       {/*navlinks */}
      <nav>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-task"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              <FaPlus />
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/edit-task"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
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
