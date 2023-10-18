import React from "react";
import UserMenu from "components/header/user-menu";

const Header = () => {
  return (
    <header className="z-[48] mb-6 flex w-full flex-wrap bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start">
      <nav className="mx-auto flex w-full basis-full items-center px-8">
        <div className="flex w-full items-center justify-between sm:gap-x-3">
          <div className="hidden sm:block">
            <input
              type="text"
              id="icon"
              name="icon"
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search"
            />
          </div>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
