import { NavLink } from "react-router-dom";

const MenuItem = ({ item, open, currentPath }) => {
  const { link, src, title, name } = item;
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `hover:bg-light-white flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white ${
          isActive && "bg-blue-600 text-white"
        }`
      }
      end
    >
      {src}
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {title}
      </span>
    </NavLink>
  );
};

export default MenuItem;
