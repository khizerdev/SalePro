import { useEffect, lazy, Suspense } from "react";

import { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

import AuthLayout from "components/layouts/auth-layout";
import GuestLayout from "components/layouts/guest-layout";
import { actionCreators } from "store";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import Login from "pages/Login";

const Dashboard = lazy(() => import("pages/admin/Dashboard"));
const Users = lazy(() => import("pages/admin/Users/Users"));
const Projects = lazy(() => import("pages/admin/Projects/Projects"));

const App = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    actions.CLOSE_MODAL();
  }, []);

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
          <Route
            path="users"
            element={
              <Suspense fallback={null}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={null}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={null}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
