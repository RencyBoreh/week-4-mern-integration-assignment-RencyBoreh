import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/GlobalState';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const text = theme === 'light' ? 'text-gray-800' : 'text-gray-300';
  const link = theme === 'light' ? 'text-fuchsia-700' : 'text-fuchsia-400';

  return (
    <footer className={`${bg} ${text} border-t px-6 py-10`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm text-center">
          <Link to="/skills" className={`${link} hover:underline`}>Skills</Link>
          <Link to="/about" className={`${link} hover:underline`}>About</Link>
          <Link to="/contact" className={`${link} hover:underline`}>Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="GitHub" className={`${link} hover:text-fuchsia-600`}>
            <FaGithub size={20} />
          </a>
          <a href="#" aria-label="Twitter" className={`${link} hover:text-fuchsia-600`}>
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className={`${link} hover:text-fuchsia-600`}>
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-center w-full md:w-auto mt-4 md:mt-0">
          © {new Date().getFullYear()} SkillSync. Built with 💜 in Kenya.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
