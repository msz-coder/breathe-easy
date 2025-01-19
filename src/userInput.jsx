import React, { useState } from "react";
import ApexCharts from "react-apexcharts";

const DashboardWithInput = () => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning Meditation", time: "9:00 AM", completed: true },
    { id: 2, text: "Yoga Session", time: "2:00 PM", completed: false },
    { id: 3, text: "Evening Journal", time: "8:00 PM", completed: false },
  ]);
  const [speechText, setSpeechText] = useState(""); // For speech input
  const [listening, setListening] = useState(false); // To track speech recognition state

  const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleAddTask = (task) => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task, time: "Anytime", completed: false },
      ]);
    }
  };

  const handleTextChange = (e) => setInputText(e.target.value);

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpeechText(transcript);
      handleAddTask(transcript); // Add speech input as a task
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const chartOptions = {
    chart: { type: "pie" },
    labels: ["Completed", "Pending"],
    colors: ["#34D399", "#F87171"],
    legend: { position: "bottom" },
  };

  const chartSeries = [
    tasks.filter((task) => task.completed).length,
    tasks.filter((task) => !task.completed).length,
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
        {/* Header */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md mb-8">
          <h1 className="text-2xl font-bold text-purple-800">Peaceful Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-purple-100">
              <i className="fa-regular fa-bell text-purple-700"></i>
            </button>
            <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                className="w-10 h-10 rounded-full"
                alt="Profile"
            />
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <section className="col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">This Week</h2>
            <div className="grid grid-cols-7 gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div
                      key={index}
                      className={`p-4 rounded-lg text-center ${
                          index === 0 ? "bg-purple-100" : "hover:bg-purple-50"
                      }`}
                  >
                    <p className="text-purple-600">{day}</p>
                    <p className="text-2xl font-bold text-purple-800">{15 + index}</p>
                  </div>
              ))}
            </div>
          </section>

          {/* Task Completion Chart */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">Task Overview</h2>
            <ApexCharts options={chartOptions} series={chartSeries} type="pie" width="100%" />
          </section>

          {/* Task List */}
          <section className="col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">Today's Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                  <div
                      key={task.id}
                      className={`flex items-center p-3 rounded-lg shadow-sm ${
                          task.completed ? "bg-purple-50" : "hover:bg-purple-100"
                      }`}
                  >
                    <i
                        className={`fa-regular ${
                            task.completed ? "fa-circle-check" : "fa-circle"
                        } text-purple-600 cursor-pointer`}
                        onClick={() => toggleTaskCompletion(task.id)}
                    ></i>
                    <span className={`ml-4 text-purple-800 ${task.completed ? "line-through" : ""}`}>
                  {task.text}
                </span>
                    <span className="ml-auto text-sm text-purple-600">{task.time}</span>
                  </div>
              ))}
            </div>
          </section>

          {/* Add Task */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">Add a Task</h2>
            <div className="space-y-6">
              {/* Text Input */}
              <div className="flex gap-3">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleTextChange}
                    placeholder="New task..."
                    className="flex-grow p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                    onClick={() => {
                      handleAddTask(inputText);
                      setInputText("");
                    }}
                    className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              {/* Speech Input */}
              <div>
                <button
                    onClick={startListening}
                    className={`w-full px-4 py-2 rounded-lg text-white font-medium ${
                        listening
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={listening}
                >
                  {listening ? "Listening..." : "Start Speaking"}
                </button>
                {speechText && (
                    <p className="mt-4 text-gray-700">
                      <strong>Recognized Speech:</strong> {speechText}
                    </p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
  );
};

export default DashboardWithInput;
