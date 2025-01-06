import React, { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

const TaskCard = ({ task, onDelete, onStatusChange, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editedTitle.trim() === "") {
      alert("Task title cannot be empty!");
      return;
    }
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onStatusChange(task.id, !task.completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border px-2 rounded"
          />
        ) : (
          <span className={task.completed ? "line-through" : ""}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSaveEdit} className="text-blue-500">
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500"
          >
            <RiEdit2Line />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
