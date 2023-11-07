import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";
import uuid from "react-uuid";

import dataTasks from "data/dataTasks";

import Section from "components/section/section";
import TaskItem from "components/tasks/task-item";
import TaskAdd from "components/tasks/task-add";
import Columns from "components/tasks/columns";

const ProjectDetail = () => {
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);
  const [groupedTasks, setGroupedTasks] = useState(dataTasks);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const columnsId = useMemo(
    () => groupedTasks.map((col) => col.id),
    [groupedTasks],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.group);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // setGroupedTasks((groups) => {
    //   const activeGroupIndex = groups.fid
    // })

    setGroupedTasks((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    // dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeGroupIndex = groupedTasks.findIndex((group) =>
        group.tasks.some((item) => item.id === activeId),
      );

      setGroupedTasks((prevTask) => {
        const activeIndex = groupedTasks[activeGroupIndex].tasks.findIndex(
          (item) => item.id === activeId,
        );
        const overIndex = groupedTasks[activeGroupIndex].tasks.findIndex(
          (item) => item.id === overId,
        );
        const newGroup = [...prevTask];
        newGroup[activeGroupIndex].tasks = arrayMove(
          newGroup[activeGroupIndex].tasks,
          activeIndex,
          overIndex,
        );
        return newGroup;
      });
    }
  }

  function updateColumn(id, title) {
    const newGroups = groupedTasks.map((group) => {
      if (group.id !== id) return group;
      return { ...group, title };
    });

    setGroupedTasks(newGroups);
  }

  const addColumn = () => {
    const newGroups = [
      ...groupedTasks,
      {
        id: uuid(),
        title: "New Column",
        tasks: [],
      },
    ];

    setGroupedTasks(newGroups);
  };

  function updateTask() {}

  // useEffect(() => {
  //   const tasksToSet = tasks.filter((item) => item.projectId === id);

  //   const groupedTasks = tasksToSet.reduce((groupedTodos, todo) => {
  //     const { status } = todo;
  //     if (!groupedTodos[status]) {
  //       groupedTodos[status] = [];
  //     }
  //     groupedTodos[status].push(todo);
  //     return groupedTodos;
  //   }, {});

  //   setGroupedTasks(groupedTasks);
  // }, []);

  return (
    <Section>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div
          className={`secondary-scroll flex gap-2 overflow-y-hidden overflow-x-scroll py-3`}
        >
          <SortableContext items={columnsId}>
            {groupedTasks.map((group) => {
              return (
                <Columns
                  key={group.id}
                  group={group}
                  updateColumn={updateColumn}
                  setGroupedTasks={setGroupedTasks}
                />
              );
            })}
          </SortableContext>
          <button
            className="flex h-[50px] !min-w-[10rem] cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 px-2 py-1.5 hover:border-gray-400"
            onClick={() => addColumn()}
          >
            <Plus className="mr-2" color="gray" />
            <span className="text-sm text-gray-700">Add Column</span>
          </button>
        </div>
        <DragOverlay>
          {activeColumn ? <Columns group={activeColumn} /> : null}
          {activeTask ? (
            <TaskItem task={activeTask} updateTask={updateTask} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Section>
  );
};

export default ProjectDetail;
