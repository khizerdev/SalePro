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
      console.log("hello");
      setActiveColumn(event.active.data.current.group);
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    const { active, over } = event;
    console.log(active, over);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    console.log(activeId === overId);

    // setGroupedTasks((groups) => {
    //   const activeGroupIndex = groups.fid
    // })

    setGroupedTasks((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

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
      >
        <div className="grid grid-cols-5  gap-2">
          <SortableContext items={columnsId}>
            {groupedTasks.map((group) => {
              return <Columns group={group} key={group.id} />;
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeColumn ? <Columns group={activeColumn} /> : null}
        </DragOverlay>
      </DndContext>
    </Section>
  );
};

export default ProjectDetail;
