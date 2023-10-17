import { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

import AuthLayout from "components/layouts/auth-layout";
import GuestLayout from "components/layouts/guest-layout";

import Login from "pages/Login";
import Dashboard from "pages/admin/Dashboard";
import Users from "pages/admin/Users/Users";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        duration={2000}
        toastOptions={{
          // Default options for specific types
          success: {
            style: {
              background: "#2e7d32",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#2e7d32",
            },
          },
          error: {
            style: {
              background: "#d32f2f",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#d32f2f",
            },
          },
        }}
      />
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<AuthLayout />}>
          <Route path="users" element={<Users />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
