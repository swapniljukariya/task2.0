// Home.js
import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import "../components/css/TaskCard.css";

const Home = () => {
  const { tasks, loading, error, updateTaskStatus, handleDelete } = useTasks();
// function  to wait api calls
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
// rendering Todo data
  return (
    <div className="task-list">
    
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={() => handleDelete(task.id)}
          onStatusChange={updateTaskStatus}  
        />
      ))}
    </div>
  );
};

export default Home;
