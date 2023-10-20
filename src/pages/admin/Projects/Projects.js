import { useSelector } from "react-redux";

import { Trash2, Clock, PlusCircle } from "lucide-react";

import Section from "components/section/section";

import { actionCreators } from "store";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const handleClick = () => {
    actions.OPEN_MODAL({ type: "createProject", isOpen: true });
  };

  return (
    <Section>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>

        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <PlusCircle size={16} className="mr-1" />
          Create Project
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border bg-white p-3">
          <h2 className="pb-3 text-center text-sm font-semibold">
            Social Geek Made
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">UI/UX Design</span>
            <span className="group cursor-pointer rounded-md border p-2 transition hover:bg-red-600">
              <Trash2 size={16} className="group-hover:text-white" />
            </span>
          </div>
          <div className="flex -space-x-1 overflow-hidden py-3">
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="my-2 h-[1px] bg-gray-300" />
          <div className="flex items-center justify-between py-2">
            <span className="text-xs font-medium">Progress</span>
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              <Clock size={16} className="mr-1" /> 20 Days Left
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
            <div className="h-1.5 rounded-full bg-green-600"></div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
