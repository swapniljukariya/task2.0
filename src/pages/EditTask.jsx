import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { RiEdit2Line } from "react-icons/ri";  // Edit icon
import { toast } from "react-toastify";  // Toastify for notifications
import "react-toastify/dist/ReactToastify.css";  // Include the toastify CSS
import "./EditTask.css";  // Add custom styling

const EditTask = () => {
  const { tasks, editTask } = useTasks();  // Access editTask from context
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleEditClick = (taskId, currentTitle) => {
    setEditedTaskId(taskId);
    setEditedTitle(currentTitle);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSave = (taskId) => {
    if (editedTitle.trim() !== "") {
      editTask(taskId, editedTitle);  // Call editTask to update task title
      setEditedTaskId(null);
    } else {
      toast.error("Please enter a task title.");  // Show error if title is empty
    }
  };

  return (
    <div className="edit-task-container">
      <h1 className="title">Edit Todo</h1>

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
                <div className="task-card-header">
                  <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
                  <button
                    onClick={() => handleEditClick(task.id, task.title)}
                    className="edit-button"
                  >
                    <RiEdit2Line size={20} />  {/* Edit icon */}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditTask;
