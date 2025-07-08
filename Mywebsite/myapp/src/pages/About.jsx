import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/GlobalState';

const About = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === 'light'
    ? 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100'
    : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';

  const text = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const muted = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const card = theme === 'light' ? 'bg-white' : 'bg-gray-800';

  const headingClass = `sticky top-0 z-10 text-center text-3xl md:text-4xl font-bold py-4 bg-inherit backdrop-blur-md bg-clip-text text-transparent ${
    theme === 'light'
      ? 'bg-gradient-to-r from-purple-800 via-fuchsia-800 to-pink-800'
      : 'bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-200'
  }`;

  return (
    <div className={`${bg} ${text}`}>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-700">
          About SkillSync
        </h1>
        <p className="text-lg md:text-xl max-w-3xl">
          SkillSync is more than a platform — it’s a growing movement of curious learners and generous teachers across the globe. Together, we’re unlocking the power of shared knowledge and building a future fueled by skills.
        </p>
        <div className="mt-10 w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ckjhLw8CgmI"
            title="Skillshare Review: Everything You Need to Know"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Our Journey */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>Our Journey</h2>
        <div className="max-w-4xl mx-auto mt-10 space-y-10 text-lg leading-relaxed">
          <div className="border-l-4 border-fuchsia-500 pl-6">
            <h3 className="font-semibold text-xl mb-1">2022 — The Spark</h3>
            <p className={muted}>A late-night conversation about overpriced courses sparked the idea of peer-powered learning.</p>
          </div>
          <div className="border-l-4 border-fuchsia-500 pl-6">
            <h3 className="font-semibold text-xl mb-1">2023 — The Prototype</h3>
            <p className={muted}>We launched a simple MVP shared among 20 friends. Feedback was raw, but the energy was real.</p>
          </div>
          <div className="border-l-4 border-fuchsia-500 pl-6">
            <h3 className="font-semibold text-xl mb-1">2024 — The Community</h3>
            <p className={muted}>Thousands joined. Skills were exchanged. Friendships formed. The mission became a movement.</p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="px-6 py-24">
        <h2 className={headingClass}>What We Believe</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10 text-left">
          {[
            ['🎯 Mission', 'To make teaching and learning skills free, accessible, and fun — powered by people.'],
            ['🌍 Vision', 'A world where knowledge flows in every direction, across borders, devices, and generations.'],
            ['💡 Values', 'Curiosity, authenticity, collaboration, and inclusion guide every decision we make.'],
          ].map(([label, desc], i) => (
            <div key={i} className="p-6 rounded-xl shadow-md bg-fuchsia-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-3">{label}</h3>
              <p className={muted}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>The People Behind It</h2>
        <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-3 gap-6 text-center">
          {[
            ['Ren', 'Full-Stack Developer & Creator', 'https://api.dicebear.com/8.x/thumbs/svg?seed=Ren'],
            ['Ali', 'Community Growth Strategist', 'https://api.dicebear.com/8.x/thumbs/svg?seed=Ali'],
            ['Joy', 'UI/UX Designer & Brand Architect', 'https://api.dicebear.com/8.x/thumbs/svg?seed=Joy'],
          ].map(([name, role, avatar], i) => (
            <div key={i} className="flex flex-col items-center bg-fuchsia-100 dark:bg-gray-800 p-6 rounded-lg shadow">
              <img src={avatar} alt={name} className="w-20 h-20 rounded-full border-2 border-fuchsia-500 mb-4" />
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm mt-1">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Impact */}
      <section className="px-6 py-24 text-center">
        <h2 className={headingClass}>Where We’re Making Waves</h2>
        <p className="max-w-2xl mx-auto text-lg mb-10">
          From Nairobi to New York, SkillSyncers are sharing skills across borders. Our map is growing — and you’re part of it.
        </p>
        <img
          src="https://cdn.dribbble.com/userupload/15439832/file/original-1e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e.png?resize=1200x0"
          alt="Global impact map"
          className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
        />
      </section>

      {/* Quotes */}
      <section className={`${card} px-6 py-24`}>
        <h2 className={headingClass}>Voices from the Community</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {[
            ['“I taught my first coding class on SkillSync — and now I’m mentoring 5 students across 3 countries.”', '— Amina, Kenya'],
            ['“I never thought I’d be teaching photography online. SkillSync made it feel natural and fun.”', '— Leo, Canada'],
          ].map(([quote, name], i) => (
            <div key={i} className="bg-fuchsia-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="italic mb-2">{quote}</p>
              <p className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className={headingClass}>Join the Movement</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          SkillSync isn’t built by a company — it’s built by people like you. Every lesson shared, every comment posted, every connection made moves us closer to a world of open learning.
        </p>
        <Link
          to="/register"
          className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Become a SkillSyncer
        </Link>
      </section>
    </div>
  );
};

export default About;
