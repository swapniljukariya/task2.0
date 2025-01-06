import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify"; // Toast notifications

// Create Task Context
export const TaskContext = createContext();

// Custom Hook for Consuming Context
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Count of remaining tasks
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
    toast.success("Task added!");
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted!");
  };

  const updateTaskStatus = (taskId, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const updateTaskTitle = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
    toast.success("Task updated!");
  };

  const clearAllTasks = () => {
    setTasks([]);
    toast.info("All tasks cleared!");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        remainingTasks,
        addTask,
        handleDelete,
        updateTaskStatus,
        updateTaskTitle,
        clearAllTasks,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
