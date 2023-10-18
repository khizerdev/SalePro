import { useEffect } from "react";
import { actionCreators } from "store";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const Users = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (users.length === 0) actions.SET_USERS();
  }, []);

  return (
    <div className="flex flex-col rounded-md border border-neutral-200 bg-[#fff]">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500"
                  >
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.length > 0 &&
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {user.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {user.name.firstname} {user.name.lastname}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a
                            className="text-blue-500 hover:text-blue-700"
                            href="#"
                          >
                            {user.phone}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
