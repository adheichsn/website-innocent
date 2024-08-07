"use client";
import Pagination from "@/app/component/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbackVRGeneral = () => {
  const [feedbackVRGeneral, setFeedbackVRGeneral] = useState({
    feedbacks: [
      {
        id: 0,
        userId: "",
        ratingQ1: 0,
        ratingQ2: 0,
        ratingQ3: 0,
        ratingQ4: 0,
        ratingQ5: 0,
        ratingQ6: 0,
        ratingQ7: 0,
        comment: "",
        createdAt: "",
        user: {
          name: "",
        },
      },
    ],
    totalCount: 0,
    questionResponse: {
      question1: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question2: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question3: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question4: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question5: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question6: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
      question7: {
        ratingPoor: 0,
        ratingFair: 0,
        ratingAverage: 0,
        ratingGood: 0,
        ratingExcellence: 0,
        percentPoor: 0,
        percentFair: 0,
        percentAverage: 0,
        percentGood: 0,
        percentExcellence: 0,
      },
    },
  });

  const question = [
    "Secara keseluruhan apakahah Anda puas dengan VR Tour InnoCent?",
    "Bagaimana kemudahan navigasi untuk mengakses zona/interplay yang tersedia?",
    "Bagaimana kualitas konten yang disuguhkan pada setiap Zona?",
    "Menurut Anda, seberapa menarik konten video dan gambar yang ditayangkan dalam interplay?",
    "Bagaimana kualitas konten yang disuguhkan pada setap Zona?",
    "Bagaimana kualitas fasilitas dukungan pada InnoCent Tour?",
    "Seberapa puas Anda dengan desain Visual InnoCent?",
  ];

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/feedback-vr-general`);
      setFeedbackVRGeneral(response.data);
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
    feedbackVRGeneral.feedbacks.length / itemsPerPage
  );

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredLogs = feedbackVRGeneral.feedbacks.filter((log) => {
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
      <div className="w-full flex gap-4 mb-8">
        <div className="w-[18%] h-max">
          {/* SELECT DATA */}
          <div>
            <div className="w-full bg-blue-100 rounded-lg p-6">
              <p className="text-xs lg:text-sm mb-2">Feedback For</p>
              <p>GENERAL</p>
            </div>
          </div>
          {/* TOTAL */}
          <div className="w-full bg-blue-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2">Total Feedback</p>
            <p className="text-4xl lg:text-6xl font-bold text-primary">
              {feedbackVRGeneral.totalCount}
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="w-[80%] grid grid-cols-4 gap-4">
          {/* Question 1 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 1</p>
            <p className="text-sm">{question[0]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question1.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question1.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question1.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question1.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question1.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question1.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question1.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question1.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question1
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question1
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 2 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 2</p>
            <p className="text-sm">{question[1]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question2.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question2.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question2.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question2.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question2.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question2.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question2.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question2.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question2
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question2
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 3 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 3</p>
            <p className="text-sm">{question[2]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question3.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question3.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question3.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question3.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question3.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question3.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question3.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question3.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question3
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question3
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 4 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 4</p>
            <p className="text-sm">{question[3]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question4.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question4.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question4.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question4.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question4.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question4.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question4.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question4.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question4
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question4
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 5 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 5</p>
            <p className="text-sm">{question[4]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question5.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question5.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question5.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question5.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question5.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question5.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question5.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question5.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question5
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question5
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 6 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 6</p>
            <p className="text-sm">{question[5]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question6.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question6.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question6.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question6.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question6.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question6.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question6.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question6.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question6
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question6
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
          {/* Question 7 */}
          <div className="w-full bg-slate-100 rounded-lg p-6">
            <p className="text-xs lg:text-sm mb-2 font-medium">Question 7</p>
            <p className="text-sm">{question[6]}</p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              {/* POOR */}
              <div className="flex flex-col gap-1 bg-[#FF6347]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question7.ratingPoor}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FF6347] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question7.percentPoor}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* FAIR */}
              <div className="flex flex-col gap-1 bg-[#FFA500]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question7.ratingFair}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFA500] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question7.percentFair}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* AVERAGE */}
              <div className="flex flex-col gap-1 bg-[#FFD700]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question7.ratingAverage}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#FFD700] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question7.percentAverage}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* GOOD */}
              <div className="flex flex-col gap-1 bg-[#9ACD32]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {feedbackVRGeneral.questionResponse.question7.ratingGood}
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#9ACD32] px-2 rounded-md text-white">
                  {feedbackVRGeneral.questionResponse.question7.percentGood}
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
              {/* EXCELLENCE */}
              <div className="flex flex-col gap-1 bg-[#008000]/20 p-2 rounded-md">
                <p className="text-2xl lg:text-4xl font-bold text-primary">
                  {
                    feedbackVRGeneral.questionResponse.question7
                      .ratingExcellence
                  }
                </p>
                <p className="text-sm lg:text-base font-bold bg-[#008000] px-2 rounded-md text-white">
                  {
                    feedbackVRGeneral.questionResponse.question7
                      .percentExcellence
                  }
                  <span className="ml-1 text-xs lg:text-sm">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Feedback for VR General
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q6
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Rating Q7
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[10%] truncate"
                    >
                      Comment
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
                        {f.ratingQ1 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ1 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ1 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ1 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ2 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ2 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ2 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ2 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ3 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ3 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ3 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ3 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ4 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ4 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ4 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ4 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ5 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ5 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ5 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ5 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ6 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ6 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ6 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ6 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.ratingQ7 === 0 ? (
                          <p className="text-[#FF6347] bg-[#FF6347]/20 px-2 rounded-sm w-max">
                            Poor
                          </p>
                        ) : f.ratingQ7 === 1 ? (
                          <p className="text-[#FFA500] bg-[#FFA500]/20 px-2 rounded-sm w-max">
                            Fair
                          </p>
                        ) : f.ratingQ7 === 2 ? (
                          <p className="text-[#FFD700] bg-[#FFD700]/20 px-2 rounded-sm w-max">
                            Average
                          </p>
                        ) : f.ratingQ7 === 3 ? (
                          <p className="text-[#9ACD32] bg-[#9ACD32]/20 px-2 rounded-sm w-max">
                            Good
                          </p>
                        ) : (
                          <p className="text-[#008000] bg-[#008000]/20 px-2 rounded-sm w-max">
                            Excellent
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">
                        {f.comment}
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

export default FeedbackVRGeneral;
