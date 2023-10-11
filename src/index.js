import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import App from 'App';
import Login from 'pages/Login';
import Dashboard from 'pages/admin/Dashboard';
import Layout from 'components/layouts/layout';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
