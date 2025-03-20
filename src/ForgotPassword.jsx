import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        {message && <p className="text-blue-600">{message}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full mb-3 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Send Reset Link</button>
        <p className="mt-2">
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Back to Login</span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
