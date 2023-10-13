import { useState } from "react";
import { Gauge, ChevronLeft, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      title: "Dashboard",
      src: <Gauge size={25} />,
      link: "/dashboard",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/users",
    },
  ];

  return (
    <div className="relative flex">
      <div
        className={`border-dark-purple absolute -right-3 top-9 z-10 w-max cursor-pointer rounded-full border-2 bg-white ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      >
        <ChevronLeft />
      </div>

      <div
        className={`${
          open ? "w-60" : "w-20"
        } relative left-0 top-0 flex h-screen flex-col overflow-hidden bg-blue-700 px-4 py-6 duration-300`}
      >
        <div className="flex-none pb-6">
          <h1
            className={`origin-left cursor-pointer text-xl font-medium text-white duration-300 ${
              !open && "hidden scale-0"
            }`}
          >
            Taskly
          </h1>
          <h1
            className={`origin-left cursor-pointer text-center text-xl font-medium text-white duration-300 ${
              open ? "hidden scale-0" : "scale-120"
            }`}
          >
            T
          </h1>
        </div>

        <ul className="primary-scroll flex-1 overflow-hidden transition-all duration-300 hover:overflow-y-scroll">
          {menus.map((item, index) => (
            <Link to={item.link}>
              <li
                key={index}
                className={`hover:bg-light-white flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white`}
              >
                {item.src}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="app-sidebar-footer flex-column-auto flex-none pt-8">
          <button className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            <Download size={25} />
            <span className={`ml-2 ${!open ? "hidden" : ""}`}>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
