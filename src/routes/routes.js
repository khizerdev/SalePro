import { Navigate, Outlet } from "react-router-dom";

import AuthLayout from "components/layouts/auth-layout";
import GuestLayout from "components/layouts/guest-layout";

import Login from "pages/Login";

import Dashboard from "pages/admin/Dashboard";
import Users from "pages/admin/Users/Users";

const routes = (isLoggedIn) => [
  {
    path: "/dashboard",
    element: isLoggedIn ? <AuthLayout /> : <Navigate to="/" />,
    children: [
      { path: "userss", element: <Users /> },
      { path: "account", element: <Users /> },
      { path: "admin", element: <Navigate to="/dashboard" /> },
      {
        path: "member",
        element: <Outlet />,
        children: [
          { path: "create-users", element: <Users /> },
          { path: "add-users", element: <Users /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <GuestLayout /> : <Navigate to="/dashboard" />,
    children: [{ path: "login", element: <Login /> }],
  },
];

export default routes;
