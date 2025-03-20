import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before login attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tasks"); // Redirect on successful login
    } catch (err) {
      // Handle specific Firebase authentication errors
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email. Please sign up.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format. Please enter a valid email.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Try again later.");
          break;
        default:
          setError("Login failed. Please check your credentials and try again.");
          break;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
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
        <p className="mt-2">
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
        </span>
        </p>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
        <p className="mt-2">
          Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
