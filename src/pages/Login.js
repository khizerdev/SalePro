import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="flex justify-center items-center h-[100vh] bg-gray-100">
        <div className="flex flex-col w-1/3 mx-auto justify-center mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
                <h2 class="text-2xl font-bold md:text-3xl text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Taskly <span class="text-blue-600 dark:text-blue-500">App</span>
                </h2>
                <Link
                    to="/dashboard"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 w-full">
                    Sign in
                </Link>
            </div>
        </div>
    </main>

  )
}

export default Login