import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "store";

const TaskListItem = ({ task }) => {
  const { statuses } = useSelector((state) => state.taskstatus);
  const { tasks } = useSelector((state) => state.tasks);
  const [filteredStatus, setFilteredStatus] = useState([]);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const itemStatus = statuses.filter((item) => item.name != task.status);
    setFilteredStatus(itemStatus);
  }, []);

  const updateTasks = (e, id) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      status: e.target.value,
    };
    actions.SET_TASKS(updatedTasks);
    toast.success("Task Updated");
  };

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
        {task.id}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        {task.title}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        <select
          className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-1"
          onChange={(e) => updateTasks(e, task.id)}
        >
          <option value={task.status}>{task.status}</option>
          {filteredStatus.map((status, index) => {
            return (
              <option value={status.name} key={index}>
                {status.name}
              </option>
            );
          })}
        </select>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        {task.projectName}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        {task.user}
      </td>
    </tr>
  );
};

export default TaskListItem;
