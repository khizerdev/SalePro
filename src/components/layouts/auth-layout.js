import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "components/sidebar/sidebar";
import Header from "components/header/header";

const AuthLayout = () => {
  const user = useSelector((state) => state.auth);
  if (!user.user) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <div className="flex">
        <Sidebar />

        <div className="w-full bg-[#fcfcfc]">
          <Header />

          <section className=" px-3 pt-4 sm:px-6 md:px-8 lg:pl-8 ">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
