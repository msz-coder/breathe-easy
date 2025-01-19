// src/components/TaskPage.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";


const TaskPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [scheduleFile, setScheduleFile] = useState(null);
    const [calendarEvents, setCalendarEvents] = useState([]);

    const handleAddTask = (task) => {
        if (task.trim()) {
            setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
        }
    };

    const handleUploadSchedule = async () => {
        if (!scheduleFile) {
            alert("Please select a file to upload.");
            return;
        }

        // Replace with your API URL
        const apiURL = "https://your-api.com/upload-schedule";

        const formData = new FormData();
        formData.append("schedule", scheduleFile);

        try {
            const response = await fetch(apiURL, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setCalendarEvents(data.events); // Assume API returns events in a suitable format
        } catch (error) {
            console.error("Error uploading schedule:", error);
            alert("Failed to upload schedule.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 text-gray-800 min-h-screen flex flex-col">
            {/* Header */}
            <header className="fixed w-full bg-white/70 backdrop-blur-md z-50 shadow-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-spa text-blue-600 text-2xl"></i>
                        <span className="text-2xl font-bold text-blue-700">Breathe Easy</span>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => navigate("/")}
                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate("/tasks")}
                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                        >
                            Tasks
                        </button>
                        <button
                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                        >
                            Stress Assessments
                        </button>
                        <button
                            className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                        >
                            Recommendations
                        </button>
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

            {/* Main Content */}
            <main className="mt-20 container mx-auto px-6 py-8 flex-grow">
                <h1 className="text-4xl font-bold text-blue-700 mb-8">Task Management</h1>

                {/* Add Task Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add a Task</h2>
                    <input
                        type="text"
                        placeholder="Enter a new task"
                        className="p-3 border rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddTask(e.target.value);
                        }}
                    />
                </section>

                {/* Upload Schedule */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Upload Class Schedule</h2>
                    <div className="flex gap-4">
                        <input
                            type="file"
                            onChange={(e) => setScheduleFile(e.target.files[0])}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleUploadSchedule}
                            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Upload
                        </button>
                    </div>
                </section>

                {/* Calendar */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Calendar</h2>
                    <Calendar
                        tileContent={({ date }) => {
                            const event = calendarEvents.find(
                                (event) => new Date(event.date).toDateString() === date.toDateString()
                            );
                            return event ? <p className="text-sm text-blue-500">{event.title}</p> : null;
                        }}
                        className="rounded-md shadow-lg p-4"
                    />
                </section>

                {/* Task List */}
                <section>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Task List</h2>
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center p-4 rounded-lg shadow-sm bg-white hover:bg-blue-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                        setTasks(
                                            tasks.map((t) =>
                                                t.id === task.id ? { ...t, completed: !t.completed } : t
                                            )
                                        )
                                    }
                                    className="mr-4"
                                />
                                <span
                                    className={`flex-grow text-blue-800 ${
                                        task.completed ? "line-through" : ""
                                    }`}
                                >
                  {task.text}
                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-blue-600">&copy; 2025 Breathe Easy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TaskPage;
