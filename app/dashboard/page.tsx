"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../component/Pagination";

const DashboardPage = () => {
  const [logAccessVideo, setLogAccessVideo] = useState({
    userAccesses: [{ userName: "", count: 0, createdAt: "" }],
    total: 0,
    dailyAccess: [{date: "", count: 0}]
  });

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/logvrtours");
      setLogAccessVideo(response.data);
    };
    fetchData();
  }, []);

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  // Setting Paggination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(
    logAccessVideo.userAccesses.length / itemsPerPage
  );

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

   const filteredLogs = logAccessVideo.userAccesses.filter((log) => {
     const logDate = new Date(log.createdAt);
     const fromDate = dateFrom ? new Date(dateFrom) : new Date("1970-01-01");
     const toDate = dateTo ? new Date(dateTo) : new Date();

     return logDate >= fromDate && logDate <= toDate;
   });

   const currentLogs = filteredLogs.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

  return (
    <>
      <div className="w-full rounded-lg bg-primary03 text-white flex items-center h-32 border-2 border-secondary">
        <p className="mx-auto text-xl font-semibold">
          Welcome to Innocent Dashboard!
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="w-full border rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              User Accessed VR Tour Page
            </h1>
            {/* Filter by Date */}
            <div className="w-max flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  className="px-2 py-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={handleDateToChange}
                  className="px-2 py-1 border rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 w-full">
            <div className="overflow-x-auto">
              <div className="min-w-full py-2 align-middle">
                {currentLogs.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentLogs.map((u, index) => (
                        <tr key={index} className="hover:bg-primary/5">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0 text-center">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {u.userName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {u.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full bg-slate-100 rounded-lg text-center font-semibold text-slate-500 py-2">
                    Empty Data
                  </div>
                )}
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
        <div className="w-max h-max bg-[#008000]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">
            Total Who Accessed VR Tour Page
          </p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {logAccessVideo.total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
