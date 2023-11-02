import { MoreHorizontal } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Columns = ({ group, updateColumn }) => {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: group.id,
    data: {
      type: "Column",
      group,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex max-h-full flex-col rounded-md border-2 border-blue-600 opacity-40"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="box-border flex max-h-full flex-col whitespace-normal rounded bg-gray-200"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab items-center justify-between px-2 py-2.5"
      >
        <div className="flex-1 px-2 py-[0.313rem] text-sm font-semibold leading-none text-gray-700">
          {!editMode && group.title}
          {editMode && (
            <input
              className="block w-full rounded-md border-gray-300 pl-2 text-sm shadow-sm focus:border-blue-600 focus:ring-blue-600"
              value={group.title}
              onChange={(e) => updateColumn(group.id, e.target.value)}
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
    </div>
  );
};

export default Columns;
