import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/GlobalState';

const Home = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const card = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const headingClass = `sticky top-0 z-10 text-center text-3xl md:text-4xl font-bold py-3 bg-inherit backdrop-blur-md bg-clip-text text-transparent ${
    theme === 'light'
      ? 'bg-gradient-to-r from-purple-800 via-fuchsia-800 to-pink-800'
      : 'bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-200'
  }`;

  return (
    <div className={`${bg} ${text}`}>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-700">
          Learn. Teach. Connect.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Discover a community where everyone has something to share. Whether you're a beginner or a pro, join us to teach what you know and learn what you love.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/skills" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full">Browse Skills</Link>
          <Link to="/register" className="bg-white text-fuchsia-700 hover:bg-fuchsia-100 px-6 py-3 rounded-full">Join Now</Link>
        </div>
        <img
          src="https://cdn.dribbble.com/userupload/15439828/file/original-7dbb3aab6bb1831545f918f090ae4cd8.png?resize=800x0"
          alt="Skill sharing illustration"
          className="mt-10 w-full max-w-xl rounded-xl shadow-lg"
        />
      </section>

      {/* Why Join */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>Why Join SkillSync?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left mt-10">
          {[
            ['Learn at Your Pace', 'Pick up new skills anytime, anywhere — no classroom required.'],
            ['Teach What You Know', 'Earn recognition and even monetize your passion by teaching others.'],
            ['Build Real Connections', 'Find like-minded people to collaborate with or learn from.'],
          ].map(([title, desc], i) => (
            <div key={i} className="p-6 rounded-lg shadow-md bg-fuchsia-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className={muted}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24">
        <h2 className={headingClass}>How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-left mt-10">
          {[
            ['Create an Account', 'Sign up in seconds and set up your profile.'],
            ['Set Your Skills', 'Tell us what you want to teach or learn.'],
            ['Explore & Connect', 'Browse skills and connect with others.'],
            ['Grow Together', 'Rate, comment, and collaborate.'],
          ].map(([step, desc], i) => (
            <div key={i} className="p-6 rounded-lg shadow-md bg-fuchsia-100 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-2">{step}</h4>
              <p className={muted}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Skills */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>Popular Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {['Web Dev', 'Cooking', 'Photography', 'Public Speaking', 'Design', 'Fitness', 'Music'].map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-fuchsia-600 text-white rounded-full text-sm hover:bg-fuchsia-700 transition">
              {skill}
            </span>
          ))}
        </div>
        <img
          src="https://cdn.dribbble.com/userupload/15439830/file/original-2f3b1e6a2e1c4c6e8e3e7e6e3e6e3e6e.png?resize=800x0"
          alt="Skill categories"
          className="mt-10 w-full max-w-4xl mx-auto rounded-xl shadow-lg"
        />
      </section>

      {/* Community */}
      <section className="px-6 py-24 text-center">
        <h2 className={headingClass}>Meet the Community</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {['Grace', 'Brian', 'Amina', 'Liam', 'Zara', 'Ethan'].map((name, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${name}`}
                alt={name}
                className="w-16 h-16 rounded-full border-2 border-fuchsia-500"
              />
              <p className="mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>What People Are Saying</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mt-10">
          {[
            ['Grace W.', 'I joined SkillSync just to learn React, but I ended up teaching photography to 12 amazing people. It changed how I view community!'],
            ['Brian M.', 'The platform made it so easy to share what I know and pick up public speaking tips from someone across the globe.'],
          ].map(([name, quote], i) => (
            <div key={i} className="bg-fuchsia-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="italic mb-2">“{quote}”</p>
              <p className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className={headingClass}>Ready to get started?</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto mt-10">
          Join thousands who are teaching, learning, and building each other up — one skill at a time.
        </p>
        <Link
          to="/register"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
