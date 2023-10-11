import { useState } from "react";
import { Gauge, ChevronLeft, Users2  } from 'lucide-react';
import { Link } from "react-router-dom";


const Sidebar = () => {

  const [open, setOpen] = useState(true);

  const menus = [
    { 
        title: "Dashboard", 
        src: <Gauge size={25}/>,
        link: "/dashboard"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
    { 
        title: "Users", 
        src: <Users2 size={25}/>,
        link: "/users"
    },
  ];

  return (
    <div className="flex relative">
        
        <div className={`absolute bg-white cursor-pointer -right-3 top-9 z-10 w-max border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
            <ChevronLeft/>
        </div>

        <div
            className={` ${
            open ? "w-60" : "w-20 "
            } top-0 left-0 bg-blue-700 overflow-hidden py-6 px-4 relative duration-300
            flex flex-col h-screen
            `}
        >
        <div className="flex-none pb-6 gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 cursor-pointer ${
              !open && "scale-0"
            }`}
          >
            Taskly
          </h1>
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 cursor-pointer ${
              open ? "scale-0" : "absolute ml-[11%] scale-150"
            }`}
          >
            T
          </h1>
        </div>
        
        <ul className="flex-1  transition-all duration-300 overflow-hidden hover:overflow-y-scroll primary-scroll">
            {menus.map((item, index) => (
                <Link to={item.link}>
                    <li
                        key={index}
                        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-blue-600 hover:text-white ${
                            index === 0 && "bg-light-white"
                        } `}
                        >
                            {item.src}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {item.title}
                            </span>
                    </li>
                </Link>
            ))}
        </ul>

        <div className="app-sidebar-footer flex-none flex-column-auto pt-8">
            <button className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-3 bg-slate-900 text-white hover:bg-slate-700">
            Download
            </button>
        </div>

      </div>
    </div>
  );
};
export default Sidebar;