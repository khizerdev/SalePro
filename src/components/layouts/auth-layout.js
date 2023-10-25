import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "components/sidebar/sidebar";
import Header from "components/header/header";
import CreateProject from "components/modals/create-project";
import DeleteProject from "components/modals/delete-project";
import CreateTask from "components/modals/create-task";

const AuthLayout = () => {
  const user = useSelector((state) => state.auth);
  const sidebarOpen = useSelector((state) => state.setting.sidebarOpen);

  if (!user.user) {
    return <Navigate to="/" />;
  }

  const paddingClass = sidebarOpen ? "lg:pl-[241px]" : "lg:pl-[82px]";

  return (
    <main>
      <CreateProject />
      <DeleteProject />
      <CreateTask />

      <div className="flex">
        <Sidebar />

        <div
          className={`w-full bg-[#fcfcfc] duration-300 ${paddingClass} transition-all`}
        >
          <Header />

          <section className="px-3 py-4 sm:px-6 md:px-8">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
