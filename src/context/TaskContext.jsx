import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";  // Importing Toastify for notifications

// Create Context
export const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TaskContext);

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true; // "all"
  });

  // Calculate remaining tasks from the full list
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  // Handle delete task function
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Handle task status change
  const updateTaskStatus = (taskId, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  // Add a new task
  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);  // Add the new task at the beginning
  };
  
  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]); // Clear the tasks
    console.log("Tasks cleared:", tasks); // Debugging
  };

  // Edit an existing task
  const editTask = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
    toast.success("Task updated successfully!");  // Display a success toast notification
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks, // Filtered tasks based on the current filter
        loading,
        error,
        remainingTasks, // Correctly calculate remaining tasks
        handleDelete,
        clearAllTasks,
        updateTaskStatus,
        setFilter,
        addTask,
        editTask,  // Exposing editTask function
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
