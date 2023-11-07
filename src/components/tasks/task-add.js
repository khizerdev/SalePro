import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

const TaskAdd = ({ group, setGroupedTasks }) => {
  const projects = useSelector((state) => state.projects.projects);
  const [addMode, setAddMode] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const params = useParams();
  const { name: projectName } = projects.find((item) => item.id === params.id);

  const addTask = () => {
    const newTask = {
      id: uuid(),
      title: taskInput,
      projectId: params.id,
      user: "peirce morgen",
      start_date: dayjs().format("YYYY-MM-DD"), // current date
      end_date: dayjs().add(7, "day").format("YYYY-MM-DD"), // next 7th day date
      description: "",
      projectName,
      status: group.title,
    };

    setGroupedTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const groupIndex = updatedTasks.findIndex((item) => item.id === group.id);
      updatedTasks[groupIndex].tasks.push(newTask);
      return updatedTasks;
    });

    setAddMode(false);
    setTaskInput("");
  };

  return (
    <div className="px-2">
      {!addMode ? (
        <div
          className="group mb-1.5 flex cursor-pointer items-center rounded px-2 py-2 hover:bg-gray-300"
          onClick={() => setAddMode(true)}
        >
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
          <span className="block text-sm text-gray-500 group-hover:text-gray-700">
            Add task
          </span>
        </div>
      ) : (
        <div className="mb-2">
          <input
            type="text"
            className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Enter a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <div className="mt-2">
            <button
              className="focus:ring-offset inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
              onClick={addTask}
              disabled={taskInput.length === 0}
            >
              Add task
            </button>
            <button
              className="focus:ring-offset ml-2 inline-flex items-center rounded border border-transparent bg-white px-2.5 py-1.5 text-xs font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setAddMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAdd;
