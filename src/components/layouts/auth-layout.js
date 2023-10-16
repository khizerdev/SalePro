import Sidebar from "components/sidebar/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const user = useSelector((state) => state.user);
  if (!user.user) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <div className="flex">
        <Sidebar />

        <div className="w-full bg-[#fcfcfc]">
          <header className="z-[48] mb-6 flex w-full flex-wrap bg-white py-3  text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start">
            <nav className="mx-auto flex w-full basis-full items-center">
              <div className="ml-auto  flex w-full items-center justify-end sm:order-3 sm:justify-end sm:gap-x-3">
                <div className="hidden sm:block">
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Search"
                  />
                </div>
                <div className="flex flex-row items-center justify-end gap-2"></div>
              </div>
            </nav>
          </header>

          <section className=" px-3 pt-4 sm:px-6 md:px-8 lg:pl-8 ">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
