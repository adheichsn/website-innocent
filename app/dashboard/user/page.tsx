"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUser from "./addUser";
import DeleteUser from "./deleteUser";
import Pagination from "@/app/component/Pagination";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUser, setTotalUser] = useState(1);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users`);
        setUsers(response.data.users);
        setTotalUser(response.data.totalUser);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occured");
        }
      }
    };
    fetchUser();
  }, []);

  // Setting Paggination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-4 flex gap-4">
      <div className="w-full border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Category
          </h1>
          <AddUser />
        </div>
        <div className="mt-8 w-full">
          <div className="overflow-x-auto">
            <div className="min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 w-[40%]"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-primary/5">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 w-[40%]">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pr-0 flex justify-end gap-2">
                        {user.role == "ADMIN" ? null : (
                          <>
                            {/* <UpdateCategory category={user} /> */}
                            <DeleteUser user={user} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex mt-4 justify-between">
                <div className="flex gap-2 justify-between items-center">
                  <span className="text-slate-700">Number of rows:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="px-2 py-1 border rounded bg-slate-100 border-slate-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-44 h-max bg-[#008000]/20 rounded-lg p-6">
        <p className="text-xs lg:text-sm mb-2">Total User</p>
        <div className="flex items-end gap-4">
          <p className="text-4xl lg:text-6xl font-bold text-primary">
            {totalUser}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
