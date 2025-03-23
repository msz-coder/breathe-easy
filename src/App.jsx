// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import DashboardWithInput from "./userInput";
import TaskPage from "./TaskPage";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import "./index.css";
import { TaskProvider } from "./taskcontext";

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Protected Routes */}
          <Route path="/tasks" element={<ProtectedRoute element={<TaskPage />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardWithInput />} />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
};

export default App;
