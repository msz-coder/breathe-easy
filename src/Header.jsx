// Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

const Header = () => {
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
    <header className="fixed w-full bg-white/70 backdrop-blur-md z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-spa text-blue-600 text-2xl"></i>
          <span
            className="text-2xl font-bold text-blue-700 cursor-pointer"
            onClick={() => navigate("/")}
          >
            PLAN IT!
          </span>
        </div>

        {/* Navigation Links */}
        {user ? (
          <div className="flex space-x-8">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/tasks")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Tasks
            </button>
            <button
              onClick={() => navigate("/recommendations")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Recommendations
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        )}

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
