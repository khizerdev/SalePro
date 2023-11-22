import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "store";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import uuid from "react-uuid";

import Error from "components/error/error";

const schema = z.object({
  title: z
    .string()
    .min(4, { message: "Please enter a valid title (minimum 4 characters)" }),
  projectId: z.string().min(1, { message: "Please select project" }),
  user: z.string().min(1, { message: "Please select user" }),
  start_date: z.string().min(1, { message: "Please select start date" }),
  end_date: z.string().min(1, { message: "Please select end date" }),
  description: z.string(),
});

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const { type, isOpen } = useSelector((state) => state.modal);
  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);
  const isModalOpen = isOpen && type === "createTask";

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 1500));

    const project = projects.find((item) => item.id === data.projectId);
    const projectIndex = projects.findIndex(
      (item) => item.id === data.projectId,
    );

    const hasTodoColumn = project.board?.findIndex(
      (item) => item.title === "Todo",
    );

    const newTask = {
      id: `task-${uuid()}`,
      ...data,
    };

    const newTodoColumn = {
      id: `column-${uuid()}`,
      title: "Todo",
      lists: [{ ...newTask }],
    };

    if (hasTodoColumn !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].board[hasTodoColumn].lists.push(newTask);
      actions.SET_PROJECTS(updatedProjects);
    } else {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].board.push(newTodoColumn);
      actions.SET_PROJECTS(updatedProjects);
    }

    toast.success("Task Created");
    onClose();
  };

  const onClose = () => {
    actions.CLOSE_MODAL();
    // reset();
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Task
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
                    <div className="mb-4 grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="title"
                      >
                        Task Title
                      </label>
                      <input
                        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id="title"
                        placeholder="Explain what the Task Title"
                        type="text"
                        {...register("title", { required: true })}
                      />
                      {errors.title && <Error error={errors.title?.message} />}
                    </div>

                    <div className="mb-4 grid w-full items-center gap-1.5">
                      <label
                        htmlFor="projectId"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Project
                      </label>
                      <select
                        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-1"
                        {...register("projectId", { required: true })}
                      >
                        <option value="">Select Option</option>
                        {projects.map((project, index) => {
                          return (
                            <option value={project.id} key={index}>
                              {project.title}
                            </option>
                          );
                        })}
                      </select>
                      {errors.projectId && (
                        <Error error={errors.projectId?.message} />
                      )}
                    </div>

                    <div className="mb-4 grid w-full grid-cols-2 items-center gap-4">
                      <div>
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="start_date"
                        >
                          Task Start Date
                        </label>
                        <input
                          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                          id="start_date"
                          type="date"
                          {...register("start_date", { required: true })}
                        />
                        {errors.start_date && (
                          <Error error={errors.start_date?.message} />
                        )}
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="end_date"
                        >
                          Task End Date
                        </label>
                        <input
                          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                          id="end_date"
                          type="date"
                          {...register("end_date", { required: true })}
                        />
                        {errors.end_date && (
                          <Error error={errors.end_date?.message} />
                        )}
                      </div>
                    </div>

                    <div className="mb-4 grid w-full items-center gap-1.5">
                      <label
                        htmlFor="user"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User
                      </label>
                      <select
                        className="block h-9 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-1"
                        {...register("user", { required: true })}
                      >
                        <option value="">Select Option</option>
                        {users.map((user, index) => {
                          return (
                            <option
                              value={
                                user.name.firstname + " " + user.name.lastname
                              }
                              key={index}
                            >
                              {user.name.firstname} {user.name.lastname}
                            </option>
                          );
                        })}
                      </select>
                      {errors.user && <Error error={errors.user?.message} />}
                    </div>

                    <div className="mb-4 grid w-full items-center gap-1.5">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description (optional)
                      </label>
                      <textarea
                        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Type your message here."
                        {...register("description")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      {isSubmitting && (
                        <Loader2 size={20} className="animate-spin" />
                      )}
                      Create
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateTask;
