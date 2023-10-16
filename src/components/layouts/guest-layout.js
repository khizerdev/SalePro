import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestLayout = () => {
  const user = useSelector((state) => state.user);
  if (user.user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <main className="flex h-[100vh] items-center justify-center bg-gray-100">
      <div className="mx-auto mt-7 flex w-1/3 flex-col justify-center rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 sm:p-7">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default GuestLayout;
