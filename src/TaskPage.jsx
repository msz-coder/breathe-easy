// src/TaskPage.jsx
import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import "./App.css";
import { TaskContext } from "./taskcontext";

const TaskPage = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [scheduleFile, setScheduleFile] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        due: newDueDate,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDueDate("");
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((t) => t.id === taskId);
    const newText = prompt("Edit Task", taskToEdit.text);
    const newDue = prompt("Edit Due Date (YYYY-MM-DDTHH:MM)", taskToEdit.due);
    if (newText && newText.trim() !== "") {
      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, text: newText, due: newDue } : t
        )
      );
    }
  };

  const parseScheduleFromText = (ocrText) => {
    const cleanedText = ocrText
      .replace(/[–—]/g, "-")
      .replace(/\./g, "-")
      .replace(/L['`’]?SC/gi, "LSC")
      .replace(/CS[C|c]I|CSC1|ESC1|ESC/gi, "CSCI")
      .replace(/EC0N|ECON1|ECQN/gi, "ECON")
      .replace(/MGMT|MGMT1|MGNT/gi, "MGMT")
      .replace(/ANAT|AN4T|ANVT/gi, "ANAT")
      .replace(/INFO|1NFO|INFD|INPO/gi, "INFO")
      .replace(/Z1Z2|ZIZ2/gi, "2122")
      .replace(/\s{2,}/g, " ")
      .toUpperCase();

    const lines = cleanedText.split("\n").map(line => line.trim()).filter(Boolean);
    const parsedTasks = [];

    const courseRegex = /(CSCI|ECON)\s?\d{3,4}[-]?[A-Z0-9]{0,3}/i;
    const timeRegex = /\d{1,2}:\d{2}\s?(AM|PM)?\s?[-]?\s?\d{1,2}:\d{2}\s?(AM|PM)?/i;
    const locationRegex = /(KILLAM|KENNETH|LSC)[A-Z\s\.'-]*\d{3,4}/i;

    const getNextDateForWeekday = (weekday) => {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const targetIndex = weekdays.indexOf(weekday);
      if (targetIndex === -1) return new Date().toISOString().slice(0, 16);

      const today = new Date();
      const dayOffset = (targetIndex + 7 - today.getDay()) % 7 || 7;
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + dayOffset);
      return targetDate.toISOString().slice(0, 16);
    };

    for (let i = 0; i < lines.length; i++) {
      const courseLine = lines[i];
      const courseMatch = courseLine.match(courseRegex);

      if (courseMatch) {
        const course = courseMatch[0].replace(/\s+/, " ");
        let time = "";
        let location = "";
        let weekday = "TBA";

        for (let j = i + 1; j <= i + 6 && j < lines.length; j++) {
          if (!time) {
            const potentialTime = lines[j].replace(/\./g, "-").replace(/(\d{1,2}:\d{2})\s?(\d{1,2}:\d{2})/, "$1 - $2");
            const timeMatch = potentialTime.match(timeRegex);
            if (timeMatch) time = timeMatch[0];
          }

          if (!location && locationRegex.test(lines[j])) {
            const locMatch = lines[j].match(locationRegex);
            if (locMatch) location = locMatch[0];
          }

          if (time && location) break;
        }

        const surrounding = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 6)).join(" ");
        const weekdayMatch = surrounding.match(/MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY/i);
        if (weekdayMatch) {
          weekday = weekdayMatch[0].charAt(0).toUpperCase() + weekdayMatch[0].slice(1).toLowerCase();
        }

        const dueDate = getNextDateForWeekday(weekday);

        parsedTasks.push({
          id: Date.now() + parsedTasks.length,
          text: course,
          time: time || "TBA",
          location: location || "TBA",
          weekday,
          due: dueDate,
          completed: false,
        });
      }
    }

    return parsedTasks;
  };

  const handleUploadSchedule = async () => {
    if (!scheduleFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(scheduleFile, "eng", {
        logger: (m) => console.log(m),
      });

      console.log("📄 Raw OCR Text:\n", text);

      const tasksFromOCR = parseScheduleFromText(text);
      if (tasksFromOCR.length === 0) {
        alert("No courses were detected. Try a clearer screenshot.");
      } else {
        setTasks((prevTasks) => [...prevTasks, ...tasksFromOCR]);
        alert("Schedule uploaded successfully!");
      }
    } catch (error) {
      console.error("OCR error:", error);
      alert("Failed to process schedule via OCR.");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
      <header className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Task Page</h1>
        <p className="text-purple-900 max-w-2xl mx-auto leading-relaxed">
          Welcome to your Task Page! Add new tasks and upload schedules.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Task Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Add a Task</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="p-3 border rounded-md w-full"
            />
            <input
              type="datetime-local"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="p-3 border rounded-md"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add Task
            </button>
          </div>
        </section>

        {/* Upload Schedule Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Upload Class Schedule</h2>
          <input
            type="file"
            onChange={(e) => setScheduleFile(e.target.files[0])}
          />
          <button
            onClick={handleUploadSchedule}
            className="ml-4 p-3 bg-purple-600 text-white rounded-md"
          >
            Upload
          </button>
        </section>

        {/* Calendar */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <Calendar className="react-calendar p-4 rounded-md shadow-md" />
        </section>

        {/* Tasks Display */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`border p-4 mb-3 rounded-md shadow-sm bg-gray-50 ${task.completed ? "opacity-70 line-through" : ""}`}
              >
                <div className="font-semibold text-purple-800 flex justify-between items-center">
                  <span>
                    {task.text}
                    {task.weekday && (
                      <span className="text-sm text-gray-600 ml-2">({task.weekday})</span>
                    )}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="px-2 py-1 bg-yellow-300 text-sm rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`px-2 py-1 text-sm rounded ${
                        task.completed ? "bg-green-400" : "bg-gray-300"
                      }`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                  </div>
                </div>
                <div>Time: {task.time}</div>
                <div>Location: {task.location}</div>
                <div>Due: {task.due}</div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default TaskPage;
