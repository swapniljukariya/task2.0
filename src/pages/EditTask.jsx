import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./EditTask.css";

const EditTask = () => {
  const { tasks, updateTask } = useTasks();  // Access updateTask from context
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEditClick = (taskId, currentTitle) => {
    setEditedTaskId(taskId);
    setEditedTitle(currentTitle);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSave = (taskId) => {
    if (editedTitle.trim() !== "") {
      updateTask(taskId, editedTitle, false); // Update task with the new title
      setEditedTaskId(null); 
      toast.success("Task updated successfully!");
      navigate("/"); // Navigate back to Home after saving the task
    } else {
      toast.error("Please enter a task title."); 
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Tasks</h2>
      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {editedTaskId === task.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                  className="task-input"
                />
                <button
                  onClick={() => handleSave(task.id)}
                  className="save-button"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="view-mode">
                <span>{task.title}</span>
                <button
                  onClick={() => handleEditClick(task.id, task.title)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTask;
