import { useState, useEffect } from "react";
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

import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import { actionCreators } from "store";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import Section from "components/section/section";
import Column from "components/tasks/column";
import Task from "components/tasks/task";

const ProjectDetail = () => {
  const [activeId, setActiveId] = useState(null);

  const { id } = useParams();

  const { projects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const projectIndex = projects.findIndex((item) => item.id === id);
  const project = projects.find((item) => item.id === id);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(project.board);
  }, [project.board]);

  const sensors = useSensors(useSensor(PointerSensor));

  const addColumn = () => {
    const id = `column-${uuid()}`;
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].board.push({
      id,
      title: "New Column",
      lists: [],
    });
    actions.SET_PROJECTS(updatedProjects);
  };

  const onAddTask = (task, id) => {
    const columnIndex = columns.findIndex((item) => item.id === id);
    if (columnIndex == -1) return;
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].board[columnIndex].lists.push(task);
    actions.SET_PROJECTS(updatedProjects);
  };

  function findTask(id) {
    // Use find to get the column with the task
    const columnWithTask = columns.find((column) =>
      column.lists.some((item) => item.id === id),
    );

    // If a column with the task is found, use find to get the task
    const task = columnWithTask
      ? columnWithTask.lists.find((item) => item.id === id)
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
        column.lists.find((item) => item.id == id),
      );
    }
  }

  const findTaskTitle = (id) => {
    const column = findValueOfItems(id, "task");
    if (!column) return "";
    const task = column.lists.find((item) => item.id === id);
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
    return column.lists;
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
      const activeTaskIndex = activeColumn.lists.findIndex(
        (item) => item.id === active.id,
      );
      const overTaskIndex = overColumn.lists.findIndex(
        (item) => item.id === over.id,
      );

      // In the same Column
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].lists = arrayMove(
          newColumns[activeColumnIndex].lists,
          activeTaskIndex,
          overTaskIndex,
        );

        const updatedProjects = [...projects];
        updatedProjects[projectIndex].board = newColumns;
        actions.SET_PROJECTS(updatedProjects);

        // setColumns(newColumns);
      } else {
        // In different columns
        let newColumns = [...columns];
        const [removeditem] = newColumns[activeColumnIndex].lists.splice(
          activeTaskIndex,
          1,
        );
        newColumns[overColumnIndex].lists.splice(overTaskIndex, 0, removeditem);
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].board = newColumns;
        actions.SET_PROJECTS(updatedProjects);
        // setColumns(newColumns);
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
      const activeTaskIndex = activeColumn.lists.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active column and add it to the over Column
      let newColumns = [...columns];
      const [removeditem] = newColumns[activeColumnIndex].lists.splice(
        activeTaskIndex,
        1,
      );
      newColumns[overColumnIndex].lists.push(removeditem);
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].board = newColumns;
      actions.SET_PROJECTS(updatedProjects);
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
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].board = newColumns;
      actions.SET_PROJECTS(updatedProjects);
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
        (column) => column.id === activeColumn.id,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id,
      );
      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.lists.findIndex(
        (item) => item.id === active.id,
      );
      const overTaskIndex = overColumn.lists.findIndex(
        (item) => item.id === over.id,
      );
      // In the same column
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].lists = arrayMove(
          newColumns[activeColumnIndex].lists,
          activeTaskIndex,
          overTaskIndex,
        );
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].board = newColumns;
        actions.SET_PROJECTS(updatedProjects);
      } else {
        // In different columns
        let newColumns = [...columns];
        const [removeditem] = newColumns[activeColumnIndex].lists.splice(
          activeTaskIndex,
          1,
        );
        newColumns[overColumnIndex].lists.splice(overTaskIndex, 0, removeditem);
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].board = newColumns;
        actions.SET_PROJECTS(updatedProjects);
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
      const activeTaskIndex = activeColumn.lists.findIndex(
        (item) => item.id === active.id,
      );

      let newItems = [...columns];
      const [removeditem] = newItems[activeColumnIndex].lists.splice(
        activeTaskIndex,
        1,
      );
      newItems[overColumnIndex].lists.push(removeditem);
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].board = newItems;
      actions.SET_PROJECTS(updatedProjects);
    }
    setActiveId(null);
  }

  function updateColumn(index, title) {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].board[index].title = title;
    actions.SET_PROJECTS(updatedProjects);
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
            {columns.map((column, index) => (
              <Column
                id={column.id}
                title={column.title}
                key={column.id}
                index={index}
                onAddItem={onAddTask}
                updateColumn={updateColumn}
              >
                <SortableContext items={column.lists.map((i) => i.id)}>
                  <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
                    {column.lists.map((i) => (
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
