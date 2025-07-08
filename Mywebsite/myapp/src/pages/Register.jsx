import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: [],
  });
  const [error, setError] = useState('');

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-white';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSkillsChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, skills: selectedSkills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, bio, skills } = formData;

    if (!name || !email || !password || !bio || skills.length === 0) {
      setError('All fields are required, including at least one skill.');
      return;
    }

    try {
      const userData = await registerUser({ name, email, password, bio });
      login(userData); // stores token + user in context/localStorage
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const skillOptions = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Graphic Design', label: 'Graphic Design' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Public Speaking', label: 'Public Speaking' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Music', label: 'Music' },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: theme === 'light' ? '#fff' : '#1f2937',
      borderColor: state.isFocused ? '#d946ef' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 2px #d946ef' : 'none',
      '&:hover': {
        borderColor: '#d946ef',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === 'light' ? '#fff' : '#1f2937',
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === 'light'
          ? '#f3e8ff'
          : '#4c1d95'
        : 'transparent',
      color: theme === 'light' ? '#1f2937' : '#fff',
      cursor: 'pointer',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: theme === 'light' ? '#f3e8ff' : '#6b21a8',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: theme === 'light' ? '#4b5563' : '#fff',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: theme === 'light' ? '#9ca3af' : '#e5e7eb',
      ':hover': {
        backgroundColor: theme === 'light' ? '#f87171' : '#7f1d1d',
        color: '#fff',
      },
    }),
  };

  return (
    <div className={`${bg} min-h-screen px-6 py-12`}>
      <div className="max-w-md mx-auto">
        <h1 className={`text-3xl font-bold mb-6 text-center ${text}`}>Create an Account</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="3"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <CreatableSelect
            isMulti
            options={skillOptions}
            onChange={handleSkillsChange}
            placeholder="Select or type your skills..."
            styles={customStyles}
            className="text-sm"
            classNamePrefix="react-select"
          />
          <button type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-md">
            Register
          </button>
        </form>
        <p className={`mt-4 text-center ${text}`}>
          Already have an account?{' '}
          <a href="/login" className="text-fuchsia-500 underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
