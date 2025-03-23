// src/userinput.jsx
import React, { useContext } from "react";
import ApexCharts from "react-apexcharts";
import { TaskContext } from "./taskcontext"; // Ensure you have a shared TaskContext

const DashboardWithInput = () => {
  const { tasks } = useContext(TaskContext);

  // Compute the current week (Monday to Sunday)
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, etc.
  const mondayOffset = (dayOfWeek + 6) % 7; // Calculate offset so Monday is first
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return day;
  });

  // Pie Chart Data for Task Overview
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
    <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
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

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Calendar Section */}
        <section className="col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">This Week</h2>
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day, index) => {
              // Find tasks due on this day (if tasks have due dates)
              const tasksDue = tasks.filter((t) => {
                if (!t.due) return false;
                const dueDate = new Date(t.due);
                return dueDate.toDateString() === day.toDateString();
              });
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center hover:bg-purple-50 ${
                    day.toDateString() === new Date().toDateString() ? "current-day" : ""
                  }`}
                >
                  <p className="text-purple-600">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="text-2xl font-bold text-purple-800">{day.getDate()}</p>
                  {tasksDue.length > 0 && (
                    <ul className="mt-2 text-sm text-purple-800">
                      {tasksDue.map((task) => (
                        <li
                          key={task.id}
                          className={task.completed ? "line-through" : ""}
                        >
                          {task.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Task Overview Chart Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Task Overview</h2>
          <ApexCharts options={chartOptions} series={chartSeries} type="pie" width="100%" />
        </section>

        {/* Task List Section */}
        <section className="col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">All Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                  task.completed ? "bg-purple-50" : "hover:bg-purple-100"
                }`}
              >
                <span
                  className={`text-purple-800 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                {task.due && (
                  <span className="text-sm text-purple-600">
                    Due: {new Date(task.due).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardWithInput;
