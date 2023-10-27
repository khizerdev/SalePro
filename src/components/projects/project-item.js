import { Trash2, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";

import { actionCreators } from "store";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { getRemainingDays } from "lib/get-remaining-days";

const ProjectItem = ({ project }) => {
  const { name, category, end_date } = project;
  const remainingDays = getRemainingDays(end_date);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const openDeleteModal = () => {
    actions.OPEN_MODAL({
      type: "deleteProject",
      isOpen: true,
      data: { projectId: project.id },
    });
  };

  return (
    <NavLink to={project.id} className="rounded-md border bg-white p-3">
      <h2 className="pb-3 text-center text-sm font-semibold">{name}</h2>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{category}</span>
        <span
          onClick={openDeleteModal}
          className="group cursor-pointer rounded-md border p-2 transition hover:bg-red-600"
        >
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
          <Clock size={16} className="mr-1" /> {remainingDays} Days Left
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
        <div className="h-1.5 rounded-full bg-green-600"></div>
      </div>
    </NavLink>
  );
};

export default ProjectItem;
