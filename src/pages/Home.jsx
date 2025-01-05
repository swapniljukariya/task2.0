import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify"; // Import Toastify
import "./Home.css";

const Home = () => {
  const {
    tasks,
    handleDelete,
    updateTaskStatus,
    remainingTasks,
    setFilter,
    clearAllTasks, // Use the function from context
  } = useTasks();
  const [filter, setLocalFilter] = useState("all");

  // Filter change handler
  const handleFilterChange = (newFilter) => {
    setLocalFilter(newFilter);
    setFilter(newFilter); // Update filter in the context
  };

  // Delete with Toast
  const handleDeleteWithToast = (taskId) => {
    handleDelete(taskId);
    toast.success("Task deleted successfully!");
  };

  // Status change with Toast
  const handleStatusChangeWithToast = (taskId, status) => {
    updateTaskStatus(taskId, status);
    toast.info(status ? "Task marked as completed!" : "Task marked as active!");
  };

  // Clear all tasks handler
  const handleClearAll = () => {
    clearAllTasks(); // Call clearAllTasks from TaskContext
    toast.info("All tasks cleared!"); // Toast feedback
  };

  return (
    <div className="home-container">
      <h1>Task List</h1>
      <div className="top-bar">
        <div className="remaining-tasks">
          <span>
            {remainingTasks} task{remainingTasks !== 1 ? "s" : ""} left
          </span>
        </div>
        <div className="filter-bar">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === "active" ? "active" : ""}`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </button>
          <button
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>
        <button className="clear-all-button" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteWithToast}
            onStatusChange={handleStatusChangeWithToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
