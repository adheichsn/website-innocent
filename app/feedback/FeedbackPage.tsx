"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { getUserFromSession } from "@/lib/auth";
import axios from "axios";
import Image from "next/image";

type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

const FeedbackPage = () => {
  const [hovered, setHovered] = useState<Number>();
  const [greeting, setGreeting] = useState(false);
  const feedbackData = [
    {
      value: 0,
      iconOn: "/img/feedback/on-poor.svg",
      iconOff: "/img/feedback/off-poor.svg",
    },
    {
      value: 1,
      iconOn: "/img/feedback/on-fair.svg",
      iconOff: "/img/feedback/off-fair.svg",
    },
    {
      value: 2,
      iconOn: "/img/feedback/on-average.svg",
      iconOff: "/img/feedback/off-average.svg",
    },
    {
      value: 3,
      iconOn: "/img/feedback/on-good.svg",
      iconOff: "/img/feedback/off-good.svg",
    },
    {
      value: 4,
      iconOn: "/img/feedback/on-excellent.svg",
      iconOff: "/img/feedback/off-excellent.svg",
    },
  ];

  // get user session
  const [user, setUser] = useState<AuthenticatedUser | undefined>(undefined);
  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserFromSession();
      setUser(userData);
    }

    fetchUser();
  }, []);

  const [title, setTitle] = useState("");
  const [feedbackRating, setFeedbackRating] = useState<Number>();
  const [description, setDescription] = useState("");

  const handlePost = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post(`/api/feedbacks`, {
        userId: user?.id,
        rating: feedbackRating,
        title: title,
        description: description,
      });

      setGreeting(true);
      // Reset the form
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to post feedback", error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex justify-center min-h-screen mt-20">
        <div className="max-w-[450px] md:shadow-[0px_4px_8px_0px_#00000015] rounded-lg px-4 md:px-6 py-6 md:py-8 h-max">
          {greeting ? (
            <div className="w-max mx-auto mt-4 lg:mt-8">
              <div className="w-max mx-auto border rounded-md text-sm lg:text-base p-8 text-center">
                <span className="material-symbols-rounded fill-primary03">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    className="mx-auto"
                  >
                    <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
                  </svg>
                </span>
                <p>Masukan Anda telah diterima,</p>
                <p>Terima kasih telah membagikan Feedback Anda!</p>
              </div>
            </div>
          ) : (
            <>
              {/* informatif words */}
              <div className="text-neutral01 mb-4 lg:mb-6">
                <strong className="text-lg lg:text-xl">Berikan Feedback</strong>
                <p className="text-sm lg:text-base">
                  Berikan nilai pada pengalaman penggunaan innocent anda
                </p>
              </div>
              {/* form for login */}
              <form
                onSubmit={handlePost}
                className="flex flex-col gap-2 lg:gap-3 items-end"
              >
                <div className="mx-auto flex items-center gap-1 min-h-14">
                  {feedbackData.map((fd) => (
                    <label
                      key={fd.value}
                      htmlFor="poor"
                      className="relative cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
                    >
                      <input
                        type="radio"
                        value={fd.value}
                        checked={fd.value === feedbackRating}
                        onChange={(e) =>
                          setFeedbackRating(Number(e.target.value))
                        }
                        onMouseEnter={() => setHovered(fd.value)}
                        onMouseLeave={() => setHovered(10)}
                        className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                        required
                      />
                      {hovered == fd.value || fd.value == feedbackRating ? (
                        <Image
                          src={fd.iconOn}
                          alt="Icon"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Image
                          src={fd.iconOff}
                          alt="Icon"
                          width={40}
                          height={40}
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="w-full flex flex-col gap-1 text-natural01">
                  <label htmlFor="commentField">
                    Berikan alasan mengenai ulasan yang telah diberikan
                  </label>
                  <textarea
                    id="commentField"
                    name="text"
                    className="p-2 lg:p-3 border border-neutral04 rounded-md"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-max bg-primary03 text-white px-6 py-2 lg:px-8  lg:py-3 rounded-md font-semibold border-2 border-primary01 shadow-[0px_1px_0px_0px_#00000015] hover:bg-primary03/80 transition-all ease-in-out duration-150"
                >
                  Kirim
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FeedbackPage;
