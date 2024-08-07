"use client";
import Pagination from "@/app/component/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbackVR = () => {
  const [feedbackVR, setFeedbackVR] = useState({
    feedbacks: [
      {
        id: 0,
        userId: "",
        for: "",
        ratingQ1: 0,
        ratingQ2: 0,
        ratingQ3: 0,
        ratingQ4: 0,
        ratingQ5: 0,
        createdAt: "",
        user: {
          name: "",
        },
      },
    ],
    totalCount: 0,
    questionResponse: {
      question1: {
        ratingGood: 0,
        ratingBad: 0,
        percentGood: 0,
        percentBad: 0,
      },
      question2: {
        ratingGood: 0,
        ratingBad: 0,
        percentGood: 0,
        percentBad: 0,
      },
      question3: {
        ratingGood: 0,
        ratingBad: 0,
        percentGood: 0,
        percentBad: 0,
      },
      question4: {
        ratingGood: 0,
        ratingBad: 0,
        percentGood: 0,
        percentBad: 0,
      },
      question5: {
        ratingGood: 0,
        ratingBad: 0,
        percentGood: 0,
        percentBad: 0,
      },
    },
  });

  const question = [
    "Merasa menarik dalam menggunakan interplay ini?",
    "Puas dengan kualitas informasi yang disediakan?",
    "Puas dengan antarmuka pop-up?",
    "Tampilan video memuaskan Anda?",
    "Secara keseluruhan, Puas dengan interplay ini?",
  ];

  const [selectFor, setSelectFor] = useState("BAGIDATA");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/feedback-vr?for=${selectFor}`);
      setFeedbackVR(response.data);
    };
    fetchData();
  }, [selectFor]);

  const handleSelectData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFor(e.target.value);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  // Setting Paggination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(feedbackVR.feedbacks.length / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredLogs = feedbackVR.feedbacks.filter((log) => {
    const logDate = new Date(log.createdAt);
    const fromDate = dateFrom ? new Date(dateFrom) : new Date("1970-01-01");
    const toDate = dateTo ? new Date(dateTo) : new Date();

    const isDateInRange = logDate >= fromDate && logDate <= toDate;

    return isDateInRange;
  });

  const currentFeedbacks = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Statistic */}
      <div className="w-full grid grid-cols-6 gap-4 mb-8">
        <div className="">
          {/* SELECT DATA */}
          <div>
            <div className="w-full bg-blue-100 rounded-lg p-6">
              <p className="text-xs lg:text-sm mb-2">Select Feedback For</p>
              <select
                onChange={handleSelectData}
                className="mt-0.5 px-2 py-1 rounded-md bg-white/60"
                value={selectFor}
              >
                <option value="BAGIDATA">BAGIDATA</option>
                <option value="BIGBOX">BIGBOX</option>
                <option value="BIGEYE">BIGEYE</option>
                <option value="DTRAL">DTRAL</option>
                <option value="HSI">HSI</option>
                <option value="INLET">INLET</option>
                <option value="IDEABOX">IDEABOX</option>
                <option value="INDIBIZ">INDIBIZ</option>
                <option value="MYDIGILEARN">MYDIGILEARN</option>
                <option value="OCA">OCA</option>
                <option value="PODCAST">PODCAST</option>
                <option value="SCN">SCN</option>
                <option value="ANTARESEAZY">ANTARESEAZY</option>
                <option value="SMARTHOME">SMARTHOME</option>
                <option value="SMARTVILLAGE">SMARTVILLAGE</option>
                <option value="SMARTEYE">SMARTEYE</option>
                <option value="SPRINTHINK">SPRINTHINK</option>
                <option value="YHC">YHC</option>
                <option value="TELKOMIOT">TELKOMIOT</option>
              </select>
            </div>
          </div>
          {/* TOTAL */}
          <div className="w-full bg-blue-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2">Total Feedback</p>
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedbackVR.totalCount}
            </p>
          </div>
        </div>

        {/* Question 1 */}
        <div className="w-full bg-slate-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2 font-medium">Question 1</p>
          <p className="text-sm">{question[0]}</p>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question1.ratingBad}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question1.percentBad}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-[#008000]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question1.ratingGood}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question1.percentGood}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="w-full bg-slate-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2 font-medium">Question 2</p>
          <p className="text-sm">{question[1]}</p>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question2.ratingBad}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question2.percentBad}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-[#008000]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question2.ratingGood}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question2.percentGood}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="w-full bg-slate-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2 font-medium">Question 3</p>
          <p className="text-sm">{question[2]}</p>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question3.ratingBad}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question3.percentBad}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-[#008000]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question3.ratingGood}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question3.percentGood}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="w-full bg-slate-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2 font-medium">Question 4</p>
          <p className="text-sm">{question[3]}</p>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question4.ratingBad}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question4.percentBad}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-[#008000]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question4.ratingGood}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question4.percentGood}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Question 5 */}
        <div className="w-full bg-slate-100 rounded-lg p-6">
          <p className="text-xs lg:text-sm mb-2 font-medium">Question 5</p>
          <p className="text-sm">{question[4]}</p>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question5.ratingBad}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question5.percentBad}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-[#008000]/20 p-4 rounded-md">
              <p className="text-2xl lg:text-4xl font-bold text-primary">
                {feedbackVR.questionResponse.question5.ratingGood}
              </p>
              <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                {feedbackVR.questionResponse.question5.percentGood}
                <span className="ml-1 text-xs lg:text-sm">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Feedback for {selectFor}
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q1
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q2
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q3
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q4
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q5
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ1 == 1 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ2 == 1 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ3 == 1 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ4 == 1 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ5 == 1 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Fair
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

export default FeedbackVR;
