// Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import global CSS which includes the signup styles

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/tasks"); // Redirect after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container signup-background">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full mb-3 p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full mb-3 p-2 border"
        />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Sign Up
        </button>
        
        <p className="mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
