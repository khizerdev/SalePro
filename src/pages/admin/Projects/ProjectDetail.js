import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Section from "components/section/section";
import TaskItem from "components/tasks/task-item";
import TaskAdd from "components/tasks/task-add";

const ProjectDetail = () => {
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);
  const [groupedTasks, setGroupedTasks] = useState([]);

  useEffect(() => {
    const tasksToSet = tasks.filter((item) => item.projectId === id);

    const groupedTasks = tasksToSet.reduce((groupedTodos, todo) => {
      const { status } = todo;
      if (!groupedTodos[status]) {
        groupedTodos[status] = [];
      }
      groupedTodos[status].push(todo);
      return groupedTodos;
    }, {});

    setGroupedTasks(groupedTasks);
  }, []);

  return (
    <Section>
      <div className="grid grid-cols-5 gap-2">
        {Object.keys(groupedTasks).map((group, index) => {
          return (
            <div className="box-border flex max-h-full flex-col whitespace-normal rounded bg-gray-200">
              <div className="flex items-center px-2 py-2.5">
                <div className="px-2 py-[0.313rem] text-sm font-semibold leading-none text-gray-700">
                  {group}
                </div>
              </div>
              <div className="min-h-0 overflow-y-auto px-2">
                {groupedTasks[group].map((item, index) => {
                  return <TaskItem item={item} key={index} />;
                })}
              </div>

              <TaskAdd />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ProjectDetail;
