"use client";
import { getUserFromSession } from "@/lib/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";

type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

let refreshed = 0;

const VRTourPage = () => {
  // User session state
  const [user, setUser] = useState<AuthenticatedUser | undefined>();

  // Fetch user data from session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserFromSession();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      const lastPostTime = localStorage.getItem("lastPostTime");
      const currentTime = new Date();
      const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60 * 1000);

      // Check if the last post time is more than an hour ago or if it's not set
      if (!lastPostTime || new Date(lastPostTime) <= tenMinutesAgo) {
        const postData = async () => {
          try {
            await axios.post(`/api/logvrtours`, { userId: user.id });
            console.log("Post made for user:", user.id);
            localStorage.setItem("lastPostTime", currentTime.toISOString()); // Update the last post time in local storage
          } catch (error) {
            console.error("Failed to post data", error);
          }
        };

        postData();
      } else {
        console.log("Not enough time has passed since the last post.");
      }
    }
  }, [user]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        src="https://itdri-confess-innocent.s3.ap-southeast-1.amazonaws.com/index.html"
        frameBorder="0"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};

export default VRTourPage;
