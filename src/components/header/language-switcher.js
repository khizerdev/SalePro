import { Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { Globe } from "lucide-react";
import toast from "react-hot-toast";

import { actionCreators } from "store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./menu-item";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="relative flex -space-x-2">
      <Menu as="div" className="relative my-auto inline-block text-left">
        <Menu.Button className="flex -space-x-2">
          <Globe />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item className="px-5 py-2">
                {({ active }) => (
                  <span
                    className={`${
                      active ? "rounded bg-[#f9f9f9] text-[#3e97ff]" : ""
                    } flex cursor-pointer items-center font-medium text-[#252F4A] transition-colors`}
                    onClick={() => {
                      i18n.changeLanguage("en");
                      actions.CHANGE_LANGUAGE("en");
                    }}
                  >
                    English
                  </span>
                )}
              </Menu.Item>
              <Menu.Item className="px-5 py-2">
                {({ active }) => (
                  <span
                    className={`${
                      active ? "rounded bg-[#f9f9f9] text-[#3e97ff]" : ""
                    } flex cursor-pointer items-center font-medium text-[#252F4A] transition-colors`}
                    onClick={() => {
                      i18n.changeLanguage("ge");
                      actions.CHANGE_LANGUAGE("ge");
                    }}
                  >
                    German
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

export default LanguageSwitcher;
