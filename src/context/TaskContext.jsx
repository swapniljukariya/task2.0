// TaskContext.js
import { createContext, useState, useContext, useEffect } from "react";

// Create Context
export const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TaskContext);

// TaskProvider component to provide the state to the app
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setTasks([]); // Optionally clear tasks on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);



  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);  // Ensure the new task is added to the existing array
  };


  // Update task completion status
  const updateTask = (taskId, updatedTitle, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, completed } 
          : task
      )
    );
  };
  // Handle delete task function
  const handleDelete = (taskId) => {
    console.log(`Deleting task with id: ${taskId}`);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

// handling cheackbox function
  const updateTaskStatus = (taskId, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed } 
          : task
      )
    );
  };

  // providing values of the   context to the entire app
  return (
    <TaskContext.Provider value={{ tasks, loading, error,updateTask  , handleDelete , addTask, updateTaskStatus}}>
      {children}
    </TaskContext.Provider>
  );
};
