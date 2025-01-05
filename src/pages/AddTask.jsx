import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Import the required styles
import './AddTask.css';
import { MdAdd } from "react-icons/md";


const AddTask = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = { 
        id: new Date().getTime(),  // Generate a unique id based on the current time
        title: taskName,
        completed: false 
      };
      addTask(newTask);  // Add the task to the global state
      toast.success('Task added successfully!');  
      setTaskName('');  // Reset input field
      navigate('/');  // Navigate back to Home after adding task
    } else {
      toast.error('Please enter a task name.');  
    }
  };

  return (
    <div className="add-task-container">
      <h1 className="add-task-header">Add a New Task</h1>
      <form className="task-form">
        <input
          type="text"
          value={taskName}
          onChange={handleInputChange}
          placeholder="Enter task name"
          className="task-input"
        />
        <button type="button" onClick={handleAddTask} className="task-button">
        <MdAdd className="add-icon" /> 
        </button>
      </form>

      <div className="task-image-container">
        <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" alt="Add Task" className="task-image" />
      </div>
    </div>
  );
};

export default AddTask;
