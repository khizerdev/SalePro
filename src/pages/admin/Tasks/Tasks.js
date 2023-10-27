import { useSelector } from "react-redux";

import { PlusCircle } from "lucide-react";

import { actionCreators } from "store";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import Section from "components/section/section";
import TaskListItem from "components/tasks/task-list-item";

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const handleClick = () => {
    actions.OPEN_MODAL({ type: "createTask", isOpen: true });
  };

  return (
    <Section>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tasks</h2>

        <div className="flex gap-3">
          <button
            onClick={() => actions.SET_TASKS([])}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Delete Tasks
          </button>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <PlusCircle size={16} className="mr-1" />
            Create Task
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
            >
              Project
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
            >
              User
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.length > 0 &&
            tasks.map((task, index) => {
              return <TaskListItem task={task} key={index} />;
            })}
        </tbody>
      </table>
    </Section>
  );
};

export default Tasks;
