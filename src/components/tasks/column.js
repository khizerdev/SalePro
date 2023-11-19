import { MoreHorizontal } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskAdd from "./task-add";

const Column = ({ id, children, title, onAddItem, updateColumn }) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Column",
    },
  });

  const [editMode, setEditMode] = useState(false);
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`box-border flex h-[400px] max-h-[400px] w-[16rem] !min-w-[16rem] flex-1 flex-col rounded bg-gray-200 px-2 py-2.5 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="text-md mb-3 flex h-[60px] items-center justify-between rounded-md rounded-b-none border-4 font-bold">
        <div
          className="flex h-full flex-1 cursor-grab  items-center text-sm font-semibold leading-none text-gray-700"
          {...attributes}
          {...listeners}
        >
          {!editMode && title}
          {editMode && (
            <input
              className="block h-[30px] w-full border-gray-300 pl-2 text-sm shadow-sm focus:border-blue-600 focus:ring-blue-600"
              value={title}
              onChange={(e) => updateColumn(id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <Menu as="div" className="relative z-50 cursor-pointer">
          <Menu.Button>
            <MoreHorizontal />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-4 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item className="px-2 py-1">
                {({ active }) => (
                  <span
                    className={`${
                      active ? "rounded bg-[#f9f9f9]" : ""
                    } flex cursor-pointer items-center text-sm font-medium text-[#252F4A] transition-colors`}
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </span>
                )}
              </Menu.Item>
              <Menu.Item className="px-2 py-1">
                {({ active }) => (
                  <span
                    className={`${
                      active ? "rounded bg-[#f9f9f9]" : ""
                    } flex cursor-pointer items-center text-sm font-medium text-[#252F4A] transition-colors`}
                  >
                    Delete
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {children}
      <div className="mt-3">
        <TaskAdd onAddItem={onAddItem} id={id} />
      </div>
    </div>
  );
};

export default Column;
