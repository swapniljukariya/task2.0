import React from "react";

import { RiDeleteBin5Line } from "react-icons/ri";

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onStatusChange(task.id, !task.completed)}
        />
        <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
      </div>
      <button className="delete-button" onClick={() => onDelete(task.id)}>
      <RiDeleteBin5Line  size={20}/>

      </button>
    </div>
  );
};

export default TaskCard;
