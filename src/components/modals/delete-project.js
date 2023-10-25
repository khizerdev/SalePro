import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "store";

import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

const CreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const { type, isOpen, data } = useSelector((state) => state.modal);
  const { projects } = useSelector((state) => state.projects);
  const isModalOpen = isOpen && type === "deleteProject";

  const onDelete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(() => resolve(true), 1500));
    const updatedProjects = projects.filter(
      (item) => item.id != data.projectId,
    );
    actions.SET_PROJECTS(updatedProjects);
    toast.success("Project Deleted");
    setIsLoading(false);
    onClose();
  };

  const onClose = () => {
    actions.CLOSE_MODAL();
  };

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog static as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Delete Project
                  </Dialog.Title>
                  <p className="my-2 text-sm text-[#78716c]">
                    Are you sure? This application will no longer be accessible
                    and any existing sessions will be expired.
                  </p>
                  <div className="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <button
                      onClick={onClose}
                      disabled={isLoading}
                      type="button"
                      className="mb-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none  focus:ring-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={onDelete}
                      className="mb-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none  focus:ring-red-300"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateProject;
