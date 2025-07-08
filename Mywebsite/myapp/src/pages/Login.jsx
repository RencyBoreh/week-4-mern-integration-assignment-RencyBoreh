import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/authApi'; // ✅ Connect to backend
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-white';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const data = await loginUser(formData); // 🔐 Call backend login API
      login(data); // 🔒 Save user + token to context + localStorage
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className={`${bg} min-h-screen px-6 py-12`}>
      <div className="max-w-md mx-auto">
        <h1 className={`text-3xl font-bold mb-6 text-center ${text}`}>Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
            required
          />
          <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <p className={`mt-4 text-center ${text}`}>
          New here?{' '}
          <Link to="/register" className="text-fuchsia-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
