import { useSelector } from "react-redux";

import { PlusCircle } from "lucide-react";

import Section from "components/section/section";
import ProjectItem from "components/projects/project-item";

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
        {projects.map((project, index) => {
          return <ProjectItem project={project} key={index} />;
        })}
      </div>
    </Section>
  );
};

export default Projects;
