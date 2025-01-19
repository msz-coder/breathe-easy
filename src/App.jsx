import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import UserInput from "./userInput";
import "./index.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-input" element={<UserInput />} />
      </Routes>
    </Router>
  );
};

export default App;
