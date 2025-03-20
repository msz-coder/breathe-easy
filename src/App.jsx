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

const App = () => {
    return (
        <Router>
          <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Protected Routes */}
                <Route path="/tasks" element={<ProtectedRoute element={<TaskPage />} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<DashboardWithInput />} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
};

export default App;
