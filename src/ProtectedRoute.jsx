import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";

const ProtectedRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking auth state
  }

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
