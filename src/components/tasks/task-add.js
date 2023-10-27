import React from "react";

const TaskAdd = () => {
  return (
    <div className="px-2">
      <div className="group mb-1.5 flex cursor-pointer items-center rounded px-2 py-2 hover:bg-gray-300">
        <svg
          className="mr-1 h-4 w-4 text-gray-500  group-hover:text-gray-700 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="block text-sm text-gray-500 group-hover:text-gray-700 ltr:ml-2 rtl:mr-2">
          Add task
        </span>
      </div>
      <div className="mb-2" style={{ display: "none" }}>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter a task"
        />
        <div className="mt-2">
          <button className="focus:ring-offset inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add task
          </button>
          <button className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ltr:ml-1 rtl:mr-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAdd;
