import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import sea from "./sea.jpg"; // Adjust the path as necessary

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/70 backdrop-blur-md z-50 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-spa text-blue-600 text-2xl"></i>
            <span className="text-2xl font-bold text-blue-700">PLANIT!</span>
          </div>

          {/* Conditional Navigation */}
          <div className="flex space-x-4">
            {user ? (
              <button onClick={handleLogout} className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md">
                Logout
              </button>
            ) : (
              <button onClick={() => navigate("/login")} className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md">
                Get Started
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[800px] flex items-center justify-center text-center text-white">
        <img src={sea} alt="Peaceful meditation background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">SCAN IT, PLANIT, NAIL IT!</h1>
          <p className="text-xl md:text-2xl font-sans mb-8">Begin your journey to mindfulness and tranquility with our stress management tools.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!user ? (
              <button onClick={() => navigate("/login")} className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-sans">
                Start Your Journey
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/dashboard")} className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-sans">
                  Dashboard
                </button>
                <button onClick={() => navigate("/tasks")} className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-sans">
                  Go to Tasks
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-blue-800 mb-16">Find Balance in Your Daily Life</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <Feature icon="fa-moon" title="Better Sleep" description="Learn to manage your stress and sleep your very best." />
            <Feature icon="fa-heart" title="Stress Relief" description="Learn techniques to manage stress and anxiety effectively." />
            <Feature icon="fa-brain" title="Mindfulness" description="Practice mindfulness exercises for mental clarity and focus." />
          </div>
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
