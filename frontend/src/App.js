import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store/auth';

import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id) {
      dispatch(authActions.login());
    }
    setIsLoading(false);

    // Mock task data
    setTasks([
      { id: 1, title: 'Task 1', description: 'Description 1', category: 'work', priority: 'high', completed: false, deadline: '2023-06-30', reminder: '2023-06-29', tags: ['important', 'urgent'], subtasks: [], notes: '', shared: [], recurrence: 'daily' },
      { id: 2, title: 'Task 2', description: 'Description 2', category: 'personal', priority: 'medium', completed: true, deadline: '2023-07-15', reminder: '2023-07-14', tags: ['home'], subtasks: [], notes: '', shared: [], recurrence: 'weekly' },
    ]);
  }, [dispatch]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to="/login" />}>
          <Route index element={<AllTasks tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask} darkMode={darkMode} />} />
          <Route path="importantTasks" element={<ImportantTasks tasks={tasks.filter(task => task.priority === 'high')} updateTask={updateTask} deleteTask={deleteTask} darkMode={darkMode} />} />
          <Route path="completedTasks" element={<CompletedTasks tasks={tasks.filter(task => task.completed)} updateTask={updateTask} deleteTask={deleteTask} darkMode={darkMode} />} />
          <Route path="incompletedTasks" element={<IncompletedTasks tasks={tasks.filter(task => !task.completed)} updateTask={updateTask} deleteTask={deleteTask} darkMode={darkMode} />} />
        </Route>
        <Route path="/signup" element={<Signup darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
      </Routes>
    </div>
  );
};

export default App;

