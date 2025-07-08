import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const [tab, setTab] = useState('bio');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Ren',
    email: 'ren@example.com',
    location: 'Nairobi, Kenya',
    bio: 'Full-stack MERN developer, content creator, and community builder.',
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleChange = (e) =>
    setTempData({ ...tempData, [e.target.name]: e.target.value });

  const saveChanges = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const card = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const gradientText = theme === 'light'
    ? 'bg-gradient-to-r from-fuchsia-800 via-purple-800 to-pink-800'
    : 'bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-300';

  const TabButton = ({ label }) => (
    <button
      onClick={() => setTab(label.toLowerCase())}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        tab === label.toLowerCase()
          ? 'bg-fuchsia-600 text-white'
          : 'bg-white/10 text-white hover:bg-fuchsia-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={`${bg} ${text} px-6 py-16 min-h-screen`}>
      {/* Title */}
      <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent ${gradientText}`}>
        Your Profile
      </h1>

      {/* Profile Card */}
      <section className={`${card} rounded-xl shadow-md max-w-4xl mx-auto p-8`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="text-center">
            <img
              src="https://api.dicebear.com/8.x/thumbs/svg?seed=Ren"
              alt="Avatar"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-fuchsia-600 mx-auto"
            />
            <button className="text-sm text-fuchsia-600 hover:underline mt-2">Upload Photo</button>
          </div>

          {/* Info + Edit Form */}
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                />
                <input
                  name="email"
                  value={tempData.email}
                  disabled
                  className="w-full px-3 py-2 rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
                />
                <input
                  name="location"
                  value={tempData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  name="bio"
                  value={tempData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                />
                <div className="flex gap-3 mt-2">
                  <button onClick={saveChanges} className="px-4 py-2 bg-fuchsia-600 text-white rounded-full">Save</button>
                  <button onClick={cancelChanges} className="px-4 py-2 bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-full">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                <p className={muted}>{profileData.email}</p>
                <p className={muted}>{profileData.location}</p>
                <p className={`${muted} mt-2`}>{profileData.bio}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-full text-sm"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-10 text-center space-x-2">
        <TabButton label="Bio" />
        <TabButton label="Skills" />
        <TabButton label="Comments" />
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {tab === 'bio' && (
          <div className={`${card} rounded-lg p-6 shadow text-center`}>
            <p className={`${muted} max-w-xl mx-auto`}>
              {profileData.bio}
            </p>
            <p className="mt-4 text-sm text-fuchsia-500">Joined June 2024</p>
          </div>
        )}

        {tab === 'skills' && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Your Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'MongoDB', 'Tailwind', 'Node.js', 'Affiliate Marketing'].map((s, i) => (
                <span key={i} className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm hover:bg-fuchsia-700">
                  {s}
                </span>
              ))}
            </div>
            <button className="mt-6 px-4 py-2 bg-white text-fuchsia-700 hover:bg-fuchsia-100 rounded-full text-sm">
              Add a Skill
            </button>
          </div>
        )}

        {tab === 'comments' && (
          <div className="space-y-4">
            <div className={`${card} p-4 rounded-lg shadow`}>
              <p className="text-sm">
                💬 “Thanks for sharing your Vite fix — it worked on my Chakra UI setup!”
              </p>
              <p className="text-xs mt-1 text-right text-fuchsia-500">— from Amina</p>
            </div>
            <div className={`${card} p-4 rounded-lg shadow`}>
              <p className="text-sm">
                💬 “That mobile-first Tailwind config blew my mind — super clear!”
              </p>
              <p className="text-xs mt-1 text-right text-fuchsia-500">— from Brian</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
 