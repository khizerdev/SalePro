import {
  Gauge,
  ChevronLeft,
  Users2,
  Download,
  GanttChartSquare,
} from "lucide-react";

import MenuItem from "components/sidebar/menu-item";

import { actionCreators } from "store";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.setting.sidebarOpen);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const menus = [
    {
      title: "Dashboard",
      src: <Gauge size={25} />,
      link: "/dashboard",
      name: "dashboard",
    },
    {
      title: "Users",
      src: <Users2 size={25} />,
      link: "/dashboard/users",
      name: "dashboard/users",
    },
    {
      title: "Projects",
      src: <GanttChartSquare size={25} />,
      link: "/dashboard/projects",
      name: "dashboard/projects",
    },
  ];

  const toggleSidebar = () => {
    actions.TOGGLE_SIDEBAR();
  };

  const sidebarWidth = sidebarOpen ? "w-60" : "w-20";
  const deskTopTitleClass = sidebarOpen ? "" : "hidden scale-0";
  const mobileTitleClass = sidebarOpen ? "hidden scale-0" : "scale-120";
  const downloadButtonClass = sidebarOpen ? "" : "hidden";
  const iconClass = !sidebarOpen ? "rotate-180" : "";

  return (
    <div className="fixed flex">
      <div
        className={`border-dark-purple absolute -right-3 top-9 z-10 w-max cursor-pointer rounded-full border-2 bg-white ${iconClass}`}
        onClick={toggleSidebar}
      >
        <ChevronLeft />
      </div>

      <div
        className={`${sidebarWidth} relative left-0 top-0 flex h-screen flex-col overflow-hidden bg-blue-700 px-4 py-6 duration-300`}
      >
        <div className="flex-none pb-6">
          <h1
            className={`origin-left cursor-pointer text-xl font-medium text-white duration-300 ${deskTopTitleClass}`}
          >
            Taskly
          </h1>
          <h1
            className={`origin-left cursor-pointer text-center text-xl font-medium text-white duration-300 ${mobileTitleClass}`}
          >
            T
          </h1>
        </div>

        <ul className="primary-scroll flex-1 overflow-hidden transition-all duration-300 hover:overflow-y-scroll">
          {menus.map((item, index) => (
            <MenuItem item={item} key={index} />
          ))}
        </ul>

        <div className="app-sidebar-footer flex-column-auto flex-none pt-8">
          <button className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            <Download size={25} />
            <span className={`ml-2 ${downloadButtonClass}`}>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
