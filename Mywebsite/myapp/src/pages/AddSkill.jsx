import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { addSkill } from '../api/skillApi';

const AddSkill = () => {
  const { theme } = useContext(ThemeContext);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skill: '',
    type: 'teach',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const bg =
    theme === 'light'
      ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
      : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-white';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const inputText = theme === 'light' ? 'text-gray-800' : 'text-white';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { skill, type, description } = formData;

    if (!skill || !description) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const newSkill = await addSkill({ name: skill.trim(), type, description });

      // Update user context with new skill
      const updatedUser = {
        ...user,
        skills: [...(user.skills || []), newSkill],
      };
      login(updatedUser);

      setSuccess(true);
      setFormData({ skill: '', type: 'teach', description: '' });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to add skill. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className={`${bg} min-h-screen px-6 py-20 text-center`}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600">
          Want to Share What You Know?
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-white/90" style={{color:theme==='light'? 'indigo' :'white'}}>
          Create your first skill card and help someone grow — or find collaborators with shared interests.
        </p>

        <img
          src="https://cdn.dribbble.com/userupload/15439830/file/original-2f3b1e6a2e1c4c6e8e3e7e6e3e6e3e6e.png?resize=800x0"
          alt="Share a skill preview"
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
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${text}`}>
          Share a Skill
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">✅ Skill added successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-1 font-medium ${text}`}>Skill</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md ${inputBg} ${inputText} border border-gray-300`}
              required
            />
          </div>

          <div>
            <label className={`block mb-1 font-medium ${text}`}>I want to...</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md ${inputBg} ${inputText} border border-gray-300`}
            >
              <option value="teach">Teach this skill</option>
              <option value="learn">Learn this skill</option>
            </select>
          </div>

          <div>
            <label className={`block mb-1 font-medium ${text}`}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 rounded-md ${inputBg} ${inputText} border border-gray-300`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-3 rounded-md"
          >
            Submit Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
