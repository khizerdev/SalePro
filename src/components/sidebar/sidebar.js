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
    <div className="flex">
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } top-0 left-0 bg-blue-700 h-full p-5  pt-8 relative duration-300`}
      >
        
        <div className={`absolute bg-white cursor-pointer -right-3 top-9 w-max border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
            <ChevronLeft/>
        </div>

        <div className="flex gap-x-4 items-center">
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
        <ul className="pt-6">
          {menus.map((item, index) => (
                <Link to={item.link}>
                    <li
                        key={index}
                        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-blue-600 hover:text-white
                        ${item.gap ? "mt-9" : "mt-2"} ${
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
      </div>
    </div>
  );
};
export default Sidebar;