import React from "react";

const TaskItem = () => {
  return (
    <div className="mb-2 block cursor-pointer rounded bg-white px-2.5 py-1 shadow-md">
      <div className="flex py-1.5">
        <span className="block flex-1 text-sm text-gray-700">Add Filter</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-1">
          {/**/}
          <div className="flex items-center py-1 ltr:mr-2.5 rtl:ml-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span className="text-xs text-gray-500 ltr:ml-1 rtl:mr-1">
              Oct 4, 2022
            </span>
          </div>
          <div
            className="flex items-center py-1 ltr:mr-2.5 rtl:ml-2.5"
            style={{ display: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span className="text-xs text-gray-500 ltr:ml-1 rtl:mr-1">0</span>
          </div>
          <div className="flex items-center py-1 ltr:mr-2.5 rtl:ml-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs tracking-widest text-gray-500 ltr:ml-0.5 rtl:mr-0.5">
              0/3
            </span>
          </div>
        </div>
        <div className="flex items-center py-1 ltr:ml-auto rtl:mr-auto">
          <span />
          <img
            className="h-4 w-4 rounded-full"
            src="/img/avatar_1.jpg"
            alt="avatar"
            title="Admin"
            draggable="false"
          />
          <span
            title="Admin"
            className="inline-block h-4 w-4 overflow-hidden rounded-full bg-gray-100 text-gray-300"
            style={{ display: "none" }}
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <span className="text-[9px] text-gray-600 ltr:ml-px rtl:mr-px">
            +2
          </span>
        </div>
      </div>
      {/**/}
      {/**/}
    </div>
  );
};

export default TaskItem;
