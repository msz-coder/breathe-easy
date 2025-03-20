// src/components/TaskPage.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./App.css"; 

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

    // Replace with the real API URL
    const apiURL = "https://your-api.com/upload-schedule";
    const formData = new FormData();
    formData.append("schedule", scheduleFile);

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // Assume the API returns events in a suitable format
      setCalendarEvents(data.events);
    } catch (error) {
      console.error("Error uploading schedule:", error);
      alert("Failed to upload schedule.");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
      {/* Page Header */}
      <header className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Task Page</h1>
        <p className="text-purple-900 max-w-2xl mx-auto leading-relaxed">
          Welcome to your Task Page! Here, you can add new tasks, and also upload a file
          (such as a class schedule) to have its events automatically imported into your
          calendar. Simply choose a file below and click <em>Upload</em> — it's that easy!
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Task Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Add a Task</h2>
          <input
            type="text"
            placeholder="Enter a new task"
            className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask(e.target.value);
                e.target.value = ""; // Clear input
              }
            }}
          />
        </section>

        {/* Upload Schedule Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Upload Class Schedule</h2>
          <div className="flex gap-4 items-center">
            {/* Custom 'Choose File' button + hidden input */}
            <label className="cursor-pointer bg-white rounded-md font-medium text-purple-700 hover:text-purple-500 border border-purple-300 px-4 py-2 shadow-sm">
              Choose File
              <input
                type="file"
                onChange={(e) => setScheduleFile(e.target.files[0])}
                className="sr-only" // Hides the real file input
              />
            </label>
            {/* Display selected file name */}
            <span className="text-gray-600">
              {scheduleFile ? scheduleFile.name : "No file chosen"}
            </span>
            {/* Upload button */}
            <button
              onClick={handleUploadSchedule}
              className="p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Upload
            </button>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Calendar</h2>
          <Calendar
            tileContent={({ date }) => {
              const event = calendarEvents.find(
                (evt) => new Date(evt.date).toDateString() === date.toDateString()
              );
              return event ? (
                <p className="text-sm text-purple-500">{event.title}</p>
              ) : null;
            }}
            className="react-calendar p-4 rounded-md shadow-md"
          />
        </section>

        {/* Task List */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Task List</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center p-4 rounded-lg shadow-sm ${
                  task.completed ? "bg-purple-50" : "hover:bg-purple-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                  className="mr-4"
                />
                <span
                  className={`flex-grow text-purple-800 ${
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
    </div>
  );
};

export default TaskPage;
