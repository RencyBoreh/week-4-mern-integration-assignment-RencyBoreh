import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { useAuth } from '../context/AuthContext';
import { getAllSkills } from '../api/skillApi';
import { FaStar } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';
import { Link } from 'react-router-dom';

const SkillList = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [allSkills, setAllSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setAllSkills(data);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };

    fetchSkills();
  }, []);

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-white';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const filteredSkills = allSkills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === 'all' || skill.type === filterType)
  );

  const handleRate = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const renderStars = (id, current) => {
    const average = current.length
      ? current.reduce((a, b) => a + b, 0) / current.length
      : 0;
    const displayRating = ratings[id] ?? average;

    return [...Array(5)].map((_, i) => {
      const filled = i < Math.round(displayRating);
      return (
        <FaStar
          key={i}
          className={`cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
          onClick={() => handleRate(id, i + 1)}
        />
      );
    });
  };

  if (!user) {
    return (
      <div className={`${bg} min-h-screen px-6 py-16 text-center`}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600">
          Discover Real Skills Shared by Real People
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 " style={{color:theme==='light'? 'indigo' :'white'}}>
          From coding to cooking, SkillSync is where everyday experts teach what they know — and you can too.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search skills (preview only)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-md border border-gray-300"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="all">All</option>
            <option value="teach">Teach</option>
            <option value="learn">Learn</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12" style={{color:theme==='light'? '' :'gray'}}>
          {[
            { name: 'React Basics', user: 'Grace', type: 'teach' },
            { name: 'Public Speaking', user: 'Brian', type: 'learn' },
            { name: 'Photography 101', user: 'Zara', type: 'teach' },
          ].map((skill, i) => (
            <div key={i} className={`${cardBg} p-4 rounded-lg shadow-md`}>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${skill.user}`}
                  alt={skill.user}
                  className="w-10 h-10 rounded-full border-2 border-fuchsia-500"
                />
                <div className="text-left">
                  <h4 className="font-semibold">{skill.user}</h4>
                  <p className="text-sm text-gray-400">{skill.type.toUpperCase()}</p>
                </div>
              </div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} className="text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto mb-12" style={{color:theme==='light'? '' :'gray'}}>
          <div className={`${cardBg} p-6 rounded-lg shadow-md`}>
            <p className="italic mb-2">
              “I joined SkillSync just to learn React — but I ended up teaching photography to 12 amazing people.”
            </p>
            <p className="font-semibold text-fuchsia-500">— Grace W.</p>
          </div>
        </div>

        <img
          src="https://cdn.dribbble.com/userupload/15439828/file/original-7dbb3aab6bb1831545f918f090ae4cd8.png?resize=800x0"
          alt="Skill sharing illustration"
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
    <div className="max-w-5xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 text-center ${text}`}>Browse Skills</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-md border border-gray-300"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="all">All</option>
          <option value="teach">Teach</option>
          <option value="learn">Learn</option>
        </select>
      </div>

      {/* Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredSkills.length === 0 ? (
          <p className={`text-center ${text}`}>No matching skills found.</p>
        ) : (
          filteredSkills.map((skill) => (
            <div key={skill._id} className={`${cardBg} rounded-lg p-4 shadow-md`}>
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${skill.user.name}`}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-fuchsia-500"
                />
                <div>
                  <h3 className={`font-semibold ${text}`}>{skill.user.name}</h3>
                  <p className="text-sm text-gray-400">{skill.type.toUpperCase()}</p>
                </div>
              </div>
              <h4 className={`text-lg font-bold mb-1 ${text}`}>{skill.name}</h4>
              <div className="flex items-center gap-1 mb-2">
                {renderStars(skill._id, skill.ratings)}
              </div>

              {/* Comments */}
              <CommentSection skillId={skill._id} />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
};
export default SkillList;
