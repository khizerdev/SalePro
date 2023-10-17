import { useState } from "react";

import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { actionCreators } from "store";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const signIn = async () => {
    setIsLoading(true);
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), 2000),
    );
    setIsLoading(false);
    toast.success("Successfully logged in");
    actions.LOGIN();
  };

  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
        Taskly <span className="text-blue-600 dark:text-blue-500">App</span>
      </h2>
      <button
        onClick={signIn}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        {isLoading && <Loader2 size={20} className="animate-spin" />}
        Sign in
      </button>
    </>
  );
};

export default Login;
