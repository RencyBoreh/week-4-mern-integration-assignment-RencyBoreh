import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-white';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }
    console.log('Message sent:', formData);
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  if (!user) {
    return (
      <div className={`${bg} min-h-screen px-6 py-20 text-center`}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600">
          Got Questions or Ideas?
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-8" style={{color:theme==='light'? 'indigo' :'white'}}>
          We’d love to hear from you — but you’ll need an account to reach out. Join now and let’s build something together.
        </p>

        <img
          src="https://cdn.dribbble.com/userupload/15439830/file/original-2f3b1e6a2e1c4c6e8e3e7e6e3e6e3e6e.png?resize=800x0"
          alt="Contact preview"
          className="w-full max-w-xl mx-auto rounded-xl shadow-lg mb-10"
        />

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/register" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full">
            Create Free Account
          </Link>
          <Link to="/login" className="bg-white text-fuchsia-700 hover:bg-fuchsia-100 px-6 py-3 rounded-full">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bg} min-h-screen px-6 py-12`}>
      <div className="max-w-xl mx-auto">
        <h1 className={`text-3xl font-bold mb-6 text-center ${text}`}>Contact Us</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">✅ Message sent successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Your Message"
            className={`w-full px-4 py-2 rounded-md ${inputBg} ${text} border`}
          />
          <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-md">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
