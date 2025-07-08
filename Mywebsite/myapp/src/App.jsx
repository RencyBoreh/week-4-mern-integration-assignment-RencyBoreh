import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import SkillList from './pages/SkillList';
import AddSkill from './pages/AddSkill';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* 🏠 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✨ Gated Preview Routes (no ProtectedRoute needed) */}
        <Route path="/skills" element={<SkillList />} />
        <Route path="/add" element={<AddSkill />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🔐 Auth-Protected Only */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
