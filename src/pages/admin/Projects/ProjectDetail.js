import { useState } from "react";
import { Plus } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Section from "components/section/section";
import Column from "components/tasks/column";
import uuid from "react-uuid";
import Task from "components/tasks/task";

import dataTasks from "data/dataTasks";

const ProjectDetail = () => {
  const [columns, setColumns] = useState(dataTasks);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const addColumn = () => {
    const id = `column-${uuid()}`;
    setColumns([
      ...columns,
      {
        id,
        title: "New Column",
        tasks: [],
      },
    ]);
  };

  const onAddTask = (task, id) => {
    const column = columns.find((item) => item.id === id);
    if (!column) return;
    column.tasks.push(task);
    setColumns([...columns]);
  };

  function findTask(id) {
    // Use find to get the column with the task
    const columnWithTask = columns.find((column) =>
      column.tasks.some((item) => item.id === id),
    );

    // If a column with the task is found, use find to get the task
    const task = columnWithTask
      ? columnWithTask.tasks.find((item) => item.id === id)
      : null;

    return task;
  }

  // Find the value of the items
  function findValueOfItems(id, type) {
    if (type === "column") {
      return columns.find((item) => item.id === id);
    }
    if (type === "task") {
      return columns.find((column) =>
        column.tasks.find((item) => item.id == id),
      );
    }
  }

  const findTaskTitle = (id) => {
    const column = findValueOfItems(id, "task");
    if (!column) return "";
    const task = column.tasks.find((item) => item.id === id);
    if (!task) return "";
    return task.title;
  };

  const findColumnTitle = (id) => {
    const column = findValueOfItems(id, "column");
    if (!column) return "";
    return column.title;
  };

  const findColumnTasks = (id) => {
    const column = findValueOfItems(id, "column");
    if (!column) return [];
    return column.tasks;
  };

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("task") &&
      over?.id.toString().includes("task") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active column and over column
      const activeColumn = findValueOfItems(active.id, "task");
      const overColumn = findValueOfItems(over.id, "task");

      // If the active or over column is not found, return
      if (!activeColumn || !overColumn) return;

      // Find the index of the active and over Column
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id,
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
        (item) => item.id === active.id,
      );
      const overTaskIndex = overColumn.tasks.findIndex(
        (item) => item.id === over.id,
      );

      // In the same Column
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );

        setColumns(newColumns);
      } else {
        // In different columns
        let newColumns = [...columns];
        const [removeditem] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removeditem);
        setColumns(newColumns);
      }
    }

    // Handling Item Drop Into a Column
    if (
      active.id.toString().includes("task") &&
      over?.id.toString().includes("column") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over Column
      const activeColumn = findValueOfItems(active.id, "task");
      const overColumn = findValueOfItems(over.id, "column");

      // If the active or over column is not found, return
      if (!activeColumn || !overColumn) return;

      // Find the index of the active and over column
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id,
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active column and add it to the over Column
      let newColumns = [...columns];
      const [removeditem] = newColumns[activeColumnIndex].tasks.splice(
        activeTaskIndex,
        1,
      );
      newColumns[overColumnIndex].tasks.push(removeditem);
      setColumns(newColumns);
    }
  };

  // This is the function that handles the sorting of the columns and items when the user is done dragging.
  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Column Sorting
    if (
      active.id.toString().includes("column") &&
      over?.id.toString().includes("column") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over column
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === active.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === over.id,
      );
      // Swap the active and over column
      let newColumns = [...columns];
      newColumns = arrayMove(newColumns, activeColumnIndex, overColumnIndex);
      setColumns(newColumns);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("task") &&
      over?.id.toString().includes("task") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over column
      const activeColumn = findValueOfItems(active.id, "task");
      const overColumn = findValueOfItems(over.id, "task");

      // If the active or over column is not found, return
      if (!activeColumn || !overColumn) return;
      // Find the index of the active and over column
      const activeColumnIndex = columns.findIndex(
        (Column) => Column.id === activeColumn.id,
      );
      const overColumnIndex = columns.findIndex(
        (Column) => Column.id === overColumn.id,
      );
      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
        (item) => item.id === active.id,
      );
      const overTaskIndex = overColumn.tasks.findIndex(
        (item) => item.id === over.id,
      );
      // In the same column
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex,
        );
        setColumns(newColumns);
      } else {
        // In different columns
        let newColumns = [...columns];
        const [removeditem] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1,
        );
        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removeditem);
        setColumns(newColumns);
      }
    }
    // Handling item dropping into column
    if (
      active.id.toString().includes("task") &&
      over?.id.toString().includes("column") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over column
      const activeColumn = findValueOfItems(active.id, "task");
      const overColumn = findValueOfItems(over.id, "column");

      // If the active or over column is not found, return
      if (!activeColumn || !overColumn) return;
      // Find the index of the active and over column
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id,
      );
      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
        (item) => item.id === active.id,
      );

      let newItems = [...columns];
      const [removeditem] = newItems[activeColumnIndex].items.splice(
        activeTaskIndex,
        1,
      );
      newItems[overColumnIndex].items.push(removeditem);
      setColumns(newItems);
    }
    setActiveId(null);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setColumns(newColumns);
  }

  return (
    <Section>
      <div className="secondary-scroll flex gap-2 overflow-y-hidden overflow-x-scroll py-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={columns.map((i) => i.id)}>
            {columns.map((column) => (
              <Column
                id={column.id}
                title={column.title}
                key={column.id}
                onAddItem={onAddTask}
                updateColumn={updateColumn}
              >
                <SortableContext items={column.tasks.map((i) => i.id)}>
                  <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
                    {column.tasks.map((i) => (
                      <Task task={i} id={i.id} key={i.id} />
                    ))}
                  </div>
                </SortableContext>
              </Column>
            ))}
          </SortableContext>
          <button
            className="flex h-[50px] !min-w-[16rem] cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 px-2 py-1.5 hover:border-gray-400"
            onClick={() => addColumn()}
          >
            <Plus className="mr-2" color="gray" />
            <span className="text-sm text-gray-700">Add Column</span>
          </button>
          <DragOverlay adjustScale={false}>
            {/* Drag Overlay For Task  */}
            {activeId && activeId.toString().includes("task") && (
              <Task
                id={activeId}
                task={findTask(activeId)}
                title={findTaskTitle(activeId)}
              />
            )}
            {/* Drag Overlay For Column */}
            {activeId && activeId.toString().includes("column") && (
              <Column id={activeId} title={findColumnTitle(activeId)}>
                {findColumnTasks(activeId).map((i) => (
                  <Task key={i.id} task={i} id={i.id} />
                ))}
              </Column>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </Section>
  );
};

export default ProjectDetail;
