import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h2 class="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
        Taskly <span class="text-blue-600 dark:text-blue-500">App</span>
      </h2>
      <Link
        to="/dashboard"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Sign in
      </Link>
    </>
  );
};

export default Login;
