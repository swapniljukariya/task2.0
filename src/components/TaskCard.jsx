import React from "react";
import "./css/TaskCard.css";
import { toast } from "react-toastify"; 

/*  A indivisual card that will take  data from context array and will dispaly Cards */

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const handleCheckboxChange = () => {
    onStatusChange(task.id, !task.completed);
    toast.success(task.completed ? "Task marked as Pending!" : "Task completed!"); 
  };
  // Toast for task deletion 
  const handleDelete = () => {
    onDelete(task.id);
    toast.success("Task deleted successfully!"); 
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={task.completed} 
          onChange={handleCheckboxChange} 
        />
        <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
      </div>
      <div className="task-card-footer">
        <span className={`task-status ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
