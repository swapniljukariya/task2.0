import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Disable body scroll when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up when component unmounts
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gray-100 text-black shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gB-8DV5lSgeCZVAoRzPEWenpddafAJRUIiSl5aS8-FU2t9Y6HdBGi3EaqVVVrrRXkaA&usqp=CAU"
            alt="Logo"
            className="h-14 rounded w-14"
          />
        </NavLink>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <nav
          className={`fixed inset-0 bg-gray-100 z-50 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 lg:relative lg:inset-auto lg:transform-none lg:flex`}
        >
          <ul className="flex flex-col items-center justify-center space-y-6 h-56 lg:flex-row lg:space-y-0 lg:space-x-8 lg:h-auto lg:bg-transparent">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-md ${
                    isActive ? 'text-blue-400' : 'hover:text-blue-300'
                  }`
                }
                onClick={closeMenu}
              >
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-task"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-md ${
                    isActive ? 'text-blue-400' : 'hover:text-blue-300'
                  }`
                }
                onClick={closeMenu}
              >
                <FaPlus />
                <span>Add Task</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/edit-task"
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-md ${
                    isActive ? 'text-blue-400' : 'hover:text-blue-300'
                  }`
                }
                onClick={closeMenu}
              >
                <FaEdit />
                <span>Edit Task</span>
              </NavLink>
            </li>
          </ul>

          {/* Close Button for Mobile Menu */}
          <button
            className="absolute top-4 right-4 text-black text-2xl lg:hidden"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            &times;
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
