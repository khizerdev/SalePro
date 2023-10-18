import { Fragment, useEffect, useRef, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { actionCreators } from "store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./menu-item";

const menuItems = [{ label: "My Profile" }, { label: "My Projects" }];

const UserMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const {
    email,
    name: { firstname, lastname },
  } = useSelector((state) => state.user.user);

  const firstName =
    firstname.slice(0, 1).toUpperCase() + firstname.slice(1, firstname.length);
  const lastName =
    lastname.slice(0, 1).toUpperCase() + lastname.slice(1, lastname.length);

  const signout = async () => {
    setIsLoading(true);
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), 2000),
    );
    toast.success("Successfully logged out");
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), 1000),
    );
    setIsLoading(false);
    actions.LOGOUT();
  };

  return (
    <div className="relative flex -space-x-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex -space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex gap-3 px-1 py-2">
              <img
                className="inline-block h-[2.5rem] w-[2.5rem] rounded-md ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="flex flex-1 cursor-pointer flex-col">
                <span className="text-[.9rem] font-bold text-[#071437]">
                  {firstName} {lastName}
                </span>
                <span className="text-[.8rem] font-medium leading-3 text-[#99A1B7]">
                  {email}
                </span>
              </div>
            </div>
            <div className="px-1 py-1">
              {menuItems.map((item, index) => (
                <MenuItem label={item.label} key={index} />
              ))}
            </div>
            <div className="px-1 py-1">
              <Menu.Item className="px-5 py-2">
                {({ active }) => (
                  <span
                    onClick={signout}
                    className={`${
                      active ? "rounded bg-[#f9f9f9] text-[#3e97ff]" : ""
                    } flex cursor-pointer items-center font-medium text-[#252F4A] transition-colors`}
                  >
                    {isLoading && (
                      <Loader2 size={20} className="mr-1 animate-spin" />
                    )}
                    Sign Out
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
