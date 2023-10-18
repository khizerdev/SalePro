import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

const MenuItem = ({ label }) => {
  return (
    <Menu.Item className="px-5 py-2">
      {({ active }) => (
        <Link
          className={`${
            active ? "rounded bg-[#f9f9f9] text-[#3e97ff]" : ""
          } flex cursor-pointer items-center font-medium text-[#252F4A] transition-colors`}
        >
          {label}
        </Link>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
