// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const today = new Date();
  // Calculate Monday (if today is Sunday, treat it as last Monday)
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, etc.
  const mondayOffset = (dayOfWeek + 6) % 7; 
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  // Generate the week days array
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return day;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200 p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Dashboard</h1>
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day, index) => (
          <div key={index} className="p-4 rounded-lg text-center hover:bg-purple-50">
            <p className="text-purple-600">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <p className="text-2xl font-bold text-purple-800">{day.getDate()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
