// src/components/LockedPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LockedPreview = ({ heading = "Join SkillSync", message = "This page is for members only. Unlock powerful features by signing up free.", image }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600">
        {heading}
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-100/90">
        {message}
      </p>
      {image && (
        <img src={image} alt="Locked" className="w-full max-w-xl rounded-xl shadow-lg mb-10" />
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/register" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full">
          Create Free Account
        </Link>
        <Link to="/login" className="bg-white text-fuchsia-700 hover:bg-fuchsia-100 px-6 py-3 rounded-full">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default LockedPreview;
