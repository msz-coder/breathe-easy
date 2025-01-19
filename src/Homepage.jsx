// src/components/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import sea from "./sea.jpg"; // Adjust the path as necessary

const HomePage = () => {
  const navigate = useNavigate();

  return (
      <div
          className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 text-gray-800 min-h-screen flex flex-col"
      >
        {/* Header */}
        <header
            className="fixed w-full bg-white/70 backdrop-blur-md z-50 shadow-md"
        >
          <nav
              className="container mx-auto px-6 py-4 flex justify-between items-center"
          >
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-spa text-blue-600 text-2xl"></i>
              <span className="text-2xl font-bold text-blue-700">
              Breathe Easy
            </span>
            </div>

            {/* Links */}
            <div className="hidden md:flex space-x-8">
              <a
                  href="#home"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
              >
                Home
              </a>
              <button
                  onClick={() => navigate("/tasks")}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
              >
                Tasks
              </button>
              <a
                  href="#assessments"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
              >
                Stress Assessments
              </a>
              <a
                  href="#recommendations"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
              >
                Recommendations
              </a>
            </div>

            {/* Button */}
            <button
                onClick={() => navigate("/user-input")}
                className="hidden sm:block px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </button>

            {/* Mobile Menu Icon */}
            <button className="md:hidden flex items-center text-blue-600 text-2xl">
              <i className="fa-solid fa-bars"></i>
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section
            id="hero"
            className="relative h-[800px] flex items-center justify-center text-center text-white"
        >
          <img
              src={sea}
              alt="Peaceful meditation background"
              className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
          <div className="relative z-10 max-w-2xl px-6">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Breathe Easy, Live Better
            </h1>
            <p className="text-xl md:text-2xl font-sans mb-8">
              Begin your journey to mindfulness and tranquility with our stress
              management tools.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                  onClick={() => navigate("/user-input")}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-sans"
              >
                Start Your Journey
              </button>
              <button
                  onClick={() => navigate("/tasks")}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-sans"
              >
                Go to Tasks
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl text-blue-800 mb-16">
              Find Balance in Your Daily Life
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <Feature
                  icon="fa-moon"
                  title="Better Sleep"
                  description="Learn to manage your stress and sleep your very best."
              />
              <Feature
                  icon="fa-heart"
                  title="Stress Relief"
                  description="Learn techniques to manage stress and anxiety effectively."
              />
              <Feature
                  icon="fa-brain"
                  title="Mindfulness"
                  description="Practice mindfulness exercises for mental clarity and focus."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-b from-transparent to-white/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl text-blue-800 mb-6">
              Start Your Journey to Inner Peace
            </h2>
            <p className="text-xl text-blue-700 mb-8">
              Join thousands of others who have found their path to tranquility.
            </p>
            <button
                onClick={() => navigate("/tasks")}
                className="px-10 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg"
            >
              View Tasks
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-blue-600">&copy; 2025 Breathe Easy. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
};

const Feature = ({ icon, title, description }) => (
    <div className="text-center p-8 rounded-xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
      <i className={`fa-solid ${icon} text-4xl text-blue-600 mb-4`}></i>
      <h3 className="text-2xl text-blue-800 mb-4">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </div>
);

export default HomePage;
