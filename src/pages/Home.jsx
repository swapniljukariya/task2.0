import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify";

const Home = () => {
  const {
    tasks,
    handleDelete,
    updateTaskStatus,
    updateTaskTitle,
    remainingTasks,
    setFilter,
    clearAllTasks,
    addTask,
  } = useTasks();

  const [taskInput, setTaskInput] = useState("");
  const [filter, setLocalFilter] = useState("all");

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }
    addTask({ id: Date.now(), title: taskInput, completed: false });
    setTaskInput("");
  };

  const handleFilterChange = (newFilter) => {
    setLocalFilter(newFilter);
    setFilter(newFilter);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Task List</h1>

      {/* Add Task Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          <AiOutlinePlus />
        </button>
      </div>

      {/* Filter and Clear All */}
      <div className="flex text-xs justify-between  items-center mb-4">
        <span>{remainingTasks} task{remainingTasks !== 1 && "s"} left</span>
        <div className="flex gap-2">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded ${
                filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={clearAllTasks}
          className="text-red-500 text-xs hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Task List */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-center">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={updateTaskStatus}
              onEdit={updateTaskTitle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
