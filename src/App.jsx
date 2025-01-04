import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer 
import Layout from './components/Layout';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'add-task',
        element: <AddTask />,
      },
      {
        path: 'edit-task',
        element: <EditTask />,
      },
    ],
  },
]);

const App = () => (
  <TaskProvider>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} />
  </TaskProvider>
);

export default App;
