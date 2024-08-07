"use client";
import Pagination from "@/app/component/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    totalFeedback: 11,
    totalFeedbackPoor: 0,
    totalFeedbackFair: 0,
    totalFeedbackAverage: 0,
    totalFeedbackGood: 0,
    totalFeedbackExcellent: 0,
    feedbacks: [
      {
        id: 1,
        contentId: 2,
        rating: 1,
        title: "",
        description: "",
        createdAt: "",
        user: {
          name: "",
        },
      },
    ],
  });

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [filterRating, setFilterRating] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/feedbacks");
      setFeedback(response.data);
    };
    fetchData();
  }, []);

  function calculatePercentage(part: number, total: number) {
    let result = (part / total) * 100;
    return result.toFixed(0);
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  const handleFilterRatingToChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterRating(Number(e.target.value));
  };

  // Setting Paggination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(feedback.feedbacks.length / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredLogs = feedback.feedbacks.filter((log) => {
    const logDate = new Date(log.createdAt);
    const fromDate = dateFrom ? new Date(dateFrom) : new Date("1970-01-01");
    const toDate = dateTo ? new Date(dateTo) : new Date();

    const isDateInRange = logDate >= fromDate && logDate <= toDate;
    const isRatingMatch = filterRating > -1 ? log.rating === filterRating : true;

    return isDateInRange && isRatingMatch;
  });

  const currentFeedbacks = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="w-full grid grid-cols-6 gap-4 mb-8">
        {/* TOTAL */}
        <div className="w-full bg-blue-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback</p>
          <p className="text-4xl lg:text-6xl font-bold text-primary">
            {feedback.totalFeedback}
          </p>
        </div>

        {/* POOR */}
        <div className="w-full bg-[#FF6347]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback Poor</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedback.totalFeedbackPoor}
            </p>
            <p className="text-lg lg:text-xl font-bold bg-[#FF6347] px-2 rounded-md text-white">
              {calculatePercentage(
                feedback.totalFeedbackPoor,
                feedback.totalFeedback
              )}
              <span className="ml-1 text-xs lg:text-sm">%</span>
            </p>
          </div>
        </div>

        {/* FAIR */}
        <div className="w-full bg-[#FFA500]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback Fair</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedback.totalFeedbackFair}
            </p>
            <p className="text-lg lg:text-xl font-bold bg-[#FFA500] px-2 rounded-md text-white">
              {calculatePercentage(
                feedback.totalFeedbackFair,
                feedback.totalFeedback
              )}
              <span className="ml-1 text-xs lg:text-sm">%</span>
            </p>
          </div>
        </div>

        {/* AVERAGE */}
        <div className="w-full bg-[#FFD700]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback Average</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedback.totalFeedbackAverage}
            </p>
            <p className="text-lg lg:text-xl font-bold bg-[#FFD700] px-2 rounded-md text-white">
              {calculatePercentage(
                feedback.totalFeedbackAverage,
                feedback.totalFeedback
              )}
              <span className="ml-1 text-xs lg:text-sm">%</span>
            </p>
          </div>
        </div>

        {/* GOOD */}
        <div className="w-full bg-[#9ACD32]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback Good</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedback.totalFeedbackGood}
            </p>
            <p className="text-lg lg:text-xl font-bold bg-[#9ACD32] px-2 rounded-md text-white">
              {calculatePercentage(
                feedback.totalFeedbackGood,
                feedback.totalFeedback
              )}
              <span className="ml-1 text-xs lg:text-sm">%</span>
            </p>
          </div>
        </div>

        {/* EXCELLENT */}
        <div className="w-full bg-[#008000]/20 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2">Total Feedback Excellent</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedback.totalFeedbackExcellent}
            </p>
            <p className="text-lg lg:text-xl font-bold bg-[#008000] px-2 rounded-md text-white">
              {calculatePercentage(
                feedback.totalFeedbackExcellent,
                feedback.totalFeedback
              )}
              <span className="ml-1 text-xs lg:text-sm">%</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Feedback
          </h1>
          {/* Filter by Rating and Date */}
          <div className="w-max flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <select
                value={filterRating}
                onChange={handleFilterRatingToChange}
                className="mt-0.5 px-2 py-1 border rounded-md bg-white"
              >
                <option value="-1">
                  All
                </option>
                <option value="0">Poor</option>
                <option value="1">Fair</option>
                <option value="2">Average</option>
                <option value="3">Good</option>
                <option value="4">Excellent</option>
              </select>
            </div>
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentFeedbacks.map((f, index) => (
                    <tr key={f.id} className="hover:bg-primary/5">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0 text-center">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {f.user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-64 truncate">
                        {f.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.rating === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.rating === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.rating === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.rating === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
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
    </div>
  );
};

export default Feedback;
