import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // ✅ added useLocation
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
// import {logo} from '../assets/image.png';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isOnAboutPage = location.pathname === '/about';

  const navbarBg =
    theme === 'light'
      ? 'bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600'
      : 'bg-gradient-to-r from-purple-900 via-fuchsia-800 to-pink-700';

  return (
    <nav className={`${navbarBg} p-3`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
    
        <Link to="/">
  <img src="" alt="Logo" className="h-10 w-auto" />
</Link>

        {/* Desktop Center Links */}
        <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-6 py-2 space-x-6">
          <Link
            to={isOnAboutPage ? '/' : '/about'}
            className="text-white hover:text-pink-200 font-medium no-underline"
          >
            {isOnAboutPage ? 'Home' : 'About'}
          </Link>
          <Link to="/skills" className="text-white hover:text-pink-200 font-medium no-underline">Browse Skills</Link>
          <Link to="/add" className="text-white hover:text-pink-200 font-medium no-underline">Share a Skill</Link>
          <Link to="/contact" className="text-white hover:text-pink-200 font-medium no-underline">Contact</Link>
        </div>

        {/* Desktop Right Links */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="text-white hover:text-pink-200 font-medium no-underline">Profile</Link>
              <button onClick={logout} className="text-white hover:text-yellow-300 font-medium no-underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-pink-200 font-medium no-underline">Register</Link>
              <Link to="/login" className="text-white hover:text-pink-200 font-medium no-underline">Login</Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-white hover:text-yellow-300 transition duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.95 4.95l-.71-.71M4.05 19.95l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <Link
            to={isOnAboutPage ? '/' : '/about'}
            className="block text-white hover:text-pink-200"
          >
            {isOnAboutPage ? 'Home' : 'About'}
          </Link>
          <Link to="/skills" className="block text-white hover:text-pink-200">Browse Skills</Link>
          <Link to="/add" className="block text-white hover:text-pink-200">Share a Skill</Link>
          <Link to="/contact" className="block text-white hover:text-pink-200">Contact</Link>

          {user ? (
            <>
              <Link to="/profile" className="block text-white hover:text-pink-200">Profile</Link>
              <button onClick={logout} className="block text-white hover:text-yellow-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="block text-white hover:text-pink-200">Register</Link>
              <Link to="/login" className="block text-white hover:text-pink-200">Login</Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="text-white hover:text-yellow-300 transition duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
