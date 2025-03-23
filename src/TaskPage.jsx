// src/TaskPage.jsx
import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import Tesseract from 'tesseract.js';
import "./App.css";
import { TaskContext } from "./taskcontext";

const TaskPage = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [scheduleFile, setScheduleFile] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  // Function to add a new task
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

  // Toggle the completion status of a task
  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Edit a task's text and due date
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

  // Parse tasks from OCR text
  const parseScheduleFromText = (ocrText) => {
    const lines = ocrText.split("\n").map(line => line.trim()).filter(Boolean);
    const parsedTasks = [];

    // Define regex patterns for course, time, and location
    const courseRegex = /^[A-Z]{4}\s?\d{4}-[A-Z0-9]+$/;
    const timeRegex = /(\d{1,2}:\d{2}\s?(am|pm))\s?[-–]\s?(\d{1,2}:\d{2}\s?(am|pm))/i;
    const locationRegex = /(KILLAM|KENNETH|LSC|MACME)[A-Z\s]*\d{3,4}/i;

    // Loop through lines to find matches
    lines.forEach((line, index) => {
      if (courseRegex.test(line)) {
        const course = line;
        let time = '';
        let location = '';

        // Look ahead for time and location within the next few lines
        for (let i = index + 1; i <= index + 4 && i < lines.length; i++) {
          if (!time && timeRegex.test(lines[i])) {
            time = lines[i].match(timeRegex)[0];
          }
          if (!location && locationRegex.test(lines[i])) {
            location = lines[i].match(locationRegex)[0];
          }
        }

        // Add the parsed task if both time and location are found
        if (time && location) {
          parsedTasks.push({
            id: Date.now() + index,
            text: course,
            due: new Date().toISOString().slice(0, 16), // Simple timestamp
            location,
          });
        }
      }
    });

    return parsedTasks;
  };

  // Handle file upload and OCR processing
  const handleUploadSchedule = async () => {
    if (!scheduleFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const { data: { text } } = await Tesseract.recognize(
        scheduleFile,
        'eng',
        { logger: m => console.log(m) }
      );

      const tasksFromOCR = parseScheduleFromText(text);
      setTasks(prevTasks => [...prevTasks, ...tasksFromOCR]);
      alert("Upload complete!");
    } catch (error) {
      console.error("OCR error:", error);
      alert("Failed to process schedule via OCR.");
    }
  };

  // Main component rendering
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
      <header className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Task Page</h1>
        <p className="text-purple-900 max-w-2xl mx-auto leading-relaxed">
          Welcome to your Task Page! Add new tasks and upload schedules.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add task section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Add a Task</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="p-3 border rounded-md w-full" />
            <input type="datetime-local" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} className="p-3 border rounded-md" />
            <button onClick={handleAddTask} className="px-4 py-2 bg-green-500 text-white rounded-md">Add Task</button>
          </div>
        </section>

        {/* Upload schedule section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Upload Class Schedule</h2>
          <input type="file" onChange={(e) => setScheduleFile(e.target.files[0])} />
          <button onClick={handleUploadSchedule} className="ml-4 p-3 bg-purple-600 text-white rounded-md">Upload</button>
        </section>

        {/* Calendar display */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <Calendar className="react-calendar p-4 rounded-md shadow-md" />
        </section>

        {/* Task list section */}
        <section className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Tasks</h2>
          {tasks.map(task => (
            <div key={task.id}>{task.text} - Due: {task.due} - Location: {task.location}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TaskPage;
